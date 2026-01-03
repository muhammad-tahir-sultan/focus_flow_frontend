import type { Principle } from '../../../data/cleanCodePrinciples';

interface CleanCodeCardProps {
    principle: Principle;
    index: number;
}

const CleanCodeCard = ({ principle, index }: CleanCodeCardProps) => {
    return (
        <div className="principle-card" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="card-idx">{principle.id < 10 ? `0${principle.id}` : principle.id}</div>
            <h3>{principle.title}</h3>
            <p className="desc">{principle.desc}</p>

            <div className="code-comparison">
                <div className="bad-code">
                    <span className="indicator">❌ BAD</span>
                    <code>{principle.bad}</code>
                </div>
                <div className="good-code">
                    <span className="indicator">✅ GOOD</span>
                    <code>{principle.good}</code>
                </div>
            </div>
        </div>
    );
};

export default CleanCodeCard;
