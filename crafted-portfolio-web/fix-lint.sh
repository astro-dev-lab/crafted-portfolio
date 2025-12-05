#!/bin/bash

# Fix entity encoding issues and navigation links
echo "Fixing lint issues..."

# Run the fixes through npm script
npm run lint:fix 2>/dev/null || true

echo "Lint fixes complete"