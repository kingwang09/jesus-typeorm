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

export const EncryptTransformer: EncryptionTransformer = new EncryptionTransformer(
    {
      key: process.env.ENCRYPTION_KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: process.env.ENCRYPTION_IV,
    },
  );


export function getEncryptTransformer(){
    return new EncryptionTransformer({
        key: process.env.ENCRYPTION_KEY,
        algorithm: 'aes-256-cbc',
        ivLength: 16,
        iv: process.env.ENCRYPTION_IV,
    });
}