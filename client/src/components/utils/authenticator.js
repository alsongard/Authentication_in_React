import axios from "axios";

function setAuthenticationHeader(token)
{
    if (token)
    {
        axios.defaults.headers.common["authorization"] = `Bearer  ${token}`;
        console.log('Header Authorization setup')
    }
    else
    {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default  setAuthenticationHeader;

