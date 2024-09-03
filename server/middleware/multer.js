import multer from 'multer';

// Configure Multer to store files temporarily
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

export default upload;
