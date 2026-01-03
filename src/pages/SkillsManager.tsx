import { useState } from 'react';
import { useSkills } from '../hooks/useSkills';
import SkillsHero from '../components/features/skills/SkillsHero';
import SkillsForm from '../components/features/skills/SkillsForm';
import SkillsFilter from '../components/features/skills/SkillsFilter';
import SkillCard from '../components/features/skills/SkillCard';
import type { SkillFormData } from '../types/skill';

const SkillsManager = () => {
    const {
        entries,
        loading,
        submitting,
        dateFilter,
        setDateFilter,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        createSkill
    } = useSkills();

    const [formData, setFormData] = useState<SkillFormData>({
        skillName: '',
        duration: '',
        category: 'Technical',
        notes: '',
        masteryLevel: 5,
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await createSkill(formData);
        if (success) {
            setFormData({
                skillName: '',
                duration: '',
                category: 'Technical',
                notes: '',
                masteryLevel: 5,
                date: new Date().toISOString().split('T')[0]
            });
        }
    };

    return (
        <div className="master-roadmap-container">
            <SkillsHero entriesCount={entries.length} />

            <div className="grid-responsive-2">
                {/* Form Section */}
                <div>
                    <SkillsForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                </div>

                {/* History/List Section */}
                <div>
                    <h2 className="heading-lg mb-6">Recent Logs</h2>

                    <SkillsFilter
                        dateFilter={dateFilter}
                        setDateFilter={setDateFilter}
                        customStartDate={customStartDate}
                        setCustomStartDate={setCustomStartDate}
                        customEndDate={customEndDate}
                        setCustomEndDate={setCustomEndDate}
                    />

                    {loading ? (
                        <div className="loader-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="grid-stack">
                            {entries.length === 0 ? (
                                <div className="card w-full p-8 text-center" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📝</div>
                                    <h3 className="heading-lg mb-2" style={{ marginBottom: '0.5rem' }}>No logs found</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Start tracking your learning journey today!</p>
                                </div>
                            ) : (
                                entries.map((entry) => (
                                    <SkillCard key={entry.id || (entry as any)._id} entry={entry} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillsManager;
