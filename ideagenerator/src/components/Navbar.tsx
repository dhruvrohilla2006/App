
import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, User, LogOut, Sparkles, Bookmark, FileCode } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">HackMuse</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6 items-center">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/browse"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Browse Ideas
          </Link>
          <Link
            to="/profile"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            My Ideas
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.email || ""} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/profile?tab=saved">
                  <DropdownMenuItem>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Saved Ideas</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/generate">
            <SignedIn>
              <UserButton/>
            </SignedIn>
            <SignedOut>
              <SignInButton/>
            </SignedOut>
            </Link>
          )
        }
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-4">
              <Link
                to="/"
                className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Home
              </Link>
              <Link
                to="/browse"
                className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <FileCode className="mr-2 h-5 w-5" />
                Browse Ideas
              </Link>
              <Link
                to="/profile"
                className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Bookmark className="mr-2 h-5 w-5" />
                My Ideas
              </Link>

              {user ? (
                <>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="" alt={user.email || ""} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">{user.email}</div>
                    </div>
                    <Button
                      variant="ghost"
                      className="flex items-center mt-4 w-full justify-start"
                      onClick={async () => {
                        await handleSignOut();
                        setIsMobileNavOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Log out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="border-t pt-4 mt-4">
                  <Link to="/profile" onClick={() => setIsMobileNavOpen(false)}>
                    <Button className="w-full">Sign In</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
