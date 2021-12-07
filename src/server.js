const express = require("express");
const multer = require("multer");
const cors = require("cors");
const textScraping = require("./textScraping");

const app = express();

// configuracao do multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
})

const PORT = 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.post("/", upload.single('img'), async (req, res, next) => {
  try {
    const image = req.file;

    if (!image)
        next(new Error("There is no image"));

    const text = await textScraping(image.buffer);
    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

// server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
