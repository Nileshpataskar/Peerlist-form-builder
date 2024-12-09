
# Form Builder

This is a form builder application built using **Next.js** and **TailwindCSS**.

## Live Demo

You can view the live demo of the application at the following link:  
[Live Demo Link](https://peerlist-form-builder-liart.vercel.app/)

## Features

1. **Form Creation**:  
   - Users can start with an empty form creation step where they can select input types and add questions.
   - The app supports five question types:
     1. Short Answer
     2. Long Answer
     3. Single Select
     4. Number
     5. URL
  
2. **Form Preview**:  
   - After saving the form, a preview of the created form is shown with the ability to see how the form will appear when filled out.
  
3. **Form Completion Tracking**:  
   - As users fill out the form, the percentage of fields filled is tracked and displayed.

4. **Success Message on Form Submission**:  
   - A success message appears once the form is submitted.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/peerlist-frontend-assignment.git
```

Install the dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

## Assumptions

1. **Form Types**:  
   The application currently supports five question types, but additional types (e.g., Checkbox, Date, Rating) could be added in the future as needed.
   
2. **Form Persistence**:  
   At present, the form data is not saved persistently in a database. This is something that could be addressed in a future release with backend integration.

3. **Form Drafts**:  
   Forms are not saved as drafts currently. However, after adding backend functionality, the ability to save drafts will be implemented.

4. **Form Order Management**:  
   Moving the order of questions is not supported yet. In the future, a drag-and-drop functionality for reordering questions could be added.

5. **PDF Download**:  
   Currently, the form can be downloaded in a PDF format. In the future, an option to download a specific part of the form, like a summary, can be made available.

6. **Link Sharing**:  
   Upon submission, an option to copy a link to the form for easy sharing will be added.

## Future Scope

1. **Backend Integration**:  
   - After adding backend functionality, the app will allow users to save drafts of their forms and retrieve them later.
   - Users will be able to save their forms and come back to edit them.
   
2. **Moving Question Order**:  
   - The app will support a drag-and-drop feature to allow users to rearrange questions within a form, improving flexibility and usability.
   
3. **Selective PDF Download**:  
   - Users will be able to select and download specific parts of the form (e.g., summary, questions, or responses) in a PDF format.

4. **Copy Link After Submission**:  
   - After submitting the form, the app will generate a unique URL that users can copy and share with others for easier distribution and access to the form results.

