// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const path = require('path')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const sendEmail = require('./sendEmail');
const port = process.env.PORT || 5000;



// Load environment variables
dotenv.config({path: '../.env'});


// // Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage });


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "du3mlusia",
    api_key: process.env.CLOUD_API_KEY || "535363699268858",
    api_secret: process.env.CLOUD_API_SECRET || "Jlvk-EcfyczVuAPPpMWRYERS7hQ",
});

// Define Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "logistics_uploads", // Cloudinary folder name
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});
const upload = multer({ storage });
module.exports = upload;


// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


console.log('admin username',process.env.ADMIN_USERNAME)

// Middleware for basic admin authentication
const adminAuth = (req, res, next) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized access" });
    }
};

//static files render
app.use(express.static(__dirname))

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
	});
}

const uri = "mongodb+srv://jagannathonwuegbuzie:BUBBLECARSPSC2105517@cluster0.zp0yb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


// Define Package Schema
const PackageSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    description: String,
    pickupLocation: String,
    destination: String,
    trackingCode: String,
    status: { type: String, default: 'Pending' },
    packageImages: [String],
    locationUpdates: [{ location: String, timestamp: Date }]
});
const Package = mongoose.model('Package', PackageSchema);

// Nodemailer setup for email notifications
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Submit Package Route
app.post('/submit-package', upload.array('packageImages', 5), async (req, res) => {
    try {
        const { name, email, phone, description, pickupLocation, destination } = req.body;
        const trackingCode = uuidv4();
        const packageImages = req.files.map(file => file.path);


        const newPackage = new Package({
            name, email, phone, description, pickupLocation, destination, trackingCode, packageImages
        });
        console.log(process.env.EMAIL_PASS)
        await newPackage.save();



        // Send email notification to user
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Package Submission Confirmation',
            text: `Dear ${name}, your package has been submitted successfully. Your tracking code is: ${trackingCode}. Please await confirmation.`
        };
        await transporter.sendMail(mailOptions); //specify the email in the dotenv file unless the form would not submit
        
        res.status(201).json({ message: 'Package submitted successfully', trackingCode });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting package', error });
        console.error(error)
    }
});

// Track Package Route
app.get('/track/:trackingCode', async (req, res) => {
    try {
        const package = await Package.findOne({ trackingCode: req.params.trackingCode });
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(package);
    } catch (error) {
        res.status(500).json({ message: 'Error tracking package', error });
    }
});

// Admin Update Package Status Route
app.post('/admin/update-status', async (req, res) => {
    try {
        const { trackingCode, status } = req.body;
        const package = await Package.findOne({ trackingCode });

        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        package.status = status;
        await package.save();

        // Send email notification to user
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: package.email,
            subject: 'Package Status Update',
            text: `Dear ${package.name}, your package status has been updated to: ${status}. Your tracking code is: ${trackingCode}.`
        };
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Package status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating package status', error });
    }
});


// Fetch all submitted packages
app.get("/admin/packages", async (req, res) => {
    try {
        const packages = await Package.find();
        console.log('fetch packages', packages)
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching packages" });
    }
});

// Accept a package
app.post("/admin/accept", async (req, res) => {
    const { trackingCode } = req.body;
    try {
        const pkg = await Package.findOneAndUpdate(
            { trackingCode },
            { status: "Accepted" },
            { new: true }
        );

        if (!pkg) return res.status(404).json({ message: "Package not found" });

        // Send confirmation email
        sendEmail(pkg.email, "Package Accepted", `Your package has been accepted. Tracking Code: ${pkg.trackingCode}`);
        

        res.json({ message: "Package accepted", package: pkg });
    } catch (error) {
        res.status(500).json({ message: "Error updating package" });
    }
});

// Reject a package
app.post("/admin/reject", async (req, res) => {
    const { trackingCode } = req.body;
    try {
        const pkg = await Package.findOneAndUpdate(
            { trackingCode },
            { status: "Rejected" },
            { new: true }
        );

        await Package.findOneAndDelete(trackingCode)
        if (!pkg) return res.status(404).json({ message: "Package not found" });

        // Send rejection email
      await sendEmail(pkg.email, "Package Rejected", "Unfortunately, we are unable to handle your package at this time.");

        res.json({ message: "Package rejected", package: pkg });
    } catch (error) {
        res.status(500).json({ message: "Error updating package" });
    }
});


// Admin Update Package Location Route
app.post('/update-location', async (req, res) => {
    try {
        const { trackingCode, location } = req.body;
        const package = await Package.findOne({ trackingCode });

        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        package.locationUpdates.push({ location, timestamp: new Date() });
        await package.save();

        // Send email notification to user
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: package.email,
            subject: 'Package Location Update',
            text: `Dear ${package.name}, your package location has been updated: ${location}. Your tracking code is: ${trackingCode}.`
        };
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Package location updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating package location', error });
    }
});


// Schema & Model
const AccountRequestSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    company: String,
    city: String,
    country: String,
    password: String // Should be hashed in a real app
  });
  
  const AccountRequest = mongoose.model('AccountRequest', AccountRequestSchema);
  
  // Email Transporter
  
  // Handle Form Submission
  app.post('/request-account', async (req, res) => {
    try {
      const newRequest = new AccountRequest(req.body);
      await newRequest.save();
  
      // Send Confirmation Email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: 'Account Request Confirmation',
        text: `Hello ${req.body.name},\n\nYour account request has been received. We will contact you soon.\n\nThank you!`
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({ message: 'Request submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting request' });
    }
  });
  


// Start Server
app.listen(port, () => console.log(`Server running on  localhost:${port}`));
