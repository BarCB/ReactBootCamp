import type { OrderItem } from "../types";

type OrderContentProps = {
    order: OrderItem[];
    removeOrder: (id: OrderItem["id"]) => void;
};

export default function OrderContent({
    order,
    removeOrder,
}: OrderContentProps) {
    return (
        <div className="">
            <div className="space-y-3 mt-5">
                {order.map((orderItem) => (
                    <div
                        key={orderItem.id}
                        className="flex justify-between border-t border-gray-200 py-3 last-of-type:border-b items-center"
                    >
                        <div>
                            <p className="text-lg">
                                {orderItem.name} - {orderItem.price}
                            </p>
                            <p className="font-black">
                                Cantidad: {orderItem.quantity} -{" "}
                                {orderItem.price * orderItem.quantity}
                            </p>
                        </div>
                        <button
                            className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
                            onClick={() => removeOrder(orderItem.id)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
