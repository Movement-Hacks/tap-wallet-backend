export interface BaseApiResponse<Data = undefined> {
    message: string
    data?: Data
}

export interface Signature<PayloadType extends Payload> {
    payload: PayloadType
    signature: string
    publicKey: string
}

export interface Payload {
    timestamp: Date
}