<?php
session_start();
require "_connection-bdd.php";

var_dump($_POST);
exit;

if ($_POST['createCharacter'] === 'Terminer la création' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $attack = $_POST['attack'];
    $shield = $_POST['shield'];
    $speed = $_POST['speed'];
    $health = $_POST['health'];

    // Gestion de l'image
    $img_hero = $_FILES['img_hero']['name'];
    $img_hero_tmp = $_FILES['img_hero']['tmp_name'];
    $img_hero_path = "chemin/vers/le/dossier/ou/sauvegarder/".$img_hero;

    // Déplace le fichier temporaire vers le dossier de destination
    move_uploaded_file($img_hero_tmp, $img_hero_path);

    // Assuming you have a 'heroes' table with columns 'name', 'attack', 'shield', 'speed', and 'health'
    $query = $dbCo->prepare("INSERT INTO heroes (hero_name, hero_strength, hero_combat, hero_speed, hero_durability, hero_lg) VALUES (:hero_name, :attack, :shield, :speed, :health, :img_hero )");
    $query->bindParam(':hero_name', $name);
    $query->bindParam(':attack', $attack);
    $query->bindParam(':shield', $shield);
    $query->bindParam(':speed', $speed);
    $query->bindParam(':health', $health);
    $query->bindParam(':img_hero', $img_hero_content, PDO::PARAM_LOB);

    $isOk = $query->execute();

    echo json_encode([
        'result' => $isOk,
        'message' => $isOk ? 'Hero added successfully' : 'Failed to add hero',
    ]);
}