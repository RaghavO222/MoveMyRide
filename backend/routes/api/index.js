const router = require("express").Router();
const authRoutes = require("./user");
const reqRoutes = require("./req")
const carRoutes = require("./car")
const mailRoutes = require("./mail")

router.use("/auth", authRoutes);

router.use("/tbreq", reqRoutes);

router.use("/addcar", carRoutes);

router.use("/mail", mailRoutes)

router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;