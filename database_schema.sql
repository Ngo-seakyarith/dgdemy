CREATE TABLE word_documents (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('ai_skill', 'soft_skill')),
    thumbnail_url TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);