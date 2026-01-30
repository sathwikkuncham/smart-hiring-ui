"use client"

import * as React from "react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// ============================================================================
// TYPES
// ============================================================================

export interface PieChartDataItem {
  /** Item name (shown in legend) */
  name: string
  /** Item value */
  value: number
  /** Optional custom color */
  color?: string
}

export interface PieChartProps {
  /** Chart title */
  title: string
  /** Chart description */
  description?: string
  /** Data array */
  data: PieChartDataItem[]
  /** Inner radius for donut chart (0 for pie chart) */
  innerRadius?: number
  /** Outer radius */
  outerRadius?: number
  /** Chart height */
  height?: number
  /** Show legend */
  showLegend?: boolean
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * PieChart - Donut or pie chart with legend and tooltips
 * 
 * @example
 * ```tsx
 * <PieChart
 *   title="Sales by Category"
 *   description="Distribution of sales across categories"
 *   data={[
 *     { name: "Electronics", value: 400 },
 *     { name: "Clothing", value: 300 },
 *     { name: "Food", value: 200 },
 *   ]}
 *   innerRadius={60}
 *   height={300}
 * />
 * ```
 */
export function PieChart({
  title,
  description,
  data,
  innerRadius = 0,
  outerRadius = 80,
  height = 300,
  showLegend = true,
  className,
}: PieChartProps) {
  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                formatter={(value: number, name: string) => {
                  const percentage = ((value / total) * 100).toFixed(1)
                  return [`${value} (${percentage}%)`, name]
                }}
              />
              {showLegend && <Legend />}
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
