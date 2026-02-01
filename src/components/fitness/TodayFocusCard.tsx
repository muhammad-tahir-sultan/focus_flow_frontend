import { getTodayFocus } from '../../utils/fitnessUtils';

export const TodayFocusCard = () => {
    const { day, focus } = getTodayFocus();

    return (
        <div className="card-premium mb-8 text-center" style={{ borderTop: `4px solid ${focus.color}` }}>
            <h2 className="text-secondary text-sm uppercase tracking-widest mb-2">
                Today's Focus • {day}
            </h2>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{focus.icon}</div>
            <h3 className="heading-lg mb-2" style={{ color: focus.color }}>
                {focus.type.toUpperCase()} DAY
            </h3>
            <p className="text-lg text-secondary font-medium">{focus.muscles}</p>
        </div>
    );
};
