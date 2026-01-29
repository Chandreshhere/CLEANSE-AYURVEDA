Homepage  
GET APIs

Hero section  
\- Banner  
\- Link  
\- Text  
\- Button Link

Key Endpoints for Hero Section:  
Get Hero Banners (Public):

GET http://localhost:3000/api/cms/banners?placement=hero \- All hero banners  
GET http://localhost:3000/api/cms/banners?placement=hero\&target\_page=home \- Homepage heroes  
GET http://localhost:3000/api/cms/banners?placement=top\_strip \- Top announcements  
Create Banner (Admin):

POST http://localhost:3000/api/cms/admin/banners \- Create new hero banner  
Banner Structure (Hero Section):  
A complete hero banner includes:

Text: title (main heading), subtitle (subheading)  
Button: cta\_text (button label), cta\_url (link destination)  
Images: image\_desktop\_url, image\_mobile\_url (responsive)  
Targeting: placement (hero/top\_strip/mid\_page), target\_pages (specific pages)  
Scheduling: starts\_at, ends\_at, is\_active, priority (display order)

—

Hero Section / Banner API Endpoints \- Complete Documentation  
Overview  
Banners are versatile content blocks used for hero sections, announcements, and promotional displays. They support:

Title & Subtitle text  
Call-to-Action (CTA) buttons with custom text and links  
Responsive images (desktop and mobile)  
Placement types: hero, top\_strip, mid\_page  
Scheduling with start/end dates  
Target page filtering  
All endpoints are accessed through the API Gateway at http://localhost:3000.

Base URLs

Consumer (Public): http://localhost:3000/api/cms/banners  
Admin (Protected):  http://localhost:3000/api/cms/admin/banners  
1\. GET ACTIVE BANNERS ✅ PUBLIC  
Endpoint: GET /api/cms/banners  
Authentication: None required (public endpoint)

Query Parameters:

placement (optional): Filter by placement type  
Values: hero, top\_strip, mid\_page  
target\_page (optional): Filter banners for specific page  
Example: home, products, collections  
Use Cases:  
1\. Get All Active Banners:

curl http://localhost:3000/api/cms/banners  
2\. Get Hero Banners Only:

curl "http://localhost:3000/api/cms/banners?placement=hero"  
3\. Get Top Strip Announcements:

curl "http://localhost:3000/api/cms/banners?placement=top\_strip"  
4\. Get Banners for Specific Page:

curl "http://localhost:3000/api/cms/banners?placement=hero\&target\_page=home"  
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
Response Fields Explained:  
Field	Type	Description	Required  
\_id	string	Unique banner ID	Auto-generated  
placement	string	Where banner appears (hero, top\_strip, mid\_page)	Yes  
title	string	Main heading text (max 100 chars)	Optional  
subtitle	string	Subheading text (max 200 chars)	Optional  
cta\_text	string	Button text (max 50 chars)	Optional  
cta\_url	string	Button link URL	Optional  
image\_desktop\_url	string	Desktop image URL (http/https)	Optional  
image\_mobile\_url	string	Mobile image URL (http/https)	Optional  
Note: The response only returns currently active banners that:

Have is\_active: true  
Are within their scheduled date range (if set)  
Match the placement/target\_page filters (if provided)  
2\. CREATE BANNER 🔒 ADMIN ONLY  
Endpoint: POST /api/cms/admin/banners  
Authentication: Required (Bearer token)

Content-Type: application/json

Request Body Examples:  
Complete Hero Banner:

{  
  "name": "Spring Collection 2026",  
  "placement": "hero",  
  "title": "Discover Pure Ayurvedic Beauty",  
  "subtitle": "100% Natural | Cruelty Free | Made in India",  
  "cta\_text": "Shop Now",  
  "cta\_url": "/collections/spring-2026",  
  "image\_desktop\_url": "https://res.cloudinary.com/your-cloud/image/upload/v1234/hero-desktop.jpg",  
  "image\_mobile\_url": "https://res.cloudinary.com/your-cloud/image/upload/v1234/hero-mobile.jpg",  
  "target\_pages": \["home", "collections"\],  
  "is\_active": true,  
  "priority": 10,  
  "starts\_at": "2026-01-26T00:00:00.000Z",  
  "ends\_at": "2026-04-30T23:59:59.000Z"  
}  
Simple Top Strip Announcement:

