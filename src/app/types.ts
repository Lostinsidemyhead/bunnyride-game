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
  all = 0,
  month,
  week
}
export const statsTitle = {
  [statsPeriod.all]: "Все время",
  [statsPeriod.month]: "Месяц",
  [statsPeriod.week]: "Неделя"
}