<?php
require "../php/_connection-Bdd.php";
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
    <header class="header">
        <div class="header__band"></div>
        <div class="header__background"></div>
        <a class="header__link" href="index.html">
            <img class="header__logo" src="../img/logo heroes-arena.png" alt="logo">
        </a>
    </header>


    <div class="create_menu">
        <h1 class="menu_title">Create New Character</h1>
        <div class="menu_informations">
            <form action="" class="informations_form"><input type="text" class="form_name" placeholder="Enter name of your Hero"></form>
            <div class="informations_picture"><img src="../img/1-a-bomb.jpg" alt="" class="picture_hero"></div>
            <div class="informations_stats">
                <div class="stats_stat">
                    <h3 class="stat_name">Stat Name</h3>
                    <div class="stat_progress">
                        <button class="progress_button">-</button>
                        <div class="progress_bar">
                            <p class="stat_value">stat_value</p>
                            <div class="bar_stat"></div>
                        </div>
                        <button class="progress_button">+</button>
                    </div>
                </div>
                <div class="stats_stat">
                    <h3 class="stat_name">Stat Name</h3>
                    <div class="stat_progress">
                        <button class="progress_button">-</button>
                        <div class="progress_bar">
                            <p class="stat_value">stat_value</p>
                            <div class="bar_stat"></div>
                        </div>
                        <button class="progress_button">+</button>
                    </div>
                </div>
                <div class="stats_stat">
                    <h3 class="stat_name">Stat Name</h3>
                    <div class="stat_progress">
                        <button class="progress_button">-</button>
                        <div class="progress_bar">
                            <p class="stat_value">stat_value</p>
                            <div class="bar_stat"></div>
                        </div>
                        <button class="progress_button">+</button>
                    </div>
                </div>
                <div class="stats_stat">
                    <h3 class="stat_name">Stat Name</h3>
                    <div class="stat_progress">
                        <button class="progress_button">-</button>
                        <div class="progress_bar">
                            <p class="stat_value">stat_value</p>
                            <div class="bar_stat"></div>
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
    <footer class="footer">
        <div class="footer__band"></div>
        <div class="footer__background"></div>
        <a class="footer__link" href="index.html">
            <img class="footer__logo" src="../img/logo heroes-arena.png" alt="logo">
        </a>
    </footer>
</body>

</html>