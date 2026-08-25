import ExpoModulesCore
import GameKit
import UIKit

private class GameCenterDelegate: NSObject, GKGameCenterControllerDelegate {
  func gameCenterViewControllerDidFinish(
    _ gameCenterViewController: GKGameCenterViewController
  ) {
    gameCenterViewController.dismiss(animated: true)
  }
}

public class GameCenterModule: Module {
  private let gameCenterDelegate = GameCenterDelegate()
  private var hasSentAuthenticationEvent = false

  public func definition() -> ModuleDefinition {
    Name("GameCenter")

    Events("onAuthenticated")

    AsyncFunction("authenticateAsync") { (promise: Promise) in
      let localPlayer = GKLocalPlayer.local

      if localPlayer.isAuthenticated {
        self.sendAuthenticationEventIfNeeded()
        promise.resolve(true)
        return
      }

      localPlayer.authenticateHandler = { [weak self] viewController, error in
        if let viewController {
          self?.present(viewController)
          return
        }

        if let error {
          print(
            "Game Center authentication error: \(error.localizedDescription)"
          )
          promise.resolve(false)
          return
        }

        let authenticated = localPlayer.isAuthenticated

        if authenticated {
          self?.sendAuthenticationEventIfNeeded()
        }

        promise.resolve(authenticated)
      }
    }
    .runOnQueue(.main)

    AsyncFunction("showGameCenter") {
      let viewController = GKGameCenterViewController(state: .dashboard)
      viewController.gameCenterDelegate = self.gameCenterDelegate
      self.present(viewController)
    }
    .runOnQueue(.main)

    AsyncFunction("submitScore") { (score: Int, leaderboardID: String) in
      try await GKLeaderboard.submitScore(
        score,
        context: 0,
        player: GKLocalPlayer.local,
        leaderboardIDs: [leaderboardID]
      )
    }

    AsyncFunction("isAuthenticated") {
      GKLocalPlayer.local.isAuthenticated
    }

    AsyncFunction("getScore") { (leaderboardID: String) -> Int? in
    let leaderboards = try await GKLeaderboard.loadLeaderboards(
      IDs: [leaderboardID]
    )

    guard let leaderboard = leaderboards.first else {
      throw NSError(
        domain: "GameCenter",
        code: 1,
        userInfo: [
          NSLocalizedDescriptionKey: "Leaderboard not found"
        ]
      )
    }

    let result = try await leaderboard.loadEntries(
      for: GKLeaderboard.PlayerScope.global,
      timeScope: GKLeaderboard.TimeScope.allTime,
      range: NSRange(location: 1, length: 100)
    )

    return result.0?.score
  }

    OnCreate {
      self.setupAuthenticationHandler()
    }
  }

  private func setupAuthenticationHandler() {
    let localPlayer = GKLocalPlayer.local

    localPlayer.authenticateHandler = { [weak self] viewController, error in
      if let viewController {
        self?.present(viewController)
        return
      }

      if let error {
        print(
          "Game Center authentication error: \(error.localizedDescription)"
        )
        return
      }

      self?.sendAuthenticationEventIfNeeded()
    }

    // Handle the case where Game Center is already authenticated.
    sendAuthenticationEventIfNeeded()
  }

  private func sendAuthenticationEventIfNeeded() {
    let localPlayer = GKLocalPlayer.local

    guard localPlayer.isAuthenticated else {
      return
    }

    guard !hasSentAuthenticationEvent else {
      return
    }

    hasSentAuthenticationEvent = true

    sendEvent(
      "onAuthenticated",
      [
        "playerID": localPlayer.gamePlayerID
      ]
    )
  }

  private func present(_ viewController: UIViewController) {
    guard let windowScene = UIApplication.shared.connectedScenes
      .compactMap({ $0 as? UIWindowScene })
      .first(where: { $0.activationState == .foregroundActive }),
      let rootViewController = windowScene.windows
        .first(where: { $0.isKeyWindow })?.rootViewController
    else {
      return
    }

    var presenter = rootViewController

    while let presented = presenter.presentedViewController {
      presenter = presented
    }

    presenter.present(viewController, animated: true)
  }
}