const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller')





// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);


// user display: 'block
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);


// upload
router.post("/upload", uploadController.uploadProfil);

   




module.exports = router;

/*const multer = require('multer');
const storage = multer.diskStorage({
    
    destination: function (req, res, cb) {
        
        cb(null, `${__dirname}/../client/public/uploads/profil` )
    },
    filename: function (req, file, cb) {
        console.log(file);
        fileName = String(req.body.name + ".jpg");
        //cb(null,  Date.now() + path.extname(file.originalname))
        cb(null, fileName  )
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

var upload = multer({
    storage: storage, 
    fileFilter: fileFilter
})*/