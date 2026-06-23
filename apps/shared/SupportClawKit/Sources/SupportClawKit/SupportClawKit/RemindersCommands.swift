import Foundation

public enum SupportClawRemindersCommand: String, Codable, Sendable {
    case list = "reminders.list"
    case add = "reminders.add"
}

public enum SupportClawReminderStatusFilter: String, Codable, Sendable {
    case incomplete
    case completed
    case all
}

public struct SupportClawRemindersListParams: Codable, Sendable, Equatable {
    public var status: SupportClawReminderStatusFilter?
    public var limit: Int?

    public init(status: SupportClawReminderStatusFilter? = nil, limit: Int? = nil) {
        self.status = status
        self.limit = limit
    }
}

public struct SupportClawRemindersAddParams: Codable, Sendable, Equatable {
    public var title: String
    public var dueISO: String?
    public var notes: String?
    public var listId: String?
    public var listName: String?

    public init(
        title: String,
        dueISO: String? = nil,
        notes: String? = nil,
        listId: String? = nil,
        listName: String? = nil)
    {
        self.title = title
        self.dueISO = dueISO
        self.notes = notes
        self.listId = listId
        self.listName = listName
    }
}

public struct SupportClawReminderPayload: Codable, Sendable, Equatable {
    public var identifier: String
    public var title: String
    public var dueISO: String?
    public var completed: Bool
    public var listName: String?

    public init(
        identifier: String,
        title: String,
        dueISO: String? = nil,
        completed: Bool,
        listName: String? = nil)
    {
        self.identifier = identifier
        self.title = title
        self.dueISO = dueISO
        self.completed = completed
        self.listName = listName
    }
}

public struct SupportClawRemindersListPayload: Codable, Sendable, Equatable {
    public var reminders: [SupportClawReminderPayload]

    public init(reminders: [SupportClawReminderPayload]) {
        self.reminders = reminders
    }
}

public struct SupportClawRemindersAddPayload: Codable, Sendable, Equatable {
    public var reminder: SupportClawReminderPayload

    public init(reminder: SupportClawReminderPayload) {
        self.reminder = reminder
    }
}
