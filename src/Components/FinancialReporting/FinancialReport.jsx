import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const FinancialReporting = () => {
    const [dateRange, setDateRange] = useState('lastMonth');
    const [transactions, setTransactions] = useState([
        { id: 1, date: '2024-09-01', description: 'Food Sales', amount: 1200, type: 'Income' },
        { id: 2, date: '2024-09-03', description: 'Supplies Purchase', amount: 300, type: 'Expense' },
        { id: 3, date: '2024-09-10', description: 'Event Sales', amount: 2000, type: 'Income' },
        { id: 4, date: '2024-09-15', description: 'Maintenance', amount: 150, type: 'Expense' },
    ]);

    const [editingTransaction, setEditingTransaction] = useState(null); // Track which transaction is being edited

    // Calculate total revenue and expenses
    const totalRevenue = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenses = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const netProfit = totalRevenue - totalExpenses;

    // Function to download transactions as a CSV
    const downloadCSV = () => {
        const csvRows = [];
        csvRows.push(['Date', 'Description', 'Amount', 'Type'].join(',')); // Header

        transactions.forEach(transaction => {
            csvRows.push([
                transaction.date,
                transaction.description,
                transaction.amount,
                transaction.type,
            ].join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'financial_report.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Function to download transactions as a PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ['Date', 'Description', 'Amount', 'Type'];
        const tableRows = [];

        transactions.forEach(transaction => {
            const transactionData = [
                transaction.date,
                transaction.description,
                `$${transaction.amount.toFixed(2)}`,
                transaction.type,
            ];
            tableRows.push(transactionData);
        });

        doc.text('Financial Report', 14, 15);
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('financial_report.pdf');
    };

    // Function to delete a transaction
    const deleteTransaction = (id) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedTransactions);
    };

    // Function to start editing a transaction
    const startEdit = (transaction) => {
        setEditingTransaction(transaction);
    };

    // Function to save an edited transaction
    const saveEdit = () => {
        const updatedTransactions = transactions.map(transaction => 
            transaction.id === editingTransaction.id ? editingTransaction : transaction
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null); // Exit edit mode
    };

    // Function to handle input changes for the editable row
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingTransaction({ ...editingTransaction, [name]: name === 'amount' ? parseFloat(value) : value });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Financial Reporting</h1>
            <div className="mb-5">
                <label htmlFor="dateRange" className="mr-2 text-gray-700">Date Range:</label>
                <select
                    id="dateRange"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="border rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="lastMonth">Last Month</option>
                    <option value="lastQuarter">Last Quarter</option>
                    <option value="lastYear">Last Year</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <h2 className="font-semibold text-lg text-gray-800">Total Revenue</h2>
                    <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
                </div>
                <div className="bg-red-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <h2 className="font-semibold text-lg text-gray-800">Total Expenses</h2>
                    <p className="text-2xl font-bold text-gray-900">${totalExpenses}</p>
                </div>
                <div className="bg-blue-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <h2 className="font-semibold text-lg text-gray-800">Net Profit</h2>
                    <p className="text-2xl font-bold text-gray-900">${netProfit}</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-2 text-left text-gray-700">Date</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-700">Description</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-700">Amount</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-700">Type</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-100 transition duration-200">
                                {editingTransaction && editingTransaction.id === transaction.id ? (
                                    <>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="date"
                                                value={editingTransaction.date}
                                                onChange={handleInputChange}
                                                className="border p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="description"
                                                value={editingTransaction.description}
                                                onChange={handleInputChange}
                                                className="border p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                name="amount"
                                                value={editingTransaction.amount}
                                                onChange={handleInputChange}
                                                className="border p-1 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <select
                                                name="type"
                                                value={editingTransaction.type}
                                                onChange={handleInputChange}
                                                className="border p-1 rounded"
                                            >
                                                <option value="Income">Income</option>
                                                <option value="Expense">Expense</option>
                                            </select>
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <button onClick={saveEdit} className="text-green-500 hover:underline">
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingTransaction(null)}
                                                className="text-gray-500 hover:underline ml-2"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border border-gray-300 p-2">{transaction.date}</td>
                                        <td className="border border-gray-300 p-2">{transaction.description}</td>
                                        <td className="border border-gray-300 p-2">${transaction.amount}</td>
                                        <td className="border border-gray-300 p-2">{transaction.type}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button
                                                onClick={() => startEdit(transaction)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteTransaction(transaction.id)}
                                                className="text-red-500 hover:underline ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6">
                <button
                    onClick={downloadCSV}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2"
                >
                    Download CSV
                </button>
                <button
                    onClick={downloadPDF}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default FinancialReporting;
