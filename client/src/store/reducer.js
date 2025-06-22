const initialState = {
    username:"",
    isLoggedIn:false
}
const reducerer = (state=initialState, action)=>{
    switch(action.type){
        case 'ON_LOGGED_IN':
            return {
                ...state,
                username: action.payload,
                isLoggedIn: true
            }
    }
    return state
}

export default reducerer;