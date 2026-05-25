import { Schema, type InferSchemaType, model } from "mongoose";
import bcrypt from 'bcrypt';

export const COMMUNICATION_CHANNELS = ['email', 'linkedin', 'whatsapp', 'calendly', 'website'] as const;
export type CommunicationChannel = typeof COMMUNICATION_CHANNELS[number];


// 1. SUBDOCUMENT SCHEMA (Project Link)
const ProjectLinkSchema = new Schema({
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, trim: true }, 
    description: { type: String, trim: true }
}, { _id: false });


// 2. MAIN PROFILE SCHEMA
export const ProfessionalSchema = new Schema({
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true, 
        lowercase: true, // Auto-normalize emails to avoid duplicates like Test@test.com
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'] // Built-in regex validation
    },
    passwordHash: { 
        type: String, 
        required: [true, 'Password is required'], 
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Never return password hashes in queries by default
    },
    name: { type: String, required: [true, 'Name is required'], trim: true },
    title: { type: String, required: [true, 'Title is required'], trim: true },
    avatarUrl: { type: String, trim: true },
    bio: { type: String, trim: true },
    skills: { 
        type: [String], 
        default: [],
        index: true // Index arrays if you plan to search users by specific skills
    },       
    location: { type: String, trim: true },     
    isAvailable: { type: Boolean, default: true, index: true }, // Fast filtering for available users
    isFeatured: { type: Boolean, default: false, index: true },   // Fast filtering for featured users
    
    projectLinks: {
        type: [ProjectLinkSchema],
        default: [] // Avoid null/undefined arrays at runtime
    },

    cta: {
        channel: { 
            type: String, 
            enum: {
                values: COMMUNICATION_CHANNELS,
                message: '{VALUE} is not a supported communication channel'
            },
            required: true 
        },        
        value: { type: String, required: true, trim: true }, 
        clickCounts: { type: Number, default: 0, min: 0 } // Prevent negative click counts
    },

    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'Admin',
        required: [true, 'Creator Admin reference is required'],
        index: true // Crucial for tracking user management audits efficiently
    }, 
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


// 3. SINGLE SOURCE OF TRUTH TYPES
// Automatically extracts the exact TypeScript types from the Mongoose definitions
export type IProfessionalUser = InferSchemaType<typeof ProfessionalSchema>;

ProfessionalSchema.pre('save', async function( next: any ) {
    if (!this.isModified('passwordHash')) return next(); // Only validate email format on new or modified emails

    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        return next();

    }catch (err) {
        return next(err);
    }
});

ProfessionalSchema.methods.comparePassword = async function( password: string ): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
}

export const ProfessionalUser = model<IProfessionalUser>('ProfessionalUser', ProfessionalSchema);
