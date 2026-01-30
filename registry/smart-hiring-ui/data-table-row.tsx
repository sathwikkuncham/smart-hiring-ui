"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ============================================================================
// TYPES
// ============================================================================

export interface DataTableRowAction {
  /** Action label */
  label: string
  /** Action icon */
  icon?: LucideIcon
  /** Click handler */
  onClick: () => void
  /** Button variant */
  variant?: "default" | "outline" | "ghost"
}

export interface DataTableRowProps {
  /** Primary title */
  title: string
  /** Secondary text */
  subtitle?: string
  /** Additional metadata lines */
  meta?: string[]
  /** Status badge */
  badge?: {
    label: string
    variant?: BadgeProps["variant"]
  }
  /** Row actions */
  actions?: DataTableRowAction[]
  /** Click handler for the row */
  onClick?: () => void
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * DataTableRow - Table row component with actions and status badges
 * 
 * @example
 * ```tsx
 * <DataTableRow
 *   title="Senior Developer"
 *   subtitle="Engineering • Posted 2 days ago"
 *   meta={["45 applications", "12 interviews"]]}
 *   badge={{ label: "Active", variant: "default" }}
 *   actions={[
 *     { label: "View", icon: Eye, onClick: () => {}, variant: "outline" },
 *     { label: "Edit", icon: Edit, onClick: () => {}, variant: "outline" },
 *   ]}
 * />
 * ```
 */
export function DataTableRow({
  title,
  subtitle,
  meta,
  badge,
  actions,
  onClick,
  className,
}: DataTableRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border border-border gap-4",
        (onClick || actions) && "hover:bg-accent/50 transition-colors",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* Content */}
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium truncate">{title}</h3>
          {badge && (
            <Badge variant={badge.variant}>{badge.label}</Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {meta && meta.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {meta.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>•</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant={action.variant || "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick()
                }}
              >
                {Icon && <Icon className="h-4 w-4 mr-2" />}
                {action.label}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}
