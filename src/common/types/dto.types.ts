export interface BaseApiResponse<Data = undefined> {
    message: string
    data?: Data
}

export interface Signature<Message> {
    message: Message
    signature: string
    publicKey: string
}