{  
  "name": "Free Shipping Announcement",  
  "placement": "top\_strip",  
  "title": "Free Shipping on Orders Over $50",  
  "cta\_text": "Learn More",  
  "cta\_url": "/shipping-policy",  
  "is\_active": true,  
  "priority": 100  
}  
Mid-Page Banner with Image:

{  
  "name": "Product Showcase Banner",  
  "placement": "mid\_page",  
  "title": "New Ayurvedic Skincare Line",  
  "subtitle": "Unlock the power of natural ingredients",  
  "cta\_text": "Explore Products",  
  "cta\_url": "/category/skincare",  
  "image\_desktop\_url": "https://res.cloudinary.com/your-cloud/image/upload/v1234/skincare-banner.jpg",  
  "target\_pages": \["home", "skincare"\],  
  "is\_active": true,  
  "priority": 5  
}  
Field Specifications:  
Field	Type	Required	Validation	Description  
name	string	Yes	1-100 chars	Internal identifier for admin  
placement	string	Yes	hero, top\_strip, mid\_page	Where banner appears  
title	string	No	max 100 chars	Main heading  
subtitle	string	No	max 200 chars	Subheading  
cta\_text	string	No	max 50 chars	Button text  
cta\_url	string	No	any valid string	Button link (internal or external)  
image\_desktop\_url	string	No	http/https URL	Desktop image  
image\_mobile\_url	string	No	http/https URL	Mobile image  
target\_pages	array	No	array of strings	Pages to show banner on  
is\_active	boolean	No	default: true	Active status  
priority	number	No	min: 0, default: 0	Display order (higher \= first)  
starts\_at	string	No	ISO 8601 date	Schedule start date  
ends\_at	string	No	ISO 8601 date	Schedule end date (must be after start)  
Response (201 Created):

{  
  "message": "Banner created successfully",  
  "data": {  
    "name": "Spring Collection 2026",  
    "placement": "hero",  
    "title": "Discover Pure Ayurvedic Beauty",  
    "subtitle": "100% Natural | Cruelty Free | Made in India",  
    "cta\_text": "Shop Now",  
    "cta\_url": "/collections/spring-2026",  
    "image\_desktop\_url": "https://via.placeholder.com/1920x800/4A90E2/ffffff?text=Spring+Collection+Desktop",  
    "image\_mobile\_url": "https://via.placeholder.com/768x600/4A90E2/ffffff?text=Spring+Collection+Mobile",  
    "target\_pages": \["home", "collections"\],  
    "is\_active": true,  
    "priority": 10,  
    "starts\_at": "2026-01-26T00:00:00.000Z",  
    "ends\_at": "2026-04-30T23:59:59.000Z",  
    "created\_by\_id": null,  
    "\_id": "69773fbc78b8710a5d5254b4",  
    "created\_at": "2026-01-26T10:19:40.740Z",  
    "\_\_v": 0,  
    "status": "active"  
  },  
  "error": null  
}  
Validation Errors:  
Missing required field:

{  
  "message": "Validation failed",  
  "data": null,  
  "error": "Placement is required"  
}  
Invalid placement value:

{  
  "message": "Validation failed",  
  "data": null,  
  "error": "Placement must be one of: hero, top\_strip, mid\_page"  
}  
Invalid URL format:

{  
  "message": "Validation failed",  
  "data": null,  
  "error": "Desktop image URL must be a valid http or https URL"  
}  
Invalid date range:

{  
  "message": "Validation failed",  
  "data": null,  
  "error": "End date must be after start date"  
}  
3\. LIST ALL BANNERS (ADMIN) 🔒 ADMIN ONLY  
Endpoint: GET /api/cms/admin/banners  
Authentication: Required (Bearer token)

Query Parameters:

placement (optional): Filter by placement type  
is\_active (optional): Filter by active status (true/false)  
status (optional): Filter by status  
Values: active, scheduled, expired, inactive  
search (optional): Search by name (alphanumeric only)  
page (optional): Page number (default: 1, max: 1000\)  
limit (optional): Items per page (default: 20, max: 100\)  
Example Requests:

