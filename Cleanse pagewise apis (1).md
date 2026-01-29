Homepage  
GET APIs

Header items  
\- menu item  
\- link  
\- logo

GET http://localhost:3000/api/cms/navigation \- Get all menus

{  
    "message": "Navigation menus retrieved successfully",  
    "data": \[  
        {  
            "\_id": "697a066a5b1d3cb739c4f351",  
            "location": "main\_header",  
            "name": "Main Navigation",  
            "items": \[  
                {  
                    "title": "Shop All",  
                    "url": "/shop",  
                    "children": \[\]  
                },  
                {  
                    "title": "By Category",  
                    "url": "/categories",  
                    "children": \[  
                        {  
                            "title": "Skin Care",  
                            "url": "/category/skin-care",  
                            "children": \[\]  
                        },  
                        {  
                            "title": "Hair Care",  
                            "url": "/category/hair-care",  
                            "children": \[\]  
                        },  
                        {  
                            "title": "Face Care",  
                            "url": "/category/face-care",  
                            "children": \[\]  
                        }  
                    \]  
                },  
                {  
                    "title": "New Arrivals",  
                    "url": "/collections/new-arrivals",  
                    "children": \[\]  
                },  
                {  
                    "title": "Bestsellers",  
                    "url": "/collections/bestsellers",  
                    "children": \[\]  
                }  
            \]  
        },  
        {  
            "\_id": "697a066a5b1d3cb739c4f353",  
            "location": "footer",  
            "name": "Footer Links",  
            "items": \[  
                {  
                    "title": "About Us",  
                    "url": "/about-us",  
                    "children": \[\]  
                },  
                {  
                    "title": "Contact",  
                    "url": "/contact",  
                    "children": \[\]  
                },  
                {  
                    "title": "FAQs",  
                    "url": "/faqs",  
                    "children": \[\]  
                },  
                {  
                    "title": "Blog",  
                    "url": "/blog",  
                    "children": \[\]  
                }  
            \]  
        },  
        {  
            "\_id": "697a066a5b1d3cb739c4f355",  
            "location": "mobile\_nav",  
            "name": "Mobile Menu",  
            "items": \[  
                {  
                    "title": "Shop All",  
                    "url": "/shop",  
                    "children": \[\]  
                },  
                {  
                    "title": "Categories",  
                    "url": "/categories",  
                    "children": \[\]  
                },  
                {  
                    "title": "My Account",  
                    "url": "/account",  
                    "children": \[\]  
                },  
                {  
                    "title": "Cart",  
                    "url": "/cart",  
                    "children": \[\]  
                }  
            \]  
        },  
        {  
            "\_id": "697a066a5b1d3cb739c4f357",  
            "location": "footer\_secondary",  
            "name": "Legal Links",  
            "items": \[  
                {  
                    "title": "Terms & Conditions",  
                    "url": "/terms-conditions",  
                    "children": \[\]  
                },  
                {  
                    "title": "Privacy Policy",  
                    "url": "/privacy-policy",  
                    "children": \[\]  
                },  
                {  
                    "title": "Refund Policy",  
                    "url": "/refund-policy",  
                    "children": \[\]  
                }  
            \]  
        }  
    \],  
    "error": null  
}

Response with Nested Items:

{  
  "message": "Navigation menus retrieved successfully",  
  "data": \[  
    {  
      "\_id": "69773a9478b8710a5d5254ab",  
      "location": "mobile\_nav",  
      "name": "Mobile Navigation",  
      "items": \[  
        {  
          "title": "Shop",  
          "url": "/products",  
          "children": \[  
            {  
              "title": "All Products",  
              "url": "/products",  
              "children": \[\]  
            },  
            {  
              "title": "New Arrivals",  
              "url": "/products?filter=new",  
              "children": \[\]  
            },  
            {  
              "title": "Best Sellers",  
              "url": "/products?filter=bestsellers",  
              "children": \[\]  
            }  
          \]  
        },  
        {  
          "title": "Categories",  
          "children": \[  
            {  
              "title": "Skincare",  
              "url": "/products?category=skincare",  
              "children": \[\]  
            },  
            {  
              "title": "Haircare",  
              "url": "/products?category=haircare",  
              "children": \[\]  
            },  
            {  
              "title": "Wellness",  
              "url": "/products?category=wellness",  
              "children": \[\]  
            }  
          \]  
        }  
      \]  
    }  
  \],  
  "error": null  
}

—

Hero section  
\- Banner  
\- Link  
\- Text  
\- Button Link

