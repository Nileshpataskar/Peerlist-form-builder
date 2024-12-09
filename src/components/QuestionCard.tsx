import React, { useState } from "react";
import { Question } from "@/lib/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Trash2, ChevronDown, Plus, CircleDot, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Type, AlignLeft, Link2 } from "lucide-react"; // Assuming these icons match your types

const questionTypes = [
  { type: "short", label: "Short Answer", icon: Type },
  { type: "long", label: "Long Answer", icon: AlignLeft },
  { type: "single", label: "Single Select", icon: CircleDot },
  { type: "date", label: "Date", icon: Calendar },
  { type: "url", label: "URL", icon: Link2 },
];

interface QuestionCardProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: (id: string) => void;
  showError: boolean;
  index: number;
  questions: Question[];
}

const QuestionCard = ({
  question,
  onDelete,
  onUpdate,
  showError,
  index,
  questions,
}: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>(question.options || []);
  const [selectedType, setSelectedType] = useState(() =>
    questionTypes.find((q) => q.type === question.type)
  );

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
    const selected = questionTypes.find((q) => q.type === newType);
    if (selected) {
      setSelectedType(selected);
      const updatedQuestion = {
        ...question,
        type: newType as Question["type"],
        options: newType === "single" ? ["", ""] : undefined,
      };
      setOptions(updatedQuestion.options || []);
      onUpdate(updatedQuestion);
    }
  };

  return (
    <div className="m-5">
      <Card
        className={`relative group rounded-s-3xl ${
          showError && !question.title && index < questions.length - 1
            ? "border-red-500"
            : ""
        }`}
      >
        <CardHeader className="space-y-2 pb-4">
          <div className="flex items-center gap-2">
            <Input
              value={question.title}
              onChange={(e) => onUpdate({ ...question, title: e.target.value })}
              placeholder="Write a Question"
              className={`text-md font-bold ${
                showError && !question.title && index < questions.length - 1
                  ? "border border-red-500"
                  : "border-none"
              }`}
            />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-2 cursor-pointer">
                  {selectedType?.icon && (
                    <selectedType.icon className="h-4 w-4" />
                  )}
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="border border-gray-300 rounded-md shadow-lg p-2 bg-white text-sm cursor-default mt-1">
                
                {questionTypes.map(({ type, label, icon: Icon }) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all ease-in-out duration-200"
                  >
                    <Icon className="h-4 w-4 text-gray-600" />
                    <span>{label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={question.description || ""}
            onChange={(e) =>
              onUpdate({ ...question, description: e.target.value })
            }
            placeholder="Question description (optional)"
            className="text-sm border-none"
          
          />
        </CardHeader>
        <CardContent>
          {question.type === "short" && (
            <Input disabled placeholder="Short answer text " />
          )}
          {question.type === "long" && (
            <Textarea disabled placeholder="Long answer text" />
          )}

          {question.type === "single" && (
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    disabled
                    id={`option-${index}`}
                    name={`question-${question.id}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="h-4 w-4"
                  />
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-grow"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOptionAdd}
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {question.type === "date" && (
            <Input type="date" disabled placeholder="Date input" />
          )}

          {question.type === "url" && (
            <Input
              type="url"
              disabled
              // value={question.url || ""}
              placeholder="Enter a URL"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;
