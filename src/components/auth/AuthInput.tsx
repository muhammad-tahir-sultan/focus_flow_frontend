import type { ChangeEvent } from 'react';

interface AuthInputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    autoComplete?: string;
    showToggle?: boolean;
    onToggle?: () => void;
    isPasswordVisible?: boolean;
}

const AuthInput = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    autoComplete,
    showToggle = false,
    onToggle,
    isPasswordVisible
}: AuthInputProps) => {
    return (
        <div className="auth-form-group">
            <div className="auth-label-wrapper">
                <label className="auth-label">{label}</label>
            </div>
            <div className="auth-input-wrapper">
                <input
                    type={type}
                    className="auth-input"
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                />
                {showToggle && onToggle && (
                    <button
                        type="button"
                        className="auth-input-icon"
                        onClick={onToggle}
                        title={isPasswordVisible ? 'Mask Key' : 'Reveal Key'}
                    >
                        {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuthInput;
