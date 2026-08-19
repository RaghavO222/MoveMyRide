
const checkPlate = (req,res,next) => {
    const {  email, plate } = req.body

    if (!plate ) {
        return res.status(400).json({
          error: "Plate must be provided"
        });
      }

    const pattern = /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/;

    const p2 = /^\w{1,15}@gmail.com$/;

    if (!pattern.test(plate)) {
        return res.status(400).json({
          error: "Not a valid plate number. Expected format: AA00AA0000"
        });
      }

      if (!p2.test(email)) {
        return res.status(400).json({
          error: "Not a valid email. Expected format: AA00@gmail.com"
        });
      }

      next();
}

module.exports = checkPlate