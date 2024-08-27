const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = 5100;
const links = [];
let idCounter = 1;

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.post("/link", (req, res) => {
  const originalUrl = req.body.url;
  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const autoId = idCounter++;
  const randomString = generateRandomString(6);
  const shortUrl = `http://localhost:5100/${randomString}`;

  const dummy = {
    id: autoId,
    originalUrl,
    shortUrl,
    shortId: randomString,
  };

  links.push(dummy);

  res.json({ shortUrl });
});

app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const link = links.find((link) => link.shortId === shortId);
  if (link) {
    res.redirect(link.originalUrl);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
