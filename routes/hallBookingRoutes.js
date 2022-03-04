const { Router } = require("express");
const express = require("express");

const router = express.Router();

const {
  createRoom,
  fetchRooms,
  bookRoom,
  fetchBookedRooms,
  fetchCustomerDetails,
} = require("../controllers/hallBookingControllers");

router.post("/createRoom", createRoom);
router.get("/rooms", fetchRooms);
router.post("/bookRoom", bookRoom);
router.get("/bookedRooms", fetchBookedRooms);
router.get("/customerDetails", fetchCustomerDetails);

module.exports = router;
