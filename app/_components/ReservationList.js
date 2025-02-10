"use client";

import { useOptimistic } from "react";

import ReservationCard from "@/app/_components/ReservationCard";
import { deleteBooking } from "@/app/_lib/actions";

// useOptimistic hook is a React hook that allows you to update the UI optimistically before the server responds.
// For example, when you delete a reservation, you can remove it from the list immediately: we are following the optimistic scenario.
// If the server responds with an error, hook will simply revert the UI to the previous state.

// The hook takes two arguments:
// 1. The current state (bookings) and
// 2. A function that updates the state optimistically (optimisticDelete).

// The optimisticDelete function receives the current state and the booking ID to delete.

// Destructure: optimisticBookings: the resulting state after the optimistic update, and optimisticDelete: the function to update the state optimistically,
// which we provide in the useOptimistic hook.

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    // IT is our optimisticDelete function logic
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  // ASYNC !!!
  async function handleDelete(bookingId) {
    // Optimistically update the UI
    optimisticDelete(bookingId);
    // Real request to the server
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => ( 
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
