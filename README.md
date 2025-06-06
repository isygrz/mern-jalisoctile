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
    2. Used useDispatch to trigger the listProducts() action when the component mounts.
    3. Used useSelector to extract loading, error, and products state from the Redux store (state.productList).
    4. Loading and Error Handling UI
    5. Displayed a <LoadingBox /> component while products are being fetched.
    6. Displayed a <MessageBox variant="danger"> component if an error occurred during product retrieval.
    7. Displayed the product grid (<Row>) only if the fetch was successful and no errors were present.
    8. Improved Tab Title Management
    9. Added a useEffect hook to immediately set the browser tab title using document.title = 'Jalisco Tile' for quick responsiveness when navigating to the home screen.
    10. Included a <Helmet><title>Jalisco Tile</title></Helmet> block for SEO and metadata injection support.
    11. Cleaned Up JSX and Conditional Rendering
    12. Ensured JSX elements are correctly opened and closed.
    13. Replaced any malformed or commented-out logic blocks.
    14. Used clear conditional rendering inside the return() block for better readability and maintenance.
    15. Responsiveness and Layout
    16. Used react-bootstrap's <Row> and <Col> to render the product grid in a responsive layout across different screen sizes (sm, md, lg).
    17. Code Refactoring and Readability
    18. Removed unused imports and commented-out code.
    19. Separated logic concerns (data fetching, title setting, rendering) clearly in the component.
    20. Followed functional component best practices using React Hooks (useEffect, useDispatch, useSelector).
15. Handle Add To Cart Button
    1. Added missing item to seed data
    2. Implemented product details route API
    3. Added Cart screen route: and defined cart route with optional ':id?'
    4. Integrated and registered cart reducer
    5. Implemented addToCart async action, fetches product data and dispatch CART_ADD_ITEM; updates cart in localStorage
    6. Enhanced API handling in detailsProduct; introduced const response = await axios.get(...) to access and log Axios response object before extracting data.
    7. Implemented cartReducer logic; added reducer to manage cart state; updates existing items or appends new ones based on \_id.
    8. Added cartScreen logic; handles addToCart dispatch via useEffect, parses quantity from URL, and displays cart items with fallback for empty state.
    9. Refactored ProductScreen.js; introduced qty state and addToCartHandler with dynamic cart routing; streamlined effects and logging for maintainability and better user navigation.
16. Smarter Cart System with Sample Support and Live Inventory Sync
    1. Sample Products Introduced.
    2. Cart API with Stock Validation; new endpoint POST /api/cart; JSON Body Parsing Enabled; Testable Cart Contents API.
    3. New HoverCartPanel Component rendered inside the Navbar; Added Nav from react-bootstrap; improved dynamic, responsive, and interactive cart element
    4. Initializes the cart state using data from localStorage, enabling cart persistence across browser reloads; initialState now includes a predefined cart.cartItems structure based on the user's stored cart data; The store is exported as Store (capital "S") in the newer version.
    5. A reusable saveCartToStorage() utility was introduced to encapsulate localStorage logic, improving readability and maintainability; addToCart now accepts an options object for greater flexibility; Logic added to override product price with samplePrice if provided; removeFromCart(id) — dispatches CART_REMOVE_ITEM and updates local storage; updateCartQuantity(id, qty) — dispatches CART_UPDATE_ITEM_QTY and updates local storage; The newer addToCart uses fallback logic to selectively override data fields.
    6. Quick Cart Overview on Hover; Uses useSelector to pull cartItems from global Redux state, ensuring real-time accuracy as users add or update items; Displays a (Sample) label and conditionally renders the appropriate price (samplePrice if available) for each item; A badge on the cart icon reflects the total quantity of all items in the cart (qty summed across all products).
    7. Enhanced Component Scope & Props - Allows cross-referencing to detect and render associated sample products; Dispatch addToCart actions and Access cartItems from global Redux state; New logic locates associated sample product using and checks whether sample is already in cart to avoid duplication; product card badge overlays product image showing product availability (In Stock / Unavailable).
    8. Improved CART_ADD_ITEM Logic - nstead of replacing, it accumulates the quantity (qty) of the existing item; Added CART_REMOVE_ITEM Support - Allows removing an item by its \_id; Added CART_UPDATE_ITEM_QTY Support - Enables explicitly setting the quantity of an item.
    9. Completely removes useEffect and useParams logic; Users can adjust item quantities using input fields and +/- buttons; Each cart item has a trash icon button to remove it from the cart; Calculates subtotal quantity and total price dynamically; Detects samplePrice when calculating and rendering item price.
    10. Filters out sample products from the homepage listing; Passes allProducts to enable logic like sample-product linking inside Product.js; Switches to product.\_id for better uniqueness and React reconciliation stability.
    11. Add to cart logic uses direct API call + Redux dispatch; Quantity Selector uses Numeric input with +/- buttons; Add to cart feedback Success, error, and loading states shown; Stock warnings & support Displays stock limit messages + bulk CTA; Axios integration Posts directly to /api/cart; Calls both an API endpoint (POST /api/cart) and the Redux addToCart action to ensure backend and frontend sync;
17. Sign-In Support, Breadcrumb Navigation & UI Refinements
    1. Added Route: /signin; Introduced a new route path /signin handled by the SigninScreen component; the imported SigninScreen Component prepares the app to support authentication flows in future development; Updated <Routes> Block so that SigninScreen route was added before the root (/) route to ensure correct route matching order.
    2. Added .small-container Utility Class; Improves visual balance and readability for components needing a constrained width.
    3. Added userSigninReducer to Root Reducer - enables Redux to manage user authentication state; Loaded userInfo from localStorage - parses and loads user data (if available) under userSignin.userInfo; Extended initialState with userSignin - provides the sign-in screen with access to stored user credentials.
    4. in useractions - critical role in enabling user authentication within a Redux-powered React application; Handles User Authentication via API; Manages Authentication State in Redux (USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL); Persists Login Data to Local Storage (userInfo for session persistence); Bridges UI and API - Centralizes the authentication logic so it's reusable and testable outside of UI components.
    5. Automatically generates a breadcrumb trail based on the current URL path; Uses react-router-dom for Location Awareness; Renders using Breadcrumb and Breadcrumb.Item components (React-Bootstrap) for a consistent, styled UI; Accepts an extraCrumbs array (e.g. { path: '/product/slug', label: 'Product Name' }) to override default path-based labels; The last item in the trail is rendered as active (non-clickable) to indicate the current view.
    6. Introduced <Breadcrumbs /> component for improved navigation and contex; Moved the subtotal logic into a dedicated subtotal constant; Replaced some verbose JSX with more concise and modern layout using gap-2 for spacing in cart item rows; Grouped React-Bootstrap imports into a single line for simplicity; Renamed newQty ➝ qty in updateQuantity().
    7. Introduced Breadcrumbs component at the top of the product page; Extracted the quantity input logic into a reusable function: renderQuantityInput(); Consolidated conditional render logic in return block with cleaner ternary checks (loading, error, default).
