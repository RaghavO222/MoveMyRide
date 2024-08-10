import { useAuthContext } from "./useAuthContext";
import { useCarsContext } from "./useCarsContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: carDispatch} = useCarsContext()

    const logout = () => {
        localStorage.removeItem('user');

        dispatch({type: 'LOGOUT'});
        carDispatch({type: 'SET_CARS',payload:null})
    }

    return {logout};
}