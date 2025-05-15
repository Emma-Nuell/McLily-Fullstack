import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };


// const ExampleRadioGroup = () => {
//   const [value, setValue] = useState("option1");

//   return (
//     <form className="space-y-4">
//       <h3 className="text-lg font-semibold">Select an Option</h3>
//       <RadioGroup value={value} onValueChange={setValue} className="flex space-x-4">
//         <label className="flex items-center space-x-2">
//           <RadioGroupItem value="option1" />
//           <span>Option 1</span>
//         </label>
//         <label className="flex items-center space-x-2">
//           <RadioGroupItem value="option2" />
//           <span>Option 2</span>
//         </label>
//         <label className="flex items-center space-x-2">
//           <RadioGroupItem value="option3" />
//           <span>Option 3</span>
//         </label>
//       </RadioGroup>
//       <p className="text-sm text-gray-500">Selected: {value}</p>
//     </form>
//   );
// };