"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// ============================================================================
// TYPES
// ============================================================================

export interface DataListItem {
  /** Unique identifier */
  id: string | number
  /** Primary text */
  title: string
  /** Secondary text */
  subtitle?: string
  /** Status badge */
  badge?: {
    label: string
    variant?: "default" | "secondary" | "destructive" | "outline"
    className?: string
  }
  /** Right-side content */
  meta?: React.ReactNode
  /** Click handler */
  onClick?: () => void
}

export interface DataListProps {
  /** List title */
  title: string
  /** List description */
  description?: string
  /** List items */
  items: DataListItem[]
  /** Custom item renderer */
  renderItem?: (item: DataListItem) => React.ReactNode
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * DataList - List items with badges, metadata, and actions
 * 
 * @example
 * ```tsx
 * <DataList
 *   title="Recent Orders"
 *   description="Latest orders and their status"
 *   items={[
 *     {
 *       id: 1,
 *       title: "Order #1234",
 *       subtitle: "Customer: John Doe",
 *       badge: { label: "Completed", variant: "default" },
 *       meta: "$120.00",
 *     },
 *   ]}
 * />
 * ```
 */
export function DataList({
  title,
  description,
  items,
  renderItem,
  className,
}: DataListProps) {
  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem ? (
                renderItem(item)
              ) : (
                <DefaultListItem item={item} />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function DefaultListItem({ item }: { item: DataListItem }) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border gap-3",
        item.onClick && "cursor-pointer hover:bg-accent/50 transition-colors"
      )}
      onClick={item.onClick}
    >
      <div className="space-y-1 min-w-0">
        <p className="font-medium truncate">{item.title}</p>
        {item.subtitle && (
          <p className="text-sm text-muted-foreground truncate">{item.subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {item.badge && (
          <Badge variant={item.badge.variant} className={item.badge.className}>
            {item.badge.label}
          </Badge>
        )}
        {item.meta && <span className="text-sm font-medium">{item.meta}</span>}
      </div>
    </div>
  )
}
