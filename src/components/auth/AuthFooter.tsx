import { Link } from 'react-router-dom';

const AuthFooter = () => {
    return (
        <div className="auth-footer">
            <p>
                New Operator?{' '}
                <Link to="/register" className="auth-link">
                    Request Access
                </Link>
            </p>
        </div>
    );
};

export default AuthFooter;
