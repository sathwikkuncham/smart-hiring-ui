"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

// ============================================================================
// TYPES
// ============================================================================

export interface DashboardLayoutProps {
  /** Header component */
  header: React.ReactNode
  /** Sidebar component (will be wrapped in Sheet on mobile) */
  sidebar: React.ReactNode
  /** Main content */
  children: React.ReactNode
  /** Mobile menu trigger */
  mobileMenuTrigger?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * DashboardLayout - Full dashboard layout with responsive sidebar
 * 
 * @example
 * ```tsx
 * <DashboardLayout
 *   header={<DashboardHeader {...headerProps} />}
 *   sidebar={<DashboardSidebar {...sidebarProps} />}
 *   mobileMenuTrigger={<Menu className="h-5 w-5" />}
 * >
 *   <DashboardContent />
 * </DashboardLayout>
 * ```
 */
export function DashboardLayout({
  header,
  sidebar,
  children,
  mobileMenuTrigger,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header */}
      {header}

      {/* Main Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 border-r border-border bg-card min-h-[calc(100vh-5rem)] sticky top-20">
          {sidebar}
        </aside>

        {/* Mobile Sidebar (Sheet) */}
        {mobileMenuTrigger && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg"
              >
                {mobileMenuTrigger}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              {sidebar}
            </SheetContent>
          </Sheet>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

// ============================================================================
// CONTENT GRID
// ============================================================================

export interface ContentGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

/**
 * ContentGrid - Responsive grid for dashboard content
 * 
 * @example
 * ```tsx
 * <ContentGrid columns={2}>
 *   <LineChart {...chartProps} />
 *   <PieChart {...pieProps} />
 * </ContentGrid>
 * ```
 */
export function ContentGrid({
  children,
  columns = 2,
  className,
}: ContentGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 xl:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-4 md:gap-6", columnClasses[columns], className)}>
      {children}
    </div>
  )
}

// ============================================================================
// PAGE HEADER
// ============================================================================

export interface PageHeaderProps {
  /** Page title */
  title: string
  /** Page description */
  description?: string
  /** Action buttons */
  actions?: React.ReactNode
  className?: string
}

/**
 * PageHeader - Consistent page header with title and actions
 * 
 * @example
 * ```tsx
 * <PageHeader
 *   title="Dashboard Overview"
 *   description="Welcome back!"
 *   actions={
 *     <>
 *       <Button>New Item</Button>
 *       <Button variant="outline">Import</Button>
 *     </>
 *   }
 * />
 * ```
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className
      )}
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm md:text-base mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-col sm:flex-row gap-2">{actions}</div>}
    </div>
  )
}
