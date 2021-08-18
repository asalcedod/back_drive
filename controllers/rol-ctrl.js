const Rol = require("../models/rol.model");

createRol = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a rol",
    });
  }

  const rol = new Rol(body);

  if (!rol) {
    return res.status(203).json({ success: false, error: err });
  }

  rol
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: rol._id,
        message: "Rol created!",
      });
    })
    .catch((error) => {
      return res.status(203).json({
        error,
        message: "Rol not created!",
      });
    });
};

updateRol = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Rol.findOne({ _id: req.params.id }, (err, rol) => {
    if (err) {
      return res.status(203).json({
        err,
        message: "Rol not found!",
      });
    }
    rol.code = body.code;
    rol.name = body.name;
    rol.description = body.description;
    rol.status = body.status;
    rol
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: rol._id,
          message: "Rol updated!",
        });
      })
      .catch((error) => {
        return res.status(203).json({
          error,
          message: "Rol not updated!",
        });
      });
  });
};

deleteRol = async (req, res) => {
  await Rol.findOneAndDelete({ _id: req.params.id }, (err, rol) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!rol) {
      return res.status(203).json({ success: false, error: `Rol not found` });
    }

    return res.status(200).json({ success: true, data: rol });
  }).catch((err) => console.log(err));
};

getRolById = async (req, res) => {
  await Rol.findOne({ _id: req.params.id }, (err, rol) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!rol) {
      return res.status(203).json({ success: false, error: `Rol not found` });
    }
    return res.status(200).json({ success: true, data: rol });
  }).catch((err) => console.log(err));
};

getRols = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await Rol.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await Rol.find({}, (err, rols) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }
    if (!rols.length) {
      return res.status(203).json({ success: false, error: `Rol not found!` });
    }
    return res.status(200).json({ success: true, data: rols, totalpages });
  })
    .limit(limit)
    .skip(page * limit)
    .catch((err) => console.log(err));
};

module.exports = {
  createRol,
  updateRol,
  deleteRol,
  getRols,
  getRolById,
};
