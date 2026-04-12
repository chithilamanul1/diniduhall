# Project Documentation: Dinidu Gardens (Roadhouse Seeduwa)

## 1. Project Overview
**Dinidu Gardens** is a premium banquet hall and event venue platform located in Seeduwa, Sri Lanka. The project combines a modern web interface with a robust backend to handle event bookings, menu management, and blog content. It is designed to provide a high-end experience for users looking to host weddings, corporate events, and other celebrations.

---

## 2. Core Tech Stack
The application is built using a modern, full-stack TypeScript environment:

*   **Frontend**: Next.js 16.2.3 (App Router), React 19.0.0 (Stable).
*   **Styling**: Tailwind CSS for responsive and modern UI.
*   **Animation**: Framer Motion for premium micro-animations and transitions.
*   **Database**: Prisma ORM with SQLite (Local) / Compatible with PostgreSQL for production.
*   **Authentication**: NextAuth.js for secure administrative access.
*   **CMS**: Contentful for headless blog and content management.
*   **Email**: Resend for automated notifications.
*   **Icons**: Lucide React for consistent iconography.

---

## 3. Project Architecture

### Folder Structure
- `/app`: Contains all Next.js App Router routes, layouts, and API endpoints.
- `/components`: Reusable UI components (Navbar, Footer, Menu, etc.).
- `/lib`: Shared utilities (Prisma client, authentication helpers, email logic).
- `/prisma`: Database schemas and migration files.
- `/proxy.ts`: Modern request interception and authentication (Next.js 16).
- `/public`: Static assets including venue images and logos.
- `/types`: Global TypeScript interface definitions.

### Database Schema (Prisma Models)
1.  **User**: Manages administrative accounts for the dashboard.
2.  **Booking**: Captures event inquiries (Customer name, event date, guest count, type, and status).
3.  **Subscriber**: Stores email addresses for newsletters.
4.  **Event**: Manages the schedule of upcoming events.
5.  **Category & MenuItem**: Power the dynamic restaurant and banquet menu.
6.  **Testimonial**: Stores featured customer reviews for the homepage.

---

## 4. Key Features

### 📅 Advanced Booking System
Integrated booking calendar and inquiry form allowing users to reserve dates for:
- Weddings
- Corporate Events
- Private Celebrations

### 🛠️ Administrative Dashboard (`/admin`)
A protected dashboard for venue managers to:
- Review and update booking statuses.
- Manage the restaurant and banquet Menu.
- Handle newsletter subscribers.
- Update featured testimonials and upcoming events.

### ✍️ Headless Blog (`/blog`)
Dynamic blog section powered by **Contentful**, allowing for regular updates on event tips, venue news, and success stories without code changes.

### 🔍 Performance & SEO
- **Semantic HTML**: Proper heading structure and ARIA labels.
- **JSON-LD**: Structured data for local business and event snippets.
- **Metadata**: Dynamic generation of SEO titles and descriptions for all routes.
- **Optimized Images**: Utilizes `next/image` for performance and responsive delivery.

---

## 5. Configuration & Deployment

### Environment Variables
The project requires the following environment variables (stored in `.env.local`):
- `DATABASE_URL`: Prisma connection string.
- `NEXTAUTH_SECRET`: Secret for session encryption.
- `CONTENTFUL_SPACE_ID` & `CONTENTFUL_ACCESS_TOKEN`: For blog integration.
- `RESEND_API_KEY`: For sending automated emails.

### Maintenance Commands
- `npm run dev`: local development server.
- `npm run build`: Production build and optimization.
- `npx prisma generate`: Update Prisma Client after schema changes.
- `npx prisma db push`: Sync schema changes to the local database.

---

## 6. Business Specifications
- **Location**: Seeduwa, Sri Lanka.
- **Capacity**: 250 - 275 guests.
- **Services**: Weddings, Catering, Corporate Events, Restaurant.
