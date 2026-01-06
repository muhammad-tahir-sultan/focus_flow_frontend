import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BACKEND_URL } from '../constants/api';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
            login(res.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-gradient"></div>

            <div className="auth-container">
                <div className="auth-header">
                    <h2 className="heading-xl gradient-text" style={{ marginBottom: '0.5rem' }}>Focus Flow</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Initiate Session Protocol</p>
                </div>

                <div className="auth-card">
                    <h3 className="heading-lg" style={{ marginBottom: '2rem', textAlign: 'center' }}>Welcome Back</h3>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                <span>⚠️</span>
                                {error}
                            </div>
                        )}

                        <div className="auth-form-group">
                            <label className="auth-label">Email Address</label>
                            <div className="auth-input-wrapper">
                                <input
                                    type="email"
                                    className="auth-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="operator@focusflow.ai"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="auth-form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label className="auth-label">Security Key</label>
                            </div>
                            <div className="auth-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="auth-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="auth-input-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? 'Mask Key' : 'Reveal Key'}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary auth-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><span>⏳</span> Authenticating...</>
                            ) : (
                                <><span>🚀</span> Execute Login</>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            New Operator?{' '}
                            <Link to="/register" className="auth-link">
                                Request Access
                            </Link>
                        </p>
                    </div>
                </div>

                <p style={{
                    textAlign: 'center',
                    marginTop: '3rem',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.2)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em'
                }}>
                    Protected by Nauman Majeed v2.0
                </p>
            </div>
        </div>
    );
};

export default Login;
