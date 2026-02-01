export const RulesAndNutrition = () => {
    return (
        <div className="grid-responsive-2 mb-8">
            <div className="card-premium">
                <h3 className="heading-md mb-4">📈 Progression Rules</h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <li>Every 2 weeks: <span style={{ color: 'white' }}>+3–5 reps OR slower tempo</span></li>
                    <li>Add backpack weight when reps feel easy</li>
                    <li><span style={{ color: '#f87171' }}>Never skip leg day</span></li>
                </ul>
            </div>
            <div className="card-premium">
                <h3 className="heading-md mb-4">🍽️ Nutrition Rules</h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <li>Protein: <span style={{ color: 'white' }}>1.6–2g/kg bodyweight</span></li>
                    <li>Water: <span style={{ color: 'white' }}>3–4 liters/day</span></li>
                    <li>Sugar & fried food ❌</li>
                    <li>Sleep: <span style={{ color: 'white' }}>7–8 hours</span></li>
                </ul>
            </div>
        </div>
    );
};

export const ResultsAndNonNegotiables = () => {
    return (
        <div className="grid-responsive-2">
            <div className="card-premium">
                <h3 className="heading-md mb-4">🎯 Expected Results</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Month 1:</span>
                        <p className="text-secondary text-sm">Energy ↑, fat loss starts</p>
                    </div>
                    <div>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Month 3:</span>
                        <p className="text-secondary text-sm">Visible muscle, 7–8 km easy run</p>
                    </div>
                    <div>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Month 6:</span>
                        <p className="text-secondary text-sm">Athletic physique, strong core, 10–12 km run, high discipline</p>
                    </div>
                </div>
            </div>
            <div className="card-premium" style={{ borderLeft: '4px solid #ef4444' }}>
                <h3 className="heading-md mb-4" style={{ color: '#f87171' }}>⚠️ Non‑Negotiables</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <li>• Warm‑up 5–7 min</li>
                    <li>• Stretch after training</li>
                    <li>• <span style={{ color: 'white' }}>Sunday = Full Rest</span></li>
                </ul>
                <div className="mt-4 pt-4 text-center text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                    "Consistency beats motivation. Follow the system — results will follow."
                </div>
            </div>
        </div>
    );
};
