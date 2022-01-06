INSERT INTO users (name, email, password)
VALUES ('Omer', 'omar@hmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Chan', 'chan@protonmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lauren', 'lauren@Jmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Scott', 'scott@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Neeyla', 'neeyla@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code , active)
VALUES ('1', 'Farmland Mansion', 'Best place to experience tranquilizing countryside', 'https://media-cdn.tripadvisor.com/media/vr-splice-j/05/67/5f/71.jpg', 'https://media-cdn.tripadvisor.com/media/vr-splice-j/05/67/5f/71.jpg', 90, 6, 3, 4, 'United States of America', '8370 Pennystreet Rd', 'Athens', 'GA', '1G3A4P' , true ),
('2', 'Penthouse-New York', 'Penthouse with the view of New York', 'https://www.hospitalitynet.org/picture/153051213.jpg', 'https://www.hospitalitynet.org/picture/153051213.jpg', 250, 1, 2, 2, 'United States of America', '2392 Hill Street', 'New York', 'NY', '9N5Y7H', true),
('4', 'Beachhouse', 'Coastal Mansion to experience the sun', 'https://haymanisland.intercontinental.com/wp-content/uploads/2019/11/beach_house_banner.jpg', 'https://haymanisland.intercontinental.com/wp-content/uploads/2019/11/beach_house_banner.jpg', 200, 5, 3, 3, 'Canada', '1589 Sunset Drive', 'Vancouver', 'BC', '2B3J5V', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-01-06', '2021-02-05', 1, 4),
('2021-01-03', '2021-01-24', 2, 5),
('2022-01-01', '2022-01-04', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 1, 1, 5, 'Best LightBnB we have stayed in! Host was very kind and we were very pleased'),
(5, 2, 2, 5, 'Everything was just like in the pictures. Would recommend!'),
(3, 3, 3, 4, 'Nothing to complain about :)');