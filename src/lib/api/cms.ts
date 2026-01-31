// CMS API Service
// Base URL for the API gateway
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.29.105:3000';

// Banner Types
export interface Banner {
  _id: string;
  placement: 'hero' | 'top_strip' | 'mid_page';
  title?: string;
  subtitle?: string;
  cta_text?: string;
  cta_url?: string;
  image_desktop_url?: string;
  image_mobile_url?: string;
}

export interface BannersResponse {
  message: string;
  data: Banner[];
  error: null | string;
}

// Navigation Types
export interface NavigationItem {
  title: string;
  url?: string;
  children?: NavigationItem[];
}

export interface Navigation {
  _id: string;
  location: 'main_header' | 'footer' | 'mobile_nav' | 'footer_secondary';
  name: string;
  items: NavigationItem[];
}

export interface NavigationResponse {
  message: string;
  data: Navigation[];
  error: null | string;
}

// Media/Logo Types
export interface Media {
  _id: string;
  filename: string;
  url: string;
  thumbnail_url?: string;
  mime_type: string;
  file_size: number;
  alt_text?: string;
  folder?: string;
}

/**
 * Fetch active banners from the CMS
 * @param placement - Filter by banner placement (hero, top_strip, mid_page)
 * @param targetPage - Filter by target page (e.g., 'home', 'products')
 */
