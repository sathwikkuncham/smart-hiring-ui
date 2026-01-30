"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ============================================================================
// TYPES
// ============================================================================

export interface HeaderProps {
  /** Logo icon component */
  logoIcon: LucideIcon
  /** Logo text */
  logoText: string
  /** Logo subtitle */
  logoSubtitle?: string
  /** Breadcrumb items */
  breadcrumbs?: { label: string; href?: string }[]
  /** Notification count */
  notificationCount?: number
  /** Notification click handler */
  onNotificationClick?: () => void
  /** Settings click handler */
  onSettingsClick?: () => void
  /** User menu items */
  userMenuItems?: { label: string; onClick?: () => void; separator?: boolean }[]
  /** User info */
  user: {
    name: string
    role?: string
    avatar?: string
    fallback?: string
  }
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * DashboardHeader - Sticky header with logo, breadcrumbs, and user actions
 * 
 * @example
 * ```tsx
 * <DashboardHeader
 *   logoIcon={Brain}
 *   logoText="Smart Hiring"
 *   logoSubtitle="AI-Powered"
 *   breadcrumbs={[{ label: "Dashboard" }, { label: "Overview" }]}
 *   notificationCount={3}
 *   user={{ name: "John Doe", role: "Admin" }}
 * />
 * ```
 */
export function DashboardHeader({
  logoIcon: LogoIcon,
  logoText,
  logoSubtitle,
  breadcrumbs,
  notificationCount = 0,
  onNotificationClick,
  onSettingsClick,
  userMenuItems,
  user,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25">
                <LogoIcon className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 md:h-4 md:w-4 rounded-full bg-secondary animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-foreground">
                {logoText}
              </h1>
              {logoSubtitle && (
                <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                  {logoSubtitle}
                </p>
              )}
            </div>
          </div>

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <>
              <Separator orientation="vertical" className="h-6 hidden lg:block" />
              <nav className="hidden lg:flex items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <span className="text-muted-foreground">/</span>
                    )}
                    {crumb.href ? (
                      <a
                        href={crumb.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span
                        className={cn(
                          index === breadcrumbs.length - 1
                            ? "font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-accent/50 transition-all duration-200"
              onClick={onNotificationClick}
            >
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground font-bold">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-accent/50 transition-all duration-200 hidden sm:flex"
              onClick={onSettingsClick}
            >
              <span className="sr-only">Settings</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 md:gap-3 p-1 md:p-2">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  {user.role && (
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  )}
                </div>
                <Avatar className="h-8 w-8 md:h-10 md:w-10 ring-2 ring-background shadow-lg">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold text-sm">
                    {user.fallback || user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userMenuItems?.map((item, index) => (
                <React.Fragment key={index}>
                  {item.separator && <DropdownMenuSeparator />}
                  <DropdownMenuItem onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
