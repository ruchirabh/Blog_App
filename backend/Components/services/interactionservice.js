const { Blog, Interaction } = require("../models/blogModel");

async function getInteractionByPostId(postId) {
  try {
    const interaction = await Interaction.findOne({ postId });
    return interaction;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getInteractionByPostId };
