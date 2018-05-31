CREATE DATABASE IF NOT EXISTS postDB;
USE postDB;

# If the table already exists, remove it before trying to create the table again
DROP TABLE IF EXISTS postDB;

# Create the postDB table 
CREATE TABLE postDB (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    post VARCHAR(500) NOT NULL,
    legit SMALLINT NOT NULL,
    seemslegit SMALLINT NOT NULL,
    fakenews SMALLINT NOT NULL,
    PRIMARY KEY (id) 

);