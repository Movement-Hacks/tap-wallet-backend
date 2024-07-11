export interface BaseApiResponse<Data = undefined> {
    message: string
    data?: Data
}

export interface Signature<Payload> {
    payload: Payload
    signature: string
    publicKey: string
}