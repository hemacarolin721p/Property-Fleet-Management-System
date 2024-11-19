-- CREATE SCHEMA `property_fleet_db` ;
-- Create property_owner table first
CREATE TABLE property_owner (
    owner_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    contact_information VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
);

-- Create property table with foreign key to property_owner
CREATE TABLE property (
    property_id INT PRIMARY KEY AUTO_INCREMENT,
    property_name VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    street VARCHAR(255),
    zipcode VARCHAR(10),
    type VARCHAR(255),
    number_of_units INT,
    owner_id INT,
    property_size DECIMAL(10, 2),
    construction_date DATE,
    FOREIGN KEY (owner_id) REFERENCES property_owner(owner_id)  -- Foreign key to property_owner
);

-- Create resident table
CREATE TABLE resident (
    resident_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    contact_information VARCHAR(255),
    email VARCHAR(255),
    move_in_date DATE,
    move_out_date DATE
);

-- Create unit table with composite primary key and foreign key to property
CREATE TABLE unit (
    unit_id INT,  -- Remove AUTO_INCREMENT since it’s not globally unique
    property_id INT,
    unit_size VARCHAR(50),
    bedrooms INT,
    bathrooms INT,
    rent_amount DECIMAL(10, 2),
    availability VARCHAR(50),
    PRIMARY KEY (unit_id, property_id),  -- Composite primary key
    FOREIGN KEY (property_id) REFERENCES property(property_id)  -- Foreign key to property
);



-- Create lease_agreement table with foreign keys to resident, property, and unit
CREATE TABLE lease_agreement (
    lease_agreement_id INT PRIMARY KEY AUTO_INCREMENT,
    resident_id INT,
    property_id INT,
    unit_id INT,
    lease_start_date DATE,
    lease_end_date DATE,
    rent_amount DECIMAL(10, 2),
    security_deposit DECIMAL(10, 2),
    payment_frequency VARCHAR(50),
    status VARCHAR(50),
    FOREIGN KEY (resident_id) REFERENCES resident(resident_id),
    FOREIGN KEY (property_id) REFERENCES property(property_id),
    FOREIGN KEY (unit_id) REFERENCES unit(unit_id)
);


-- Create access_device table with foreign key to resident
CREATE TABLE access_device (
    access_device_id INT PRIMARY KEY AUTO_INCREMENT,
    resident_id INT,
    device_number VARCHAR(255),
    access_level VARCHAR(50),
    activation_date DATE,
    deactivation_date DATE,
    access_method VARCHAR(50),
    FOREIGN KEY (resident_id) REFERENCES resident(resident_id)
);

-- Create maintenance_request table with foreign keys to resident, property, and unit
CREATE TABLE maintenance_request (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    resident_id INT,
    property_id INT,
    unit_id INT,
    issue_description TEXT,
    request_date DATE,
    priority VARCHAR(50),
    status VARCHAR(50),
    assigned_staff_id INT,
    resolution_date DATE,
    FOREIGN KEY (resident_id) REFERENCES resident(resident_id),
    FOREIGN KEY (property_id) REFERENCES property(property_id),
    FOREIGN KEY (unit_id) REFERENCES unit(unit_id)
);

-- Create parking_spot table with foreign keys to property and resident
CREATE TABLE parking_spot (
    parking_spot_number INT,
    property_id INT,
    resident_id INT,
    vehicle_id INT,
    availability VARCHAR(50),
    reserved_date DATE,
    expiration_date DATE,
    PRIMARY KEY (parking_spot_number, property_id),
    FOREIGN KEY (property_id) REFERENCES property(property_id),
    FOREIGN KEY (resident_id) REFERENCES resident(resident_id)
);

-- Create staff table with foreign key to property
CREATE TABLE staff (
    staff_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255),
    contact_information VARCHAR(255),
    assigned_property_id INT,
    hire_date DATE,
    employment_status VARCHAR(50),
    FOREIGN KEY (assigned_property_id) REFERENCES property(property_id)
);

-- Create access_log table with foreign keys to resident and access_device
CREATE TABLE access_log (
    access_log_id INT PRIMARY KEY AUTO_INCREMENT,
    resident_id INT,
    access_device_id INT,
    access_date_time DATETIME,
    access_location VARCHAR(255),
    access_method VARCHAR(50),
    FOREIGN KEY (resident_id) REFERENCES resident(resident_id),
    FOREIGN KEY (access_device_id) REFERENCES access_device(access_device_id)
);

-- Create common_area table with foreign key to property
CREATE TABLE common_area (
    property_id INT,
    area_name VARCHAR(255),
    access_level VARCHAR(50),
    maintenance_schedule TEXT,
    PRIMARY KEY (property_id, area_name),
    FOREIGN KEY (property_id) REFERENCES property(property_id)
);

-- Create service_provider table with foreign key to property
CREATE TABLE service_provider (
    company_name VARCHAR(255),
    service_type VARCHAR(255),
    contact_information VARCHAR(255),
    assigned_property_id INT,
    contract_start_date DATE,
    contract_end_date DATE,
    status VARCHAR(50),
    PRIMARY KEY (company_name, service_type),
    FOREIGN KEY (assigned_property_id) REFERENCES property(property_id)
);

