import { MenuItem, OrderItem } from "../types";

export type OrderActions =
    | { type: "add-item"; payload: { item: MenuItem } }
    | { type: "remove-item"; payload: { id: OrderItem["id"] } }
    | { type: "place-order" }
    | { type: "add-tip"; payload: { value: number } };

export type OrderState = {
    order: OrderItem[];
    tip: number;
};

export const initialState = {
    order: [],
    tip: 0,
};

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) => {
    if (action.type === "add-item") {

        const foundOrder = state.order.find(
            (orderItem) => orderItem.id === action.payload.item.id
        );
    
        let updatedOrder: OrderItem[] = []
        if (foundOrder) {
            updatedOrder = state.order.map((orderItem) =>
                orderItem.id === action.payload.item.id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            );
            
        } else {
            const newOrderItem = { ...action.payload.item, quantity: 1 };
            updatedOrder = [...state.order, newOrderItem];
        }

        return { ...state, order: updatedOrder };
    }

    if (action.type === "remove-item") {
        return { ...state, order: state.order.filter(order => order.id !== action.payload.id) };
    }

    if (action.type === "place-order") {
        return { ...state, order: [], tip: 0 };
    }

    if (action.type === "add-tip") {
        return { ...state, tip: action.payload.value };
    }

    return { ...state };
};
