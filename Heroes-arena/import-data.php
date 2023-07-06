<?php
// -----------------------------------------------------------------------    Connections    ---------------------------------------------------------------------
// Paramètres de connexion à la base de données
$db_host = 'localhost';
$db_name = 'Heroes_Arena';
$db_user = 'Jason';
$db_password = 'PasswordSécurisé4875447';
// Établir la connexion à la base de données
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);
// Vérifier si la connexion a réussi
if ($conn->connect_error) {
    die('Erreur de connexion : ' . $conn->connect_error);
}
// Effectuer la requête GET à l'API
$url = 'https://akabab.github.io/superhero-api/api/all.json';
$data = file_get_contents($url);
$heroes = json_decode($data, true);
// -----------------------------------------------------------------------    Remplissage de la BDD    ---------------------------------------------------------
// Parcourir les données et insérer dans la base de données
foreach ($heroes as $hero) {
    if ($hero['images']['xs'] == "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/no-portrait.jpg") {
        continue;
    }
    $powerstats = $hero['powerstats'];
    $biography = $hero['biography'];
    $images = $hero['images'];
    $hero_name = $conn->real_escape_string($hero['name']);
    $hero_numberInApi = $hero['id'];
    $hero_intelligence = $powerstats['intelligence'];
    $hero_strength = $powerstats['strength'];
    $hero_speed = $powerstats['speed'];
    $hero_durability = $powerstats['durability'];
    $hero_life = $powerstats['durability'];
    $hero_power = $powerstats['power'];
    $hero_combat = $powerstats['combat'];
    $hero_fullName = $conn->real_escape_string($biography['fullName']);
    $hero_publisher = $conn->real_escape_string($biography['publisher']);
    $hero_alignment = $conn->real_escape_string($biography['alignment']);
    $hero_Xs = $conn->real_escape_string($images['xs']);
    $hero_Sm = $conn->real_escape_string($images['sm']);
    $hero_Md = $conn->real_escape_string($images['md']);
    $hero_Lg = $conn->real_escape_string($images['lg']);
    // Préparer l'instruction SQL d'insertion
    $stmt = $conn->prepare("INSERT INTO heroes (hero_name, hero_numberInApi, hero_intelligence, hero_strength, hero_speed, hero_durability, hero_life, hero_power, hero_combat, hero_full_name, hero_publisher, hero_alignment, hero_xs, hero_sm, hero_md, hero_lg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    // Vérifier si la préparation de la requête a réussi
    if (!$stmt) {
        die('Erreur de préparation de la requête : ' . $conn->error);
    }
    // Lier les valeurs aux paramètres de la requête
    $stmt->bind_param('ssssssssssssssss', $hero_name, $hero_numberInApi, $hero_intelligence, $hero_strength, $hero_speed, $hero_durability, $hero_life, $hero_power, $hero_combat, $hero_fullName, $hero_publisher, $hero_alignment, $hero_Xs, $hero_Sm, $hero_Md, $hero_Lg);
    // Exécuter la requête
    if (!$stmt->execute()) {
        die('Erreur lors de l\'exécution de la requête : ' . $stmt->error);
    }
}
// Fermer la connexion à la base de données
$conn->close();
?>