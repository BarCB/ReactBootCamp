import { useMemo } from "react";
import { OrderItem } from "../types";
import type { OrderActions } from "../reducers/order-reducer";

type OrderTotals = {
    order: OrderItem[];
    tip: number;
    dispatch: React.Dispatch<OrderActions>;
};
export default function OrderTotals({ order, tip, dispatch }: OrderTotals) {
    const subtotalAmount = useMemo(
        () =>
            order.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
        [order]
    );
    const tipAmount = useMemo(
        () => subtotalAmount * tip,
        [tip, subtotalAmount]
    );

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y pripina</h2>
                <p>
                    Subtotal a pagar:
                    <span className="font-bold"> ${subtotalAmount}</span>
                </p>
                <p>
                    Propina: {""}
                    <span className="font-bold">{tipAmount}</span>
                </p>
                <p>
                    Total a pagar:
                    <span className="font-bold">
                        {" "}
                        ${subtotalAmount + tipAmount}
                    </span>
                </p>
            </div>
            <button
                className="w-full bg-black p-3 uppercase text-white font-bold disabled:opacity-10"
                disabled={order.length === 0}
                onClick={() => dispatch({ type: "place-order" })}
            >
                Guardar Orden
            </button>
        </>
    );
}
