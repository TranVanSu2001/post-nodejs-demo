const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
// require("dotenv").config({ path: ".env" });

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

//Check login
app.get("/login", (req, res) => {
  db.query("SELECT * FROM nodejs.logininfo", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//Create account
app.post("/createacc", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  db.query(
    "INSERT INTO logininfo (user, password) VALUES (?,?)",
    [user, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

//create post
app.post("/createpost", (req, res) => {
  const text = req.body.text;
  const author = req.body.author;

  db.query(
    "INSERT INTO posts (text, postby) VALUES (?, ?)",
    [text, author],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

//View post
app.get("/getPost", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//Delete post
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update text
app.put("/updatetext", (req, res) => {
  const updateText = req.body.updateText;
  const id = req.body.id;
  db.query(
    "UPDATE posts SET text = ? WHERE id = ?",
    [updateText, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: "true",
//     useUnifiedTopology: "true",
//   })
//   .then(() => {
//     console.log("Connected to database");

//     app.listen(PORT, () => {
//       console.log("Server running on port 3001");
//     });
//   })
//   .catch((error) => {
//     console.log(err);
//   });

app.listen(PORT, () => {
  console.log("Server running on port 3001");
});
