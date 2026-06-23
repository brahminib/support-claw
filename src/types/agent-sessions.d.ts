// Declares extension points for agent session type augmentation.
export type SupportClawAgentSessionSkillSourceAugmentation = never;

declare module "supportClaw/plugin-sdk/agent-sessions" {
  interface Skill {
    // SupportClaw relies on the source identifier returned by skill loaders.
    source: string;
  }
}
