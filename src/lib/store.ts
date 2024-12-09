import { create } from "zustand";
import { Form } from "./types";

interface FormStore {
  forms: Form[];
  currentForm: Form | null;
  viewMode: "create" | "preview"; // New state
  tempForm: Form | null; // Temporary storage for unsaved form data

  addForm: (form: Form) => void;
  setCurrentForm: (form: Form | null) => void;
  updateForm: (form: Form) => void;
  setViewMode: (mode: "create" | "preview") => void;
  setTempForm: (form: Form | null) => void; // New method
}

export const useFormStore = create<FormStore>((set) => ({
  forms: [],
  currentForm: null,
  viewMode: "create",
  tempForm: null, // Initialize tempForm as null
  addForm: (form) => set((state) => ({ forms: [...state.forms, form] })),
  setCurrentForm: (form) => set({ currentForm: form }),
  updateForm: (updatedForm) =>
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === updatedForm.id ? updatedForm : form
      ),
    })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setTempForm: (form) => set({ tempForm: form }), // New method implementation
}));
