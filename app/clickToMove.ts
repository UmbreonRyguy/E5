import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

function stepDirection(from: Position, to: Position): Direction | undefined {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dy === 0) {
    if (dx === 1) return "right";
    if (dx === -1) return "left";
    return undefined;
  }
  if (dx === 0) {
    if (dy === 1) return "down";
    if (dy === -1) return "up";
  }
  return undefined;
}

export const clickToMove: Controller = {
  label: "Click a neighboring tile",
  attach(session, board) {
    return board.onTileClick((at) => {
      const { puzzle } = session.getState();
      const direction = stepDirection(puzzle.player, at);
      if (direction !== undefined) {
        session.dispatch({ kind: "move", direction });
      }
    });
  },
};
