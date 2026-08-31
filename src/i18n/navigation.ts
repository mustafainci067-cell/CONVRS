import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale duyarli gezinme yardimcilari: Link, useRouter, usePathname vb.
// Boylece tum baglantilar /en/..., /de/... on ekinin dogru sekilde kullaniyor.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);