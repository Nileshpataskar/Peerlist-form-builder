import React, { useEffect, useState } from "react";
import { useFormStore } from "@/lib/store";
import { Question } from "@/lib/types";
import QuestionButton from "@/components/QuestionButton";
import QuestionCard from "@/components/QuestionCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import {  ArrowUpRightIcon, Backpack } from "lucide-react";

const FormCreator = () => {
  const { setViewMode, addForm, setTempForm, tempForm } = useFormStore();

  const [title, setTitle] = useState(tempForm?.title || "Untitled Form");
  const [questions, setQuestions] = useState<Question[]>(
    tempForm?.questions || []
  );

  useEffect(() => {
    return () => {
      setTempForm({ id: "", title, questions, createdAt: new Date() });
    };
  }, [title, questions, setTempForm]);

  const handleAddQuestion = (type: string) => {
    if (questions.some((q) => !q.title)) {
      toast.error(
        "Please complete or delete empty questions before adding more.",
        {
          position: window.innerWidth < 768 ? "top-center" : "bottom-right",
        }
      );
      return;
    }

    setQuestions([
      ...questions,
      {
        id: crypto.randomUUID(),
        type: type as Question["type"],
        title: "",
        description: "",
        required: false,
        options: type === "single" ? ["", ""] : undefined,
      },
    ]);
  };

  const handleSave = () => {
    if (title === "") {
      toast.info("Please enter the form title.", {
        position: window.innerWidth < 768 ? "top-center" : "bottom-right",
      });
      return;
    }
    if (questions.length === 0) {
      toast.info("Please add at least one question.", {
        position: window.innerWidth < 768 ? "top-center" : "bottom-right",
      });
      return;
    }
    if (questions.some((q) => !q.title)) {
      toast.error("Please fill or delete questions with empty titles.", {
        position: window.innerWidth < 768 ? "top-center" : "bottom-right",
      });
      return;
    }

    const form = {
      id: crypto.randomUUID(),
      title,
      questions,
      createdAt: new Date(),
    };
    addForm(form);
    setTempForm(null);
    setViewMode("preview");
  };

  const handlePreview = () => {
    if (title === "") {
      toast.info("Please enter the form title.", {
        position: window.innerWidth < 768 ? "top-center" : "bottom-right",
      });
      return;
    }
    if (questions.length === 0) {
      toast.info("Please add at least one question.", {
        position: window.innerWidth < 768 ? "top-center" : "bottom-right",
      });
      return;
    }
    if (questions.some((q) => !q.title)) {
      toast.error("Please fill or delete questions with empty titles.", {
        position: window.innerWidth < 768 ? "top-center" : "bottom-right",
      });
      return;
    }

    setViewMode("preview");
  };

  return (
    <div className="w-[700px] h-full flex flex-col justify-between border">
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-5 border-b p-5">
          <Input
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Form Title"
            className="text-md placeholder:text-sm sm:text-2xl rounded-xl border-none"
          />
          <Button
            onClick={() => handlePreview()}
            size="sm"
            variant="outline"
            className="rounded-xl font-semibold"
          >
            Preview
            <ArrowUpRightIcon />
          </Button>
        </div>
        <ScrollArea style={{ height: "calc(100vh - 180px)" }}>
          {questions.map((q, index) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={index}
              questions={questions}
              onUpdate={(updatedQuestion) => {
                const updatedQuestions = questions.map((question, i) =>
                  i === index ? updatedQuestion : question
                );
                setQuestions(updatedQuestions);
              }}
              onDelete={(id) => {
                setQuestions(
                  questions.filter((question) => question.id !== id)
                );
              }}
              showError={q.title === ""}
            />
          ))}
          <div className="flex w-full justify-center">
            <QuestionButton onSelect={handleAddQuestion} />
          </div>
        </ScrollArea>
      </div>
      <div className="w-full flex justify-between p-5 border-t-2 ">
        <Button
          variant="outline"
          size="sm"
          disabled
          onClick={() => alert("Draft saved!")}
          className="rounded-xl "
        >
          Save Draft
          <Backpack />
        </Button>
        <Button
          onClick={handleSave}
          className="bg-[#00aa45] hover:bg-[#00aa45]/80 rounded-xl text-sm font-semibold"
          size="sm"
        >
          Publish Form
        </Button>
      </div>
    </div>
  );
};

export default FormCreator;
