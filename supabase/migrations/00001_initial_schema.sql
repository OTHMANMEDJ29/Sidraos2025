-- ═══════════════════════════════════════════════════════════════════════════════
-- SIDRAOS - INITIAL DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- ENABLE EXTENSIONS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────────
-- CUSTOM TYPES
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TYPE user_locale AS ENUM ('ar', 'en');
CREATE TYPE user_theme AS ENUM ('light', 'dark', 'system');
CREATE TYPE transaction_type AS ENUM ('income', 'expense', 'transfer');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'completed', 'cancelled');
CREATE TYPE habit_frequency AS ENUM ('daily', 'weekly');
CREATE TYPE mood_type AS ENUM ('great', 'good', 'neutral', 'bad', 'terrible');

-- ─────────────────────────────────────────────────────────────────────────────
-- PROFILES TABLE (extends auth.users)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    locale user_locale DEFAULT 'en',
    theme user_theme DEFAULT 'system',
    timezone TEXT DEFAULT 'UTC',
    currency TEXT DEFAULT 'USD',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ─────────────────────────────────────────────────────────────────────────────
-- ACCOUNTS TABLE (Financial accounts)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'bank', -- cash, bank, credit, investment
    balance DECIMAL(15, 2) DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    color TEXT DEFAULT '#3B82F6',
    icon TEXT DEFAULT 'wallet',
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own accounts"
    ON accounts FOR ALL
    USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- CATEGORIES TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- NULL for system categories
    name TEXT NOT NULL,
    name_ar TEXT, -- Arabic name
    type transaction_type NOT NULL,
    color TEXT DEFAULT '#6B7280',
    icon TEXT DEFAULT 'tag',
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view system and own categories"
    ON categories FOR SELECT
    USING (is_system = TRUE OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own categories"
    ON categories FOR ALL
    USING (auth.uid() = user_id AND is_system = FALSE);

-- ─────────────────────────────────────────────────────────────────────────────
-- TRANSACTIONS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    type transaction_type NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    description TEXT,
    notes TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    -- For transfers
    to_account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own transactions"
    ON transactions FOR ALL
    USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX idx_transactions_category ON transactions(category_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- BUDGETS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    period TEXT NOT NULL DEFAULT 'monthly', -- weekly, monthly, yearly
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own budgets"
    ON budgets FOR ALL
    USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- PROJECTS TABLE (for tasks)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    icon TEXT DEFAULT 'folder',
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own projects"
    ON projects FOR ALL
    USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- TASKS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority task_priority DEFAULT 'medium',
    status task_status DEFAULT 'todo',
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    tags TEXT[] DEFAULT '{}',
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own tasks"
    ON tasks FOR ALL
    USING (auth.uid() = user_id);

CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX idx_tasks_due_date ON tasks(user_id, due_date);

-- ─────────────────────────────────────────────────────────────────────────────
-- HABITS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    frequency habit_frequency DEFAULT 'daily',
    target_days INTEGER[] DEFAULT '{}', -- 0-6 for weekly (Sunday = 0)
    color TEXT DEFAULT '#10B981',
    icon TEXT DEFAULT 'check-circle',
    streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own habits"
    ON habits FOR ALL
    USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- HABIT COMPLETIONS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE habit_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(habit_id, date)
);

ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own habit completions"
    ON habit_completions FOR ALL
    USING (auth.uid() = user_id);

CREATE INDEX idx_habit_completions_date ON habit_completions(habit_id, date DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- CALENDAR EVENTS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    is_all_day BOOLEAN DEFAULT FALSE,
    location TEXT,
    color TEXT DEFAULT '#3B82F6',
    reminders INTEGER[] DEFAULT '{15}', -- minutes before
    recurrence_rule JSONB, -- { frequency, interval, endDate, count, daysOfWeek }
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own events"
    ON calendar_events FOR ALL
    USING (auth.uid() = user_id);

CREATE INDEX idx_events_time ON calendar_events(user_id, start_time);

-- ─────────────────────────────────────────────────────────────────────────────
-- FOLDERS TABLE (for notes)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE folders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES folders(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color TEXT DEFAULT '#6B7280',
    icon TEXT DEFAULT 'folder',
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own folders"
    ON folders FOR ALL
    USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- NOTES TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    content TEXT DEFAULT '',
    tags TEXT[] DEFAULT '{}',
    is_pinned BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own notes"
    ON notes FOR ALL
    USING (auth.uid() = user_id);

CREATE INDEX idx_notes_folder ON notes(user_id, folder_id);
CREATE INDEX idx_notes_search ON notes USING gin(to_tsvector('english', title || ' ' || content));

-- ─────────────────────────────────────────────────────────────────────────────
-- BOOKMARK COLLECTIONS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE bookmark_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#6B7280',
    icon TEXT DEFAULT 'bookmark',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bookmark_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own collections"
    ON bookmark_collections FOR ALL
    USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- BOOKMARKS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES bookmark_collections(id) ON DELETE SET NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    favicon TEXT,
    thumbnail TEXT,
    tags TEXT[] DEFAULT '{}',
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own bookmarks"
    ON bookmarks FOR ALL
    USING (auth.uid() = user_id);

CREATE INDEX idx_bookmarks_collection ON bookmarks(user_id, collection_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- JOURNAL ENTRIES TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    content TEXT NOT NULL,
    mood mood_type,
    tags TEXT[] DEFAULT '{}',
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own journal entries"
    ON journal_entries FOR ALL
    USING (auth.uid() = user_id);

CREATE INDEX idx_journal_date ON journal_entries(user_id, date DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- FUNCTIONS & TRIGGERS
-- ─────────────────────────────────────────────────────────────────────────────

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_habits_updated_at BEFORE UPDATE ON habits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON calendar_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_folders_updated_at BEFORE UPDATE ON folders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookmark_collections_updated_at BEFORE UPDATE ON bookmark_collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookmarks_updated_at BEFORE UPDATE ON bookmarks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- FUNCTION: Handle new user registration
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, avatar_url, locale)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE((NEW.raw_user_meta_data->>'locale')::user_locale, 'en')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED: Default categories
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO categories (name, name_ar, type, color, icon, is_system) VALUES
    -- Income categories
    ('Salary', 'الراتب', 'income', '#10B981', 'banknote', TRUE),
    ('Freelance', 'العمل الحر', 'income', '#3B82F6', 'laptop', TRUE),
    ('Investment', 'الاستثمار', 'income', '#8B5CF6', 'trending-up', TRUE),
    ('Gift', 'هدية', 'income', '#EC4899', 'gift', TRUE),
    ('Other Income', 'دخل آخر', 'income', '#6B7280', 'plus-circle', TRUE),
    -- Expense categories
    ('Food & Dining', 'الطعام', 'expense', '#F59E0B', 'utensils', TRUE),
    ('Transportation', 'المواصلات', 'expense', '#3B82F6', 'car', TRUE),
    ('Shopping', 'التسوق', 'expense', '#EC4899', 'shopping-bag', TRUE),
    ('Bills & Utilities', 'الفواتير', 'expense', '#EF4444', 'file-text', TRUE),
    ('Entertainment', 'الترفيه', 'expense', '#8B5CF6', 'film', TRUE),
    ('Health', 'الصحة', 'expense', '#10B981', 'heart', TRUE),
    ('Education', 'التعليم', 'expense', '#3B82F6', 'book', TRUE),
    ('Personal Care', 'العناية الشخصية', 'expense', '#F472B6', 'smile', TRUE),
    ('Home', 'المنزل', 'expense', '#F59E0B', 'home', TRUE),
    ('Travel', 'السفر', 'expense', '#06B6D4', 'plane', TRUE),
    ('Other Expense', 'مصروف آخر', 'expense', '#6B7280', 'minus-circle', TRUE);

-- ═══════════════════════════════════════════════════════════════════════════════
-- END OF SCHEMA
-- ═══════════════════════════════════════════════════════════════════════════════
