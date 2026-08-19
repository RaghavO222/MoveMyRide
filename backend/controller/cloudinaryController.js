const cloudinary = require("../cloudinary/cloudinary");

const addPhoto = async (req, res, next) => {
    try {
        const fileStr = req.body.image;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: "movemyride",
        });

        res.status(200).json({ imageUrl: uploadResponse.secure_url });
    } catch (err) {
        console.error("Cloudinary upload error:", err);
        res.status(500).json({ error: "Image upload failed" });
    }
}

module.exports = { addPhoto }