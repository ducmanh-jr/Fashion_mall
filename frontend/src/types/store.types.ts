/** Store Type Definitions */

export interface StoreProfile {
  id: number;
  storeCode: string;
  brandId: string;
  storeName: string;
  storeType: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  operatingHours: string;
  latitude: number;
  longitude: number;
  services: string[];
  categories: string[];
  imageUrl?: string;
  storeUrl?: string;
}
