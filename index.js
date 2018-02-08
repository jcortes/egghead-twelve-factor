const { config } = require("dotenv");
const path = require("path");
const express = require("express");
const proxy = require("express-http-proxy");
const fileUpload = require("express-fileupload");

config();
console.log(process.env.CONFIG_VAR);

const app = express();

const baseImgUrl = process.env.BASE_IMG_URL;
const imagesDir = path.join(__dirname, "public/images");
const uploadsDir = path.join(__dirname, "uploads");

const proxyOptions = {
  proxyReqPathResolver: req => {
    const newPath = `${baseImgUrl}${req.path}`;
    console.log(newPath)
    return newPath;
  }
};

const imageHandler = baseImgUrl
  ? proxy(baseImgUrl, proxyOptions)
  : express.static(imagesDir);

const uploadsHandler = express.static(uploadsDir);

const form = `
  <form action="/upload" enctype="miltipart/form-data" method="post">
    <input type="file" name="foo" /> <br><br>
    <input type="submit" value="Upload" />
  </form>
`;

// const formHandler = (req, res) => {
//   console.log("res.send", res.send);
//   res.send(form);
// };

const uploadHandler = ({ files }, { status, send }) => {
  if (!files) {
    return status(400).send("No files were uploaded!");
  }
  const { foo } = files;
  const uploadTo = `uploads/${foo.name}`;
  foo.mv(uploadTo, err => {
    if (err) {
      return status(500).send(err);
    }
    const link = `<a href="${uploadTo}">${uploadTo}</a>`;
    send(`File uploaded to ${link}`);
  });
};

// BASE_IMG_URL=https://cdn.pixabay.com/photo/2017/10/12/20/12
// abstract-2845763_960_720.jpg
app.use("/images", imageHandler);
app.use(fileUpload());
app.use("/uploads", uploadsHandler);
app.get("/", (req, res) => {
  res.send(form);
});
app.post("/upload", uploadHandler);

const server = app.listen(8080, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
