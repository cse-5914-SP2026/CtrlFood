<<<<<<< HEAD
import * as React from "react"

import { cn } from "@/lib/utils"
=======
import * as React from "react";

import { cn } from "@/lib/utils";
>>>>>>> origin/main

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
<<<<<<< HEAD
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"
=======
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";
>>>>>>> origin/main

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
<<<<<<< HEAD
))
CardHeader.displayName = "CardHeader"
=======
));
CardHeader.displayName = "CardHeader";
>>>>>>> origin/main

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
<<<<<<< HEAD
))
CardTitle.displayName = "CardTitle"
=======
));
CardTitle.displayName = "CardTitle";
>>>>>>> origin/main

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
<<<<<<< HEAD
))
CardDescription.displayName = "CardDescription"
=======
));
CardDescription.displayName = "CardDescription";
>>>>>>> origin/main

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
<<<<<<< HEAD
))
CardContent.displayName = "CardContent"
=======
));
CardContent.displayName = "CardContent";
>>>>>>> origin/main

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
<<<<<<< HEAD
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
=======
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
>>>>>>> origin/main
