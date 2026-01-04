export interface Booking {
  id: string;
  serviceCategory: 'costumes' | 'decoration' | 'vehicles' | 'photography' | 'catering';
  bookingName: string;
  bookingDate: string; // ISO string
  price: number;
  notes: string;
}

export interface Service {
  id: 'costumes' | 'decoration' | 'vehicles' | 'photography' | 'catering';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: {
    id: string;
    url: string;
    hint: string;
  };
}
