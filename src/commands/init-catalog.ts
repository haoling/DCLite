import { Logger } from "@nestjs/common";
import { readdir } from "fs/promises";
import { Command, CommandRunner } from "nest-commander";
import * as fs from 'fs'

interface CommandOptions {}

@Command({
  name: 'init-catalog',
  description: 'Initialize a new catalog',
})
export class InitCatalogCommand extends CommandRunner {
  /**
   * @Command.nameで呼び出された時に実行される処理
   */
  async run([label, path]: string[], options?: CommandOptions): Promise<void> {
    // dclite.db ファイルが存在するか調べて、あればエラーにする
    if (await this.existsDcliteDb()) {
      Logger.error('dclite.db already exists', InitCatalogCommand.name);
      throw new Error('dclite.db already exists');
    }

    // なければ、作成する。SQLite3のデータベースファイルで、空のファイルを作成するだけ
    await this.createDcliteDb();
  }

  // existsDcliteDb
  private async existsDcliteDb(): Promise<boolean> {
    try {
      if (fs.fstatSync(fs.openSync('./dclite.db', 'r')).isFile()) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // createDcliteDb
  private async createDcliteDb(): Promise<void> {
    await this.writeFile('./dclite.db', '');
  }

  // writeFile
  private async writeFile(path: string, data: string): Promise<void> {
    // ファイルを作成する
    await fs.writeFile(path, data, (err) => {
      if (err) {
        Logger.error(err, InitCatalogCommand.name);
      }
    });
  }
}