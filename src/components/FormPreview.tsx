import React, { useState } from "react";
import { useFormStore } from "@/lib/store";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";
import { Card } from "./ui/card";

const FormPreview = () => {
  const { currentForm, setViewMode, tempForm } = useFormStore();
  const [responses, setResponses] = useState<Record<string, string>>({});

  if (!currentForm && !tempForm) return <p>No form found.</p>;

  const formToPreview = currentForm || tempForm;

  const handleInputChange = (id: string, value: string) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleBack = () => {
    setViewMode("create");
  };

  return (
    <div className="w-[700px] border h-full flex flex-col justify-between p-5">
      <div className="space-y-4">
        <div className="flex flex-row gap-5">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <MoveLeft />
          </Button>
          <h1 className="text-2xl font-semibold">{formToPreview?.title}</h1>
        </div>
        {formToPreview?.questions.map((q) => (
          <Card key={q.id} className="space-y-2 p-4">
            <label className="block text-md font-medium">{q.title}</label>
            {q.description && (
              <label className="block text-sm text-gray-500">
                {q.description}
              </label>
            )}
            {q.type === "short" && (
              <Input
                value={responses[q.id] || ""}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                placeholder="Enter your answer"
              />
            )}
            {q.type === "long" && (
              <Textarea
                value={responses[q.id] || ""}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                placeholder="Enter your answer"
              />
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
      <div className="mt-4">
        <Button onClick={() => alert(JSON.stringify(responses, null, 2))}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormPreview;
