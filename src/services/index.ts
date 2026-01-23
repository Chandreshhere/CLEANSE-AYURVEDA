export { authService } from "./auth.service";
export type {
  UserData,
  AuthTokens,
  LoginOTPResponse,
  RegisterData,
  RegisterResponse,
  RefreshTokenResponse,
} from "./auth.service";

export { catalogService } from "./catalog.service";
export type {
  Product,
  ProductImage,
  ProductPricing,
  ProductBrand,
  CollectionInfo,
  Pagination,
  CollectionProductsResponse,
  FetchCollectionProductsParams,
} from "./catalog.service";