-- Create visitor_log table with foreign key to resident and unit
CREATE TABLE visitor_log (
    visitor_log_id INT PRIMARY KEY AUTO_INCREMENT,
    visitor_name VARCHAR(255),
    resident_id INT,
    unit_id INT,
    date_of_visit DATE,
    access_method VARCHAR(50),
    entry_time TIME,
    exit_time TIME,
    FOREIGN KEY (resident_id) REFERENCES resident(resident_id),
    FOREIGN KEY (unit_id) REFERENCES unit(unit_id)
);

-- Create vehicle table with foreign keys to resident and parking_spot
CREATE TABLE vehicle (
    vehicle_license_number VARCHAR(255) PRIMARY KEY,
    resident_id INT,
    property_id INT,
    vehicle_make VARCHAR(255),
    vehicle_model VARCHAR(255),
    registration_date DATE,
    parking_spot_id INT,
    FOREIGN KEY (resident_id) REFERENCES resident(resident_id),
    FOREIGN KEY (parking_spot_id, property_id) REFERENCES parking_spot(parking_spot_number, property_id)
);

-- Insert data into PropertyOwner table
INSERT INTO property_owner (owner_id, first_name, last_name, contact_information, email, password) 
VALUES
(1, 'John', 'Doe', '555-1234', 'john.doe@example.com', 'password123'),
(2, 'Alice', 'Smith', '555-5678', 'alice.smith@example.com', 'password456'),
(3, 'Michael', 'Johnson', '555-8765', 'michael.johnson@example.com', 'password789'),
(4, 'Emily', 'Davis', '555-4321', 'emily.davis@example.com', 'password101'),
(5, 'Chris', 'Brown', '555-6789', 'chris.brown@example.com', 'password202');



INSERT INTO property (property_id, property_name, city, state, street, zipcode, type, number_of_units, owner_id, property_size, construction_date) VALUES
(1, 'Sunset Towers', 'Los Angeles', 'CA', '321 Sunset Blvd', '90001', 'Residential', 40, 2, 10000.00, '2012-08-15'),
(2, 'Riverbend Estates', 'Austin', 'TX', '123 River Rd', '73301', 'Residential', 25, 3, 7500.00, '2016-04-10'),
(3, 'Downtown Plaza', 'New York', 'NY', '456 Broadway', '10001', 'Commercial', 100, 1, 30000.00, '2010-11-20'),
(4, 'Hilltop Apartments', 'Seattle', 'WA', '789 Hilltop Dr', '98101', 'Residential', 15, 4, 5500.00, '2019-02-14'),
(5, 'Seaside Villas', 'San Diego', 'CA', '852 Ocean Ave', '92101', 'Residential', 12, 5, 4000.00, '2021-05-30');


