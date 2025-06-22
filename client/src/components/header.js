import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
function Header(props)
{
    return (
        <header className="header   w-full flex flex-row justify-between  items-center p-4">
            <h1 className="text-2xl font-bold text-gray-800">JSON Web Authentication</h1>
        
            <ul className="flex flex-row gap-4 ">
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
                
                {
                    props.isLoggedIn &&
                    (
                        <div className="flex flex-row gap-4 ">
                            <NavLink
                                className={({isActive})=>{
                                    return isActive ? "text-white" : "text-black"
                                }}
                                to="/accounts"
                            >
                                Account
                            </NavLink>

                            <NavLink 
                                className={({isActive})=>{
                                    return isActive ? "text-white" : "text-black"
                                }}
                                to="/profile"
                            >
                                Profile
                            </NavLink>
                            <button>
                                <p>LogOut</p>
                            </button>
                        </div>
                    )
                }
            </ul>
        </header>

    )
}

const mapStateToProps = (state)=>{
    return {
        isLoggedIn: state.isLoggedIn
    }
}
export default connect(mapStateToProps) (Header)
