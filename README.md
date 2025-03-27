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

- Node.js (v20.x.x)

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

## Detailed Approach to Redesigning Select Skip Web Page with Redux Toolkit and Animations

This guide covers a structured approach to redesigning a webpage that fetches data from a database using fetchBaseQuery (Redux Toolkit Query), rendering items in cards, handling user interactions, managing state with Redux, and adding scroll-based animations.

### Step 1: Set Up React Vite With Dependencies

Vite is an opinionated build tool that aims to provide a faster and leaner development experience for modern web projects.

#### Install Dependencies

- npm create vite@latest Rem-waste -- --template React-ts
- npm install tailwindcss @tailwindcss
- npm install @reduxjs/toolkit react-redux framer-motion

### Step 2: Set Up Redux Toolkit with fetchBaseQuery

Redux Toolkit Query (fetchBaseQuery) is a lightweight wrapper over fetch that simplifies API calls.
RTK Query automatically caches responses to avoid unnecessary API calls.
Uses re-fetching strategies to keep data fresh.

### Step 3: Configure API Slice for Api request

Create a file in src folder: redux/features/skip/skipAPi.ts

### Step 4: Create Redux Slice for Selected Item

Create a file in src folder: redux/features/skip/skipSlice.ts

Since we need to track the selected skip, we use Redux state management.

### Step 5: Create types for static types

Create a file in src folder: redux/features/skip/types.d.ts

### Configure Redux Store

Create a file in src folder: Redux/app/store.ts

Wrap app in Provider inside main.tsx and pass the imported store as props

### Create Skip Component

- Create a file in src folder: pages/skip.tsx
- Fetch Data using useGetSkipQuery({
  postcode: 'NR32',
  area: 'Lowestoft',
  }) hook from skipApi.ts
- Pass the fetched data as props to SkipCard component to display cards and animate the cards on scroll

### Display Selected Skip

- Check if any card was selected, if true, check the id of the selected card if its equal to the id of the oject that was passed as props to the SkipCard.

- Indicate the selected card by adding a blue border to the selected card, invert the button background color and remove the border when unselected.

- When a card is selected, the selected skip flag is set to true and a bottom drawer smoothly appears to display the total cost which the summation of "Vat" and "price_before_vat".

- Check if "transport_cost", "per_tonne_cost", and area are not equal to null or undefined

- Check if "allowed_on_road" is equal to false and change the text color to yellow add a warning sign

- check if "allows_heavy_waste" is equal to false and change the text color to red add a warning sign

- Checked if "allowed_on_road" and "allows_heavy_waste" is equal to false and automatically disable the card for selection by adding background color and opacity of 50% and disabld clicking event on the card.
