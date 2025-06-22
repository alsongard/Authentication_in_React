notes.md
redux enables us to hide links that can only be used/seen after a user logs in.
it also enables use to prevent users from accessing different webpages if no token has been set.
For this we use ``npm i redux`` and ``npm i react-redux``



so to setup redux that can be used to achieve the above goals we:
1. setup reducer: store/reducer.js
```javascript
const initialState={
    username:"",
    isLoggedIn:false
}
const reducerer = (state=initialState, action)=>{
    return state // for testing purpose on ReduxDevTools after successfull use the below
    switch(action.type){
        case 'ON_LOGGGED_IN':
            return {
                ...state,
                username: action.payload,
                isLoggedIn: true
            }
    }
}

export default reducerer;
```


2.  in mains.js file:
set:
```javascript
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux" ;
import reducerer from "../store/reducer.js";

const store = configureStore({reducer:reducerer})

export default function Mains()
{
    return (
        <Provider store={store}>
            
    )   
}
```


3. To integrate the reducer to ``HomePage()``:homePage.js where we have login route we:
use ``connect()``

```javascript


// in the login route add:
const login=()=>{
        axios.post("http://localhost:5001/login", formData)
            .then((response)=>{
                console.log(response.data.data);
                if (response.data.data)
                {
                    const token = response.data.data;
                    localStorage.setItem("jsonwebtoken", token);
                    localStorage.setItem("username", formData.username);
                    setAuthenticationHeader(token);
                    props.onLoggedIn();
                    navigate("/accounts");
                    // props.history.push("/accounts"); // redirect to accounts page
                }
            })
            .catch((err)=>{
                setPageErrBool(true);
                console.log(`Error: ${err}`)})
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onLoggedIn: ()=>{return dispatch({type: 'ON_LOGGED_IN'})} // ths seems to access ON_LOGGED_IN from reducerer
    }
}
export default connect(null, mapDispatchToProps)(HomePage);

// connect() is a function that returns a function and we are passing HomePage as the function

```


## **displaying NavLinks based on isLoggedIn state: reducer state:**
1. In headers.js file:

```javascript
import {connect} from "react-redux";
function Header(props)
{
    return (
        // using conditional rendering to display different types of NavLinks
        {
            !props.isLoggedInVar &&
            (
                <NavLink to="/" className={({isActive})=>{
                    return isActive ? "text-white" : "text-black"
                }}
                >
                    Home
                </NavLink>

            )   
        }

        {!props.isLoggedIn &&    
            <NavLink 
                className={({isActive})=>{
                    return isActive ? "text-white" : "text-black"
                }} 
                to="/"
            >
                Home
            </NavLink>
        }

    )
}

const mapStateToProps = (state)=>{
    return {
        isLoggedInVar : state.isLoggedIn // this state.isLoggedIn is accessed from the reducerer
    }
}
export default connect(mapStateToProps)(Header);
```


### **Client Side Route protection**
To setup a client side route protection we use a functional component wrapper:
1. functional Component Wrapper
```javascript

import {useNavigator} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function requireAuth(ComposedComponent)
{
    return function AuthenticatedRoute(props)
    {
        const navigate = useNavigate();
        const isAuthenticated = useSelector((state)=>{return state.isLoggedIn}) // selects the variable from the reducer.js file: const initialState = {isLoggedIn: false} though this value is changed when logging in in HomePage() in http://localhost:5001/login

        useEffect(()=>{
            if (!isAuthenticated) // if false
            {
                navigate("/");
            }
        }, [navigate, isAuthenticated])
        return isAuthenticated ? <ComposedComponent {...props}/> : null
    }
}
```

2. In mains.js set the following:
```javascript
import requireAuth from "../requireAuth";

const ProtectedAccount = requireAuth(<AccountComponent/>);
const ProtectedProfile = requireAuth(<ProfileComponent/>)

export default Main()
{
    return (
        <Provider store={store}>
            <BrowserRouter>   
                <Routes>
                        <Route path="/" element={<div><Header/> <Outlet/> <Footer/></div>}> {/**parent route */}
                            <Route index element={<HomePage/>}/>
                            <Route path="/accounts" element={<ProtectedAccount/>}/>
                            <Route path="/profile" element={<ProtectedProfile/>}/>
                            <Route path="*" element={<PageLost/>}/>
                        </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
```