const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config();
app.use(express.json());
app.use(cors());
const {Authenticator} = require("./middleware/authServer.js")

const jwt = require("jsonwebtoken")
global.usernameList = [
    {username:"James", password:"Password"},
    {username:"John", password:"Password"}
]

const userAccounts = [
    {accountType: "checking", balance:5000, username: "James", Id: 1},
    {accountType: "savings", balance:15000, username: "James", Id: 2},
    {accountType: "checking", balance:3000, username: "John", Id: 3}
]

app.post("/login", (request, response)=>{
    if (request.body)
    {
        const {username, password} = request.body;
        console.log(`username : ${username}`);
        console.log(`password: ${password}`);
        const user = usernameList.find((user)=>{return user.username == username && user.password == user.password});
        console.log(user);
        if (user) // true if found || undefined
        {
            const userObject = {name: username};
            const secret = jwt.sign(userObject, process.env.ACCESS_SECRET);
            return response.json({success: true, data: secret});
        }
        else
        {
            return response.json({success: false, message:"Not Authenticated, Reason: Token has been tampered"})
        }
    }
    else
    {
        return response.json({success: false, message: "User did not pass username and password"})
    }
})

app.get("/accounts/:accountID", Authenticator, (request, response)=>{
    // const {username} = request.body;
    if (request.params)
    {
        const {accountID} = request.params;
        console.log(accountID);
        const foundUser = userAccounts.filter((accountItem)=>{return accountItem.Id == Number(accountID) });
        if (foundUser.length < 1)
        {
            return response.status(200).json({success: true, msg: `No user with id : ${accountID} in the database `});
        }
        else
        {
            console.log(foundUser);
            return response.status(200).json({success:true, id: accountID, data: foundUser})
        }
    }
    else
    {
        return response.status(400).json({success: false, msg: "No paramter value was given in the search"});
    }
    // console.log(request.headers);
    // const authorization = request.headers["authorization"];
    // if (authorization)
    // {

    //     console.log(authorization);
    //     console.log(typeof(authorization));
    //     let authorization_array = authorization.split(" ")
    //     console.log(authorization_array) // get the first element in the array index 1
    //     let secret = authorization_array[1];
    //     console.log(secret);
    //     jwt.verify(secret, process.env.ACCESS_SECRET,(err, user)=>{
    //         if (err)
    //         {
    //             return response.json({success:false, msg:"User authentication failed: Wrong Token"})
    //         }
    //         else
    //         {
    //             console.log(user);
    //             const usrName = user.name;
    //             const foundUser = userAccounts.filter((accountItem)=>{return accountItem.username == usrName})
    //             return response.status(401).json({success:true, userName: usrName, msg: foundUser})
    //         }
    //     })
    // }
    // else
    // {
    //     response.json({success:false, msg:"No authentication header provided"})
    // }
    // const {username} = request.body;
    // const foundUser = userAccounts.filter((accountItem)=>{return accountItem.username == username})
    // return response.json({success: true, data: foundUser});
});

app.post("/profile/:username", Authenticator, (req, res)=>{
    // get accountID form.username from request.params
    const {username} = req.params;
    if (username)
    {
        const foundProfile  = usernameList.filter((userItem)=>{return userItem.username == username})
        if (foundProfile.length < 1)
        {
            return res.json({success: false, msg: `No user with the name : ${username}`})
        }
        else
        {
            return res.json({success: true, msg: "User found", profile: foundProfile});
        }
    }
    // const {username} = req.body; 
    // // check if accountNumber exist == use filter array method: returns a new array : check length
})



portNumber = 5001
app.listen(portNumber, ()=>{console.log(`Server is listening on port ${portNumber}`)})