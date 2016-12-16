'use strict'

module.exports = `
  CREATE TABLE IF NOT EXISTS dumps (
    id serial PRIMARY KEY,
    file bytea NOT NULL,
    report_id integer REFERENCES reports NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_dumps_report
    ON dumps (report_id);
`
