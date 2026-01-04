"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type TransactionItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
};

type Transaction = {
    id: string;
    date: string;
    total: number;
    items: TransactionItem[];
};

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [totalSales, setTotalSales] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (dateFrom) params.append('from', dateFrom);
        if (dateTo) params.append('to', dateTo);
        params.append('page', currentPage.toString());
        params.append('limit', itemsPerPage.toString());

        fetch(`/api/transactions?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.transactions) {
                    setTransactions(data.transactions);
                    setTotalSales(data.totalSales || 0);
                    setTotalTransactions(data.totalTransactions || 0);
                } else if (Array.isArray(data)) {
                    setTransactions(data);
                    setTotalSales(data.reduce((sum: number, t: Transaction) => sum + t.total, 0));
                    setTotalTransactions(data.length);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [dateFrom, dateTo, currentPage, refreshTrigger]);

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus transaksi ini?')) return;

        setDeletingId(id);
        try {
            const response = await fetch(`/api/transactions?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setRefreshTrigger(prev => prev + 1);
            } else {
                alert('Gagal menghapus transaksi');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Terjadi kesalahan');
        } finally {
            setDeletingId(null);
        }
    };

    const totalPages = Math.ceil(totalTransactions / itemsPerPage);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('id-ID', {
            dateStyle: 'full',
            timeStyle: 'short'
        });
    };

    const handleReset = () => {
        setDateFrom('');
        setDateTo('');
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111811] dark:text-white font-sans p-6 md:p-10">
            {/* Header */}
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black mb-2">Riwayat Transaksi</h1>
                    <p className="text-gray-500 dark:text-gray-400">Semua pesanan yang telah berhasil dibuat.</p>
                </div>
                <Link href="/" className="flex items-center gap-2 bg-white dark:bg-[#1a2e1a] px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all font-bold text-sm border border-gray-100 dark:border-gray-800 w-fit">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Menu
                </Link>
            </div>

            {/* Summary Cards & Date Filter */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Total Sales Card */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-3xl opacity-80">payments</span>
                        <span className="text-sm font-medium opacity-90">Total Penjualan</span>
                    </div>
                    <p className="text-3xl font-black">Rp {totalSales.toLocaleString('id-ID')}</p>
                </div>

                {/* Total Transactions Card */}
                <div className="bg-white dark:bg-[#1a2e1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-3xl text-primary">receipt_long</span>
                        <span className="text-sm font-medium text-gray-500">Jumlah Transaksi</span>
                    </div>
                    <p className="text-3xl font-black">{totalTransactions}</p>
                </div>

                {/* Date Filter */}
                <div className="bg-white dark:bg-[#1a2e1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-2xl text-primary">calendar_month</span>
                        <span className="text-sm font-medium text-gray-500">Filter Tanggal</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-400 w-10">Dari</label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111d11] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-400 w-10">Sampai</label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111d11] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        {(dateFrom || dateTo) && (
                            <button
                                onClick={handleReset}
                                className="mt-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 transition-colors text-center"
                            >
                                Reset Filter
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : transactions.length === 0 ? (
                <div className="max-w-5xl mx-auto text-center py-20 bg-white dark:bg-[#1a2e1a] rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">receipt_long</span>
                    <h3 className="text-xl font-bold mb-2">
                        {(dateFrom || dateTo) ? 'Tidak ada transaksi pada rentang tanggal ini' : 'Belum ada transaksi'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {(dateFrom || dateTo) ? 'Coba pilih tanggal lain atau reset filter.' : 'Pesan makanan enak sekarang yuk!'}
                    </p>
                    {!(dateFrom || dateTo) && (
                        <Link href="/" className="inline-block bg-primary text-[#111811] px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition-colors">
                            Pesan Sekarang
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    <div className="max-w-5xl mx-auto mb-4 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                            Menampilkan {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalTransactions)} dari {totalTransactions} transaksi
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto grid gap-4">
                        {transactions.map((trx, index) => (
                            <div key={trx.id} className="bg-white dark:bg-[#1a2e1a] rounded-2xl p-5 shadow-lg shadow-green-900/5 border border-gray-100 dark:border-gray-800">
                                {/* Card Header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 mb-3 gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                            {((currentPage - 1) * itemsPerPage) + index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{trx.id}</h3>
                                            <p className="text-xs text-gray-400">{formatDate(trx.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Total</p>
                                            <p className="text-lg font-black text-primary">Rp {trx.total.toLocaleString('id-ID')}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(trx.id)}
                                            disabled={deletingId === trx.id}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                                            title="Hapus transaksi"
                                        >
                                            {deletingId === trx.id ? (
                                                <span className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin inline-block"></span>
                                            ) : (
                                                <span className="material-symbols-outlined">delete</span>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div className="bg-gray-50 dark:bg-[#111d11] rounded-xl p-3">
                                    <table className="w-full text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                                                <th className="pb-2 font-medium">Item</th>
                                                <th className="pb-2 font-medium text-center">Qty</th>
                                                <th className="pb-2 font-medium text-right">Harga</th>
                                                <th className="pb-2 font-medium text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trx.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="py-2 font-bold text-[#111811] dark:text-white">{item.name}</td>
                                                    <td className="py-2 text-center text-gray-600 dark:text-gray-300">x{item.quantity}</td>
                                                    <td className="py-2 text-right text-gray-600 dark:text-gray-300">{item.price.toLocaleString('id-ID')}</td>
                                                    <td className="py-2 text-right font-bold text-[#111811] dark:text-white">{item.subtotal.toLocaleString('id-ID')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="max-w-5xl mx-auto mt-6 flex justify-center items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-white dark:bg-[#1a2e1a] border border-gray-200 dark:border-gray-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#111d11] transition-colors"
                            >
                                ← Prev
                            </button>
                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${currentPage === page
                                            ? 'bg-primary text-[#111811]'
                                            : 'bg-white dark:bg-[#1a2e1a] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#111d11]'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg bg-white dark:bg-[#1a2e1a] border border-gray-200 dark:border-gray-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#111d11] transition-colors"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
