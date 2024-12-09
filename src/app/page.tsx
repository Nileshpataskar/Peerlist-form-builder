"use client";

import React from "react";
import { useFormStore } from "@/lib/store"; // Zustand store
import FormCreator from "@/components/FormCreator";
import FormPreview from "@/components/FormPreview";

const Page = () => {
  const { viewMode } = useFormStore(); // Zustand state: viewMode

  return (
    <div className="container mx-auto  w-full h-screen  flex justify-center ">
      {viewMode === "create" ? <FormCreator /> : <FormPreview />}
    </div>
  );
};

export default Page;
