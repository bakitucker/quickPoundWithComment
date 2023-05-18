const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Workout = require("../models/Workout");

module.exports = {
  getProfile: async (req, res) => {
    try {
      try {
        const posts = await Post.find({ user: req.user.id });
        res.render("profile.ejs", { posts: posts, user: req.user });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user.id });
      res.render("feed.ejs", { workouts: workouts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getWorkouts: async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user.id });
      res.render("workouts.ejs", { workouts: workouts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  createWorkout: async (req, res) => {
    try {


      await Workout.create({
        workOutName: req.body.workOutName,
        bodyPart: req.body.bodyPart,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        user: req.user.id
      });
      console.log("Workout has been Added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        madeBy: req.user.id,
        postID: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`); 
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

 
};


