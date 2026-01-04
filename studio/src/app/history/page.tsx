import AppLayout from "@/components/app-layout";
import { HistoryTable } from "@/components/history-table";
import { MobileHeader } from "@/components/app-sidebar";

export default function HistoryPage() {
  return (
    <AppLayout>
      <MobileHeader />
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
            Booking History
          </h1>
          <p className="mt-2 text-muted-foreground">
            View, edit, or delete your service bookings.
          </p>
        </div>
        <HistoryTable />
      </div>
    </AppLayout>
  );
}
