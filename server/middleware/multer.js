import multer from "multer";

// Configure multer for file uploads
// Using diskStorage without specifying destination or filename
// means files will be stored in memory by default and given random names.

const upload = multer({
    storage: multer.diskStorage({}) 
    // You can add destination and filename options here if needed, e.g.,
    // destination: (req, file, cb) => cb(null, 'uploads/'),
    // filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

export default upload;
