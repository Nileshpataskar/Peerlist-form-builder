import React from "react";

import {
  AlignLeft,
  CircleDot,
  Hash,
  Link2,
  PlusCircle,
  Type,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Question, QuestionType } from "@/lib/types";

const questionTypes: {
  type: QuestionType;
  label: string;
  icon: React.ComponentType;
}[] = [
  { type: "short", label: "Short Answer", icon: Type },
  { type: "long", label: "Long Answer", icon: AlignLeft },
  { type: "single", label: "Single Select", icon: CircleDot },
  { type: "date", label: "Date", icon: Hash },
  { type: "url", label: "URL", icon: Link2 },
];

const QuestionButton = ({
  onSelect,
}: {
  onSelect: (type: Question["type"]) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="mt-2 rounded-xl text-slate-700" asChild>
      <Button size="sm" variant="outline">
        <PlusCircle /> Add Question
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {questionTypes.map((q) => (
        <DropdownMenuItem key={q.type} onClick={() => onSelect(q.type)}>
          <q.icon />
          {q.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default QuestionButton;
