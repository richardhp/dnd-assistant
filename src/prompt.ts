import { inject, singleton } from 'https://esm.sh/tsyringe@4.7.0?target=deno';
import { ICommandHandler, IUserInterface, InjectNames } from './interfaces.ts';
import Stack from "npm:ts-data.stack";
import { PlayerState } from './types.ts';
import { timingSafeEqual } from 'https://deno.land/std@0.177.0/crypto/timing_safe_equal.ts';

const commands = [`add_player`, `start_combat`];
type Command = typeof commands[number];
type PromptRuleType = `array` | `number` | `string`;

type PromptRule = {
  type: PromptRuleType,
  arg?: any,
}

/**
 * Menu instances have a context for which their commands are allowed and make sense
 */
interface IMenu {
  get validCommands(): Array<string>;
  get commandPrompt(): string;
}

class Menu implements IMenu {
  private _validCommands: Array<string>
  private _commandPrompt: string;
  private _playerState: PlayerState;

  constructor(
    playerState: PlayerState,
    commandPrompt: string,
    validCommands: Array<string>
  ) {
    this._commandPrompt = commandPrompt;
    this._playerState = playerState;
    this._validCommands = validCommands;
  }

  get validCommands(): string[] {
    return this._validCommands;
  }
  get commandPrompt(): string {
    return this._commandPrompt;
  }
}



@singleton()
export class Prompt implements IUserInterface {

  private _menuStack: Stack<IMenu>;

  constructor(@inject(InjectNames.COMMAND_HANDLER) private _commandHandler: ICommandHandler) {
    // Setup menus
    this._menuStack = new Stack<IMenu>();
    this._menuStack.push(new Menu(`idle`, `Party is idle, enter command`, [`add_player`, `start_combat`]));
  }

  private _getPlayerStats(): { name: string, maxHp: number, dexterity: number} {
    const name = promptByType<string>(`Enter name`, { type: `string` });
    const maxHp = promptByType<number>(`Enter max HP`, { type: `number` });
    const dexterity = promptByType<number>(`Enter dexterity`, { type: `number` });
    return { name, maxHp, dexterity };
  }

  /**
   * 
   * @returns 
   */
  getNextCommand(): Command {
    return promptByType<Command>(this._menuStack.peek().commandPrompt, {
      type: `array`,
      arg: commands,
    })
  }

  async start(): Promise<null> {
    console.clear();
    while(true) {
      switch(this.getNextCommand()) {
        case `add_player`: {
          const stats = this._getPlayerStats();

          const result = await this._commandHandler.addPlayer({
            ...stats,
            currentHp: stats.maxHp,
          });
          if (result instanceof Error) {
            console.log(result.message);
          }
        }
        break;
        case `start_combat`: {
          console.log(`start combat`)
          this._menuStack.push(new Menu(`combat`, `Party in combat`, []))
        }
        break;
      }
    }
  }
}

/**
 * 
 * @param text 
 * @param rule 
 * @returns 
 */
export function promptByType<T>(text: string, rule: PromptRule): T {
  while(true) {
    const input = prompt(`${text}: `);
    if (input === null) {
      console.log(`Must enter a value`);
      continue;
    }
    switch(rule.type) {
      case `array`: {
        if ((rule.arg as Array<string>).includes(input)) {
          return input as T;
        } else {
          console.log(`Value must be one of:`);
          (rule.arg as Array<string>).forEach((value)=> {
            console.log(value)
          });
          continue;
        }
      }
      case `string`:
        return input as T;
      case `number`: {
        const reg = new RegExp('^[0-9]+$');
        if (reg.test(input)) {
          return Number(input) as T;
        }
        console.log(`Can only be number`);
        continue;
      }
    }
  }
}