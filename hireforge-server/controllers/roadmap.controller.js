import { generateRoadmap } from "../services/aiRoadmap.service.js";


import {
  generateRecommendationSummary
}
from "../services/recommendation.service.js";

export const getRoadmap = async (req, res) => {

  try {

    const { userId } = req.params;

    const recommendationData =
      await generateRecommendationSummary(userId);

    const roadmap =
      await generateRoadmap(recommendationData);

    return res.status(200).json({
      success: true,
      data: roadmap,
    });

  } catch (error) {

    console.log("Roadmap Error:", error);

    return res.status(500).json({
      success: false,
message: error.message || "Failed to generate roadmap"
    });

  }

};