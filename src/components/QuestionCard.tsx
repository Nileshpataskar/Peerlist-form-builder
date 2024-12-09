import React, { useState } from "react";
import { Question } from "@/lib/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Trash2, ChevronDown, Plus, CircleDot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
export const Short = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M4 9L20 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 15L14 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Long = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M4 5L14 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 12L20 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 19L20 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Calendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M18 2V4M6 2V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 8H20.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 8H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const url = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M9.5 14.5L14.5 9.49995"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16.8463 14.6095L19.4558 12C21.5147 9.94108 21.5147 6.60298 19.4558 4.54411C17.397 2.48524 14.0589 2.48524 12 4.54411L9.39045 7.15366M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.3969 2.48528 14.0588 4.54416 12L7.1537 9.39041"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const questionTypes = [
  { type: "short", label: "Short Answer", icon: Short },
  { type: "long", label: "Long Answer", icon: Long },
  { type: "single", label: "Single Select", icon: CircleDot },
  { type: "date", label: "Date", icon: Calendar },
  { type: "url", label: "URL", icon: url },
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
    if (options.some((opt) => opt.trim() === "")) {
      alert("Please fill in all options before adding a new one.");
      return;
    }
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

  const isAddDisabled = options.some((opt) => opt.trim() === "");

  return (
    <div className="m-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          ...(showError && !question.title && index < questions.length - 1
            ? { border: "1px solid #f87171" }
            : {}), // red border
        }}
      >
        <Card>
          <CardHeader className="space-y-2 pb-4">
            <div className="flex items-center gap-2">
              <Input
                value={question.title}
                onChange={(e) =>
                  onUpdate({ ...question, title: e.target.value })
                }
                placeholder="Write a Question"
                className={`text-md font-bold ${
                  showError && !question.title && index < questions.length - 1
                    ? "border border-red-500"
                    : "border-none"
                }`}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ stiffness: 300 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2",
                      cursor: "pointer",
                    }}
                  >
                    {selectedType?.icon && (
                      <selectedType.icon className="h-4 w-4" />
                    )}
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="border border-gray-300 rounded-md p-2 bg-white text-sm font-light cursor-default mt-1">
                  {questionTypes.map(({ type, label, icon: Icon }) => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all ease-in-out duration-200"
                    >
                      <Icon className="h-4 w-4 text-gray-600" />
                      {label}
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
                      className="h-4 w-4"
                    />
                    <Input
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
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
                    disabled={isAddDisabled}
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
              <Input type="url" disabled placeholder="Enter a URL" />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuestionCard;
