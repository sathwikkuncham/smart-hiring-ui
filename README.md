# Smart Hiring UI

A modern admin dashboard UI kit built with shadcn/ui. Includes layouts, data displays, charts, and navigation components for building professional dashboards.

## Features

- **Professional Theme** - Blue-teal color palette optimized for admin dashboards
- **Fully Responsive** - Works on desktop, tablet, and mobile
- **Accessible** - Built on Radix UI primitives with full keyboard navigation
- **Dark Mode** - Automatic dark mode support
- **Charts** - Line, bar, and pie charts powered by Recharts
- **Customizable** - Easy to extend and customize

## Quick Start

### 1. Initialize shadcn/ui (if not already done)

```bash
npx shadcn@latest init
```

### 2. Register the namespace

Add the `@smart-ui` registry to your project's `components.json`:

```json
{
  "registries": {
    "@smart-ui": "https://smart-ui.sathwik.life/r/{name}.json"
  }
}
```

### 3. Install all components

```bash
npx shadcn@latest add @smart-ui/shui-theme @smart-ui/shui-dashboard-layout @smart-ui/shui-sidebar @smart-ui/shui-header @smart-ui/shui-stats-card @smart-ui/shui-line-chart @smart-ui/shui-pie-chart @smart-ui/shui-bar-chart @smart-ui/shui-data-list @smart-ui/shui-user-list @smart-ui/shui-filter-bar @smart-ui/shui-data-table @smart-ui/shui-metric-card -y
```

This automatically installs all shadcn base dependencies (button, card, badge, avatar, etc.) and npm packages (recharts, lucide-react).

### Browse available components

```bash
npx shadcn@latest list @smart-ui
```

## Installation

### Using namespace (recommended)

After registering the namespace above, install components individually:

```bash
# Theme
npx shadcn@latest add @smart-ui/shui-theme

# Layout
npx shadcn@latest add @smart-ui/shui-dashboard-layout
npx shadcn@latest add @smart-ui/shui-sidebar
npx shadcn@latest add @smart-ui/shui-header

# Data Display
npx shadcn@latest add @smart-ui/shui-stats-card
npx shadcn@latest add @smart-ui/shui-data-list
npx shadcn@latest add @smart-ui/shui-user-list
npx shadcn@latest add @smart-ui/shui-data-table
npx shadcn@latest add @smart-ui/shui-metric-card
npx shadcn@latest add @smart-ui/shui-filter-bar

# Charts
npx shadcn@latest add @smart-ui/shui-line-chart
npx shadcn@latest add @smart-ui/shui-pie-chart
npx shadcn@latest add @smart-ui/shui-bar-chart
```

### Using direct URLs (no namespace setup needed)

You can also install directly via URL without configuring a namespace:

```bash
npx shadcn@latest add https://smart-ui.sathwik.life/r/shui-theme.json https://smart-ui.sathwik.life/r/shui-dashboard-layout.json https://smart-ui.sathwik.life/r/shui-sidebar.json https://smart-ui.sathwik.life/r/shui-header.json https://smart-ui.sathwik.life/r/shui-stats-card.json https://smart-ui.sathwik.life/r/shui-line-chart.json https://smart-ui.sathwik.life/r/shui-pie-chart.json https://smart-ui.sathwik.life/r/shui-bar-chart.json https://smart-ui.sathwik.life/r/shui-data-list.json https://smart-ui.sathwik.life/r/shui-user-list.json https://smart-ui.sathwik.life/r/shui-filter-bar.json https://smart-ui.sathwik.life/r/shui-data-table.json https://smart-ui.sathwik.life/r/shui-metric-card.json -y
```

### Manual installation

1. Copy the files from `registry/smart-hiring-ui/` to your project's components folder
2. Install dependencies:
```bash
npm install recharts lucide-react
```
3. Add required shadcn components:
```bash
npx shadcn@latest add button card badge avatar input select progress separator tooltip dropdown-menu sheet tabs collapsible
```

## Components

### DashboardLayout

The main layout wrapper with responsive sidebar.

```tsx
import { DashboardLayout, PageHeader, ContentGrid } from "@/components/smart-hiring-ui/dashboard-layout"
import { DashboardHeader } from "@/components/smart-hiring-ui/header"
import { DashboardSidebar, PerformanceCard, UserProfile } from "@/components/smart-hiring-ui/sidebar"

<DashboardLayout
  header={<DashboardHeader {...headerProps} />}
  sidebar={
    <DashboardSidebar
      groups={[
        {
          label: "Main",
          items: [
            { id: "overview", title: "Overview", icon: TrendingUp },
            { id: "jobs", title: "Jobs", icon: Briefcase, badge: "23" },
          ],
        },
      ]}
      topCard={
        <PerformanceCard
          title="This Week"
          subtitle="Performance"
          icon={TrendingUp}
          stats={[
            { label: "New Apps", value: "47" },
            { label: "Interviews", value: "12" },
          ]}
        />
      }
      footer={<UserProfile name="John Doe" role="Admin" />}
    />
  }
>
  <PageHeader
    title="Dashboard"
    description="Welcome back!"
    actions={<Button>New Item</Button>}
  />
  <ContentGrid columns={2}>
    {/* Your content */}
  </ContentGrid>
</DashboardLayout>
```

