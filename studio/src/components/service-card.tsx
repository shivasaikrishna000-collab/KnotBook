import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link href={`/book/${service.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="relative h-40 p-0">
          <Image
            src={service.image.url}
            alt={service.description}
            width={600}
            height={400}
            data-ai-hint={service.image.hint}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </CardHeader>
        <CardContent className="p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm">{service.description}</CardDescription>
                </div>
            </div>
            <Button variant="link" className="mt-4 p-0 text-accent group-hover:underline">
                Book Now <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
