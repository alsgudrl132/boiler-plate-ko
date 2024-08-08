const express = require("express");
const app = express();
const port = 4000;
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(cookieParser());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!1243");
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요 ~");
});

app.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    // 요청된 이메일을 데이터베이스 이메일에서 찾는다.
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    // 비밀번호까지 맞다면 Token 생성
    const userWithToken = await user.generateToken();

    // 토큰 저장 쿠키
    res
      .cookie("x_auth", userWithToken.token)
      .status(200)
      .json({ loginSuccess: true, userId: userWithToken._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" },
      { new: true } // 새로운 문서 반환
    );
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
