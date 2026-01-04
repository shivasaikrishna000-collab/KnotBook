"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Booking } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedBookings: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let bookingDate = data.bookingDate;

        // Convert Firebase Timestamp to Date string or object as needed by app
        if (bookingDate instanceof Timestamp) {
          bookingDate = bookingDate.toDate().toISOString();
        }

        loadedBookings.push({ ...data, id: doc.id, bookingDate });
      });
      setBookings(loadedBookings);
      setLoading(false);
    }, (error) => {
      console.error("Failed to subscribe to bookings", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not sync bookings.",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, toast]);

  const addBooking = useCallback(async (booking: Omit<Booking, 'id'>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Logged In",
        description: "You must be logged in to save a booking.",
      });
      throw new Error("User not authenticated");
    }
    try {
      // Create a clean object to save
      const bookingData = {
        ...booking,
        userId: user.uid,
        createdAt: new Date(),
        // Ensure date is stored cleanly
        bookingDate: new Date(booking.bookingDate),
      };

      await addDoc(collection(db, "bookings"), bookingData);

      toast({
        title: "Booking Saved!",
        description: `Your booking for ${booking.serviceCategory} has been saved.`,
      });
    } catch (error) {
      console.error("Failed to save booking", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save your booking.",
      });
    }
  }, [user, toast]);

  const updateBooking = useCallback(async (updatedBooking: Booking) => {
    try {
      const id = updatedBooking.id!; // Ensure ID exists
      const bookingRef = doc(db, "bookings", id);

      const { id: _, ...dataToUpdate } = updatedBooking; // Remove ID from data payload

      // If bookingDate needs conversion back to Date object
      // If bookingDate needs conversion back to Date object
      if (typeof dataToUpdate.bookingDate === 'string') {
        (dataToUpdate as any).bookingDate = new Date(dataToUpdate.bookingDate);
      }

      await updateDoc(bookingRef, dataToUpdate);

      toast({
        title: "Booking Updated!",
        description: "Your booking details have been updated.",
      });
    } catch (error) {
      console.error("Failed to update booking", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not update your booking.",
      });
    }
  }, [toast]);

  const deleteBooking = useCallback(async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));

      toast({
        title: "Booking Deleted",
        description: "The booking has been removed.",
      });
    } catch (error) {
      console.error("Failed to delete booking", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete your booking.",
      });
    }
  }, [toast]);

  const getBookingById = useCallback((id: string) => {
    return bookings.find(b => b.id === id);
  }, [bookings]);

  return { bookings, loading, addBooking, updateBooking, deleteBooking, getBookingById };
}
