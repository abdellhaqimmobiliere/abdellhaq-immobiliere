"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  FALLBACK_PROPERTIES,
  mapPropertyFromDb,
} from "@/lib/siteData";

export function useProperties(filters = {}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    setLoading(true);

    if (!supabase) {
      let list = [...FALLBACK_PROPERTIES];
      if (filters.type && filters.type !== "all") {
        list = list.filter((p) => p.type === filters.type);
      }
      if (filters.category && filters.category !== "all") {
        list = list.filter((p) => p.category === filters.category);
      }
      if (filters.city && filters.city !== "all") {
        list = list.filter((p) => p.city === filters.city);
      }
      if (filters.featured) {
        list = list.filter((p) => p.featured);
      }
      setProperties(list);
      setLoading(false);
      return;
    }

    let query = supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters.type && filters.type !== "all") {
      query = query.eq("type", filters.type);
    }
    if (filters.category && filters.category !== "all") {
      query = query.eq("category", filters.category);
    }
    if (filters.city && filters.city !== "all") {
      query = query.eq("city", filters.city);
    }
    if (filters.featured) {
      query = query.eq("featured", true);
    }

    const { data } = await query;
    setProperties((data || []).map(mapPropertyFromDb));
    setLoading(false);
  }, [filters.type, filters.category, filters.city, filters.featured]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, refetch: fetchProperties };
}
