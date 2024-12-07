"use client";
import QuestionButton from "@/components/QuestionButton";
import QuestionCard from "@/components/QuestionCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { QuestionType, Question } from "@/lib/types";
import React, { useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type,
      title: "",
      required: false,
      options: type === "single" ? [""] : undefined,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionUpdate = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };
  return (
    <div className="container w-full flex justify-center py-10 ">
      <div className="p-6 mb-6 sm: w-[600px]">
        <div className="space-y-4">
          <Input placeholder="Form Title" className="text-2xl font-bold" />
          <Textarea
            placeholder="Form Description (optional)"
            className="resize-none"
          />
        </div>

        <Separator className="my-7" />

        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onUpdate={handleQuestionUpdate}
            onDelete={()=>{}}
          />
        ))}

        <QuestionButton onSelect={handleAddQuestion} />
      </div>
    </div>
  );
};

export default Page;
