```
method:get
fetchRooms
https://hall-booking-abh.herokuapp.com/api/rooms
```

```
method:post
https://hall-booking-abh.herokuapp.com/api/createRoom
{
    "roomDetails": {
        "id":"Berlin",
        "seatsAvailable": 500,
        "amenities": [
            "AC",
            "Projector",

        ],
        "ratePerHour": 5000
    }
}
```

```
method:post
https://hall-booking-abh.herokuapp.com/api/bookRoom
{
    "bookingDetails": {
        "customerName":"Abul",
        "roomId": "Oslo",
        "date":"04/03/2022",
        "startTime": "10:00AM",
        "endTime": "12:00PM"
    }
}
```

```
method:get
fetchBookedRooms
https://hall-booking-abh.herokuapp.com/api/bookedRooms
```

```
method:get
fetchBookedCustomerDetails
https://hall-booking-abh.herokuapp.com/api/customerDetails
```
