LENDSQR ADMIN DASHBOARD

A high-fidelity React admin dashboard built for the Lendsqr engineering assessment. This project demonstrates advanced proficiency in React, TypeScript, and SCSS, featuring a data-heavy interface with complex filtering, pagination, and dynamic routing.

🚀 Architectural Decisions
1. State Management & Data Flow
Persistent User Context: Implemented a custom data persistence strategy using localStorage for the User Details page. This ensures that the user experience is seamless across refreshes, maintaining state without redundant API calls.

Custom Filtering Engine: Built a decoupled filtering logic that handles multi-criteria searches (Organization, Status, Username, etc.) across the dataset of 500+ users.

2. Styling & UI/UX
BEM Methodology: Used Sass (SCSS) with a strict BEM (Block Element Modifier) naming convention to ensure styles are modular, scalable, and conflict-free.

Adaptive Pagination: Developed a "sliding window" pagination algorithm from scratch that keeps the current page centered, providing a smoother experience for large datasets.

Popup Logic: Implemented custom useRef and global event listeners for the Filter Form and Pagination Dropdowns to ensure precise "outside-click" closure behavior.

3. Routing & Testing
Dynamic Highlighting: Integrated useLocation with the Sidebar to ensure the "Users" category remains active even when deep-linked into nested /users/:id profiles.

Unit Testing: Implemented unit tests for the Authentication flow using Vitest and React Testing Library, covering both "Happy Path" navigation and validation error states.

🛠️ Tech Stack
i. Framework: React 18 (TypeScript)

ii. Routing: React Router v6

iii. Styling: SCSS (Sass), Lucide-React (Icons)

iv. Testing: Vitest, JSDOM

📋 Features
[1] Login Page: Responsive design with full input validation and password toggle.

[2] Users Table: Displaying 500 users with advanced filtering and custom pagination.

[3] User Details: Dynamic profile page with star ratings and persistent data state.

[4] Responsive Sidebar: Collapsible menu with smart active-link states.

💡 Note for Reviewers: For testing purposes, the authentication logic is mocked; any email and password combination will grant access to the dashboard.