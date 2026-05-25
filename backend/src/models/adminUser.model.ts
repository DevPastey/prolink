import mongoose, { type InferSchemaType } from "mongoose";
const { Schema } = mongoose;
import bcrypt from 'bcrypt';


export const AdminSchema = new Schema({
    email: { type: String, required: [ true, 'Email is required' ], unique: true },  
    username: { type: String, required: [ true, 'Username is required' ], unique: true },
    passwordHash: { 
        type: String, 
        required: [ true, 'Password is required' ], 
        length: [ 6, 'Password must be at least 6 characters long' ],
        select: false // Never return password hashes in queries by default 
    },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
    isActive: { type: Boolean, default: true },
}, { 
    timestamps: true,

    // Senior Choice: Ensure virtuals and lean queries serialize properly to JSON responses
    toJSON: { 
        virtuals: true,
        transform: (doc, ret: Record<string, any>) => {
            delete ret.passwordHash; // Senior Guard: Automatically strip passwordHash from API responses
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

export type IAdmin = InferSchemaType<typeof AdminSchema>;

AdminSchema.pre('save', async function( next: any ) {
    if (!this.isModified('passwordHash')) return next(); // Only validate email format on new or modified emails

    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        return next();

    }catch (err) {
        return next(err);
    }
});

AdminSchema.methods.comparePassword = async function( password: string ): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
}


export const Admin = mongoose.model('Admin', AdminSchema);