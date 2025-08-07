import { create } from "zustand";
import { persist } from 'zustand/middleware';

type Cart  = {
    idProduct: string
    productName: string
    color: string
    size: string
    price: string
    quantity: number
    image: string 
}

type CartStore = {
    carrito: Cart[]
    addCart: (item: Omit<Cart, 'quantity'>) => void
    deleteCart: (idProduct: string, size: string) => void
}

export const useCartStore = create<CartStore> () (
    persist (
        (set) => ({
            carrito: [],
            addCart: (newItem) =>
                set((state) => {
                    const existingIndex = state.carrito.findIndex(
                        (item) =>
                            item.idProduct === newItem.idProduct &&
                            item.size === newItem.size &&
                            item.color === newItem.color
                    );

                    if (existingIndex !== -1) {
                        const updatedCarrito = [...state.carrito];
                        updatedCarrito[existingIndex].quantity += 1;
                        return { carrito: updatedCarrito };
                    }

                    return {
                        carrito: [
                            ...state.carrito,
                            { ...newItem, quantity: 1 }
                        ]
                    };
            }),
            deleteCart: (idProduct, size) =>
                set((state) => ({
                    carrito: state.carrito.filter(
                        (item) => !(item.idProduct === idProduct && item.size === size)
                )
            })),
        }),
        {
            name: 'cart-storage',
        }
    )
)