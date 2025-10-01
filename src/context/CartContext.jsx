import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
    items: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { id, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id);

            if (existingItemIndex > -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += quantity;
                return { ...state, items: updatedItems };
            } else {
                return { ...state, items: [...state.items, action.payload] };
            }
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        }
        case 'UPDATE_QUANTITY': {
             const updatedItems = state.items.map(item =>
                item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            ).filter(item => item.quantity > 0);
            return { ...state, items: updatedItems };
        }
        case 'LOAD_CART': {
            if (action.payload && Array.isArray(action.payload.items)) {
                return action.payload;
            }
            return initialState;
        }
        default:
            return state;
    }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on initial render
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('perfumeCart');
            if (savedCart) {
                dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            // This check prevents overwriting the loaded cart on the initial render
            if (state !== initialState) {
                localStorage.setItem('perfumeCart', JSON.stringify(state));
            }
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [state]);

    return (
        <CartContext.Provider value={{ cart: state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};