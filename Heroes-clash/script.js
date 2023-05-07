
let heroes;
let hero1;
let hero2;

async function waitingForResponse() {
    const response = await fetch("https://akabab.github.io/superhero-api/api/all.json");
    heroes = await response.json();
    displayNames(heroes);

}

waitingForResponse();

const list = document.querySelector("#search-list");
const button = document.getElementById("name");

const hero1HTML = document.getElementById("hero1");
const hero2HTML = document.getElementById("hero2");

/**
 * Afficher la character-card du héro 1 si on clique sur le bouton Stats du héro 1
 */
hero1HTML.querySelector('.btn-stat').addEventListener('click', function (e) {
    hero1HTML.querySelector('.character-card').classList.toggle('display-none');
});

/**
 * Afficher la character-card du héro 2 si on clique sur le bouton Stats du héro 2
 */
hero2HTML.querySelector('.btn-stat').addEventListener('click', function (e) {
    hero2HTML.querySelector('.character-card').classList.toggle('display-none');
});

/**
 * Enlever le héro 1 si on clique sur son nom
 */
hero1HTML.querySelector('.selection__heroe-name').addEventListener('click', function (e) {
    removeHero(hero1HTML);
});
/**
 * Enlever le héro 2 si on clique sur son nom
 */
hero2HTML.querySelector('.selection__heroe-name').addEventListener('click', function (e) {
    removeHero(hero2HTML);
});

function displayNames(array) {
    /**
     * Si une touche est appuyée dans la barre de recherche alors propose 4 héros correspondant au texte recherché
     */
    button.addEventListener('keyup', function (event) {
        const input = button.value;
        list.innerHTML = '';
        if (input === '') {
            return;
        }
        const result = array.filter(item => item.name.toLocaleLowerCase().startsWith(input.toLocaleLowerCase()))
        let count = 0;
        /**
         * affiche les 4 premiers héros retournés par le tableau après un filtre.
        */
        result.forEach(element => {
            if (count >= 4) {
                return;
            }
            /**
             * Ajoute le nom du héro dans la liste de recherche
            */
            let liHeroes = document.createElement("li");
            let buttonLiHereos = document.createElement("button");
            buttonLiHereos.classList.add("button__lnk")
            list.appendChild(liHeroes);
            liHeroes.appendChild(buttonLiHereos);
            buttonLiHereos.setAttribute("id", `${element.id}`);
            buttonLiHereos.innerText = element.name;

            /**
             * Si on clique sur le nom d'un héro dans la liste de recherche alors on l'ajoute comme nouveau combatant
             */
            const buttonHereos = document.getElementById(`${element.id}`);
            buttonHereos.addEventListener('click', function (e) {

                const hero1Name = hero1HTML.querySelector(".selection__heroe-name");
                const hero2Name = hero2HTML.querySelector(".selection__heroe-name");
                /**
                 * Si le premier héro n'est pas choisit alors le héro selectionné devient le héro 1
                 */
                if (hero1Name.textContent === "") {
                    hero1 = element;
                    addHero(element, hero1HTML);
                }
                /**
                 * Si le premier héro est déjà choisit et que le deuxieme héro n'est pas choisit alors le héro selectionné devient le héro 2
                 */
                else if (hero2Name.textContent === "") {
                    hero2 = element;
                    addHero(element, hero2HTML);
                }
                /**
                 * Si les 2 héroes sont sélectionnés alors on ne fait rien.
                */
                else {
                    console.log('Both hero zones are full');
                }
            });
            count++;
        });
    });
}

/**
 * Cette fonction est utilisée pour créer un héro.
 * Elle peut être utilisée pour le premier héro ou le second héro car leur HTMl est similaire
 * @param hero est le JSON du héro selectionné
 * @param heroHtml est la balise HTML parente où on va ajouter le héro
 */
function addHero(hero, heroHtml) {
    // on ajoute et on affiche le nom du héro
    heroHtml.querySelector(".selection__heroe-name").textContent = hero.name;
    heroHtml.querySelector(".selection__heroe-name").classList.remove('display-none');
    heroHtml.querySelector(".selection__heroe-name").classList.add("name-combat");

    //on affiche les points de vie du héro
    heroHtml.querySelector('.selection__heroe-life').textContent = `${hero.powerstats.durability}`;

    // on affiche l'image du héro
    heroHtml.querySelector('.selection__img').src = hero.images.md;

    //on affiche le bouton Stats du héro
    heroHtml.querySelector('.btn-stat').classList.remove('display-none');

    // on remplis la character-card du héro avec ses informations
    heroHtml.querySelector('.character-card').innerHTML = displayCards(hero);

    verifyTheHeroes(hero1, hero2);

}

