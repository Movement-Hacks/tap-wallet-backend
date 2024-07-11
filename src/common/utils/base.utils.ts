import { appConfig } from "@config"

export const getEnvValue = <ValueType = string>(values: {
  development?: ValueType;
  production?: ValueType;
}): ValueType => {
    const { development, production } = values
    switch (appConfig().nodeEnv) {
    case "production":
        return production
    default:
        return development
    }
}

export const sleep = (ms: number = 0) =>
    new Promise((resolve) => setTimeout(resolve, ms))
