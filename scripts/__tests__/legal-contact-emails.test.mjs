import assert from "node:assert/strict";
import test from "node:test";
import { resolveFlowoLegalContactEmails } from "../../lib/legal-contact-emails.mjs";

test("requires explicit QA-owned contact addresses in QA", () => {
  assert.deepEqual(
    resolveFlowoLegalContactEmails({
      deploymentEnvironment: "qa",
      contactEmail: "vendas@qa.flowo.com.br",
      supportEmail: "suporte@qa.flowo.com.br",
      privacyEmail: "privacidade@qa.flowo.com.br",
    }),
    {
      contactEmail: "vendas@qa.flowo.com.br",
      supportEmail: "suporte@qa.flowo.com.br",
      privacyEmail: "privacidade@qa.flowo.com.br",
    },
  );
});

test("accepts QA contacts on the isolated nested routing subdomain", () => {
  assert.deepEqual(
    resolveFlowoLegalContactEmails({
      deploymentEnvironment: "qa",
      contactEmail: "vendas@contact.qa.flowo.com.br",
      supportEmail: "suporte@contact.qa.flowo.com.br",
      privacyEmail: "privacidade@contact.qa.flowo.com.br",
    }),
    {
      contactEmail: "vendas@contact.qa.flowo.com.br",
      supportEmail: "suporte@contact.qa.flowo.com.br",
      privacyEmail: "privacidade@contact.qa.flowo.com.br",
    },
  );
});

test("fails closed for missing or production-owned QA addresses", () => {
  assert.throws(
    () =>
      resolveFlowoLegalContactEmails({
        deploymentEnvironment: "qa",
        contactEmail: "vendas@qa.flowo.com.br",
        supportEmail: "suporte@flowo.com.br",
        privacyEmail: "privacidade@qa.flowo.com.br",
      }),
    /NEXT_PUBLIC_FLOWO_SUPPORT_EMAIL must use the QA-owned mail domain in QA/,
  );
  assert.throws(
    () =>
      resolveFlowoLegalContactEmails({
        deploymentEnvironment: "qa",
        contactEmail: "vendas@qa.flowo.com.br",
        supportEmail: "",
        privacyEmail: "privacidade@qa.flowo.com.br",
      }),
    /NEXT_PUBLIC_FLOWO_SUPPORT_EMAIL is required in QA/,
  );
});

test("keeps QA contact addresses out of production", () => {
  assert.throws(
    () =>
      resolveFlowoLegalContactEmails({
        deploymentEnvironment: "production",
        contactEmail: "vendas@flowo.com.br",
        supportEmail: "suporte@qa.flowo.com.br",
        privacyEmail: "privacidade@flowo.com.br",
      }),
    /NEXT_PUBLIC_FLOWO_SUPPORT_EMAIL must use the production Flowo mail domain/,
  );
});

test("preserves production-owned contacts as production defaults", () => {
  assert.deepEqual(
    resolveFlowoLegalContactEmails({ deploymentEnvironment: "production" }),
    {
      contactEmail: "contato@flowo.com.br",
      supportEmail: "suporte@flowo.com.br",
      privacyEmail: "privacidade@flowo.com.br",
    },
  );
});

test("uses non-routable local defaults instead of production addresses", () => {
  const emails = resolveFlowoLegalContactEmails({
    deploymentEnvironment: "development",
  });
  assert.ok(Object.values(emails).every((email) => email.endsWith(".invalid")));
});

test("rejects production-owned mailboxes in local development", () => {
  assert.throws(
    () =>
      resolveFlowoLegalContactEmails({
        deploymentEnvironment: "development",
        contactEmail: "vendas@flowo.com.br",
      }),
    /NEXT_PUBLIC_FLOWO_SALES_EMAIL must use a QA-owned or .invalid domain in development/,
  );
});
