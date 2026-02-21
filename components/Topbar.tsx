import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold">
                    <Truck className="h-6 w-6 text-primary" />
                    <span className="hidden sm:inline-block">FleetFlow</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
