import mongoose, { Schema } from "mongoose";
import { decrypt } from "../../utils/crypto";

export interface User {
    id: string;
    discordId: string;
    accessToken: string;
    refreshToken: string;
    accessTokenIV: string;
    refreshTokenIV: string;
}

const UserSchema = new Schema<User>({
    discordId: { type: Schema.Types.String, required: true, unique: true, },
    accessToken: { type: Schema.Types.String, required: true, },
    refreshToken: { type: Schema.Types.String, required: true, },
    accessTokenIV: { type: String, required: true },
    refreshTokenIV: { type: String, required: true },
    //email: { type: mongoose.SchemaTypes.String, require: true, },
});

UserSchema.post("findOne", function (doc: User | null) {
    if (doc) {
        try {
            doc.accessToken = decrypt(doc.accessToken, doc.accessTokenIV);
            doc.refreshToken = decrypt(doc.refreshToken, doc.refreshTokenIV);
        } catch (error) {
            console.error("Failed to decrypt tokens for user:", doc.discordId, error);
        }
    }
});

UserSchema.post("find", function (docs: User[]) {
    docs.forEach((doc) => {
        try {
            doc.accessToken = decrypt(doc.accessToken, doc.accessTokenIV);
            doc.refreshToken = decrypt(doc.refreshToken, doc.refreshTokenIV);
        } catch (error) {
            console.error("Failed to decrypt tokens for user:", doc.discordId, error);
        }
    });
});

export default mongoose.model('users', UserSchema);