<?php
require "_connection-bdd.php";
/**
 * A function to apply a class to the task. 
 *
 * @param [type] $bool --the status of the task in the database
 * @return string --the class of the task
 */
function isValid($bool)
{
    return ($bool == 0) ? '_in-progress' : '_valid';
}
/**
 * Undocumented function
 *
 * @param [type] $array --the list of the tasks in the database
 * @return string -- the list of the tasks in an html list
 */
function getList($array)
{
    $li = "";
    foreach ($array as $hero) {
        $li .= '<li class="container-heros">' . displayCards($hero) . '</li>';
    }
    return $li;
}


function displayLists()
{
    global $dbCo;
    $query = $dbCo->prepare('SELECT * FROM heroes ORDER BY hero_name;');
    $query->execute();
    $result = $query->fetchAll();
    echo getList($result);
}

/**
 * Display Character Card
 * Return HTML use to display the characteristic of the hero                           
 * @param {string} hero is a JSON of selected hero                                      
 * @return {string} return characteristic card                                          
 */
function displayCards($hero)
{
    return '
    <div class="hero-card-container card">
        <div class="hero-card hero-card-shadow card__face card__face--front hero_information">
            <div>
                <h3 class="name-hero">' . $hero['hero_name'] . '</h3>
                <img class="list_img" src="' . $hero['hero_md'] . '">
            </div>
            <div class="hero-card hero-card-shadow-2 card__face card__face--back hero_information">
                <div class="character-card__top">
                    <div class="list-character-card__top-title">
                        <img class="list-character-card__img" src="' . $hero['hero_sm'] . '">
                        <h2 class="list-character-card__title">' . $hero['hero_name'] . '</h2>
                    </div>
                    <ul class="character-card__features">
                        <li class="list-character-card__progress abilities">  
                            <p class="character-card__features__text">Attack:</p>
                            <div class="progress-list">
                                <div class="progress__val progress__val-atq">' . $hero['hero_strength'] . '</div>
                            </div>
                        </li>
                        <li class="list-character-card__progress abilities">  
                            <p class="character-card__features__text">Shield:</p>
                            <div class="progress-list">
                                <div class="progress__val progress__val-shield">' . $hero['hero_combat'] . '</div>
                            </div>
                        </li>
                        <li class="list-character-card__progress abilities">  
                            <p class="character-card__features__text">Speed:</p>
                            <div class="progress-list">
                                <div class="progress__val progress__val-speed">' . $hero['hero_speed'] . '</div>
                            </div>
                        </li>
                        <li class="list-character-card__progress abilities">  
                            <p class="character-card__features__text">Health:</p>
                            <div class="progress-list">
                                <div class="progress__val progress__val-life">' . $hero['hero_durability'] . '</div>
                            </div>
                        </li> 
                    </ul>
                </div>
            </div>
        </div>
    </div>';
};
