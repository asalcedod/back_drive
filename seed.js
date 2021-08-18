const seeder = require("mongoose-seed");
require("dotenv").config();
// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URL, function () {
  // Load Mongoose models
  seeder.loadModels(["../models/rol.model.js"]);

  // Clear specified collections
  seeder.clearModels(["Rol"], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: "Rol",
    documents: [
      {
        code: "ROOT01",
        name: "Root",
        level: 1,
        description: "Super Root",
        status: 1,
      },
      {
        code: "ADM01",
        name: "Admin",
        level: 2,
        description: "Administratos",
        status: 1,
      },
    ],
  },
];
