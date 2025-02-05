Deployed Link- counter-rich-text-editor-pai-chart-d7jdg1shy.vercel.app

# Counter, Rich Text Editor, and Pie Chart App

This project is a React-based web application that combines multiple features, including a **counter**, a **rich text editor**, and a **pie chart** for data visualization. It leverages various technologies to create a smooth, interactive experience. The project is designed for users to perform basic operations like counting, editing rich text content, and viewing visual data in a pie chart format, all with persistent storage via local storage.

## Features

- **Counter**: A simple counter that allows users to increase or decrease a number. The count persists between page reloads using localStorage.
  
- **Rich Text Editor**: A fully functional rich text editor powered by `React-Quill`, allowing users to input, save, and view formatted content. The editor supports bold, italic, underline, lists, and more.

- **Pie Chart**: Displays a pie chart based on user data. Users can interact with it and clear the data stored in localStorage. It uses `Chart.js` to render the chart.

- **Persistent Data**: All saved content (counter values, rich text, pie chart data) is stored locally using `localStorage`, ensuring data is retained across sessions.

## Tech Stack

- **Frontend**:
  - **React**: JavaScript library for building the user interface.
  - **TypeScript**: Adds static typing to JavaScript for better code quality and maintainability.
  - **React-Quill**: A popular React component for the Quill rich text editor.
  - **Chart.js**: A powerful charting library for creating interactive visualizations, used here to render the pie chart.
  - **Tailwind CSS**: A utility-first CSS framework used for responsive design and styling.
  
- **Backend** (if applicable for future enhancements):
  - **Node.js**: JavaScript runtime for server-side development.
  - **Express**: Web framework for building RESTful APIs.

- **Tools**:
  - **Git**: Version control system used to manage project code.
  - **GitHub**: Cloud repository for hosting and sharing the project code.

Counter
Increase/Decrease Buttons: Click the Increase button to increment the counter or the Decrease button to decrement it.
Persistent Storage: The current counter value is saved to localStorage, so it will persist even after a page reload.
Rich Text Editor
Text Input: Type and format your content using the rich text editor powered by React-Quill. You can apply formatting like bold, italic, underline, etc., directly through the toolbar options.
Save Button: Click the Save button to store the current content in the saved list.
Delete Button: For each saved content, a Delete button is available. Click it to remove that content from the saved list.
Pie Chart
Clear Data Button: Use the Clear Data button at the bottom to clear the current pie chart data from the chart and local storage.
Data Input: The chart dynamically updates based on the data you pass into the app, displaying a distribution of values in a pie format.

