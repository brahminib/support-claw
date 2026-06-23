// Provider-index public facade for normalized provider discovery metadata.
export { loadSupportClawProviderIndex } from "./load.js";
export { normalizeSupportClawProviderIndex } from "./normalize.js";
export type {
  SupportClawProviderIndex,
  SupportClawProviderIndexPluginInstall,
  SupportClawProviderIndexPlugin,
  SupportClawProviderIndexProviderAuthChoice,
  SupportClawProviderIndexProvider,
} from "./types.js";
