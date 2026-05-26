import { type Request, type Response, type NextFunction } from "express";
import mongoose, {Types} from "mongoose";
import { Account, Professional, type AccountDocument, type ProfessionalProfileType } from "../models/user.model.js";

export const createProfessional = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      email,
      password,
      name,
      title,
      avatarUrl,
      bio,
      skills,
      services,
      experienceYears,
      location,
      projectLinks,
      socialMedia,
      cta,
    } = req.body;

    const existingAccount = await Account.findOne({ email }).session(session);

    if (existingAccount) {
      await session.abortTransaction();
      res.status(409).json({
        success: false,
        message: "Account already exists",
      });
      return;
    }

    const [account] = await Account.create(
      [
        {
          email,
          passwordHash: password,
          name,
          role: "professional",
          createdBy: req.user?.id as string,
        },
      ],
      { session }
    ) as AccountDocument[];

    const [professional] = await Professional.create(
      [
        {
          accountId: account?._id as mongoose.Types.ObjectId,
          title,
          avatarUrl,
          bio,
          skills,
          services,
          experienceYears,
          location,
          projectLinks,
          socialMedia,
          cta,
        },
      ],
      { session }
    ) as ProfessionalProfileType[];

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Professional created successfully",
      data: professional,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const getProfessionals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit as string) || 10)
    );
    const skip = (page - 1) * limit;

    const filterQuery: Record<string, any> = {};

    if (req.query.onlyAvailable !== "false") {
      filterQuery.isAvailable = true;
    }

    if (req.query.skills && typeof req.query.skills === "string") {
      const skillsArray = req.query.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      if (skillsArray.length > 0) {
        filterQuery.skills = { $all: skillsArray };
      }
    }

    if (req.query.isFeatured !== undefined) {
      filterQuery.isFeatured = req.query.isFeatured === "true";
    }

    if (req.query.isVerified !== undefined) {
      filterQuery.isVerified = req.query.isVerified === "true";
    }

    if (req.query.location && typeof req.query.location === "string") {
      filterQuery.location = {
        $regex: req.query.location,
        $options: "i",
      };
    }

    if (req.query.search && typeof req.query.search === "string") {
      const search = req.query.search.trim();

      filterQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
        { services: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const [total, professionals] = await Promise.all([
      Professional.countDocuments(filterQuery),

      Professional.find(filterQuery)
        .populate("accountId", "name email role status")
        .select("-__v")
        .sort({ isFeatured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      data: professionals,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfessionalById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
      return;
    }

    const professional = await Professional.findById(id)
      .populate("accountId", "name email role status")
      .select("-__v")
      .lean();

    if (!professional) {
      res.status(404).json({
        success: false,
        message: "Professional not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: professional,
    });
  } catch (error) {
    next(error);
  }
};


export const createMyProfessionalProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const _id = req.user?.id as string;

    const existingProfile = await Professional.findOne({
      accountId: _id,
    });

    if (existingProfile) {
      res.status(409).json({
        success: false,
        message: "Professional profile already exists",
      });
      return;
    }

    const professional = await Professional.create({
      accountId: _id,
      ...req.body,
    });

    await Account.findByIdAndUpdate(_id, {
      role: "professional",
    });

    res.status(201).json({
      success: true,
      message: "Professional profile created successfully",
      data: professional,
    });
  } catch (error) {
    next(error);
  }
};


export const updateProfessional = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const _id = id as string;

    console.log(_id);

    if (!mongoose.Types.ObjectId.isValid(_id as string)) {
      res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
      return;
    }

    const blockedFields = [
      "_id",
      "accountId",
      "createdAt",
      "updatedAt",
      "__v",
      "cta.clickCount",
    ];

    for (const field of blockedFields) {
      delete req.body[field];
    }

    const professional = await Professional.findOneAndUpdate({ accountId: _id }, req.body, {
        returnDocument: 'after',
        runValidators: true,
    })
      .populate("accountId", "name email role status")
      .select("-__v");

    if (!professional) {
      res.status(404).json({
        success: false,
        message: "Professional not found",
      });
      return;
    }

    const isOwner = professional.accountId.toString() === req.user?.id.toString();

    const isAdmin = req.user?.role === "admin" || req.user?.role === "superAdmin";

    if (!isOwner && !isAdmin) {
        res.status(403).json({
            success: false,
            message: "You are not allowed to update this profile",
        });
        return;
    }

    Object.assign(professional, req.body);

    await professional.save();

    res.status(200).json({
      success: true,
      message: "Professional updated successfully",
      data: professional,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfessional = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      await session.abortTransaction();

      res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
      return;
    }

    const professional = await Professional.findById(id).session(session);

    if (!professional) {
      await session.abortTransaction();

      res.status(404).json({
        success: false,
        message: "Professional not found",
      });
      return;
    }

    await Professional.findByIdAndDelete(id).session(session);

    await Account.findByIdAndDelete(professional.accountId).session(session);

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Professional deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const trackCtaClick = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
      return;
    }

    const updatedProfessional = await Professional.findByIdAndUpdate(
      id,
      {
        $inc: {
          "cta.clickCount": 1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedProfessional) {
      res.status(404).json({
        success: false,
        message: "Professional not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Click tracked successfully",
      clicks: updatedProfessional.cta?.clickCount ?? 0,
    });
  } catch (error) {
    next(error);
  }
};