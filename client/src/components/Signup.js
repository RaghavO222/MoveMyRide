import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup,loading,error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email,password)

    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
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
            <button disabled={loading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default Signup;
