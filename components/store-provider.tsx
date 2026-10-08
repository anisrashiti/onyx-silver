"use client";

import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { productById, type Category, type Product } from "@/lib/products";

export type CartLine = { id: string; option: string; quantity: number };
export type Panel = { kind: "bag" | "wishlist" | "search" | "menu" } | { kind: "catalog"; category: Category; title?: string } | { kind: "info"; title: string } | { kind: "product"; id: string };
type StoreState = { cart: CartLine[]; wishlist: string[]; ready: boolean };
type Action = { type: "hydrate"; cart: CartLine[]; wishlist: string[] } | { type: "save"; id: string } | { type: "add"; id: string; option: string } | { type: "quantity"; id: string; option: string; quantity: number };

function reducer(state: StoreState, action: Action): StoreState {
  if (action.type === "hydrate") return { ...action, ready: true };
  if (action.type === "save") return { ...state, wishlist: state.wishlist.includes(action.id) ? state.wishlist.filter((id) => id !== action.id) : [...state.wishlist, action.id] };
  if (action.type === "add") {
    const existing = state.cart.find((line) => line.id === action.id && line.option === action.option);
    return { ...state, cart: existing ? state.cart.map((line) => line === existing ? { ...line, quantity: Math.min(20, line.quantity + 1) } : line) : [...state.cart, { id: action.id, option: action.option, quantity: 1 }] };
  }
  return { ...state, cart: state.cart.flatMap((line) => line.id === action.id && line.option === action.option ? action.quantity > 0 ? [{ ...line, quantity: Math.min(20, action.quantity) }] : [] : [line]) };
}

type Store = StoreState & {
  panel: Panel | null;
  open: (panel: Panel) => void;
  close: () => void;
  toggleWishlist: (id: string) => void;
  add: (product: Product, option?: string) => void;
  quantity: (line: CartLine, quantity: number) => void;
};

const StoreContext = createContext<Store | null>(null);
const storageKey = "onyx-prototype-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { cart: [], wishlist: [], ready: false });
  const [panel, setPanel] = useState<Panel | null>(null);

  useEffect(() => {
    let cart: CartLine[] = [];
    let wishlist: string[] = [];
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "{}");
      if (Array.isArray(value.wishlist)) wishlist = [...new Set<string>(value.wishlist.filter((id: unknown) => typeof id === "string" && productById(id)))];
      if (Array.isArray(value.cart)) cart = value.cart.filter((line: CartLine) => {
        if (!line || typeof line.id !== "string") return false;
        const product = productById(line.id);
        return product && typeof line.option === "string" && (product.options ? product.options.includes(line.option) : line.option === "") && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 20;
      });
    } catch { /* The prototype also works when browser storage is unavailable. */ }
    dispatch({ type: "hydrate", cart, wishlist });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    try { localStorage.setItem(storageKey, JSON.stringify({ cart: state.cart, wishlist: state.wishlist })); } catch { /* In-memory shopping remains available. */ }
  }, [state]);

  function add(product: Product, option = "") {
    if (product.options && !product.options.includes(option)) {
      setPanel({ kind: "product", id: product.id });
      return;
    }
    dispatch({ type: "add", id: product.id, option });
    setPanel({ kind: "bag" });
  }

  return <StoreContext.Provider value={{ ...state, panel, open: setPanel, close: () => setPanel(null), toggleWishlist: (id) => dispatch({ type: "save", id }), add, quantity: (line, quantity) => dispatch({ type: "quantity", id: line.id, option: line.option, quantity }) }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store components require StoreProvider.");
  return store;
}
