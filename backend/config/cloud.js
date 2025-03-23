import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
    cloud_name: "du3mlusia",
    api_key: "535363699268858",
    api_secret: "Jlvk-EcfyczVuAPPpMWRYERS7hQ",
});
// Define Cloudinary storage
const storage = new CloudinaryStorage({
	cloudinary: cloudinary.v2,
	params: {
		folder: "devaraj", // Cloudinary folder name
		allowed_formats: ["jpg", "png", "jpeg"],
	},
});
const upload = multer({ storage });
export default upload;
