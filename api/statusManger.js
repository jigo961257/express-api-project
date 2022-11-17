const successMSG = (code = 200, message, data) => {
    return {
        code: code,
        data: data || null,
        message: message
    }
}

const errorMSG = (code = 500, message, error) => {
    return {
        data: null,
        code: code,
        message: message,
        error: error
    }
}

module.exports = {
    successMSG,
    errorMSG,
}