INSERT INTO resident (resident_id, first_name, last_name, contact_information, email, move_in_date, move_out_date) VALUES
(1, 'John', 'Doe', '555-1234', 'john.doe@example.com', '2023-01-01', NULL),
(2, 'Jane', 'Smith', '555-2345', 'jane.smith@example.com', '2023-02-01', NULL),
(3, 'Michael', 'Johnson', '555-3456', 'michael.johnson@example.com', '2023-03-01', NULL),
(4, 'Emily', 'Davis', '555-4567', 'emily.davis@example.com', '2023-04-01', NULL),
(5, 'David', 'Garcia', '555-5678', 'david.garcia@example.com', '2023-05-01', NULL),
(6, 'Sarah', 'Martinez', '555-6789', 'sarah.martinez@example.com', '2023-06-01', NULL),
(7, 'Robert', 'Hernandez', '555-7890', 'robert.hernandez@example.com', '2023-07-01', NULL),
(8, 'Linda', 'Lopez', '555-8901', 'linda.lopez@example.com', '2023-08-01', NULL),
(9, 'William', 'Gonzalez', '555-9012', 'william.gonzalez@example.com', '2023-09-01', NULL),
(10, 'Jessica', 'Wilson', '555-0123', 'jessica.wilson@example.com', '2023-10-01', NULL),
(11, 'Daniel', 'Anderson', '555-1235', 'daniel.anderson@example.com', '2023-11-01', NULL),
(12, 'Laura', 'Thomas', '555-2346', 'laura.thomas@example.com', '2023-12-01', NULL),
(13, 'James', 'Taylor', '555-3457', 'james.taylor@example.com', '2023-01-02', NULL),
(14, 'Patricia', 'Moore', '555-4568', 'patricia.moore@example.com', '2023-02-02', NULL),
(15, 'Charles', 'Jackson', '555-5679', 'charles.jackson@example.com', '2023-03-02', NULL),
(16, 'Susan', 'White', '555-6780', 'susan.white@example.com', '2023-04-02', NULL),
(17, 'Thomas', 'Harris', '555-7891', 'thomas.harris@example.com', '2023-05-02', NULL),
(18, 'Margaret', 'Martin', '555-8902', 'margaret.martin@example.com', '2023-06-02', NULL),
(19, 'Anthony', 'Thompson', '555-9013', 'anthony.thompson@example.com', '2023-07-02', NULL),
(20, 'Sarah', 'Garcia', '555-0124', 'sarah.garcia@example.com', '2023-08-02', NULL),
(21, 'Matthew', 'Martinez', '555-1236', 'matthew.martinez@example.com', '2023-09-02', NULL),
(22, 'Nancy', 'Rodriguez', '555-2347', 'nancy.rodriguez@example.com', '2023-10-02', NULL),
(23, 'Ryan', 'Lewis', '555-3458', 'ryan.lewis@example.com', '2023-11-02', NULL),
(24, 'Angela', 'Lee', '555-4569', 'angela.lee@example.com', '2023-12-02', NULL),
(25, 'Joshua', 'Walker', '555-5670', 'joshua.walker@example.com', '2023-01-03', NULL),
(26, 'Megan', 'Hall', '555-6781', 'megan.hall@example.com', '2023-02-03', NULL),
(27, 'David', 'Allen', '555-7892', 'david.allen@example.com', '2023-03-03', NULL),
(28, 'Brittany', 'Young', '555-8903', 'brittany.young@example.com', '2023-04-03', NULL),
(29, 'Joshua', 'King', '555-9014', 'joshua.king@example.com', '2023-05-03', NULL),
(30, 'Diana', 'Wright', '555-0125', 'diana.wright@example.com', '2023-06-03', NULL),
(31, 'Andrew', 'Scott', '555-1237', 'andrew.scott@example.com', '2023-07-03', NULL),
(32, 'Rebecca', 'Green', '555-2348', 'rebecca.green@example.com', '2023-08-03', NULL),
(33, 'Zachary', 'Adams', '555-3459', 'zachary.adams@example.com', '2023-09-03', NULL),
(34, 'Kimberly', 'Baker', '555-4560', 'kimberly.baker@example.com', '2023-10-03', NULL),
(35, 'Eric', 'Gonzalez', '555-5671', 'eric.gonzalez@example.com', '2023-11-03', NULL),
(36, 'Sharon', 'Nelson', '555-6782', 'sharon.nelson@example.com', '2023-12-03', NULL),
(37, 'Justin', 'Carter', '555-7893', 'justin.carter@example.com', '2023-01-04', NULL),
(38, 'Samantha', 'Mitchell', '555-8904', 'samantha.mitchell@example.com', '2023-02-04', NULL),
(39, 'Samuel', 'Perez', '555-9015', 'samuel.perez@example.com', '2023-03-04', NULL),
(40, 'Alyssa', 'Roberts', '555-0126', 'alyssa.roberts@example.com', '2023-04-04', NULL),
(41, 'Cynthia', 'Turner', '555-1238', 'cynthia.turner@example.com', '2023-05-04', NULL),
(42, 'Paul', 'Phillips', '555-2349', 'paul.phillips@example.com', '2023-06-04', NULL),
(43, 'Victoria', 'Campbell', '555-3450', 'victoria.campbell@example.com', '2023-07-04', NULL),
(44, 'Kyle', 'Parker', '555-4561', 'kyle.parker@example.com', '2023-08-04', NULL),
(45, 'Sophia', 'Evans', '555-5672', 'sophia.evans@example.com', '2023-09-04', NULL),
(46, 'Chad', 'Edwards', '555-6783', 'chad.edwards@example.com', '2023-10-04', NULL),
(47, 'Hannah', 'Collins', '555-7894', 'hannah.collins@example.com', '2023-11-04', NULL),
(48, 'Aaron', 'Stewart', '555-8905', 'aaron.stewart@example.com', '2023-12-04', NULL),
(49, 'Daniel', 'Sanchez', '555-9016', 'daniel.sanchez@example.com', '2023-01-05', NULL);



INSERT INTO unit (unit_id, property_id, unit_size, bedrooms, bathrooms, rent_amount, availability) VALUES
    -- PropertyID 1
    (1, 1, 900, 2, 2, 1500.00, 'Available'),
    (2, 1, 1200, 3, 2, 2000.00, 'Available'),
    (3, 1, 800, 1, 1, 1200.00, 'Unavailable'),
    -- PropertyID 2
    (1, 2, 950, 2, 2, 1600.00, 'Available'),
    (2, 2, 1100, 2, 1, 1700.00, 'Available'),
    (3, 2, 1400, 3, 2, 2200.00, 'Unavailable'),
    -- PropertyID 3
    (1, 3, 1000, 2, 2, 1550.00, 'Available'),
    (2, 3, 1300, 3, 2, 2050.00, 'Available'),
    (3, 3, 750, 1, 1, 1150.00, 'Available'),
    -- PropertyID 4
    (1, 4, 900, 2, 1, 1450.00, 'Unavailable'),
    (2, 4, 1100, 2, 2, 1850.00, 'Available'),
    (3, 4, 1350, 3, 2, 2150.00, 'Available'),
    -- PropertyID 5
    (1, 5, 850, 2, 1, 1400.00, 'Unavailable'),
    (2, 5, 950, 2, 2, 1650.00, 'Available'),
    (3, 5, 1250, 3, 2, 2050.00, 'Available'),
    (4, 5, 1000, 2, 1, 1500.00, 'Available'),
    (5, 5, 1200, 3, 2, 2100.00, 'Available'),
    (6, 5, 850, 1, 1, 1250.00, 'Unavailable'),
    (7, 5, 900, 2, 2, 1600.00, 'Available'),
    (8, 5, 1000, 2, 1, 1450.00, 'Unavailable'),
    (9, 5, 950, 2, 2, 1800.00, 'Available'),
    (10, 5, 1350, 3, 2, 2250.00, 'Available'),
    (11, 5, 800, 1, 1, 1100.00, 'Available'),
    (12, 5, 1000, 2, 2, 1500.00, 'Available');


