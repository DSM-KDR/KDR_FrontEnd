export interface ShortenedProductType {
  id: number;
  image: string;
  name: string;
}

export interface ProductLoadListResponseType {
  totalPage: number;
  productResponses: ShortenedProductType[];
}
