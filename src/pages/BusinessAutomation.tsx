import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { IconSparkles, IconPen, IconHistory, IconBriefcase } from '../components/layout/NavbarIcons';
import './BusinessAutomation.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const BusinessAutomation: React.FC = () => {
    const [requirement, setRequirement] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Input, 2: Proposal, 3: Invoice
    const [processedData, setProcessedData] = useState<any>(null);
    const [proposal, setProposal] = useState('');
    const [invoice, setInvoice] = useState('');

    const handleProcessRequirement = async () => {
        if (!requirement.trim()) {
            toast.error('Please enter client requirements');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/ai-tool/process-requirement`,
                { requirement },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProcessedData(response.data);
            setStep(2);
            toast.success('Requirements analyzed!');

            // Automatically generate proposal
            generateProposal(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to process requirements');
        } finally {
            setLoading(false);
        }
    };

    const generateProposal = async (data: any) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/ai-tool/generate-proposal`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProposal(response.data.proposal);
        } catch (error) {
            toast.error('Failed to generate proposal');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateInvoice = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/ai-tool/generate-invoice`,
                processedData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInvoice(response.data.invoice);
            setStep(3);
            toast.success('Invoice generated!');
        } catch (error) {
            toast.error('Failed to generate invoice');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="ba-page">
            <header className="ba-hero">
                <div className="container">
                    <h1><IconSparkles className="ba-hero-icon" /> AI Business Automation</h1>
                    <p className="ba-subtitle">From Requirement to Invoice in seconds.</p>
                </div>
            </header>

            <div className="ba-stepper">
                <div className={`ba-step ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                    <span className="ba-step-num">1</span>
                    <span className="ba-step-label">Requirement</span>
                </div>
                <div className="ba-step-line"></div>
                <div className={`ba-step ${step >= 2 ? 'active' : ''}`} onClick={() => processedData && setStep(2)}>
                    <span className="ba-step-num">2</span>
                    <span className="ba-step-label">Proposal</span>
                </div>
                <div className="ba-step-line"></div>
                <div className={`ba-step ${step >= 3 ? 'active' : ''}`} onClick={() => invoice && setStep(3)}>
                    <span className="ba-step-num">3</span>
                    <span className="ba-step-label">Invoice</span>
                </div>
            </div>

            <main className="ba-content container">
                {step === 1 && (
                    <div className="ba-section animate-fade-in">
                        <div className="ba-card">
                            <div className="ba-card-header">
                                <IconPen style={{ color: '#60a5fa' }} />
                                <h2>Paste Client Requirements</h2>
                            </div>
                            <textarea
                                className="ba-textarea"
                                placeholder="Example: Need a full-stack developer to build a SaaS for tracking fitness goals. Must include auth, dashboard, and Stripe integration..."
                                value={requirement}
                                onChange={(e) => setRequirement(e.target.value)}
                            />
                            <button
                                className="ba-primary-btn"
                                onClick={handleProcessRequirement}
                                disabled={loading}
                            >
                                {loading ? 'Analyzing...' : 'Process Requirement'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && proposal && (
                    <div className="ba-section animate-fade-in">
                        <div className="ba-card">
                            <div className="ba-card-header">
                                <IconHistory style={{ color: '#a78bfa' }} />
                                <h2>Generated Proposal</h2>
                                <button className="ba-copy-btn" onClick={() => copyToClipboard(proposal)}>Copy</button>
                            </div>
                            <div className="ba-markdown-preview">
                                <ReactMarkdown>{proposal}</ReactMarkdown>
                            </div>
                            <div className="ba-actions">
                                <button className="ba-secondary-btn" onClick={() => setStep(1)}>Back</button>
                                <button className="ba-primary-btn" onClick={handleGenerateInvoice}>Next: Generate Invoice</button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && invoice && (
                    <div className="ba-section animate-fade-in">
                        <div className="ba-card">
                            <div className="ba-card-header">
                                <IconBriefcase style={{ color: '#FCD34D' }} />
                                <h2>Generated Invoice</h2>
                                <button className="ba-copy-btn" onClick={() => copyToClipboard(invoice)}>Copy</button>
                            </div>
                            <div className="ba-markdown-preview">
                                <ReactMarkdown>{invoice}</ReactMarkdown>
                            </div>
                            <div className="ba-actions">
                                <button className="ba-secondary-btn" onClick={() => setStep(2)}>Back</button>
                                <button className="ba-primary-btn" onClick={() => toast.success('Logic for exporting PDF coming soon!')}>Export as PDF</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {loading && (
                <div className="ba-loading-overlay">
                    <div className="ba-spinner"></div>
                    <p>AI is thinking...</p>
                </div>
            )}
        </div>
    );
};

export default BusinessAutomation;
