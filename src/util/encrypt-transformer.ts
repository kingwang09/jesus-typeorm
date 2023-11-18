import { EncryptionTransformer } from "typeorm-encrypted";

/**
 * config의 env값이 안들어감.
 */
export const encryptTransformer: EncryptionTransformer = new EncryptionTransformer({
    key: process.env.ENCRYPTION_KEY,
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    iv: process.env.ENCRYPTION_IV,
});


export function getEncryptTransformer(){
    console.log('[util] process.env.ENCRYPTION_KEY', process.env.ENCRYPTION_KEY);
    console.log('[util] process.env.ENCRYPTION_IV', process.env.ENCRYPTION_IV);
    console.log('[util] MESSAGE: ', process.env.MESSAGE);
    console.log('[util] NODE_ENV: ', process.env.NODE_ENV);

    return new EncryptionTransformer({
        key: process.env.ENCRYPTION_KEY,
        algorithm: 'aes-256-cbc',
        ivLength: 16,
        iv: process.env.ENCRYPTION_IV,
    });
}