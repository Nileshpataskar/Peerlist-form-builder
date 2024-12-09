import React, { useState } from "react";
import { useFormStore } from "@/lib/store";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { AlignLeft, Link2, MoveLeft, Type } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

const FormPreview = () => {
  const { currentForm, setViewMode, tempForm } = useFormStore();
  const [responses, setResponses] = useState<Record<string, string>>({});

  if (!currentForm && !tempForm) return <p>No form found.</p>;

  const formToPreview = currentForm || tempForm;

  const calculateProgress = () => {
    const totalQuestions = formToPreview?.questions.length || 0;
    const answeredQuestions =
      formToPreview?.questions.filter((q) => responses[q.id]).length || 0;
    return totalQuestions ? (answeredQuestions / totalQuestions) * 100 : 0;
  };

  const handleInputChange = (id: string, value: string) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleBack = () => {
    setViewMode("create");
  };

  const progress = calculateProgress();

  return (
    <div className="w-full max-w-[700px] mx-auto border h-full flex flex-col justify-between p-5">
      <div className="space-y-4">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex flex-row gap-5">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <MoveLeft />
            </Button>
            <h1 className="text-lg /sm:text-2xl font-semibold">
              {formToPreview?.title || "Untitled Form"}
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="w-2/4 sm:w-80 flex flex-col items-end mt-2">
            <p className="hidden sm:block text-sm text-gray-500 mt-1">
              Form Completeness - {Math.round(progress)}%
            </p>
            <p className="sm:hidden text-sm text-gray-500 mt-1">
              Form Completed {Math.round(progress)}%
            </p>
            <Progress
              value={progress}
              max={100}
              className="h-2 mt-2 bg-gray-300"
            >
              <div
                className="h-2 bg-blue-500"
                style={{ width: `${progress}%` }}
              ></div>
            </Progress>
          </div>
        </div>

        {/* Form Questions */}
        {formToPreview?.questions.map((q) => (
          <Card key={q.id} className="space-y-2 p-4">
            <label className="block text-md font-medium">{q.title}</label>
            {q.description && (
              <label className="block text-sm text-gray-500">
                {q.description}
              </label>
            )}
            {q.type === "short" && (
              <div className="relative">
                <Input
                  value={responses[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="Enter your answer"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Type className="h-5 w-5" />
                </div>
              </div>
            )}
            {q.type === "date" && (
              <div className="relative">
                <Input
                  type="date"
                  value={responses[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder=""
                />
              </div>
            )}
            {q.type === "url" && (
              <div className="relative">
                <Input
                  value={responses[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="Add Url"
                  className="pr-8" // Add right padding to make space for the icon
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Link2 className="h-5 w-5" />
                </div>
              </div>
            )}
            {q.type === "long" && (
              <div className="relative">
                <Textarea
                  value={responses[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="Enter your answer"
                />

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <AlignLeft className="h-5 w-5" />
                </div>
              </div>
            )}
            {q.type === "single" && q.options && (
              <div className="space-y-2">
                {q.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${q.id}-${index}`}
                      name={q.id}
                      value={option}
                      checked={responses[q.id] === option}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor={`${q.id}-${index}`}
                      className="text-sm font-medium"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-end border-t-2 p-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert(JSON.stringify(responses, null, 2))}
          className="bg-[#00aa45] hover:bg-[#00aa45]/80 rounded-xl text-sm font-semibold text-white"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormPreview;
