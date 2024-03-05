import {Module} from '@nestjs/common';
import { NewCommand } from './commands/new';
import { InitCatalogCommand } from './commands/init-catalog';

@Module({
    imports: [],
    providers: [
        NewCommand,
        InitCatalogCommand,
    ]
})

export class AppModule {}