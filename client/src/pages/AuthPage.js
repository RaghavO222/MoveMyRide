import { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        
        <div className="auth-page">
            <div className="toggle-buttons">
                <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
                <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Sign Up</button>
            </div>
            {isLogin ? <Login /> : <Signup />}
        </div>
    );
};

export default AuthPage;