-- Insert data into LeaseAgreement table with updated PropertyID and UnitID
INSERT INTO lease_agreement (resident_id, property_id, unit_id, lease_start_date, lease_end_date, rent_amount, security_deposit, payment_frequency, status) VALUES
(1, 1, 1, '2023-01-01', '2024-01-01', 1200.00, 1200.00, 'Monthly', 'Active'),
(2, 1, 2, '2023-02-01', '2024-02-01', 1300.00, 1300.00, 'Monthly', 'Active'),
(3, 2, 1, '2023-03-01', '2024-03-01', 1250.00, 1250.00, 'Monthly', 'Active'),
(4, 2, 2, '2023-04-01', '2024-04-01', 1400.00, 1400.00, 'Monthly', 'Active'),
(5, 3, 1, '2023-05-01', '2024-05-01', 1500.00, 1500.00, 'Monthly', 'Active'),
(6, 3, 2, '2023-06-01', '2024-06-01', 1600.00, 1600.00, 'Monthly', 'Active'),
(7, 1, 3, '2023-07-01', '2024-07-01', 1100.00, 1100.00, 'Monthly', 'Active'),
(8, 2, 3, '2023-08-01', '2024-08-01', 1350.00, 1350.00, 'Monthly', 'Active'),
(9, 3, 3, '2023-09-01', '2024-09-01', 1550.00, 1550.00, 'Monthly', 'Active');





-- Insert data into AccessDevice table for each resident (Mobile App and Key Fob)
INSERT INTO access_device (access_device_id, resident_id, device_number, access_level, activation_date, deactivation_date, access_method) VALUES
(1, 1, 'AD-001', 'Full', '2024-01-15', NULL, 'Mobile App'),
(2, 1, 'AD-002', 'Full', '2024-01-20', NULL, 'Key Fob'),

(3, 2, 'AD-003', 'Full', '2024-01-25', NULL, 'Mobile App'),
(4, 2, 'AD-004', 'Full', '2024-02-01', NULL, 'Key Fob'),

(5, 3, 'AD-005', 'Full', '2024-02-05', NULL, 'Mobile App'),
(6, 3, 'AD-006', 'Full', '2024-02-10', NULL, 'Key Fob'),

(7, 4, 'AD-007', 'Full', '2024-02-15', NULL, 'Mobile App'),
(8, 4, 'AD-008', 'Full', '2024-02-20', NULL, 'Key Fob'),

(9, 5, 'AD-009', 'Full', '2024-02-25', NULL, 'Mobile App'),
(10, 5, 'AD-010', 'Full', '2024-03-01', NULL, 'Key Fob'),

(11, 6, 'AD-011', 'Full', '2024-03-05', NULL, 'Mobile App'),
(12, 6, 'AD-012', 'Full', '2024-03-10', NULL, 'Key Fob'),

(13, 7, 'AD-013', 'Full', '2024-03-15', NULL, 'Mobile App'),
(14, 7, 'AD-014', 'Full', '2024-03-20', NULL, 'Key Fob'),

(15, 8, 'AD-015', 'Full', '2024-03-25', NULL, 'Mobile App'),
(16, 8, 'AD-016', 'Full', '2024-03-30', NULL, 'Key Fob'),

(17, 9, 'AD-017', 'Full', '2024-04-05', NULL, 'Mobile App'),
(18, 9, 'AD-018', 'Full', '2024-04-10', NULL, 'Key Fob'),

(19, 10, 'AD-019', 'Full', '2024-04-15', NULL, 'Mobile App'),
(20, 10, 'AD-020', 'Full', '2024-04-20', NULL, 'Key Fob'),

(21, 11, 'AD-021', 'Full', '2024-04-25', NULL, 'Mobile App'),
(22, 11, 'AD-022', 'Full', '2024-04-30', NULL, 'Key Fob'),

(23, 12, 'AD-023', 'Full', '2024-05-05', NULL, 'Mobile App'),
(24, 12, 'AD-024', 'Full', '2024-05-10', NULL, 'Key Fob'),

(25, 13, 'AD-025', 'Full', '2024-05-15', NULL, 'Mobile App'),
(26, 13, 'AD-026', 'Full', '2024-05-20', NULL, 'Key Fob'),

(27, 14, 'AD-027', 'Full', '2024-05-25', NULL, 'Mobile App'),
(28, 14, 'AD-028', 'Full', '2024-05-30', NULL, 'Key Fob'),

(29, 15, 'AD-029', 'Full', '2024-06-05', NULL, 'Mobile App'),
(30, 15, 'AD-030', 'Full', '2024-06-10', NULL, 'Key Fob'),

(31, 16, 'AD-031', 'Full', '2024-06-15', NULL, 'Mobile App'),
(32, 16, 'AD-032', 'Full', '2024-06-20', NULL, 'Key Fob'),

(33, 17, 'AD-033', 'Full', '2024-06-25', NULL, 'Mobile App'),
(34, 17, 'AD-034', 'Full', '2024-06-30', NULL, 'Key Fob'),

