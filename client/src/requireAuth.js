import { connect } from "react-redux";
import { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function requireAuth(ComposedComponent)
{
    return function AuthenticateRoute(props)
    {
        const isAuthenticated = useSelector((state)=>{return state.isLoggedIn});
        const navigate = useNavigate();

        useEffect(()=>{
            if (!isAuthenticated) // false
            {
                navigate("/");
            }
        }, [isAuthenticated, navigate]);
        return isAuthenticated ?  <ComposedComponent {...props} /> : null;
    };
        
}



