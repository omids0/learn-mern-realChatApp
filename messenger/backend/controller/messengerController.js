const User = require("../models/authModel");
const messageModel = require("../models/messageModel");
const formidable = require("formidable");
const fs = require("fs");

module.exports.getFriends = async (req, res) => {
  const myId = req.myId;
  // console.log(myId);
  try {
    const friendGet = await User.find({});
    const filter = friendGet.filter((d) => d.id !== myId);
    res.status(200).json({ success: true, friends: filter });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

module.exports.messageUploadDB = async (req, res) => {
  const { senderName, reseverId, message } = req.body;
  const senderId = req.myId;

  try {
    const insertMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      reseverId: reseverId,
      message: {
        text: message,
        image: "",
      },
    });
    res.status(201).json({
      success: true,
      message: insertMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};
module.exports.messageGet = async (req, res) => {
  const myId = req.myId;
  const fdId = req.params.id;

  try {
    let getAllMessage = await messageModel.find({});

    getAllMessage = getAllMessage.filter(
      (m) =>
        (m.senderId === myId && m.reseverId === fdId) ||
        (m.reseverId === myId && m.senderId === fdId)
    );

    res.status(200).json({
      success: true,
      message: getAllMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server error",
      },
    });
  }
};

module.exports.ImageMessageSend = (req, res) => {
  const senderId = req.myId;
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    const { senderName, reseverId, imageName } = fields;

    const newPath = __dirname + `../../../frontend/public/image/${imageName}`;
    files.image.originalFilename = imageName;

    try {
      fs.copyFile(files.image.filepath, newPath, async (err) => {
        if (err) {
          res.status(500).json({
            error: {
              errorMessage: "Image upload fail",
            },
          });
        } else {
          const insertMessage = await messageModel.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: {
              text: "",
              image: files.image.originalFilename,
            },
          });
          res.status(201).json({
            success: true,
            message: insertMessage,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        error: {
          errorMessage: "Internal Sever Error",
        },
      });
    }
  });
};
