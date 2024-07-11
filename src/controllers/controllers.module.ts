import { Module } from "@nestjs/common"

import { AuthModule } from "./auth"
import { GameModule } from "./game"

@Module({
    imports: [
        AuthModule,
        GameModule
    ],
    providers: []
})
export class ControllersModule {}