(35, 18, 'AD-035', 'Full', '2024-07-05', NULL, 'Mobile App'),
(36, 18, 'AD-036', 'Full', '2024-07-10', NULL, 'Key Fob'),

(37, 19, 'AD-037', 'Full', '2024-07-15', NULL, 'Mobile App'),
(38, 19, 'AD-038', 'Full', '2024-07-20', NULL, 'Key Fob'),

(39, 20, 'AD-039', 'Full', '2024-07-25', NULL, 'Mobile App'),
(40, 20, 'AD-040', 'Full', '2024-07-30', NULL, 'Key Fob'),

(41, 21, 'AD-041', 'Full', '2024-08-05', NULL, 'Mobile App'),
(42, 21, 'AD-042', 'Full', '2024-08-10', NULL, 'Key Fob'),

(43, 22, 'AD-043', 'Full', '2024-08-15', NULL, 'Mobile App'),
(44, 22, 'AD-044', 'Full', '2024-08-20', NULL, 'Key Fob'),

(45, 23, 'AD-045', 'Full', '2024-08-25', NULL, 'Mobile App'),
(46, 23, 'AD-046', 'Full', '2024-08-30', NULL, 'Key Fob'),

(47, 24, 'AD-047', 'Full', '2024-09-05', NULL, 'Mobile App'),
(48, 24, 'AD-048', 'Full', '2024-09-10', NULL, 'Key Fob'),

(49, 25, 'AD-049', 'Full', '2024-09-15', NULL, 'Mobile App'),
(50, 25, 'AD-050', 'Full', '2024-09-20', NULL, 'Key Fob'),

(53, 26, 'AD-053', 'Full', '2024-10-05', NULL, 'Mobile App'),
(54, 26, 'AD-054', 'Full', '2024-10-10', NULL, 'Key Fob'),

(55, 27, 'AD-055', 'Full', '2024-10-15', NULL, 'Mobile App'),
(56, 27, 'AD-056', 'Full', '2024-10-20', NULL, 'Key Fob'),

(57, 28, 'AD-057', 'Full', '2024-10-25', NULL, 'Mobile App'),
(58, 28, 'AD-058', 'Full', '2024-10-30', NULL, 'Key Fob'),

(59, 29, 'AD-059', 'Full', '2024-11-05', NULL, 'Mobile App'),
(60, 29, 'AD-060', 'Full', '2024-11-10', NULL, 'Key Fob'),

(61, 30, 'AD-061', 'Full', '2024-11-15', NULL, 'Mobile App'),
(62, 30, 'AD-062', 'Full', '2024-11-20', NULL, 'Key Fob'),

(63, 31, 'AD-063', 'Full', '2024-11-25', NULL, 'Mobile App'),
(64, 31, 'AD-064', 'Full', '2024-11-30', NULL, 'Key Fob'),

(65, 32, 'AD-065', 'Full', '2024-12-05', NULL, 'Mobile App'),
(66, 32, 'AD-066', 'Full', '2024-12-10', NULL, 'Key Fob'),

(67, 33, 'AD-067', 'Full', '2024-12-15', NULL, 'Mobile App'),
(68, 33, 'AD-068', 'Full', '2024-12-20', NULL, 'Key Fob'),

(69, 34, 'AD-069', 'Full', '2024-12-25', NULL, 'Mobile App'),
(70, 34, 'AD-070', 'Full', '2024-12-30', NULL, 'Key Fob'),

(71, 35, 'AD-071', 'Full', '2025-01-05', NULL, 'Mobile App'),
(72, 35, 'AD-072', 'Full', '2025-01-10', NULL, 'Key Fob'),

(73, 36, 'AD-073', 'Full', '2025-01-15', NULL, 'Mobile App'),
(74, 36, 'AD-074', 'Full', '2025-01-20', NULL, 'Key Fob'),

(75, 37, 'AD-075', 'Full', '2025-01-25', NULL, 'Mobile App'),
(76, 37, 'AD-076', 'Full', '2025-01-30', NULL, 'Key Fob'),

(77, 38, 'AD-077', 'Full', '2025-02-05', NULL, 'Mobile App'),
(78, 38, 'AD-078', 'Full', '2025-02-10', NULL, 'Key Fob'),

(79, 39, 'AD-079', 'Full', '2025-02-15', NULL, 'Mobile App'),
(80, 39, 'AD-080', 'Full', '2025-02-20', NULL, 'Key Fob'),

(81, 40, 'AD-081', 'Full', '2025-02-25', NULL, 'Mobile App'),
(82, 40, 'AD-082', 'Full', '2025-03-01', NULL, 'Key Fob'),

(83, 41, 'AD-083', 'Full', '2025-03-05', NULL, 'Mobile App'),
(84, 41, 'AD-084', 'Full', '2025-03-10', NULL, 'Key Fob'),

(85, 42, 'AD-085', 'Full', '2025-03-15', NULL, 'Mobile App'),
(86, 42, 'AD-086', 'Full', '2025-03-20', NULL, 'Key Fob'),

(87, 43, 'AD-087', 'Full', '2025-03-25', NULL, 'Mobile App'),
(88, 43, 'AD-088', 'Full', '2025-03-30', NULL, 'Key Fob'),

