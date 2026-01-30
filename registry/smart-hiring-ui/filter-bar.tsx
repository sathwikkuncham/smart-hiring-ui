"use client"

import { Search, Filter } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ============================================================================
// TYPES
// ============================================================================

export interface FilterOption {
  /** Option value */
  value: string
  /** Option label */
  label: string
}

export interface FilterGroup {
  /** Filter placeholder */
  placeholder: string
  /** Filter options */
  options: FilterOption[]
  /** Current value */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
}

export interface FilterBarProps {
  /** Search placeholder */
  searchPlaceholder?: string
  /** Search value */
  searchValue?: string
  /** Search change handler */
  onSearchChange?: (value: string) => void
  /** Filter groups */
  filters?: FilterGroup[]
  /** Primary action button */
  primaryAction?: {
    label: string
    icon?: LucideIcon
    onClick: () => void
  }
  /** Secondary action button */
  secondaryAction?: {
    label: string
    icon?: LucideIcon
    onClick: () => void
  }
  /** Show more filters button */
  showMoreFilters?: boolean
  /** More filters click handler */
  onMoreFiltersClick?: () => void
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * FilterBar - Search, filters, and action buttons for data tables
 * 
 * @example
 * ```tsx
 * <FilterBar
 *   searchPlaceholder="Search jobs..."
 *   filters={[
 *     {
 *       placeholder: "Department",
 *       options: [
 *         { value: "engineering", label: "Engineering" },
 *         { value: "product", label: "Product" },
 *       ],
 *     },
 *   ]}
 *   primaryAction={{ label: "Create Job", icon: Plus, onClick: () => {} }}
 *   secondaryAction={{ label: "Import", icon: Upload, onClick: () => {} }}
 * />
 * ```
 */
export function FilterBar({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filters = [],
  primaryAction,
  secondaryAction,
  showMoreFilters = false,
  onMoreFiltersClick,
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-4", className)}>
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2">
          {filters.map((filter, index) => (
            <Select
              key={index}
              value={filter.value}
              onValueChange={filter.onChange}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          {showMoreFilters && (
            <Button variant="outline" onClick={onMoreFiltersClick}>
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          )}
        </div>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-2">
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.icon && <secondaryAction.icon className="h-4 w-4 mr-2" />}
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>
              {primaryAction.icon && <primaryAction.icon className="h-4 w-4 mr-2" />}
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
