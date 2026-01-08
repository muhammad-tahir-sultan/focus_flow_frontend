import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import AuthInput from '../components/auth/AuthInput';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import AuthProtection from '../components/auth/AuthProtection';
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
            const data = await loginUser({ email, password });
            login(data.accessToken, data.refreshToken);
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
                <AuthHeader />

                <div className="auth-card">
                    <h3 className="heading-lg auth-welcome">Welcome Back</h3>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                <span>⚠️</span>
                                {error}
                            </div>
                        )}

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
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                            showToggle
                            onToggle={() => setShowPassword(!showPassword)}
                            isPasswordVisible={showPassword}
                        />

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

                    <AuthFooter />
                </div>

                <AuthProtection />
            </div>
        </div>
    );
};

export default Login;
