import { inject, singleton } from 'https://esm.sh/tsyringe@4.7.0?target=deno';
import { ICommandHandler, IUserInterface, InjectNames } from './interfaces.ts';
import { Command, commands } from "./types.ts";

export type PromptRuleType = `array` | `number` | `string`;

export type PromptRule = {
  type: PromptRuleType,
  arg?: any,
}


/**
 * 
 * @returns 
 */
function getNextCommand(): Command {
  return promptByType<Command>(`Enter next command`, {
    type: `array`,
    arg: commands,
  })
}

@singleton()
export class Prompt implements IUserInterface {

  constructor(@inject(InjectNames.COMMAND_HANDLER) private _commandHandler: ICommandHandler) {}

  async start(): Promise<null> {
    
    while(true) {
      switch(getNextCommand()) {
        case `add_player`: {
          const name = promptByType<string>(`What is the player called`, { type: `string` });
          const maxHp = promptByType<number>(`What is the max HP`, { type: `number` });
          const dexterity = promptByType<number>(`What is the dexterity`, { type: `number` });

          this._commandHandler.addPlayer({
            name: name,
            currentHp: maxHp,
            maxHp: maxHp,
            dexterity: dexterity,
          });
        }
        break;
        case `start_combat`: {
          console.log(`start combat`)
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