//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
const multer = require('multer');
//Create a new directory and any necessary subdirectories at di
const mkdirp = require('mkdirp');

const fs = require('fs');

//The disk storage engine gives you full control on storing files to disk.
const ImageStorage = multer.diskStorage({

    //The folder to which the file has been saved
    destination: (req, file, cb) => {
        let dir = getDirImage();
        mkdirp(dir, cb(null, dir));
    },
    //The name of the file within the destination
    filename: (req, file, cb) => {
        let filePath = getDirImage() + '/' + file.originalname;
        if (!fs.existsSync(filePath)) { // file doesn't Exist
            cb(null, file.originalname);
        } else { // file Exist in uploads Folder
            cb(null, Date.now() + '-' + file.originalname);
        }
    }
});

//multer config
const uploadImage = multer({
    storage: ImageStorage,
    limits: {
        // 10 mb
        fileSize: 1024 * 1024 * 10
    }
});

//The String return the folder Path for Save images
const getDirImage = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    return `./public/uploads/images/${year}/${month}/${date}`;
};

//use as middleware in admin router.post('/courses/create')
module.exports = uploadImage;