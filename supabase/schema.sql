-- Mouad Immobilière — full Supabase schema + seed
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS properties (
  id           BIGSERIAL PRIMARY KEY,
  title_fr     TEXT NOT NULL,
  title_ar     TEXT NOT NULL,
  type         TEXT NOT NULL CHECK (type IN ('vente','location')),
  category     TEXT NOT NULL CHECK (category IN ('villa','appartement','terrain','commercial')),
  price        TEXT NOT NULL,
  city         TEXT NOT NULL,
  surface      TEXT,
  rooms        INT DEFAULT 0,
  bathrooms    INT DEFAULT 0,
  badge        TEXT DEFAULT '',
  featured     BOOLEAN DEFAULT false,
  image        TEXT NOT NULL,
  desc_fr      TEXT DEFAULT '',
  desc_ar      TEXT DEFAULT '',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key          TEXT PRIMARY KEY,
  value        TEXT NOT NULL,
  label        TEXT NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO settings (key, label, value) VALUES
  ('phone',        'Numéro de téléphone',    '+212 6XX XXX XXX'),
  ('whatsapp',     'Lien WhatsApp',          'https://wa.me/2126XXXXXXXX'),
  ('email',        'Adresse email',          'contact@mouadimmobiliere.ma'),
  ('facebook',     'Page Facebook',          'https://facebook.com/mouadimmobiliere'),
  ('instagram',    'Compte Instagram',       'https://instagram.com/mouadimmobiliere'),
  ('telegram',     'Canal Telegram',         'https://t.me/mouadimmobiliere'),
  ('tiktok',       'Compte TikTok',          'https://tiktok.com/@mouadimmobiliere'),
  ('hero_title_fr','Titre Hero (FR)',         'Trouvez le bien de vos rêves'),
  ('hero_title_ar','Titre Hero (AR)',         'اعثر على عقار أحلامك'),
  ('stats_sold',   'Propriétés vendues',     '120+'),
  ('stats_clients','Clients satisfaits',     '300+'),
  ('stats_years',  'Années d''expérience',   '5+')
ON CONFLICT (key) DO NOTHING;

INSERT INTO properties (title_fr, title_ar, type, category, price, city, surface, rooms, bathrooms, badge, featured, image, desc_fr, desc_ar) VALUES
('Villa moderne avec piscine','فيلا عصرية مع مسبح','vente','villa','2 500 000 MAD','Rabat','320 m²',5,3,'Nouveau',true,'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80','Magnifique villa moderne avec piscine.','فيلا عصرية رائعة مع مسبح.'),
('Appartement vue mer','شقة بإطلالة بحرية','vente','appartement','980 000 MAD','Casablanca','120 m²',3,2,'Exclusif',true,'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80','Superbe appartement avec vue panoramique.','شقة رائعة بإطلالة بانورامية.'),
('Riad rénové Médina','رياض مجدد في المدينة القديمة','vente','villa','1 800 000 MAD','Marrakech','280 m²',6,4,'',true,'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80','Authentique riad entièrement rénové.','رياض أصيل مجدد بالكامل.'),
('Bureau centre-ville','مكتب في وسط المدينة','location','commercial','8 500 MAD / mois','Fès','85 m²',3,1,'',false,'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80','Bureau moderne en plein centre-ville.','مكتب عصري في قلب المدينة.'),
('Terrain constructible','أرض قابلة للبناء','vente','terrain','650 000 MAD','Agadir','500 m²',0,0,'Nouveau',false,'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80','Terrain plat viabilisé.','أرض مستوية مزودة بالخدمات.'),
('Appartement neuf','شقة جديدة','location','appartement','6 000 MAD / mois','Tanger','95 m²',2,1,'',false,'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80','Appartement neuf jamais habité.','شقة جديدة لم تُسكن قط.')
ON CONFLICT DO NOTHING;

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read properties" ON properties;
DROP POLICY IF EXISTS "Public read settings" ON settings;

CREATE POLICY "Public read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public read settings"   ON settings   FOR SELECT USING (true);
