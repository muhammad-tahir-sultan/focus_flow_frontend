
import { twelveMonthPlan, dailyQuestion } from '../../data/identityData';

interface IdentityPlanProps {
    currentDate: string;
    getTodayDate: () => string;
    changeDate: (days: number) => void;
    handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    activeMonth: number;
    setActiveMonth: (month: number) => void;
    loading: boolean;
    todayChecklist: string[];
    toggleDailyItem: (item: string) => void;
}

const IdentityPlan = ({
    currentDate,
    getTodayDate,
    changeDate,
    handleDateChange,
    activeMonth,
    setActiveMonth,
    loading,
    todayChecklist,
    toggleDailyItem
}: IdentityPlanProps) => {
    return (
        <div>
            {/* Date Navigator */}
            <div className="flex justify-center items-center mb-8">
                <div className="date-navigator">
                    <button onClick={() => changeDate(-1)} className="nav-arrow" title="Previous Day">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div className="date-input-container">
                        <span className="date-input-icon">📅</span>
                        <input
                            type="date"
                            value={currentDate}
                            onChange={handleDateChange}
                            className="date-input"
                        />
                        {currentDate === getTodayDate() && <span className="badge badge-filled" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>TODAY</span>}
                    </div>
                    <button onClick={() => changeDate(1)} className="nav-arrow" title="Next Day">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div className="month-selector scrollbar-hide">
                {twelveMonthPlan.map((m) => (
                    <button
                        key={m.month}
                        onClick={() => setActiveMonth(m.month)}
                        className={`month-btn ${activeMonth === m.month ? 'active' : ''}`}
                    >
                        <span className="month-label">Month {m.month}</span>
                        <span className="month-phase">{m.phase}</span>
                    </button>
                ))}
            </div>

            {twelveMonthPlan.map((m) => (
                activeMonth === m.month && (
                    <div key={m.month} className="grid-responsive-2">
                        <div className="card-premium">
                            <span className="badge badge-filled mb-4">Month {m.month} Focus</span>
                            <h2 className="heading-xl mb-2">{m.phase}</h2>
                            <p className="text-xl gradient-text font-bold mb-6">{m.whoYouBecome}</p>

                            <h3 className="heading-lg mb-4">🧠 Mindset Shifts</h3>
                            <ul className="mindset-list mb-6">
                                {m.shifts.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>

                            <h3 className="heading-lg mb-4">📤 Monthly Outputs</h3>
                            <ul className="affirmation-list">
                                {m.output.map((o, i) => <li key={i}>{o}</li>)}
                            </ul>
                        </div>

                        <div className="card-premium flex flex-col">
                            <h2 className="heading-lg mb-2">✅ Daily Non-Negotiables</h2>
                            <p className="text-secondary mb-6">Tick these for <strong>{currentDate}</strong>.</p>

                            {loading ? (
                                <div className="loader-container">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                <div className="checklist-container mb-8 flex-grow">
                                    {m.dailyNonNegotiables.map((item, i) => (
                                        <label key={i} className="checklist-item">
                                            <input
                                                type="checkbox"
                                                checked={todayChecklist.includes(item)}
                                                onChange={() => toggleDailyItem(item)}
                                            />
                                            <span className="checkmark"></span>
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            <div className="mt-auto pt-6 border-t border-gray-800">
                                <h3 className="text-lg font-bold mb-2">🧠 Daily Question</h3>
                                <blockquote className="italic text-secondary">
                                    {dailyQuestion}
                                </blockquote>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default IdentityPlan;
