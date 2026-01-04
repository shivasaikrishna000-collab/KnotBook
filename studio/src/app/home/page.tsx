"use client";

import AppLayout from "@/components/app-layout";
import { ServiceCard } from "@/components/service-card";
import type { Service } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Shirt, Sparkles, Car, Camera, User, Utensils } from "lucide-react";
import { MobileHeader } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const services: Service[] = [
  {
    id: 'costumes',
    title: "Exquisite Costumes",
    description: "Find the perfect attire for your special day.",
    icon: Shirt,
    image: {
      id: "costumes-hero",
      url: PlaceHolderImages.find(img => img.id === 'costumes-hero')?.imageUrl || '',
      hint: PlaceHolderImages.find(img => img.id === 'costumes-hero')?.imageHint || 'wedding dress'
    }
  },
  {
    id: 'decoration',
    title: "Elegant Decorations",
    description: "Transform your venue into a dream setting.",
    icon: Sparkles,
    image: {
      id: "decoration-hero",
      url: PlaceHolderImages.find(img => img.id === 'decoration-hero')?.imageUrl || '',
      hint: PlaceHolderImages.find(img => img.id === 'decoration-hero')?.imageHint || 'wedding decoration'
    }
  },
  {
    id: 'vehicles',
    title: "Luxury Vehicles",
    description: "Arrive in style with our premium selection.",
    icon: Car,
    image: {
      id: "vehicles-hero",
      url: PlaceHolderImages.find(img => img.id === 'vehicles-hero')?.imageUrl || '',
      hint: PlaceHolderImages.find(img => img.id === 'vehicles-hero')?.imageHint || 'wedding car'
    }
  },
  {
    id: 'photography',
    title: "Timeless Photography",
    description: "Capture every moment to cherish forever.",
    icon: Camera,
    image: {
      id: "photography-hero",
      url: PlaceHolderImages.find(img => img.id === 'photography-hero')?.imageUrl || '',
      hint: PlaceHolderImages.find(img => img.id === 'photography-hero')?.imageHint || 'wedding photography'
    }
  },
  {
    id: 'catering',
    title: "Gourmet Catering",
    description: "Delight your guests with exquisite flavors.",
    icon: Utensils,
    image: {
      id: "catering-hero",
      url: '/images/catering-hero.png',
      hint: 'wedding catering'
    }
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <AppLayout>
      <MobileHeader />
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
              Plan Your Perfect Day
            </h1>
            <p className="mt-2 text-muted-foreground">
              Select a service category to start planning.
            </p>
          </div>
          <Button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
