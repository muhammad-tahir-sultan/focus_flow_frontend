import React, { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { IconSparkles, IconPen, IconHistory, IconBriefcase } from '../components/layout/NavbarIcons';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { PremiumInvoice, PremiumProposal } from '../components/PremiumTemplates';
import './BusinessAutomation.css';

const BusinessAutomation: React.FC = () => {
    const [requirement, setRequirement] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Input, 2: Proposal, 3: Invoice
    const [processedData, setProcessedData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const previewRef = React.useRef<HTMLDivElement>(null);

    const handleProcessRequirement = async () => {
        if (!requirement.trim()) {
            toast.error('Please enter client requirements');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/ai-tool/process-requirement', { requirement });
            setProcessedData(response.data);
            setStep(2);
            toast.success('Strategy & Invoice generated!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to process requirements');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateInvoice = () => {
        setStep(3);
    };


    const exportToPdf = (title: string) => {
        if (!previewRef.current) return;

        const opt = {
            margin: 0.5,
            filename: `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
        };

        const element = previewRef.current;
        element.classList.add('pdf-export-mode');

        html2pdf().set(opt).from(element).save().then(() => {
            element.classList.remove('pdf-export-mode');
            toast.success('PDF exported successfully!');
        });
    };

    return (
        <div className="ba-page">
            <header className="ba-hero">
                <div className="container">
                    <h1><IconSparkles className="ba-hero-icon" /> AI Business Automation</h1>
                    <p className="ba-subtitle">Professional templates generated instantly.</p>
                </div>
            </header>

            <div className="ba-stepper">
                <div className={`ba-step ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                    <span className="ba-step-num">1</span>
                    <span className="ba-step-label">Analysis</span>
                </div>
                <div className="ba-step-line"></div>
                <div className={`ba-step ${step >= 2 ? 'active' : ''}`} onClick={() => processedData && setStep(2)}>
                    <span className="ba-step-num">2</span>
                    <span className="ba-step-label">Proposal</span>
                </div>
                <div className="ba-step-line"></div>
                <div className={`ba-step ${step >= 3 ? 'active' : ''}`} onClick={() => processedData && setStep(3)}>
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
                                <h2>Define Project Scope</h2>
                            </div>
                            <textarea
                                className="ba-textarea"
                                placeholder="Describe the client requirement in detail..."
                                value={requirement}
                                onChange={(e) => setRequirement(e.target.value)}
                            />
                            <button
                                className="ba-primary-btn"
                                onClick={handleProcessRequirement}
                                disabled={loading}
                            >
                                {loading ? 'Thinking...' : 'Generate Premium Assets'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && processedData && (
                    <div className="ba-section animate-fade-in">
                        <div className="ba-card">
                            <div className="ba-card-header">
                                <IconHistory style={{ color: '#a78bfa' }} />
                                <h2>Executive Proposal</h2>
                                <button className="ba-copy-btn" onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? 'Save Changes' : 'Edit Proposal'}
                                </button>
                                <button className="ba-copy-btn" onClick={() => exportToPdf('Proposal')}>Export PDF</button>
                            </div>

                            {isEditing ? (
                                <div className="ba-edit-form">
                                    <div className="ba-form-grid">
                                        <div className="ba-form-group">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                value={processedData.companyName || 'FocusFlow AI'}
                                                onChange={(e) => setProcessedData({ ...processedData, companyName: e.target.value })}
                                            />
                                        </div>
                                        <div className="ba-form-group">
                                            <label>Company Tagline / Role</label>
                                            <input
                                                type="text"
                                                value={processedData.companyRole || 'Automation Excellence'}
                                                onChange={(e) => setProcessedData({ ...processedData, companyRole: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="ba-form-group">
                                        <label>Project Name</label>
                                        <input
                                            type="text"
                                            value={processedData.projectName}
                                            onChange={(e) => setProcessedData({ ...processedData, projectName: e.target.value })}
                                        />
                                    </div>
                                    <div className="ba-form-group">
                                        <label>Client Name</label>
                                        <input
                                            type="text"
                                            value={processedData.clientName}
                                            onChange={(e) => setProcessedData({ ...processedData, clientName: e.target.value })}
                                        />
                                    </div>
                                    <div className="ba-form-group">
                                        <label>Executive Summary</label>
                                        <textarea
                                            value={processedData.summary}
                                            onChange={(e) => setProcessedData({ ...processedData, summary: e.target.value })}
                                        />
                                    </div>
                                    <div className="ba-form-grid">
                                        <div className="ba-form-group">
                                            <label>Timeline</label>
                                            <input
                                                type="text"
                                                value={processedData.proposal.timeline}
                                                onChange={(e) => setProcessedData({
                                                    ...processedData,
                                                    proposal: { ...processedData.proposal, timeline: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="ba-form-group">
                                        <label>Objectives (one per line)</label>
                                        <textarea
                                            value={processedData.proposal.objectives.join('\n')}
                                            onChange={(e) => setProcessedData({
                                                ...processedData,
                                                proposal: { ...processedData.proposal, objectives: e.target.value.split('\n') }
                                            })}
                                        />
                                    </div>
                                    <div className="ba-form-group">
                                        <label>Scope (one per line)</label>
                                        <textarea
                                            value={processedData.proposal.scope.join('\n')}
                                            onChange={(e) => setProcessedData({
                                                ...processedData,
                                                proposal: { ...processedData.proposal, scope: e.target.value.split('\n') }
                                            })}
                                        />
                                    </div>
                                    <div className="ba-form-group">
                                        <label>Deliverables (one per line)</label>
                                        <textarea
                                            value={processedData.proposal.deliverables.join('\n')}
                                            onChange={(e) => setProcessedData({
                                                ...processedData,
                                                proposal: { ...processedData.proposal, deliverables: e.target.value.split('\n') }
                                            })}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="premium-container" ref={previewRef} style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                                    <PremiumProposal data={processedData} />
                                </div>
                            )}

                            <div className="ba-actions" style={{ marginTop: '2rem' }}>
                                <button className="ba-secondary-btn" onClick={() => setStep(1)}>Back</button>
                                {!isEditing && <button className="ba-primary-btn" onClick={handleGenerateInvoice}>Next: Review Invoice</button>}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && processedData && (
                    <div className="ba-section animate-fade-in">
                        <div className="ba-card">
                            <div className="ba-card-header">
                                <IconBriefcase style={{ color: '#FCD34D' }} />
                                <h2>Professional Invoice</h2>
                                <button className="ba-copy-btn" onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? 'Save Changes' : 'Edit Invoice'}
                                </button>
                                <button className="ba-copy-btn" onClick={() => exportToPdf('Invoice')}>Export PDF</button>
                            </div>

                            {isEditing ? (
                                <div className="ba-edit-form">
                                    <div className="ba-form-grid">
                                        <div className="ba-form-group">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                value={processedData.companyName || 'FocusFlow AI'}
                                                onChange={(e) => setProcessedData({ ...processedData, companyName: e.target.value })}
                                            />
                                        </div>
                                        <div className="ba-form-group">
                                            <label>Company Tagline / Role</label>
                                            <input
                                                type="text"
                                                value={processedData.companyRole || 'Automation Excellence'}
                                                onChange={(e) => setProcessedData({ ...processedData, companyRole: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="ba-form-grid">
                                        <div className="ba-form-group">
                                            <label>Invoice Number</label>
                                            <input
                                                type="text"
                                                value={processedData.invoice.invoiceNumber}
                                                onChange={(e) => setProcessedData({
                                                    ...processedData,
                                                    invoice: { ...processedData.invoice, invoiceNumber: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="ba-form-group">
                                            <label>Invoice Date</label>
                                            <input
                                                type="text"
                                                value={processedData.invoice.date}
                                                onChange={(e) => setProcessedData({
                                                    ...processedData,
                                                    invoice: { ...processedData.invoice, date: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="ba-form-group">
                                        <label>Client Name (Billed To)</label>
                                        <input
                                            type="text"
                                            value={processedData.clientName}
                                            onChange={(e) => setProcessedData({ ...processedData, clientName: e.target.value })}
                                        />
                                    </div>
                                    <div className="ba-form-group">
                                        <label>Notes</label>
                                        <textarea
                                            value={processedData.notes}
                                            onChange={(e) => setProcessedData({ ...processedData, notes: e.target.value })}
                                        />
                                    </div>
                                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Line items editing coming soon. Total is automatically calculated in the premium view.</p>
                                </div>
                            ) : (
                                <div className="premium-container" ref={previewRef} style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                                    <PremiumInvoice data={processedData} />
                                </div>
                            )}

                            <div className="ba-actions" style={{ marginTop: '2rem' }}>
                                <button className="ba-secondary-btn" onClick={() => setStep(2)}>Back</button>
                                {!isEditing && <button className="ba-primary-btn" onClick={() => exportToPdf('Invoice')}>Download Final PDF</button>}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {loading && (
                <div className="ba-loading-overlay">
                    <div className="ba-spinner"></div>
                    <p>Building your premium strategy...</p>
                </div>
            )}
        </div>
    );
};

export default BusinessAutomation;
