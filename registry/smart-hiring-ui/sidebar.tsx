"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// ============================================================================
// TYPES
// ============================================================================

export interface NavItem {
  id: string
  title: string
  description?: string
  icon: LucideIcon
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface SidebarProps {
  /** Navigation groups to display */
  groups: NavGroup[]
  /** Currently active item ID */
  activeId?: string
  /** Callback when an item is clicked */
  onItemClick?: (id: string) => void
  /** Optional top card content (e.g., performance stats) */
  topCard?: React.ReactNode
  /** Optional footer content (e.g., user profile) */
  footer?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * DashboardSidebar - A collapsible sidebar with navigation groups
 * 
 * @example
 * ```tsx
 * <DashboardSidebar
 *   groups={[
 *     {
 *       label: "Main",
 *       items: [
 *         { id: "overview", title: "Overview", icon: TrendingUp },
 *         { id: "jobs", title: "Jobs", icon: Briefcase, badge: "23" },
 *       ]
 *     }
 *   ]}
 *   activeId="overview"
 *   onItemClick={(id) => console.log(id)}
 *   topCard={<PerformanceCard />}
 *   footer={<UserProfile />}
 * />
 * ```
 */
export function DashboardSidebar({
  groups,
  activeId,
  onItemClick,
  topCard,
  footer,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-full w-72 border-r border-border bg-card",
        className
      )}
    >
      {/* Top Card */}
      {topCard && <div className="p-4">{topCard}</div>}

      {/* Navigation */}
      <nav className="flex-1 overflow-auto p-4 space-y-6">
        {groups.map((group, groupIndex) => (
          <div key={group.label}>
            {groupIndex > 0 && <Separator className="mb-4" />}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  onClick={() => onItemClick?.(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && <div className="p-4 border-t border-border">{footer}</div>}
    </aside>
  )
}

interface NavButtonProps {
  item: NavItem
  isActive?: boolean
  onClick?: () => void
}

function NavButton({ item, isActive, onClick }: NavButtonProps) {
  const Icon = item.icon

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "w-full justify-start h-12 text-left transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
          : "hover:bg-accent/50 hover:translate-x-1"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 flex-1">
        <div
          className={cn(
            "p-1.5 rounded-lg",
            isActive ? "bg-primary-foreground/20" : "bg-accent"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{item.title}</p>
          {item.description && (
            <p className="text-xs opacity-70 truncate">{item.description}</p>
          )}
        </div>
        {item.badge && isActive && (
          <Badge
            variant="secondary"
            className="bg-primary-foreground/20 text-primary-foreground ml-auto flex-shrink-0"
          >
            {item.badge}
          </Badge>
        )}
      </div>
    </Button>
  )
}

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

/**
 * PerformanceCard - A gradient card for displaying quick stats
 * 
 * @example
 * ```tsx
 * <PerformanceCard
 *   title="This Week"
 *   subtitle="Performance"
 *   icon={TrendingUp}
 *   stats={[
 *     { label: "New Apps", value: "47" },
 *     { label: "Interviews", value: "12" },
 *   ]}
 * />
 * ```
 */
export interface PerformanceCardProps {
  title: string
  subtitle?: string
  icon: LucideIcon
  stats: { label: string; value: string }[]
  className?: string
}

export function PerformanceCard({
  title,
  subtitle,
  icon: Icon,
  stats,
  className,
}: PerformanceCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-lg font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * UserProfile - Compact user profile for sidebar footer
 * 
 * @example
 * ```tsx
 * <UserProfile
 *   name="John Doe"
 *   role="Admin"
 *   avatar="/avatar.png"
 *   status="online"
 * />
 * ```
 */
export interface UserProfileProps {
  name: string
  role?: string
  avatar?: string
  fallback?: string
  status?: "online" | "offline" | "away"
  className?: string
}

export function UserProfile({
  name,
  role,
  avatar,
  fallback,
  status = "online",
  className,
}: UserProfileProps) {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
          {avatar ? (
            <img src={avatar} alt={name} className="h-full w-full rounded-full object-cover" />
          ) : (
            fallback || name.charAt(0).toUpperCase()
          )}
        </div>
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
            statusColors[status]
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        {role && <p className="text-xs text-muted-foreground truncate">{role}</p>}
      </div>
    </div>
  )
}
