const QA_MAIL_DOMAIN = "qa.flowo.com.br";
const PRODUCTION_MAIL_DOMAIN = "flowo.com.br";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PRODUCTION_DEFAULTS = {
  contactEmail: "contato@flowo.com.br",
  supportEmail: "suporte@flowo.com.br",
  privacyEmail: "privacidade@flowo.com.br",
};

const DEVELOPMENT_DEFAULTS = {
  contactEmail: "contact@localhost.invalid",
  supportEmail: "support@localhost.invalid",
  privacyEmail: "privacy@localhost.invalid",
};

function isDomainOrSubdomain(domain, root) {
  return domain === root || domain.endsWith(`.${root}`);
}

function isQaEmail(email) {
  return isDomainOrSubdomain(email.slice(email.lastIndexOf("@") + 1), QA_MAIL_DOMAIN);
}

function isProductionEmail(email) {
  const domain = email.slice(email.lastIndexOf("@") + 1);
  return (
    isDomainOrSubdomain(domain, PRODUCTION_MAIL_DOMAIN) &&
    !isQaEmail(email)
  );
}

function resolveEmail(name, field, configured, deploymentEnvironment) {
  const email = configured?.trim().toLowerCase();
  if (deploymentEnvironment === "qa" && !email) {
    throw new Error(`${name} is required in QA`);
  }

  const value =
    email ??
    (deploymentEnvironment === "production"
      ? PRODUCTION_DEFAULTS[field]
      : DEVELOPMENT_DEFAULTS[field]);

  if (!EMAIL_PATTERN.test(value)) {
    throw new Error(`${name} must be a valid email address`);
  }
  if (deploymentEnvironment === "qa" && !isQaEmail(value)) {
    throw new Error(`${name} must use the QA-owned mail domain in QA`);
  }
  if (deploymentEnvironment === "production" && !isProductionEmail(value)) {
    throw new Error(`${name} must use the production Flowo mail domain`);
  }
  if (
    deploymentEnvironment === "development" &&
    !isQaEmail(value) &&
    !value.endsWith(".invalid")
  ) {
    throw new Error(`${name} must use a QA-owned or .invalid domain in development`);
  }

  return value;
}

/** Resolve contact addresses without allowing QA or local builds to inherit production mailboxes. */
export function resolveFlowoLegalContactEmails(input) {
  const { deploymentEnvironment } = input;
  if (!["development", "qa", "production"].includes(deploymentEnvironment)) {
    throw new Error("deploymentEnvironment must be development, qa, or production");
  }

  return {
    contactEmail: resolveEmail(
      "NEXT_PUBLIC_FLOWO_SALES_EMAIL",
      "contactEmail",
      input.contactEmail,
      deploymentEnvironment,
    ),
    supportEmail: resolveEmail(
      "NEXT_PUBLIC_FLOWO_SUPPORT_EMAIL",
      "supportEmail",
      input.supportEmail,
      deploymentEnvironment,
    ),
    privacyEmail: resolveEmail(
      "NEXT_PUBLIC_FLOWO_PRIVACY_EMAIL",
      "privacyEmail",
      input.privacyEmail,
      deploymentEnvironment,
    ),
  };
}
