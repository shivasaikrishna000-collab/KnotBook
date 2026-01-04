"use client";

import React from 'react';
import { useBookings } from '@/hooks/use-bookings';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Loader2, Shirt, Sparkles, Car, Camera, Calendar, DollarSign, Edit3, Notebook } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Booking } from '@/lib/types';

const serviceIcons = {
    costumes: Shirt,
    decoration: Sparkles,
    vehicles: Car,
    photography: Camera,
};

export function HistoryTable() {
  const { bookings, loading, deleteBooking } = useBookings();
  const router = useRouter();
  const [deleteCandidate, setDeleteCandidate] = React.useState<Booking | null>(null);

  const handleEdit = (booking: Booking) => {
    router.push(`/book/${booking.serviceCategory}?id=${booking.id}`);
  };

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      deleteBooking(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <Card className="mt-8 text-center">
        <CardContent className="p-12">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Bookings Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Start by booking a service from the home page.</p>
            <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => router.push('/home')}>
                Book a Service
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className='p-0'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map((booking) => {
                    const Icon = serviceIcons[booking.serviceCategory] || Notebook;
                    return (
                        <TableRow key={booking.id}>
                        <TableCell>
                            <div className='flex items-center gap-3'>
                                <Icon className="h-5 w-5 text-muted-foreground" />
                                <span className='capitalize font-medium'>{booking.serviceCategory}</span>
                            </div>
                        </TableCell>
                        <TableCell>{booking.bookingName}</TableCell>
                        <TableCell>{format(new Date(booking.bookingDate), 'MMM d, yyyy')}</TableCell>
                        <TableCell>${booking.price.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(booking)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDeleteCandidate(booking)} className="text-destructive focus:text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      
      <AlertDialog open={!!deleteCandidate} onOpenChange={(open) => !open && setDeleteCandidate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your booking for <span className='font-semibold'>{deleteCandidate?.bookingName}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
