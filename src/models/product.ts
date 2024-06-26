export interface Product {
  id: number;
  sku: string;
  thumbnailUrl: string;
  unlimited: boolean;
  inStock: boolean;
  name: string;
  price: number;
  priceInProductList: number;
  defaultDisplayedPrice: number;
  defaultDisplayedPriceFormatted: string;
  tax: Tax;
  lowestPriceSettings: LowestPriceSettings;
  isShippingRequired: boolean;
  hasFreeShipping: boolean;
  url: string;
  autogeneratedSlug: string;
  customSlug: string;
  created: string;
  updated: string;
  createTimestamp: number;
  updateTimestamp: number;
  productClassId: number;
  enabled: boolean;
  options: Option[];
  fixedShippingRateOnly: boolean;
  fixedShippingRate: number;
  shipping: Shipping;
  defaultCombinationId: number;
  imageUrl: string;
  smallThumbnailUrl: string;
  hdThumbnailUrl: string;
  originalImageUrl: string;
  originalImage: OriginalImage;
  borderInfo: BorderInfo;
  description: string;
  galleryImages: GalleryImage[];
  media: Media;
  categoryIds: number[];
  categories: ProductCategory[];
  defaultCategoryId: number;
  seoTitle: string;
  seoDescription: string;
  attributes: any[];
  relatedProducts: RelatedProducts;
  combinations: any[];
  dimensions: Dimensions;
  volume: number;
  showOnFrontpage: number;
  isSampleProduct: boolean;
  googleItemCondition: string;
  isGiftCard: boolean;
  discountsAllowed: boolean;
  nameYourPriceEnabled: boolean;
}
export interface CartProduct extends Product {
  quantity: number;
  totalPrice: number;
}

export interface BorderInfo {
  dominatingColor: DominatingColor;
  homogeneity: boolean;
}

export interface DominatingColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface ProductCategory {
  id: number;
  enabled: boolean;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface GalleryImage {
  id: number;
  url: string;
  thumbnail: string;
  originalImageUrl: string;
  imageUrl: string;
  hdThumbnailUrl: string;
  thumbnailUrl: string;
  smallThumbnailUrl: string;
  width: number;
  height: number;
  orderBy: number;
  borderInfo: BorderInfo;
}

export interface LowestPriceSettings {
  lowestPriceEnabled: boolean;
}

export interface Media {
  images: Image[];
  videos: any[];
}

export interface Image {
  id: string;
  isMain: boolean;
  orderBy: number;
  image160pxUrl: string;
  image400pxUrl: string;
  image800pxUrl: string;
  image1500pxUrl: string;
  imageOriginalUrl: string;
}

export interface Option {
  type: string;
  name: string;
  nameTranslated: Translated;
  choices: Choice[];
  defaultChoice: number;
  required: boolean;
}

export interface Choice {
  text: string;
  textTranslated: Translated;
  priceModifier: number;
  priceModifierType: string;
}

export interface Translated {
  ru: string;
}

export interface OriginalImage {
  url: string;
  width: number;
  height: number;
}

export interface RelatedProducts {
  productIds: any[];
  relatedCategory: RelatedCategory;
}

export interface RelatedCategory {
  enabled: boolean;
  categoryId: number;
  productCount: number;
}

export interface Shipping {
  type: string;
  methodMarkup: number;
  flatRate: number;
  disabledMethods: any[];
  enabledMethods: any[];
}

export interface Tax {
  taxable: boolean;
  defaultLocationIncludedTaxRate: number;
  enabledManualTaxes: any[];
  taxClassCode: string;
}
