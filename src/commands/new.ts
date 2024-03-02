import { Logger } from "@nestjs/common";
import { Command, CommandRunner } from "nest-commander";

interface CommandOptions {}

@Command({
  name: 'new',
  description: 'new command',
})
export class NewCommand extends CommandRunner {
  /**
   * @Command.nameで呼び出された時に実行される処理
   */
  async run(passedParams: string[], options?: CommandOptions): Promise<void> {
    Logger.log({ passedParams, options }, NewCommand.name);
    return Promise.resolve();
  }
}