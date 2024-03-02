import {Module} from '@nestjs/common';
import { NewCommand } from './commands/new';

@Module({
    imports: [],
    providers: [
        NewCommand
    ]
})

export class AppModule {}