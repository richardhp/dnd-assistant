import { ICommandHandler, IStorage, InjectNames } from './interfaces.ts';
import { Player } from './types.ts';
import { inject, singleton } from "https://esm.sh/tsyringe@4.7.0?target=deno";

@singleton()
export class CommandHandler implements ICommandHandler {

  constructor(@inject(InjectNames.STORAGE) private _storage: IStorage) {}

  async addPlayer(data: Player): Promise<null | Error> {
    const players = await this._storage.getPlayers();
    if (players instanceof Error) {
      return players;
    }
    const playerNames = players.map((player) => player.name).map((name) => name.toLowerCase());
    if (playerNames.includes(data.name.toLowerCase())) {
      return new Error(`Player name ${data.name} already taken`);
    }
    return this._storage.addPlayer(data);
  }
}