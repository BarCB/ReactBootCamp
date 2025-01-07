import { useState } from "react";
import { MenuItem, OrderItem } from "../types";

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tip, setTip] = useState(0);

    const addItem = (menuItem: MenuItem) => {
        const foundOrder = order.find(
            (orderItem) => orderItem.id === menuItem.id
        );

        if (foundOrder) {
            const updatedOrder = order.map((orderItem) =>
                orderItem.id === menuItem.id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            );
            setOrder(updatedOrder);
        } else {
            const newOrderItem = { ...menuItem, quantity: 1 };
            setOrder([...order, newOrderItem]);
        }
    };

    const removeOrder = (id: OrderItem["id"]) => {
        setOrder((prevOrder) => prevOrder.filter((order) => order.id !== id));
    };

    const placeOrder = () => {
        console.log("Guardando")
        setOrder([])
        setTip(0)
    }

    return {
        order,
        addItem,
        removeOrder,
        tip,
        setTip,
        placeOrder
    };
}
