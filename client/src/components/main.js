import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import HomePage from "./homePage";
import AccountComponent from "./accounts";
import PageLost from "./lost";
import Profile from "./profile";
import {configureStore} from "@reduxjs/toolkit"
import reducerer from "../store/reducer";
import {Provider} from "react-redux"
import requireAuth from "../requireAuth";
import setAuthenticationHeader from "./utils/authenticator";

const store = configureStore({reducer:reducerer});

const ProtectedAccount = requireAuth(AccountComponent);

const ProtectedProfile = requireAuth(Profile);


const token = localStorage.getItem("jsonwebtoken");

if (token)
{
    setAuthenticationHeader(token);
    store.dispatch({type: 'ON_LOGGED_IN'});
}

export default function Main()
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