import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { appConfig, databaseConfig, jwtConfig, keysConfig } from "./config"
import { GlobalModule } from "@global"
import { ControllersModule } from "controllers/controllers.module"
import { ThrottlerModule } from "@nestjs/throttler"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, keysConfig, databaseConfig, jwtConfig],
            isGlobal: true,
        }),

        TypeOrmModule.forRoot({
            type: "postgres",
            host: databaseConfig().postgres.host,
            port: databaseConfig().postgres.port,
            username: databaseConfig().postgres.username,
            password: databaseConfig().postgres.password,
            database: databaseConfig().postgres.database,
            autoLoadEntities: true,
            synchronize: true,
        }),

        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 1000,
        }]),

        GlobalModule,

        ControllersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
