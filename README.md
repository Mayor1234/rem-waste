# REM Waste Test Project

## Overview

This test project is a solution that demonstrates proficiency in building a scalable, maintainable, efficient, and modern responsive application. The solution follows best practices in software development, including simplicity, modular design, data caching and optimized database queries.

## Tech Stack

- **Language:** Javascript
- **Framework:** React.js (TypeScript)
- **Styling:** TailwindCSS
- **Animation:** Framer Motion
- **State Management:** Redux Toolkit
- **API Communication:** RESTful APIs with `fetchBaseQuery`

### Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- npm (Node Package Manager)

### Installation

```sh
# Clone the repository
git clone https://git@github.com:Mayor1234/rem-waste.git
cd rem-waste

# Install dependencies
Install the project dependencies using npm:
npm install

# Start the server
npm run dev
```

## Detailed Approach to Redesigning Select Skip Web Page

This guide covers a structured approach to redesigning a webpage that fetches data from a database using fetchBaseQuery (Redux Toolkit Query), rendering items in cards, handling user interactions, managing state with Redux, and adding scroll-based animations.

### **Step 1: Set Up React Vite With Dependencies**

Vite is an opinionated build tool that aims to provide a faster and leaner development experience for modern web projects.

#### Install Dependencies

- npm create vite@latest Rem-waste -- --template React-ts
- npm install tailwindcss @tailwindcss
- npm install @reduxjs/toolkit react-redux framer-motion
- npm install lucide-react

### **Step 2: Set Up Redux Toolkit with fetchBaseQuery**

Redux Toolkit Query (fetchBaseQuery) is a lightweight wrapper over fetch that simplifies API calls.
RTK Query automatically caches responses to avoid unnecessary API calls.
Uses re-fetching strategies to keep data fresh.

- Configure API Slice for Api request

  - Create a file in src folder: redux/features/skip/skipAPi.ts

- Create Redux Slice for Selected Item

  - Since we need to track the selected skip, we use Redux state management.

  - Create a file in src folder: redux/features/skip/skipSlice.ts

- Create types for static types

  - Create a file in src folder: redux/features/skip/types.d.ts

- Configure Redux Store

  - Create a file in src folder: Redux/app/store.ts

- Wrap app in Provider inside main.tsx and pass the imported store as props

### **Step 3: Aproach For Skip Component**

The Skip component is the parent component that makes the Api call to fetch data from the backend server.

### ** Objective**

- Create a file in src folder: pages/skip.tsx
- Fetch Data using **Redux toolkit** hook useGetSkipQuery({
  postcode: 'NR32',
  area: 'Lowestoft',
  })
- Pass the fetched data as props to child component **SkipCard**
- Display the cards and animate them on scroll.

### ** Steps To Implement Selected Skip**

- Check if a card is selected, if true, check the **id** of the selected card if its equal to the **id** of the oject that was passed as props to the SkipCard component.
- Track the selected card by adding saving the selected card object in skipData, using Redux createSlice method which accepts an object of **name**, **initial state** and **reducers**.
- When a card is selected, the selected skip flag is set to true and a smoothly animated modal is pop up to display the properties of the selected card and total cost which is the summation of **Vat** and **price_before_vat**.
- Check if **transport_cost**, **per_tonne_cost**, and area are not equal to null or undefined
- Check if **allowed_on_road** is equal to false and change the text color to yellow add a warning sign
- check if **allows_heavy_waste** is equal to false and change the text color to red add a warning sign
- If **allowed_on_road** and **allows_heavy_waste** are equal to false, the card is automatically disabled for selection by adding background color of gray and opacity of 50% and disable clicking event on the card.

---

### **4. Approach For Breadcrumb Component**

### ** Objective**

The breadcrumb visually represents a **step-by-step navigation process**. Each step should:

- Display an **icon** and **label**.
- **Change color** based on completion.
- Include an **animated connecting line**.
- Be **reusable** and **dynamic**.

### ** Steps to Implement Breadcrumb**

#### **Define the Steps & Icons**

- Create an array of steps, each containing:
  - A **label** (e.g., "Postcode", "Waste Type").
  - An **icon** (from `lucide-react`).
  - A **completion status** (true/false).

#### **Build the UI with TailwindCSS**

- Arrange steps using `flex` for horizontal layout.
- Style active steps using `text-blue-500` and inactive steps with `text-gray-500`.

#### **Add Animation with Framer Motion**

- Fade-in each step using `motion.div` with a delay.
- Animate the connecting line using width transitions.
- Add small **pulsing dots** at the start and end of each line.

#### **Make it Reusable**

- Store steps in an array so the component can handle **any number of steps dynamically**.

## **5. Approach For Modal Component**

### ** Objective**

The modal should:

- Open and close **smoothly with a fade-in/fade-out animation**.
- Prevent the background page from **scrolling** when active.
- Close when clicking **outside** the modal.

### ** Steps to Implementation**

#### **Create a `Modal.tsx` Component**

- Use `createPortal` from **react-dom**
- A React Portal is a feature in React that allows you to render a component outside the normal DOM hierarchy while keeping it logically inside the React component tree.
- Accept `isOpen`, `onClose`, and `children` as props.
- Use `AnimatePresence` from **Framer Motion** to handle **entry/exit animations**.

#### **Apply TailwindCSS Styles**

- Position the modal in the center using `fixed inset-0 flex items-center justify-center`.
- Use `bg-neutral-900/20 backdrop-blur-xs` for a **semi-transparent blur backdrop**.
- Add **rounded corners (`rounded-2xl`)** and **box-shadow (`shadow-xl`)** for a smooth UI.

#### **Prevent Background Scrolling**

- When the modal opens, disable scrolling with:
  ```tsx
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);
  ```
