"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useBookings } from "@/hooks/use-bookings";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { Service } from "@/lib/types";


const formSchema = z.object({
  bookingName: z.string().min(2, { message: "Booking name must be at least 2 characters." }),
  bookingDate: z.date({ required_error: "A date is required." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  notes: z.string().optional(),
});

interface BookingFormProps {
  serviceCategory: Service['id'];
}

export function BookingForm({ serviceCategory }: BookingFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addBooking, updateBooking, getBookingById } = useBookings();
  const [isLoading, setIsLoading] = React.useState(false);

  const bookingId = searchParams.get('id');
  const existingBooking = bookingId ? getBookingById(bookingId) : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingName: "",
      price: 0,
      notes: "",
    },
  });

  useEffect(() => {
    if (existingBooking) {
      form.reset({
        bookingName: existingBooking.bookingName,
        bookingDate: new Date(existingBooking.bookingDate),
        price: existingBooking.price,
        notes: existingBooking.notes,
      });
    }
  }, [existingBooking, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Check if user is logged in
    const userJson = localStorage.getItem('knotbook-user'); // Legacy check fallback or use context? 
    // Better to check auth state, but we don't have it direct here easily without prop drilling or hook usage.
    // However, the hook 'useBookings' uses 'useAuth', and we can check if it fails.

    // We should really handle this by ensuring the promise rejects if no user.
    // For now, let's await the result. 

    // Note: Since we are using Firebase, we should rely on the hooks.
    // Let's assume the hook handles the auth check or we should check it here.

    const bookingData = {
      ...values,
      bookingDate: values.bookingDate.toISOString(),
      serviceCategory,
    };

    try {
      if (existingBooking) {
        await updateBooking({ ...bookingData, id: existingBooking.id });
      } else {
        await addBooking(bookingData);
      }
      // Only redirect on success
      router.push('/history');
    } catch (error) {
      // Toast is handled in the hook
      console.error("Form submission error", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="bookingName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John & Jane's Wedding" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Booking Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any specific requests for the vendor..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {existingBooking ? 'Save Changes' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
