const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/productsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Image schema and model
const ImageSchema = new mongoose.Schema({
  imageUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", ImageSchema);

// Endpoint to handle file uploads
app.post("/api/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = `http://localhost:8000/uploads/${file.filename}`;
  const newImage = new Image({ imageUrl });

  newImage
    .save()
    .then(() => res.status(200).json({ imageUrl }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to render EJS template
app.get("/images", (req, res) => {
  Image.find()
    .sort({ uploadedAt: -1 })
    .exec((err, images) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.render("images", { images });
    });
});

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
