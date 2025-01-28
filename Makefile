# Directories
BACKEND_DIR = backend
FRONTEND_DIR = frontend

# Backend Django Setup
install-backend:
	@echo "Setting up the Django backend..."
	@cd $(BACKEND_DIR) && python3 -m venv venv
	@cd $(BACKEND_DIR) && source venv/bin/activate && pip install -r requirements.txt

run-backend:
	@echo "Starting Django development server..."
	@cd $(BACKEND_DIR) && python manage.py runserver

# Frontend React Setup
install-frontend:
	@echo "Setting up the React frontend..."
	@cd $(FRONTEND_DIR) && npm install

run-frontend:
	@echo "Starting React development server..."
	@cd $(FRONTEND_DIR) && npm run dev

# Backend and Frontend Setup
install: install-backend install-frontend

# Running the development environment for both
dev: run-backend run-frontend

# Clean up Python and Node dependencies (useful for a fresh start)
clean:
	@echo "Cleaning up..."
	@rm -rf $(BACKEND_DIR)/venv $(FRONTEND_DIR)/node_modules

# To stop the servers (optional)
stop:
	@echo "Stopping servers..."
	@pkill -f runserver
	@pkill -f npm
