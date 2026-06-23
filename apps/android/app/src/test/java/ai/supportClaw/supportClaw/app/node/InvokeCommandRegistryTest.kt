package ai.supportClaw.app.node

import ai.supportClaw.app.protocol.SupportClawCalendarCommand
import ai.supportClaw.app.protocol.SupportClawCallLogCommand
import ai.supportClaw.app.protocol.SupportClawCameraCommand
import ai.supportClaw.app.protocol.SupportClawCapability
import ai.supportClaw.app.protocol.SupportClawContactsCommand
import ai.supportClaw.app.protocol.SupportClawDeviceCommand
import ai.supportClaw.app.protocol.SupportClawLocationCommand
import ai.supportClaw.app.protocol.SupportClawMotionCommand
import ai.supportClaw.app.protocol.SupportClawNotificationsCommand
import ai.supportClaw.app.protocol.SupportClawPhotosCommand
import ai.supportClaw.app.protocol.SupportClawSmsCommand
import ai.supportClaw.app.protocol.SupportClawSystemCommand
import ai.supportClaw.app.protocol.SupportClawTalkCommand
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class InvokeCommandRegistryTest {
  private val coreCapabilities =
    setOf(
      SupportClawCapability.Canvas.rawValue,
      SupportClawCapability.Device.rawValue,
      SupportClawCapability.Notifications.rawValue,
      SupportClawCapability.System.rawValue,
      SupportClawCapability.Talk.rawValue,
      SupportClawCapability.Contacts.rawValue,
      SupportClawCapability.Calendar.rawValue,
    )

  private val optionalCapabilities =
    setOf(
      SupportClawCapability.Camera.rawValue,
      SupportClawCapability.Location.rawValue,
      SupportClawCapability.Sms.rawValue,
      SupportClawCapability.CallLog.rawValue,
      SupportClawCapability.VoiceWake.rawValue,
      SupportClawCapability.Motion.rawValue,
      SupportClawCapability.Photos.rawValue,
    )

  private val coreCommands =
    setOf(
      SupportClawDeviceCommand.Status.rawValue,
      SupportClawDeviceCommand.Info.rawValue,
      SupportClawDeviceCommand.Permissions.rawValue,
      SupportClawDeviceCommand.Health.rawValue,
      SupportClawNotificationsCommand.List.rawValue,
      SupportClawNotificationsCommand.Actions.rawValue,
      SupportClawSystemCommand.Notify.rawValue,
      SupportClawTalkCommand.PttStart.rawValue,
      SupportClawTalkCommand.PttStop.rawValue,
      SupportClawTalkCommand.PttCancel.rawValue,
      SupportClawTalkCommand.PttOnce.rawValue,
      SupportClawContactsCommand.Search.rawValue,
      SupportClawContactsCommand.Add.rawValue,
      SupportClawCalendarCommand.Events.rawValue,
      SupportClawCalendarCommand.Add.rawValue,
    )

  private val optionalCommands =
    setOf(
      SupportClawCameraCommand.Snap.rawValue,
      SupportClawCameraCommand.Clip.rawValue,
      SupportClawCameraCommand.List.rawValue,
      SupportClawLocationCommand.Get.rawValue,
      SupportClawMotionCommand.Activity.rawValue,
      SupportClawMotionCommand.Pedometer.rawValue,
      SupportClawSmsCommand.Send.rawValue,
      SupportClawSmsCommand.Search.rawValue,
      SupportClawCallLogCommand.Search.rawValue,
      SupportClawPhotosCommand.Latest.rawValue,
    )

  private val debugCommands = setOf("debug.logs", "debug.ed25519")

  @Test
  fun advertisedCapabilities_respectsFeatureAvailability() {
    val capabilities = InvokeCommandRegistry.advertisedCapabilities(defaultFlags())

    assertContainsAll(capabilities, coreCapabilities)
    assertMissingAll(capabilities, optionalCapabilities)
  }

  @Test
  fun advertisedCapabilities_includesFeatureCapabilitiesWhenEnabled() {
    val capabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(
          cameraEnabled = true,
          locationEnabled = true,
          sendSmsAvailable = true,
          readSmsAvailable = true,
          smsSearchPossible = true,
          callLogAvailable = true,
          photosAvailable = true,
          voiceWakeEnabled = true,
          motionActivityAvailable = true,
          motionPedometerAvailable = true,
        ),
      )

    assertContainsAll(capabilities, coreCapabilities + optionalCapabilities)
  }

  @Test
  fun advertisedCommands_respectsFeatureAvailability() {
    val commands = InvokeCommandRegistry.advertisedCommands(defaultFlags())

    assertContainsAll(commands, coreCommands)
    assertMissingAll(commands, optionalCommands + debugCommands)
  }

  @Test
  fun advertisedCommands_includesDeviceAppsOnlyWhenUserOptedIn() {
    val disabled = InvokeCommandRegistry.advertisedCommands(defaultFlags(installedAppsSharingEnabled = false))
    val enabled = InvokeCommandRegistry.advertisedCommands(defaultFlags(installedAppsSharingEnabled = true))

    assertFalse(disabled.contains(SupportClawDeviceCommand.Apps.rawValue))
    assertTrue(enabled.contains(SupportClawDeviceCommand.Apps.rawValue))
  }

  @Test
  fun advertisedCommands_includesFeatureCommandsWhenEnabled() {
    val commands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(
          cameraEnabled = true,
          locationEnabled = true,
          sendSmsAvailable = true,
          readSmsAvailable = true,
          smsSearchPossible = true,
          callLogAvailable = true,
          photosAvailable = true,
          motionActivityAvailable = true,
          motionPedometerAvailable = true,
          debugBuild = true,
        ),
      )

    assertContainsAll(commands, coreCommands + optionalCommands + debugCommands)
  }

  @Test
  fun advertisedCommands_onlyIncludesSupportedMotionCommands() {
    val commands =
      InvokeCommandRegistry.advertisedCommands(
        NodeRuntimeFlags(
          cameraEnabled = false,
          locationEnabled = false,
          sendSmsAvailable = false,
          readSmsAvailable = false,
          smsSearchPossible = false,
          callLogAvailable = false,
          photosAvailable = false,
          voiceWakeEnabled = false,
          motionActivityAvailable = true,
          motionPedometerAvailable = false,
          installedAppsSharingEnabled = false,
          debugBuild = false,
        ),
      )

    assertTrue(commands.contains(SupportClawMotionCommand.Activity.rawValue))
    assertFalse(commands.contains(SupportClawMotionCommand.Pedometer.rawValue))
  }

  @Test
  fun advertisedCommands_splitsSmsSendAndSearchAvailability() {
    val readOnlyCommands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(readSmsAvailable = true, smsSearchPossible = true),
      )
    val sendOnlyCommands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(sendSmsAvailable = true),
      )
    val requestableSearchCommands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(smsSearchPossible = true),
      )

    assertTrue(readOnlyCommands.contains(SupportClawSmsCommand.Search.rawValue))
    assertFalse(readOnlyCommands.contains(SupportClawSmsCommand.Send.rawValue))
    assertTrue(sendOnlyCommands.contains(SupportClawSmsCommand.Send.rawValue))
    assertFalse(sendOnlyCommands.contains(SupportClawSmsCommand.Search.rawValue))
    assertTrue(requestableSearchCommands.contains(SupportClawSmsCommand.Search.rawValue))
  }

  @Test
  fun advertisedCapabilities_includeSmsWhenEitherSmsPathIsAvailable() {
    val readOnlyCapabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(readSmsAvailable = true),
      )
    val sendOnlyCapabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(sendSmsAvailable = true),
      )
    val requestableSearchCapabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(smsSearchPossible = true),
      )

    assertTrue(readOnlyCapabilities.contains(SupportClawCapability.Sms.rawValue))
    assertTrue(sendOnlyCapabilities.contains(SupportClawCapability.Sms.rawValue))
    assertFalse(requestableSearchCapabilities.contains(SupportClawCapability.Sms.rawValue))
  }

  @Test
  fun advertisedCommands_excludesCallLogWhenUnavailable() {
    val commands = InvokeCommandRegistry.advertisedCommands(defaultFlags(callLogAvailable = false))

    assertFalse(commands.contains(SupportClawCallLogCommand.Search.rawValue))
  }

  @Test
  fun advertisedCapabilities_excludesCallLogWhenUnavailable() {
    val capabilities = InvokeCommandRegistry.advertisedCapabilities(defaultFlags(callLogAvailable = false))

    assertFalse(capabilities.contains(SupportClawCapability.CallLog.rawValue))
  }

  @Test
  fun advertisedPhotosSurface_respectsFeatureAvailability() {
    val disabledFlags = defaultFlags(photosAvailable = false)
    val enabledFlags = defaultFlags(photosAvailable = true)

    assertFalse(InvokeCommandRegistry.advertisedCapabilities(disabledFlags).contains(SupportClawCapability.Photos.rawValue))
    assertFalse(InvokeCommandRegistry.advertisedCommands(disabledFlags).contains(SupportClawPhotosCommand.Latest.rawValue))
    assertTrue(InvokeCommandRegistry.advertisedCapabilities(enabledFlags).contains(SupportClawCapability.Photos.rawValue))
    assertTrue(InvokeCommandRegistry.advertisedCommands(enabledFlags).contains(SupportClawPhotosCommand.Latest.rawValue))
  }

  @Test
  fun advertisedCapabilities_includesVoiceWakeWithoutAdvertisingCommands() {
    val capabilities = InvokeCommandRegistry.advertisedCapabilities(defaultFlags(voiceWakeEnabled = true))
    val commands = InvokeCommandRegistry.advertisedCommands(defaultFlags(voiceWakeEnabled = true))

    assertTrue(capabilities.contains(SupportClawCapability.VoiceWake.rawValue))
    assertFalse(commands.any { it.contains("voice", ignoreCase = true) })
  }

  @Test
  fun find_returnsForegroundMetadataForCameraCommands() {
    val list = InvokeCommandRegistry.find(SupportClawCameraCommand.List.rawValue)
    val location = InvokeCommandRegistry.find(SupportClawLocationCommand.Get.rawValue)

    assertNotNull(list)
    assertEquals(true, list?.requiresForeground)
    assertNotNull(location)
    assertEquals(false, location?.requiresForeground)
  }

  @Test
  fun find_returnsNullForUnknownCommand() {
    assertNull(InvokeCommandRegistry.find("not.real"))
  }

  private fun defaultFlags(
    cameraEnabled: Boolean = false,
    locationEnabled: Boolean = false,
    sendSmsAvailable: Boolean = false,
    readSmsAvailable: Boolean = false,
    smsSearchPossible: Boolean = false,
    callLogAvailable: Boolean = false,
    photosAvailable: Boolean = false,
    voiceWakeEnabled: Boolean = false,
    motionActivityAvailable: Boolean = false,
    motionPedometerAvailable: Boolean = false,
    installedAppsSharingEnabled: Boolean = false,
    debugBuild: Boolean = false,
  ): NodeRuntimeFlags =
    NodeRuntimeFlags(
      cameraEnabled = cameraEnabled,
      locationEnabled = locationEnabled,
      sendSmsAvailable = sendSmsAvailable,
      readSmsAvailable = readSmsAvailable,
      smsSearchPossible = smsSearchPossible,
      callLogAvailable = callLogAvailable,
      photosAvailable = photosAvailable,
      voiceWakeEnabled = voiceWakeEnabled,
      motionActivityAvailable = motionActivityAvailable,
      motionPedometerAvailable = motionPedometerAvailable,
      installedAppsSharingEnabled = installedAppsSharingEnabled,
      debugBuild = debugBuild,
    )

  private fun assertContainsAll(
    actual: List<String>,
    expected: Set<String>,
  ) {
    expected.forEach { value -> assertTrue(actual.contains(value)) }
  }

  private fun assertMissingAll(
    actual: List<String>,
    forbidden: Set<String>,
  ) {
    forbidden.forEach { value -> assertFalse(actual.contains(value)) }
  }
}
