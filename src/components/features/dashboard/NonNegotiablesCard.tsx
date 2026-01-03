import { Link } from 'react-router-dom';

const NonNegotiablesCard = () => {
    return (
        <div className="card mb-8 non-negotiables-card">
            <h3 className="heading-lg mb-4">Daily Non-Negotiables</h3>
            <ul className="non-negotiables-list">
                <li className="non-negotiable-item">
                    <span className="bullet">•</span>
                    <strong>Career & Income:</strong> 10 Client Outreach + 1 LinkedIn Post
                </li>
                <li className="non-negotiable-item">
                    <span className="bullet">•</span>
                    <strong>Physique:</strong> Workout (45 mins) + Reduce Tea (2x)
                </li>
                <li className="non-negotiable-item">
                    <span className="bullet">•</span>
                    <strong>Degree:</strong> Study Degree Subjects (1 hour)
                </li>
                <li className="non-negotiable-item">
                    <span className="bullet">•</span>
                    <strong>Communication:</strong> Practice English (Reading/Speaking 30 mins)
                </li>
                <li className="non-negotiable-item">
                    <span className="bullet">•</span>
                    <strong>Skills:</strong> Learn/Code New Tech (1 hour)
                </li>
                <li className="non-negotiable-item">
                    <span className="bullet">•</span>
                    <strong>Mindset:</strong>
                    <Link to="/control-list" className="hover-link" style={{ marginLeft: '0.25rem' }}>
                        Control List Review
                    </Link>
                    + Daily Reflection
                </li>
            </ul>
        </div>
    );
};

export default NonNegotiablesCard;
