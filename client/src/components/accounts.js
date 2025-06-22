import { useState, useEffect } from "react";
import axios from 'axios';
import { FaUserTie } from "react-icons/fa";
import userIcon from "../assets/images/user_icon.jpeg";

export default function AccountComponent()
{
    const [accountData, setAccountData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        handleProfile();
    }, [])

    /*
    const handleAccounts =  ()=>{
    // console.log(`The accounts length is : ${accounts.length}`);
    // console.log(`The key is : ${key}`)
    const token = localStorage.getItem("jsonwebtoken");
    // const userAccountId = Number(formData.accountNumber);
    const username = localStorage.getItem(username);
    // console.log(`userAccountId: ${userAccountId} and type : ${typeof(userAccountId)}  and key: ${token}`);
    
    axios.get(`http://localhost:5001/accounts/${userAccountId}`)   //  /accounts/:accountID
        .then((response)=>{
            console.log(response);
        })
        // .then((response))
        .catch((err)=>{console.log(`Error: ${err}`)})
    }

    */
    const handleProfile = ()=>{
        const username = localStorage.getItem("username");
        let newUserNameuser;
        let newUserPasswd;
        // console.log(`formData.username:${formData.username}`)
        axios.post(`http://localhost:5001/profile/${username}`)
            .then((response)=>{
                console.log(response);
                if (response.data)
                {
                    console.log('This is response.data.profile');
                    console.log(response.data.profile);
                    // const {username, password} = response.data.profile;
                    let myUserArray = response.data.profile;
                    myUserArray.map((user)=>{
                        newUserNameuser = user.username;
                        newUserPasswd = user.password
                    })
                    console.log(`Username is : ${newUserNameuser} and Password is : ${newUserPasswd}`);
                    setAccountData(response.data.profile);
                    setIsLoading(true);
                }
            })
            // .then((response)=>{setAccountData(data)})
            .catch((err)=>{console.log(`Error : ${err}`)})
    };
    // console.log(accountData);

    // map over the profile data:
    const content =  accountData.map((user)=>{
        return (
            <div key={user.id} className="flex flex-col items-center justify-center  ">
                <img src={userIcon} className="w-[80%]  h-[60%]" alt="userIcon" />
                <h3>{user.username}</h3>
                <h3>{user.password}</h3>
            </div>
        )
    })
    return (
        <section>
            <h1>Account Component</h1>
            <div className="w-1/2 mt-[50xp] h-[300px] mx-auto shadow-[0px_0px_5px_blue] rounded-md flex flex-col mb-[100px]">
                
                {isLoading &&content }
            </div>
        </section>
    )
}