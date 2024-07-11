export interface BaseApiResponse<Data = undefined> {
    message: string
    data?: Data
}

export interface BaseAuthInput<RequestBody> {
    accountId: string
    body: RequestBody
}