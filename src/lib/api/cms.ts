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

    const url = `${API_BASE_URL}/api/cms/homepage-sections${params.toString() ? `?${params.toString()}` : ''}`;

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
  category?: string;
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
