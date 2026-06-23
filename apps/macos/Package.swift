// swift-tools-version: 6.2
// Package manifest for the SupportClaw macOS companion (menu bar app + IPC library).

import PackageDescription

let package = Package(
    name: "SupportClaw",
    platforms: [
        .macOS(.v15),
    ],
    products: [
        .library(name: "SupportClawIPC", targets: ["SupportClawIPC"]),
        .library(name: "SupportClawDiscovery", targets: ["SupportClawDiscovery"]),
        .executable(name: "SupportClaw", targets: ["SupportClaw"]),
        .executable(name: "supportClaw-mac", targets: ["SupportClawMacCLI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/orchetect/MenuBarExtraAccess", exact: "1.3.0"),
        .package(url: "https://github.com/swiftlang/swift-subprocess.git", from: "0.4.0"),
        .package(url: "https://github.com/apple/swift-log.git", from: "1.10.1"),
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.9.0"),
        .package(url: "https://github.com/steipete/Peekaboo.git", exact: "3.5.2"),
        .package(path: "../shared/SupportClawKit"),
        .package(path: "../swabble"),
    ],
    targets: [
        .target(
            name: "SupportClawIPC",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "SupportClawDiscovery",
            dependencies: [
                .product(name: "SupportClawKit", package: "SupportClawKit"),
            ],
            path: "Sources/SupportClawDiscovery",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "SupportClaw",
            dependencies: [
                "SupportClawIPC",
                "SupportClawDiscovery",
                .product(name: "SupportClawKit", package: "SupportClawKit"),
                .product(name: "SupportClawChatUI", package: "SupportClawKit"),
                .product(name: "SupportClawProtocol", package: "SupportClawKit"),
                .product(name: "SwabbleKit", package: "swabble"),
                .product(name: "MenuBarExtraAccess", package: "MenuBarExtraAccess"),
                .product(name: "Subprocess", package: "swift-subprocess"),
                .product(name: "Logging", package: "swift-log"),
                .product(name: "Sparkle", package: "Sparkle"),
                .product(name: "PeekabooBridge", package: "Peekaboo"),
                .product(name: "PeekabooAutomationKit", package: "Peekaboo"),
            ],
            exclude: [
                "Resources/Info.plist",
            ],
            resources: [
                .copy("Resources/SupportClaw.icns"),
                .copy("Resources/DeviceModels"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "SupportClawMacCLI",
            dependencies: [
                "SupportClawDiscovery",
                .product(name: "SupportClawKit", package: "SupportClawKit"),
                .product(name: "SupportClawProtocol", package: "SupportClawKit"),
            ],
            path: "Sources/SupportClawMacCLI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "SupportClawIPCTests",
            dependencies: [
                "SupportClawIPC",
                "SupportClaw",
                "SupportClawMacCLI",
                "SupportClawDiscovery",
                .product(name: "SupportClawProtocol", package: "SupportClawKit"),
                .product(name: "SwabbleKit", package: "swabble"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
