import Foundation
import Testing
@testable import SupportClaw

@Suite(.serialized) struct NodeServiceManagerTests {
    @Test func `builds node service commands with current CLI shape`() async throws {
        try await TestIsolation.withUserDefaultsValues(["supportClaw.gatewayProjectRootPath": nil]) {
            let tmp = try makeTempDirForTests()
            CommandResolver.setProjectRoot(tmp.path)

            let supportClawPath = tmp.appendingPathComponent("node_modules/.bin/supportClaw")
            try makeExecutableForTests(at: supportClawPath)

            let start = NodeServiceManager._testServiceCommand(["start"])
            #expect(start == [supportClawPath.path, "node", "start", "--json"])

            let stop = NodeServiceManager._testServiceCommand(["stop"])
            #expect(stop == [supportClawPath.path, "node", "stop", "--json"])
        }
    }
}
