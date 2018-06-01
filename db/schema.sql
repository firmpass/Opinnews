CREATE DATABASE IF NOT EXISTS userDB;
USE userDB;

# If the table already exists, remove it before trying to create the table again
DROP TABLE IF EXISTS userDB;

# Create the userDB table 
CREATE TABLE userDB (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    legit SMALLINT NOT NULL,
    seemslegit SMALLINT NOT NULL,
    fakenews SMALLINT NOT NULL,
    post SMALLINT NOT NULL,
    PRIMARY KEY (id) 

);
