# The Custom कारिगर - Premium Wedding Invitation Portfolio Website

A complete, full-featured wedding invitation portfolio website built with Next.js 14, TypeScript, TailwindCSS, and Supabase. Features a premium Indian-wedding aesthetic with comprehensive admin panel for content management.

## 🎨 Brand Theme & Design

### Colors
- **Primary**: Maroon/Burgundy (#6A0F16)
- **Secondary**: Beige/Sand (#F5E6D3)
- **Background**: Beige texture (`/public/assets/bg-texture.jpg`)

### Typography
- **English Headers**: Playfair Display (serif, elegant)
- **English Body**: Inter / Lato (sans-serif, clean)
- **Hindi**: Mukta / Noto Serif Devanagari

### Assets Required
Place these files in `/public/assets/`:
- `bg-texture.jpg` - Global background texture
- `logo.png` - Brand logo
- `border-pattern.png` - Decorative border pattern (repeating)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema:
   - Go to SQL Editor
   - Copy and execute `supabase/schema.sql`
3. Create Storage Buckets:
   - Go to Storage
   - Create bucket: `videos` (public)
   - Create bucket: `portfolio` (public)
4. Get your credentials:
   - Settings > API
   - Copy: Project URL, Anon Key, Service Role Key

### 3. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Add Brand Assets

Place your images in `/public/assets/`:
- `bg-texture.jpg`
- `logo.png`
- `border-pattern.png`

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── admin/              # Admin panel (protected)
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── videos/        # Video management
│   │   ├── portfolio/     # Portfolio management
│   │   ├── services/      # Services management
│   │   └── leads/         # Contact leads
│   ├── api/               # API routes
│   │   ├── admin/         # Admin API endpoints
│   │   │   ├── upload/    # File upload handler
│   │   │   ├── videos/    # Video CRUD
│   │   │   ├── portfolio/ # Portfolio CRUD
│   │   │   └── services/  # Services CRUD
│   │   └── contact/       # Contact form handler
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio listing & details
│   ├── services/           # Services page
│   ├── videos/            # Video gallery
│   └── page.tsx           # Home page (full-scroll)
├── components/
│   ├── home/              # Home page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── VideoGalleryPreview.tsx
│   │   ├── PortfolioPreview.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   ├── admin/             # Admin components
│   ├── VideoManager.tsx
│   ├── PortfolioManager.tsx
│   ├── ServiceManager.tsx
│   ├── ContactForm.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   └── supabase/          # Supabase clients
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       └── admin.ts       # Admin client
├── public/
│   └── assets/            # Brand assets
├── supabase/
│   └── schema.sql         # Database schema
└── middleware.ts          # Auth middleware
```

## 🏠 Home Page Sections

The home page is a full-scroll wedding website with:

1. **Navbar** - Sticky, with logo and navigation
2. **Hero Section** - Centered logo, video preview, CTAs
3. **About Section** - Brand story and features
4. **Services Preview** - 6 service cards with icons
5. **Video Gallery Preview** - Latest 3 videos
6. **Portfolio Preview** - Sample portfolio images
7. **Testimonials** - Client testimonials slider
8. **Contact Section** - Contact form
9. **Footer** - Links, social, copyright

## 📄 Pages

### Services Page (`/services`)
- Full service listings with icons
- Price ranges
- Detailed descriptions
- Grid layout with hover effects

### Videos Page (`/videos`)
- Full video gallery
- Thumbnail grid
- Modal video player
- YouTube and Supabase Storage support

### Portfolio Page (`/portfolio`)
- Portfolio image grid
- Project cards
- Individual project pages (`/portfolio/[id]`)
- Image lightbox

### Contact Page (`/contact`)
- Contact form
- Contact information
- Map placeholder
- Lead capture to Supabase

## 🔐 Admin Panel

### Access
- URL: `/admin/login`
- Requires Supabase authentication

### Setup Admin User
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User" > "Create new user"
3. Enter email and password
4. Use these credentials to log in

### Admin Features

#### Dashboard (`/admin/dashboard`)
- Statistics overview
- Quick actions
- Recent activity

#### Videos Manager (`/admin/videos`)
- Upload videos to Supabase Storage
- Add YouTube URLs
- Upload thumbnails
- Set tags and visibility
- Edit/Delete videos

#### Portfolio Manager (`/admin/portfolio`)
- Upload multiple images
- Add project details
- Manage portfolio items
- Edit/Delete projects

#### Services Manager (`/admin/services`)
- CRUD operations for services
- Set prices
- Add descriptions

#### Leads (`/admin/leads`)
- View all contact form submissions
- Export to CSV (coming soon)
- Filter and search

## 🗄️ Database Schema

### Tables

- **videos** - Video gallery
  - `id`, `title`, `thumbnail`, `video_url`, `storage_path`, `tags[]`, `is_public`, `created_at`

- **portfolio** - Portfolio projects
  - `id`, `title`, `description`, `images[]`, `created_at`

- **services** - Service offerings
  - `id`, `name`, `description`, `price_min`, `price_max`, `created_at`

- **leads** - Contact form submissions
  - `id`, `name`, `phone`, `event_date`, `message`, `created_at`

See `supabase/schema.sql` for complete schema with RLS policies.

## 📤 File Uploads

### Supabase Storage Setup

1. Create buckets in Supabase Storage:
   - `videos` (public)
   - `portfolio` (public)

2. Set bucket policies:
   - Public read access
   - Authenticated write access

### Upload Features

- **Videos**: Upload MP4, MOV, etc. to `videos` bucket
- **Images**: Upload JPG, PNG, etc. to `portfolio` bucket
- **Thumbnails**: Auto-generated or manually uploaded
- **Progress**: Real-time upload progress indicators

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

### Production Checklist

- [ ] Environment variables set
- [ ] Supabase Storage buckets created
- [ ] RLS policies configured
- [ ] Admin user created
- [ ] Brand assets uploaded
- [ ] Test all admin uploads
- [ ] Test contact form
- [ ] Verify all pages load

## 🎯 Features

### Frontend
- ✅ Full-scroll home page
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Video gallery with modal player
- ✅ Portfolio showcase with lightbox
- ✅ Services grid with pricing
- ✅ Contact form with validation
- ✅ Testimonials slider
- ✅ Premium Indian-wedding aesthetic
- ✅ Border pattern decorations
- ✅ Smooth scrolling

### Admin
- ✅ Secure authentication
- ✅ Video upload to Supabase Storage
- ✅ Image upload (multiple)
- ✅ CRUD for all content types
- ✅ Real-time preview
- ✅ Lead management

### Technical
- ✅ Next.js 14 App Router
- ✅ TypeScript
- ✅ TailwindCSS
- ✅ Supabase (DB + Auth + Storage)
- ✅ Server & Client Components
- ✅ API Routes
- ✅ Middleware for auth
- ✅ Image optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Vercel (recommended)

## 📝 Important Notes

1. **Storage Buckets**: Must create `videos` and `portfolio` buckets in Supabase
2. **RLS Policies**: Schema includes Row Level Security policies
3. **Admin Access**: Create admin user in Supabase Auth
4. **Assets**: All brand assets must be in `/public/assets/`
5. **Video URLs**: Supports YouTube URLs and Supabase Storage URLs
6. **Image URLs**: Supports direct URLs or Supabase Storage URLs

## 🔧 Troubleshooting

### Upload Not Working
- Check Supabase Storage buckets exist
- Verify bucket policies allow uploads
- Check browser console for errors

### Authentication Issues
- Verify environment variables
- Check Supabase Auth settings
- Ensure user exists in Supabase

### Images Not Loading
- Verify image URLs are correct
- Check Supabase Storage bucket is public
- Verify CORS settings

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ for The Custom कारिगर**

Designed with love, crafted with devotion.