(89, 44, 'AD-089', 'Full', '2025-04-05', NULL, 'Mobile App'),
(90, 44, 'AD-090', 'Full', '2025-04-10', NULL, 'Key Fob'),

(91, 45, 'AD-091', 'Full', '2025-04-15', NULL, 'Mobile App'),
(92, 45, 'AD-092', 'Full', '2025-04-20', NULL, 'Key Fob'),

(93, 46, 'AD-093', 'Full', '2025-04-25', NULL, 'Mobile App'),
(94, 46, 'AD-094', 'Full', '2025-04-30', NULL, 'Key Fob'),

(95, 47, 'AD-095', 'Full', '2025-05-05', NULL, 'Mobile App'),
(96, 47, 'AD-096', 'Full', '2025-05-10', NULL, 'Key Fob'),

(97, 48, 'AD-097', 'Full', '2025-05-15', NULL, 'Mobile App'),
(98, 48, 'AD-098', 'Full', '2025-05-20', NULL, 'Key Fob'),

(99, 49, 'AD-099', 'Full', '2025-05-25', NULL, 'Mobile App'),
(100, 49, 'AD-100', 'Full', '2025-05-30', NULL, 'Key Fob');





-- Insert data into MaintenanceRequest table with request_id as the primary key and composite key (property_id, unit_id)
INSERT INTO maintenance_request (request_id, resident_id, property_id, unit_id, issue_description, request_date, priority, status, assigned_staff_id) VALUES
(1, 1, 1, 1, 'Leaky faucet in kitchen.', '2023-01-01', 'High', 'Pending', 5),
(2, 2, 1, 2, 'Heating system not working.', '2023-01-02', 'High', 'In Progress', 3),
(3, 3, 2, 1, 'Air conditioning unit is noisy.', '2023-01-03', 'Medium', 'Pending', 4),
(4, 4, 2, 2, 'Bathroom light fixture broken.', '2023-01-04', 'Low', 'Completed', 6),
(5, 5, 3, 1, 'Refrigerator not cooling.', '2023-01-05', 'High', 'Pending', 2),
(6, 6, 3, 2, 'Washer machine leaking.', '2023-01-06', 'Medium', 'In Progress', 1),
(7, 7, 1, 3, 'Doorbell not functioning.', '2023-01-07', 'Low', 'Completed', 7),
(8, 8, 2, 3, 'Window is broken.', '2023-01-08', 'Medium', 'Pending', 2),
(9, 9, 3, 3, 'Basement flooded.', '2023-01-09', 'High', 'In Progress', 5);



-- Insert data into parking_spot table with foreign keys
INSERT INTO parking_spot (parking_spot_number, property_id, resident_id, vehicle_id, availability, reserved_date, expiration_date) VALUES
(1, 1, 1, NULL, 'Occupied', '2024-01-01', '2024-12-31'),
(2, 1, 2, NULL, 'Occupied', '2024-01-01', '2024-12-31'),
(3, 1, NULL, NULL, 'Available', NULL, NULL),
(4, 1, 4, NULL, 'Occupied', '2024-01-01', '2024-12-31'),
(5, 1, 5, NULL, 'Available', NULL, NULL),
(6, 1, 6, NULL, 'Occupied', '2024-01-01', '2024-12-31'),
(1, 2, 9, NULL, 'Occupied', '2024-01-01', '2024-12-31'),
(2, 2, 10, NULL, 'Available', NULL, NULL),
(1, 3, 11, NULL, 'Occupied', '2024-01-01', '2024-12-31'),
(2, 3, 12, NULL, 'Occupied', '2024-01-01', '2024-12-31');




INSERT INTO staff (staff_id, first_name, last_name, role, contact_information, assigned_property_id, hire_date, employment_status) VALUES
(1, 'Alice', 'Johnson', 'Property Manager', '555-0001', 1, '2020-01-15', 'Active'),
(2, 'Bob', 'Smith', 'Maintenance Technician', '555-0002', 1, '2021-03-20', 'Active'),
(3, 'Charlie', 'Brown', 'Leasing Agent', '555-0003', 2, '2019-06-10', 'Active'),
(4, 'Diana', 'Clark', 'Administrative Assistant', '555-0004', 2, '2022-05-15', 'Active'),
(5, 'Ethan', 'Roberts', 'Security Personnel', '555-0005', 3, '2021-07-01', 'Active'),
(6, 'Fiona', 'Martinez', 'Customer Service Representative', '555-0006', 3, '2020-12-10', 'Active'),
(7, 'George', 'Wilson', 'Maintenance Supervisor', '555-0007', 4, '2018-09-25', 'Active'),
(8, 'Hannah', 'Lee', 'Marketing Coordinator', '555-0008', 4, '2023-01-05', 'Active'),
(9, 'Isaac', 'Gonzalez', 'Property Accountant', '555-0009', 5, '2020-04-18', 'Active'),
(10, 'Jessica', 'Adams', 'Property Analyst', '555-0010', 5, '2022-02-14', 'Active');


