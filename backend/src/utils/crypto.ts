// utils/crypto.ts
import dotenv from 'dotenv';
import path from 'path';
import crypto from "crypto";

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const algorithm = 'aes-256-cbc';

if (ENCRYPTION_KEY.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be exactly 32 characters long.");
}

/**
 * Encrypts a token using AES-256-CBC.
 * @param token - The token to encrypt.
 * @returns An object containing the encrypted token and the IV (base64 encoded).
 */
export function encrypt(token: string): { iv: string; encrypted: string } {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, iv);

        let encrypted = cipher.update(token, "utf-8", "hex");
        encrypted += cipher.final("hex");

        return {
            iv: iv.toString("base64"), // Return IV as base64
            encrypted,
        };
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("Failed to encrypt the token.");
    }
}

/**
 * Decrypts a token using AES-256-CBC.
 * @param token - The encrypted token.
 * @param iv - The IV (base64 encoded) used during encryption.
 * @returns The decrypted token.
 */
export function decrypt(token: string, iv: string): string {
    try {
        const decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, Buffer.from(iv, "base64"));

        let decrypted = decipher.update(token, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
    } catch (error) {
        console.error("Decryption failed:", error);
        throw new Error("Failed to decrypt the token.");
    }
}
