<?php
// -----------------------------------------------------------------------    Connections    ---------------------------------------------------------------------
// Database connection parameters
$db_host = 'localhost';
$db_name = 'Heroes_Arena';
$db_user = 'Jason';
$db_password = 'PasswordSécurisé4875447';
// Establish database connection
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);
// Check if the connection was successful
if ($conn->connect_error) {
    die('Erreur de connexion : ' . $conn->connect_error);
}
// Make the GET request to the API
$url = 'https://akabab.github.io/superhero-api/api/all.json';
$data = file_get_contents($url);
$heroes = json_decode($data, true);
// -----------------------------------------------------------------------    Filling the database    ---------------------------------------------------------
// Browse data and insert into database
foreach ($heroes as $hero) {
    if ($hero['images']['xs'] == "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/no-portrait.jpg") {
        continue;
    }
    $powerstats = $hero['powerstats'];
    $biography = $hero['biography'];
    $images = $hero['images'];
    $hero_name = $hero['name'];
    $hero_numberInApi = $hero['id'];
    $hero_intelligence = $powerstats['intelligence'];
    $hero_strength = $powerstats['strength'];
    $hero_speed = $powerstats['speed'];
    $hero_durability = $powerstats['durability'];
    $hero_life = $powerstats['durability'];
    $hero_power = $powerstats['power'];
    $hero_combat = $powerstats['combat'];
    $hero_fullName = $biography['fullName'];
    $hero_publisher = $biography['publisher'];
    $hero_alignment = $biography['alignment'];
    $hero_Xs = $images['xs'];
    $hero_Sm = $images['sm'];
    $hero_Md = $images['md'];
    $hero_Lg = $images['lg'];
    // Prepare the insert SQL statement
    $stmt = $conn->prepare("INSERT INTO heroes (hero_name, hero_numberInApi, hero_intelligence, hero_strength, hero_speed, 
    hero_durability, hero_life, hero_power, hero_combat, hero_full_name, hero_publisher, hero_alignment, hero_xs, hero_sm, hero_md, hero_lg) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    // Check if the preparation of the request was successful
    if (!$stmt) {
        die('Erreur de préparation de la requête : ' . $conn->error);
    }
    // Bind values ​​to query parameters
    $stmt->bind_param('ssssssssssssssss', $hero_name, $hero_numberInApi, $hero_intelligence, $hero_strength, $hero_speed,
     $hero_durability, $hero_life, $hero_power, $hero_combat, $hero_fullName, $hero_publisher, $hero_alignment, $hero_Xs, $hero_Sm, $hero_Md, $hero_Lg);
    // Run the query
    if (!$stmt->execute()) {
        die('Erreur lors de l\'exécution de la requête : ' . $stmt->error);
    }
}
// Close database connection
$conn->close();
?>