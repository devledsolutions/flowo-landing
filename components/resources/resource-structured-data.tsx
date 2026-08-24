import type { GuideEntry } from "@/data/guides";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function breadcrumbItems(
  items: { name: string; path: string }[],
): {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}[] {
  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  }));
}

export function GuideStructuredData({ guide }: { guide: GuideEntry }) {
  const url = absoluteUrl(guide.path);
  const organization = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/flowo-logo.svg"),
    },
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: guide.title,
        description: guide.description,
        url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        image: [absoluteUrl(DEFAULT_OG_IMAGE)],
        datePublished: guide.publishedTime,
        dateModified: guide.modifiedTime,
        author: organization,
        publisher: organization,
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        isPartOf: {
          "@type": "CollectionPage",
          name: "Guias para Barbearias",
          url: absoluteUrl("/recursos/guias"),
        },
        about: guide.topics.map((topic) => ({
          "@type": "Thing",
          name: topic,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems([
          { name: "Início", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Guias", path: "/recursos/guias" },
          { name: guide.title, path: guide.path },
        ]),
      },
    ],
  };

  return <JsonLd data={data} />;
}

export function ResourceCollectionStructuredData({
  title,
  description,
  path,
  items,
  breadcrumbLabel,
}: {
  title: string;
  description: string;
  path: string;
  items: {
    name: string;
    path: string;
    description?: string;
    /** HTML page or anchor that explains the resource. */
    canonicalPath?: string;
    /** Optional downloadable media represented as a MediaObject. */
    mediaUrl?: string;
    encodingFormat?: string;
  }[];
  breadcrumbLabel: string;
}) {
  const url = absoluteUrl(path);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name: title,
        description,
        url,
        inLanguage: "pt-BR",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((item, index) => {
            const canonicalUrl = absoluteUrl(item.canonicalPath ?? item.path);
            const mediaUrl = item.mediaUrl ? absoluteUrl(item.mediaUrl) : null;
            const document = item.mediaUrl
              ? {
                  "@type": "MediaObject",
                  "@id": `${canonicalUrl}#download`,
                  name: item.name,
                  url: canonicalUrl,
                  contentUrl: mediaUrl,
                  encodingFormat: item.encodingFormat,
                  inLanguage: "pt-BR",
                  isAccessibleForFree: true,
                  mainEntityOfPage: canonicalUrl,
                  isPartOf: { "@id": `${url}#collection` },
                  ...(item.description
                    ? { description: item.description }
                    : {}),
                }
              : {
                  "@type": "CreativeWork",
                  "@id": canonicalUrl,
                  name: item.name,
                  url: canonicalUrl,
                  inLanguage: "pt-BR",
                  isPartOf: { "@id": `${url}#collection` },
                  ...(item.description
                    ? { description: item.description }
                    : {}),
                };

            return {
              "@type": "ListItem",
              position: index + 1,
              item: document,
            };
          }),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems([
          { name: "Início", path: "/" },
          ...(path === "/recursos"
            ? []
            : [{ name: "Recursos", path: "/recursos" }]),
          { name: breadcrumbLabel, path },
        ]),
      },
    ],
  };

  return <JsonLd data={data} />;
}
