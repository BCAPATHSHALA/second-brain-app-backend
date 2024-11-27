import { ContentModel } from "../models/content.model";
import { LinkModel } from "../models/link.model";
import {
  createSharedLinkSchema,
  getSharedLinkSchema,
  TCreateSharedLinkSchema,
  TGetSharedLinkSchema,
} from "../schemas/brain.schemas";
import { createHashRandom } from "../utils/constant";

// API 1: Create Shared Link
export const createSharedLink = async (req: any, res: any) => {
  try {
    // Zod validation
    const parsed = createSharedLinkSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(403).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
    }
    const { share }: TCreateSharedLinkSchema = req.body; // share is a boolean

    if (share) {
      // Create link, if share is true and link does not exist for user because i want to create only one link per user
      const existingLink = await LinkModel.findOne({ userId: req.userId });
      if (existingLink) {
        res.status(200).json({
          success: true,
          message: "Link shared successfully",
          hash: existingLink.hash,
        });
        return;
      }

      const hash = createHashRandom(10);
      console.log("Hash:", hash);

      const newLink = await LinkModel.create({
        userId: req.userId,
        hash,
      });

      if (!newLink) {
        return res.status(403).json({
          success: false,
          message: "Link not created",
        });
      }

      res.status(200).json({
        success: true,
        message: "Link shared successfully",
        hash: newLink.hash,
      });
    } else {
      // Remove link because share is false
      const deletedLink = await LinkModel.findOneAndDelete({
        userId: req.userId,
      });

      if (!deletedLink) {
        return res.status(403).json({
          success: false,
          message: "Link not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Link removed successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// API 2: Get Shared Link
export const getSharedLink = async (req: any, res: any) => {
  try {
    // Zod validation
    const parsed = getSharedLinkSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(403).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
    }
    const { sharedHash }: TGetSharedLinkSchema = req.params;

    const link = await LinkModel.findOne({ hash: sharedHash });

    if (!link) {
      return res.status(403).json({
        success: false,
        message: "Link not found",
      });
    }

    // I want to share my brain to someone, so i want to get my content
    const content = await ContentModel.find({ userId: link.userId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    if (!content) {
      return res.status(403).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content found successfully",
      data: content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// API 3: Get All Shared Links
export const getAllSharedLinks = async (req: any, res: any) => {
  try {
    const sharedLinks = await LinkModel.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      message: "Shared links fetched successfully",
      data: sharedLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching shared links",
    });
  }
};
