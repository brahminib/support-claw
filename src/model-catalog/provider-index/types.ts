// Provider-index types describe install hints, auth choices, and preview catalogs for discoverable providers.
import type { ModelCatalogProvider } from "@supportclaw/model-catalog-core/model-catalog-types";

// Normalized provider-index schema. It describes providers discoverable before
// plugin install, including install hints, auth choices, and preview catalogs.
export type SupportClawProviderIndexPluginInstall = {
  clawhubSpec?: string;
  npmSpec?: string;
  defaultChoice?: "clawhub" | "npm";
  minHostVersion?: string;
  expectedIntegrity?: string;
};

export type SupportClawProviderIndexPlugin = {
  id: string;
  package?: string;
  source?: string;
  install?: SupportClawProviderIndexPluginInstall;
};

export type SupportClawProviderIndexProviderAuthChoice = {
  method: string;
  choiceId: string;
  choiceLabel: string;
  choiceHint?: string;
  assistantPriority?: number;
  assistantVisibility?: "visible" | "manual-only";
  groupId?: string;
  groupLabel?: string;
  groupHint?: string;
  optionKey?: string;
  cliFlag?: string;
  cliOption?: string;
  cliDescription?: string;
  onboardingScopes?: readonly ("text-inference" | "image-generation" | "music-generation")[];
};

export type SupportClawProviderIndexProvider = {
  id: string;
  name: string;
  plugin: SupportClawProviderIndexPlugin;
  docs?: string;
  categories?: readonly string[];
  authChoices?: readonly SupportClawProviderIndexProviderAuthChoice[];
  previewCatalog?: ModelCatalogProvider;
};

export type SupportClawProviderIndex = {
  version: number;
  providers: Readonly<Record<string, SupportClawProviderIndexProvider>>;
};
