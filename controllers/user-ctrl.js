const fs = require("fs");
const logInfo = require("../config/logInfo");
const logError = require("../config/logError");
const User = require("../models/user.model");

createUser = (req, res) => {
  const body = req.body;

  if (Object.entries(body).length === 0 || body == null) {
    logError.error("You must provide a user");
    return res.status(203).json({
      success: false,
      error: "You must provide a user",
    });
  }

  const user = new User(body);

  if (!user) {
    return res.status(203).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      logInfo.info(`User with ID ${user._id} was created`);
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      logError.error(error.toString());
      return res.status(203).json({
        error,
        message: "User not created!",
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (Object.entries(body).length === 0 || body == null) {
    logError.error(`You must provide a body to update`);
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, usr) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({
        success: false,
        error: err,
        message: "User not found!",
      });
    }

    const user = new User(usr);
    user.identification = body.identification;
    user.username = body.username;
    user.email = body.email;
    user.name = body.name;
    user.password = body.password;
    user.status = body.status;
    user.rol = body.rol;
    user
      .save()
      .then(() => {
        logInfo.info(`User with ID ${user._id} was created!`);
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        logError.error(error.toString());
        return res.status(203).json({
          success: false,
          error,
          message: "User not updated!",
        });
      });
  }).populate("rol");
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!user) {
      logError.error(`User with ID ${req.params.id} not found`);
      return res.status(203).json({ success: false, error: `User not found` });
    }
    logError.error(`User with ID ${req.params.id} deleted`);
    return res.status(200).json({ success: true, data: user });
  })
    .populate("rol")
    .catch((err) => console.log(err));
};

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!user) {
      logError.error(`User with ID ${req.params.id} deleted`);
      return res.status(203).json({ success: false, error: `User not found` });
    }
    logInfo.info(`User with ID ${req.params.id} found`);
    return res.status(200).json({ success: true, data: user });
  })
    .populate("rol")
    .catch((err) => console.log(err));
};

loginUser = async (req, res) => {
  const body = req.body;
  if (Object.entries(body).length === 0 || body == null) {
    logError.error(`You must provide a body to update`);
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  const login = await User.findOne(
    { username: body.username, password: body.password },
    (err, user) => {
      if (err) {
        logError.error(err.toString());
        return res.status(203).json({ success: false, error: err });
      }

      if (!user) {
        logError.error(`User ${body.username} not found`);
        return res
          .status(203)
          .json({ success: false, error: `User not found` });
      }
      logInfo.info(`User ${user._id} loging success`);
      return res.status(200).json({ success: true, data: user });
    }
  )
    .populate("rol")
    .catch((err) => console.log(err));
};

getUsers = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await User.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await User.find({}, (err, users) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }
    if (!users.length) {
      logError.error(`Users not founds`);
      return res
        .status(203)
        .json({ success: false, error: `User not founds!` });
    }
    logInfo.info(`Users found`);
    return res.status(200).json({ success: true, data: users, totalpages });
  })
    .limit(limit)
    .skip(limit * page)
    .populate("rol")
    .catch((err) => console.log(err));
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  loginUser,
};
