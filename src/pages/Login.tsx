import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { backendUrl } from '../main';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${backendUrl}/auth/login`, { email, password });
            login(res.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="heading-xl" style={{ textAlign: 'center' }}>Welcome Back</h2>
            <form onSubmit={handleSubmit} className="card">
                {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}
                <div className="mb-4">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-8">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Login
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--text-primary)' }}>Register</Link>
            </p>
        </div>
    );
};

export default Login;
