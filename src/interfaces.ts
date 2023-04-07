import { Player } from "./types.ts";

export enum InjectNames {
  STORAGE = `STORAGE`,
  COMMAND_HANDLER = `COMMAND_HANDLER`,
  USER_INTERFACE = `USER_INTERFACE`,
}

export interface IUserInterface {
  start(): Promise<null>;
}

export interface ICommandHandler {
  addPlayer(data: Player): Promise<null | Error>;
}

export interface IStorage {
  init(): Promise<null | Error>;
  // READ
  getPlayers(): Promise<Array<Player> | Error>;
  // UPSERT
  addPlayer(data: Player): Promise<null | Error>;
}
