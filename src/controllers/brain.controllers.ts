import { ContentModel } from "../models/content.model";
import { LinkModel } from "../models/link.model";
import { createHashRandom } from "../utils/constant";

// API 1: Create Shared Link
export const createSharedLink = async (req: any, res: any) => {
  try {
    // Zod validation apply later
    const { share } = req.body; // share is a boolean

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
    // Zod validation apply later
    const { sharedHash } = req.params;

    const link = await LinkModel.findOne({ hash: sharedHash });

    if (!link) {
      return res.status(403).json({
        success: false,
        message: "Link not found",
      });
    }

    // I want to share my brain to someone, so i want to get my content
    const content = await ContentModel.find({ userId: link.userId }).populate(
      "userId",
      "username"
    );

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
