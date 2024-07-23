import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const uploadDir = './dist/public';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    callback(null, uploadDir);
  },
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

export const upload = multer({
  storage,
});
