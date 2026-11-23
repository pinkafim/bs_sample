export type ClothingSize = 'S' | 'M' | 'L' | 'XL';

export interface PvzInstance {
  instanceId: string;
  size: ClothingSize;
  pvzId: string;
  pvzAddress: string;
  distanceMeters: number;
  qty: number;
  daysLeftInPvz: number;
  isSellerOwned: boolean;
  defaultPromoted: boolean;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: 'jeans';
  similarityGroup: string;
  colorName: string;
  colorHex: string;
  price: number;
  rating: number;
  reviewsCount: number;
  sizes: ClothingSize[];
  image: string;
  isCrossBorder: boolean;
  regularDeliveryLabel: string;
  pvzStock: PvzInstance[];
}

export interface CatalogManifest {
  products: Product[];
}

export type FulfillmentType = 'pvz_today' | 'warehouse_regular';

export interface CartItem {
  cartKey: string;
  productId: string;
  size: ClothingSize;
  fulfillmentType: FulfillmentType;
  instanceId?: string;
  pvzAddress: string;
  deliveryLabel: string;
  price: number;
}

export type OrderStatus = 'checking_pvz' | 'ready_for_pickup' | 'in_transit';

export interface DemoOrder {
  orderId: string;
  createdAt: string;
  item: CartItem;
  paymentMethod: 'on_receipt' | 'online';
  status: OrderStatus;
}

export type PromoBillingModel = 'subscription' | 'commission';

export type AppMode = 'buyer' | 'seller';
export type BuyerTab = 'catalog' | 'cart' | 'orders';
export type CatalogSubTab = 'all' | 'nearby';
