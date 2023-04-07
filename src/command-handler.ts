import { ICommandHandler, IStorage, InjectNames } from './interfaces.ts';
import { Player } from './types.ts';
import { inject, singleton } from "https://esm.sh/tsyringe@4.7.0?target=deno";

@singleton()
export class CommandHandler implements ICommandHandler {

  constructor(@inject(InjectNames.STORAGE) private _storage: IStorage) {}

  async addPlayer(data: Player): Promise<string | null> {
    return this._storage.addPlayer(data);
  }
}