const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

// Use memory storage with Multer to access the file buffer directly
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

// Function to generate a random string for the filename
function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error uploading file' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Validate file type using MIME_TYPES
        const extension = MIME_TYPES[req.file.mimetype];
        if (!extension) {
            return res.status(400).json({ error: 'Invalid file type' });
        }

        try {
            const name = req.file.originalname.split(' ').join('_').replace(/\.[^/.]+$/, '');
            const randomString = generateRandomString();
            const outputPath = path.join('uploads/images', `${name + randomString}.webp`);

            // Convert the image to WebP using Sharp
            await sharp(req.file.buffer)
                .webp({ quality: 90 }) // Adjust quality as needed
                .toFile(outputPath);

            // Update the file info in the request object for use in the controller
            req.file.filename = `${name + randomString}.webp`;
            req.file.path = outputPath;

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error processing image' });
        }
    });
};
