"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// ============================================================================
// TYPES
// ============================================================================

export interface UserListItem {
  /** Unique identifier */
  id: string | number
  /** User name */
  name: string
  /** User role/title */
  role?: string
  /** Avatar URL */
  avatar?: string
  /** Fallback initials */
  fallback?: string
  /** Match score (0-100) */
  score?: number
  /** Skill badges */
  skills?: string[]
  /** Click handler */
  onClick?: () => void
}

export interface UserListProps {
  /** List title */
  title: string
  /** List description */
  description?: string
  /** User items */
  users: UserListItem[]
  /** Show score badge */
  showScore?: boolean
  /** Show progress bar for score */
  showProgress?: boolean
  /** Maximum skills to display */
  maxSkills?: number
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * UserList - User cards with avatar, info, badges, and match scores
 * 
 * @example
 * ```tsx
 * <UserList
 *   title="Top Candidates"
 *   description="Highest scoring candidates"
 *   users={[
 *     {
 *       id: 1,
 *       name: "Sarah Chen",
 *       role: "Frontend Developer",
 *       score: 95,
 *       skills: ["React", "TypeScript"],
 *     },
 *   ]}
 *   showScore
 *   showProgress
 * />
 * ```
 */
export function UserList({
  title,
  description,
  users,
  showScore = true,
  showProgress = false,
  maxSkills = 3,
  className,
}: UserListProps) {
  return (
    <Card className={cn("border-border shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border border-border",
                user.onClick && "cursor-pointer hover:bg-accent/50 transition-colors"
              )}
              onClick={user.onClick}
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-sm">
                  {user.fallback ||
                    user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium truncate">{user.name}</p>
                  {showScore && user.score !== undefined && (
                    <Badge variant="outline" className="border-primary text-primary flex-shrink-0">
                      {user.score}% match
                    </Badge>
                  )}
                </div>
                {user.role && <p className="text-sm text-muted-foreground">{user.role}</p>}
                {showProgress && user.score !== undefined && (
                  <Progress value={user.score} className="h-1.5 mt-1" />
                )}
                {user.skills && user.skills.length > 0 && (
                  <div className="flex gap-1 flex-wrap pt-1">
                    {user.skills.slice(0, maxSkills).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {user.skills.length > maxSkills && (
                      <Badge variant="secondary" className="text-xs">
                        +{user.skills.length - maxSkills}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
