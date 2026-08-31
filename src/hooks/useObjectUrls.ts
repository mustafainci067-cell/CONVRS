'use client';

import { useEffect, useMemo } from 'react';

/**
 * Verilen File listesinden object URL'ler uretir ve yasam dongusunu yonetir:
 * liste degistiginde onceki URL'ler, bilesen unmount oldugunda ise son URL'ler
 * URL.revokeObjectURL ile serbest birakilir (bellek sizintisi onlenir).
 */
export function useObjectUrls(files: File[]): string[] {
  const urls = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  useEffect(() => {
    const created = urls;
    return () => created.forEach((u) => URL.revokeObjectURL(u));
  }, [urls]);

  return urls;
}
