-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  thumbnail TEXT,
  video_url TEXT NOT NULL,
  storage_path TEXT,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price_min INTEGER,
  price_max INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_date DATE,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public videos are viewable by everyone" ON videos
  FOR SELECT USING (is_public = true);

CREATE POLICY "Public portfolio is viewable by everyone" ON portfolio
  FOR SELECT USING (true);

CREATE POLICY "Public services are viewable by everyone" ON services
  FOR SELECT USING (true);

-- Insert policies (for contact form)
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Admin policies (requires authentication)
CREATE POLICY "Admins can manage videos" ON videos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage portfolio" ON portfolio
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can view leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Insert sample services
INSERT INTO services (name, description, price_min, price_max) VALUES
  ('Custom Invitation Videos', 'Personalized wedding invitation videos with animations and music', 5000, 15000),
  ('Printed Wedding Cards', 'Premium printed wedding cards with elegant designs', 3000, 10000),
  ('E-Invites', 'Digital wedding invitations with RSVP functionality', 2000, 5000),
  ('Save The Date', 'Beautiful save the date cards and digital designs', 1500, 4000),
  ('Wedding Logos', 'Custom wedding logo design and branding', 2500, 8000),
  ('Couple Monograms', 'Elegant monogram designs for couples', 2000, 6000)
ON CONFLICT DO NOTHING;

