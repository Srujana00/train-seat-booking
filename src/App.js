
import React, { useState } from "react";
import "./App.css"; 

const SEATS_PER_ROW = 7;
const TOTAL_SEATS = 80;

function App() {
  const [seats, setSeats] = useState(Array(TOTAL_SEATS).fill(false)); 
  const [inputSeats, setInputSeats] = useState(1);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setInputSeats(Number(e.target.value));
  };

  const bookSeats = () => {
    if (inputSeats < 1 || inputSeats > 7) {
      setMessage("You can only book between 1 and 7 seats.");
      return;
    }

    // Find available seats
    let availableSeats = [];
    for (let i = 0; i < seats.length; i += SEATS_PER_ROW) {
      const row = seats.slice(i, i + SEATS_PER_ROW);
      const availableInRow = row.map((seat, index) => !seat && index).filter(Boolean);
      if (availableInRow.length >= inputSeats) {
        availableSeats = availableInRow.map((index) => i + index);
        break;
      }
    }

    // If no single row can accommodate, find nearby seats
    if (availableSeats.length === 0) {
      availableSeats = seats
        .map((seat, index) => (!seat ? index : null))
        .filter((index) => index !== null)
        .slice(0, inputSeats);
    }

    // If seats are available, book them
    if (availableSeats.length === inputSeats) {
      const updatedSeats = [...seats];
      availableSeats.forEach((seat) => {
        updatedSeats[seat] = true;
      });
      setSeats(updatedSeats);
      setMessage(`Successfully booked seats: ${availableSeats.map((s) => s + 1).join(", ")}`);
    } else {
      setMessage("Not enough seats available.");
    }
  };

  return (
    <div className="App">
      <h1>Train Seat Booking</h1>
      <p>{message}</p>
      <div>
        <label>Enter number of seats to book (1-7): </label>
        <input type="number" value={inputSeats} onChange={handleInputChange} min="1" max="7" />
        <button onClick={bookSeats} className="book-btn">Book Seats</button>
      </div>

      <div className="seat-layout">
        {seats.map((seat, index) => (
          <div
            key={index}
            className={`seat ${seat ? "booked" : "available"}`}
            title={`Seat ${index + 1}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
