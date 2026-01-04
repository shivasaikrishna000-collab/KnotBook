"use client";
import { useState, useEffect } from 'react';

import AppLayout from "@/components/app-layout";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Sun, Moon, BookOpen, User, ArrowLeft, Heart } from "lucide-react";
import { MobileHeader } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React from "react";

const PRESET_AVATARS = [
  // Professional / Formal
  "https://api.dicebear.com/7.x/avataaars/svg?seed=WeddingPlan&clothing=blazerAndShirt&top=shortHair&accessories=glasses",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Groom1&clothing=shirtCrewNeck&top=shortHairDreads01&facialHair=beardLight",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bride1&clothing=collarAndSweater&top=longHairStraight&accessories=[]",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=PlannerPro&clothing=blazerAndSweater&top=shortHairShortFlat&eyebrows=default",

  // Elegant / Neutral
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Elegant1&clothing=shirtScoopNeck&top=longHairBun&skinColor=f8d25c",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Elegant2&clothing=shirtVNeck&top=shortHairTheCaesar&skinColor=d08b5b",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Professional&clothing=overall&top=longHairBob&accessories=round",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Gentleman&clothing=shirtCrewNeck&top=shortHairFrizzle&facialHair=beardMedium",
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState<string>("light");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || `https://avatar.vercel.sh/${user?.email || 'user'}.png`);

  React.useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    } else if (user?.email) {
      setPhotoURL(`https://avatar.vercel.sh/${user.email}.png`);
    }
  }, [user]);

  // Initialise theme from localStorage or system preference
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  const handleUpdateAvatar = async (url: string) => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { photoURL: url });
      setPhotoURL(url);
      // Reload page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Failed to update avatar", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <AppLayout>
      <MobileHeader />
      <div className="container mx-auto p-4 md:p-8 bg-background dark:bg-background">

        {/* Header with Theme Toggle */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
              User Profile
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your account details and update your avatar.
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme} className="shrink-0">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        {/* Profile card */}
        <Card className="mx-auto max-w-lg bg-card dark:bg-gray-900 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-24 w-24 rounded-full p-0 relative group cursor-pointer">
                    <Avatar className="h-24 w-24 border-4 border-primary/10">
                      <AvatarImage src={photoURL} alt={user.name} className="object-cover" />
                      <AvatarFallback className="text-3xl">{user.name?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-xs text-white font-medium">Change</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2 z-50" side="bottom" align="center">
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_AVATARS.map((avatar, i) => (
                      <button
                        key={i}
                        className="relative h-16 w-16 overflow-hidden rounded-md border hover:border-primary focus:outline-none transition-all hover:scale-105 active:scale-95"
                        onClick={() => handleUpdateAvatar(avatar)}
                      >
                        <img src={avatar} alt={`Avatar ${i}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-center text-xs text-muted-foreground">Select an avatar</p>
                </PopoverContent>
              </Popover>

              <div className="text-center space-y-1">
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/history")}>
                <BookOpen className="mr-2 h-4 w-4" /> View Booking History
              </Button>
              <Button variant="destructive" className="w-full justify-start" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
