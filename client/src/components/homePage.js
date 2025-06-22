import React from "react";
import axios from 'axios';
import setAuthenticationHeader from "./utils/authenticator";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux"; // connect enables us to use redux in our component specifically HomePage
function HomePage(props)
{
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        accountNumber: ""
    });
    const [pageErrBool, setPageErrBool] = React.useState(false);
    const [accounts, setAccounts] = React.useState({});
    // let key;
    function handleChange(event)
    {
        const {name, value} = event.target;
        setFormData((prevData)=>{
            return {...prevData, 
                [name]: value
            }
        })
    };
    // console.log(formData);

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
        /*fetch("http://localhost:5001/login", {
            method:"POST", 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData) // sending the form data to the database
        }).then((response)=> {console.log(response); return response.json()})
        .then((data)=>{
            console.log(data);
            const {success} = data;
            const newData = data.data;
            if (success)
            {
                console.log("success is true");
                // key = `Bearer ${newData}`;  an awesome way to get pass the token but still vulnerable
                localStorage.setItem("jsonwebtoken", newData)
            }
        })*/
    }

    const handleAccounts =  ()=>{
        // console.log(`The accounts length is : ${accounts.length}`);
        // console.log(`The key is : ${key}`)
        const token = localStorage.getItem("jsonwebtoken")
        const userAccountId = Number(formData.accountNumber);
        const username = localStorage.getItem(username)
        console.log(`userAccountId: ${userAccountId} and type : ${typeof(userAccountId)}  and key: ${token}`);
        
        axios.get(`http://localhost:5001/accounts/${userAccountId}`)   //  /accounts/:accountID
            .then((response)=>{
                console.log(response);
            })
            .catch((err)=>{console.log(`Error: ${err}`)})
        
        /*fetch(`http://localhost:5001/accounts/${userAccountId}`, {
            method: "GET",
            headers: {
                "authorization" : `Bearer ${token}`
            },
            // body: JSON.stringify({username: formData.username}) not applicable in GET method
        }).then((data)=>{

            console.log(data);
            // destructure
            console.log(data.success);
            console.log(data.id);
            console.log(data.data);
            let userAccountData = data.data;
            console.log(userAccountData);
            console.log(typeof(userAccountData));
            console.log(userAccountData.length)
            setAccounts(userAccountData);
            userAccountData.forEach((userAccountItem)=>{
                setAccounts(()=>{return{userAccountItem}})
            })
            // console.log(`New accounts length is : ${accounts.length}`);
            // console.log(accounts)
            }) */
    };

    const handleProfile = ()=>{
        console.log(`formData.username:${formData.username}`)
        axios.post(`http://localhost:5001/profile/${formData.username}`)
            .then((response)=>{
                console.log(response);
            })
            .catch((err)=>{console.log(`Error : ${err}`)})
    }
    const [displayState, setDisplayState] = React.useState(false);
    
    if (accounts.length > 1)
    {
        displayState = true;
    }
    // function handleSubmit(event)
    // {
    //     event.preventDefault();
    // }
    // console.log(accounts);
    return (
        
        <section className="bg-gray-700 h-[100vh] w-[100vw]"> 
            <div className="w-1/2 mx-auto py-[100px]">
                <form className="bg-gray-900 p-[50px] rounded-md">
                    <label className="block w-full text-white" htmlFor="username">Name</label>
                    <input className="block w-full rounded-md py-[2.5px] mb-[1px]" type="text" name="username" value={formData.username} onChange={handleChange}  id="username"/>
                    <label className="block w-full text-white" htmlFor="password">Password</label>
                    <input className="block w-full rounded-md py-[2.5px] mb-[1px]" type="password" name="password" value={formData.password} onChange={handleChange} id="password"/>
                    <label className="block w-full text-white" htmlFor="accountNumber">AccountID</label>
                    <input className="block w-full rounded-md py-[2.5px] mb-[1px]" id="accountNumber" type="number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />

                    {/* <input  className="w-1/2 block mx-auto  rounded-md py-[2.5px] my-[15px] bg-slate-400" type="submit" value="submit"/> */}
                    <button onClick={login} type="button"  className="w-1/2 block mx-auto  rounded-md py-[2.5px] my-[15px] bg-slate-400" >Submit</button>
                </form>

                <div>
                    <button className="w-1/2 block mx-auto  rounded-md py-[2.5px] my-[15px] bg-slate-400" onClick={handleAccounts}>View Accounts</button>
                    <button className="w-1/2 block mx-auto  rounded-md py-[2.5px] my-[15px] bg-slate-400" onClick={handleProfile}>View Profile</button>
                </div>

            </div>
        </section>
    )
}


// export default HomePage;
const mapDispatchToProps = (dispatch)=>{
    return {
        onLoggedIn: ()=>{return dispatch({type: 'ON_LOGGED_IN'})} // ths seems to access ON_LOGGED_IN from reducerer
    }
}
export default connect(null, mapDispatchToProps)(HomePage);

// connect() is a function that returns a function and we are passing HomePage as the function