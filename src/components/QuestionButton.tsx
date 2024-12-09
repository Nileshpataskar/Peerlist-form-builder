import React from "react";
import { motion } from "framer-motion";
import { CircleDot, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Question, QuestionType } from "@/lib/types";
import { Calendar, Long, Short, url } from "./QuestionCard";

const questionTypes: {
  type: QuestionType;
  label: string;
  icon: React.ComponentType;
}[] = [
  { type: "short", label: "Short Answer", icon: Short },
  { type: "long", label: "Long Answer", icon: Long },
  { type: "single", label: "Single Select", icon: CircleDot },
  { type: "date", label: "Date", icon: Calendar },
  { type: "url", label: "URL", icon: url },
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
        <motion.div
          key={q.type}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <DropdownMenuItem onClick={() => onSelect(q.type)}>
            <q.icon />
            {q.label}
          </DropdownMenuItem>
        </motion.div>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default QuestionButton;
