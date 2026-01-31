"use client"

import Link from "next/link"
import { FileText, Menu, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/context/auth-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"

const mainNavLinks = [
  { href: "/resume", label: "Create Resume" },
  { href: "/contact", label: "Contact Me" },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const userInitial = user?.email?.charAt(0).toUpperCase() || <UserIcon className="h-4 w-4"/>

  const MainNavItems = mainNavLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === link.href ? "text-primary" : "text-muted-foreground"
      )}
    >
      {link.label}
    </Link>
  ))

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">ResumeContact Pro</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {MainNavItems}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          
          {loading ? (
             <Skeleton className="h-8 w-24" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-medium">My Account</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="hidden md:flex" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              <Link href="/resume">Get Started</Link>
            </Button>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <FileText className="h-6 w-6 text-primary" />
                      <span className="font-headline text-lg font-bold">ResumeContact Pro</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-6">
                  {MainNavItems}
                  {user && (
                     <Link href="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Admin</Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
