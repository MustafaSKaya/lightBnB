SELECT properties.id as id, properties.title as title, properties.cost_per_night as cost_per_night, AVG(property_reviews.rating) as average_rating 
FROM properties 
JOIN property_reviews ON property_id = properties.id 
WHERE properties.city = 'Vancouver' 
GROUP BY properties.id 
HAVING AVG(property_reviews.rating) >= 4 
ORDER BY properties.cost_per_night 
LIMIT 10;  