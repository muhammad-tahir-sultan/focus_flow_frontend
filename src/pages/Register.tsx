import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/auth';
import AuthInput from '../components/auth/AuthInput';
import AuthHeader from '../components/auth/AuthHeader';
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
            const data = await registerUser({ name, email, password });
            login(data.token);
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
                <AuthHeader />

                <div className="auth-card">
                    <h3 className="heading-lg auth-welcome">Establish Access</h3>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                <span>⚠️</span>
                                {error}
                            </div>
                        )}

                        <AuthInput
                            label="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Operator Name"
                            required
                            autoComplete="name"
                        />

                        <AuthInput
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="operator@focusflow.ai"
                            required
                            autoComplete="email"
                        />

                        <AuthInput
                            label="Security Key"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum 6 characters"
                            required
                            autoComplete="new-password"
                            showToggle
                            onToggle={() => setShowPassword(!showPassword)}
                            isPasswordVisible={showPassword}
                        />

                        <div className="auth-form-group" style={{ marginTop: '-1rem', marginBottom: '1.5rem' }}>
                            <small style={{ display: 'block', color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.8rem' }}>
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

                <p className="auth-protection-text">
                    Access granted under Focus Flow Charter v1.0
                </p>
            </div>
        </div>
    );
};

export default Register;
