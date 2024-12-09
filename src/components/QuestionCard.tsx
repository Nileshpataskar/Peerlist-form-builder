import React, { useState } from "react";
import { Question } from "@/lib/types"; // Assuming you have a Question type
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Trash2, GripVertical, Tornado } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface QuestionCardProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: (id: string) => void;
  showError: boolean;
}

const QuestionCard = ({
  question,
  onDelete,
  onUpdate,
  showError,
}: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>(question.options || []);

  const handleOptionAdd = () => {
    const newOption = [...options, ""];
    setOptions(newOption);
    onUpdate({ ...question, options: newOption });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = options.map((opt, i) => (i === index ? value : opt));
    setOptions(newOptions);
    onUpdate({ ...question, options: newOptions });
  };

  const handleTypeChange = (newType: string) => {
    const updatedQuestion = {
      ...question,
      type: newType as Question["type"],
      options: newType === "single" ? ["Option 1", "Option 2"] : undefined, // Reset options if necessary
    };
    setOptions(updatedQuestion.options || []); // Update local options state if type is 'single'
    onUpdate(updatedQuestion);
  };

  return (
    <div className="m-5">
      <Card
        className={`relative group ${showError && !question.title ? "" : ""}`}
      >
        <CardHeader className="space-y-2 pb-4">
          <div className="flex items-center gap-2">
            <Input
              value={question.title}
              onChange={(e) => onUpdate({ ...question, title: e.target.value })}
              placeholder="Question title"
              className={`text-lg font-semibold ${
                showError && !question.title ? "border-red-500" : ""
              }`}
            />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Tornado className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="border rounded-md p-2 bg-white text-sm">
                <DropdownMenuItem onClick={() => handleTypeChange("short")}>
                  Short
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTypeChange("long")}>
                  Long
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTypeChange("single")}>
                  Single Choice
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTypeChange("date")}>
                  Date
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="cursor-move">
              <GripVertical className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={question.description || ""}
            onChange={(e) =>
              onUpdate({ ...question, description: e.target.value })
            }
            placeholder="Question description (optional)"
            className="text-sm"
          />
        </CardHeader>
        <CardContent>
          {question.type === "short" && (
            <Input disabled placeholder="Short answer text" />
          )}
          {question.type === "long" && (
            <Textarea disabled placeholder="Long answer text" />
          )}
          {question.type === "single" && (
            <div className="space-y-2">
              {options.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleOptionAdd}
              >
                Add Option
              </Button>
            </div>
          )}
          {question.type === "date" && (
            <Input type="date" disabled placeholder="Date input" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;
