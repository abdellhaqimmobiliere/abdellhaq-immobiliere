"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { mapSettingsToSite, STATIC_SITE } from "@/lib/siteData";

const SettingsContext = createContext({
  site: STATIC_SITE,
  settings: {},
  loading: true,
  refetch: () => {},
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);

    if (!supabase) {
      setSettings({});
      setLoading(false);
      return;
    }

    const { data } = await supabase.from("settings").select("*");
    const map = {};
    data?.forEach((s) => {
      map[s.key] = s.value;
    });
    setSettings(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const site = mapSettingsToSite(settings);

  return (
    <SettingsContext.Provider
      value={{ site, settings, loading, refetch: fetchSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSiteConfig() {
  const { site } = useSettings();
  return site;
}
