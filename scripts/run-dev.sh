#!/bin/bash

# Start the Flask application
flask_process() {
    echo "Starting Flask application..."
    flask run
}

# Change directory and start pnpm dev
pnpm_process() {
    echo "Starting pnpm dev in client folder..."
    cd client && pnpm dev
}

# Run both commands simultaneously
flask_process &
pnpm_process &

# Wait for both background processes to finish
wait
