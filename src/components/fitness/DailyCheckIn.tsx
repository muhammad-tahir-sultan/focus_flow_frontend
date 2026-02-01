import '../../styles/focusFlow.css';
import type { DailyChecklist } from '../../types/fitness.types';

interface DailyCheckInProps {
    checklist: DailyChecklist;
    todayDate: string;
    loading: boolean;
    onToggle: (key: keyof DailyChecklist) => void;
}

export const DailyCheckIn = ({ checklist, todayDate, loading, onToggle }: DailyCheckInProps) => {
    return (
        <div className="card-premium mb-8 border-l-4" style={{ borderColor: '#34d399' }}>
            <div className="flex-between mb-4">
                <h2 className="heading-lg">✅ Daily Check-in ({todayDate})</h2>
                {loading && <span className="text-sm text-secondary animate-pulse">Syncing...</span>}
            </div>
            <div className="checklist-container">
                <label className="checklist-item">
                    <input type="checkbox" checked={checklist.workout} onChange={() => onToggle('workout')} />
                    <span className="checkmark"></span>
                    <span className={checklist.workout ? 'text-green-400 font-bold' : ''}>Workout completed</span>
                </label>
                <label className="checklist-item">
                    <input type="checkbox" checked={checklist.run} onChange={() => onToggle('run')} />
                    <span className="checkmark"></span>
                    <span className={checklist.run ? 'text-green-400 font-bold' : ''}>Run completed</span>
                </label>
                <label className="checklist-item">
                    <input type="checkbox" checked={checklist.water} onChange={() => onToggle('water')} />
                    <span className="checkmark"></span>
                    <span>Water intake (3-4L)</span>
                </label>
                <label className="checklist-item">
                    <input type="checkbox" checked={checklist.sleep} onChange={() => onToggle('sleep')} />
                    <span className="checkmark"></span>
                    <span>Sleep quality (7-8h)</span>
                </label>
                <label className="checklist-item">
                    <input type="checkbox" checked={checklist.stretch} onChange={() => onToggle('stretch')} />
                    <span className="checkmark"></span>
                    <span>Stretching done</span>
                </label>
            </div>
        </div>
    );
};