Consumer (Public): [http://localhost:3000/api/cms/banners](http://localhost:3000/api/cms/banners)  
GET http://localhost:3000/api/cms/banners?placement=hero \- All hero banners  
GET http://localhost:3000/api/cms/banners?placement=hero\&target\_page=home \- Homepage heroes  
GET http://localhost:3000/api/cms/banners?placement=top\_strip \- Top announcements

Endpoint: GET /api/cms/banners  
Authentication: None required (public endpoint)

Query Parameters:

placement (optional): Filter by placement type  
Values: hero, top\_strip, mid\_page  
target\_page (optional): Filter banners for specific page  
Example: home, products, collections  
Use Cases:  
1\. Get All Active Banners:  
curl [http://localhost:3000/api/cms/banners](http://localhost:3000/api/cms/banners)

2\. Get Hero Banners Only:  
curl "[http://localhost:3000/api/cms/banners?placement=hero](http://localhost:3000/api/cms/banners?placement=hero)"

3\. Get Top Strip Announcements:  
curl "[http://localhost:3000/api/cms/banners?placement=top\_strip](http://localhost:3000/api/cms/banners?placement=top_strip)"

4\. Get Banners for Specific Page:  
curl "[http://localhost:3000/api/cms/banners?placement=hero\&target\_page=home](http://localhost:3000/api/cms/banners?placement=hero&target_page=home)"

Response (200 OK):

Simple Hero Banner:

{  
  "message": "Banners retrieved successfully",  
  "data": \[  
    {  
      "\_id": "69762c5b2563a44a50a88138",  
      "placement": "hero",  
      "title": "Welcome to Natural Beauty",  
      "cta\_url": "/products",  
      "image\_desktop\_url": "https://via.placeholder.com/1920x600/4CAF50/ffffff?text=Natural+Beauty"  
    }  
  \],  
  "error": null  
}  
Complete Hero Banner (All Fields):

{  
  "message": "Banners retrieved successfully",  
  "data": \[  
    {  
      "\_id": "69773fbc78b8710a5d5254b4",  
      "placement": "hero",  
      "title": "Discover Pure Ayurvedic Beauty",  
      "subtitle": "100% Natural | Cruelty Free | Made in India",  
      "cta\_text": "Shop Now",  
      "cta\_url": "/collections/spring-2026",  
      "image\_desktop\_url": "https://via.placeholder.com/1920x800/4A90E2/ffffff?text=Spring+Collection+Desktop",  
      "image\_mobile\_url": "https://via.placeholder.com/768x600/4A90E2/ffffff?text=Spring+Collection+Mobile"  
    }  
  \],  
  "error": null  
}  
Top Strip Announcement:

{  
  "message": "Banners retrieved successfully",  
  "data": \[  
    {  
      "\_id": "69773fc878b8710a5d5254b6",  
      "placement": "top\_strip",  
      "title": "Free Shipping on Orders Over $50",  
      "cta\_text": "Learn More",  
      "cta\_url": "/shipping-policy"  
    }  
  \],  
  "error": null  
}

—

Consumer (Public): http://localhost:3000/api/cms/popups  
Admin (Protected):  http://localhost:3000/api/cms/admin/popups  
1\. GET ACTIVE POPUPS ✅ PUBLIC  
Endpoint: GET /api/cms/popups  
Authentication: None required (public endpoint)

Query Parameters:

type (optional): Filter by popup type  
Values: promo, newsletter, exit\_intent  
target\_page (optional): Filter popups for specific page  
Example: home, products, checkout  
Use Cases:  
1\. Get All Active Popups:  
curl [http://localhost:3000/api/cms/popups](http://localhost:3000/api/cms/popups)

2\. Get Promotional Popups Only:  
curl "[http://localhost:3000/api/cms/popups?type=promo](http://localhost:3000/api/cms/popups?type=promo)"

3\. Get Exit Intent Popups:  
curl "[http://localhost:3000/api/cms/popups?type=exit\_intent](http://localhost:3000/api/cms/popups?type=exit_intent)"

4\. Get Newsletter Popups:  
curl "[http://localhost:3000/api/cms/popups?type=newsletter](http://localhost:3000/api/cms/popups?type=newsletter)"

5\. Get Popups for Homepage:  
curl "[http://localhost:3000/api/cms/popups?target\_page=home](http://localhost:3000/api/cms/popups?target_page=home)"

6\. Get Promo Popups for Products Page:  
curl "[http://localhost:3000/api/cms/popups?type=promo\&target\_page=products](http://localhost:3000/api/cms/popups?type=promo&target_page=products)"

Response (200 OK):

Promotional Popup:

{  
  "message": "Popups retrieved successfully",  
  "data": \[  
    {  
      "\_id": "697745e678b8710a5d5254bd",  
      "type": "promo",  
      "title": "Flash Sale \- 50% Off\!",  
      "content": "\<h2\>Limited Time Offer\</h2\>\<p\>Get 50% off on all Ayurvedic skincare products. Sale ends in 24 hours\!\</p\>",  
      "image\_url": "https://via.placeholder.com/600x400/FF6B6B/ffffff?text=Flash+Sale",  
      "cta\_text": "Shop Now",  
      "cta\_url": "/sale",  
      "trigger\_type": "time\_delay",  
      "trigger\_value": "3000",  
      "frequency": "daily"  
    }  
  \],  
  "error": null  
}  
Exit Intent Popup:

{  
  "message": "Popups retrieved successfully",  
  "data": \[  
    {  
      "\_id": "6977460578b8710a5d5254bf",  
      "type": "exit\_intent",  
      "title": "Wait\! Don't Go Empty-Handed",  
      "content": "\<h2\>Get 15% Off Your First Purchase\</h2\>\<p\>Use code WELCOME15 at checkout\</p\>",  
      "image\_url": "https://via.placeholder.com/600x400/4CAF50/ffffff?text=Welcome+Offer",  
      "cta\_text": "Claim Discount",  
      "cta\_url": "/products",  
      "trigger\_type": "exit\_intent",  
      "frequency": "once"  
    }  
  \],  
  "error": null  
}  
Newsletter Popup:

{  
  "message": "Popups retrieved successfully",  
  "data": \[  
    {  
      "\_id": "697637f52563a44a50a8821a",  
      "type": "newsletter",  
      "title": "Subscribe to Newsletter",  
      "content": "\<h2\>Get 10% Off Your First Order\</h2\>\<p\>Subscribe to our newsletter for exclusive deals\!\</p\>",  
      "trigger\_type": "time\_delay",  
      "trigger\_value": "5000",  
      "frequency": "session"  
    }  
  \],  
  "error": null  
}

—

Vision and values  
\- text  
\- Icon and text

Base URLs

Consumer (Public): [http://localhost:3000/api/cms/homepage-sections](http://localhost:3000/api/cms/homepage-sections)

1\. GET VISION/VALUES SECTIONS ✅ PUBLIC  
Endpoint: GET /api/cms/homepage-sections  
Authentication: None required (public endpoint)

Query Parameters:

section\_type (optional): Filter by section type  
Value: features\_grid (for Vision/Values sections)  
is\_active (optional): Filter by active status (true/false)  
page (optional): Page number (default: 1\)  
limit (optional): Items per page (default: 20, max: 100\)  
Use Cases:  
1\. Get All Features Grid Sections (Vision/Values):

curl "http://localhost:3000/api/cms/homepage-sections?section\_type=features\_grid"  
2\. Get All Active Sections:

curl "http://localhost:3000/api/cms/homepage-sections?is\_active=true"  
3\. Get Specific Page:

curl "http://localhost:3000/api/cms/homepage-sections?section\_type=features\_grid\&page=1\&limit=10"  
Response (200 OK):  
Brand Values Section (4 Features):

{  
  "message": "Sections retrieved successfully",  
  "data": {  
    "sections": \[  
      {  
        "\_id": "697735dfcb6806be99cc6ebf",  
        "name": "Brand Values",  
        "section\_type": "features\_grid",  
        "heading": "Why Choose Us",  
        "subheading": "Experience the difference",  
        "background\_color": "\#ffffff",  
        "text\_color": "\#000000",  
        "features": \[  
          {  
            "icon\_url": "https://example.com/icons/shipping.png",  
            "heading": "Express Shipping",  
            "description": "Fast delivery to your doorstep"  
          },  
          {  
            "icon\_url": "https://example.com/icons/cruelty-free.png",  
            "heading": "Cruelty Free",  
            "description": "No animal testing"  
          },  
          {  
            "icon\_url": "https://example.com/icons/ayurvedic.png",  
            "heading": "100% Ayurvedic",  
            "description": "Pure natural ingredients"  
          },  
          {  
            "icon\_url": "https://example.com/icons/made-in-india.png",  
            "heading": "Made In India",  
            "description": "Proudly manufactured in India"  
          }  
        \],  
        "is\_active": true,  
        "starts\_at": null,  
        "ends\_at": null,  
        "created\_at": "2026-01-26T09:37:35.421Z",  
        "updated\_at": "2026-01-26T09:37:35.421Z"  
      }  
    \],  
    "pagination": {  
      "page": 1,  
      "limit": 20,  
      "total": 1,  
      "pages": 1  
    }  
  },  
  "error": null  
}  
Company Values Section (6 Features):

{  
  "message": "Sections retrieved successfully",  
  "data": {  
    "sections": \[  
      {  
        "\_id": "697747a178b8710a5d5254ca",  
        "name": "Our Core Values",  
        "section\_type": "features\_grid",  
        "heading": "Why Customers Love Us",  
        "subheading": "Committed to your wellness journey",  
        "background\_color": "\#f8f9fa",  
        "text\_color": "\#212529",  
        "features": \[  
          {  
            "icon\_url": "https://via.placeholder.com/80x80/4CAF50/ffffff?text=Eco",  
            "heading": "Eco-Friendly Packaging",  
            "description": "Sustainable and recyclable materials in all our products"  
          },  
          {  
            "icon\_url": "https://via.placeholder.com/80x80/2196F3/ffffff?text=Quality",  
            "heading": "Premium Quality",  
            "description": "Handpicked ingredients sourced from certified organic farms"  
          },  
          {  
            "icon\_url": "https://via.placeholder.com/80x80/FF9800/ffffff?text=Safe",  
            "heading": "Dermatologist Tested",  
            "description": "Clinically proven formulas safe for all skin types"  
          },  
          {  
            "icon\_url": "https://via.placeholder.com/80x80/9C27B0/ffffff?text=Support",  
            "heading": "24/7 Customer Support",  
            "description": "Expert guidance whenever you need it"  
          },  
          {  
            "icon\_url": "https://via.placeholder.com/80x80/F44336/ffffff?text=Money",  
            "heading": "Money-Back Guarantee",  
            "description": "100% satisfaction guaranteed or your money back"  
          },  
          {  
            "icon\_url": "https://via.placeholder.com/80x80/00BCD4/ffffff?text=Global",  
            "heading": "Worldwide Shipping",  
            "description": "Delivering wellness to customers across the globe"  
          }  
        \],  
        "is\_active": true,  
        "starts\_at": null,  
        "ends\_at": null,  
        "created\_at": "2026-01-26T10:53:21.854Z",  
        "updated\_at": "2026-01-26T10:53:21.854Z"  
      }  
    \],  
    "pagination": {  
      "page": 1,  
      "limit": 20,  
      "total": 1,  
      "pages": 1  
    }  
  },  
  "error": null  
}

—

Featured Products  
\- featured products details  
\- Name  
\- short description  
\- Price  
\- compare at price

### Get Featured Products

curl \-X GET "http://localhost:3000/api/catalog/products?isFeatured=true\&limit=5"

**Response (200 OK):**

{

  "message": "Products fetched successfully",

  "data": {

    "products": \[

      {

        "\_id": "69761bc724a4275296b63a97",

        "name": "Complete Skincare Kit",

        "slug": "complete-skincare-kit",

        "shortDescription": "Full skincare routine in one kit",

        "brand": null,

        "isFeatured": true,

        "isBestseller": false,

        "isNewArrival": false,

        "tags": \["kit", "skincare", "combo"\],

        "attributes": {

          "skinType": \[\],

          "concerns": \[\]

        },

        "primaryImage": null,

        "pricing": {

          "mrp": 2999,

          "salePrice": null,

          "discountPercent": 0

        }

      },

      {

        "\_id": "696ddc9d2505ea90a4976af6",

        "name": "Kumkumadi Face Serum",

        "slug": "kumkumadi-face-serum",

        "shortDescription": "Saffron-infused anti-aging serum",

        "brand": null,

        "isFeatured": true,

        "isBestseller": true,

        "isNewArrival": true,

        "tags": \["serum", "kumkumadi", "saffron", "luxury"\],

        "attributes": {

          "skinType": \["normal", "dry"\],

          "concerns": \["pigmentation", "aging", "dull skin"\]

        },

        "primaryImage": {

          "url": "https://res.cloudinary.com/dk94hyz5e/image/upload/v1768919765/events/gallery/p3-1768919765366.png",

          "altText": "thumbnail"

        },

        "pricing": null

      }

    \],

    "pagination": {

      "total": 11,

      "page": 1,

      "limit": 5,

      "totalPages": 3,

      "hasNextPage": true,

      "hasPrevPage": false

    }

  },

  "error": null

}

**Pricing Information:**

- `mrp`: Maximum Retail Price (original price / compare at price)  
- `salePrice`: Actual selling price (can be null if no discount)  
- `discountPercent`: Percentage discount  
- `pricing` can be `null` for products without variants

### Get Product Details

Retrieve complete details of a specific product by its slug.

**Endpoint:** `GET /api/catalog/products/:slug`

**Example Request:**

curl \-X GET "http://localhost:3000/api/catalog/products/kumkumadi-face-serum"

**Response (200 OK):**

{

  "message": "Product fetched successfully",

  "data": {

    "product": {

      "\_id": "696ddc9d2505ea90a4976af6",

      "name": "Kumkumadi Face Serum",

      "slug": "kumkumadi-face-serum",

      "sku": "KFS-001",

      "description": "Luxurious kumkumadi serum with pure saffron for radiant and youthful skin",

      "shortDescription": "Saffron-infused anti-aging serum",

      "benefits": \[

        "Anti-aging",

        "Brightens complexion",

        "Reduces pigmentation",

        "Improves skin texture"

      \],

      "howToUse": "Apply 2-3 drops on face and neck before bed, massage gently",

      "brand": null,

      "productType": "simple",

      "status": "active",

      "isFeatured": true,

      "isBestseller": true,

      "isNewArrival": true,

      "tags": \["serum", "kumkumadi", "saffron", "luxury"\],

      "attributes": {

        "skinType": \["normal", "dry"\],

        "concerns": \["pigmentation", "aging", "dull skin"\]

      },

      "seo": {

        "title": "Kumkumadi Serum \- Pure Saffron",

        "description": "Luxurious kumkumadi serum with saffron for radiant glowing skin",

        "keywords": \["kumkumadi", "saffron", "serum", "anti-aging"\]

      },

      "hsnCode": "33049990",

      "ratingSummary": {

        "average": 0,

        "count": 0

      },

      "deletedAt": null,

      "version": 0,

      "createdAt": "2026-01-19T07:26:21.384Z",

      "updatedAt": "2026-01-19T07:26:21.384Z",

      "primaryImage": {

        "url": "https://res.cloudinary.com/dk94hyz5e/image/upload/v1768919765/events/gallery/p3-1768919765366.png",

        "altText": "thumbnail"

      },

      "pricing": null,

      "categories": \[\],

      "bundles": \[\]

    }

  },

  "error": null

}

**Response (404 Not Found):**

{

  "message": "Product not found",

  "data": null,

  "error": "Product with slug 'invalid-slug' not found"

}

—

Bento  
\- 2 images  
\- 2 Products

Public Endpoints

### Get Bento Layout Sections

Retrieve active bento layout sections with images and product references.

**Endpoint:** `GET /api/cms/homepage-sections`

**Query Parameters:**

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| section\_type | string | Yes | Set to "bento\_layout" |
| is\_active | boolean | No | Filter by active status |
| page | number | No | Page number (default: 1\) |
| limit | number | No | Items per page (default: 20, max: 100\) |

**Example Request:**

curl \-X GET "http://localhost:3000/api/cms/homepage-sections?section\_type=bento\_layout"

**Response (200 OK):**

{

  "message": "Sections retrieved successfully",

  "data": {

    "sections": \[

      {

        "\_id": "697735ffcb6806be99cc6ec2",

        "name": "Summer Bento",

        "section\_type": "bento\_layout",

        "heading": "Why Your Skin Deserves Best",

        "subheading": null,

        "background\_color": "\#ffffff",

        "text\_color": "\#000000",

        "bento\_items": {

          "images": \[

            {

              "url": "https://example.com/images/bento-1.jpg",

              "alt\_text": "Natural skincare",

              "link\_url": "/products/summer-collection"

            },

            {

              "url": "https://example.com/images/bento-2.jpg",

              "alt\_text": "Organic ingredients",

              "link\_url": "/about"

            }

          \],

          "products": \[\],

          "text\_overlays": \[

            {

              "heading": "50% OFF",

              "body": "Summer Sale",

              "position": "top\_right"

            }

          \]

        },

        "is\_active": true,

        "starts\_at": null,

        "ends\_at": null,

        "created\_at": "2026-01-26T09:38:07.212Z",

        "updated\_at": "2026-01-26T09:38:07.212Z"

      }

    \],

    "pagination": {

      "page": 1,

      "limit": 20,

      "total": 1,

      "pages": 1

    }

  },

  "error": null

}

—

Product showcase  
\- Full size image with product shoot  
\- Product details

## Public Endpoints

### Get Product Showcase Sections

Retrieve active product showcase sections.

**Endpoint:** `GET /api/cms/homepage-sections`

**Query Parameters:**

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| section\_type | string | Yes | Set to "product\_showcase" |
| is\_active | boolean | No | Filter by active status |
| page | number | No | Page number (default: 1\) |
| limit | number | No | Items per page (default: 20, max: 100\) |

**Example Request:**

curl \-X GET "http://localhost:3000/api/cms/homepage-sections?section\_type=product\_showcase"

**Response (200 OK):**

{

  "message": "Sections retrieved successfully",

  "data": {

    "sections": \[

      {

        "\_id": "6977361dcb6806be99cc6ec4",

        "name": "Hero Product",

        "section\_type": "product\_showcase",

        "heading": "Our Bestselling Face Cream",

        "subheading": null,

        "background\_color": "\#ffffff",

        "text\_color": "\#000000",

        "showcase\_product": {

          "product\_id": "507f1f77bcf86cd799439011",

          "image\_url": "https://example.com/images/hero-product.jpg",

          "heading": "Transform Your Skin",

          "description": "Award-winning formula that delivers visible results in 7 days",

          "cta\_text": "Shop Now",

          "layout": "image\_left"

        },

        "is\_active": true,

        "starts\_at": null,

        "ends\_at": null,

        "created\_at": "2026-01-26T09:42:53.123Z",

        "updated\_at": "2026-01-26T09:42:53.123Z"

      }

    \],

    "pagination": {

      "page": 1,

      "limit": 20,

      "total": 7,

      "pages": 1

    }

  },

  "error": null

}

—

Category fetch  
\- Icon  
\- Name  
\- Link

## Public Endpoints

### Get Category Tree

Retrieve hierarchical category tree for menu navigation with icon, name, and slug.

**Endpoint:** `GET /api/catalog/categories`

**Query Parameters:** None required

**Example Request:**

curl \-X GET "http://localhost:3000/api/catalog/categories"

**Response (200 OK):**

{

  "message": "Categories fetched successfully",

  "data": {

    "categories": \[

      {

        "\_id": "69761b0124a4275296b639da",

        "name": "Face Care",

        "slug": "face-care",

        "parent": null,

        "level": 0,

        "image": {

          "url": "https://example.com/icons/face-care.png",

          "publicId": "categories/face-care"

        },

        "sortOrder": 0,

        "children": \[\]

      },

      {

        "\_id": "69761b0124a4275296b639de",

        "name": "Body Care",

        "slug": "body-care",

        "parent": null,

        "level": 0,

        "image": {

          "url": "https://example.com/icons/body-care.png",

          "publicId": "categories/body-care"

        },

        "sortOrder": 0,

        "children": \[\]

      }

    \]

  },

  "error": null

}

**Link Generation:**

- Use `slug` field to create category page links: `/categories/{slug}`  
- Example: `/categories/face-care`

---

### Get Category by Slug

Retrieve single category details with subcategories.

**Endpoint:** `GET /api/catalog/categories/:slug`

**Path Parameters:**

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| slug | string | Yes | Category slug (lowercase, hyphenated) |

**Example Request:**

curl \-X GET "http://localhost:3000/api/catalog/categories/face-care"

**Response (200 OK):**

{

  "message": "Category fetched successfully",

  "data": {

    "category": {

      "\_id": "69761b0124a4275296b639da",

      "name": "Face Care",

      "slug": "face-care",

      "description": "Premium face care products",

      "image": {

        "url": "https://example.com/icons/face-care.png",

        "publicId": "categories/face-care"

      },

      "banner": {

        "url": "https://example.com/banners/face-care-banner.jpg",

        "publicId": "categories/face-care-banner"

      },

      "seo": {

        "title": "Face Care Products",

        "description": "Shop premium face care products",

        "keywords": \["face", "skincare", "cleansing"\]

      },

      "subcategories": \[\]

    }

  },

  "error": null

}

**Response (404 Not Found):**

{

  "message": "Category not found",

  "data": null,

  "error": "Category with slug 'unknown-category' not found"

}

---

### Get Category Products

Retrieve products in a category.

**Endpoint:** `GET /api/catalog/categories/:slug/products`

**Path Parameters:**

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| slug | string | Yes | Category slug |

**Query Parameters:**

| Parameter | Type | Default | Description |
| :---- | :---- | :---- | :---- |
| page | number | 1 | Page number |
| limit | number | 20 | Items per page (max: 50\) |
| sortBy | string | createdAt | Sort field (name, createdAt, price) |
| order | string | desc | Sort order (asc, desc) |
| includeSubcategories | string | true | Include products from subcategories |

**Example Request:**

curl \-X GET "http://localhost:3000/api/catalog/categories/face-care/products?page=1\&limit=10"

**Response (200 OK):**

{

  "message": "Products fetched successfully",

  "data": {

    "category": {

      "\_id": "69761b0124a4275296b639da",

      "name": "Face Care",

      "slug": "face-care"

    },

    "products": \[

      {

        "\_id": "69761bc724a4275296b63a92",

        "name": "Aloe Face Wash",

        "slug": "aloe-face-wash",

        "shortDescription": "Gentle cleansing face wash",

        "pricing": {

          "mrp": 599,

          "salePrice": 449,

          "discountPercent": 25

        }

      }

    \],

    "pagination": {

      "total": 15,

      "page": 1,

      "limit": 10,

      "totalPages": 2,

      "hasNextPage": true,

      "hasPrevPage": false

    }

  },

  "error": null

}

—

Blogs  
\- Images  
\- Text  
\- Links

## Public Endpoints

### List Published Blogs

Retrieve all published blog posts with pagination and filtering.

**Endpoint:** `GET /api/cms/blogs`

**Query Parameters:**

| Parameter | Type | Default | Description |
| :---- | :---- | :---- | :---- |
| page | number | 1 | Page number (max: 1000\) |
| limit | number | 10 | Items per page (max: 50\) |
| category | string | \- | Filter by category slug |
| tag | string | \- | Filter by tag |
| featured | boolean | \- | Filter by featured status |
| sort | string | latest | Sort order (latest, popular) |

**Example Request:**

curl \-X GET "http://localhost:3000/api/cms/blogs?limit=5\&sort=latest"

**Response (200 OK):**

{

  "message": "Blogs retrieved successfully",

  "data": {

    "blogs": \[

      {

        "\_id": "69777b8a78b8710a5d52551b",

        "slug": "complete-guide-natural-skincare",

        "title": "Complete Guide to Natural Skincare",

        "excerpt": "Discover the benefits of natural ingredients in your daily skincare routine.",

        "author\_name": "Admin",

        "featured\_image\_url": "https://via.placeholder.com/800x400/4CAF50/ffffff?text=Natural+Skincare+Guide",

        "category\_id": {

          "\_id": "69777bba78b8710a5d525532",

          "slug": "skincare-tips",

          "name": "Skincare Tips"

        },

        "tags": \["skincare", "natural", "organic"\],

        "view\_count": 15,

        "published\_at": "2026-01-26T14:35:52.161Z"

      }

    \],

    "pagination": {

      "page": 1,

      "limit": 5,

      "total": 1,

      "pages": 1

    }

  },

  "error": null

}

**Link Generation:**

- Use `slug` field to create blog post links: `/blogs/{slug}`  
- Example: `/blogs/complete-guide-natural-skincare`

—

Instagram Reels  
\- Profile posted reels

Public Endpoints

### Get Active Reels

Retrieve all active reels posted on profile with video URLs and thumbnails.

**Endpoint:** `GET /api/cms/reels`

**Query Parameters:**

| Parameter | Type | Default | Description |
| :---- | :---- | :---- | :---- |
| limit | number | 20 | Max reels to return (max: 50\) |

**Example Request:**

curl \-X GET "http://localhost:3000/api/cms/reels?limit=10"

**Response (200 OK):**

{

  "message": "Reels retrieved successfully",

  "data": \[

    {

      "\_id": "697637f52563a44a50a88218",

      "title": "Hair Care Tips",

      "description": "Natural hair care routine for healthy hair",

      "video\_url": "https://www.instagram.com/reel/ABC123xyz",

      "thumbnail\_url": "https://via.placeholder.com/300x400",

      "duration": 45,

      "view\_count": 150

    },

    {

      "\_id": "697637f52563a44a50a88216",

      "title": "Morning Skincare Routine",

      "description": "5-step morning routine for glowing skin",

      "video\_url": "https://www.instagram.com/reel/DEF456abc",

      "thumbnail\_url": "https://via.placeholder.com/300x400",

      "duration": 60,

      "view\_count": 320

    }

  \],

  "error": null

}

**Fields:**

- `title`: Reel title  
- `description`: Reel description (optional)  
- `video_url`: Instagram reel URL  
- `thumbnail_url`: Preview thumbnail URL  
- `duration`: Video duration in seconds  
- `view_count`: Number of views tracked

—

Testimonials  
\- Name  
\- person photo  
\- text  
\- rating  
\- 2 photos of comparison

Public Endpoints (Consumer)

### 1\. Get Active Testimonials

**Endpoint:** `GET /api/cms/testimonials`

**Query Parameters:**

- `limit` (optional): Number of testimonials to return (default: 20\)

**Request Example:**

curl \-X GET "http://localhost:3000/api/cms/testimonials?limit=5"

**Response:**

{

  "message": "Testimonials retrieved successfully",

  "data": \[

    {

      "\_id": "697637f42563a44a50a8820a",

      "customer\_name": "Arjun Verma",

      "customer\_photo\_url": null,

      "testimonial\_text": "Good quality products with natural ingredients. Customer service is also very responsive.",

      "rating": 4,

      "before\_photo\_url": null,

      "after\_photo\_url": null,

      "is\_verified\_purchase": false,

      "is\_featured": true,

      "created\_at": "2026-01-25T15:34:12.904Z",

      "updated\_at": "2026-01-25T15:34:12.904Z"

    }

  \],

  "error": null

}

### 2\. Get Featured Testimonials

**Endpoint:** `GET /api/cms/testimonials/featured`

**Request Example:**

curl \-X GET "http://localhost:3000/api/cms/testimonials/featured"

**Response:**

{

  "message": "Featured testimonials retrieved successfully",

  "data": \[

    {

      "\_id": "697637f42563a44a50a88208",

      "customer\_name": "Meera Reddy",

      "customer\_photo\_url": null,

      "testimonial\_text": "Excellent products\! The skincare kit transformed my skin in just 3 weeks.",

      "rating": 5,

      "before\_photo\_url": null,

      "after\_photo\_url": null,

      "is\_verified\_purchase": false,

      "created\_at": "2026-01-25T15:34:12.880Z",

      "updated\_at": "2026-01-25T15:34:12.880Z"

    }

  \],

  "error": null

}

—

CTA Banner  
\- Image  
\- Link

Public Endpoints (Consumer)

### 1\. Get Active Banners

**Endpoint:** `GET /api/cms/banners`

**Query Parameters:**

- `placement` (optional): Filter by placement type (hero, top\_strip, mid\_page)  
- `target_page` (optional): Filter by target page pattern

**Request Example:**

curl \-X GET "http://localhost:3000/api/cms/banners?placement=hero"

**Response:**

{

  "message": "Banners retrieved successfully",

  "data": \[

    {

      "\_id": "69773fbc78b8710a5d5254b4",

      "placement": "hero",

      "title": "Discover Pure Ayurvedic Beauty",

      "subtitle": "100% Natural | Cruelty Free | Made in India",

      "cta\_text": "Shop Now",

      "cta\_url": "/collections/spring-2026",

      "image\_desktop\_url": "https://via.placeholder.com/1920x800/4A90E2/ffffff?text=Spring+Collection+Desktop",

      "image\_mobile\_url": "https://via.placeholder.com/768x600/4A90E2/ffffff?text=Spring+Collection+Mobile"

    }

  \],

  "error": null

}

**Notes:**

- Only returns active banners within scheduled date range (starts\_at and ends\_at)  
- Results sorted by priority (ascending)  
- target\_pages field not included in consumer response

—

POST APIs

1. Search API  
2. Add to cart API

Newsletter subscription API

1\. Search API

### Public Endpoints

#### 1.1 Full-Text Product Search

**Endpoint:** `GET /api/catalog/search`

**Query Parameters:**

- `q` (required): Search query string  
- `category`: Filter by category ID  
- `brand`: Filter by brand ID  
- `minPrice`: Minimum price filter  
- `maxPrice`: Maximum price filter  
- `skinType`: Filter by skin type (can be array)  
- `rating`: Minimum rating (1-5)  
- `sort`: Sort order (relevance, price\_asc, price\_desc, rating, newest)  
- `page`: Page number (default: 1\)  
- `limit`: Results per page (default: 20, max: 50\)

**Request Example:**

curl \-X GET "http://localhost:3000/api/catalog/search?q=face\&minPrice=100\&maxPrice=500\&sort=price\_asc\&limit=10"

**Response:**

{

  "message": "Search results fetched successfully",

  "data": {

    "query": "face",

    "products": \[

      {

        "\_id": "696db52b0d9d9119e91c9c07",

        "name": "Ayurvedic Face Cream",

        "slug": "ayurvedic-face-cream",

        "shortDescription": null,

        "primaryImage": null,

        "pricing": {

          "mrp": 599,

          "salePrice": 499

        },

        "ratingSummary": {

          "average": 0,

          "count": 0

        },

        "brand": {

          "\_id": "696cda312a408675b68bbd5e",

          "name": "Test Brand",

          "slug": "test-brand"

        }

      }

    \],

    "facets": {

      "categories": \[\],

      "brands": \[\],

      "priceRanges": \[\]

    },

    "pagination": {

      "page": 1,

      "limit": 20,

      "total": 6,

      "totalPages": 1

    }

  },

  "error": null

}

#### 1.2 Search Suggestions (Autocomplete)

**Endpoint:** `GET /api/catalog/search/suggestions`

**Query Parameters:**

- `q` (required): Partial search query  
- `limit`: Number of suggestions (default: 5, max: 10\)

**Request Example:**

curl \-X GET "http://localhost:3000/api/catalog/search/suggestions?q=face\&limit=5"

**Response:**

{

  "message": "Suggestions fetched successfully",

  "data": {

    "suggestions": \[

      {

        "type": "category",

        "text": "Face Care",

        "slug": "face-care"

      },

      {

        "type": "product",

        "text": "Neem Face Wash",

        "slug": "neem-face-wash"

      },

      {

        "type": "product",

        "text": "Ayurvedic Face Cream",

        "slug": "ayurvedic-face-cream"

      }

    \]

  },

  "error": null

}

CART:

2.1 Get Cart  
**Endpoint:** `GET /api/order/cart`

**Description:** Get or create user's active cart

**Request Example:**

curl \-X GET "http://localhost:3000/api/order/cart" \\

  \-H "Authorization: Bearer \<firebase\_token\>"

**Response:**

{

  "message": "Cart retrieved successfully",

  "data": {

    "\_id": "...",

    "userId": "...",

    "items": \[

      {

        "\_id": "...",

        "productId": "...",

        "variantId": null,

        "quantity": 2,

        "pricing": {

          "mrp": 599,

          "salePrice": 499

        }

      }

    \],

    "summary": {

      "itemCount": 2,

      "subtotal": 998,

      "tax": 179.64,

      "total": 1177.64

    }

  },

  "error": null

}

#### 2.2 Add Item to Cart

**Endpoint:** `POST /api/order/cart/items`

**Request Body:**

{

  "productId": "696db52b0d9d9119e91c9c07",

  "variantId": null,

  "quantity": 2

}

**Request Example:**

curl \-X POST "http://localhost:3000/api/order/cart/items" \\

  \-H "Authorization: Bearer \<firebase\_token\>" \\

  \-H "Content-Type: application/json" \\

  \-d '{"productId":"696db52b0d9d9119e91c9c07","variantId":null,"quantity":2}'

**Response:**

{

  "message": "Item added to cart successfully",

  "data": {

    "cart": {

      "\_id": "...",

      "items": \[...\],

      "summary": {...}

    }

  },

  "error": null

}

#### 2.3 Update Cart Item Quantity

**Endpoint:** `PUT /api/order/cart/items/:itemId`

**Request Body:**

{

  "quantity": 3

}

**Request Example:**

curl \-X PUT "http://localhost:3000/api/order/cart/items/507f1f77bcf86cd799439011" \\

  \-H "Authorization: Bearer \<firebase\_token\>" \\

  \-H "Content-Type: application/json" \\

  \-d '{"quantity":3}'

**Response:**

{

  "message": "Cart item updated successfully",

  "data": {

    "cart": {...}

  },

  "error": null

}

#### 2.4 Remove Item from Cart

**Endpoint:** `DELETE /api/order/cart/items/:itemId`

**Request Example:**

curl \-X DELETE "http://localhost:3000/api/order/cart/items/507f1f77bcf86cd799439011" \\

  \-H "Authorization: Bearer \<firebase\_token\>"

**Response:**

{

  "message": "Item removed from cart successfully",

  "data": {

    "cart": {...}

  },

  "error": null

}

#### 2.5 Clear Cart

**Endpoint:** `DELETE /api/order/cart/clear`

**Request Example:**

curl \-X DELETE "http://localhost:3000/api/order/cart/clear" \\

  \-H "Authorization: Bearer \<firebase\_token\>"

**Response:**

{

  "message": "Cart cleared successfully",

  "data": {

    "cart": {

      "items": \[\],

      "summary": {

        "itemCount": 0,

        "subtotal": 0,

        "tax": 0,

        "total": 0

      }

    }

  },

  "error": null

}

—

3\. Newsletter Subscription API

### Public Endpoints

#### 3.1 Subscribe to Newsletter

**Endpoint:** `POST /api/cms/newsletters/subscribe`

**Request Body:**

{

  "email": "user@example.com",

  "source": "footer",

  "popup\_id": null,

  "metadata": {

    "user\_agent": "Mozilla/5.0...",

    "ip\_address": "192.168.1.1",

    "page\_url": "https://example.com/home"

  }

}

**Required Fields:**

- `email`: Valid email address

**Optional Fields:**

- `source`: Source of subscription (popup, footer, page) \- default: "footer"  
- `popup_id`: Reference to popup that triggered subscription  
- `metadata`: Additional tracking information

**Request Example:**

curl \-X POST "http://localhost:3000/api/cms/newsletters/subscribe" \\

  \-H "Content-Type: application/json" \\

  \-d '{"email":"user@example.com","source":"footer"}'

**Response (New Subscription):**

{

  "message": "Successfully subscribed to newsletter",

  "data": {

    "email": "user@example.com",

    "subscribed\_at": "2026-01-26T15:07:53.491Z"

  },

  "error": null

}

**Response (Already Subscribed):**

{

  "message": "Already subscribed",

  "data": {

    "email": "user@example.com",

    "subscribed\_at": "2026-01-26T15:07:53.491Z"

  },

  "error": null

}

**Response (Resubscribe):**

{

  "message": "Successfully resubscribed to newsletter",

  "data": {

    "email": "user@example.com",

    "subscribed\_at": "2026-01-26T15:07:53.491Z"

  },

  "error": null

}

#### 3.2 Unsubscribe from Newsletter

**Endpoint:** `POST /api/cms/newsletters/unsubscribe`

**Request Body:**

{

  "email": "user@example.com"

}

**Request Example:**

curl \-X POST "http://localhost:3000/api/cms/newsletters/unsubscribe" \\

  \-H "Content-Type: application/json" \\

  \-d '{"email":"user@example.com"}'

**Response:**

{

  "message": "Successfully unsubscribed from newsletter",

  "data": {

    "email": "user@example.com"

  },

  "error": null

}

**Response (Not Found):**

{

  "message": "Email not found in subscribers",

  "data": null,

  "error": null

}

—

Product Page  
GET APIs

1. Basic Details  
   \- Product photos  
   \- Ratings  
   \- Product Name  
   \- Price  
   \- Compare at price  
   \- Variants  
   \- Left in stock number  
2. Basket  
   \- Fetch basket/bundles  
   \- fetch recommended products  
3. Product Description  
   \- Ingredients and its photos  
   \- Our Values  
   \- How to use  
   \- Shipping and Returns  
   \- Policies  
4. Client Reviews elaborated  
5. Recommendations

POST APIs

1. Add to cart api  
2. Buy now  
3. Check pincode delivery  
4. Add bundle to basket  
5. Write a review api

## 1\. Basic Product Details

### 1.1 Get Product by Slug

Retrieve complete product information including photos, ratings, name, price, and variants.

**Endpoint**: `GET /api/catalog/products/:slug`

**Authentication**: Public (no auth required)

**Example Request**:

curl "http://localhost:3000/api/catalog/products/vitamin-c-serum"

**Example Response**:

{

  "message": "Product fetched successfully",

  "data": {

    "product": {

      "\_id": "69761bc724a4275296b63a92",

      "name": "Vitamin C Serum",

      "slug": "vitamin-c-serum",

      "sku": "VIT-C-SERUM",

      "description": "Brightening vitamin C face serum for radiant skin",

      "shortDescription": "Brightening vitamin C face serum",

      "benefits": \["Brightens skin", "Reduces dark spots", "Antioxidant protection"\],

      "howToUse": "Apply 2-3 drops on clean face, massage gently",

      "brand": {

        "\_id": "...",

        "name": "Brand Name",

        "slug": "brand-slug",

        "logo": {...}

      },

      "productType": "simple",

      "status": "active",

      "isFeatured": false,

      "isBestseller": true,

      "isNewArrival": true,

      "tags": \["vitamin-c", "brightening", "serum"\],

      "attributes": {

        "skinType": \["all", "dry", "oily"\],

        "concerns": \["dark-spots", "dullness"\]

      },

      "seo": {

        "title": "Vitamin C Serum \- Brighten Your Skin",

        "description": "...",

        "keywords": \["vitamin c", "serum", "brightening"\]

      },

      "hsnCode": "33049900",

      "ratingSummary": {

        "average": 4.5,

        "count": 156

      },

      "primaryImage": {

        "url": "https://...",

        "altText": "Vitamin C Serum"

      },

      "pricing": {

        "mrp": 1499,

        "salePrice": 1299,

        "discountPercent": 13

      },

      "categories": \[

        {

          "\_id": "...",

          "name": "Serums",

          "slug": "serums",

          "isPrimary": true

        }

      \],

      "bundles": \[\]

    }

  },

  "error": null

}

### 1.2 Get Product Variants

Retrieve all available size/variant options for a product.

**Endpoint**: `GET /api/catalog/products/:slug/variants`

**Authentication**: Public

**Example Request**:

curl "http://localhost:3000/api/catalog/products/vitamin-c-serum/variants"

**Example Response**:

{

  "message": "Variants fetched successfully",

  "data": {

    "variants": \[

      {

        "\_id": "69761e7e24a4275296b63ca6",

        "name": "50ml",

        "sku": "VIT-50",

        "variantType": null,

        "mrp": 1499,

        "salePrice": 1299,

        "discountPercent": 13,

        "weight": 50,

        "isDefault": true,

        "sortOrder": 0

      },

      {

        "\_id": "69761e7e24a4275296b63caa",

        "name": "100ml",

        "sku": "VIT-100",

        "variantType": null,

        "mrp": 1599,

        "salePrice": 1399,

        "discountPercent": 13,

        "weight": 100,

        "isDefault": false,

        "sortOrder": 1

      }

    \]

  },

  "error": null

}

### 1.3 Check Stock Availability

Check if a specific variant is in stock.

**Endpoint**: `GET /api/inventory/stock/check/:variantId`

**Authentication**: Public

**Example Request**:

curl "http://localhost:3000/api/inventory/stock/check/69761e7e24a4275296b63ca6"

**Example Response**:

{

  "message": "Stock availability checked",

  "data": {

    "sku": "VIT-50",

    "status": "in\_stock",

    "isAvailable": true,

    "availableQuantity": 150,

    "lowStockWarning": false,

    "allowBackorder": false

  },

  "error": null

}

### 1.4 Get Product Media/Photos

Retrieve all product images and videos.

**Endpoint**: `GET /api/catalog/products/:slug/media`

**Authentication**: Public

**Example Request**:

curl "http://localhost:3000/api/catalog/products/vitamin-c-serum/media"

**Example Response**:

{

  "message": "Media fetched successfully",

  "data": {

    "media": \[

      {

        "\_id": "...",

        "type": "image",

        "url": "https://res.cloudinary.com/.../product-1.jpg",

        "altText": "Vitamin C Serum Front View",

        "isPrimary": true,

        "sortOrder": 0

      },

      {

        "\_id": "...",

        "type": "image",

        "url": "https://res.cloudinary.com/.../product-2.jpg",

        "altText": "Vitamin C Serum Ingredients",

        "isPrimary": false,

        "sortOrder": 1

      }

    \]

  },

  "error": null

}

---

## 2\. Bundles & Basket

### 2.1 Get All Bundles

Retrieve list of active product bundles.

**Endpoint**: `GET /api/catalog/bundles`

**Authentication**: Public

**Query Parameters**:

- `limit` (optional): Number of results (default: 20, max: 50\)

**Example Request**:

curl "http://localhost:3000/api/catalog/bundles?limit=10"

**Example Response**:

{

  "message": "Bundles fetched successfully",

  "data": {

    "bundles": \[

      {

        "\_id": "...",

        "name": "Complete Skincare Kit",

        "slug": "complete-skincare-kit",

        "description": "Full skincare routine bundle",

        "image": {

          "url": "https://...",

          "publicId": "..."

        },

        "originalPrice": 3999,

        "finalPrice": 2999,

        "savings": 1000,

        "validFrom": "2026-01-01T00:00:00.000Z",

        "validTo": "2026-12-31T23:59:59.999Z"

      }

    \]

  },

  "error": null

}

### 2.2 Get Bundle Details

Get detailed information about a specific bundle including all products.

**Endpoint**: `GET /api/catalog/bundles/:slug`

**Authentication**: Public

**Example Request**:

curl "http://localhost:3000/api/catalog/bundles/complete-skincare-kit"

**Example Response**:

{

  "message": "Bundle fetched successfully",

  "data": {

    "bundle": {

      "\_id": "...",

      "name": "Complete Skincare Kit",

      "slug": "complete-skincare-kit",

      "description": "Everything you need for complete skincare",

      "image": {...},

      "originalPrice": 3999,

      "finalPrice": 2999,

      "savings": 1000,

      "validFrom": "2026-01-01T00:00:00.000Z",

      "validTo": "2026-12-31T23:59:59.999Z",

      "items": \[

        {

          "\_id": "...",

          "product": {

            "\_id": "...",

            "name": "Face Wash",

            "slug": "face-wash",

            "primaryImage": {...}

          },

          "variant": {

            "\_id": "...",

            "name": "100ml",

            "sku": "FW-100",

            "mrp": 599,

            "salePrice": 499

          },

          "quantity": 1,

          "itemTotal": 499,

          "sortOrder": 0

        },

        {

          "\_id": "...",

          "product": {

            "\_id": "...",

            "name": "Vitamin C Serum",

            "slug": "vitamin-c-serum",

            "primaryImage": {...}

          },

          "variant": {

            "\_id": "...",

            "name": "50ml",

            "sku": "VIT-50",

            "mrp": 1499,

            "salePrice": 1299

          },

          "quantity": 1,

          "itemTotal": 1299,

          "sortOrder": 1

        }

      \]

    }

  },

  "error": null

}

---

## 3\. Recommended Products

### 3.1 Get Related Products

Get all types of related products (cross-sell, up-sell, frequently bought together).

**Endpoint**: `GET /api/catalog/products/:slug/related`

**Authentication**: Public

**Query Parameters**:

- `type` (optional): Filter by type (crossSell|upSell|frequentlyBoughtTogether)  
- `limit` (optional): Number of products per type (default: 10, max: 20\)

**Example Request**:

curl "http://localhost:3000/api/catalog/products/vitamin-c-serum/related?limit=5"

**Example Response**:

{

  "message": "Related products fetched successfully",

  "data": {

    "related": {

      "crossSell": \[

        {

          "\_id": "...",

          "name": "Hyaluronic Acid Serum",

          "slug": "hyaluronic-acid-serum",

          "shortDescription": "Hydrating serum",

          "primaryImage": {...},

          "pricing": {

            "mrp": 1299,

            "salePrice": 1099,

            "discountPercent": 15

          },

          "ratingSummary": {

            "average": 4.7,

            "count": 89

          }

        }

      \],

      "upSell": \[

        {

          "\_id": "...",

          "name": "Premium Vitamin C Serum",

          "slug": "premium-vitamin-c-serum",

          "shortDescription": "Advanced formula with 20% Vitamin C",

          "primaryImage": {...},

          "pricing": {

            "mrp": 2499,

            "salePrice": 2199,

            "discountPercent": 12

          },

          "ratingSummary": {

            "average": 4.9,

            "count": 234

          }

        }

      \],

      "frequentlyBoughtTogether": \[

        {

          "\_id": "...",

          "name": "Sunscreen SPF 50",

          "slug": "sunscreen-spf-50",

          "shortDescription": "Broad spectrum protection",

          "primaryImage": {...},

          "pricing": {

            "mrp": 899,

            "salePrice": 749,

            "discountPercent": 17

          },

          "ratingSummary": {

            "average": 4.6,

            "count": 412

          }

        }

      \]

    }

  },

  "error": null

}

### 4.1 Get Product Reviews

Retrieve all reviews for a product with ratings distribution.

**Endpoint**: `GET /api/engagement/products/:productId/reviews`

**Authentication**: Public

**Query Parameters**:

- `page` (optional): Page number (default: 1\)  
- `limit` (optional): Reviews per page (default: 20\)  
- `rating` (optional): Filter by rating (1-5)  
- `sortBy` (optional): Sort order (createdAt|helpful) \- default: createdAt  
- `order` (optional): asc|desc \- default: desc

**Example Request**:

curl "http://localhost:3000/api/engagement/products/69761bc724a4275296b63a92/reviews?page=1\&limit=10\&sortBy=helpful"

**Example Response**:

{

  "message": "Reviews fetched successfully",

  "data": {

    "reviews": \[

      {

        "\_id": "...",

        "rating": 5,

        "title": "Excellent Product",

        "content": "This vitamin C serum has transformed my skin. Highly recommended\!",

        "images": \[

          {

            "url": "https://...",

            "publicId": "..."

          }

        \],

        "isVerifiedPurchase": true,

        "isFeatured": false,

        "helpfulCount": 45,

        "adminResponse": null,

        "adminResponseAt": null,

        "createdAt": "2026-01-20T10:30:00.000Z",

        "user": {

          "firstName": "John",

          "lastName": "D"

        }

      },

      {

        "\_id": "...",

        "rating": 4,

        "title": "Good product",

        "content": "Nice serum, works well but takes time to show results",

        "images": \[\],

        "isVerifiedPurchase": true,

        "isFeatured": false,

        "helpfulCount": 23,

        "adminResponse": "Thank you for your feedback\! Results typically show in 4-6 weeks.",

        "adminResponseAt": "2026-01-21T14:20:00.000Z",

        "createdAt": "2026-01-19T15:45:00.000Z",

        "user": {

          "firstName": "Sarah",

          "lastName": "M"

        }

      }

    \],

    "stats": {

      "averageRating": 4.5,

      "totalReviews": 156,

      "distribution": {

        "5": 89,

        "4": 45,

        "3": 15,

        "2": 5,

        "1": 2

      }

    },

    "pagination": {

      "total": 156,

      "page": 1,

      "limit": 10,

      "totalPages": 16,

      "hasNextPage": true,

      "hasPrevPage": false

    }

  },

  "error": null

}

5\. Product Description Details

### 5.1 Get Product Ingredients

Retrieve detailed ingredient information with images.

**Endpoint**: `GET /api/catalog/products/:slug/ingredients`

**Authentication**: Public

**Example Request**:

curl "http://localhost:3000/api/catalog/products/vitamin-c-serum/ingredients"

**Example Response**:

{

  "message": "Ingredients fetched successfully",

  "data": {

    "ingredients": \[

      {

        "\_id": "...",

        "ingredient": {

          "\_id": "...",

          "name": "Vitamin C (Ascorbic Acid)",

          "slug": "vitamin-c",

          "benefits": \["Brightens skin", "Reduces dark spots", "Antioxidant"\],

          "image": {

            "url": "https://...",

            "altText": "Vitamin C"

          }

        },

        "percentage": 15.0,

        "isKeyIngredient": true,

        "sortOrder": 0

      },

      {

        "\_id": "...",

        "ingredient": {

          "\_id": "...",

          "name": "Hyaluronic Acid",

          "slug": "hyaluronic-acid",

          "benefits": \["Hydrates", "Plumps skin", "Reduces fine lines"\],

          "image": {

            "url": "https://...",

            "altText": "Hyaluronic Acid"

          }

        },

        "percentage": 2.0,

        "isKeyIngredient": true,

        "sortOrder": 1

      }

    \]

  },

  "error": null

}

### 5.2 Get Product Details (How to Use, Benefits)

Product details including howToUse and benefits are included in the main product endpoint:

**Endpoint**: `GET /api/catalog/products/:slug`

Fields included:

- `benefits` (array): List of product benefits  
- `howToUse` (string): Usage instructions  
- `description` (string): Full product description  
- `shortDescription` (string): Brief description

---

## 6\. Shipping, Returns & Policies

Shipping information and policies are typically stored in CMS. For product-specific shipping:

### 6.1 Get Product with Full Details

**Endpoint**: `GET /api/catalog/products/:slug`

The product response includes:

- `hsnCode`: HSN code for shipping/tax purposes  
- Product weight (in variants)  
- Categories (may include shipping rules)

### 6.2 Get CMS Pages for Policies

**Endpoint**: `GET /api/cms/pages/:slug`

**Authentication**: Public

Common policy page slugs:

- `shipping-policy`  
- `return-policy`  
- `privacy-policy`  
- `terms-and-conditions`

**Example Request**:

curl "http://localhost:3000/api/cms/pages/shipping-policy"

**Example Response**:

{

  "message": "Page fetched successfully",

  "data": {

    "page": {

      "\_id": "...",

      "title": "Shipping Policy",

      "slug": "shipping-policy",

      "content": "\<p\>We ship across India...\</p\>",

      "seo": {...},

      "isPublished": true

    }

  },

  "error": null

}

---

## 7\. Our Values & Brand Info

### 7.1 Get Brand Information

Brand information is included in product details:

**Endpoint**: `GET /api/catalog/products/:slug`

The response includes `brand` object with:

- Brand name  
- Brand slug  
- Brand logo  
- Brand description

### 7.2 Get CMS Content for Values

**Endpoint**: `GET /api/cms/pages/our-values`

**Authentication**: Public

Retrieve brand values, mission, vision from CMS pages.

—

Add to Cart  
Add a product (regular or bundle) to the shopping cart.

**Endpoint**: `POST /api/order/cart/items` **Authentication**: Required (Customer, Admin, or Guest) **Method**: POST

### Request

**Headers**:

Content-Type: application/json

Authorization: Bearer \<access\_token\>

**Body**:

{

  "productId": "69761bc724a4275296b63a97",

  "variantId": "69761e8424a4275296b63cb5",

  "quantity": 2

}

**Parameters**:

- `productId` (string, required): Product or bundle ID from catalog  
- `variantId` (string, required): Variant ID for the product  
- `quantity` (number, required): Quantity (1-999)  
- `customization` (object, optional): Custom product options

### Response

**Success (200 OK)**:

{

  "message": "Item added to cart successfully",

  "data": {

    "cart": {

      "\_id": "6977963d6579631b42d0e861",

      "userId": "696cc9b560a2a1b8e05e8075",

      "userType": "registered",

      "status": "active",

      "itemCount": 1,

      "subtotal": 2999,

      "grandTotal": 2999,

      "items": \[

        {

          "\_id": "697796476579631b42d0e865",

          "productId": "69761bc724a4275296b63a97",

          "variantId": "69761e8424a4275296b63cb5",

          "quantity": 2,

          "unitPrice": 2999,

          "unitMrp": 2999,

          "lineTotal": 5998,

          "productName": "Complete Skincare Kit",

          "variantName": "50ml",

          "sku": "COM-50"

        }

      \]

    }

  },

  "error": null

}

**Error \- Out of Stock (400)**:

{

  "message": "Product is out of stock",

  "data": null,

  "error": null

}

**Error \- Validation (400)**:

{

  "message": "Validation failed",

  "data": null,

  "error": "\\"quantity\\" must be at least 1"

}

### Test Command

\# Get admin token first

ADMIN\_TOKEN=$(curl \-s \-X POST "http://localhost:3000/api/auth/admin/login" \\

  \-H "Content-Type: application/json" \\

  \-d '{"email":"admin@cleanse.com","password":"ChangeMe123\!"}' \\

  | grep \-o '"accessToken":"\[^"\]\*"' | cut \-d'"' \-f4)

\# Add item to cart

curl \-X POST "http://localhost:3000/api/order/cart/items" \\

  \-H "Content-Type: application/json" \\

  \-H "Authorization: Bearer $ADMIN\_TOKEN" \\

  \-d '{

    "productId": "69761bc724a4275296b63a97",

    "variantId": "69761e8424a4275296b63cb5",

    "quantity": 2

  }'

**Notes**:

- Cart is automatically created if it doesn't exist  
- Inventory is validated before adding items  
- Same endpoint works for regular products and bundles  
- Guest users can add items with guest session token

---

## 2\. Buy Now (Quick Checkout)

"Buy Now" functionality is a combination of two API calls: Add to Cart \+ Initiate Checkout.

### Step 1: Add Item to Cart

Use the Add to Cart endpoint above with quantity=1.

### Step 2: Initiate Checkout

**Endpoint**: `POST /api/order/checkout` **Authentication**: Required (Customer only, not guest or admin) **Method**: POST

### Request

**Headers**:

Content-Type: application/json

Authorization: Bearer \<customer\_access\_token\>

**Body**:

{

  "shippingAddressId": "696d1234567890abcdef1234",

  "billingAddressId": "696d1234567890abcdef1234",

  "paymentMethod": "razorpay"

}

**Parameters**:

- `shippingAddressId` (string, optional): Pre-saved shipping address ID  
- `billingAddressId` (string, optional): Pre-saved billing address ID (defaults to shipping)  
- `paymentMethod` (string, required): Payment method \- `razorpay`, `cod`, `wallet`

### Response

**Success (201 Created)**:

{

  "message": "Checkout initiated successfully",

  "data": {

    "sessionId": "6977a1234567890abcdef123",

    "cartId": "6977963d6579631b42d0e861",

    "status": "pending",

    "subtotal": 2999,

    "shippingTotal": 50,

    "taxTotal": 270,

    "grandTotal": 3319,

    "expiresAt": "2026-01-26T17:30:00.000Z",

    "items": \[

      {

        "productId": "69761bc724a4275296b63a97",

        "variantId": "69761e8424a4275296b63cb5",

        "quantity": 2,

        "unitPrice": 2999,

        "lineTotal": 5998

      }

    \]

  },

  "error": null

}

**Error \- Authentication Required (401)**:

{

  "message": "Authentication required",

  "data": null,

  "error": "Checkout requires registered user account"

}

**Error \- Empty Cart (400)**:

{

  "message": "Cart is empty",

  "data": null,

  "error": "Cannot checkout with empty cart"

}

### Complete Buy Now Flow

\# 1\. Login as customer

CUSTOMER\_TOKEN="\<firebase\_token\_or\_customer\_jwt\>"

\# 2\. Add product to cart

curl \-X POST "http://localhost:3000/api/order/cart/items" \\

  \-H "Authorization: Bearer $CUSTOMER\_TOKEN" \\

  \-H "Content-Type: application/json" \\

  \-d '{

    "productId": "69761bc724a4275296b63a97",

    "variantId": "69761e8424a4275296b63cb5",

    "quantity": 1

  }'

\# 3\. Immediately initiate checkout

curl \-X POST "http://localhost:3000/api/order/checkout" \\

  \-H "Authorization: Bearer $CUSTOMER\_TOKEN" \\

  \-H "Content-Type: application/json" \\

  \-d '{

    "paymentMethod": "razorpay"

  }'

**Notes**:

- Guest users cannot checkout \- must register/login first  
- Admin accounts cannot checkout (designed for management, not shopping)  
- Checkout session expires after 30 minutes  
- Cart is locked during checkout to prevent modifications

---

## 3\. Check Pincode Delivery

Validate delivery availability for a pincode.

**Endpoint**: `POST /api/auth/addresses/validate-pincode` **Authentication**: None (Public) **Method**: POST

### Request

**Headers**:

Content-Type: application/json

**Body**:

{

  "pincode": "110001"

}

**Parameters**:

- `pincode` (string, required): 6-digit Indian pincode

### Response

**Success (200 OK)**:

{

  "message": "Pincode validated successfully",

  "data": {

    "pincode": "110001",

    "city": "New Delhi",

    "state": "Delhi",

    "country": "India",

    "isValid": true

  },

  "error": null

}

**Invalid Pincode (400)**:

{

  "message": "Invalid pincode",

  "data": {

    "pincode": "999999",

    "isValid": false

  },

  "error": "Delivery not available for this pincode"

}

**Validation Error (400)**:

{

  "message": "Validation failed",

  "data": null,

  "error": "\\"pincode\\" must be a 6-digit number"

}

### Test Command

curl \-X POST "http://localhost:3000/api/auth/addresses/validate-pincode" \\

  \-H "Content-Type: application/json" \\

  \-d '{"pincode": "110001"}'

**Notes**:

- No authentication required  
- Returns city and state information  
- Used before checkout to validate delivery area  
- Response time: \<100ms

---

## 4\. Add Bundle to Cart

Bundles are added using the same Add to Cart endpoint. The only difference is the productId refers to a bundle-type product.

**Endpoint**: `POST /api/order/cart/items` **Authentication**: Required (Customer, Admin, or Guest) **Method**: POST

### Finding Bundles

First, fetch bundle products from catalog:

curl \-X GET "http://localhost:3000/api/catalog/products?productType=bundle\&page=1\&limit=10"

**Response**:

{

  "message": "Products fetched successfully",

  "data": {

    "products": \[

      {

        "\_id": "69761bc724a4275296b63a97",

        "name": "Complete Skincare Kit",

        "slug": "complete-skincare-kit",

        "shortDescription": "Full skincare routine in one kit",

        "productType": "bundle",

        "tags": \["kit", "skincare", "combo"\],

        "pricing": {

          "mrp": 2999,

          "salePrice": null,

          "discountPercent": 0

        }

      }

    \]

  }

}

### Get Bundle Variants

curl \-X GET "http://localhost:3000/api/catalog/products/complete-skincare-kit/variants"

**Response**:

{

  "message": "Variants fetched successfully",

  "data": {

    "variants": \[

      {

        "\_id": "69761e8424a4275296b63cb5",

        "name": "50ml",

        "sku": "COM-50",

        "mrp": 2999,

        "isDefault": true

      }

    \]

  }

}

### Add Bundle to Cart

Use the standard Add to Cart endpoint:

curl \-X POST "http://localhost:3000/api/order/cart/items" \\

  \-H "Authorization: Bearer \<access\_token\>" \\

  \-H "Content-Type: application/json" \\

  \-d '{

    "productId": "69761bc724a4275296b63a97",

    "variantId": "69761e8424a4275296b63cb5",

    "quantity": 1

  }'

