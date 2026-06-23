package ai.supportClaw.app.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class SupportClawProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", SupportClawCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", SupportClawCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", SupportClawCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", SupportClawCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", SupportClawCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", SupportClawCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", SupportClawCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", SupportClawCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", SupportClawCapability.Canvas.rawValue)
    assertEquals("camera", SupportClawCapability.Camera.rawValue)
    assertEquals("voiceWake", SupportClawCapability.VoiceWake.rawValue)
    assertEquals("talk", SupportClawCapability.Talk.rawValue)
    assertEquals("location", SupportClawCapability.Location.rawValue)
    assertEquals("sms", SupportClawCapability.Sms.rawValue)
    assertEquals("device", SupportClawCapability.Device.rawValue)
    assertEquals("notifications", SupportClawCapability.Notifications.rawValue)
    assertEquals("system", SupportClawCapability.System.rawValue)
    assertEquals("photos", SupportClawCapability.Photos.rawValue)
    assertEquals("contacts", SupportClawCapability.Contacts.rawValue)
    assertEquals("calendar", SupportClawCapability.Calendar.rawValue)
    assertEquals("motion", SupportClawCapability.Motion.rawValue)
    assertEquals("callLog", SupportClawCapability.CallLog.rawValue)
  }

  @Test
  fun cameraCommandsUseStableStrings() {
    assertEquals("camera.list", SupportClawCameraCommand.List.rawValue)
    assertEquals("camera.snap", SupportClawCameraCommand.Snap.rawValue)
    assertEquals("camera.clip", SupportClawCameraCommand.Clip.rawValue)
  }

  @Test
  fun notificationsCommandsUseStableStrings() {
    assertEquals("notifications.list", SupportClawNotificationsCommand.List.rawValue)
    assertEquals("notifications.actions", SupportClawNotificationsCommand.Actions.rawValue)
  }

  @Test
  fun deviceCommandsUseStableStrings() {
    assertEquals("device.status", SupportClawDeviceCommand.Status.rawValue)
    assertEquals("device.info", SupportClawDeviceCommand.Info.rawValue)
    assertEquals("device.permissions", SupportClawDeviceCommand.Permissions.rawValue)
    assertEquals("device.health", SupportClawDeviceCommand.Health.rawValue)
    assertEquals("device.apps", SupportClawDeviceCommand.Apps.rawValue)
  }

  @Test
  fun systemCommandsUseStableStrings() {
    assertEquals("system.notify", SupportClawSystemCommand.Notify.rawValue)
  }

  @Test
  fun photosCommandsUseStableStrings() {
    assertEquals("photos.latest", SupportClawPhotosCommand.Latest.rawValue)
  }

  @Test
  fun contactsCommandsUseStableStrings() {
    assertEquals("contacts.search", SupportClawContactsCommand.Search.rawValue)
    assertEquals("contacts.add", SupportClawContactsCommand.Add.rawValue)
  }

  @Test
  fun calendarCommandsUseStableStrings() {
    assertEquals("calendar.events", SupportClawCalendarCommand.Events.rawValue)
    assertEquals("calendar.add", SupportClawCalendarCommand.Add.rawValue)
  }

  @Test
  fun motionCommandsUseStableStrings() {
    assertEquals("motion.activity", SupportClawMotionCommand.Activity.rawValue)
    assertEquals("motion.pedometer", SupportClawMotionCommand.Pedometer.rawValue)
  }

  @Test
  fun smsCommandsUseStableStrings() {
    assertEquals("sms.send", SupportClawSmsCommand.Send.rawValue)
    assertEquals("sms.search", SupportClawSmsCommand.Search.rawValue)
  }

  @Test
  fun talkCommandsUseStableStrings() {
    assertEquals("talk.ptt.start", SupportClawTalkCommand.PttStart.rawValue)
    assertEquals("talk.ptt.stop", SupportClawTalkCommand.PttStop.rawValue)
    assertEquals("talk.ptt.cancel", SupportClawTalkCommand.PttCancel.rawValue)
    assertEquals("talk.ptt.once", SupportClawTalkCommand.PttOnce.rawValue)
  }

  @Test
  fun callLogCommandsUseStableStrings() {
    assertEquals("callLog.search", SupportClawCallLogCommand.Search.rawValue)
  }
}
