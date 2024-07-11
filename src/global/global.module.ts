import { Global, Module } from "@nestjs/common"
import { AptosService } from "./services"

@Global()
@Module({
    imports: [],
    exports: [AptosService],
    providers: [AptosService],
})
export class GlobalModule {}