**Response**: Same as regular Add to Cart response

**Notes**:

- Bundles have their own SKUs and pricing  
- Bundle inventory is tracked separately  
- Bundle items are displayed as single line items in cart  
- Same inventory validation applies

## Write a Review

Submit a product review after purchase.

**Endpoint**: `POST /api/engagement/products/:productId/reviews` **Authentication**: Required (Customer only) **Method**: POST

### Request

**Headers**:

Content-Type: application/json

Authorization: Bearer \<customer\_access\_token\>

**URL Parameters**:

- `productId` (string): Product ID to review

**Body**:

{

  "rating": 5,

  "title": "Excellent product",

  "content": "Works great for my skin type. Highly recommended\!",

  "images": \[

    {

      "url": "https://res.cloudinary.com/.../review-image-1.jpg",

      "publicId": "reviews/image1"

    }

  \]

}

**Parameters**:

- `rating` (number, required): Rating from 1 to 5  
- `title` (string, optional): Review title (max 200 characters)  
- `content` (string, optional): Review text (max 5000 characters)  
- `images` (array, optional): Array of image objects with url and publicId (max 5 images)  
- `orderId` (string, optional): Order ID if review is for verified purchase  
- `orderItemId` (string, optional): Specific order item ID

### Response

**Success (201 Created)**:

{

  "message": "Review submitted successfully",

  "data": {

    "review": {

      "\_id": "6977b1234567890abcdef456",

      "productId": "696ddc9d2505ea90a4976af6",

      "userId": "696d1234567890abcdef789",

      "rating": 5,

      "title": "Excellent product",

      "content": "Works great for my skin type. Highly recommended\!",

      "status": "pending",

      "images": \[

        "https://res.cloudinary.com/.../review-image-1.jpg"

      \],

      "isVerifiedPurchase": true,

      "createdAt": "2026-01-26T16:45:00.000Z"

    }

  },

  "error": null

}

**Error \- Not Authenticated (401)**:

{

  "message": "Authentication required",

  "data": null,

  "error": "Please login to write a review"

}

**Error \- Invalid Token (401)**:

{

  "message": "Authentication failed",

  "data": null,

  "error": "Invalid or expired token"

}

**Error \- Validation (400)**:

{

  "message": "Validation failed",

  "data": null,

  "error": "\\"rating\\" must be between 1 and 5"

}

**Error \- Duplicate Review (409)**:

{

  "message": "Review already exists",

  "data": null,

  "error": "You have already reviewed this product"

}

