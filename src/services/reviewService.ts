import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserReview } from '../types/shoe';

interface SupabaseReviewRow {
  id: string;
  shoe_id: string;
  user_name: string;
  user_avatar: string | null;
  rating: number;
  title: string;
  comment: string;
  pros: string[] | null;
  cons: string[] | null;
  verified_distance_km: number | null;
  helpful_count: number | null;
  created_at: string;
}

// Convert Supabase database row to frontend UserReview object
function rowToUserReview(row: SupabaseReviewRow): UserReview {
  return {
    id: row.id,
    userName: row.user_name,
    userAvatar: row.user_avatar || undefined,
    rating: row.rating,
    date: row.created_at ? row.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
    title: row.title,
    comment: row.comment,
    pros: Array.isArray(row.pros) ? row.pros : [],
    cons: Array.isArray(row.cons) ? row.cons : [],
    verifiedDistanceKm: row.verified_distance_km ?? 0,
    helpfulCount: row.helpful_count ?? 0,
  };
}

// Convert frontend UserReview object to Supabase database row
function userReviewToRow(shoeId: string, review: UserReview) {
  return {
    id: review.id,
    shoe_id: shoeId,
    user_name: review.userName,
    user_avatar: review.userAvatar || null,
    rating: review.rating,
    title: review.title,
    comment: review.comment,
    pros: review.pros || [],
    cons: review.cons || [],
    verified_distance_km: review.verifiedDistanceKm || 0,
    helpful_count: review.helpfulCount || 0,
  };
}

/**
 * Fetch all reviews grouped by shoe_id
 */
export async function fetchAllReviews(): Promise<Record<string, UserReview[]>> {
  if (!isSupabaseConfigured || !supabase) {
    // Fallback to local storage
    try {
      const saved = localStorage.getItem('easternrun_user_reviews');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[EasternRun Supabase] Error fetching reviews:', error.message);
      const saved = localStorage.getItem('easternrun_user_reviews');
      return saved ? JSON.parse(saved) : {};
    }

    const reviewsByShoe: Record<string, UserReview[]> = {};
    if (data && Array.isArray(data)) {
      for (const row of data as SupabaseReviewRow[]) {
        if (!reviewsByShoe[row.shoe_id]) {
          reviewsByShoe[row.shoe_id] = [];
        }
        reviewsByShoe[row.shoe_id].push(rowToUserReview(row));
      }
    }
    return reviewsByShoe;
  } catch (err) {
    console.error('[EasternRun Supabase] Unexpected error fetching reviews:', err);
    return {};
  }
}

/**
 * Fetch reviews for a single shoe model
 */
export async function fetchReviewsForShoe(shoeId: string): Promise<UserReview[]> {
  if (!isSupabaseConfigured || !supabase) {
    try {
      const saved = localStorage.getItem('easternrun_user_reviews');
      const parsed = saved ? JSON.parse(saved) : {};
      return parsed[shoeId] || [];
    } catch {
      return [];
    }
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('shoe_id', shoeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`[EasternRun Supabase] Error fetching reviews for ${shoeId}:`, error.message);
      const saved = localStorage.getItem('easternrun_user_reviews');
      const parsed = saved ? JSON.parse(saved) : {};
      return parsed[shoeId] || [];
    }

    return (data as SupabaseReviewRow[]).map(rowToUserReview);
  } catch (err) {
    console.error(`[EasternRun Supabase] Unexpected error fetching reviews for ${shoeId}:`, err);
    return [];
  }
}

/**
 * Submit a new review to Supabase (with localStorage cache fallback)
 */
export async function submitReviewToSupabase(shoeId: string, review: UserReview): Promise<{ success: boolean; error?: string }> {
  // Always cache locally as backup
  try {
    const saved = localStorage.getItem('easternrun_user_reviews');
    const parsed = saved ? JSON.parse(saved) : {};
    parsed[shoeId] = [review, ...(parsed[shoeId] || [])];
    localStorage.setItem('easternrun_user_reviews', JSON.stringify(parsed));
  } catch {
    // Ignore localStorage quota errors
  }

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }

  try {
    const row = userReviewToRow(shoeId, review);
    const { error } = await supabase.from('reviews').insert([row]);

    if (error) {
      console.error('[EasternRun Supabase] Error inserting review:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[EasternRun Supabase] Unexpected error inserting review:', err);
    return { success: false, error: err?.message || 'Failed to submit review.' };
  }
}
