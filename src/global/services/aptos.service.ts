import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { Injectable } from "@nestjs/common"

@Injectable()
export class AptosService {
    constructor() {}

    verifyMessage
}

export interface VerfiyMessageParams {
    senderAddress: string,
    message: string,
    signature: string
}

export const getAptos = (network: Network) =>
    new Aptos(
        new AptosConfig({
            network,
        }),
    )
