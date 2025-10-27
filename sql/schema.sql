CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    href VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL
);

CREATE TABLE service_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    item VARCHAR(255) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL
);

CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE featured_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(255) NOT NULL,
    students INT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(255) NOT NULL
);
