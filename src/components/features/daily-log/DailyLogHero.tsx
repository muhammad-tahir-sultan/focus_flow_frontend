
interface DailyLogHeroProps {
    isEditing: boolean;
}

const DailyLogHero = ({ isEditing }: DailyLogHeroProps) => {
    return (
        <header className="page-header center-text mb-8">
            <h2 className="heading-xl gradient-text">
                {isEditing ? 'Edit Daily Execution' : 'Log Daily Execution'}
            </h2>
            <p className="text-secondary quote-text">
                "Consistency is the key to success."
            </p>
        </header>
    );
};

export default DailyLogHero;
