import { init } from "../init"

const appReducer = (state=init,action) =>{
    switch(action.type){
        case 'Cart' : 
        return  {
            ...state,
            CartData: action.payload,
        }
        default:
        return state; 
    }
}

export default appReducer