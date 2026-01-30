"use client"

import * as React from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// ============================================================================
// TYPES
// ============================================================================

export interface BarChartProps {
  /** Chart title */
  title: string
  /** Chart description */
  description?: string
  /** Data array */
  data: Record<string, number | string>[]
  /** X-axis data key */
  xAxisKey: string
  /** Bar data key */
  dataKey: string
  /** Bar color (uses CSS variable if not provided) */
  color?: string
  /** Chart height */
  height?: number
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * BarChart - Vertical bar chart for comparisons
 * 
 * @example
 * ```tsx
 * <BarChart
 *   title="Sales by Month"
 *   description="Monthly sales comparison"
 *   data={[
 *     { month: "Jan", sales: 4000 },
 *     { month: "Feb", sales: 3000 },
 *     { month: "Mar", sales: 5000 },
 *   ]}
 *   xAxisKey="month"
 *   dataKey="sales"
 *   height={300}
 * />
 * ```
 */
export function BarChart({
  title,
  description,
  data,
  xAxisKey,
  dataKey,
  color,
  height = 300,
  className,
}: BarChartProps) {
  const barColor = color || "hsl(var(--chart-1))"

  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey={xAxisKey}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
