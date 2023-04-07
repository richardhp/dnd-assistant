import { GameState } from "./types.ts";

export function loadState(): GameState {
  try {
    const text = Deno.readTextFileSync("./data/state.json");
    return JSON.parse(text);
  } catch(e) {
    // console.log(`Load State Error: ${e.message}`);
    return {
      players: [],
    }
  }
}

export function saveState(state: GameState) {
  try {
    Deno.writeTextFileSync("./data/state.json", JSON.stringify(state), { 
      create: true,
    });
  } catch (e) {
    // console.log(`Save State Error: ${e.message}`);
    return e.message;
  }
}
