const fs = require("fs");
const logInfo = require("../config/logInfo");
const logError = require("../config/logError");
const Driver = require("../models/driver.model");

createDriver = (req, res) => {
  const body = req.body;

  if (Object.entries(body).length === 0 || body == null) {
    logError.error("You must provide a driver");
    return res.status(203).json({
      success: false,
      error: "You must provide a driver",
    });
  }

  const driver = new Driver(body);

  if (!driver) {
    return res.status(203).json({ success: false, error: err });
  }

  driver
    .save()
    .then(() => {
      logInfo.info(`Driver with ID ${driver._id} was created`);
      return res.status(201).json({
        success: true,
        id: driver._id,
        message: "Driver created!",
      });
    })
    .catch((error) => {
      logError.error(error.toString());
      return res.status(203).json({
        error,
        message: "Driver not created!",
      });
    });
};

updateDriver = async (req, res) => {
  const body = req.body;

  if (Object.entries(body).length === 0 || body == null) {
    logError.error(`You must provide a body to update`);
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Driver.findOne({ _id: req.params.id }, (err, usr) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({
        success: false,
        error: err,
        message: "Driver not found!",
      });
    }

    const driver = new Driver(usr);
    driver.identification = body.identification
      ? body.identification
      : driver.identification;
    driver.username = body.username ? body.username : driver.username;
    driver.email = body.email ? body.email : driver.email;
    driver.name = body.name ? body.name : driver.name;
    driver.password = body.password ? body.password : driver.password;
    driver.status = body.status ? body.status : driver.status;
    driver.vehicle = body.vehicle ? body.vehicle : driver.vehicle;
    driver.plaque = body.plaque ? body.plaque : driver.plaque;
    driver.password = body.password ? body.password : driver.password;
    driver.position = body.position ? body.position : driver.position;
    driver
      .save()
      .then(() => {
        logInfo.info(`Driver with ID ${driver._id} was created!`);
        return res.status(200).json({
          success: true,
          id: driver._id,
          message: "Driver updated!",
        });
      })
      .catch((error) => {
        logError.error(error.toString());
        return res.status(203).json({
          success: false,
          error,
          message: "Driver not updated!",
        });
      });
  });
};

deleteDriver = async (req, res) => {
  await Driver.findOneAndDelete({ _id: req.params.id }, (err, driver) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!driver) {
      logError.error(`Driver with ID ${req.params.id} not found`);
      return res
        .status(203)
        .json({ success: false, error: `Driver not found` });
    }
    logError.error(`Driver with ID ${req.params.id} deleted`);
    return res.status(200).json({ success: true, data: driver });
  }).catch((err) => console.log(err));
};

getDriverById = async (req, res) => {
  await Driver.findOne({ _id: req.params.id }, (err, driver) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!driver) {
      logError.error(`Driver with ID ${req.params.id} deleted`);
      return res
        .status(203)
        .json({ success: false, error: `Driver not found` });
    }
    logInfo.info(`Driver with ID ${req.params.id} found`);
    return res.status(200).json({ success: true, data: driver });
  }).catch((err) => console.log(err));
};

const getKilometros = (coord_init, coord_end) => {
  const rad = (x) => {
    return (x * Math.PI) / 180;
  };
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad(parseFloat(coord_end.lat) - parseFloat(coord_init.lat));
  var dLong = rad(parseFloat(coord_end.lng) - parseFloat(coord_init.lng));
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(parseFloat(coord_init.lat))) *
      Math.cos(rad(parseFloat(coord_end.lat))) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(3); //Retorna tres decimales
};

getDriversDistances = async (req, res) => {
  const coord_init = { lat: req.params.lat, lng: req.params.lng };
  await Driver.find({}, (err, driver) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!driver) {
      logError.error(`Driver with ID ${req.params.id} deleted`);
      return res
        .status(203)
        .json({ success: false, error: `Driver not found` });
    }
    let driverDistance = [];
    driver.forEach((element) => {
      let driv = {
        _id: element._id,
        identification: element.identification,
        username: element.username,
        email: element.email,
        name: element.name,
        vehicle: element.vehicle,
        plaque: element.plaque,
        password: element.password,
        position: element.position,
        status: element.status,
        distance: getKilometros(coord_init, element.position),
      };
      driverDistance.push(driv);
    });
    logInfo.info(`Driver with ID ${req.params.id} found`);
    return res.status(200).json({
      success: true,
      data: driverDistance.sort(function (a, b) {
        return a.distance - b.distance;
      }),
    });
  }).catch((err) => console.log(err));
};

loginDriver = async (req, res) => {
  const body = req.body;
  if (Object.entries(body).length === 0 || body == null) {
    logError.error(`You must provide a body to update`);
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  const login = await Driver.findOne(
    { username: body.username, password: body.password },
    (err, driver) => {
      if (err) {
        logError.error(err.toString());
        return res.status(203).json({ success: false, error: err });
      }

      if (!driver) {
        logError.error(`Driver ${body.username} not found`);
        return res
          .status(203)
          .json({ success: false, error: `Driver not found` });
      }
      logInfo.info(`Driver ${driver._id} loging success`);
      return res.status(200).json({ success: true, data: driver });
    }
  ).catch((err) => console.log(err));
};

getDrivers = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await Driver.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await Driver.find({}, (err, drivers) => {
    if (err) {
      logError.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }
    if (!drivers.length) {
      logError.error(`Drivers not founds`);
      return res
        .status(203)
        .json({ success: false, error: `Driver not founds!` });
    }
    logInfo.info(`Drivers found`);
    return res.status(200).json({ success: true, data: drivers, totalpages });
  })
    .limit(limit)
    .skip(limit * page)
    .catch((err) => console.log(err));
};

module.exports = {
  createDriver,
  updateDriver,
  deleteDriver,
  getDrivers,
  getDriverById,
  getDriversDistances,
  loginDriver,
};
