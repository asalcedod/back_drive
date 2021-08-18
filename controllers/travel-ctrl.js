const Travel = require("../models/travel.model");

createTravel = (req, res) => {
  const body = req.body;

  Travel.findOne(
    { driver: body.driver, passenger: body.passenger, status_travel: 1 },
    (err, travel) => {
      if (err) {
        return res.status(203).json({
          err,
          message: "Travel not found!",
        });
      }

      if (!body) {
        return res.status(203).json({
          success: false,
          error: "You must provide a travel",
        });
      }

      if (travel) {
        return res
          .status(203)
          .json({ success: false, error: "Travel in process" });
      }

      const newTravel = new Travel(body);

      newTravel
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            id: newTravel._id,
            message: "Travel created!",
          });
        })
        .catch((error) => {
          return res.status(203).json({
            error,
            message: "Travel not created!",
          });
        });
    }
  );
};

updateTravel = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Travel.findOne({ _id: req.params.id }, (err, travel) => {
    if (err) {
      return res.status(203).json({
        err,
        message: "Travel not found!",
      });
    }
    
    travel.passenger = body.passenger ? body.passenger : travel.passenger;
    travel.driver = body.driver ? body.driver : travel.driver;
    travel.price = body.price ? body.price : travel.price;
    travel.paymethod = body.paymethod ? body.paymethod : travel.paymethod;
    travel.init_position = body.init_position
      ? body.init_position
      : travel.init_position;
    travel.end_position = body.end_position
      ? body.end_position
      : travel.end_position;
    travel.status_travel = parseInt(body.status_travel) >= -1
      ? body.status_travel
      : travel.status_travel;
    travel.status = body.status ? body.status : travel.status;
    travel
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: travel._id,
          message: "Travel updated!",
        });
      })
      .catch((error) => {
        return res.status(203).json({
          error,
          message: "Travel not updated!",
        });
      });
  });
};

deleteTravel = async (req, res) => {
  await Travel.findOneAndDelete({ _id: req.params.id }, (err, travel) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!travel) {
      return res
        .status(203)
        .json({ success: false, error: `Travel not found` });
    }

    return res.status(200).json({ success: true, data: travel });
  }).catch((err) => console.log(err));
};

getTravelById = async (req, res) => {
  await Travel.findOne({ _id: req.params.id }, (err, travel) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!travel) {
      return res
        .status(203)
        .json({ success: false, error: `Travel not found` });
    }
    return res.status(200).json({ success: true, data: travel });
  }).catch((err) => console.log(err));
};

getTravels = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await Travel.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await Travel.find({ status_travel: 1 }, (err, travels) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }
    if (!travels.length) {
      return res
        .status(203)
        .json({ success: false, error: `Travel not found!` });
    }
    return res.status(200).json({ success: true, data: travels, totalpages });
  })
    .limit(limit)
    .skip(page * limit)
    .catch((err) => console.log(err));
};

getTravelsByDriver = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await Travel.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await Travel.find({ status_travel: 1, driver: params.driver }, (err, travels) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }
    if (!travels.length) {
      return res
        .status(203)
        .json({ success: false, error: `Travel not found!` });
    }
    return res.status(200).json({ success: true, data: travels, totalpages });
  })
    .populate("driver")
    .populate("passenger")
    .limit(limit)
    .skip(page * limit)
    .catch((err) => console.log(err));
};

module.exports = {
  createTravel,
  updateTravel,
  deleteTravel,
  getTravels,
  getTravelsByDriver,
  getTravelById,
};
