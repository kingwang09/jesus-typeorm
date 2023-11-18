/**
 * config의 env값이 안들어감.
 */
export const encryptTransformerConfig = {
    key: process.env.ENCRYPTION_KEY,
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    iv: process.env.ENCRYPTION_IV,
};