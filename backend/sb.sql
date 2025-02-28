--`todo` table
CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    completed BOOLEAN NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    priority_category VARCHAR(10) CHECK (priority_category IN ('low', 'mid', 'high')),
    type_category VARCHAR(10) CHECK (type_category IN ('work', 'personal', 'other'))
);


-- select and sort by priority category
SELECT * FROM todo
ORDER BY 
    CASE priority_category
        WHEN 'high' THEN 1
        WHEN 'mid' THEN 2
        WHEN 'low' THEN 3
        ELSE 4
    END;

-- select and sort by type-priority
SELECT * FROM todo where type_category = 'work' -- or 'personal' or 'other'


--  `bookmark` table
CREATE TABLE bookmark (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(50)
);

--  `note` table
CREATE TABLE note (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    note_content TEXT NOT NULL,
    category VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);