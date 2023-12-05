<?php
require "../php/_connection-bdd.php";
include "../php/_function.php";

session_start();

$_SESSION['token'] = md5(uniqid(mt_rand(), true));
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Marvel:wght@400;700&family=Roboto:wght@100&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../style.css">
</head>

<body class="body">
    <div class="body__background"></div>
    <?php include "../php/_header.php" ?>

    <main>

        <div class="create_menu">
            <h1 class="menu_title">Create New Character</h1>
            <div class="menu_informations">
                <form action="" class="informations_form">
                    <div class="hero-card-container card">
                        <div class="hero-card hero-card-shadow card__face--front hero_information">
                            <div class="face-card">
                                <h3 class="name-hero">
                                    <input type="text" class="form_name" placeholder="Enter name of your Hero">
                                </h3>
                                <img src="../img/Choix perso mobile.png" alt="" class="picture_hero">
                                <input type="file" id="uploadInput" style="display: none;">
                            </div>
                            
                        </div>
                    </div>
                </form>

                
                <div class="informations_stats">
                    <div class="stats_stat">
                        <h3 class="stat_name">Attack</h3>
                        <div class="stat_progress">
                            <button class="progress_button">-</button>
                            <div class="progress_bar">
                                <div class="bar_stat"></div>
                                <p class="stat_value">hero_strength</p>
                            </div>
                            <button class="progress_button">+</button>
                        </div>
                    </div>
                    <div class="stats_stat">
                        <h3 class="stat_name">Shield</h3>
                        <div class="stat_progress">
                            <button class="progress_button">-</button>
                            <div class="progress_bar">
                                <div class="bar_stat"></div>
                                <p class="stat_value">hero_combat</p>
                            </div>
                            <button class="progress_button">+</button>
                        </div>
                    </div>
                    <div class="stats_stat">
                        <h3 class="stat_name">Speed</h3>
                        <div class="stat_progress">
                            <button class="progress_button">-</button>
                            <div class="progress_bar">
                                <div class="bar_stat"></div>
                                <p class="stat_value">hero_speed</p>
                            </div>
                            <button class="progress_button">+</button>
                        </div>
                    </div>
                    <div class="stats_stat">
                        <h3 class="stat_name">Health</h3>
                        <div class="stat_progress">
                            <button class="progress_button">-</button>
                            <div class="progress_bar">
                                <div class="bar_stat"></div>
                                <p class="stat_value">hero_durability</p>
                            </div>
                            <button class="progress_button">+</button>
                        </div>
                    </div>



                    <div class="stats_rest">
                        <h3 class="rest_title">Points to distribute :</h3>
                    </div>
                </div>
            </div>
        </div>

    </main>


    <?= include "../php/_footer.php"; ?>
    <script src="../create-script.js"></script>
</body>

</html>