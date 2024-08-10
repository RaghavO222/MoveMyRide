import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login,loading,error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email,password)
        
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input 
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={loading}>Login</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default Login;