INSERT INTO access_log (resident_id, access_device_id, access_date_time, access_location, access_method) VALUES
(1, 1, '2024-10-01 08:30:00', 'Main Entrance', 'Keycard'),
(2, 2, '2024-10-01 09:15:00', 'Parking Garage', 'Mobile App'),
(3, 3, '2024-10-01 10:00:00', 'Main Entrance', 'Biometric Scanner'),
(4, 1, '2024-10-01 12:30:00', 'Gym', 'Keycard'),
(5, 2, '2024-10-01 14:20:00', 'Pool Area', 'Mobile App'),
(6, 4, '2024-10-01 16:45:00', 'Main Entrance', 'Biometric Scanner'),
(7, 3, '2024-10-02 08:15:00', 'Parking Garage', 'Keycard'),
(8, 5, '2024-10-02 09:50:00', 'Gym', 'Mobile App'),
(9, 1, '2024-10-02 11:00:00', 'Pool Area', 'Keycard'),
(10, 6, '2024-10-02 14:30:00', 'Main Entrance', 'Biometric Scanner'),
(11, 2, '2024-10-03 07:45:00', 'Gym', 'Mobile App'),
(12, 4, '2024-10-03 09:30:00', 'Parking Garage', 'Keycard'),
(13, 3, '2024-10-03 10:50:00', 'Pool Area', 'Biometric Scanner'),
(14, 5, '2024-10-03 12:15:00', 'Main Entrance', 'Mobile App'),
(15, 7, '2024-10-03 13:40:00', 'Gym', 'Keycard'),
(16, 8, '2024-10-04 08:00:00', 'Parking Garage', 'Mobile App'),
(17, 9, '2024-10-04 10:10:00', 'Main Entrance', 'Biometric Scanner'),
(18, 1, '2024-10-04 12:25:00', 'Pool Area', 'Keycard'),
(19, 2, '2024-10-04 15:50:00', 'Gym', 'Mobile App'),
(20, 3, '2024-10-05 07:35:00', 'Parking Garage', 'Keycard'),
(21, 4, '2024-10-05 08:45:00', 'Main Entrance', 'Biometric Scanner'),
(22, 5, '2024-10-05 09:55:00', 'Pool Area', 'Mobile App'),
(23, 6, '2024-10-05 10:30:00', 'Gym', 'Keycard'),
(24, 7, '2024-10-05 11:20:00', 'Parking Garage', 'Mobile App'),
(25, 8, '2024-10-05 12:00:00', 'Main Entrance', 'Biometric Scanner');



INSERT INTO common_area (property_id, area_name, access_level, maintenance_schedule) VALUES
(1, 'Gym', 'Resident', 'Weekly - Every Monday at 9:00 AM'),
(1, 'Pool', 'Resident', 'Monthly - First Friday of the month at 10:00 AM'),
(1, 'Parking Garage', 'Resident', 'Bi-Weekly - Every Wednesday at 11:00 AM'),
(1, 'Rooftop Lounge', 'Resident', 'Monthly - First Monday of the month at 8:00 AM'),
(2, 'Business Center', 'Resident', 'Weekly - Every Tuesday at 10:00 AM'),
(2, 'Gym', 'Resident', 'Weekly - Every Thursday at 9:00 AM'),
(2, 'Conference Room', 'Staff', 'As Needed'),
(3, 'Lobby', 'Resident', 'Daily - Every day at 7:00 AM'),
(3, 'Fitness Center', 'Resident', 'Weekly - Every Friday at 9:30 AM'),
(3, 'Parking Garage', 'Resident', 'Bi-Weekly - Every Wednesday at 12:00 PM'),
(3, 'Rooftop Terrace', 'Resident', 'Monthly - Last Monday of the month at 9:00 AM'),
(4, 'Community Room', 'Resident', 'Bi-Monthly - First and third Thursdays of the month at 10:00 AM'),
(4, 'Laundry Room', 'Resident', 'Weekly - Every Saturday at 9:00 AM'),
(4, 'Garden', 'Resident', 'Monthly - Second Tuesday of the month at 8:00 AM'),
(5, 'Gym', 'Resident', 'Weekly - Every Monday at 9:30 AM'),
(5, 'Pool', 'Resident', 'Monthly - Last Friday of the month at 11:00 AM'),
(5, 'Parking Garage', 'Resident', 'Bi-Weekly - Every Wednesday at 11:30 AM'),
(5, 'BBQ Area', 'Resident', 'Monthly - First Saturday of the month at 2:00 PM');


INSERT INTO service_provider (company_name, service_type, contact_information, assigned_property_id, contract_start_date, contract_end_date, status) VALUES
('Clean Sweep', 'Cleaning', '555-1234', 1, '2023-01-01', '2024-01-01', 'Active'),
('Bright Lights', 'Electrical', '555-2345', 1, '2023-03-01', '2024-03-01', 'Active'),
('Green Lawn', 'Landscaping', '555-3456', 2, '2022-06-15', '2023-06-15', 'Expired'),
('Fix It All', 'Maintenance', '555-4567', 2, '2023-02-01', '2024-02-01', 'Active'),
('Sunshine Pools', 'Pool Service', '555-5678', 3, '2023-04-01', '2024-04-01', 'Active'),
('SafeGuard Security', 'Security', '555-6789', 3, '2023-05-01', '2025-05-01', 'Active'),
('AC Experts', 'HVAC', '555-7890', 4, '2022-09-01', '2023-09-01', 'Expired'),
('Spotless Windows', 'Window Cleaning', '555-8901', 4, '2023-06-01', '2024-06-01', 'Active'),
('Bright Day Solar', 'Solar Power', '555-9012', 5, '2023-07-01', '2024-07-01', 'Active'),
('Waterworks Plumbing', 'Plumbing', '555-0123', 5, '2023-08-01', '2024-08-01', 'Active'),
('Green Solutions', 'Recycling', '555-2346', 1, '2023-09-01', '2024-09-01', 'Active'),
('Elite Pest Control', 'Pest Control', '555-3457', 2, '2023-05-15', '2024-05-15', 'Active'),
('Fix Right', 'Maintenance', '555-4568', 3, '2023-01-15', '2024-01-15', 'Active'),
('Eco Landscaping', 'Landscaping', '555-5679', 4, '2023-11-01', '2024-11-01', 'Active'),
('Fresh Air HVAC', 'HVAC', '555-6780', 5, '2023-10-01', '2024-10-01', 'Active');



