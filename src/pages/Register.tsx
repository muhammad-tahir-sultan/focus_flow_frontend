import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BACKEND_URL } from '../constants/api';
import '../styles/auth.css';

const Register = () => {
    const [name, setName] = useState('');
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
            const res = await axios.post(`${BACKEND_URL}/auth/register`, { name, email, password });
            login(res.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Initialize Discipline Journey</p>
                </div>

                <div className="auth-card">
                    <h3 className="heading-lg" style={{ marginBottom: '2rem', textAlign: 'center' }}>Establish Access</h3>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                <span>⚠️</span>
                                {error}
                            </div>
                        )}

                        <div className="auth-form-group">
                            <label className="auth-label">Full Name</label>
                            <div className="auth-input-wrapper">
                                <input
                                    type="text"
                                    className="auth-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Operator Name"
                                    autoComplete="name"
                                />
                            </div>
                        </div>

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
                            <label className="auth-label">Security Key</label>
                            <div className="auth-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="auth-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="Minimum 6 characters"
                                    autoComplete="new-password"
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
                            <small style={{ display: 'block', marginTop: '0.5rem', color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.8rem' }}>
                                Complexity Level: Standard (Min 6 chars)
                            </small>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary auth-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><span>⏳</span> Initializing...</>
                            ) : (
                                <><span>✨</span> Generate Identity</>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already an Operator?{' '}
                            <Link to="/login" className="auth-link">
                                Command Center
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
                    Access granted under Focus Flow Charter v2.0
                </p>
            </div>
        </div>
    );
};

export default Register;
