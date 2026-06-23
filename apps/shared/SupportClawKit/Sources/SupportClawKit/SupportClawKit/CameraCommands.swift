import Foundation

public enum SupportClawCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum SupportClawCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum SupportClawCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum SupportClawCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct SupportClawCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: SupportClawCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: SupportClawCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: SupportClawCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: SupportClawCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct SupportClawCameraClipParams: Codable, Sendable, Equatable {
    public var facing: SupportClawCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: SupportClawCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: SupportClawCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: SupportClawCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}
