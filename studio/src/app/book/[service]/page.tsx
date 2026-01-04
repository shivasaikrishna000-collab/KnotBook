import AppLayout from "@/components/app-layout";
import { BookingForm } from "@/components/booking-form";
import { Shirt, Sparkles, Car, Camera, Utensils } from "lucide-react";
import type { Service } from "@/lib/types";
import { MobileHeader } from "@/components/app-sidebar";

const servicesMap: Record<string, Omit<Service, 'image'>> = {
  costumes: { id: 'costumes', title: "Costumes", description: "Book your wedding attire.", icon: Shirt },
  decoration: { id: 'decoration', title: "Decoration", description: "Design your dream venue.", icon: Sparkles },
  vehicles: { id: 'vehicles', title: "Vehicles", description: "Arrange for stylish transport.", icon: Car },
  photography: { id: 'photography', title: "Photography", description: "Capture your precious moments.", icon: Camera },
  catering: { id: 'catering', title: "Gourmet Catering", description: "Delight your guests with exquisite flavors.", icon: Utensils },
};

export function generateStaticParams() {
  return Object.keys(servicesMap).map((service) => ({
    service,
  }));
}

export default function BookServicePage({ params }: { params: { service: string } }) {
  const service = servicesMap[params.service] || {
    id: 'costumes',
    title: "Unknown Service",
    description: "Please select a valid service.",
    icon: () => null,
  };
  const Icon = service.icon;

  return (
    <AppLayout>
      <MobileHeader />
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
              Book {service.title}
            </h1>
            <p className="mt-1 text-muted-foreground">{service.description}</p>
          </div>
        </div>
        <div className="mx-auto max-w-2xl">
          <BookingForm serviceCategory={service.id} />
        </div>
      </div>
    </AppLayout>
  );
}
