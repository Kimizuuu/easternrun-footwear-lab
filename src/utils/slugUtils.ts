import type { Shoe } from '../types/shoe';

/**
 * Converts a shoe string (name or id) into a clean, lowercased, hyphenated SEO slug.
 * e.g., "Li-Ning Feidian 4 Ultra" -> "lining-feidian-4-ultra"
 * e.g., "nike_alphafly3" -> "nike-alphafly-3"
 */
export function toCleanSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[°'"]/g, '')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Returns the standardized canonical SEO brand slug.
 * e.g., "361°" -> "361-degrees"
 * e.g., "Li-Ning" -> "li-ning"
 */
export function getBrandSlug(brand: string): string {
  if (!brand) return '';
  const clean = toCleanSlug(brand);
  if (clean === '361' || clean === '361degrees') return '361-degrees';
  return clean;
}

/**
 * Returns clean full display name without doubling brand if already prefixed.
 * e.g., brand: 'Nike', name: 'Nike Alphafly 3' -> 'Nike Alphafly 3'
 * e.g., brand: 'Nike', name: 'Alphafly 3' -> 'Nike Alphafly 3'
 */
export function getFullShoeName(brand: string, name: string): string {
  if (!name) return '';
  if (!brand) return name;
  if (name.toLowerCase().startsWith(brand.toLowerCase())) {
    return name;
  }
  return `${brand} ${name}`;
}

/**
 * Returns the primary clean SEO slug for a given Shoe object.
 */
export function getShoeSlug(shoe: Shoe): string {
  if (!shoe) return '';
  return toCleanSlug(getFullShoeName(shoe.brand, shoe.name));
}

/**
 * Finds a Shoe object from the database array using either its clean slug or raw ID.
 */
export function getShoeBySlug(slug: string, shoes: Shoe[]): Shoe | undefined {
  if (!slug || !shoes || shoes.length === 0) return undefined;
  const targetSlug = toCleanSlug(slug);

  return shoes.find(s => {
    const cleanId = toCleanSlug(s.id);
    const cleanName = getShoeSlug(s);
    return cleanId === targetSlug || cleanName === targetSlug;
  });
}

/**
 * Generates a clean comparison slug for two shoes: e.g. "nike-alphafly-3-vs-lining-feidian-4-ultra"
 */
export function getCompareSlug(shoe1: Shoe, shoe2: Shoe): string {
  const slug1 = getShoeSlug(shoe1);
  const slug2 = getShoeSlug(shoe2);
  return `${slug1}-vs-${slug2}`;
}

/**
 * Parses a comparison slug like "nike-alphafly-3-vs-lining-feidian-4-ultra" or "nike_alphafly3-vs-lining_feidian4_ultra"
 * into two distinct Shoe objects.
 */
export function parseCompareSlug(slug: string, shoes: Shoe[]): { shoe1: Shoe | undefined; shoe2: Shoe | undefined } {
  if (!slug || !slug.includes('-vs-')) {
    return { shoe1: undefined, shoe2: undefined };
  }

  const parts = slug.split('-vs-');
  if (parts.length < 2) {
    return { shoe1: undefined, shoe2: undefined };
  }

  const slug1 = parts[0];
  const slug2 = parts.slice(1).join('-vs-'); // handles multi-vs edge cases safely

  const shoe1 = getShoeBySlug(slug1, shoes);
  const shoe2 = getShoeBySlug(slug2, shoes);

  return { shoe1, shoe2 };
}
