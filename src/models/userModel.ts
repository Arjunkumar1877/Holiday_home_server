import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

export type UserType = {
    _id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    otp?: string;
    verified?: boolean;
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }

});


userSchema.pre("save", async function(next) {
     if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
     }
     next();
})


export const UserModel = mongoose.model<UserType>("User", userSchema);