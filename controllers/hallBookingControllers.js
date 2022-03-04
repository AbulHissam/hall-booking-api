let rooms = [];
let bookedRooms = [];
let customers = [];

const createRoom = (req, res) => {
  try {
    let { roomDetails } = req.body;
    if (!roomDetails) throw new Error("roomDetails is missing");

    const roomToBeCreated = rooms.find((r) => r.id === roomDetails.id);
    if (roomToBeCreated)
      throw new Error(`Room ${roomDetails.id} already exist`);

    // add the room to the existing rooms,isBooked:false when created
    roomDetails = {
      ...roomDetails,
      isBooked: false,
    };
    rooms = [roomDetails, ...rooms];

    // send the created room details
    res.status(200).json({
      message: `Room ${roomDetails.id} successfully created`,
      roomDetails: rooms.find((r) => r.id === roomDetails.id),
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
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

    // adding booking details to room
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
    // include bookedRoom to list of bookedRooms
    bookedRooms = [bookedRoom, ...bookedRooms];

    // in the list of createdRooms,update room to include booking details
    rooms = [bookedRoom, ...rooms.filter((r) => r.id !== bookedRoom.id)];

    // update customer to include booking detai;s
    const bookedCustomer = {
      customerName: bookingDetails.customerName,
      bookingDetails: {
        roomId: bookingDetails.roomId,
        date: bookingDetails.date,
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
      },
    };
    // include the bookedCustomer to existing list of customers
    customers = [bookedCustomer, ...customers];

    // send response with bookingDetails
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
