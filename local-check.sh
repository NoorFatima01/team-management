#!/bin/sh

# Install dependencies
pnpm install --frozen-lockfile

# Run the checks
pnpm run lint:strict
pnpm run typecheck
pnpm run format:check
pnpm run test
