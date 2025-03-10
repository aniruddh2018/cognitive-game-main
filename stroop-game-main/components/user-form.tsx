"use client"; // If you’re using Next.js 13+ in the app directory and need client-side interactivity

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button as UIButton } from "@/components/ui/button"; // Renamed to avoid conflict

import { cn } from "@/lib/utils"; // Make sure this file actually exists

// 1. Define Button styles using CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium \
   ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 \
   focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 \
   [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 2. Define the Button’s props by combining HTML props & the variant props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // If true, lets us render another component (Slot) instead of a <button>
}

// 3. Implement the Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If `asChild` is true, use Radix Slot so we can pass `Button` props to any underlying element
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Merge cva classes + custom className
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

interface UserFormProps {
  onSubmit: (data: { name: string; age: number; education: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [education, setEducation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && education) {
      onSubmit({ name, age: Number(age), education });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
          required
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label htmlFor="education" className="block text-sm font-medium text-gray-700">
          Education
        </label>
        <Input
          id="education"
          type="text"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          required
          className="mt-1 block w-full"
        />
      </div>
      <UIButton type="submit" variant="default" size="default" className="w-full">
        Submit
      </UIButton>
    </form>
  );
};

export default UserForm;
