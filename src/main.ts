import { promptByType } from './prompt.ts';
import { loadState, saveState } from './storage.ts';
import { Command, commands } from "./types.ts";

let state = loadState();
saveState(state);

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


if (import.meta.main) {
  while(true) {
    switch(getNextCommand()) {
      case `add_player`: {
        const name = promptByType<string>(`What is the player called`, { type: `string` });
        const maxHp = promptByType<number>(`What is the max HP`, { type: `number` });
        const dexterity = promptByType<number>(`What is the dexterity`, { type: `number` });

        state.players.push({
          name: name,
          currentHp: maxHp,
          maxHp: maxHp,
          dexterity: dexterity,
        });
        saveState(state);
      }
      
      break;
    }
  }
}
