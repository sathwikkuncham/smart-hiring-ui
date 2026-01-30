"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// ============================================================================
// TYPES
// ============================================================================

export interface MetricCardProps {
  /** Card title */
  title: string
  /** Card description */
  description?: string
  /** Main value */
  value: string | number
  /** Subtitle text */
  subtitle?: string
  /** Show progress bar */
  showProgress?: boolean
  /** Progress value (0-100) */
  progress?: number
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * MetricCard - Simple metric display with optional progress
 * 
 * @example
 * ```tsx
 * <MetricCard
 *   title="AI Accuracy"
 *   description="Success rate of recommendations"
 *   value="87%"
 *   subtitle="of matched candidates proceed to final rounds"
 *   showProgress
 *   progress={87}
 * />
 * ```
 */
export function MetricCard({
  title,
  description,
  value,
  subtitle,
  showProgress = false,
  progress = 0,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{value}</div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {showProgress && (
            <Progress value={progress} className="mt-4 h-2" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// PROGRESS LIST COMPONENT
// ============================================================================

export interface ProgressListItem {
  /** Item label */
  label: string
  /** Progress value (0-100) */
  value: number
  /** Optional display value */
  displayValue?: string
}

export interface ProgressListProps {
  /** List title */
  title: string
  /** List description */
  description?: string
  /** Progress items */
  items: ProgressListItem[]
  /** Additional CSS classes */
  className?: string
}

/**
 * ProgressList - List of labeled progress bars
 * 
 * @example
 * ```tsx
 * <ProgressList
 *   title="Source Effectiveness"
 *   description="Best performing channels"
 *   items={[
 *     { label: "LinkedIn", value: 45, displayValue: "45%" },
 *     { label: "Indeed", value: 28, displayValue: "28%" },
 *   ]}
 * />
 * ```
 */
export function ProgressList({
  title,
  description,
  items,
  className,
}: ProgressListProps) {
  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{item.label}</span>
                <span className="text-sm font-medium">
                  {item.displayValue || `${item.value}%`}
                </span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
