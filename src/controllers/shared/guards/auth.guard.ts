import { AptosService } from "@global"
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from "@nestjs/common"

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name)

    constructor(
    private readonly aptosService: AptosService,
    ) {}
    
    canActivate(context: ExecutionContext): boolean {
        try {
            const request = context.switchToHttp().getRequest()
            const { body } = request
            const { message, signature, publicKey } = body

            const address = this.aptosService.verifyMessage({
                message: JSON.stringify(message),
                signature,
                publicKey,
            })

            request.address = address
            return true
        } catch (ex) {
            this.logger.error(ex.message)
            throw new UnauthorizedException("Signature verification failed.")
        }
    }
}
