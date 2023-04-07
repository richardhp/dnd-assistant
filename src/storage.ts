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
      return Promise.resolve(null);
    } catch(e) {
      return Promise.resolve(e);
    }
  }

  /**
   * 
   * @returns 
   */
  private _saveState(): Promise<null | Error> {
    try {
      Deno.writeTextFileSync(`./data/state.json`, JSON.stringify(this._state), { 
        create: true,
      });
      return Promise.resolve(null);
    } catch (e) {
      return Promise.resolve(e);  
    }
  }

  /**
   * 
   * @returns 
   */
  async init(): Promise<null | Error> {
    this._loadState();
    this._saveState();
    return Promise.resolve(null);
  }

  /**
   * 
   * @param data 
   */
  async addPlayer(data: Player): Promise<null | Error> {
    this._state.players.push(data);
    return this._saveState();
  }

  /**
   * 
   */
  getPlayers(): Promise<Array<Player> | Error> {
    return Promise.resolve(this._state.players);
  }
}
