# MERN JALISCOTILE

# Tech Stack

1. React 19
2. Redux for global state management
3. Redux Thunk for async actions
4. React Router v6+ for navigation
5. Bootstrap & React-Bootstrap for UI
6. Axios for HTTP requests
7. react-helmet-async for dynamic document titles

# STEPS

1. Introduction
2. Install Tools
3. Create React App
4. Create Git Repository
5. List Products
   1. create products array
   2. add product images
   3. render products
   4. style products
6. Add Page Routing
   1. npm i react-router-dom
   2. create route for home screen
   3. create router for product screen
7. Create Node.JS Server
   1. run npm init in root folder
   2. Update package.json set type: module
   3. Add .js to imports
   4. npm install express
   5. create server.js
   6. add start command as node backend/server.js
   7. require express
   8. create route for / return backend is ready.
   9. move products.js from frontend to backend
   10. create route for /api/products
   11. return products
   12. run npm start
8. Fetch Products From Backend
   1. set proxy in package.json
   2. npm install axios
   3. use state hook
   4. use effect hook
   5. use reducer hook
9. Add Redux to Home Screen
   1. npm install redux react-redux
   2. Create store.js
   3. initState= {products:[]}
   4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload}
   5. export default createStore(reducer, initState)
   6. Edit HomeScreen.js
   7. shopName = useSelector(state=>state.products)
   8. const dispatch = useDispatch()
   9. useEffect()=>dispatch({type: LOAD_PRODUCTS, payload: data})
   10. Add store to index.js
10. Create Redux Dependent Components
    1. create Loading Component
    2. create Message Box Component
    3. refactored productActions.js
11. Add bootstrap UI Framework
    1. npm install react-bootstrap bootstrap react-router-bootstrap
    2. update App.js by changing header to navbar
    3. divide screen into three sections (header, main, footer)
    4. in index.css removed all style for header and set main element to flex and used site-container to create
       full height screen
    5. in index.js we imported 'bootstrap/dist/css/bootstrap.min.css' from bootstrap component
12. Create Product and Rating Component
    1. create rating component to render rating based on five stars
    2. Create product component to render product items in the list
    3. Use rating component in product component
    4. import fontawesome in index.html
    5. set class for btn-primary and rating span in index.css
    6. changed product list to bootstrap in HomeScreen.js
13. Create Product Details Screen
    1. fetch product from backend
    2. create 3 columns for image, info and action
    3. Integrated React Helmet for Dynamic Tab Titles
    4. Installed and configured react-helmet-async
    5. Implemented title updates for product and home pages
    6. Resolved Tab Title Not Updating Issue
    7. Diagnosed React Helmet rendering issues
    8. Moved <HelmetProvider> to App.js (then later to index.js)
    9. Used key={titleText} on Helmet to force title updates
    10. Added fallback titles for loading and error states
    11. Identified Browser Extensions Interfering With Helmet
    12. Detected stale or incorrect <title> values in DevTools
    13. Bypassed Helmet issues using direct document.title updates
    14. Implemented document.title via useEffect
    15. Replaced dynamic Helmet logic with useEffect to reliably update browser tab titles
    16. Applied to ProductScreen.js and HomeScreen.js for consistency
    17. Cleaned Up Helmet Usage
    18. Removed redundant <Helmet> usage in App.js
    19. Disabled <Helmet> in individual screens while retaining it for future SEO flexibility
    20. Resolved JSX Parsing Errors in App.js
    21. Wrapped multiple top-level JSX elements using React Fragments (<>...</>)
    22. Cleaned Up console.log() Usage
    23. Removed or commented out development logs before production
    24. Optionally recommended wrapping logs with process.env.NODE_ENV === 'development'
    25. Maintained Consistent Navigation Title Behavior
    26. Verified that navigation between Home and Product pages triggers proper title updates
    27. Addressed race conditions and stale title rendering across route transitions
14. Refactor HomeScreen and ProductScreen for improved state handling and UI
    1. Redux Integration for Product Fetching
    1. Used useDispatch to trigger the listProducts() action when the component mounts.
    1. Used useSelector to extract loading, error, and products state from the Redux store (state.productList).
    1. Loading and Error Handling UI
    1. Displayed a <LoadingBox /> component while products are being fetched.
    1. Displayed a <MessageBox variant="danger"> component if an error occurred during product retrieval.
    1. Displayed the product grid (<Row>) only if the fetch was successful and no errors were present.
    1. Improved Tab Title Management
    1. Added a useEffect hook to immediately set the browser tab title using document.title = 'Jalisco Tile' for quick responsiveness when navigating to the home screen.
    1. Included a <Helmet><title>Jalisco Tile</title></Helmet> block for SEO and metadata injection support.
    1. Cleaned Up JSX and Conditional Rendering
    1. Ensured JSX elements are correctly opened and closed.
    1. Replaced any malformed or commented-out logic blocks.
    1. Used clear conditional rendering inside the return() block for better readability and maintenance.
    1. Responsiveness and Layout
    1. Used react-bootstrap's <Row> and <Col> to render the product grid in a responsive layout across different screen sizes (sm, md, lg).
    1. Code Refactoring and Readability
    1. Removed unused imports and commented-out code.
    1. Separated logic concerns (data fetching, title setting, rendering) clearly in the component.
    1. Followed functional component best practices using React Hooks (useEffect, useDispatch, useSelector).
