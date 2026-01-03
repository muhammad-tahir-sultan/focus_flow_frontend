import CleanCodeHero from '../components/features/clean-code/CleanCodeHero';
import CleanCodeCard from '../components/features/clean-code/CleanCodeCard';
import { PRINCIPLES } from '../data/cleanCodePrinciples';
import './CleanCodeGuide.css';

const CleanCodeGuide = () => {
    return (
        <div className="clean-code-page">
            <div className="bg-gradient"></div>

            <div className="content-container">
                <CleanCodeHero />

                <div className="principles-grid">
                    {PRINCIPLES.map((p, index) => (
                        <CleanCodeCard key={p.id} principle={p} index={index} />
                    ))}
                </div>

                <footer className="page-footer">
                    <p>Internalize these. Make them muscle memory.</p>
                </footer>
            </div>
        </div>
    );
};

export default CleanCodeGuide;
