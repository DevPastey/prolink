import { Schema, model, type InferSchemaType, type HydratedDocument, type Types, type Model } from "mongoose";
import bcrypt from "bcrypt";

export const roles = ["superAdmin", "admin", "professional"] as const;

export const accountStatuses = [
  "active",
  "disabled",
  "pending",
] as const;


type Role = (typeof roles)[number];
type AccountStatus = (typeof accountStatuses)[number];


interface AccountSchemaType {
  email: string;
  passwordHash: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiresAt?: Date | null;
  passwordChangedAt?: Date | null;
  name: string;
  role: Role;
  status: AccountStatus;
  lastLoginAt?: Date | null;
  createdBy?: Types.ObjectId | null;
}

interface AccountMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type AccountDocument = HydratedDocument<
  AccountSchemaType,
  AccountMethods
>;

type AccountModelType = Model<AccountSchemaType, {}, AccountMethods>;

const accountSchema = new Schema<
  AccountSchemaType,
  AccountModelType,
  AccountMethods
>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      default: null,
      select: false,
    },

    resetPasswordExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },

    passwordChangedAt: {
      type: Date,
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: roles,
      required: true,
      default: "professional",
      index: true,
    },

    status: {
      type: String,
      enum: accountStatuses,
      default: "active",
      index: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,

    toJSON: {
      transform(_, ret: Record<string, any>) {
        delete ret.passwordHash;
        delete ret.__v;

        return ret;
      },
    },
  }
);

accountSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;

  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
});

accountSchema.methods.comparePassword = async function (
  password: string
) {
  return bcrypt.compare(password, this.passwordHash);
};

const projectLinkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnailUrl: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const professionalProfileSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    avatarUrl: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
      index: true,
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    location: {
      type: String,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },

    projectLinks: {
      type: [projectLinkSchema],
      default: [],
    },

    socialMedia: {
      linkedin: {
        type: String,
        trim: true,
      },

      twitter: {
        type: String,
        trim: true,
      },

      github: {
        type: String,
        trim: true,
      },

      portfolio: {
        type: String,
        trim: true,
      },

      website: {
        type: String,
        trim: true,
      },
    },

    cta: {
      channel: {
        type: String,
        enum: [
          "email",
          "linkedin",
          "whatsapp",
          "calendly",
          "website",
        ],
      },

      value: {
        type: String,
        trim: true,
      },

      clickCount: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const adminProfileSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      unique: true,
      index: true,
    },

    permissions: {
      type: [String],
      default: [],
    },

    department: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);



export type ProfessionalProfileType =
  InferSchemaType<
    typeof professionalProfileSchema
  >;

export type AdminProfileType = InferSchemaType<
  typeof adminProfileSchema
>;

export const Account = model(
  "Account",
  accountSchema
);

export const Professional = model(
  "ProfessionalProfile",
  professionalProfileSchema
);

export const Admin = model(
  "AdminProfile",
  adminProfileSchema
);