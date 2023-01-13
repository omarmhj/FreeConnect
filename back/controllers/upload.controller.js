const util = require("util");
const multer = require("multer");
const UserModel = require("../models/user.model");
const maxSize = 2 * 1024 * 1024;
module.exports.uploadProfil = async (req, res) => {
  const fileName = String(req.body.name + ".jpg");
  console.log(fileName);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../client/public/uploads/profil");
    },
    filename: (req, file, cb) => {
      cb(null, fileName);
    },
  });
  const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
  }).single("file");
  const uploadFileMiddleware = util.promisify(uploadFile);
  try {
    await uploadFileMiddleware(req, res);
    console.log(req.body.name)
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    try {
      UserModel.findByIdAndUpdate(
        req.body.userId,
        { $set: { picture: "./uploads/profil/" + fileName } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(500).send({ message: err });
        }
      );
      console.log(req.body.userId)
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.body.name + ".jpg"}. ${err}`,
    });
  }
};