export async function getBanners(
  placement?: string,
  targetPage?: string
): Promise<BannersResponse> {
  try {
    const params = new URLSearchParams();
    if (placement) params.append('placement', placement);
    if (targetPage) params.append('target_page', targetPage);

    const url = `${API_BASE_URL}/api/cms/banners${params.toString() ? `?${params.toString()}` : ''}`;

    console.log('[API] 🔄 Fetching banners:', { placement, targetPage, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for real-time updates
    });

    if (!response.ok) {
      console.error('[API] ❌ Banners API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch banners: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Banners fetched successfully:', {
      count: data.data?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching banners:', error);
    return {
      message: 'Error fetching banners',
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch navigation menus from the CMS
 * @param location - Filter by location (main_header, footer, mobile_nav, footer_secondary)
 */
export async function getNavigation(
  location?: string
): Promise<NavigationResponse> {
  try {
    const params = new URLSearchParams();
    if (location) params.append('location', location);

    const url = `${API_BASE_URL}/api/cms/navigation${params.toString() ? `?${params.toString()}` : ''}`;

    console.log('[API] 🔄 Fetching navigation:', { location, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for real-time updates
    });

    if (!response.ok) {
      console.error('[API] ❌ Navigation API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch navigation: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Navigation fetched successfully:', {
      count: data.data?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching navigation:', error);
    return {
      message: 'Error fetching navigation',
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch logo/branding assets from the CMS
 * @param folder - Folder name to filter (e.g., 'branding')
 */
export async function getMediaByFolder(
  folder: string,
  token: string
): Promise<{ message: string; data: { media: Media[] }; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/cms/admin/media?folder=${folder}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return {
      message: 'Error fetching media',
      data: { media: [] },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Homepage Sections Types
export interface HomepageFeature {
  icon_url?: string;
  heading: string;
  description: string;
}

export interface ShowcaseProduct {
  product_id: string;
  image_url: string;
  heading: string;
  description: string;
  cta_text: string;
  layout: 'image_left' | 'image_right';
}

export interface HomepageSection {
  _id: string;
  name: string;
  section_type: 'features_grid' | 'bento_layout' | 'product_showcase';
  heading?: string;
  subheading?: string;
  background_color?: string;
  text_color?: string;
  features?: HomepageFeature[];
  showcase_product?: ShowcaseProduct;
  is_active: boolean;
  starts_at?: string | null;
  ends_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface HomepageSectionsResponse {
  message: string;
  data: {
    sections: HomepageSection[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  error: null | string;
}

/**
 * Fetch homepage sections from the CMS
 * @param sectionType - Filter by section type (features_grid, bento_layout, product_showcase)
 * @param isActive - Filter by active status
 */
export async function getHomepageSections(
  sectionType?: string,
  isActive: boolean = true
): Promise<HomepageSectionsResponse> {
  try {
    const params = new URLSearchParams();
    if (sectionType) params.append('section_type', sectionType);
    if (isActive !== undefined) params.append('is_active', isActive.toString());

    const url = `${API_BASE_URL}/api/homepage-sections${params.toString() ? `?${params.toString()}` : ''}`;

    console.log('[API] 🔄 Fetching homepage sections:', { sectionType, isActive, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Homepage sections API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch homepage sections: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Homepage sections fetched successfully:', {
      count: data.data?.sections?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching homepage sections:', error);
    return {
      message: 'Error fetching homepage sections',
      data: {
        sections: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Product/Catalog Types
export interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  brand?: {
    _id: string;
    name: string;
    slug: string;
  };
  primaryImage?: {
    url: string;
    altText?: string;
  };
  pricing?: {
    mrp: number;
    salePrice: number;
    discountPercent?: number;
  } | null;
  rating?: number;
  reviews_count?: number;
  isFeatured: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  tags?: string[];
  attributes?: {
    skinType?: string[];
    concerns?: string[];
  };
  category?: string | {
    _id: string;
    name: string;
    slug: string;
  };
  stock_quantity?: number;
}

export interface ProductsResponse {
  message: string;
  data: {
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  error: null | string;
}

/**
 * Fetch products from the catalog
 * @param isFeatured - Filter by featured products
 * @param category - Filter by category
 * @param limit - Number of products to fetch
 * @param page - Page number for pagination
 */
export async function getProducts(
  isFeatured?: boolean,
  category?: string,
  limit: number = 20,
  page: number = 1
): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams();
    if (isFeatured !== undefined) params.append('isFeatured', isFeatured.toString());
    if (category) params.append('category', category);
    params.append('limit', limit.toString());
    params.append('page', page.toString());

    const url = `${API_BASE_URL}/api/catalog/products${params.toString() ? `?${params.toString()}` : ''}`;

    console.log('[API] 🔄 Fetching products:', { isFeatured, category, limit, page, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Products API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Products fetched successfully:', {
      count: data.data?.products?.length || 0,
      total: data.data?.pagination?.total || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching products:', error);
    return {
      message: 'Error fetching products',
      data: {
        products: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Category Types
export interface CategoryImage {
  url: string;
  publicId: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parent: string | null;
  level: number;
  image: CategoryImage;
  sortOrder: number;
  children: Category[];
  description?: string;
  banner?: CategoryImage;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  subcategories?: Category[];
}

export interface CategoriesResponse {
  message: string;
  data: {
    categories: Category[];
  };
  error: null | string;
}

export interface CategoryDetailResponse {
  message: string;
  data: {
    category: Category;
  };
  error: null | string;
}

export interface CategoryProductsResponse {
  message: string;
  data: {
    category: {
      _id: string;
      name: string;
      slug: string;
    };
    products: Product[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
  error: null | string;
}

/**
 * Fetch category tree for navigation
 */
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const url = `${API_BASE_URL}/api/catalog/categories`;

    console.log('[API] 🔄 Fetching categories:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Categories API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Categories fetched successfully:', {
      count: data.data?.categories?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching categories:', error);
    return {
      message: 'Error fetching categories',
      data: {
        categories: [],
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch single category details by slug
 * @param slug - Category slug (lowercase, hyphenated)
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryDetailResponse> {
  try {
    const url = `${API_BASE_URL}/api/catalog/categories/${slug}`;

    console.log('[API] 🔄 Fetching category:', { slug, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Category API failed:', {
        status: response.status,
        statusText: response.statusText,
        slug,
      });
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Category fetched successfully:', {
      name: data.data?.category?.name,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching category:', error);
    return {
      message: 'Error fetching category',
      data: {
        category: {} as Category,
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Blog Types
export interface BlogCategory {
  _id: string;
  slug: string;
  name: string;
}

export interface Blog {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  author_name: string;
  featured_image_url: string;
  category_id: BlogCategory;
  tags: string[];
  view_count: number;
  published_at: string;
}

export interface BlogsResponse {
  message: string;
  data: {
    blogs: Blog[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  error: null | string;
}

/**
 * Fetch published blogs
 * @param page - Page number
 * @param limit - Items per page (max: 50)
 * @param category - Filter by category slug
 * @param tag - Filter by tag
 * @param featured - Filter by featured status
 * @param sort - Sort order (latest, popular)
 */
export async function getBlogs(
  page: number = 1,
  limit: number = 10,
  category?: string,
  tag?: string,
  featured?: boolean,
  sort: string = 'latest'
): Promise<BlogsResponse> {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', Math.min(limit, 50).toString());
    if (category) params.append('category', category);
    if (tag) params.append('tag', tag);
    if (featured !== undefined) params.append('featured', featured.toString());
    params.append('sort', sort);

    const url = `${API_BASE_URL}/api/cms/blogs?${params.toString()}`;

    console.log('[API] 🔄 Fetching blogs:', { page, limit, category, tag, featured, sort, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Blogs API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Blogs fetched successfully:', {
      count: data.data?.blogs?.length || 0,
      total: data.data?.pagination?.total || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching blogs:', error);
    return {
      message: 'Error fetching blogs',
      data: {
        blogs: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch products in a category
 * @param slug - Category slug
 * @param page - Page number
 * @param limit - Items per page (max: 50)
 * @param sortBy - Sort field (name, createdAt, price)
 * @param order - Sort order (asc, desc)
 * @param includeSubcategories - Include products from subcategories
 */
export async function getCategoryProducts(
  slug: string,
  page: number = 1,
  limit: number = 20,
  sortBy: string = 'createdAt',
  order: string = 'desc',
  includeSubcategories: boolean = true
): Promise<CategoryProductsResponse> {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', Math.min(limit, 50).toString());
    params.append('sortBy', sortBy);
    params.append('order', order);
    params.append('includeSubcategories', includeSubcategories.toString());

    const url = `${API_BASE_URL}/api/catalog/categories/${slug}/products?${params.toString()}`;

    console.log('[API] 🔄 Fetching category products:', { slug, page, limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Category products API failed:', {
        status: response.status,
        statusText: response.statusText,
        slug,
      });
      throw new Error(`Failed to fetch category products: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Category products fetched successfully:', {
      category: data.data?.category?.name,
      count: data.data?.products?.length || 0,
      total: data.data?.pagination?.total || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching category products:', error);
    return {
      message: 'Error fetching category products',
      data: {
        category: {
          _id: '',
          name: '',
          slug: '',
        },
        products: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  customer_name: string;
  customer_photo_url: string | null;
  testimonial_text: string;
  rating: number;
  before_photo_url: string | null;
  after_photo_url: string | null;
  is_verified_purchase: boolean;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialsResponse {
  message: string;
  data: Testimonial[];
  error: null | string;
}

/**
 * Fetch active testimonials
 * @param limit - Number of testimonials to return (default: 20)
 */
export async function getTestimonials(limit: number = 20): Promise<TestimonialsResponse> {
  try {
    const url = `${API_BASE_URL}/api/cms/testimonials?limit=${limit}`;

    console.log('[API] 🔄 Fetching testimonials:', { limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Testimonials API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Testimonials fetched successfully:', {
      count: data.data?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching testimonials:', error);
    return {
      message: 'Error fetching testimonials',
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch featured testimonials
 */
export async function getFeaturedTestimonials(): Promise<TestimonialsResponse> {
  try {
    const url = `${API_BASE_URL}/api/cms/testimonials/featured`;

    console.log('[API] 🔄 Fetching featured testimonials:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Featured testimonials API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch featured testimonials: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Featured testimonials fetched successfully:', {
      count: data.data?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching featured testimonials:', error);
    return {
      message: 'Error fetching featured testimonials',
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Instagram Reels Types
export interface InstagramReel {
  _id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  view_count: number;
}

export interface ReelsResponse {
  message: string;
  data: InstagramReel[];
  error: null | string;
}

/**
 * Fetch active Instagram reels
 * @param limit - Number of reels to return (default: 20, max: 50)
 */
export async function getReels(limit: number = 20): Promise<ReelsResponse> {
  try {
    const url = `${API_BASE_URL}/api/cms/reels?limit=${Math.min(limit, 50)}`;

    console.log('[API] 🔄 Fetching reels:', { limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Reels API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch reels: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Reels fetched successfully:', {
      count: data.data?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching reels:', error);
    return {
      message: 'Error fetching reels',
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Search Types
export interface SearchProduct {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  primaryImage: string | null;
  pricing: {
    mrp: number;
    salePrice: number;
  };
  ratingSummary: {
    average: number;
    count: number;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
  };
}

export interface SearchFacets {
  categories: Array<{ _id: string; name: string; count: number }>;
  brands: Array<{ _id: string; name: string; count: number }>;
  priceRanges: Array<{ min: number; max: number; count: number }>;
}

export interface SearchResponse {
  message: string;
  data: {
    query: string;
    products: SearchProduct[];
    facets: SearchFacets;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  error: null | string;
}

export interface SearchSuggestion {
  type: 'category' | 'product' | 'brand';
  text: string;
  slug: string;
}

export interface SuggestionsResponse {
  message: string;
  data: {
    suggestions: SearchSuggestion[];
  };
  error: null | string;
}

export interface SearchParams {
  q: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  skinType?: string | string[];
  rating?: number;
  sort?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

/**
 * Full-text product search
 * @param params - Search parameters
 */
export async function searchProducts(params: SearchParams): Promise<SearchResponse> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('q', params.q);

    if (params.category) searchParams.append('category', params.category);
    if (params.brand) searchParams.append('brand', params.brand);
    if (params.minPrice !== undefined) searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params.skinType) {
      if (Array.isArray(params.skinType)) {
        params.skinType.forEach(type => searchParams.append('skinType', type));
      } else {
        searchParams.append('skinType', params.skinType);
      }
    }
    if (params.rating !== undefined) searchParams.append('rating', params.rating.toString());
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.page !== undefined) searchParams.append('page', params.page.toString());
    if (params.limit !== undefined) searchParams.append('limit', params.limit.toString());

    const url = `${API_BASE_URL}/api/catalog/search?${searchParams.toString()}`;

    console.log('[API] 🔄 Searching products:', { params, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Search API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to search products: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Search completed successfully:', {
      count: data.data?.products?.length || 0,
      total: data.data?.pagination?.total || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error searching products:', error);
    return {
      message: 'Error searching products',
      data: {
        query: params.q,
        products: [],
        facets: {
          categories: [],
          brands: [],
          priceRanges: [],
        },
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get search suggestions (autocomplete)
 * @param query - Partial search query
 * @param limit - Number of suggestions (default: 5, max: 10)
 */
export async function getSearchSuggestions(
  query: string,
  limit: number = 5
): Promise<SuggestionsResponse> {
  try {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('limit', Math.min(limit, 10).toString());

    const url = `${API_BASE_URL}/api/catalog/search/suggestions?${params.toString()}`;

    console.log('[API] 🔄 Fetching search suggestions:', { query, limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Suggestions API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Suggestions fetched successfully:', {
      count: data.data?.suggestions?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching suggestions:', error);
    return {
      message: 'Error fetching suggestions',
      data: {
        suggestions: [],
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Product Detail Types
export interface ProductVariant {
  _id: string;
  name: string;
  sku: string;
  variantType: string | null;
  mrp: number;
  salePrice: number;
  discountPercent: number;
  weight: number;
  isDefault: boolean;
  sortOrder: number;
}

export interface ProductImage {
  _id?: string;
  type: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductDetail {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  howToUse: string;
  brand: {
    _id: string;
    name: string;
    slug: string;
  };
  productType: string;
  status: string;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  tags: string[];
  attributes: {
    skinType: string[];
    concerns: string[];
  };
  ratingSummary: {
    average: number;
    count: number;
  };
  primaryImage: {
    url: string;
    altText: string;
  };
  pricing: {
    mrp: number;
    salePrice: number;
    discountPercent: number;
  };
  categories: Array<{
    _id: string;
    name: string;
    slug: string;
    isPrimary: boolean;
  }>;
}

export interface StockAvailability {
  sku: string;
  status: string;
  isAvailable: boolean;
  availableQuantity: number;
  lowStockWarning: boolean;
  allowBackorder: boolean;
}

export interface Bundle {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: {
    url: string;
    publicId: string;
  };
  originalPrice: number;
  finalPrice: number;
  savings: number;
  validFrom: string;
  validTo: string;
  items?: Array<{
    _id: string;
    product: {
      _id: string;
      name: string;
      slug: string;
      primaryImage: {
        url: string;
        altText: string;
      };
    };
    variant: {
      _id: string;
      name: string;
      sku: string;
      mrp: number;
      salePrice: number;
    };
    quantity: number;
    itemTotal: number;
    sortOrder: number;
  }>;
}

export interface RelatedProducts {
  crossSell: Product[];
  upSell: Product[];
  frequentlyBoughtTogether: Product[];
}

export interface Review {
  _id: string;
  rating: number;
  title: string;
  content: string;
  images: Array<{
    url: string;
    publicId: string;
  }>;
  isVerifiedPurchase: boolean;
  isFeatured: boolean;
  helpfulCount: number;
  adminResponse: string | null;
  adminResponseAt: string | null;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export interface ReviewsResponse {
  message: string;
  data: {
    reviews: Review[];
    stats: {
      averageRating: number;
      totalReviews: number;
      distribution: {
        [key: string]: number;
      };
    };
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
  error: null | string;
}

export interface Ingredient {
  _id: string;
  ingredient: {
    _id: string;
    name: string;
    slug: string;
    benefits: string[];
    image: {
      url: string;
      altText: string;
    };
  };
  percentage: number;
  isKeyIngredient: boolean;
  sortOrder: number;
}

/**
 * Get product by slug
 * @param slug - Product slug
 */
export async function getProductBySlug(slug: string): Promise<{ message: string; data: { product: ProductDetail }; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/catalog/products/${slug}`;

    console.log('[API] 🔄 Fetching product:', { slug, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Product API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Product fetched successfully:', {
      name: data.data?.product?.name,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching product:', error);
    throw error;
  }
}

/**
 * Get product variants
 * @param slug - Product slug
 */
export async function getProductVariants(slug: string): Promise<{ message: string; data: { variants: ProductVariant[] }; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/catalog/products/${slug}/variants`;

    console.log('[API] 🔄 Fetching product variants:', { slug, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Variants API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch variants: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Variants fetched successfully:', {
      count: data.data?.variants?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching variants:', error);
    return {
      message: 'Error fetching variants',
      data: { variants: [] },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check stock availability
 * @param variantId - Variant ID
 */
export async function checkStockAvailability(variantId: string): Promise<{ message: string; data: StockAvailability; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/inventory/stock/check/${variantId}`;

    console.log('[API] 🔄 Checking stock:', { variantId, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Stock check API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to check stock: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Stock checked successfully:', {
      isAvailable: data.data?.isAvailable,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error checking stock:', error);
    throw error;
  }
}

/**
 * Get product media/photos
 * @param slug - Product slug
 */
export async function getProductMedia(slug: string): Promise<{ message: string; data: { media: ProductImage[] }; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/catalog/products/${slug}/media`;

    console.log('[API] 🔄 Fetching product media:', { slug, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Media API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Media fetched successfully:', {
      count: data.data?.media?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching media:', error);
    return {
      message: 'Error fetching media',
      data: { media: [] },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all bundles
 * @param limit - Number of bundles to fetch
 */
export async function getBundles(limit: number = 20): Promise<{ message: string; data: { bundles: Bundle[] }; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/catalog/bundles?limit=${Math.min(limit, 50)}`;

    console.log('[API] 🔄 Fetching bundles:', { limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Bundles API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch bundles: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Bundles fetched successfully:', {
      count: data.data?.bundles?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching bundles:', error);
    return {
      message: 'Error fetching bundles',
      data: { bundles: [] },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get bundle details
 * @param slug - Bundle slug
 */
export async function getBundleBySlug(slug: string): Promise<{ message: string; data: { bundle: Bundle }; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/catalog/bundles/${slug}`;

    console.log('[API] 🔄 Fetching bundle:', { slug, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Bundle API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch bundle: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Bundle fetched successfully:', {
      name: data.data?.bundle?.name,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching bundle:', error);
    throw error;
  }
}

/**
 * Get related products
 * @param slug - Product slug
 * @param type - Type of related products
 * @param limit - Number of products per type
 */
export async function getRelatedProducts(
  slug: string,
  type?: string,
  limit: number = 10
): Promise<{ message: string; data: { related: RelatedProducts }; error: null | string }> {
  try {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    params.append('limit', Math.min(limit, 20).toString());

    const url = `${API_BASE_URL}/api/catalog/products/${slug}/related?${params.toString()}`;

    console.log('[API] 🔄 Fetching related products:', { slug, type, limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Related products API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch related products: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Related products fetched successfully:', {
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching related products:', error);
    return {
      message: 'Error fetching related products',
      data: {
        related: {
          crossSell: [],
          upSell: [],
          frequentlyBoughtTogether: [],
        },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get product reviews
 * @param productId - Product ID
 * @param page - Page number
 * @param limit - Reviews per page
 * @param rating - Filter by rating
 * @param sortBy - Sort order
 * @param order - asc or desc
 */
export async function getProductReviews(
  productId: string,
  page: number = 1,
  limit: number = 20,
  rating?: number,
  sortBy: string = 'createdAt',
  order: string = 'desc'
): Promise<ReviewsResponse> {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (rating) params.append('rating', rating.toString());
    params.append('sortBy', sortBy);
    params.append('order', order);

    const url = `${API_BASE_URL}/api/engagement/products/${productId}/reviews?${params.toString()}`;

    console.log('[API] 🔄 Fetching product reviews:', { productId, page, limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('[API] ⚠️ Reviews API not available:', {
          status: response.status,
          statusText: response.statusText,
        });
      }
      // Return graceful error response instead of throwing
      return {
        message: 'Reviews not available',
        data: {
          reviews: [],
          stats: {
            averageRating: 0,
            totalReviews: 0,
            distribution: {},
          },
          pagination: {
            total: 0,
            page: 1,
            limit: 20,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
          },
        },
        error: `Reviews API returned ${response.status}`,
      };
    }

    const data = await response.json();
    console.log('[API] ✅ Reviews fetched successfully:', {
      count: data.data?.reviews?.length || 0,
      total: data.data?.stats?.totalReviews || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('[API] ⚠️ Error fetching reviews:', error);
    }
    return {
      message: 'Error fetching reviews',
      data: {
        reviews: [],
        stats: {
          averageRating: 0,
          totalReviews: 0,
          distribution: {},
        },
        pagination: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get product ingredients
 * @param slug - Product slug
 */
export async function getProductIngredients(slug: string): Promise<{ message: string; data: { ingredients: Ingredient[] }; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/catalog/products/${slug}/ingredients`;

    console.log('[API] 🔄 Fetching product ingredients:', { slug, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Ingredients API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch ingredients: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Ingredients fetched successfully:', {
      count: data.data?.ingredients?.length || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching ingredients:', error);
    return {
      message: 'Error fetching ingredients',
      data: { ingredients: [] },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get products by category slug
 * @param categorySlug - Category slug
 * @param page - Page number
 * @param limit - Products per page
 */
export async function getProductsByCategory(
  categorySlug: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  message: string;
  data: {
    category: { _id: string; name: string; slug: string };
    products: Product[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
  error: null | string;
}> {
  try {
    const url = `${API_BASE_URL}/api/catalog/categories/${categorySlug}/products?page=${page}&limit=${limit}`;

    console.log('[API] 🔄 Fetching products by category:', { categorySlug, page, limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ Category products API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch category products: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ Category products fetched successfully:', {
      category: data.data?.category?.name,
      count: data.data?.products?.length || 0,
      total: data.data?.pagination?.total || 0,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching category products:', error);
    return {
      message: 'Error fetching category products',
      data: {
        category: { _id: '', name: '', slug: categorySlug },
        products: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Pincode Validation Types
export interface PincodeData {
  pincode: string;
  city?: string;
  state?: string;
  country?: string;
  isValid: boolean;
}

export interface PincodeValidationResponse {
  message: string;
  data: PincodeData;
  error: null | string;
}

/**
 * Validate pincode for delivery
 * @param pincode - 6-digit Indian pincode
 */
export async function validatePincode(pincode: string): Promise<PincodeValidationResponse> {
  try {
    const url = `${API_BASE_URL}/api/auth/addresses/validate-pincode`;

    console.log('[API] 🔄 Validating pincode:', { pincode, url });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pincode }),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[API] ❌ Pincode validation failed:', {
        status: response.status,
        message: data.message,
        error: data.error,
      });
      return {
        message: data.message || 'Invalid pincode',
        data: {
          pincode,
          isValid: false,
        },
        error: data.error || 'Delivery not available for this pincode',
      };
    }

    console.log('[API] ✅ Pincode validated successfully:', {
      pincode: data.data?.pincode,
      city: data.data?.city,
      state: data.data?.state,
      isValid: data.data?.isValid,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error validating pincode:', error);
    return {
      message: 'Error validating pincode',
      data: {
        pincode,
        isValid: false,
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Related Products Types
export interface RelatedProduct {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  primaryImage?: {
    url: string;
    alt?: string;
  };
  pricing: {
    mrp: number;
    salePrice: number;
    discountPercent?: number;
  };
  ratingSummary?: {
    average: number;
    count: number;
  };
}

export interface RelatedProductsData {
  crossSell: RelatedProduct[];
  upSell: RelatedProduct[];
  frequentlyBoughtTogether: RelatedProduct[];
}

export interface RelatedProductsResponse {
  message: string;
  data: {
    related: RelatedProductsData;
  };
  error: null | string;
}

/**
 * Get related products for a product
 * @param slug - Product slug
 * @param type - Optional filter by type (crossSell|upSell|frequentlyBoughtTogether)
 * @param limit - Number of products per type (default: 10, max: 20)
 */
export async function getRelatedProductsBySlug(
  slug: string,
  type?: 'crossSell' | 'upSell' | 'frequentlyBoughtTogether',
  limit: number = 10
): Promise<RelatedProductsResponse> {
  try {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    params.append('limit', Math.min(limit, 20).toString());

    const url = `${API_BASE_URL}/api/catalog/products/${slug}/related${params.toString() ? `?${params.toString()}` : ''}`;

    console.log('[API] 🔄 Fetching related products:', { slug, type, limit, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[API] ❌ Failed to fetch related products:', {
        status: response.status,
        message: data.message,
        error: data.error,
      });
      return {
        message: data.message || 'Failed to fetch related products',
        data: {
          related: {
            crossSell: [],
            upSell: [],
            frequentlyBoughtTogether: [],
          },
        },
        error: data.error || 'Failed to fetch related products',
      };
    }

    console.log('[API] ✅ Related products fetched successfully:', {
      slug,
      crossSellCount: data.data?.related?.crossSell?.length || 0,
      upSellCount: data.data?.related?.upSell?.length || 0,
      frequentlyBoughtTogetherCount: data.data?.related?.frequentlyBoughtTogether?.length || 0,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching related products:', error);
    return {
      message: 'Error fetching related products',
      data: {
        related: {
          crossSell: [],
          upSell: [],
          frequentlyBoughtTogether: [],
        },
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get CMS page by slug
 * @param slug - Page slug
 */
export async function getCMSPage(slug: string): Promise<{ message: string; data: { page: any }; error: null | string }> {
  try {
    const url = `${API_BASE_URL}/api/cms/pages/${slug}`;

    console.log('[API] 🔄 Fetching CMS page:', { slug, url });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API] ❌ CMS page API failed:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch CMS page: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] ✅ CMS page fetched successfully:', {
      title: data.data?.page?.title,
      message: data.message,
    });

    return data;
  } catch (error) {
    console.error('[API] ❌ Error fetching CMS page:', error);
    throw error;
  }
}
