// This file previously contained blog utilities for a 'post' collection, which is no longer used.
// These exports are kept to satisfy legacy/unused widgets.
import type { Post } from "../types";

export const findPostsByIds = async (_ids: string[]): Promise<Post[]> => [];
export const findLatestPosts = async (_options: { count?: number } = {}): Promise<Post[]> => [];
export const getRelatedPosts = async (_allPosts: Post[], _currentPost: Post, _count: number): Promise<Post[]> => [];
