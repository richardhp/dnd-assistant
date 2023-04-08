export type Player = {
  name: string,
  currentHp: number,
  maxHp: number,
  dexterity: number,
};

export type Enemy = {
  name: string,
  currentHp: number,
  maxHp: number,
  dexterity: number,
}

export type PlayerState = `idle` | `combat`;

export type GameState = {
  party: Array<Player>;
  playerState: PlayerState,
  enemies: null | Array<Enemy>;
};