/**
 * cette fonction permet d'enlever un héro.
 * Il suffit de faire l'inverse de la fonction addHero
 * @param heroHtml est la balise HTML parente où on va ajouter le héro
 */
// TODO: on ne doit pas pouvoir enlever un héro si on est en plein combat
function removeHero(heroHtml) {
    // on enleve et on cache le nom du héro
    heroHtml.querySelector(".selection__heroe-name").textContent = '';
    heroHtml.querySelector(".selection__heroe-name").classList.remove('name-combat');
    heroHtml.querySelector(".selection__heroe-name").classList.add('display-none');

    // on enleve les points de vie du héro
    heroHtml.querySelector('.selection__heroe-life').textContent = '';

    // on enleve l'image du héro
    heroHtml.querySelector('.selection__img').src = "img/Choix perso mobile.png";

    // on cache le bouton Stats
    heroHtml.querySelector('.btn-stat').classList.add('display-none');

    // on enlève la character-card du héro avec ses informations
    heroHtml.querySelector('.character-card').innerHTML = '';

    if (heroHtml.id === 'hero1') {
        hero1 = undefined;
    } else {
        hero2 = undefined;
    }
    verifyTheHeroes(hero1, hero2);
}
// modifie la couleur du boutton combat quand il ne peut pas être utilisé
function verifyTheHeroes(hero1, hero2) {
    if (hero1 == undefined || hero2 == undefined) {
        buttonCombat.classList.remove("button--active");
    } else {
        buttonCombat.classList.add("button--active");
    }
}


//----------------PAGE COMBAT-------------------------------------
const buttonCombat = document.querySelector("#button-combat");
const combatArea = document.querySelector("#selection-background");
const combatText = document.querySelector("#selection-combat-text");
const selectionTitle = document.querySelector("#selection-ttl");
const fightTitle = document.querySelector("#fight-ttl");
const search = document.querySelector("#search");
const margin = document.querySelector("#margin-bottom");
const imgVS = document.querySelector('.selection__img-versus')
const selectionDivHeroes = document.querySelector('.selection__heroes')
console.log(imgVS);
function preparHeroToCombat(heroHTML){
    heroHTML.querySelector(".selection__heroe-name").classList.add("name-combat");
    heroHTML.querySelector(".selection__heroe-life").classList.add("life-combat");
    heroHTML.querySelector(".selection__heroe-life").classList.remove("display-none");
}

//---------------PAGE COMBAT BOUTON EVENT LISTENER----------------
let attacker;
let defender;
buttonCombat.addEventListener('click', function (event) {
    // Si le héro 1 ou le héro 2 n'ont pas été selectionnés alors le combat ne peut pas commencer
    if (hero1 == undefined || hero2 == undefined) {
        return;
    }
    preparHeroToCombat(hero1HTML)
    preparHeroToCombat(hero2HTML)
    combatArea.classList.add("combat-design")
    buttonCombat.classList.add("display-none")
    combatText.classList.remove("display-none")
    selectionTitle.classList.toggle("display-none")
    fightTitle.classList.toggle("display-none")
    search.classList.toggle("display-none")
    margin.classList.toggle("margin-bottom")
    imgVS.classList.toggle("display-none")
    selectionDivHeroes.classList.toggle("flex-wrap")
    console.log(hero1);
    console.log(hero2);


    hero2.powerstats.durability *= 10;
    hero1.powerstats.durability *= 10;
    battle(hero1, hero2);
});

function battle(hero1, hero2) {
    const timer = setInterval(
        function () {
            getMostSpeedHero(hero1, hero2)
            executeFight(attacker, defender);
            hero1HTML.querySelector('.selection__heroe-life').textContent = `${hero1.powerstats.durability}`;
            hero2HTML.querySelector('.selection__heroe-life').textContent = `${hero2.powerstats.durability}`;
            if (attacker.powerstats.durability <= 0) {
                winner = defender.name;
                clearInterval(timer);
                document.querySelector('.selection_combat_text').innerHTML += `<br><br><strong>${winner} gagne le combat !</strong>`
            } else if (defender.powerstats.durability <= 0) {
                winner = attacker.name;
                clearInterval(timer);
                document.querySelector('.selection_combat_text').innerHTML += `<br><br><strong>${winner} gagne le combat !</strong>`
            };
            document.getElementById('selection-combat-text').scrollTop = document.getElementById('selection-combat-text').scrollHeight;
        }, 2000)
}

