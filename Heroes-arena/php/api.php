
<?php
session_start();
require "_connection-bdd.php";
$data = json_decode(file_get_contents('php://input'), true);
header('content-type:application/json');

$isOk = false;

if ($data['action'] === 'showName' && $_SERVER['REQUEST_METHOD'] === 'POST') {

    $heroName = (string)strip_tags($data['hero_name']);
    $query = $dbCo->prepare("SELECT hero_name, id_hero FROM `heroes` WHERE `hero_name` LIKE :heroname;");
    $isOk = $query->execute([
        'heroname' => '%' . $heroName . '%' 
    ]);
    $datas = $query -> fetchAll();
    echo json_encode([
        'result' => $isOk,
        'hero_name' => $datas,
    ]);
    exit;
    // echo json_encode($datas);
}

if ($data['action'] === 'selectHero' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $idHero = (int)strip_tags($data['id_hero']);
    $query = $dbCo->prepare("SELECT * FROM `heroes` WHERE `id_hero` LIKE :id_hero;");
    $isOk = $query->execute([
        'id_hero' => $idHero,
    ]);
    $datas = $query -> fetchAll();
    echo json_encode([
        'result' => $isOk,
        'hero_name' => $datas,
    ]);
};
if ($data['action'] === 'giveAllId' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $query = $dbCo->prepare("SELECT id_hero FROM `heroes` ;");
    $isOk = $query->execute();
    $datas = $query -> fetchAll();
    echo json_encode([
        'result' => $isOk,
        'heroes_ids' => $datas,
    ]);
};





