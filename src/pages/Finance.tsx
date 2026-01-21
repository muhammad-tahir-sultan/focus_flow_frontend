import { useState, useEffect, useMemo } from 'react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { createExpense, getAllExpenses, deleteExpense, getTotalExpenses } from '../api/expenses';
import { createIncome, getAllIncome, deleteIncome, getTotalIncome } from '../api/income';
import { createSaving, getAllSavings, deleteSaving, addContribution, getTotalSavings } from '../api/savings';
import type { Expense, ExpenseFormData, ExpenseCategory, PaymentMethod } from '../types/expenses';
import type { Income, IncomeFormData, IncomeCategory, IncomeSource, Saving, SavingFormData, SavingGoalType } from '../types/finance';
import Loader from '../components/Loader';
import Modal from '../components/common/Modal';
import '../styles/expenses.css';

type TabType = 'expenses' | 'income' | 'savings';

const Finance = () => {
    const [activeTab, setActiveTab] = useState<TabType>('expenses');
    const [loading, setLoading] = useState(true);

    // Expenses State
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expenseFormData, setExpenseFormData] = useState<ExpenseFormData>({
        title: '',
        amount: '',
        category: 'Food & Dining' as ExpenseCategory,
        paymentMethod: 'Cash' as PaymentMethod,
        date: new Date().toISOString().split('T')[0],
        description: '',
        isRecurring: false,
        tags: [],
    });
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [filterExpenseCategory, setFilterExpenseCategory] = useState<string>('All');
    const [filterExpenseStartDate, setFilterExpenseStartDate] = useState<string>('');
    const [filterExpenseEndDate, setFilterExpenseEndDate] = useState<string>('');

    // Income State
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [incomeFormData, setIncomeFormData] = useState<IncomeFormData>({
        title: '',
        amount: '',
        category: 'Salary' as IncomeCategory,
        source: 'Primary Job' as IncomeSource,
        date: new Date().toISOString().split('T')[0],
        description: '',
        isRecurring: false,
        tags: [],
    });
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [filterIncomeStartDate, setFilterIncomeStartDate] = useState<string>('');
    const [filterIncomeEndDate, setFilterIncomeEndDate] = useState<string>('');

    // Savings State
    const [savings, setSavings] = useState<Saving[]>([]);
    const [savingFormData, setSavingFormData] = useState<SavingFormData>({
        title: '',
        targetAmount: '',
        currentAmount: '0',
        goalType: 'Emergency Fund' as SavingGoalType,
        targetDate: '',
        description: '',
        monthlyContribution: '',
        tags: [],
    });
    const [totalSaved, setTotalSaved] = useState<number>(0);

    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteType, setDeleteType] = useState<TabType>('expenses');
    const [showContributeModal, setShowContributeModal] = useState(false);
    const [contributionAmount, setContributionAmount] = useState('');
    const [contributingSavingId, setContributingSavingId] = useState<string | null>(null);

    // Fetch Functions
    const fetchExpenses = async () => {
        try {
            const [data, total] = await Promise.all([getAllExpenses(), getTotalExpenses()]);
            setExpenses(data);
            setTotalExpenses(total);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load expenses');
        }
    };

    const fetchIncome = async () => {
        try {
            const [data, total] = await Promise.all([getAllIncome(), getTotalIncome()]);
            setIncomes(data);
            setTotalIncome(total);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load income');
        }
    };

    const fetchSavings = async () => {
        try {
            const [data, saved] = await Promise.all([
                getAllSavings(),
                getTotalSavings(),
            ]);
            setSavings(data);
            setTotalSaved(saved);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load savings');
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            await Promise.all([fetchExpenses(), fetchIncome(), fetchSavings()]);
            setLoading(false);
        };
        fetchAll();
    }, []);

    // Submit Handlers
    const handleExpenseSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createExpense(expenseFormData);
            toast.success('💰 Expense Logged Successfully');
            setExpenseFormData({
                title: '',
                amount: '',
                category: 'Food & Dining' as ExpenseCategory,
                paymentMethod: 'Cash' as PaymentMethod,
                date: new Date().toISOString().split('T')[0],
                description: '',
                isRecurring: false,
                tags: [],
            });
            fetchExpenses();
        } catch (err) {
            toast.error('Failed to create expense');
        }
    };

    const handleIncomeSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createIncome(incomeFormData);
            toast.success('💵 Income Logged Successfully');
            setIncomeFormData({
                title: '',
                amount: '',
                category: 'Salary' as IncomeCategory,
                source: 'Primary Job' as IncomeSource,
                date: new Date().toISOString().split('T')[0],
                description: '',
                isRecurring: false,
                tags: [],
            });
            fetchIncome();
        } catch (err) {
            toast.error('Failed to create income');
        }
    };

    const handleSavingSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createSaving(savingFormData);
            toast.success('🎯 Saving Goal Created Successfully');
            setSavingFormData({
                title: '',
                targetAmount: '',
                currentAmount: '0',
                goalType: 'Emergency Fund' as SavingGoalType,
                targetDate: '',
                description: '',
                monthlyContribution: '',
                tags: [],
            });
            fetchSavings();
        } catch (err) {
            toast.error('Failed to create saving goal');
        }
    };

    // Delete Handler
    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            if (deleteType === 'expenses') {
                await deleteExpense(deletingId);
                toast.success('🗑️ Expense Deleted');
                fetchExpenses();
            } else if (deleteType === 'income') {
                await deleteIncome(deletingId);
                toast.success('🗑️ Income Deleted');
                fetchIncome();
            } else {
                await deleteSaving(deletingId);
                toast.success('🗑️ Saving Goal Deleted');
                fetchSavings();
            }
            setShowDeleteModal(false);
            setDeletingId(null);
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    // Contribution Handler
    const handleContribution = async () => {
        if (!contributingSavingId || !contributionAmount) return;
        try {
            await addContribution(contributingSavingId, parseFloat(contributionAmount));
            toast.success('💰 Contribution Added Successfully');
            setShowContributeModal(false);
            setContributionAmount('');
            setContributingSavingId(null);
            fetchSavings();
        } catch (err) {
            toast.error('Failed to add contribution');
        }
    };

    // Filter functions
    const filterExpensesByDate = (expense: Expense) => {
        if (!filterExpenseStartDate && !filterExpenseEndDate) return true;
        const expenseDate = new Date(expense.date);
        const startDate = filterExpenseStartDate ? new Date(filterExpenseStartDate) : null;
        const endDate = filterExpenseEndDate ? new Date(filterExpenseEndDate) : null;

        if (startDate && expenseDate < startDate) return false;
        if (endDate && expenseDate > endDate) return false;
        return true;
    };

    const filterIncomesByDate = (income: Income) => {
        if (!filterIncomeStartDate && !filterIncomeEndDate) return true;
        const incomeDate = new Date(income.date);
        const startDate = filterIncomeStartDate ? new Date(filterIncomeStartDate) : null;
        const endDate = filterIncomeEndDate ? new Date(filterIncomeEndDate) : null;

        if (startDate && incomeDate < startDate) return false;
        if (endDate && incomeDate > endDate) return false;
        return true;
    };

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Food & Dining': '🍽️',
            'Transportation': '🚗',
            'Utilities': '💡',
            'Entertainment': '🎮',
            'Healthcare': '⚕️',
            'Education': '📚',
            'Shopping': '🛍️',
            'Housing': '🏠',
            'Investment': '📈',
            'Other': '📦',
            'Salary': '💼',
            'Freelance': '💻',
            'Business': '🏢',
            'Investment Returns': '📊',
            'Rental Income': '🏘️',
            'Bonus': '🎁',
            'Gift': '🎉',
            'Refund': '↩️',
        };
        return icons[category] || '💰';
    };

    const getGoalIcon = (goalType: string) => {
        const icons: Record<string, string> = {
            'Emergency Fund': '🚨',
            'Retirement': '👴',
            'Investment': '📈',
            'Education': '🎓',
            'House/Property': '🏠',
            'Vehicle': '🚗',
            'Vacation': '✈️',
            'Wedding': '💍',
            'Business': '🏢',
            'Other': '🎯',
        };
        return icons[goalType] || '🎯';
    };

    // Chart data computation
    const COLORS = ['#fbbf24', '#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'];

    const expenseCategoryData = useMemo(() => {
        const categoryTotals: Record<string, number> = {};
        expenses.forEach(expense => {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += expense.amount;
        });
        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    }, [expenses]);

    const incomeCategoryData = useMemo(() => {
        const categoryTotals: Record<string, number> = {};
        incomes.forEach(income => {
            if (!categoryTotals[income.category]) {
                categoryTotals[income.category] = 0;
            }
            categoryTotals[income.category] += income.amount;
        });
        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    }, [incomes]);

    const monthlyComparisonData = useMemo(() => {
        const monthlyData: Record<string, { month: string; income: number; expenses: number }> = {};

        // Process expenses
        expenses.forEach(expense => {
            const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            if (!monthlyData[month]) {
                monthlyData[month] = { month, income: 0, expenses: 0 };
            }
            monthlyData[month].expenses += expense.amount;
        });

        // Process income
        incomes.forEach(income => {
            const month = new Date(income.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            if (!monthlyData[month]) {
                monthlyData[month] = { month, income: 0, expenses: 0 };
            }
            monthlyData[month].income += income.amount;
        });

        return Object.values(monthlyData).sort((a, b) => {
            const dateA = new Date(a.month);
            const dateB = new Date(b.month);
            return dateA.getTime() - dateB.getTime();
        }).slice(-6); // Last 6 months
    }, [expenses, incomes]);

    if (loading) return <Loader />;

    const netWorth = totalIncome - totalExpenses + totalSaved;

    return (
        <div className="expenses-page">
            <div className="bg-gradient"></div>

            <header className="expenses-header">
                <h1>💰 FINANCIAL DASHBOARD</h1>
                <p>Track income, expenses, and savings. Master your financial future.</p>
            </header>

            {/* Overall Stats */}
            <div className="stats-dashboard">
                <div className="stat-card total-card">
                    <div className="stat-icon">💵</div>
                    <div className="stat-content">
                        <h3>Total Income</h3>
                        <p className="stat-value">₹{totalIncome.toLocaleString()}</p>
                    </div>
                </div>
                <div className="stat-card count-card">
                    <div className="stat-icon">💸</div>
                    <div className="stat-content">
                        <h3>Total Expenses</h3>
                        <p className="stat-value">₹{totalExpenses.toLocaleString()}</p>
                    </div>
                </div>
                <div className="stat-card avg-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3>Total Savings</h3>
                        <p className="stat-value">₹{totalSaved.toLocaleString()}</p>
                    </div>
                </div>
                <div className="stat-card net-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>Net Worth</h3>
                        <p className="stat-value" style={{ color: netWorth >= 0 ? '#10b981' : '#ef4444' }}>
                            ₹{netWorth.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="finance-tabs">
                <button
                    className={`tab-btn ${activeTab === 'expenses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('expenses')}
                >
                    💸 Expenses
                </button>
                <button
                    className={`tab-btn ${activeTab === 'income' ? 'active' : ''}`}
                    onClick={() => setActiveTab('income')}
                >
                    💵 Income
                </button>
                <button
                    className={`tab-btn ${activeTab === 'savings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('savings')}
                >
                    🎯 Savings
                </button>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
                <h2 className="charts-heading">📊 Financial Analytics</h2>
                <div className="charts-grid">
                    {/* Expense Category Breakdown */}
                    {expenseCategoryData.length > 0 && (
                        <div className="chart-card">
                            <h3>💸 Expenses by Category</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={expenseCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {expenseCategoryData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${(value || 0).toLocaleString()}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Income Category Breakdown */}
                    {incomeCategoryData.length > 0 && (
                        <div className="chart-card">
                            <h3>💵 Income by Category</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={incomeCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {incomeCategoryData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${(value || 0).toLocaleString()}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Monthly Income vs Expenses */}
                    {monthlyComparisonData.length > 0 && (
                        <div className="chart-card chart-card-wide">
                            <h3>📈 Income vs Expenses (Last 6 Months)</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyComparisonData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                                    <YAxis stroke="rgba(255,255,255,0.7)" />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(15, 15, 17, 0.9)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value) => `₹${(value || 0).toLocaleString()}`}
                                    />
                                    <Legend />
                                    <Bar dataKey="income" fill="#3b82f6" name="Income" />
                                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

            {/* Tab Content - Expenses */}
            {activeTab === 'expenses' && (
                <div className="tab-content">
                    {/* Expense Form */}
                    <div className="expense-form-container">
                        <h2>➕ Add New Expense</h2>
                        <form onSubmit={handleExpenseSubmit} className="expense-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="premium-input"
                                        placeholder="e.g., Grocery Shopping"
                                        value={expenseFormData.title}
                                        onChange={(e) => setExpenseFormData({ ...expenseFormData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="premium-input"
                                        placeholder="0.00"
                                        value={expenseFormData.amount}
                                        onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        className="premium-select"
                                        value={expenseFormData.category}
                                        onChange={(e) => setExpenseFormData({ ...expenseFormData, category: e.target.value as ExpenseCategory })}
                                    >
                                        {['Food & Dining', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Shopping', 'Housing', 'Investment', 'Other'].map((cat) => (
                                            <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Payment Method</label>
                                    <select
                                        className="premium-select"
                                        value={expenseFormData.paymentMethod}
                                        onChange={(e) => setExpenseFormData({ ...expenseFormData, paymentMethod: e.target.value as PaymentMethod })}
                                    >
                                        {['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'].map((method) => (
                                            <option key={method} value={method}>{method}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="premium-input"
                                        value={expenseFormData.date}
                                        onChange={(e) => setExpenseFormData({ ...expenseFormData, date: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description (Optional)</label>
                                <textarea
                                    className="premium-input"
                                    placeholder="Add notes..."
                                    value={expenseFormData.description}
                                    onChange={(e) => setExpenseFormData({ ...expenseFormData, description: e.target.value })}
                                    rows={2}
                                />
                            </div>
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={expenseFormData.isRecurring}
                                        onChange={(e) => setExpenseFormData({ ...expenseFormData, isRecurring: e.target.checked })}
                                    />
                                    <span>Recurring Expense</span>
                                </label>
                            </div>
                            <button type="submit" className="btn-submit">💾 LOG EXPENSE</button>
                        </form>
                    </div>

                    {/* Filter */}
                    <div className="filter-section">
                        <div className="filter-group">
                            <label>Filter by Category:</label>
                            <select
                                className="premium-select filter-select"
                                value={filterExpenseCategory}
                                onChange={(e) => setFilterExpenseCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                {['Food & Dining', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Shopping', 'Housing', 'Investment', 'Other'].map((cat) => (
                                    <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>From Date:</label>
                            <input
                                type="date"
                                className="premium-input filter-date"
                                value={filterExpenseStartDate}
                                onChange={(e) => setFilterExpenseStartDate(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <label>To Date:</label>
                            <input
                                type="date"
                                className="premium-input filter-date"
                                value={filterExpenseEndDate}
                                onChange={(e) => setFilterExpenseEndDate(e.target.value)}
                            />
                        </div>
                        {(filterExpenseStartDate || filterExpenseEndDate) && (
                            <button
                                className="btn-clear-filter"
                                onClick={() => {
                                    setFilterExpenseStartDate('');
                                    setFilterExpenseEndDate('');
                                }}
                            >
                                ✕ Clear Dates
                            </button>
                        )}
                    </div>

                    {/* Expenses List */}
                    <div className="expenses-list">
                        <h2>📋 Recent Expenses</h2>
                        {expenses.filter(exp => (filterExpenseCategory === 'All' || exp.category === filterExpenseCategory) && filterExpensesByDate(exp)).length === 0 ? (
                            <div className="empty-state">
                                <p>No expenses found. Start tracking your spending!</p>
                            </div>
                        ) : (
                            <div className="expenses-grid">
                                {expenses.filter(exp => (filterExpenseCategory === 'All' || exp.category === filterExpenseCategory) && filterExpensesByDate(exp)).map((expense) => (
                                    <div key={expense._id} className="expense-card">
                                        <div className="expense-header">
                                            <div className="expense-category-badge">
                                                <span className="category-icon">{getCategoryIcon(expense.category)}</span>
                                                <span>{expense.category}</span>
                                            </div>
                                            {expense.isRecurring && <span className="recurring-badge">🔄 Recurring</span>}
                                        </div>
                                        <h3 className="expense-title">{expense.title}</h3>
                                        <div className="expense-amount">₹{expense.amount.toLocaleString()}</div>
                                        <div className="expense-details">
                                            <div className="detail-item">
                                                <span className="detail-label">Payment:</span>
                                                <span>{expense.paymentMethod}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Date:</span>
                                                <span>{new Date(expense.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        {expense.description && <p className="expense-description">{expense.description}</p>}
                                        <button
                                            className="btn-delete"
                                            onClick={() => {
                                                setDeletingId(expense._id);
                                                setDeleteType('expenses');
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tab Content - Income */}
            {activeTab === 'income' && (
                <div className="tab-content">
                    {/* Income Form */}
                    <div className="expense-form-container">
                        <h2>➕ Add New Income</h2>
                        <form onSubmit={handleIncomeSubmit} className="expense-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="premium-input"
                                        placeholder="e.g., Monthly Salary"
                                        value={incomeFormData.title}
                                        onChange={(e) => setIncomeFormData({ ...incomeFormData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="premium-input"
                                        placeholder="0.00"
                                        value={incomeFormData.amount}
                                        onChange={(e) => setIncomeFormData({ ...incomeFormData, amount: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        className="premium-select"
                                        value={incomeFormData.category}
                                        onChange={(e) => setIncomeFormData({ ...incomeFormData, category: e.target.value as IncomeCategory })}
                                    >
                                        {['Salary', 'Freelance', 'Business', 'Investment Returns', 'Rental Income', 'Bonus', 'Gift', 'Refund', 'Other'].map((cat) => (
                                            <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Source</label>
                                    <select
                                        className="premium-select"
                                        value={incomeFormData.source}
                                        onChange={(e) => setIncomeFormData({ ...incomeFormData, source: e.target.value as IncomeSource })}
                                    >
                                        {['Primary Job', 'Side Hustle', 'Passive Income', 'One-time'].map((source) => (
                                            <option key={source} value={source}>{source}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="premium-input"
                                        value={incomeFormData.date}
                                        onChange={(e) => setIncomeFormData({ ...incomeFormData, date: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description (Optional)</label>
                                <textarea
                                    className="premium-input"
                                    placeholder="Add notes..."
                                    value={incomeFormData.description}
                                    onChange={(e) => setIncomeFormData({ ...incomeFormData, description: e.target.value })}
                                    rows={2}
                                />
                            </div>
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={incomeFormData.isRecurring}
                                        onChange={(e) => setIncomeFormData({ ...incomeFormData, isRecurring: e.target.checked })}
                                    />
                                    <span>Recurring Income</span>
                                </label>
                            </div>
                            <button type="submit" className="btn-submit">💾 LOG INCOME</button>
                        </form>
                    </div>

                    {/* Income Filter */}
                    <div className="filter-section">
                        <div className="filter-group">
                            <label>From Date:</label>
                            <input
                                type="date"
                                className="premium-input filter-date"
                                value={filterIncomeStartDate}
                                onChange={(e) => setFilterIncomeStartDate(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <label>To Date:</label>
                            <input
                                type="date"
                                className="premium-input filter-date"
                                value={filterIncomeEndDate}
                                onChange={(e) => setFilterIncomeEndDate(e.target.value)}
                            />
                        </div>
                        {(filterIncomeStartDate || filterIncomeEndDate) && (
                            <button
                                className="btn-clear-filter"
                                onClick={() => {
                                    setFilterIncomeStartDate('');
                                    setFilterIncomeEndDate('');
                                }}
                            >
                                ✕ Clear Dates
                            </button>
                        )}
                    </div>

                    {/* Income List */}
                    <div className="expenses-list">
                        <h2>📋 Recent Income</h2>
                        {incomes.filter(inc => filterIncomesByDate(inc)).length === 0 ? (
                            <div className="empty-state">
                                <p>No income found. Start tracking your earnings!</p>
                            </div>
                        ) : (
                            <div className="expenses-grid">
                                {incomes.filter(inc => filterIncomesByDate(inc)).map((income) => (
                                    <div key={income._id} className="expense-card income-card">
                                        <div className="expense-header">
                                            <div className="expense-category-badge">
                                                <span className="category-icon">{getCategoryIcon(income.category)}</span>
                                                <span>{income.category}</span>
                                            </div>
                                            {income.isRecurring && <span className="recurring-badge">🔄 Recurring</span>}
                                        </div>
                                        <h3 className="expense-title">{income.title}</h3>
                                        <div className="income-amount">₹{income.amount.toLocaleString()}</div>
                                        <div className="expense-details">
                                            <div className="detail-item">
                                                <span className="detail-label">Source:</span>
                                                <span>{income.source}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Date:</span>
                                                <span>{new Date(income.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        {income.description && <p className="expense-description">{income.description}</p>}
                                        <button
                                            className="btn-delete"
                                            onClick={() => {
                                                setDeletingId(income._id);
                                                setDeleteType('income');
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tab Content - Savings */}
            {activeTab === 'savings' && (
                <div className="tab-content">
                    {/* Savings Form */}
                    <div className="expense-form-container">
                        <h2>➕ Create Saving Goal</h2>
                        <form onSubmit={handleSavingSubmit} className="expense-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Goal Title</label>
                                    <input
                                        type="text"
                                        className="premium-input"
                                        placeholder="e.g., Emergency Fund"
                                        value={savingFormData.title}
                                        onChange={(e) => setSavingFormData({ ...savingFormData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Target Amount (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="premium-input"
                                        placeholder="0.00"
                                        value={savingFormData.targetAmount}
                                        onChange={(e) => setSavingFormData({ ...savingFormData, targetAmount: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Current Amount (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="premium-input"
                                        placeholder="0.00"
                                        value={savingFormData.currentAmount}
                                        onChange={(e) => setSavingFormData({ ...savingFormData, currentAmount: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Monthly Contribution (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="premium-input"
                                        placeholder="0.00"
                                        value={savingFormData.monthlyContribution}
                                        onChange={(e) => setSavingFormData({ ...savingFormData, monthlyContribution: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Goal Type</label>
                                    <select
                                        className="premium-select"
                                        value={savingFormData.goalType}
                                        onChange={(e) => setSavingFormData({ ...savingFormData, goalType: e.target.value as SavingGoalType })}
                                    >
                                        {['Emergency Fund', 'Retirement', 'Investment', 'Education', 'House/Property', 'Vehicle', 'Vacation', 'Wedding', 'Business', 'Other'].map((type) => (
                                            <option key={type} value={type}>{getGoalIcon(type)} {type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Target Date</label>
                                    <input
                                        type="date"
                                        className="premium-input"
                                        value={savingFormData.targetDate}
                                        onChange={(e) => setSavingFormData({ ...savingFormData, targetDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description (Optional)</label>
                                <textarea
                                    className="premium-input"
                                    placeholder="Add notes about this goal..."
                                    value={savingFormData.description}
                                    onChange={(e) => setSavingFormData({ ...savingFormData, description: e.target.value })}
                                    rows={2}
                                />
                            </div>
                            <button type="submit" className="btn-submit">💾 CREATE GOAL</button>
                        </form>
                    </div>

                    {/* Savings List */}
                    <div className="expenses-list">
                        <h2>📋 Saving Goals</h2>
                        {savings.length === 0 ? (
                            <div className="empty-state">
                                <p>No saving goals found. Start planning your financial future!</p>
                            </div>
                        ) : (
                            <div className="expenses-grid">
                                {savings.map((saving) => {
                                    const progress = (saving.currentAmount / saving.targetAmount) * 100;
                                    const isCompleted = saving.status === 'Completed';
                                    return (
                                        <div key={saving._id} className="expense-card saving-card">
                                            <div className="expense-header">
                                                <div className="expense-category-badge">
                                                    <span className="category-icon">{getGoalIcon(saving.goalType)}</span>
                                                    <span>{saving.goalType}</span>
                                                </div>
                                                <span className={`status-badge ${saving.status.toLowerCase().replace(' ', '-')}`}>
                                                    {saving.status}
                                                </span>
                                            </div>
                                            <h3 className="expense-title">{saving.title}</h3>
                                            <div className="saving-progress">
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                                </div>
                                                <p className="progress-text">{progress.toFixed(1)}% Complete</p>
                                            </div>
                                            <div className="expense-details">
                                                <div className="detail-item">
                                                    <span className="detail-label">Current:</span>
                                                    <span>₹{saving.currentAmount.toLocaleString()}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Target:</span>
                                                    <span>₹{saving.targetAmount.toLocaleString()}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Target Date:</span>
                                                    <span>{new Date(saving.targetDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            {saving.description && <p className="expense-description">{saving.description}</p>}
                                            <div className="saving-actions">
                                                {!isCompleted && (
                                                    <button
                                                        className="btn-contribute"
                                                        onClick={() => {
                                                            setContributingSavingId(saving._id);
                                                            setShowContributeModal(true);
                                                        }}
                                                    >
                                                        💰 Add Contribution
                                                    </button>
                                                )}
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => {
                                                        setDeletingId(saving._id);
                                                        setDeleteType('savings');
                                                        setShowDeleteModal(true);
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                title="🗑️ CONFIRM DELETE"
                onClose={() => setShowDeleteModal(false)}
                footer={
                    <>
                        <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                            CANCEL
                        </button>
                        <button className="btn-confirm-delete" onClick={handleDelete}>
                            CONFIRM DELETE
                        </button>
                    </>
                }
            >
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </Modal>

            {/* Contribute Modal */}
            <Modal
                show={showContributeModal}
                title="💰 ADD CONTRIBUTION"
                onClose={() => {
                    setShowContributeModal(false);
                    setContributionAmount('');
                }}
                footer={
                    <>
                        <button className="btn-cancel" onClick={() => {
                            setShowContributeModal(false);
                            setContributionAmount('');
                        }}>
                            CANCEL
                        </button>
                        <button className="btn-confirm-contribute" onClick={handleContribution}>
                            ADD CONTRIBUTION
                        </button>
                    </>
                }
            >
                <div className="form-group">
                    <label>Contribution Amount (₹)</label>
                    <input
                        type="number"
                        step="0.01"
                        className="premium-input"
                        placeholder="0.00"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        autoFocus
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Finance;