\# Get all banners (paginated)  
curl \-H "Authorization: Bearer \<token\>" \\  
  http://localhost:3000/api/cms/admin/banners

\# Get hero banners only  
curl \-H "Authorization: Bearer \<token\>" \\  
  "http://localhost:3000/api/cms/admin/banners?placement=hero"

\# Get active banners  
curl \-H "Authorization: Bearer \<token\>" \\  
  "http://localhost:3000/api/cms/admin/banners?is\_active=true"

\# Get scheduled banners  
curl \-H "Authorization: Bearer \<token\>" \\  
  "http://localhost:3000/api/cms/admin/banners?status=scheduled"

\# Search by name  
curl \-H "Authorization: Bearer \<token\>" \\  
  "http://localhost:3000/api/cms/admin/banners?search=spring"

\# Pagination  
curl \-H "Authorization: Bearer \<token\>" \\  
  "http://localhost:3000/api/cms/admin/banners?page=1\&limit=10"  
Response (200 OK):

{  
  "message": "Banners retrieved successfully",  
  "data": {  
    "banners": \[  
      {  
        "\_id": "69773fbc78b8710a5d5254b4",  
        "name": "Spring Collection 2026",  
        "placement": "hero",  
        "title": "Discover Pure Ayurvedic Beauty",  
        "subtitle": "100% Natural | Cruelty Free | Made in India",  
        "cta\_text": "Shop Now",  
        "cta\_url": "/collections/spring-2026",  
        "image\_desktop\_url": "https://...",  
        "image\_mobile\_url": "https://...",  
        "target\_pages": \["home", "collections"\],  
        "is\_active": true,  
        "priority": 10,  
        "starts\_at": "2026-01-26T00:00:00.000Z",  
        "ends\_at": "2026-04-30T23:59:59.000Z",  
        "created\_at": "2026-01-26T10:19:40.740Z",  
        "status": "active"  
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
Status Values Explained:

active: Currently live (is\_active=true, within date range)  
scheduled: Not started yet (is\_active=true, starts\_at in future)  
expired: Past end date (is\_active=true, ends\_at in past)  
inactive: Manually deactivated (is\_active=false)  
4\. GET BANNER BY ID 🔒 ADMIN ONLY  
Endpoint: GET /api/cms/admin/banners/:id  
Authentication: Required (Bearer token)

Example:

curl \-H "Authorization: Bearer \<token\>" \\  
  http://localhost:3000/api/cms/admin/banners/69773fbc78b8710a5d5254b4  
Response (200 OK):

{  
  "message": "Banner retrieved successfully",  
  "data": {  
    "\_id": "69773fbc78b8710a5d5254b4",  
    "name": "Spring Collection 2026",  
    "placement": "hero",  
    "title": "Discover Pure Ayurvedic Beauty",  
    "subtitle": "100% Natural | Cruelty Free | Made in India",  
    "cta\_text": "Shop Now",  
    "cta\_url": "/collections/spring-2026",  
    "image\_desktop\_url": "https://...",  
    "image\_mobile\_url": "https://...",  
    "target\_pages": \["home", "collections"\],  
    "is\_active": true,  
    "priority": 10,  
    "starts\_at": "2026-01-26T00:00:00.000Z",  
    "ends\_at": "2026-04-30T23:59:59.000Z",  
    "created\_at": "2026-01-26T10:19:40.740Z",  
    "status": "active"  
  },  
  "error": null  
}  
5\. UPDATE BANNER 🔒 ADMIN ONLY  
Endpoint: PUT /api/cms/admin/banners/:id  
Authentication: Required (Bearer token)

Content-Type: application/json

Request Body: (all fields optional, send only what you want to update)

{  
  "title": "Updated Hero Title",  
  "subtitle": "Updated subtitle",  
  "cta\_text": "Updated Button",  
  "priority": 20  
}  
Full Update Example:

curl \-X PUT http://localhost:3000/api/cms/admin/banners/69773fbc78b8710a5d5254b4 \\  
  \-H "Authorization: Bearer \<token\>" \\  
  \-H "Content-Type: application/json" \\  
  \-d '{  
    "title": "Exclusive Spring Sale",  
    "subtitle": "Up to 50% Off on Selected Items",  
    "cta\_text": "Shop Sale",  
    "cta\_url": "/sale/spring",  
    "priority": 20  
  }'  
Response (200 OK):

{  
  "message": "Banner updated successfully",  
  "data": {  
    "\_id": "69773fbc78b8710a5d5254b4",  
    "name": "Spring Collection 2026",  
    "placement": "hero",  
    "title": "Exclusive Spring Sale",  
    "subtitle": "Up to 50% Off on Selected Items",  
    "cta\_text": "Shop Sale",  
    "cta\_url": "/sale/spring",  
    "image\_desktop\_url": "https://...",  
    "image\_mobile\_url": "https://...",  
    "priority": 20,  
    "is\_active": true,  
    "status": "active"  
  },  
  "error": null  
}  
6\. ACTIVATE BANNER 🔒 ADMIN ONLY  
Endpoint: PATCH /api/cms/admin/banners/:id/activate  
Authentication: Required (Bearer token)

Example:

curl \-X PATCH http://localhost:3000/api/cms/admin/banners/69773fbc78b8710a5d5254b4/activate \\  
  \-H "Authorization: Bearer \<token\>"  
Response (200 OK):

{  
  "message": "Banner activated successfully",  
  "data": {  
    "\_id": "69773fbc78b8710a5d5254b4",  
    "is\_active": true  
  },  
  "error": null  
}  
7\. DEACTIVATE BANNER 🔒 ADMIN ONLY  
Endpoint: PATCH /api/cms/admin/banners/:id/deactivate  
Authentication: Required (Bearer token)

Example:

curl \-X PATCH http://localhost:3000/api/cms/admin/banners/69773fbc78b8710a5d5254b4/deactivate \\  
  \-H "Authorization: Bearer \<token\>"  
Response (200 OK):

{  
  "message": "Banner deactivated successfully",  
  "data": {  
    "\_id": "69773fbc78b8710a5d5254b4",  
    "is\_active": false  
  },  
  "error": null  
}  
8\. DELETE BANNER 🔒 ADMIN ONLY  
Endpoint: DELETE /api/cms/admin/banners/:id  
Authentication: Required (Bearer token)

Example:

curl \-X DELETE http://localhost:3000/api/cms/admin/banners/69773fbc78b8710a5d5254b4 \\  
  \-H "Authorization: Bearer \<token\>"  
Response (200 OK):

{  
  "message": "Banner deleted successfully",  
  "data": null,  
  "error": null  
}  
9\. REORDER BANNERS 🔒 ADMIN ONLY  
Endpoint: PATCH /api/cms/admin/banners/reorder  
Authentication: Required (Bearer token)

Content-Type: application/json

Purpose: Update display priority for multiple banners at once.

Request Body:

\[  
  {  
    "id": "69773fbc78b8710a5d5254b4",  
    "priority": 100  
  },  
  {  
    "id": "69773fc878b8710a5d5254b6",  
    "priority": 90  
  },  
  {  
    "id": "69762c5b2563a44a50a88138",  
    "priority": 80  
  }  
\]  
Response (200 OK):

{  
  "message": "Banners reordered successfully",  
  "data": {  
    "updated\_count": 3  
  },  
  "error": null  
}

13\. BANNER PLACEMENT GUIDE  
Hero (placement: "hero")  
Location: Full-width banner at top of page  
Typical Size: 1920x800px (desktop), 768x600px (mobile)  
Use For: Main promotions, featured collections, seasonal campaigns  
Recommended: Use carousel for multiple hero banners  
Top Strip (placement: "top\_strip")  
Location: Thin banner above header/navigation  
Typical Size: Full width, 40-60px height  
Use For: Announcements, shipping info, flash sales  
Recommended: Keep text short, single banner only  
Mid-Page (placement: "mid\_page")  
Location: Between content sections  
Typical Size: 800x400px or 1200x300px  
Use For: Secondary promotions, product highlights, category features  
Recommended: Can use multiple throughout page