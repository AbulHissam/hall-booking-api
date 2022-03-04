let rooms = [];
let bookedRooms = [];
let customers = [];
const createRoom = (req, res) => {
  let { roomDetails } = req.body;
  if (!roomDetails) throw new Error("roomDetails is missing");
  roomDetails = {
    ...roomDetails,
    isBooked: false,
  };
  rooms = [roomDetails, ...rooms];
  res.status(200).json({
    message: `Room ${roomDetails.id} successfully created`,
    roomDetails: rooms.find((r) => r.id === roomDetails.id),
  });
};

const fetchRooms = (req, res) => {
  res.status(200).json(rooms);
};

const bookRoom = (req, res) => {
  try {
    const { bookingDetails } = req.body;

    if (!bookingDetails) throw new Error("bookingDetails is missing");

    const roomToBeBooked = rooms.find((r) => r.id === bookingDetails.roomId);

    if (!roomToBeBooked) throw new Error("Invalid room details");

    if (roomToBeBooked.isBooked)
      throw new Error(`Room ${roomToBeBooked.id} is already booked`);

    const bookedRoom = {
      ...roomToBeBooked,
      isBooked: true,
      bookingDetails: {
        customerName: bookingDetails.customerName,
        date: bookingDetails.date,
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
      },
    };
    bookedRooms = [bookedRoom, ...bookedRooms];
    rooms = [bookedRoom, ...rooms.filter((r) => r.id !== bookedRoom.id)];

    const bookedCustomer = {
      customerName: bookingDetails.customerName,
      bookingDetails: {
        roomId: bookingDetails.roomId,
        date: bookingDetails.date,
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
      },
    };
    customers = [bookedCustomer, ...customers];

    res.status(200).json({
      message: `Room ${roomToBeBooked.id} successfully booked`,
      bookingDetails,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const fetchBookedRooms = (req, res) => {
  res.status(200).json(bookedRooms);
};

const fetchCustomerDetails = (req, res) => {
  res.status(200).json(customers);
};

module.exports = {
  createRoom,
  fetchRooms,
  bookRoom,
  fetchBookedRooms,
  fetchCustomerDetails,
};
