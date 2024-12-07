"use client";

import { QuestionType } from "@/lib/types";
import { AlignLeft, Hash, Link2, List, PlusCircle, Type } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "./ui/dropdown-menu";

// interface QuestionCardProps {
//   question: Question;
//   onUpdate: (question: Question) => void;
//   onDelete: (id: string) => void;
// }

interface QuestionButtonProps {
  onSelect: (type: QuestionType) => void;
}

const questionTypes = [
  { type: "short" as const, icon: Type, label: "Short Answer" },
  { type: "long" as const, icon: AlignLeft, label: "Long Answer" },
  { type: "single" as const, icon: List, label: "Single Select" },
  { type: "number" as const, icon: Hash, label: "Number" },
  { type: "url" as const, icon: Link2, label: "URL" },
];

const QuestionButton = ({ onSelect }: QuestionButtonProps) => {
  //   const [option, setOption] = useState([]);
  return (
    <div className="relative group">
      <div className="w-full flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="" asChild>
            <Button variant="outline" className="rounded-xl">
              <PlusCircle />
              Add Question
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-white shadow-lg p-3">
            {questionTypes.map(({ type, icon: Icon, label }) => (
              <DropdownMenuItem
                key={type}
                onClick={() => onSelect(type)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Icon className="h-4 w-4" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default QuestionButton;
