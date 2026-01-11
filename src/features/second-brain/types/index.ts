// ═══════════════════════════════════════════════════════════════════════════════
// SECOND BRAIN FEATURE - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string; // Markdown or rich text
  folderId?: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  userId: string;
  name: string;
  parentId?: string;
  color: string;
  icon: string;
  noteCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  url: string;
  title: string;
  description?: string;
  favicon?: string;
  thumbnail?: string;
  tags: string[];
  collectionId?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkCollection {
  id: string;
  userId: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  bookmarkCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  content: string;
  mood?: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  tags: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  userId: string;
  name: string;
  color: string;
  usageCount: number;
  createdAt: string;
}

export interface SearchResult {
  type: 'note' | 'bookmark' | 'journal';
  id: string;
  title: string;
  snippet: string;
  matchedFields: string[];
  score: number;
}
