const multer = require('multer')
const fs = require('fs')

// INIT Storage upload file in server **************
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        fs.mkdir('./uploads', function (err) {
            callback(null, './uploads');
        })
    },
    filename: (req, file, callback) => {
        const { fieldname, mimetype } = file
        callback(null, `${fieldname}-${Date.now()}.${mimetype.split("/")[1]}`);
    }
});

// const upload = multer({ storage })
// END Storage upload file in server *****************

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 20 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

module.exports = upload