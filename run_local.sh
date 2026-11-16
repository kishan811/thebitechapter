#!/bin/bash
cd "$(dirname "$0")"
export PORT=${PORT:-8000}
echo "======================================================="
echo "Starting The Bite Chapter locally on http://localhost:$PORT"
echo "======================================================="
which open >/dev/null 2>&1 && open "http://localhost:$PORT" &
python3 server.py || python server.py
