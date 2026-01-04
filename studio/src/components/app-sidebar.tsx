"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarTrigger
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Home, History, User, LogOut, Heart, Menu, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";

// Navigation items – Home, History, and Profile
const navItems = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/history", icon: History, label: "History" },
    { href: "/profile", icon: User, label: "Profile" },
];

export default function AppSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const isMobile = useIsMobile();

    return (
        <Sidebar collapsible={isMobile ? "offcanvas" : "icon"} className="border-r">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-3">
                    <Heart className="h-8 w-8 text-primary" />
                    <span className="text-xl font-semibold font-headline group-data-[collapsible=icon]:hidden">KnotBook</span>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href} legacyBehavior passHref>
                                <SidebarMenuButton
                                    isActive={pathname === item.href}
                                    tooltip={item.label}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-12 w-full justify-start p-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={user?.name} />
                                    <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="text-left group-data-[collapsible=icon]:hidden">
                                    <p className="text-sm font-medium">{user?.name}</p>
                                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                                </div>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/profile" passHref>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export function MobileHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const showBackButton = pathname !== "/home";

    return (

        /* Added pt-8 for safe area status bar simulation on Android if safe-area-inset not supported, 
           but traditionally safe-area-inset-top is best. 
           Using h-auto and adding padding top.
        */
        <>
            <header className="fixed top-0 left-0 right-0 z-40 flex flex-col border-b bg-background/95 backdrop-blur supports-[padding-top:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)] pt-8 md:hidden">
                <div className="flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        {showBackButton && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.back()}
                                className="mr-2"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        )}
                        <Link href="/home" className="flex items-center gap-2">
                            <Heart className="h-6 w-6 text-primary" />
                            <span className="text-lg font-semibold font-headline">KnotBook</span>
                        </Link>
                    </div>
                    <SidebarTrigger>
                        <Menu />
                    </SidebarTrigger>
                </div>
            </header>
            {/* Spacer to push content down from fixed header */}
            <div className="h-24 md:hidden" />
        </>
    );
}
