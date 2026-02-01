interface WorkoutCardProps {
    title: string;
    icon: string;
    color: string;
    muscles: string;
    exercises: { name: string; reps: string }[];
    rule: string;
}

const WorkoutCard = ({ title, icon, color, muscles, exercises, rule }: WorkoutCardProps) => (
    <div className="card-premium">
        <h3 className="heading-md mb-4" style={{ color }}>{icon} {title}</h3>
        <p className="text-sm text-secondary mb-4">{muscles}</p>
        <ul className="text-sm" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {exercises.map((ex, idx) => (
                <li key={idx} className="flex-between">
                    <span>{ex.name}</span>
                    <span className="text-secondary">{ex.reps}</span>
                </li>
            ))}
        </ul>
        <div className="mt-4 pt-4 text-secondary" style={{ fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {rule}
        </div>
    </div>
);

export const WorkoutDetails = () => {
    const workouts = [
        {
            title: 'PUSH DAY',
            icon: '🔥',
            color: '#60a5fa',
            muscles: 'Chest • Shoulders • Triceps',
            exercises: [
                { name: 'Push-ups', reps: '4×15–25' },
                { name: 'Decline Push-ups', reps: '3×10–15' },
                { name: 'Pike Push-ups', reps: '3×10–15' },
                { name: 'Chair Dips', reps: '4×12–20' },
                { name: 'Diamond Push-ups', reps: '3×8–12' },
                { name: 'Plank', reps: '3×45–60s' },
            ],
            rule: 'Rule: Slow controlled reps, 45–60 sec rest'
        },
        {
            title: 'PULL DAY',
            icon: '💪',
            color: '#f472b6',
            muscles: 'Back • Biceps',
            exercises: [
                { name: 'Pull-ups / Assisted', reps: '4×5–10' },
                { name: 'Inverted Rows', reps: '4×10–15' },
                { name: 'Backpack Rows', reps: '3×12–15' },
                { name: 'Backpack Curls', reps: '3×15' },
                { name: 'Dead Hang', reps: '3×30 sec' },
            ],
            rule: 'Rule: Full stretch, squeeze back'
        },
        {
            title: 'LEG DAY',
            icon: '🦵',
            color: '#fbbf24',
            muscles: 'Quads • Glutes • Calves',
            exercises: [
                { name: 'Squats', reps: '4×25' },
                { name: 'Bulg. Split Squats', reps: '3×10/leg' },
                { name: 'Walking Lunges', reps: '3×20 steps' },
                { name: 'Glute Bridges', reps: '3×20' },
                { name: 'Calf Raises', reps: '4×25' },
                { name: 'Wall Sit', reps: '2×60 sec' },
            ],
            rule: 'Never skip leg day!'
        }
    ];

    return (
        <div className="grid-responsive-3 mb-8">
            {workouts.map((workout, idx) => (
                <WorkoutCard key={idx} {...workout} />
            ))}
        </div>
    );
};
