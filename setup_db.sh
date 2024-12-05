#!/bin/bash

DB_NAME="irctc_assignment_db_2"

sudo -u postgres psql <<EOF
    CREATE DATABASE "$DB_NAME";

    GRANT ALL PRIVILEGES ON DATABASE "$DB_NAME" TO "postgres";

    \c "$DB_NAME"
    GRANT ALL ON SCHEMA public TO "postgres";
    GRANT ALL ON ALL TABLES IN SCHEMA public TO "postgres";
    GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO "postgres";
    GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO "postgres";
EOF

    echo "Database created successfully!"
    echo "Connection string: "
echo "postgresql://postgres:postgres@localhost:5432/$DB_NAME?schema=public"