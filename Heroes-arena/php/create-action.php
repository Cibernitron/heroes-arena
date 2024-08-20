<?php
session_start();
require "_connection-bdd.php";

var_dump($_FILES);

if ($_POST['createCharacter'] === 'Terminer la création' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $attack = $_POST['attack'];
    $shield = $_POST['shield'];
    $speed = $_POST['speed'];
    $health = $_POST['health'];


    // Gestion de l'image
    $img_hero = $_FILES['img_hero']['name'];
    $img_hero_tmp = $_FILES['img_hero']['tmp_name'];

    // Utilisez l'API ImgBB pour téléverser l'image
    $apiKey = 'f48ccdbe42587d8aae813f576ad093c8';
    $uploadUrl = 'https://api.imgbb.com/1/upload?key=' . $apiKey;

    $imgData = file_get_contents($img_hero_tmp);
    $base64ImgData = base64_encode($imgData);

    $uploadResponse = json_decode(file_get_contents($uploadUrl, false, stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query(['image' => $base64ImgData]),
        ],
    ])), true);

    // Vérifiez si le téléversement a réussi
    if ($uploadResponse && isset($uploadResponse['data']['url'])) {
        $imgUrl = $uploadResponse['data']['url'];

        // Ajoutez le lien de l'image dans la base de données
        $query = $dbCo->prepare("INSERT INTO heroes (hero_name, hero_strength, hero_combat, hero_speed, hero_durability, hero_xs, hero_sm, hero_md, hero_lg) VALUES (:hero_name, :attack, :shield, :speed, :health, :img_hero, :img_hero ,:img_hero ,:img_hero)");
        $query->bindParam(':hero_name', $name);
        $query->bindParam(':attack', $attack);
        $query->bindParam(':shield', $shield);
        $query->bindParam(':speed', $speed);
        $query->bindParam(':health', $health);
        $query->bindParam(':img_hero', $imgUrl);

        $isOk = $query->execute();
        if ($isOk) {
            // Redirection vers la page d'accueil en cas de succès
            header('Location: /index.php');
            exit;
        } else {
            // Redirection avec un message d'erreur
            header('Location: /index.php?message=Failed%20to%20add%20hero');
            exit;
        }
    } else {
        // Redirection avec un message d'erreur
        header('Location: /index.php?message=Failed%20to%20upload%20image%20to%20ImgBB');
        exit;
    }
}
