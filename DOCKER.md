# FlowChat Website - Docker Deployment

This repository contains the FlowChat website, which can be deployed using Docker and Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Production Deployment

To deploy the website in production mode:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

The website will be available at `http://localhost`

To stop the production deployment:

```bash
docker-compose -f docker-compose.prod.yml down
```

## Development Deployment

To run the website in development mode with hot-reloading:

```bash
# First build the development image
docker build -t flowchat-dev .

# Then run the development setup
docker-compose -f docker-compose.dev.yml up -d
```

The website will be available at `http://localhost`

To stop the development deployment:

```bash
docker-compose -f docker-compose.dev.yml down
```

## Quick Start

To quickly start the production version:

```bash
docker-compose up -d
```

This will use the default `docker-compose.yml` file.

## Configuration

- The production setup serves static files directly with Nginx
- The development setup uses the Vite dev server with Nginx as a reverse proxy
- Nginx configurations can be found in `nginx.conf` and `nginx-dev.conf`

## Ports

- Port 80: HTTP traffic (both development and production)

## Volumes

- The current directory is mounted to `/usr/share/nginx/html` for serving static files
- Custom Nginx configuration is loaded from local `nginx.conf` file

## Health Checks

The production setup includes a health check that verifies the service is responding properly. You can monitor the container status with:

```bash
docker ps
```

## SSL/HTTPS

To enable HTTPS, uncomment the SSL port mapping in the production docker-compose file and configure SSL certificates as needed for your deployment.