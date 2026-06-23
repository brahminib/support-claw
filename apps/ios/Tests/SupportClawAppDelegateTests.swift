import Foundation
import Testing
@testable import SupportClaw

@Suite(.serialized) struct SupportClawAppDelegateTests {
    @Test @MainActor func `resolves registry model before view task assigns delegate model`() {
        let registryModel = NodeAppModel()
        SupportClawAppModelRegistry.appModel = registryModel
        defer { SupportClawAppModelRegistry.appModel = nil }

        let delegate = SupportClawAppDelegate()

        #expect(delegate._test_resolvedAppModel() === registryModel)
    }

    @Test @MainActor func `prefers explicit delegate model over registry fallback`() {
        let registryModel = NodeAppModel()
        let explicitModel = NodeAppModel()
        SupportClawAppModelRegistry.appModel = registryModel
        defer { SupportClawAppModelRegistry.appModel = nil }

        let delegate = SupportClawAppDelegate()
        delegate.appModel = explicitModel

        #expect(delegate._test_resolvedAppModel() === explicitModel)
    }

    @Test @MainActor func `derives background refresh task identifier from app bundle identifier`() {
        let delegate = SupportClawAppDelegate()
        let bundleIdentifier = Bundle.main.bundleIdentifier ?? "ai.supportClawfoundation.app.tests"

        #expect(delegate._test_wakeRefreshTaskIdentifier() == "\(bundleIdentifier).bgrefresh")
    }
}
