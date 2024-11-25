 ## Tech Stack  

| Tool/Technology       | Purpose                               |
|------------------------|---------------------------------------|
| **Create React App**   | Setup and configuration of the application. |
| **TypeScript**         | Enhances code reliability and scalability. |
| **TailwindCSS**        | Responsive styling for a clean UI.   |
| **Lunit InsightViewer**| DICOM upload and modification support. |
| **Docker**             | Containerization for production-ready builds. |

## Getting Started  

### Prerequisites  

To get started, ensure the following are installed on your system:  

- **Node.js** (>= 16.x)  
- **npm** or **yarn**  
- **Docker** (>= 20.x)  

### Installation  

1. Clone this repository:  
    ```bash
    git clone https://github.com/AadiNir/Health-saas.git
    cd Health-saas
    ```
2. Install project dependencies:  
    ```bash
    npm install
    ```

3. Start the development server:  
    ```bash
    npm run start
    ```

4. Visit `http://localhost:3000` in your browser to access the application.

---

## 🏗️ Building for Production  

### Generate a Production Build  

To build an optimized production version of the application, run:  
```bash
npm run build
```

##  Docker Deployment
### Build the Docker Image
Use Docker to containerize the application:
```bash
docker image build -t my-app:latest 
```
### Run the Docker Container
Start the application in a Docker container:
```bash
docker run -dp 8000:3000 --name react-example-container my-app:latest
```
### Access the Application
Once the container is running, open http://localhost:8000 to view the application.
