import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [error,setError] = useState('')
    const [loading,setLoading] = useState('')
    const {dispatch} = useAuthContext()

    const signup = async (email,password) => {
        setLoading(true)
        setError(null)

        try{
            const response = await fetch('/api/user/signup',{
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password})
            })
            const json = await response.json()
    
            if(!response.ok){
                setLoading(false)
                setError(json.error)
            }
    
            if(response.ok){
                localStorage.setItem('user',JSON.stringify(json))
    
                dispatch({type: 'LOGIN',payload: json})
    
                setLoading(false)
            }
        }catch(err){
            setError(err.message);
        }

        
    }

    return {signup,loading,error}
}