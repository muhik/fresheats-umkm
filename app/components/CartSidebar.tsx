"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
    const { items, removeFromCart, updateQuantity, updatePrice, clearCart, isCartOpen, setIsCartOpen, cartTotal } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = React.useState(false);
    const [editingPriceId, setEditingPriceId] = React.useState<string | null>(null);
    const [tempPrice, setTempPrice] = React.useState<string>('');

    // Reset checkout state when cart opens/closes
    React.useEffect(() => {
        if (isCartOpen) {
            setIsCheckingOut(false);
            setEditingPriceId(null);
        }
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    const handlePriceClick = (item: { id: string; price: number }) => {
        setEditingPriceId(item.id);
        setTempPrice(item.price.toString());
    };

    const handlePriceChange = (value: string) => {
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        setTempPrice(numericValue);
    };

    const handlePriceBlur = (itemId: string) => {
        const newPrice = parseInt(tempPrice) || 0;
        updatePrice(itemId, newPrice);
        setEditingPriceId(null);
    };

    const handlePriceKeyDown = (e: React.KeyboardEvent, itemId: string) => {
        if (e.key === 'Enter') {
            handlePriceBlur(itemId);
        } else if (e.key === 'Escape') {
            setEditingPriceId(null);
        }
    };

    const handleCheckout = async () => {
        if (isCheckingOut) return; // Prevent double-click
        setIsCheckingOut(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: items,
                    total: cartTotal,
                }),
            });

            if (response.ok) {
                clearCart();
                setIsCartOpen(false);
                setIsCheckingOut(false);
                router.push('/transactions');
            } else {
                alert('Checkout gagal. Silakan coba lagi.');
                setIsCheckingOut(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
            setIsCheckingOut(false);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-[#1a2e1a] z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out font-sans animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-[#111811] dark:text-white">Keranjang</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <span className="material-symbols-outlined text-6xl mb-4">shopping_cart_off</span>
                            <p>Keranjangmu masih kosong</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-3 bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-gray-800 p-3 rounded-lg shadow-sm">
                                {/* Image */}
                                <div
                                    className="w-20 h-20 rounded-md bg-cover bg-center shrink-0"
                                    style={{ backgroundImage: `url('${item.image}')` }}
                                />

                                {/* Details */}
                                <div className="flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-[#111811] dark:text-white line-clamp-2 leading-tight">
                                            {item.name}
                                        </h3>
                                        {editingPriceId === item.id ? (
                                            <div className="flex items-center gap-1 mt-1">
                                                <span className="text-sm text-primary font-bold">Rp</span>
                                                <input
                                                    type="text"
                                                    value={tempPrice}
                                                    onChange={(e) => handlePriceChange(e.target.value)}
                                                    onBlur={() => handlePriceBlur(item.id)}
                                                    onKeyDown={(e) => handlePriceKeyDown(e, item.id)}
                                                    className="w-24 px-2 py-1 text-sm font-bold text-primary border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                                    autoFocus
                                                />
                                            </div>
                                        ) : (
                                            <p
                                                onClick={() => handlePriceClick(item)}
                                                className="text-sm font-bold text-primary mt-1 cursor-pointer hover:underline"
                                                title="Klik untuk edit harga"
                                            >
                                                Rp {item.price.toLocaleString('id-ID')}
                                            </p>
                                        )}
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-green-600 disabled:opacity-50"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-xs font-bold text-[#111811] dark:text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-green-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Summary */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a2e1a]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Total Harga</span>
                            <span className="text-xl font-bold text-[#111811] dark:text-white">
                                Rp {cartTotal.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full h-12 bg-primary hover:bg-green-400 text-[#111811] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCheckingOut ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-[#111811] border-t-transparent rounded-full animate-spin"></span>
                                    Processing...
                                </>
                            ) : (
                                `Beli (${items.reduce((acc, item) => acc + item.quantity, 0)})`
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
