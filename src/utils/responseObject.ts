const responseObject = (code: number, status: string, message?: string | null, data?: object | null) => {
    return {
        code,
        status,
        message,
        data,
    }
}

export default responseObject
