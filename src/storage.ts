import { singleton } from 'https://esm.sh/tsyringe@4.7.0?target=deno';
import { IStorage } from './interfaces.ts';
import { GameState, Player } from './types.ts';

@singleton()
export class FileStorage implements IStorage {

  private _state: GameState;

  /**
   * Init the state
   */
  constructor() {
    this._state = {
      players: [],
    };
  }

  /**
   * 
   * @returns 
   */
  private _loadState(): Promise<null> {
    try {
      const text = Deno.readTextFileSync(`./data/state.json`);
      this._state = JSON.parse(text);
    } catch(_e) {}
    return Promise.resolve(null);
  }

  /**
   * 
   * @returns 
   */
  private _saveState(): Promise<null> {
    try {
      Deno.writeTextFileSync(`./data/state.json`, JSON.stringify(this._state), { 
        create: true,
      });
    } catch (_e) {}
    return Promise.resolve(null);
  }

  /**
   * 
   * @returns 
   */
  async init(): Promise<string | null> {
    this._loadState();
    this._saveState();
    return Promise.resolve(null);
  }

  /**
   * 
   * @param data 
   */
  async addPlayer(data: Player): Promise<string | null> {
    this._state.players.push(data);
    return this._saveState();
  }
}
