'use strict'

module.exports = `
  CREATE TABLE IF NOT EXISTS reports (
    id serial PRIMARY KEY,
    body jsonb NOT NULL,
    search tsvector,
    created_at timestamptz DEFAULT now()
  );

  CREATE INDEX IF NOT EXISTS idx_reports
    ON reports USING GIN(body jsonb_path_ops);

  CREATE INDEX IF NOT EXISTS idx_reports_search
    ON reports USING GIN(search);
`
