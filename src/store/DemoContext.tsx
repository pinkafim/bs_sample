import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import catalogData from '../data/catalog.json';
import {
  AppMode,
  BuyerTab,
  CartItem,
  CatalogManifest,
  CatalogSubTab,
  ClothingSize,
  DemoOrder,
  Product,
  PromoBillingModel,
  PvzInstance,
} from '../types';

const STORAGE_KEY = 'ozon_nearby_mvp_v2';

interface PersistedState {
  reservedInstanceIds: string[];
  promotedInstanceIds: string[];
  promoBillingModel: PromoBillingModel;
  cart: CartItem[];
  orders: DemoOrder[];
}

interface DemoContextValue {
  products: Product[];
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  buyerTab: BuyerTab;
  setBuyerTab: (tab: BuyerTab) => void;
  catalogSubTab: CatalogSubTab;
  setCatalogSubTab: (tab: CatalogSubTab) => void;
  selectedProductId: string | null;
  selectedSize: ClothingSize;
  openProduct: (productId: string, size?: ClothingSize) => void;
  closeProduct: () => void;
  setSelectedSize: (size: ClothingSize) => void;
  reservedInstanceIds: string[];
  promotedInstanceIds: string[];
  promoBillingModel: PromoBillingModel;
  setPromoBillingModel: (model: PromoBillingModel) => void;
  togglePromoteInstance: (instanceId: string) => void;
  getAvailablePvzStock: (product: Product, size?: ClothingSize) => PvzInstance[];
  isInstancePromoted: (instanceId: string) => boolean;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartKey: string) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  orders: DemoOrder[];
  placeOrder: (paymentMethod: 'on_receipt' | 'online') => void;
  confirmPvzReadiness: (orderId: string) => void;
  resetDemo: () => void;
}

const manifest = catalogData as CatalogManifest;

function getInitialPersisted(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as PersistedState;
    }
  } catch {
    // ignore corrupted storage
  }
  const defaultPromoted = manifest.products.flatMap((p) =>
    p.pvzStock.filter((s) => s.defaultPromoted).map((s) => s.instanceId)
  );
  return {
    reservedInstanceIds: [],
    promotedInstanceIds: defaultPromoted,
    promoBillingModel: 'commission',
    cart: [],
    orders: [],
  };
}

const DemoContext = createContext<DemoContextValue | null>(null);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persisted, setPersisted] = useState<PersistedState>(getInitialPersisted);
  const [mode, setMode] = useState<AppMode>('buyer');
  const [buyerTab, setBuyerTab] = useState<BuyerTab>('catalog');
  const [catalogSubTab, setCatalogSubTab] = useState<CatalogSubTab>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ClothingSize>('M');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // ignore storage quota errors
    }
  }, [persisted]);

  const openProduct = (productId: string, size?: ClothingSize) => {
    const prod = manifest.products.find((p) => p.id === productId);
    setSelectedProductId(productId);
    setMode('buyer');
    setBuyerTab('catalog');
    setCheckoutOpen(false);
    if (size) {
      setSelectedSize(size);
    } else if (prod && !prod.sizes.includes(selectedSize)) {
      setSelectedSize(prod.sizes[0] ?? 'M');
    }
  };

  const closeProduct = () => setSelectedProductId(null);

  const getAvailablePvzStock = (product: Product, size?: ClothingSize): PvzInstance[] => {
    return product.pvzStock.filter((inst) => {
      if (persisted.reservedInstanceIds.includes(inst.instanceId)) return false;
      if (size && inst.size !== size) return false;
      return inst.qty > 0;
    });
  };

  const isInstancePromoted = (instanceId: string) =>
    persisted.promotedInstanceIds.includes(instanceId);

  const togglePromoteInstance = (instanceId: string) => {
    setPersisted((prev) => {
      const exists = prev.promotedInstanceIds.includes(instanceId);
      return {
        ...prev,
        promotedInstanceIds: exists
          ? prev.promotedInstanceIds.filter((id) => id !== instanceId)
          : [...prev.promotedInstanceIds, instanceId],
      };
    });
  };

  const setPromoBillingModel = (model: PromoBillingModel) => {
    setPersisted((prev) => ({ ...prev, promoBillingModel: model }));
  };

  const addToCart = (item: CartItem) => {
    setPersisted((prev) => {
      const filtered = prev.cart.filter((c) => c.cartKey !== item.cartKey);
      return { ...prev, cart: [...filtered, item] };
    });
  };

  const removeFromCart = (cartKey: string) => {
    setPersisted((prev) => ({
      ...prev,
      cart: prev.cart.filter((c) => c.cartKey !== cartKey),
    }));
  };

  const placeOrder = (paymentMethod: 'on_receipt' | 'online') => {
    setPersisted((prev) => {
      if (prev.cart.length === 0) return prev;
      const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      const newOrders: DemoOrder[] = prev.cart.map((item, idx) => ({
        orderId: `OZ-${Math.floor(100000 + Math.random() * 900000)}-${idx + 1}`,
        createdAt: now,
        item,
        paymentMethod,
        status: item.fulfillmentType === 'pvz_today' ? 'checking_pvz' : 'in_transit',
      }));
      const newlyReserved = prev.cart
        .map((c) => c.instanceId)
        .filter((id): id is string => Boolean(id));

      return {
        ...prev,
        reservedInstanceIds: Array.from(new Set([...prev.reservedInstanceIds, ...newlyReserved])),
        cart: [],
        orders: [...newOrders, ...prev.orders],
      };
    });
    setCheckoutOpen(false);
    setSelectedProductId(null);
    setBuyerTab('orders');
  };

  const confirmPvzReadiness = (orderId: string) => {
    setPersisted((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.orderId === orderId ? { ...o, status: 'ready_for_pickup' } : o
      ),
    }));
  };

  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPersisted({
      reservedInstanceIds: [],
      promotedInstanceIds: [],
      promoBillingModel: 'commission',
      cart: [],
      orders: [],
    });
    setSelectedProductId(null);
    setCheckoutOpen(false);
    setCatalogSubTab('all');
    setBuyerTab('catalog');
    setSelectedSize('M');
  };

  const value = useMemo<DemoContextValue>(
    () => ({
      products: manifest.products,
      mode,
      setMode,
      buyerTab,
      setBuyerTab,
      catalogSubTab,
      setCatalogSubTab,
      selectedProductId,
      selectedSize,
      openProduct,
      closeProduct,
      setSelectedSize,
      reservedInstanceIds: persisted.reservedInstanceIds,
      promotedInstanceIds: persisted.promotedInstanceIds,
      promoBillingModel: persisted.promoBillingModel,
      setPromoBillingModel,
      togglePromoteInstance,
      getAvailablePvzStock,
      isInstancePromoted,
      cart: persisted.cart,
      addToCart,
      removeFromCart,
      checkoutOpen,
      setCheckoutOpen,
      orders: persisted.orders,
      placeOrder,
      confirmPvzReadiness,
      resetDemo,
    }),
    [persisted, mode, buyerTab, catalogSubTab, selectedProductId, selectedSize, checkoutOpen]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used inside DemoProvider');
  return ctx;
}
