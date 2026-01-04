"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of a Cart Item
export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

// Define the Context Type
type CartContextType = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    updatePrice: (id: string, price: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Add Item to Cart
    const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...newItem, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart when adding item
    };

    // Remove Item from Cart
    const removeFromCart = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Update Item Quantity
    const updateQuantity = (id: string, quantity: number) => {
        setItems((prevItems) => {
            if (quantity <= 0) {
                return prevItems.filter((item) => item.id !== id);
            }
            return prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );
        });
    };

    // Update Item Price
    const updatePrice = (id: string, price: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, price: Math.max(0, price) } : item
            )
        );
    };

    // Clear Cart
    const clearCart = () => {
        setItems([]);
    };

    // Derived State
    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                updatePrice,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
