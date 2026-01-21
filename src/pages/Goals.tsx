import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constants/api';
import PageSkeleton from '../components/PageSkeleton';
import toast from 'react-hot-toast';

import GoalCard from '../components/features/goals/GoalCard';
import GoalForm from '../components/features/goals/GoalForm';
import Modal from '../components/common/Modal';
import type { Goal, GoalFormData } from '../types/goals';
import '../styles/goals.css';

const Goals = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [formData, setFormData] = useState<GoalFormData>({
        title: '',
        category: 'Career',
        horizon: '30 Days',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDropModal, setShowDropModal] = useState(false);
    const [droppingGoalId, setDroppingGoalId] = useState<string | null>(null);
    const [tempDropReason, setTempDropReason] = useState('');

    const fetchGoals = async () => {
        try {
            const res = await axios.get<Goal[]>(`${BACKEND_URL}/goals`);
            const sortedGoals = res.data.sort((a, b) => b._id.localeCompare(a._id));
            setGoals(sortedGoals);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND_URL}/goals`, formData);
            toast.success('Mission Initialized: Objectives set and logged.', {
                style: {
                    background: '#0f0f11',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                icon: '🚀',
            });
            setFormData({ title: '', category: 'Career', horizon: '30 Days' });
            fetchGoals();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create goal');
            toast.error('Initialization Failed: Critical System Error.');
        }
    };

    const updateStatus = async (id: string, status: string, reason?: string) => {
        if (status === 'Dropped' && reason === undefined) {
            setDroppingGoalId(id);
            setTempDropReason('');
            setShowDropModal(true);
            return;
        }

        try {
            await axios.patch(`${BACKEND_URL}/goals/${id}/status`, {
                status,
                dropReason: reason || ''
            });

            if (status === 'Completed') {
                toast.success('Mission Accomplished: Honor Gained.', {
                    style: {
                        background: '#0f0f11',
                        color: '#fff',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                    },
                    icon: '✅',
                });
            } else if (status === 'Dropped') {
                toast.error('Mission Aborted: Logged for Archive.', {
                    style: {
                        background: '#0f0f11',
                        color: '#fff',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                    },
                    icon: '🚨',
                });
            }

            setShowDropModal(false);
            setDroppingGoalId(null);
            setTempDropReason('');
            fetchGoals();
        } catch (err) {
            console.error('Failed to update mission status:', err);
            toast.error('Protocol Update Failed.');
        }
    };

    if (loading) return <PageSkeleton hasHeader hasForm hasCards cardsCount={4} />;

    return (
        <div className="goals-page">
            <div className="bg-gradient"></div>

            <header className="goals-header">
                <h1>MISSION TRACKER</h1>
                <p>Define your horizons. Execute with precision. Master your life.</p>
            </header>

            <GoalForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                error={error}
            />

            <div className="goals-grid">
                {goals.map((goal, index) => (
                    <GoalCard
                        key={goal._id}
                        goal={goal}
                        index={index}
                        onUpdateStatus={updateStatus}
                    />
                ))}
            </div>

            <Modal
                show={showDropModal}
                title="🚨 MISSION ABORTION"
                onClose={() => setShowDropModal(false)}
                footer={
                    <>
                        <button className="btn-cancel" onClick={() => setShowDropModal(false)}>CANCEL</button>
                        <button
                            className="btn-confirm-abort"
                            onClick={() => droppingGoalId && updateStatus(droppingGoalId, 'Dropped', tempDropReason)}
                        >
                            CONFIRM TERMINATION
                        </button>
                    </>
                }
            >
                <p>Are you sure you want to terminate this objective? Document your reasoning for the technical debt archive.</p>
                <textarea
                    className="premium-input"
                    placeholder="State reason for abortion..."
                    value={tempDropReason}
                    onChange={(e) => setTempDropReason(e.target.value)}
                    rows={4}
                    autoFocus
                />
            </Modal>
        </div>
    );
};

export default Goals;
