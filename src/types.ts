export const commands = [`add_player`, `start_combat`];
export type Command = `add_player` | `start_combat`;

export type Player = {
  name: String,
  currentHp: Number,
  maxHp: Number,
  dexterity: Number,
};

export type GameState = {
  players: Array<Player>;
};
