# Starter for Medusa 2 and Nuxt 3

This monorepo serves as a starter template/example for building D2C e-commerce applications using [Medusa](https://medusajs.com/) for e-commerce functionality and [Nuxt](https://nuxt.com/) for the frontend.

## Quickstart

```bash
git clone git@github.com:doooooooomiki/medusa-nuxt.git
```

### Medusa

```bash
cd apps/medusa

# Create the .env file
cp .env.template .env

# Install dependencies
yarn

# Spin up the database and Redis
docker compose up -d

# Build the project
yarn build

# Run the migrations
yarn medusa db:migrate

# Seed the database
yarn seed

# Create an user
yarn medusa user -e "admin@medusa.local" -p "supersecret"

# Start the development server
yarn dev
```
