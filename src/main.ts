import "https://deno.land/x/reflect_metadata@v0.1.12/mod.ts";
import { container } from "https://esm.sh/tsyringe@4.7.0?target=deno";
import { CommandHandler } from './command-handler.ts';
import { ICommandHandler, IStorage, IUserInterface, InjectNames } from './interfaces.ts';
import { FileStorage } from './storage.ts';
import { Prompt } from "./prompt.ts";


if (import.meta.main) {
  // Register dependencies
  const storage = new FileStorage();
  storage.init();
  container.register<IStorage>(InjectNames.STORAGE, { useValue: storage });
  container.register<ICommandHandler>(InjectNames.COMMAND_HANDLER, { useClass: CommandHandler });
  container.register<IUserInterface>(InjectNames.USER_INTERFACE, { useClass: Prompt });
  
  container.resolve<IUserInterface>(InjectNames.USER_INTERFACE).start();

}
