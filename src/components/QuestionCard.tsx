import { Question } from "@/lib/types";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Grip, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface QuestionCardProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: (id: string) => void;
}

const QuestionCard = ({ question, onDelete, onUpdate }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>(question.options || []);

  console.log("Question data", question);
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
  return (
    <div>
      <Card className="relative group">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move opacity-40 hover:opacity-100">
          <Grip className="h-4 w-4" />
        </div>
        <CardHeader className="space-y-2 pb-4">
          <div className="flex items-center gap-4">
            <Input
              value={question.title}
              onChange={(e) => onUpdate({ ...question, title: e.target.value })}
              placeholder="Question title"
              className="text-lg font-semibold"
            />
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={(checked) =>
                onUpdate({ ...question, required: checked })
              }
            />
            <Label htmlFor={`required-${question.id}`}>Required</Label>
          </div>
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
          {question.type === "number" && (
            <Input type="number" disabled placeholder="Number input" />
          )}
          {question.type === "url" && (
            <Input type="url" disabled placeholder="URL input" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;
