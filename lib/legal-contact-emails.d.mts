export type FlowoLegalContactEnvironment = "development" | "qa" | "production";

export type FlowoLegalContactEmailsInput = {
  deploymentEnvironment: FlowoLegalContactEnvironment;
  contactEmail?: string;
  supportEmail?: string;
  privacyEmail?: string;
};

export type FlowoLegalContactEmails = {
  contactEmail: string;
  supportEmail: string;
  privacyEmail: string;
};

export function resolveFlowoLegalContactEmails(
  input: FlowoLegalContactEmailsInput,
): FlowoLegalContactEmails;
