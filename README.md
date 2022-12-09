Welcome to my capstone project from the "neuefische" bootcamp Java Development. This is a first short introduction to start my Sidekick Horse Administration application on your localhost.

For the initial project, with backend, frontend on localhost

    Install Docker Desktop and create a new MongoDb container
    Install MongoDb Compass and connect to Docker
    Create the database "sidekick horse"
    Fork the project and update Maven if necessary
    Maybe you have to install inside frontend folder
        npm install axios
        npm install --save react-router-dom

MongoDb name:
If you want to change the database name, go inside "backend/src/main/resources" and change the name inside the application.properties spring.data.mongodb.database=SidekickHorse

Sonar Cloud files: Backend: .github/workflows/build-sonar-backend.yml Frontend: .github/workflows/build-sonar-frontend.yml
