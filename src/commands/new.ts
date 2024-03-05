import { Logger } from "@nestjs/common";
import { readdir } from "fs/promises";
import { Command, CommandRunner } from "nest-commander";

interface CommandOptions {}

@Command({
  name: 'new',
  arguments: '<label> <path>',
  description: 'new command',
})
export class NewCommand extends CommandRunner {
  /**
   * @Command.nameで呼び出された時に実行される処理
   */
  async run([label, path]: string[], options?: CommandOptions): Promise<void> {
    Logger.log({ label, path, options }, NewCommand.name);
    return readdir(path).then((files) => {
      Logger.log(files, NewCommand.name);
    });
  }
}