### StatsCard

Display metrics with icons and change indicators.

```tsx
import { StatsCard, StatsGrid } from "@/components/smart-hiring-ui/stats-card"

<StatsGrid columns={4}>
  <StatsCard
    title="Revenue"
    value="$45,231"
    change="+12%"
    changeLabel="from last month"
    icon={DollarSign}
    iconVariant="success"
  />
  <StatsCard
    title="Users"
    value="1,234"
    change="+5%"
    changeLabel="from last week"
    icon={Users}
    iconVariant="primary"
  />
</StatsGrid>
```

**Props:**
- `title` - Card title
- `value` - Main value to display
- `change` - Change indicator (e.g., "+12%", "-5%")
- `changeLabel` - Description of the change
- `icon` - Lucide icon component
- `iconVariant` - Color variant: "default" | "primary" | "secondary" | "success" | "warning" | "danger"

### LineChart

Multi-series line chart for trends.

```tsx
import { LineChart } from "@/components/smart-hiring-ui/line-chart"

<LineChart
  title="Revenue Trends"
  description="Monthly revenue over time"
  data={[
    { month: "Jan", revenue: 4000, profit: 2400 },
    { month: "Feb", revenue: 3000, profit: 1398 },
  ]}
  xAxisKey="month"
  series={[
    { key: "revenue", name: "Revenue" },
    { key: "profit", name: "Profit" },
  ]}
  height={300}
/>
```

### PieChart

Donut/pie chart with legend.

```tsx
import { PieChart } from "@/components/smart-hiring-ui/pie-chart"

<PieChart
  title="Sales by Category"
  description="Distribution of sales"
  data={[
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Food", value: 200 },
  ]}
  innerRadius={60}
  height={300}
/>
```

### BarChart

Vertical bar chart for comparisons.

```tsx
import { BarChart } from "@/components/smart-hiring-ui/bar-chart"

<BarChart
  title="Sales by Month"
  data={[
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
  ]}
  xAxisKey="month"
  dataKey="sales"
  height={300}
/>
```

### DataList

List items with badges and metadata.

```tsx
import { DataList } from "@/components/smart-hiring-ui/data-list"

<DataList
  title="Recent Orders"
  items={[
    {
      id: 1,
      title: "Order #1234",
      subtitle: "Customer: John Doe",
      badge: { label: "Completed", variant: "default" },
      meta: "$120.00",
    },
  ]}
/>
```

### UserList

User cards with avatars, scores, and skills.

```tsx
import { UserList } from "@/components/smart-hiring-ui/user-list"

<UserList
  title="Top Candidates"
  users={[
    {
      id: 1,
      name: "Sarah Chen",
      role: "Frontend Developer",
      score: 95,
      skills: ["React", "TypeScript"],
    },
  ]}
  showScore
  showProgress
/>
```

### FilterBar

Search, filters, and action buttons.

```tsx
import { FilterBar } from "@/components/smart-hiring-ui/filter-bar"

<FilterBar
  searchPlaceholder="Search jobs..."
  filters={[
    {
      placeholder: "Department",
      options: [
        { value: "engineering", label: "Engineering" },
        { value: "product", label: "Product" },
      ],
    },
  ]}
  primaryAction={{ label: "Create Job", icon: Plus, onClick: () => {} }}
  secondaryAction={{ label: "Import", icon: Upload, onClick: () => {} }}
/>
```

### DataTableRow

Table row with actions and status.

```tsx
import { DataTableRow } from "@/components/smart-hiring-ui/data-table-row"

<DataTableRow
  title="Senior Developer"
  subtitle="Engineering - Posted 2 days ago"
  meta={["45 applications", "12 interviews"]}
  badge={{ label: "Active", variant: "default" }}
  actions={[
    { label: "View", icon: Eye, onClick: () => {}, variant: "outline" },
    { label: "Edit", icon: Edit, onClick: () => {}, variant: "outline" },
  ]}
/>
```

### MetricCard

Simple metric with optional progress.

```tsx
import { MetricCard, ProgressList } from "@/components/smart-hiring-ui/metric-card"

<MetricCard
  title="AI Accuracy"
  description="Success rate"
  value="87%"
  subtitle="of recommendations are successful"
  showProgress
  progress={87}
/>

<ProgressList
  title="Source Effectiveness"
  items={[
    { label: "LinkedIn", value: 45, displayValue: "45%" },
    { label: "Indeed", value: 28, displayValue: "28%" },
  ]}
/>
```

## Theme Customization

### Colors

The theme uses CSS variables. Customize in your global CSS file:

```css
:root {
  --primary: 214 60% 46%;      /* Blue */
  --secondary: 168 76% 32%;    /* Teal */
  --chart-1: 214 60% 46%;
  --chart-2: 168 76% 32%;
  --chart-3: 263 70% 50%;
  --chart-4: 330 81% 60%;
  --chart-5: 32 95% 44%;
}
```

### Typography

Override font in your Tailwind config:

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

## Creating Custom Components

Use the existing components as templates:

```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface MyComponentProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function MyComponent({ title, children, className }: MyComponentProps) {
  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

Components automatically adapt to screen size.

## License

MIT License - free for personal and commercial use.
