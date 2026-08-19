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

  public func definition() -> ModuleDefinition {
    Name("GameCenter")

    AsyncFunction("authenticateAsync") { (promise: Promise) in
      let localPlayer = GKLocalPlayer.local

      if localPlayer.isAuthenticated {
        promise.resolve(true)
        return
      }

      localPlayer.authenticateHandler = { viewController, error in
        if let viewController {
          self.present(viewController)
          return
        }

        if let error {
          print("Game Center authentication error: \(error.localizedDescription)")
          promise.resolve(false)
          return
        }

        promise.resolve(localPlayer.isAuthenticated)
      }
    }
    .runOnQueue(.main)

    AsyncFunction("showGameCenter") {
      let viewController = GKGameCenterViewController(state: .dashboard)
      viewController.gameCenterDelegate = self.gameCenterDelegate
      self.present(viewController)
    }
    .runOnQueue(.main)
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