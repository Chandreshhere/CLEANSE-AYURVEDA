const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Logger utility for API calls
const logRequest = (method: string, endpoint: string) => {
  console.log(`[CATALOG SERVICE] ${method} ${endpoint}`);
};

const logResponse = (endpoint: string, status: number, data: unknown) => {
  console.log(`[CATALOG SERVICE] Response from ${endpoint}`);
  console.log(`[CATALOG SERVICE] Status: ${status}`);
  console.log("[CATALOG SERVICE] Response Data:", JSON.stringify(data, null, 2));
};

const logError = (endpoint: string, error: unknown) => {
  console.error(`[CATALOG SERVICE] Error at ${endpoint}:`, error);
};

// Type definitions based on API documentation
export interface ProductImage {
  url: string;
  altText: string;
}

export interface ProductPricing {
  mrp: number;
  salePrice: number;
  discountPercent: number;
}

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  tags: string[];
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  brand: ProductBrand;
  primaryImage: ProductImage;
  pricing: ProductPricing;
}

export interface CollectionInfo {
  _id: string;
  name: string;
  slug: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CollectionProductsResponse {
  message: string;
  data: {
    collection: CollectionInfo;
    products: Product[];
    pagination: Pagination;
  };
  error: null | string;
}

export interface FetchCollectionProductsParams {
  slug: string;
  page?: number;
  limit?: number;
}

export const catalogService = {
  /**
   * Fetch products from a collection by slug (e.g., "featured-products")
   * This is a public endpoint that doesn't require authentication
   */
  async getCollectionProducts(
    params: FetchCollectionProductsParams
  ): Promise<{ success: boolean; data?: CollectionProductsResponse["data"]; error?: string }> {
    const { slug, page = 1, limit = 10 } = params;
    const endpoint = `${API_BASE_URL}/api/catalog/collections/${slug}/products?page=${page}&limit=${limit}`;

    logRequest("GET", endpoint);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Disable cache for fresh data
      });

      const data: CollectionProductsResponse = await response.json();
      logResponse(endpoint, response.status, data);

      if (response.status === 200 && data.data) {
        return {
          success: true,
          data: data.data,
        };
      } else {
        return {
          success: false,
          error: data.error || "Failed to fetch collection products",
        };
      }
    } catch (error) {
      logError(endpoint, error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  },

  /**
   * Convenience method to fetch featured products
   */
  async getFeaturedProducts(
    page = 1,
    limit = 10
  ): Promise<{ success: boolean; data?: CollectionProductsResponse["data"]; error?: string }> {
    return this.getCollectionProducts({
      slug: "featured-products",
      page,
      limit,
    });
  },
};
