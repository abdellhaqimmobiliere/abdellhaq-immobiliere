-- Migration: multi-image properties + admin security tables
-- Run in Supabase SQL Editor after initial schema.sql

ALTER TABLE properties ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

UPDATE properties
SET images = ARRAY[image]
WHERE (images IS NULL OR images = '{}')
  AND image IS NOT NULL
  AND image != '';

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id          BIGSERIAL PRIMARY KEY,
  event       TEXT NOT NULL,
  ip          TEXT,
  user_agent  TEXT,
  details     JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS login_attempts (
  ip           TEXT PRIMARY KEY,
  attempts     INT DEFAULT 0,
  locked_until TIMESTAMPTZ,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Storage bucket: create in Dashboard → Storage → New bucket
-- Name: property-images | Public: YES
