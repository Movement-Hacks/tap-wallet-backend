export const jwtConfig = () => ({
    secret: process.env.JWT_SECRET,
    expiryTimes: {
        [TokenType.AccessToken]: process.env.ACCESS_TOKEN_EXPIRY_TIME
    }
})

export enum TokenType {
    AccessToken,
}