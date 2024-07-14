export interface BaseApiResponse<Data = undefined> {
    message: string
    data?: Data
}

export interface Signature {
    payloadMessage: string
    signature: string
    publicKey: string
}

export interface Payload {
    timestamp: Date
}