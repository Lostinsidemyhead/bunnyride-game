export enum gameState {
  waitingStart = 0,
  playing,
  pause,
  gameOver,
}

export enum playerState {
  idle = 0,
  run,
  jump,
  dead
}

export enum statsPeriod {
  allTime = 0,
  month,
  week
}