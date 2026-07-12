import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Sun, Moon, Menu, Plus, Home, Book, X } from "lucide-react";
import { cn } from "@/lib/utils";

const UNIVERSITIES = [
  { id: 'upcat', name: 'University of the Philippines - (UPCAT 2027)' }
];

export function Layout({ children, hideSidebar = false }: { children: React.ReactNode; hideSidebar?: boolean }) {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      {!hideSidebar && (
        <>
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/80 md:hidden" 
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 ease-in-out flex flex-col",
              "md:relative md:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <Link href="/" className="flex items-center gap-3 font-bold text-lg text-primary transition-colors hover:text-primary/80">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="IskolarTrack" className="h-8 w-8 object-contain" />
                <span>IskolarTrack</span>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1 px-2">
                <Link href="/">
                  <span className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer", location === '/' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                    <Home className="h-4 w-4" />
                    Home
                  </span>
                </Link>
              </nav>
              
              <div className="mt-8 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>My Universities</span>
                <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full" title="Add University">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <nav className="space-y-1 px-2">
                {UNIVERSITIES.map(uni => (
                  <Link key={uni.id} href={`/university/${uni.id}`}>
                    <span className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer line-clamp-1", location === `/university/${uni.id}` ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                      <Book className="h-4 w-4 shrink-0" />
                      <span className="truncate">{uni.name}</span>
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4 md:px-6">
            {!hideSidebar && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="ml-auto flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="h-9 w-9 rounded-full"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              {!loading && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
                          <AvatarFallback className="text-xs">
                            {user.displayName?.charAt(0) ?? user.email?.charAt(0) ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                          {user.displayName ?? user.email}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel className="font-normal">
                        <p className="text-sm font-medium leading-none truncate">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOutUser} className="text-destructive focus:text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={signInWithGoogle}
                    className="gap-2"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="hidden sm:inline">Sign in with Google</span>
                    <span className="sm:hidden">
                      <LogIn className="h-4 w-4" />
                    </span>
                  </Button>
                )
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="container mx-auto px-4 md:px-6 py-8 max-w-6xl flex-1 flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
