"use client"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// ============================================================================
// TYPES
// ============================================================================

export interface LineChartSeries {
  /** Data key in the data object */
  key: string
  /** Display name for the legend */
  name: string
  /** Line color (uses CSS variable if not provided) */
  color?: string
}

export interface LineChartProps {
  /** Chart title */
  title: string
  /** Chart description */
  description?: string
  /** Data array */
  data: Record<string, number | string>[]
  /** X-axis data key */
  xAxisKey: string
  /** Series to display */
  series: LineChartSeries[]
  /** Chart height */
  height?: number
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * LineChart - Responsive line chart with multiple data series
 * 
 * @example
 * ```tsx
 * <LineChart
 *   title="Revenue Trends"
 *   description="Monthly revenue over time"
 *   data={[
 *     { month: "Jan", revenue: 4000, profit: 2400 },
 *     { month: "Feb", revenue: 3000, profit: 1398 },
 *   ]}
 *   xAxisKey="month"
 *   series={[
 *     { key: "revenue", name: "Revenue" },
 *     { key: "profit", name: "Profit" },
 *   ]}
 *   height={300}
 * />
 * ```
 */
export function LineChart({
  title,
  description,
  data,
  xAxisKey,
  series,
  height = 300,
  className,
}: LineChartProps) {
  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
              <Legend />
              {series.map((s, index) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color || chartColors[index % chartColors.length]}
                  strokeWidth={2}
                  name={s.name}
                  dot={{ fill: s.color || chartColors[index % chartColors.length], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
