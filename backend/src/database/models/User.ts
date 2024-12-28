import mongoose, { Schema } from "mongoose";

export interface User {
    id: string;
    discordId: string;
    accessToken: string;
    refreshToken: string;
}

const UserSchema = new Schema<User>({
    discordId: { type: Schema.Types.String, required: true, unique: true, },
    accessToken: { type: Schema.Types.String, required: true, },
    refreshToken: { type: Schema.Types.String, required: true, },
    //email: { type: mongoose.SchemaTypes.String, require: true, },
});

export default mongoose.model('users', UserSchema);