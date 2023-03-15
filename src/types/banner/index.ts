export interface BannerType {
  id: number;
  image: string;
  to: number;
}

export interface BannerListAtomType {
  currentIndex: number;
  bannerResponses: BannerType[];
}
