import { NavLink } from "react-router-dom"
export default function Footer()
{
    return (
        <footer className="bg-gray-800 text-white text-center py-[100px] px-[50px]">
            <h2>JSON Web Authentication</h2>

            <div className='footer-navLink '>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>    
                    <li><NavLink to="/account">Account</NavLink></li>    
                    <li><NavLink to="/profile">Profile</NavLink></li>    
                </ul>     
            </div>

        </footer>
    )
}