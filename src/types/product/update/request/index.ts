export interface ProductUpdateRequestType {
  id: number;
  name: string;
  image: string;
  category: number[];
  capacity: number;
  description: string;
  price: number;
  origin: string;
}
