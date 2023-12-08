<?php
require "../php/_connection-bdd.php";
include "../php/_function.php";


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
        <!-- Search -->
        <?= displaySearchBar() ?>
        <!-- Selection Heroes -->
        <!-- <div id="selection-heroes__background"> -->
        <section class="selection combat-design" id="selection">
            <div class="combat-background display-none">
            </div>
            <div class="speed__selection">
                <img class="play__button" src="../img/play.png" alt="">
                <img class="speed__button" src="../img/play.png" alt="">
            </div>
            <div class="selection__heroes">
                <div class="heroes__container">
                    <!-- Selection Hero1 -->
                    <div id="hero1" class="selection__hero">
                        <div class="hero__life-container display-none">
                            <img class="health-img-1" src="../img/coeur.png">
                            <div class="life__progress-container">
                                <p class="progress__life-point"></p>
                                <div class="progress__life-bar">
                                    <div class="life-bar__modular green"></div>
                                </div>
                            </div>
                        </div>
                        <div class="container-heros " id="hero-container-1">
                            <div class="hero-card-container card ">
                                <div class="hero__anim">
                                    <img id="aargh-hero1" class="anim__aargh-1 display-none" src="../img/AARGH!.png" alt="">
                                    <img id="bam-hero1" class="anim__bam-1 display-none" src="../img/BAM!.png" alt="">
                                    <img id="oops-hero1" class="anim__oops-1 display-none" src="../img/OOPS!.png" alt="">
                                </div>
                                <div class="hero-card hero-card-shadow card__face card__face--front hero_information ">
                                    <div class="face-card ">
                                        <h3 class="name-hero">Choose Hero</h3>
                                        <div class="filter-death"></div>
                                        <img class="list_img " src="../img/Choix perso mobile.png">
                                    </div>
                                    <div class="hero-card hero-card-shadow-2 card__face card__face--back hero_information">
                                        <div class="filter-death"></div>
                                        <div class="character-card__top">
                                            <div class="list-character-card__top-title">
                                                <img class="list-character-card__img" src="../img/Choix perso.png">
                                                <h2 class="list-character-card__title">Choose Hero</h2>
                                            </div>
                                            <ul class="character-card__features">
                                                <li class="list-character-card__progress abilities">
                                                    <p class="character-card__features__text">Attack:</p>
                                                    <div class="progress-list">
                                                        <div class="progress__val progress__val-atq">0</div>
                                                    </div>
                                                </li>
                                                <li class="list-character-card__progress abilities">
                                                    <p class="character-card__features__text">Shield:</p>
                                                    <div class="progress-list">
                                                        <div class="progress__val progress__val-shield">0</div>
                                                    </div>
                                                </li>
                                                <li class="list-character-card__progress abilities">
                                                    <p class="character-card__features__text">Speed:</p>
                                                    <div class="progress-list">
                                                        <div class="progress__val progress__val-speed">0</div>
                                                    </div>
                                                </li>
                                                <li class="list-character-card__progress abilities">
                                                    <p class="character-card__features__text">Health:</p>
                                                    <div class="progress-list">
                                                        <div class="progress__val progress__val-life">0</div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="character-card__bio">
                                                <p class="bio__title">Biography:</p>
                                                <p class="bio__text"><span class="bio__text-title">Real-Name:</span><span class="bio__text-text bio__text-name">Undefined</span></p>
                                                <p class="bio__text"><span class="bio__text-title">Alignement:</span><span class="bio__text-text bio__text-alignment">Undefined</span></p>
                                                <p class="bio__text"><span class="bio__text-title">Universe:</span><span class="bio__text-text bio__text-universe">Undefined</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hero__delete">
                            <button class="noselect"><span class="text">Delete Hero</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                        </div>
                    </div>
                    <!-- Img VS & Img Fight & Fight Text & Button -->
                    <div class="versus__container">
                        <img id="versus" class="versus__img" src="../img/download.png" alt="versus">
                        <img id="versus" class="fight__img" src="../img/fight-logo.png" alt="fight">
                        <button class="button_batman inactive" id="button-combat">
                           <span>COMBAT</span> 
                        </button>
                    </div>
                    <!-- Selection Hero2 -->
                    <div id="hero2" class="selection__hero">
                        <div class="hero__life-container display-none">
                            <img class="health-img-2" src="../img/coeur.png">
                            <div class="life__progress-container">
                                <p class="progress__life-point"></p>
                                <div class="progress__life-bar">
                                    <div class="life-bar__modular green"></div>
                                </div>
                            </div>
                        </div>
                        <div class="container-heros" id="hero-container-2">
                            <div class="hero-card-container card">
                                <div class="hero__anim">
                                    <img id="aargh-hero2" class="anim__aargh-2 display-none" src="../img/AARGH!.png" alt="">
                                    <img id="bam-hero2" class="anim__bam-2 display-none" src="../img/BAM!.png" alt="">
                                    <img id="oops-hero2" class="anim__oops-2 display-none" src="../img/OOPS!.png" alt="">
                                </div>
                                <div class="hero-card hero-card-shadow card__face card__face--front hero_information">
                                    <div class="face-card">
                                        <h3 class="name-hero">Choose Hero</h3>
                                        <div class="filter-death"></div>
                                        <img class="list_img" src="../img/Choix perso mobile.png">
                                    </div>
                                    <div class="hero-card hero-card-shadow-2 card__face card__face--back hero_information">
                                    <div class="filter-death "></div>
                                    <div class="character-card__top">
                                            <div class="list-character-card__top-title">
                                                <img class="list-character-card__img" src="../img/Choix perso.png">
                                                <h2 class="list-character-card__title">Choose Hero</h2>
                                            </div>
                                            <ul class="character-card__features">
                                                <li class="list-character-card__progress abilities">
                                                    <p class="character-card__features__text">Attack:</p>
                                                    <div class="progress-list">
                                                        <div class="progress__val progress__val-atq">0</div>
                                                    </div>
                                                </li>
                                                <li class="list-character-card__progress abilities">
                                                    <p class="character-card__features__text">Shield:</p>
                                                    <div class="progress-list">
                                                        <div class="progress__val progress__val-shield">0</div>
                                                    </div>
                                                </li>
                                                <li class="list-character-card__progress abilities">
                                                    <p class="character-card__features__text">Speed:</p>
                                                    <div class="progress-list">
                                                        <div class="progress__val progress__val-speed">0</div>
                                                    </div>
                                                </li>
                                                <li class="list-character-card__progress abilities">
                                                    <p class="character-card__features__text">Health:</p>
                                                    <div class="progress-list">
                                                        <div class="progress__val progress__val-life">0</div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="character-card__bio">
                                                <p class="bio__title">Biography:</p>
                                                <p class="bio__text"><span class="bio__text-title">Real-Name:</span><span class="bio__text-text bio__text-name">Undefined</span></p>
                                                <p class="bio__text"><span class="bio__text-title">Alignement:</span><span class="bio__text-text bio__text-alignment">Undefined</span></p>
                                                <p class="bio__text"><span class="bio__text-title">Universe:</span><span class="bio__text-text bio__text-universe">Undefined</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="hero__delete">
                            <button class="noselect"><span class="text">Delete Hero</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                        </div>
                    </div>
                </div>
                <!-- Resume fight -->
                <div class="resume">
                    <button id="resume__button" class="resume__button display-none"><strong> Resumé du
                            combat</strong></button>
                    <p id="selection-combat-text" class="resume__text display-none">
                    </p>
                </div>
            </div>
        </section>
        <span class="margin-bottom" id="margin-bottom"></span>
    </main>
    <?= include "../php/_footer.php"; ?>
</body>
<script src="../script.js"></script>

</html>