const fs = require("fs");
const logInfo = require("../config/logInfo");
const logError = require("../config/logError");
const Passenger = require("../models/passenger.model");

createPassenger = (req, res) => {
  const body = req.body;

  if (Object.entries(body).length === 0 || body == null) {
    logError.error("You must provide a passenger");
    return res.status(203).json({
      success: false,
      error: "You must provide a passenger",
    });
  }

  const passenger = new Passenger(body);

  if (!passenger) {
    return res.status(203).json({ success: false, error: err });
  }

  passenger
    .save()
    .then(() => {
      logInfo.info(`Passenger with ID ${passenger._id} was created`);
      return res.status(201).json({
        success: true,
        id: passenger._id,
        message: "Passenger created!",
      });
    })
    .catch((error) => {
      logError.error(error.toString());
      return res.status(203).json({
        error,
        message: "Passenger not created!",
      });
    });
};

updatePassenger = async (req, res) => {
  const body = req.body;

  if (Object.entries(body).length === 0 || body == null) {
    logError.error(`You must provide a body to update`);
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Passenger.findOne({ _id: req.params.id }, (err, usr) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({
        success: false,
        error: err,
        message: "Passenger not found!",
      });
    }

    const passenger = new Passenger(usr);
    passenger.identification = body.identification ? body.identification : passenger.identification;
    passenger.username = body.username ? body.username : passenger.username;
    passenger.email = body.email ? body.email : passenger.email;
    passenger.name = body.name ? body.name : passenger.name;
    passenger.password = body.password ? body.password : passenger.password;
    passenger.status = body.status ? body.status : passenger.status;
    passenger.password = body.password ? body.password : passenger.password;
    passenger.position = body.position ? body.position : passenger.position;
    passenger
      .save()
      .then(() => {
        logInfo.info(`Passenger with ID ${passenger._id} was created!`);
        return res.status(200).json({
          success: true,
          id: passenger._id,
          message: "Passenger updated!",
        });
      })
      .catch((error) => {
        logError.error(error.toString());
        return res.status(203).json({
          success: false,
          error,
          message: "Passenger not updated!",
        });
      });
  })
};

deletePassenger = async (req, res) => {
  await Passenger.findOneAndDelete({ _id: req.params.id }, (err, passenger) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!passenger) {
      logError.error(`Passenger with ID ${req.params.id} not found`);
      return res.status(203).json({ success: false, error: `Passenger not found` });
    }
    logError.error(`Passenger with ID ${req.params.id} deleted`);
    return res.status(200).json({ success: true, data: passenger });
  })
    .catch((err) => console.log(err));
};

getPassengerById = async (req, res) => {
  await Passenger.findOne({ _id: req.params.id }, (err, passenger) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!passenger) {
      logError.error(`Passenger with ID ${req.params.id} deleted`);
      return res.status(203).json({ success: false, error: `Passenger not found` });
    }
    logInfo.info(`Passenger with ID ${req.params.id} found`);
    return res.status(200).json({ success: true, data: passenger });
  })
    .catch((err) => console.log(err));
};

loginPassenger = async (req, res) => {
  const body = req.body;
  if (Object.entries(body).length === 0 || body == null) {
    logError.error(`You must provide a body to update`);
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  const login = await Passenger.findOne(
    { passengername: body.passengername, password: body.password },
    (err, passenger) => {
      if (err) {
        logError.error(err.toString());
        return res.status(203).json({ success: false, error: err });
      }

      if (!passenger) {
        logError.error(`Passenger ${body.passengername} not found`);
        return res
          .status(203)
          .json({ success: false, error: `Passenger not found` });
      }
      logInfo.info(`Passenger ${passenger._id} loging success`);
      return res.status(200).json({ success: true, data: passenger });
    }
  )
    .catch((err) => console.log(err));
};

getPassengers = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await Passenger.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await Passenger.find({}, (err, passengers) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }
    if (!passengers.length) {
      logError.error(`Passengers not founds`);
      return res
        .status(203)
        .json({ success: false, error: `Passenger not founds!` });
    }
    logInfo.info(`Passengers found`);
    return res.status(200).json({ success: true, data: passengers, totalpages });
  })
    .limit(limit)
    .skip(limit * page)
    .catch((err) => console.log(err));
};

module.exports = {
  createPassenger,
  updatePassenger,
  deletePassenger,
  getPassengers,
  getPassengerById,
  loginPassenger,
};
