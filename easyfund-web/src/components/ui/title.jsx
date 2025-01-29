import * as React from "react"
import { cn } from "../../lib/utils"

const Title = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
Title.displayName = "Title"

export { Title } 