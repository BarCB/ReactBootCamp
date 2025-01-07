import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";
import type { CartItem, Guitar } from "../types";

export default function useCart() {
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(item: Guitar) {
        const cartIndex = cart.findIndex((guitar) => guitar.id === item.id);
        if (cartIndex >= 0) {
            const updatedCart = [...cart];
            updatedCart[cartIndex].quantity++;
            setCart(updatedCart);
        } else {
            const newCartItem: CartItem = { ...item, quantity: 1 };
            setCart([...cart, newCartItem]);
        }
    }

    function removeFromCart(id: Guitar["id"]) {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    }

    function increaseQuantity(id: Guitar["id"]) {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity + 1,
                };
            }

            return guitar;
        });
        setCart(updatedCart);
    }

    function decreaseQuantity(id: Guitar["id"]) {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity - 1,
                };
            }

            return guitar;
        });
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    const isCartEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
        () =>
            cart.reduce((total, item) => total + item.price * item.quantity, 0),
        [cart]
    );

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isCartEmpty,
        cartTotal,
    };
}
