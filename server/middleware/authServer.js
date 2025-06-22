const jwt = require("jsonwebtoken")

function Authenticator(request, response, next)
{
    console.log(request.headers);
    const authorization = request.headers["authorization"];
    if (authorization)
    {
        console.log(authorization);
        console.log(typeof(authorization));
        let authorization_array = authorization.split(" ");
        console.log(authorization_array) // get the first element in the array index 1
        let secret = authorization_array[2];
        console.log(secret);
        jwt.verify(secret, process.env.ACCESS_SECRET,(err, user)=>{
            if (err)
            {
                return response.json({success:false, msg:"User authentication failed: Wrong Token"})
            }
            else
            {
                next();
                // const foundUser = userAccounts.filter((accountItem)=>{return accountItem.username == usrName})
                // return response.status(401).json({success:true, userName: usrName, msg: foundUser})
            }
        })
    }
    else
    {
        console.log("No authorization header")
        return response.json({success:false, msg: "User did not pass any authorization header"})
    }
}

module.exports = {Authenticator}