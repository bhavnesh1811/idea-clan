const express = require("express");
const { CourseModel } = require("../models/CourseModel");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { adminValidator } = require("../middlewares/adminValidator");

const courseRouter = express.Router();

courseRouter.get("/", async (req, res) => {

  try {
    let count = await CourseModel.find(req.query).countDocuments();
    let data = await CourseModel.find(req.query);

    res.send({
      message: "All courses data",
      count: count,
      status: 1,
      data: data,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

courseRouter.get("/:id", async (req, res) => {
  let { id: _id } = req.params;
  try {
    let data = await CourseModel.find({ _id });
    res.send({
      message: "Course data",
      status: 1,
      data: data,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

//search route here

courseRouter.use(adminValidator);

courseRouter.post("/", async (req, res) => {
  let token = req.headers.authorization;
  jwt.verify(token, process.env.SecretKey, async function (err, decoded) {
    if (err)
      res.send({
        message: "Something went wrong: " + err,
        status: 0,
        error: true,
      });

    // req.body.forEach((el) => {
    //   el.adminId = "admin" + decoded.userId;
    // });
    try {
      await CourseModel.insertMany(req.body);
      res.send({
        message: "Course added",
        status: 1,
        error: false,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong: " + error.message,
        status: 0,
        error: true,
      });
    }
  });
});

courseRouter.patch("/:id", async (req, res) => {
  let { id: _id } = req.params;

  try {
    const upDatedData=await CourseModel.findByIdAndUpdate({ _id }, req.body);
    res.send({
      message: "Course updated",
      status: 1,
      error: false,
      upDatedData
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

courseRouter.delete("/:id", async (req, res) => {
  let { id: _id } = req.params;

  try {
    await CourseModel.findByIdAndDelete({ _id });
    res.send({
      message: "Course deleted",
      status: 1,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

courseRouter.post("/admin", async (req, res) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.SecretKey, async (err, decoded) => {
    if (err)
      res.send({
        message: "Invalid token: " + err,
        status: 0,
        error: true,
      });

    if (decoded) {
      if (decoded.role == "admin") {
        try {
          let count = await CourseModel.find({
            adminId: "admin" + decoded.userId,
            ...req.query,
          }).countDocuments();
          let data = await CourseModel.find({
            adminId: "admin" + decoded.userId,
            ...req.query,
          });

          res.send({
            message: "All courses data",
            status: 1,
            data: data,
            error: false,
            count: count,
          });
        } catch (error) {
          res.send({
            message: "Something went wrong: " + error.message,
            status: 0,
            error: true,
          });
        }
      } else {
        try {
          let count = await CourseModel.find({
            ...req.query,
          }).countDocuments();
          let data = await CourseModel.find({ ...req.query })
            .skip(page * 5)
            .limit(5);
          res.send({
            message: "All courses data",
            status: 1,
            data: data,
            count: count,
            error: false,
          });
        } catch (error) {
          res.send({
            message: "Something went wrong: " + error.message,
            status: 0,
            error: true,
          });
        }
      }
    } else {
      res.send({
        message: "Invalid token:",
        status: 0,
        error: true,
      });
    }
  });
});

module.exports = {
  courseRouter,
};
