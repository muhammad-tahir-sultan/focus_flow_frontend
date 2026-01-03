import { Link } from 'react-router-dom';

const CleanCodeHero = () => {
    return (
        <header className="page-header">
            <Link to="/" className="back-link">← RETURN TO DASHBOARD</Link>
            <div className="header-content">
                <span className="premium-badge">ENGINEERING STANDARD</span>
                <h1>THE 20 LAWS OF<br />CLEAN CODE</h1>
                <p>Writing code for machines is easy. Writing code for humans is engineering.</p>
            </div>
        </header>
    );
};

export default CleanCodeHero;
