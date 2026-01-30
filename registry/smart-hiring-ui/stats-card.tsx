"use client"

import * as React from "react"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ============================================================================
// TYPES
// ============================================================================

export interface StatsCardProps {
  /** Card title */
  title: string
  /** Main value to display */
  value: string | number
  /** Change indicator (e.g., "+12%" or "-5%") */
  change?: string
  /** Change description */
  changeLabel?: string
  /** Icon component */
  icon: LucideIcon
  /** Icon background color variant */
  iconVariant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * StatsCard - Metric card with title, value, change indicator, and icon
 * 
 * @example
 * ```tsx
 * <StatsCard
 *   title="Total Revenue"
 *   value="$45,231"
 *   change="+12%"
 *   changeLabel="from last month"
 *   icon={DollarSign}
 *   iconVariant="success"
 * />
 * ```
 */
export function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconVariant = "default",
  className,
}: StatsCardProps) {
  const isPositive = change?.startsWith("+")
  const isNegative = change?.startsWith("-")

  const iconVariants = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    danger: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", iconVariants[iconVariant])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {(change || changeLabel) && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            {change && (
              <>
                {isPositive && (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                )}
                {isNegative && (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={cn(
                    isPositive && "text-green-600 dark:text-green-400",
                    isNegative && "text-red-600 dark:text-red-400"
                  )}
                >
                  {change}
                </span>
              </>
            )}
            {changeLabel && <span>{changeLabel}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

// ============================================================================
// GRID COMPONENT
// ============================================================================

export interface StatsGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

/**
 * StatsGrid - Responsive grid for stats cards
 * 
 * @example
 * ```tsx
 * <StatsGrid columns={4}>
 *   <StatsCard title="Revenue" value="$45k" icon={DollarSign} />
 *   <StatsCard title="Users" value="1,234" icon={Users} />
 *   <StatsCard title="Orders" value="567" icon={ShoppingCart} />
 *   <StatsCard title="Growth" value="+23%" icon={TrendingUp} />
 * </StatsGrid>
 * ```
 */
export function StatsGrid({
  children,
  columns = 4,
  className,
}: StatsGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  }

  return (
    <div className={cn("grid gap-4 md:gap-6", columnClasses[columns], className)}>
      {children}
    </div>
  )
}
