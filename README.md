# Velora Ecommerce

A production-ready ecommerce website built with Next.js, TypeScript, Prisma, and NextAuth.

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 🔐 User authentication (signup/signin)
- 👨‍💼 Admin panel for product management
- 📱 Responsive design with Tailwind CSS
- 🗄️ SQLite database with Prisma ORM

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup database:**
   ```bash
   npx prisma db push
   ```

3. **Create admin user (optional):**
   - Sign up normally through the website
   - Manually update the user's role to 'ADMIN' in the database using Prisma Studio:
   ```bash
   npx prisma studio
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Admin Features

- Access admin panel at `/admin` (requires ADMIN role)
- Add new products with name, description, price, category, stock, and image
- Delete existing products
- View all products in a table format

## API Routes

- `POST /api/auth/signup` - User registration
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

## Database Schema

- **User**: id, email, name, password, role, createdAt, updatedAt
- **Product**: id, name, description, price, image, category, stock, createdAt, updatedAt
- **Order**: id, userId, total, status, createdAt, updatedAt
- **OrderItem**: id, orderId, productId, quantity, price

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **UI Components**: Headless UI, Heroicons
- **Notifications**: React Hot Toast

## Environment Variables

Create a `.env.local` file with:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
DATABASE_URL="file:./dev.db"
```

## Production Deployment

1. Change database to PostgreSQL in `prisma/schema.prisma`
2. Update `DATABASE_URL` in environment variables
3. Run `npx prisma db push` to create tables
4. Deploy to your preferred platform (Vercel, Netlify, etc.)

## Adding Products

1. Sign up and get admin access
2. Go to `/admin`
3. Click "Add Product"
4. Fill in product details:
   - Name (required)
   - Category (required)
   - Price (required)
   - Stock (required)
   - Image URL (optional)
   - Description (optional)

## Sample Product Data

You can add these sample products through the admin panel:

```json
{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 199.99,
  "category": "electronics",
  "stock": 50,
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
}
```