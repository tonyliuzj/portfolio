import * as React from "react"

const classes = (...values) => values.filter(Boolean).join(" ")

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={classes("border text-card-foreground shadow", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }
