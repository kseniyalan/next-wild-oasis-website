"use server";

import { revalidatePath } from "next/cache";

import { getBookings } from "./data-service";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";



export async function updateGuest(formData) {
  const session = await auth();
  // Best practice is NOT to use try/catch on the server, but simply throw errors instead
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  // Manually revalidate the cache for the profile page
  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// Bookings
export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Check if the booking belongs to the logged-in user
  // It is for prevent somebody to steal cURL request and delete other user's booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  // Manually revalidate the cache for the reservations page
  revalidatePath("/account/reservations");
}
