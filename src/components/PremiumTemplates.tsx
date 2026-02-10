import React from 'react';
import './PremiumTemplates.css';

interface InvoiceProps {
    data: {
        projectName: string;
        clientName: string;
        companyName?: string;
        companyRole?: string;
        invoice: {
            invoiceNumber: string;
            date: string;
            items: Array<{
                description: string;
                hours: number;
                rate: number;
                total: number;
            }>;
            grandTotal: number;
        };
        notes: string;
    };
}

export const PremiumInvoice: React.FC<InvoiceProps> = ({ data }) => {
    return (
        <div className="premium-invoice">
            <div className="invoice-header">
                <div className="brand-side">
                    <div className="brand-logo">{(data.companyName || 'FF').substring(0, 2).toUpperCase()}</div>
                    <div className="brand-info">
                        <h3>{data.companyName || 'FocusFlow AI'}</h3>
                        <p>{data.companyRole || 'Automation Excellence'}</p>
                    </div>
                </div>
                <div className="bill-info">
                    <h1>INVOICE</h1>
                    <p><strong>Invoice #:</strong> {data.invoice.invoiceNumber}</p>
                    <p><strong>Date:</strong> {data.invoice.date}</p>
                </div>
            </div>

            <div className="client-section">
                <div className="billed-to">
                    <h4>BILLED TO:</h4>
                    <h3>{data.clientName}</h3>
                    <p>Project: {data.projectName}</p>
                </div>
            </div>

            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Hours</th>
                        <th>Rate ($)</th>
                        <th>Total ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.invoice.items.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.description}</td>
                            <td>{item.hours}</td>
                            <td>{item.rate}</td>
                            <td>{item.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="invoice-footer">
                <div className="notes-section">
                    <h4>Notes:</h4>
                    <p>{data.notes}</p>
                </div>
                <div className="total-section">
                    <div className="total-row">
                        <span>Subtotal</span>
                        <span>${data.invoice.grandTotal.toLocaleString()}</span>
                    </div>
                    <div className="total-row grand-total">
                        <span>Grand Total</span>
                        <span>${data.invoice.grandTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ProposalProps {
    data: {
        projectName: string;
        summary: string;
        companyName?: string;
        companyRole?: string;
        proposal: {
            objectives: string[];
            scope: string[];
            timeline: string;
            deliverables: string[];
        };
    };
}

export const PremiumProposal: React.FC<ProposalProps> = ({ data }) => {
    return (
        <div className="premium-proposal">
            <div className="proposal-hero">
                <div className="brand-side" style={{ marginBottom: '20px' }}>
                    <div className="brand-logo">{(data.companyName || 'FF').substring(0, 2).toUpperCase()}</div>
                    <div className="brand-info">
                        <h3 style={{ color: '#64748b', fontSize: '1rem' }}>{data.companyName || 'FocusFlow AI'}</h3>
                    </div>
                </div>
                <div className="hero-tag">Strategy Proposal</div>
                <h1>{data.projectName}</h1>
                <p className="summary-text">{data.summary}</p>
            </div>

            <div className="proposal-grid">
                <section className="proposal-section">
                    <h3>🎯 Objectives</h3>
                    <ul>
                        {data.proposal.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                </section>

                <section className="proposal-section">
                    <h3>📦 Scope of Work</h3>
                    <ul>
                        {data.proposal.scope.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </section>

                <section className="proposal-section">
                    <h3>⏳ Timeline</h3>
                    <p>{data.proposal.timeline}</p>
                </section>

                <section className="proposal-section">
                    <h3>🚀 Key Deliverables</h3>
                    <div className="deliverable-grid">
                        {data.proposal.deliverables.map((del, i) => (
                            <div key={i} className="del-item">{del}</div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
