const { Blog, Interaction } = require("../models/blogModel");
const router = require("express").Router();
const { getInteractionByPostId } = require("../services/interactionservice");

router.post("/newblog", async (req, res) => {
  const { title, description } = req.body;

  try {
    const blog = new Blog({ title, description });
    await blog.save();
    res.status(201).send("blog created succesfully");
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error in the server" });
  }
});
router.delete("/deleteblog", async (req, res) => {});

router.post("/interaction", async (req, res) => {
  const { comment, like, postId } = req.body;
  console.log("hi");

  try {
    let interact = await getInteractionByPostId(postId);
    if (interact) {
      if (like == 1) {
        interact.like += 1;
      }
      if (comment) {
        interact.comment.push(comment);
      }
    } else {
      interact = new Interaction({ postId, like, comment });
    }
    interact.save();

    res.status(201).send("succesfull");
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error in the server" });
  }
});
router.post("/getInt", async (req, res) => {
  try {
    const { postId } = req.body;
    const int = await Interaction.find(postId);
    res.status(200).send(int);
  } catch (error) {
    res.send(error);
  }
});
router.get("/int", async (req, res) => {
  try {
    const int = await Interaction.find();
    res.status(200).send(int);
  } catch (error) {
    res.send(error);
  }
});
router.get("/getall", async (req, res) => {
  try {
    const allblogs = await Blog.find();
    res.status(200).send(allblogs);
  } catch (error) {
    res.send(error);
  }
});

router.get("/get/post", async (req, res) => {
  try {
    const id = req.body.id;
    const blog = await Blog.findById(id);
    res.status(200).send(blog);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
