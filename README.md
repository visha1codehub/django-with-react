# Django + React Project

This project uses Django for the backend and React for the frontend. It includes a `Makefile` to automate the setup, installation, running, and cleaning of both backend and frontend environments.

## Project Structure

```
django-with-react/
├── backend/                # Django backend project
│   ├── manage.py           # Django management script
│   ├── venv/               # Virtual environment for backend
│   ├── myproject/          # Django project directory
│   └── requirements.txt    # Backend dependencies
└── frontend/               # React frontend project
    ├── package.json        # React dependencies and scripts
    ├── node_modules/       # Node.js dependencies
    └── src/                # React source files
```

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Python 3.x
- Node.js and npm
- `make` (for running commands in the Makefile)

### Backend (Django)
1. Make sure Python 3 and `pip` are installed.
2. Create a `requirements.txt` file for your Django backend dependencies.

### Frontend (React)
1. Ensure that Node.js and npm are installed.
2. Initialize the frontend React application by running `npx create-react-app frontend` (if you haven't already).

## Setup

### 1. Clone the repository

Clone this repository to your local machine:

```bash
git https://github.com/visha1codehub/django-with-react.git
cd django-with-react
```

### 2. Install Backend Dependencies

To install the backend dependencies, including setting up the virtual environment for Django:

```bash
make install-backend
```

This command will:
- Create a virtual environment in the `backend/venv` directory.
- Install the necessary Python packages listed in `backend/requirements.txt`.

### 3. Install Frontend Dependencies

To install the frontend dependencies (React):

```bash
make install-frontend
```

This command will run `npm install` in the `frontend/` directory to install all necessary packages.

## Running the Development Servers

### 1. Start both Django (Backend) and React (Frontend) servers:

To run both the backend and frontend servers simultaneously:

```bash
make dev
```

This command will:
- Start the Django development server (`python manage.py runserver`).
- Start the React development server (`npm run dev`).

Both servers will run in separate processes.

### 2. Stop the servers:

To stop both the backend and frontend servers, you can use:

```bash
make stop
```

This will terminate any running servers.

## Clean Up

If you want to clean up the virtual environments or `node_modules` directory, you can run:

```bash
make clean
```

This command will:
- Delete the `backend/venv` directory (virtual environment).
- Delete the `frontend/node_modules` directory.

## Makefile Commands

Here are the available commands in the `Makefile`:

- **install-backend**: Sets up the virtual environment and installs Python dependencies for the backend.
- **run-backend**: Starts the Django development server.
- **install-frontend**: Installs Node.js dependencies for the frontend (React).
- **run-frontend**: Starts the React development server.
- **install**: Installs both backend and frontend dependencies.
- **dev**: Runs both Django and React servers simultaneously.
- **clean**: Cleans up virtual environments and `node_modules` directories.
- **stop**: Stops any running servers.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.