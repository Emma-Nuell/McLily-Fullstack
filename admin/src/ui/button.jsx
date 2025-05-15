import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils.js"; // Ensure you have this utility

const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-white hover:bg-gray-100",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  ghost: "hover:bg-gray-100",
  link: "text-blue-600 underline-offset-4 hover:underline",
};

const sizeVariants = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50",
        buttonVariants[variant],
        sizeVariants[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export {Button}

// function App() {
//   return (
//     <div className="flex gap-4 p-10">
//       <Button>Default</Button>
//       <Button variant="outline">Outline</Button>
//       <Button variant="destructive">Delete</Button>
//       <Button size="lg">Large Button</Button>
//       <Button size="icon">🔍</Button>
//     </div>
//   );
// }