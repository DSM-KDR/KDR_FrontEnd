export interface ProductCreateRequestType {
  name: string;
  image: string;
  category: string[] | number[];
  capacity: number;
  description: string;
  price: number;
  origin: string;
}
