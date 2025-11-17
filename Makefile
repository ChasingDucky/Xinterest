# Xinterest Docker Management Makefile

.PHONY: help build up down logs restart clean dev-up dev-down status

# Default target
help:
	@echo "Xinterest Docker Management Commands:"
	@echo ""
	@echo "  make build      - Build all Docker images"
	@echo "  make up         - Start all services in detached mode"
	@echo "  make down       - Stop all services"
	@echo "  make logs       - View logs from all services"
	@echo "  make restart    - Restart all services"
	@echo "  make clean      - Remove all containers, volumes, and images"
	@echo "  make dev-up     - Start services in development mode (with logs)"
	@echo "  make dev-down   - Stop development services"
	@echo "  make status     - Show status of all services"
	@echo ""

# Build all Docker images
build:
	@echo "Building Docker images..."
	docker-compose build --no-cache

# Start all services
up:
	@echo "Starting Xinterest services..."
	docker-compose up -d
	@echo ""
	@echo "✅ Services started successfully!"
	@echo "Frontend: http://localhost:7667"
	@echo "Backend API: http://localhost:7666"
	@echo ""
	@echo "Run 'make logs' to view logs"

# Stop all services
down:
	@echo "Stopping Xinterest services..."
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# Restart services
restart:
	@echo "Restarting services..."
	docker-compose restart

# Clean up everything
clean:
	@echo "⚠️  This will remove all containers, volumes, and images!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose down -v --rmi all; \
		echo "✅ Cleanup complete!"; \
	else \
		echo "Cancelled."; \
	fi

# Development mode (with logs)
dev-up:
	@echo "Starting Xinterest in development mode..."
	docker-compose up

# Stop development services
dev-down:
	docker-compose down

# Show service status
status:
	@echo "Xinterest Services Status:"
	@echo ""
	docker-compose ps
	@echo ""
	@echo "Docker Volumes:"
	docker volume ls | grep xinterest
