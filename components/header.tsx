"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Package2,
  Search,
  CircleUser,
  Home,
  BookOpen,
  Briefcase,
  Mail,
  Info,
  LayoutDashboard,
  Settings,
  LogOut,
  UserPlus,
  LogIn,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { SearchInput } from "./shared/search-input" // Import the SearchInput component

export default function Header() {
  const { setTheme } = useTheme()
  const { data: session, status } = useSession()
  const isLoadingSession = status === "loading"

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">PINCOREHUB</span>
        </Link>
        <Link href="/" className="text-foreground transition-colors hover:text-foreground">
          <Home className="h-4 w-4 inline-block mr-1" /> Home
        </Link>
        <Link href="/courses" className="text-muted-foreground transition-colors hover:text-foreground">
          <BookOpen className="h-4 w-4 inline-block mr-1" /> Courses
        </Link>
        <Link href="/services" className="text-muted-foreground transition-colors hover:text-foreground">
          <Briefcase className="h-4 w-4 inline-block mr-1" /> Services
        </Link>
        <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
          <LayoutDashboard className="h-4 w-4 inline-block mr-1" /> Blog
        </Link>
        <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
          <Info className="h-4 w-4 inline-block mr-1" /> About
        </Link>
        <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
          <Mail className="h-4 w-4 inline-block mr-1" /> Contact
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">PINCOREHUB</span>
            </Link>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/courses" className="text-muted-foreground hover:text-foreground">
              Courses
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-foreground">
              Services
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            {session?.user ? (
              <>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link href="/dashboard/admin/courses" className="text-muted-foreground hover:text-foreground">
                    Admin (Courses)
                  </Link>
                )}
                {session.user.role === "ADMIN" ||
                  (session.user.role === "INSTRUCTOR" && (
                    <Link href="/dashboard/admin/blog" className="text-muted-foreground hover:text-foreground">
                      Admin (Blog)
                    </Link>
                  ))}
                <Button variant="ghost" onClick={() => signOut()} className="justify-start px-0">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-foreground">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SearchInput /> {/* Use the new SearchInput component */}
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session?.user?.name || "My Account"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session?.user ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                {session.user.role === "ADMIN" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Admin</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/admin/courses">
                        <BookOpen className="mr-2 h-4 w-4" /> Manage Courses
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/admin/blog">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Manage Blog
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {session.user.role === "INSTRUCTOR" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Instructor</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/admin/blog">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Manage Blog
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signin">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signup">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
