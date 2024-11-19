# Prerequisites
Install and setup Docker
Install Java 17

# Steps to run this
mvn install




## Other NOTES
# Create network within Docker
docker network create property-network

# Create DB Docker Container
docker run --name mysql-container \
--network property-network \
-e MYSQL_ROOT_PASSWORD=rootpassword \
-e MYSQL_DATABASE=property_fleet_db \
-e MYSQL_USER=user \
-e MYSQL_PASSWORD=userpassword \
-p 3306:3306 \
-d mysql:8.0


# Start spring boot project
./mvnw spring-boot:run


# start mysql with docker-compose file
docker-compose up -d
