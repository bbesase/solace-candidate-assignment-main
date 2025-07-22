## Bug Fixes
### 1. Added Missing Key Props
- Added missing `key` props when rendering html that was in loops

### 2. Hydration Errors from Next.js
- In Next.js when rendering with `<thead>` you need to include a table row tag

### 3. Bad Code Patterns
- Removed `document.getElementById` and replaced with state variable control
- Removed `style` tags and replaced with `className`
- Added loading state, and error state when calling out to the API
- Added a promise chain so that all aspects of the API call were accounted for (error state, loading state, happy state)


### Code Clean-up
### 1. Added Typescript 
- Added `Advocate` type
- Added types to the state variables for consistency so you can use `Advocate[]` instead of `any[]`
- Able to keep track of what object you are dealing with in callbacks,event handlers, etc.

### 2. Added Components
- Added components for the table to reduce the size of the `pages.tsx` file
- Kept the components small to keep it simple


## Features
### 1. Searching Table
- Added logic for case insensitivity
- Added logic to trim any blank spaces before/after search term
- Added a clear button so that the user could clear any previous entered search term

### 2. Sorting Table 
- Added logic to sort individual table headers asc or desc
- For `Specialties` cell, since its an array, joining the values into a csv string for comparison
- For `yearsOfExperience` since its a number just comparing on that
- For others, just using standard sorting of strings

### 3. Responsive Design
- Added support for Mobile,Tablet, and Desktop responsiveness

### 4. Keyboard Accessibility
- Made it so that the user can navigate to the search input by using the `tab` key

## TODOs
### 1. API Handling
-Based on the text:`Assume we have a database of hundreds of thousands of advocates we need to search through` from the project instructions would need to add in some Pagination support to help with the api load times

### 2. More componentizing
- Move the search bar logic out of the `AdvocatesTable` file and into its own component
-- would reduce file size and would make it more clear to the user

### 3. Search Support
- Add a debouncer to the table search functionality
- Use `useMemo` to reduce the number of re=renders

### 4. Unit Tests
- Ran out of time to add any unit tests into this project. I moved as much as I could into smaller separate components to make them easily testable, but didnt get to add the unit tests

### 5. UI/UX layout
- Would have liked to implement a more "modern" solution rather than just a table, such as cards
- Would have added filter buttons on top of the search bar so that, assuming thousands of records, further allowed the user the filter

