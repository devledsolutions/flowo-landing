const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.flowo.com.br"
).replace(/\/$/, "");
const INDEXNOW_KEY = "84ee248de45965560524181d9e815895";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const isDryRun = process.argv.includes("--dry-run");

async function getCanonicalUrls() {
  const response = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { accept: "application/xml,text/xml" },
  });

  if (!response.ok) {
    throw new Error(
      `Não foi possível carregar o sitemap (${response.status} ${response.statusText}).`,
    );
  }

  const sitemap = await response.text();
  return Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) =>
    url.replaceAll("&amp;", "&"),
  );
}

const urlList = await getCanonicalUrls();

if (urlList.length === 0) {
  throw new Error("O sitemap não contém URLs canônicas para enviar.");
}

const payload = {
  host: new URL(SITE_URL).host,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

if (isDryRun) {
  console.log(
    JSON.stringify(
      {
        endpoint: INDEXNOW_ENDPOINT,
        keyLocation: KEY_LOCATION,
        urlCount: urlList.length,
        firstUrl: urlList[0],
        lastUrl: urlList.at(-1),
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const response = await fetch(INDEXNOW_ENDPOINT, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (!response.ok && response.status !== 202) {
  throw new Error(
    `IndexNow recusou o envio (${response.status} ${response.statusText}).`,
  );
}

console.log(
  `IndexNow recebeu ${urlList.length} URLs (${response.status} ${response.statusText}).`,
);
