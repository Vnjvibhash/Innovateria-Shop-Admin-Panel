import multer from 'multer';
import path from 'path';

const storageCategory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/categories');
  },
  filename: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|svg/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );

    if (extname) {
      const sanitizedFileName = file.originalname.replace(/\s+/g, '_');
      cb(
        null,
        Date.now() +
          '_' +
          Math.floor(Math.random() * 1000) +
          '_' +
          sanitizedFileName,
      );
    } else {
      cb('Error: only .jpeg, .jpg, .png files are allowed!');
    }
  },
});

const uploadCategory = multer({
  storage: storageCategory,
  limits: {
    fileSize: 1024 * 1024 * 5, // limit filesize to 5MB
  },
});

const storageProduct = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/products');
  },
  filename: function(req, file, cb) {
    // Check file type based on its extension
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      cb(null, Date.now() + "_" + file.originalname);
    } else {
      cb("Error: only .jpeg, .jpg, .png files are allowed!");
    }
  }
});

const uploadProduct = multer({
  storage: storageProduct,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  },
});

const storagePoster = multer.diskStorage({
  
  destination: function(req, file, cb) {
    cb(null, './public/images/posters');
  },
  filename: function(req, file, cb) {
    // Check file type based on its extension
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      cb(null, Date.now() + "_" + file.originalname);
    } else {
      cb("Error: only .jpeg, .jpg, .png files are allowed!");
    }
  }
});

const uploadPosters = multer({
  storage: storagePoster,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  },
});

export {
  uploadCategory,
  uploadProduct,
  uploadPosters
};
