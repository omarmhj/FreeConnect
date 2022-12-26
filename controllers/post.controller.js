
const { findByIdAndDelete, findByIdAndUpdate } = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const util = require("util");
const multer = require("multer");


module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    }).sort({ createdAt: -1 });
}


module.exports.createPost = async (req, res) => {
    const fileName = req.body.posterId + ".jpg"
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../client/public/uploads/posts");
      },
      filename: (req, file, cb) => {
        cb(null, fileName);
      },
    })
    const uploadFile = multer({storage: storage}).single("file");
    const uploadFileMiddleware = util.promisify(uploadFile);

    try {
        await uploadFileMiddleware(req, res);
        console.log(req.body.name)
        if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
        }
    } catch(err){}
  
    const newPost = new PostModel({
      posterId: req.body.posterId,
      message: req.body.message,
      picture: req.file !== null ? "./uploads/posts/" + fileName : "",
      video: req.body.video,
      likers: [],
      comments: [],
    });
  
    try {
      const post = await newPost.save();
      return res.status(201).json(post);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const UpdatedPost = {
        message: req.body.message
    };

    PostModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: UpdatedPost },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Updated error : " + { message: err.message })
        }
    );

}

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + { message: err.message })
        }
    )

}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },

        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },

        )
        res.status(200).send('success');

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },

        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },

        )
        res.status(200).send('success');

    } catch (err) {
        res.status(400).send({ message: err.message });
    }

}
module.exports.commentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.send(err);

                res.send(docs)
            },
        );
    } catch (err) {
        res.status(400).send({ message: err.message });
    }

}

module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findById(
            req.params.id,
            (err, docs) => {
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                );

                if (!theComment) return res.status(404).send('Comment not found')
                theComment.text = req.body.text;

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs);
                    return res.status(500).send(err);
                });
            }
        );

    } catch (err) {
        return res.status(400).send(docs);
    }
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};