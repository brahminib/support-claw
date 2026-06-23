import Foundation

// Stable identifier used for both the macOS LaunchAgent label and Nix-managed defaults suite.
// nix-supportClaw writes app defaults into this suite to survive app bundle identifier churn.
let launchdLabel = "ai.supportClaw.mac"
let gatewayLaunchdLabel = "ai.supportClaw.gateway"
let onboardingVersionKey = "supportClaw.onboardingVersion"
let onboardingSeenKey = "supportClaw.onboardingSeen"
let currentOnboardingVersion = 7
let pauseDefaultsKey = "supportClaw.pauseEnabled"
let iconAnimationsEnabledKey = "supportClaw.iconAnimationsEnabled"
let swabbleEnabledKey = "supportClaw.swabbleEnabled"
let swabbleTriggersKey = "supportClaw.swabbleTriggers"
let voiceWakeTriggerChimeKey = "supportClaw.voiceWakeTriggerChime"
let voiceWakeSendChimeKey = "supportClaw.voiceWakeSendChime"
let showDockIconKey = "supportClaw.showDockIcon"
let defaultVoiceWakeTriggers = ["supportClaw"]
let voiceWakeMaxWords = 32
let voiceWakeMaxWordLength = 64
let voiceWakeMicKey = "supportClaw.voiceWakeMicID"
let voiceWakeMicNameKey = "supportClaw.voiceWakeMicName"
let voiceWakeLocaleKey = "supportClaw.voiceWakeLocaleID"
let voiceWakeAdditionalLocalesKey = "supportClaw.voiceWakeAdditionalLocaleIDs"
let voicePushToTalkEnabledKey = "supportClaw.voicePushToTalkEnabled"
let voiceWakeTriggersTalkModeKey = "supportClaw.voiceWakeTriggersTalkMode"
let talkEnabledKey = "supportClaw.talkEnabled"
let talkPhaseSoundsEnabledKey = "supportClaw.talkPhaseSoundsEnabled"
let talkShiftToStopEnabledKey = "supportClaw.talkShiftToStopEnabled"
let iconOverrideKey = "supportClaw.iconOverride"
let connectionModeKey = "supportClaw.connectionMode"
let remoteTargetKey = "supportClaw.remoteTarget"
let remoteIdentityKey = "supportClaw.remoteIdentity"
let remoteProjectRootKey = "supportClaw.remoteProjectRoot"
let remoteCliPathKey = "supportClaw.remoteCliPath"
let canvasEnabledKey = "supportClaw.canvasEnabled"
let cameraEnabledKey = "supportClaw.cameraEnabled"
let systemRunPolicyKey = "supportClaw.systemRunPolicy"
let systemRunAllowlistKey = "supportClaw.systemRunAllowlist"
let systemRunEnabledKey = "supportClaw.systemRunEnabled"
let locationModeKey = "supportClaw.locationMode"
let locationPreciseKey = "supportClaw.locationPreciseEnabled"
let peekabooBridgeEnabledKey = "supportClaw.peekabooBridgeEnabled"
let deepLinkKeyKey = "supportClaw.deepLinkKey"
let cliInstallPromptedVersionKey = "supportClaw.cliInstallPromptedVersion"
let heartbeatsEnabledKey = "supportClaw.heartbeatsEnabled"
let debugPaneEnabledKey = "supportClaw.debugPaneEnabled"
let debugFileLogEnabledKey = "supportClaw.debug.fileLogEnabled"
let appLogLevelKey = "supportClaw.debug.appLogLevel"
let voiceWakeSupported: Bool = ProcessInfo.processInfo.operatingSystemVersion.majorVersion >= 26
