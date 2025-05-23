# MERN JALISCOTILE

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
