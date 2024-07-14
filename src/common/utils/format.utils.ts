export const isIsoDateString =(string: string) => {
    return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?/.test(string)
}

const convertISOStrings = (value: object) => {
    if (typeof value === "string" && isIsoDateString(value)) {
        return new Date(value)
    } else if (Array.isArray(value)) {
        return value.map(convertISOStrings)
    } else if (typeof value === "object" && value !== null) {
        for (const key in value) {
            // eslint-disable-next-line no-prototype-builtins
            if (value.hasOwnProperty(key)) {
                value[key] = convertISOStrings(value[key])
            }
        }
    }
    return value
}

export const convertISODatesToObject = (obj: object) => {
    return convertISOStrings(obj)
}