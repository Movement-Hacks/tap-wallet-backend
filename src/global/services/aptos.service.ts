import {
    Aptos,
    AptosConfig,
    Ed25519PublicKey,
    Ed25519Signature,
    Network
} from "@aptos-labs/ts-sdk"
import { BadRequestException, Injectable } from "@nestjs/common"

@Injectable()
export class AptosService {
    constructor() {}

    public verifyMessage({ message, signature, publicKey }: VerfiyMessageParams) {
        const ed25519PublicKey = new Ed25519PublicKey(publicKey)
        const result = ed25519PublicKey.verifySignature({
            message,
            signature: new Ed25519Signature(signature),
        })
        if (!result) throw new BadRequestException("Signature verification failed.")
        return ed25519PublicKey.authKey().toString()
    }
}

export interface VerfiyMessageParams {
  message: string;
  signature: string;
  publicKey: string;
}

export const getAptos = (network: Network) =>
    new Aptos(
        new AptosConfig({
            network,
        }),
    )