function dice() {
    return parseInt(Math.random() * 100);
}
//What's the speed score
function SpeedScore(hero) {
    return hero.powerstats.speed + dice();
}

//What's the attack score
function attackScore(hero) {
    return hero.powerstats.strength + dice();
}
// //What's the defense score
function defenseScore(hero) {
    return hero.powerstats.combat + dice();
}
function attackDefenseScore(hero) {
    return hero.powerstats.strength + dice();
}


// quel héros est le plus rapide
function getMostSpeedHero(hero1, hero2) {

    if (SpeedScore(hero1) > SpeedScore(hero2)) {
        attacker = hero1;
        defender = hero2;
        document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} attaque en premier `;


        return hero1.name;
    } else {
        attacker = hero2;
        defender = hero1;

        document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} attaque en premier `;

        return hero2.name;
    }
}
//Fight outcome

function executeFight(attacker, defender) {
    let shieldDefense = defenseScore(defender);
    let damagesAttack = attackScore(attacker);
    let defenseCounterAttack = attackDefenseScore(defender);

    if (damagesAttack > shieldDefense) {
        defender.powerstats.durability -= damagesAttack;
        document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} a attaqué ${defender.name} et lui a infligé ${damagesAttack}`;
        document.querySelector('.selection_combat_text').innerHTML += `<br> Il reste ${defender.powerstats.durability}hp a ${defender.name}.<br>`;

        if (defender.powerstats.durability <= 0) {
            document.querySelector('.selection_combat_text').innerHTML += `<br> ${defender.name} est une mi mouche morte`;
        } else {
            attacker.powerstats.durability -= defenseCounterAttack;

            document.querySelector('.selection_combat_text').innerHTML += `<br> ${defender.name} a contre-attaqué et a infligé ${defenseCounterAttack} points de dégâts à ${attacker.name}.`;
            document.querySelector('.selection_combat_text').innerHTML += `<br> Il reste ${attacker.powerstats.durability}hp à ${attacker.name}.<br>`;
            if (attacker.powerstats.durability <= 0) {
                document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} est K.O.!`;
                attacker.powerstats.durability = 0
            }
        }
    } else if (damagesAttack < shieldDefense) {
        attacker.powerstats.durability -= defenseCounterAttack;

        document.querySelector('.selection_combat_text').innerHTML += `<br> ${defender.name} a riposté et a infligé ${defenseCounterAttack} points de dégâts à ${attacker.name}.`;
        document.querySelector('.selection_combat_text').innerHTML += `<br> Il reste ${attacker.powerstats.durability}hp à ${attacker.name}.<br>`;
        if (attacker.powerstats.durability <= 0) {
            document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} est une mi mouche morte`;
            attacker.powerstats.durability = 0
        }
    } else {
        document.querySelector('.selection_combat_text').innerHTML += `<br> Il y a égalité!`;
    }
}



//-----------------AFFICHAGE BOUTON STAT------------------------

/**
 * Retourne l'HTML servant à afficher les characteristiques d'un héro.
 * @param hero est le JSON du héro selectionné
 */
function displayCards(hero) {
    return `
        <li class="character__card__list">
        <div class="character__card__top">
        <img class="character__card__img" src="${hero.images.sm}">
        <div class="character__features">
        <span class="abilities">
        <p class="character__features__text">Attack:</p>
        <p class="character__points">${hero.powerstats.strength}</p>
        </span>           
        <span class="abilities">
        <p class="character__features__text">Shield: </p>
        <p class="character__points">${hero.powerstats.combat}</p>
        </span>     
        <span class="abilities">
        <p class="character__features__text">Speed:</p>
        <p class="character__points">${hero.powerstats.speed}</p>
        </span>           
        <span class="abilities">
        <p class="character__features__text">Life:</p>
        <p class="character__points">${hero.powerstats.durability}</p>
        </span>     
        </div>
        </div>
        <div class="bio">
        <p class="title__bio">Biography:</p>
        <p class="text__bio"><span class="text__title__bio">Name:</span> ${hero.name}</p>
        <p class="text__bio"><span class="text__title__bio">Real-Name:</span> ${hero.biography.fullName}</p>
        <p class="text__bio"><span class="text__title__bio">Place of Birth:</span> ${hero.biography.placeOfBirth}</p>
        <p class="text__bio"><span class="text__title__bio">Alignement:</span> ${hero.biography.alignment}</p>
        <p class="text__bio"><span class="text__title__bio">Universe:</span> ${hero.biography.publisher}</p>
        </div>
        </li>`;
};