INSERT INTO visitor_log (visitor_log_id, visitor_name, resident_id, unit_id, date_of_visit, access_method, entry_time, exit_time) VALUES
(1, 'Alex Johnson', 1, 1, '2024-01-15', 'Keycard', '09:30:00', '12:00:00'),
(2, 'Brian Williams', 2, 2, '2024-01-16', 'Intercom', '14:15:00', '16:30:00'),
(3, 'Catherine Lee', 3, 3, '2024-01-16', 'Keycard', '11:00:00', '13:00:00'),
(4, 'Derek Brown', 4, 1, '2024-01-17', 'Biometric', '08:00:00', '10:30:00'),
(5, 'Eva Martinez', 5, 2, '2024-01-18', 'Intercom', '10:45:00', '13:15:00'),
(6, 'Fiona Taylor', 6, 3, '2024-01-18', 'Keycard', '12:30:00', '14:45:00'),
(7, 'George Clark', 7, 1, '2024-01-19', 'Biometric', '09:15:00', '11:45:00'),
(8, 'Hannah Scott', 8, 2, '2024-01-19', 'Intercom', '15:00:00', '17:30:00'),
(9, 'Isabella Green', 9, 3, '2024-01-20', 'Keycard', '07:45:00', '10:00:00'),
(10, 'Jake Adams', 10, 1, '2024-01-20', 'Intercom', '16:00:00', '18:15:00'),
(11, 'Kevin Harris', 11, 2, '2024-01-21', 'Biometric', '09:00:00', '11:30:00'),
(12, 'Laura Baker', 12, 3, '2024-01-21', 'Keycard', '10:30:00', '12:45:00'),
(13, 'Mark Nelson', 13, 1, '2024-01-22', 'Intercom', '14:45:00', '17:00:00'),
(14, 'Natalie Hill', 14, 2, '2024-01-22', 'Biometric', '11:30:00', '13:45:00'),
(15, 'Olivia White', 15, 3, '2024-01-23', 'Keycard', '12:15:00', '14:30:00'),
(16, 'Paul Roberts', 16, 1, '2024-01-23', 'Intercom', '09:45:00', '11:15:00'),
(17, 'Quincy Lewis', 17, 2, '2024-01-24', 'Biometric', '10:00:00', '12:30:00'),
(18, 'Rachel Carter', 18, 3, '2024-01-24', 'Keycard', '13:45:00', '16:00:00'),
(19, 'Steven Young', 19, 1, '2024-01-25', 'Intercom', '08:30:00', '11:00:00'),
(20, 'Tina Miller', 20, 2, '2024-01-25', 'Biometric', '14:00:00', '16:45:00'),
(21, 'Uma Perez', 21, 3, '2024-01-26', 'Keycard', '11:15:00', '13:30:00'),
(22, 'Victor King', 22, 1, '2024-01-26', 'Intercom', '07:00:00', '09:30:00'),
(23, 'Wendy Garcia', 23, 2, '2024-01-27', 'Biometric', '10:45:00', '13:15:00'),
(24, 'Xavier Lopez', 24, 3, '2024-01-27', 'Keycard', '15:30:00', '17:45:00'),
(25, 'Yvonne Bell', 25, 1, '2024-01-28', 'Intercom', '09:15:00', '11:45:00');



INSERT INTO vehicle (vehicle_license_number, resident_id, property_id, vehicle_make, vehicle_model, registration_date, parking_spot_id) VALUES
('ABC123', 1, 1, 'Toyota', 'Camry', '2023-01-01', 1),   -- Resident 1 at property 1, parking spot 1
('XYZ456', 2, 1, 'Honda', 'Civic', '2023-01-02', 2),    -- Resident 2 at property 1, parking spot 2
('LMN789', 3, 2, 'Ford', 'Focus', '2023-02-01', 1),     -- Resident 3 at property 2, parking spot 1
('DEF234', 4, 2, 'Chevrolet', 'Malibu', '2023-03-01', 2),  -- Resident 4 at property 2, parking spot 2
('GHI567', 5, 3, 'Nissan', 'Altima', '2023-04-01', 1),    -- Resident 5 at property 3, parking spot 1
('JKL890', 6, 3, 'Hyundai', 'Elantra', '2023-05-01', 2);  -- Resident 6 at property 3, parking spot 2