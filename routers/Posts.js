const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

//update
router.put("/:id", async (req, res) => {
  const idPost = req.params.id;
  const { title, postText, username } = req.body;
  await Posts.update(
    { title: title, postText: postText, username: username },
    {
      where: {
        id: idPost,
      },
    }
  );
  res.json("Update successfully!");
});

router.get("/:id", async (req, res) => {
  const idPost = req.params.id;
  const response = await Posts.findOne({
    where: {
      id: idPost,
    },
  });
  if (!response) {
    return res.status(404).json({ status: 404, message: "Not found" });
  }
  res.json({
    message: `get post id = ${idPost} successfully!`,
    data: response,
  });
});

router.delete("/:id", async (req, res) => {
  const idPost = req.params.id;
  await Posts.destroy({
    where: {
      id: idPost,
    },
  });
  res.json({
    message: `delete post id = ${idPost} successfully!`,
  });
});

module.exports = router;
