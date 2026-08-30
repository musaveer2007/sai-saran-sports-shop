-- Create ss_products table
CREATE TABLE IF NOT EXISTS public.ss_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    short_desc TEXT, 
    sport TEXT,
    category TEXT,
    subcategory TEXT,
    brand TEXT,
    price NUMERIC DEFAULT 0,
    discount_price NUMERIC,
    sku TEXT,
    stock INTEGER DEFAULT 0,
    sizes TEXT,
    colors TEXT,
    weight TEXT,
    material TEXT,
    tag TEXT,
    is_featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published',
    thumbnail_url TEXT,
    image_urls TEXT[] 
);

-- Create ss_categories table
CREATE TABLE IF NOT EXISTS public.ss_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'active'
);

-- Create ss_banners table
CREATE TABLE IF NOT EXISTS public.ss_banners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0
);

-- Create ss_offers table
CREATE TABLE IF NOT EXISTS public.ss_offers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    discount_percentage NUMERIC,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    image_url TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.ss_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ss_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ss_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ss_offers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tables
CREATE POLICY "Allow public read access to ss_products" ON public.ss_products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to ss_categories" ON public.ss_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to ss_banners" ON public.ss_banners FOR SELECT USING (true);
CREATE POLICY "Allow public read access to ss_offers" ON public.ss_offers FOR SELECT USING (true);

-- Allow authenticated users to manage all tables
CREATE POLICY "Auth ALL ss_products" ON public.ss_products FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth ALL ss_categories" ON public.ss_categories FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth ALL ss_banners" ON public.ss_banners FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth ALL ss_offers" ON public.ss_offers FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create a storage bucket for media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ss_media', 'ss_media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'ss_media' bucket
CREATE POLICY "Public Access ss_media" ON storage.objects FOR SELECT USING ( bucket_id = 'ss_media' );
CREATE POLICY "Auth Upload ss_media" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'ss_media' AND auth.role() = 'authenticated' );
CREATE POLICY "Auth Update ss_media" ON storage.objects FOR UPDATE USING ( bucket_id = 'ss_media' AND auth.role() = 'authenticated' );
CREATE POLICY "Auth Delete ss_media" ON storage.objects FOR DELETE USING ( bucket_id = 'ss_media' AND auth.role() = 'authenticated' );
