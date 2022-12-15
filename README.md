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


Sidekick Horse

Sidekick Horse is an Administration app to care for an horseclub with an fully java backend and react frontend.

You can add, edit and delete members. To enter the admin area you can login and registrate.

Sidekick Horse: https://sidekick-horses.fly.dev/

chRat project: https://github.com/stevenpatricklang/Sidekick_Horse

IntelliJ Java v19 Spring Basic-Auth React Create-React-App React-Router AWS-EC2 Tomcat v9.0.70 MongoDB Maven Git Github Github-Actions Github-Projects Github-Issues Github-Pull-Requests War-file
clone - installing - start:
FE:
clone repo => cd frontend => npm i => npm start

BE:
clone repo => start the BackendApplication.java

MISC:

You need a mongoDB database running on localhost:27017 for local purposes. For deploy you have to set the MONGODB_URI as environment var within the linux shell with following command export MONGODB_URI="mongodb://[USER]:[PW]@[SERVER]:[PORT]/[DBNAME]"
