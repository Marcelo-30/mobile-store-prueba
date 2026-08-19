import {create} from "zustand";

type CartState ={
    items: Record<number, number>;
    increment: (productId:number)=> void;
    decrement: (productId: number)=> void;
    clearCart:()=> void;
};

export const useCartStore = create<CartState>()(
    function createCartStore(set) {
        return {
            items: {},

            increment: function increment(productId) {
                set(function updateCart(state) {
                    return {
                        items: {
                            ...state.items,
                            [productId]: (state.items[productId] ?? 0) + 1,
                        },
                    };
                });
            },
            decrement: function decrement(productId){
                set(function updateCart(state){
                    const currentQuantity= state.items[productId]??0;

                    if (currentQuantity<=1){
                        const updatedItems={
                            ...state.items,
                        };

                        delete updatedItems[productId];
                        return{
                            items:updatedItems,
                        };
                    }

                    return{
                        items: {
                            ...state.items,
                            [productId]: currentQuantity -1,
                        },
                    };
                });
            },
            clearCart: function clearCart(){
                set({
                    items: {},
                });
            },
        };
    },
);