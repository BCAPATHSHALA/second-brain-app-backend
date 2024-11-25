import { ContentModel } from "../models/content.model";

// API 1: Create Content
export const createContent = async (req: any, res: any) => {
  try {
    // Zod validation apply later
    const { tags, title, type, link, content } = req.body;

    // Todo: Create and update tags

    const newContent = await ContentModel.create({
      userId: req.userId,
      tags,
      title,
      type,
      link,
      content,
    });

    if (!newContent) {
      return res.status(403).json({
        success: false,
        message: "Content not created",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Content created successfully",
      data: newContent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// API 2: Get Content
export const getContent = async (req: any, res: any) => {
  try {
    // Zod validation apply later
    const userId = req.userId;

    const content = await ContentModel.find({ userId: userId }).populate(
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

// API 3: Delete Content
export const deleteContent = async (req: any, res: any) => {
  try {
    // Zod validation apply later
    const { contentId } = req.body;

    const content = await ContentModel.findOneAndDelete({
      _id: contentId,
      userId: req.userId,
    });

    if (!content) {
      return res.status(403).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
      data: content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// API 4: Update Content
export const updateContent = async (req: any, res: any) => {
  try {
    // Zod validation apply later
    const { contentId, tags, title, type, link, content } = req.body;

    // Todo: Create and update tags

    const updatedContent = await ContentModel.findOneAndUpdate(
      { _id: contentId, userId: req.userId },
      {
        $set: {
          tags,
          title,
          type,
          link,
          content,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedContent) {
      return res.status(403).json({
        success: false,
        message: "Content not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: updatedContent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
