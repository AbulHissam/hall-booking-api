const express = require("express");
const PORT = 5000;

const app = express();

app.use(express.json());

const hallBookingRoutes = require("./routes/hallBookingRoutes");
app.use("/api", hallBookingRoutes);
app.listen(PORT, () => {
  console.log("Server is up on port", PORT);
});
