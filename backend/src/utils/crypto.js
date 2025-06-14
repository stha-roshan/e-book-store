import crypto from "crypto"

const generateHash = (total_amount, transaction_uuid, product_code) => {

    try {
        const data = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`

        const secretKey = process.env.ESEWA_HMAC_SECRET

        if (!secretKey) {
            throw new Error("Secret key is missing in the environment variables.")
        }

        const hash = crypto
        .createHmac("sha256", secretKey )
        .update(data)
        .digest("base64")

        return hash
    } catch (error) {
        console.error("Error generating HMAC hash:", error)
        throw new Error("Failed to generate HMAC hash")
    }
}

export { generateHash }