"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-auto",
      "[&::-webkit-scrollbar]:w-2",
      "[&::-webkit-scrollbar-track]:bg-white/5",
      "[&::-webkit-scrollbar-track]:rounded-full",
      "[&::-webkit-scrollbar-thumb]:bg-gradient-to-b",
      "[&::-webkit-scrollbar-thumb]:from-purple-500",
      "[&::-webkit-scrollbar-thumb]:to-blue-500",
      "[&::-webkit-scrollbar-thumb]:rounded-full",
      "[&::-webkit-scrollbar-thumb:hover]:from-purple-400",
      "[&::-webkit-scrollbar-thumb:hover]:to-blue-400",
      className
    )}
    style={{
      scrollbarWidth: 'thin',
      scrollbarColor: '#8b5cf6 rgba(255, 255, 255, 0.05)',
    }}
    {...props}
  >
    {children}
  </div>
))
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
