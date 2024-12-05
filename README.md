# Human Resource Management Extended

With tree-like orgranogram accompanied by many compact features, we intend to implement the leave and attendace system in such a way that an employee or admin will need minimum training or supervision to work on the product. An upper management will have a dashboard with many feature aggregation, so top management can get a high level view of the total attendance/leave sceneario and make/optimize HR principles, so that companies/organizations can get maximum value from Human Resources.

---

## Features
- Responsive UI built with React and Material-UI.
- Different roles for users (Admin/Super-Admin/Employees/Supervisor of Employees)
- Manage everything through a simple organogram; Every types of user has different accessibility of this organogram
- Track personal dashboard for lates/vacations
- Backend powered by Flask and MySQL ORM.

---

## Project Snapshot

Add project snapshots/screenshots here for a visual preview of your app.

| Organogram Page | Personalized Dashboard Page | 
|-----------|--------------|
| ![organogram Page](react-admin/public/57583565-bc5b-4cea-8821-1b0229119286) | ![Personalized Dashboard Page](react-admin/public/e456cf20-2643-472e-9195-ef81dd58bd49) |

| Add Employees Through an Interactive Organogram | View Employee Information |
|-----------|----------------------------------------------------------------|
| ![Add Employees Through an Interactive Organogram](react-admin/public/8e4a8459-463b-464f-ba33-4f84f7c2ba81) | ![Personalized Dashboard Page](react-admin/public/50835f9b-2237-48d8-a115-392c27beacbf) |
---

## Installation and Setup

Follow these steps to set up and run the project locally:

### Prerequisites

- **Node.js** (v14 or later) installed.
- **npm** or **yarn** package manager installed.
- **Python** (v3.8 or later) installed.
- **MySQL** database setup.

### Clone the Repositories

Frontend:
```bash
git clone https://github.com/your-username/your-repository.git](https://github.com/sshopnil/hrms_plusplus.git
cd your-repository
```

Backend:
```bash
git clone https://github.com/sshopnil/hrmsBackend.git
cd hrmsBackend
```

---

## Backend Setup

1. **Create a Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install Backend Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Database**:
   - Set up a MySQL database and update the connection details in the `config.py` file of the backend repository.

4. **Run Database Migrations**:
   ```bash
   flask db upgrade
   ```

5. **Start the Backend Server**:
   ```bash
   flask run
   ```

The backend will run on `http://localhost:5000`.

---

## Frontend Setup

1. **Install Dependencies**:
   ```bash
   npm install
   # or
yarn install
   ```

2. **Run the Application**:
   ```bash
   npm start
   # or
yarn start
   ```

The application will run on `http://localhost:3000`.

### Build the Application

To create a production build of the project:

```bash
npm run build
# or
yarn build
```

The build files will be available in the `build/` directory.

---

## Folder Structure

```
react-admin
├── public/          # Static assets
├── src/             # Source files
│   ├── components/  # Reusable React components
│   ├── pages/       # Page-level components
│   ├── theme/       # Material-UI theme configuration
│   ├── App.js       # Root React component
│   ├── index.js     # Application entry point
├── package.json     # Project metadata and dependencies
├── README.md        # Project documentation
```

---

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React components for faster and easier web development.
- **Flask**: Lightweight Python web framework for the backend.
- **MySQL ORM**: For database management and migrations.
- **React Router**: Declarative routing for React.

---

## Contribution

Contributions are welcome! Feel free to fork the repository and create a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For any inquiries or feedback, contact:

- Email: [your-email@example.com](mailto:your-email@example.com)
- GitHub: [your-github-profile](https://github.com/your-username)
