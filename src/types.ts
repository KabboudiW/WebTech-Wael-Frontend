export interface Player {
  name: string
  value: number
}

export type Leaderboard = Record<string, Player[]>
