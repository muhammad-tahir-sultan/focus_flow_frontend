import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { backendUrl } from '../main';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${backendUrl}/auth/register`, { name, email, password });
            login(res.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '450px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 className="heading-xl" style={{ marginBottom: '0.5rem' }}>Start Execution</h2>
                    <p className="text-sm" style={{ fontSize: '1rem' }}>Begin your discipline journey today</p>
                </div>

                <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem' }}>
                    {error && (
                        <div style={{
                            color: 'var(--error-color)',
                            marginBottom: '1.5rem',
                            padding: '0.75rem 1rem',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid var(--error-color)',
                            borderRadius: '8px',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            fontSize: '0.95rem'
                        }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="John Doe"
                            style={{ fontSize: '1rem', padding: '0.875rem 1rem' }}
                        />
                    </div>

                    <div className="mb-4">
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            fontSize: '0.95rem'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                            style={{ fontSize: '1rem', padding: '0.875rem 1rem' }}
                        />
                    </div>

                    <div className="mb-8">
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            fontSize: '0.95rem'
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                placeholder="Minimum 6 characters"
                                style={{
                                    fontSize: '1rem',
                                    padding: '0.875rem 1rem',
                                    paddingRight: '3rem',
                                    width: '100%'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                title={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            At least 6 characters
                        </small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.05rem',
                            fontWeight: '600'
                        }}
                    >
                        Register
                    </button>
                </form>

                <p style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem'
                }}>
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        style={{
                            color: 'var(--accent-color)',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
