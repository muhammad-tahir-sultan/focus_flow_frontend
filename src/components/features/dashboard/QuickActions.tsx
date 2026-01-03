import { Link } from 'react-router-dom';

const QuickActions = () => {
    return (
        <>
            <div className="flex-between" >
                <h2 className="heading-lg">Quick Actions</h2>
            </div>
            <div className="quick-actions-grid">
                <Link to="/log" className="action-btn btn-primary">
                    🚀 Log Daily Execution
                </Link>
                <Link to="/goals" className="action-btn btn-secondary">
                    🎯 Manage Goals
                </Link>
            </div>
        </>
    );
};

export default QuickActions;
