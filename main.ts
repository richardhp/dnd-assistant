
const commands = [`add_player`, `start_combat`];
type Command = `add_player` | `start_combat`;

type Player = {
  name: String,
  currentHp: Number,
  maxHp: Number,
  initiative: Number,
};

type GameState = {
  players: Array<Player>;
};

/**
 * 
 * @returns 
 */
function getNextCommand(): Command {
  while(true) {
    const input = prompt('Command me sire: ');
    if (input === null) {
      continue;
    }
    if (commands.includes(input)) {
      return input as Command;
    }
    continue;
  }
}



if (import.meta.main) {
  const nextCommand = getNextCommand();
  switch(nextCommand) {
    case `add_player`:
      
    break;
  }
  console.log(nextCommand)
}

