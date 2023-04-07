export const commands = [`add_player`, `start_combat`];
export type Command = `add_player` | `start_combat`;

export type Player = {
  name: string,
  currentHp: number,
  maxHp: number,
  dexterity: number,
};

export type GameState = {
  players: Array<Player>;
};
