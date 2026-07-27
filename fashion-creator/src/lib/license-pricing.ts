import type { ContentLicenseSelection, LicenseType } from "@/types/marketplace";

const BASE_PRICE: Record<LicenseType, number> = {
  personal: 20000,
  "social-commercial": 100000,
  advertising: 300000,
  exclusive: 1000000,
};

const SOURCE_FILE_SURCHARGE = 50000;
const EDITABLE_MULTIPLIER = 0.3;
const EXCLUSIVE_MULTIPLIER = 1.0;

// DEMO pricing rule, kept separate from the UI so a real pricing service can
// replace it later. Not a confirmed commercial policy.
export function calculateLicensePrice(selection: ContentLicenseSelection): number {
  let price = BASE_PRICE[selection.licenseType];
  if (selection.sourceFileIncluded) price += SOURCE_FILE_SURCHARGE;
  if (selection.editable) price += BASE_PRICE[selection.licenseType] * EDITABLE_MULTIPLIER;
  if (selection.exclusive) price += BASE_PRICE[selection.licenseType] * EXCLUSIVE_MULTIPLIER;
  return Math.round(price);
}
