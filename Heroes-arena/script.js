/*
les tutos de guillaume :

numéroter les slides; 
user story : qu'est ce qu'une user story, pourquoi ? 
techniques : citer les languages, 
presentation : plus rentrer dans le coté techniques, plutot que fonctionnel, parler de la connection à la bdd, 
avancer le BEM (le corriger);
voir pout l'orienté objet en js;

probleme ligne 312 GET http://localhost/heroes-arena/heroes-arena/undefined
 */

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if (window.location.href === "http://localhost/heroes-arena/heroes-arena/pages/index.php") {

    var hero1HTML = document.getElementById("hero1");
    var hero2HTML = document.getElementById("hero2");
    var hero1Name = hero1HTML.querySelector(".name-hero");
    var hero2Name = hero2HTML.querySelector(".name-hero");
    document.getElementById("btn-random").classList.remove("display-none")
    var resumeText = document.querySelector('.resume__text')
    var hero1Container = document.querySelector('.hero__container-1')
    var hero2Container = document.querySelector('.hero__container-2')
    var speed750 = 750;
    var speed1000 = 1000;
    var speed2000 = 2000;
    var buttonCombat = document.querySelector("#button-combat");
    var combatArea = document.querySelector(".combat-design");
    var combatText = document.querySelector("#selection-combat-text");
    var selectionTitle = document.querySelector("#selection-ttl");
    var fightTitle = document.querySelector("#fight-ttl");
    var imgVS = document.querySelector('.versus__img')

}
let heroes;
let hero1;
let hero2;
let attacker;
let defender;
const search = document.querySelector("#search");
const margin = document.querySelector("#margin-bottom");
const selectionHeroes = document.querySelector('.selection__heroes')

let searchBar = document.querySelector('.search__bar');
let searchList = document.querySelector('.search__list');

/*
                         +------------------------------------------+
                         |              Connection API              |
                         +------------------------------------------+ 
 */
function ListenSearchBar() {

    searchBar.addEventListener('keyup', e => {
        if (searchBar.value.length > 0) {
            showName(searchBar.value)
                .then(Response => {
                    if (!Response.result) {
                        console.error('Problème avec la requête.');
                        return;
                    }
                    displayNames(Response.hero_name);
                });
        }
        else {
            searchList.classList.add("display-none")
        }
    });
}
ListenSearchBar()

function adaptWidthSearchBar() {
    const searchBar = document.getElementById("name");
    const searchList = document.querySelector(".search__list ");
    searchList.style.width = "60%";
}

function hideSearchList() {
    const searchList = document.getElementById("search-list");
    searchList.style.maxHeight = '0';
    searchList.style.width = '10%';
}
function displaySearchList() {
    const searchList = document.getElementById("search-list");
    searchList.style.maxHeight = '4rem';
    searchList.style.width = '60%';
}

function watchSearchBar() {
    const searchBar = document.getElementById("name");
    const searchList = document.getElementById("search-list");

    // Gérer le clic sur la barre de recherche
    searchBar.addEventListener('click', (e) => {
        adaptWidthSearchBar();
        e.stopPropagation();
    });

    // Gérer le clic en dehors de la barre de recherche
    document.addEventListener('click', (e) => {
        const isClickedInsideSearchBar = searchBar.contains(e.target);
        if (!isClickedInsideSearchBar) {
            hideSearchList();
        }
    });
    searchBar.addEventListener('click', (e) => {
        displaySearchList()
    });
}

watchSearchBar();



function showName(word) {
    const data = {
        action: 'showName',
        hero_name: word,
        // token: getCsrfToken()
    };
    return callAPI('POST', data);
}
function selectHero(id) {
    const data = {
        action: 'selectHero',
        id_hero: id,
        // token: getCsrfToken()
    };
    return callAPI('POST', data);
}
function giveAllId() {
    const data = {
        action: 'giveAllId',
        // token: getCsrfToken()
    };
    return callAPI('POST', data);
}

async function callAPI(method, data) {
    try {
        const response = await fetch("../php/api.php", {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    catch (error) {
        console.error("Unable to load datas from the server : " + error);
    }
}


/*
                         +------------------------------------------+
                         |             Functions Cards              |
                         +------------------------------------------+ 
 */

function rotateCard(event) {
    const card = event.currentTarget.querySelector('.hero-card');
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    let rotationX = isFlipped(event.currentTarget, cardCenterX, mouseX);
    const rotationY = (mouseY - cardCenterY) * 0.3;

    card.classList.remove("transition-1s")
    card.classList.add("transition-0s")
    card.style.transform = `perspective(1000px) rotateX(${rotationY}deg) rotateY(${rotationX}deg)`;

    let shadow = event.currentTarget.querySelector('.hero-card-shadow');
    let shadow2 = event.currentTarget.querySelector('.hero-card-shadow-2');
    shadow.classList.remove("transition-1s");
    shadow2.classList.remove("transition-1s");
    shadow.classList.add("transition-0s");
    shadow2.classList.add("transition-0s");

    let shadowThicknessX = rotationX * -1;
    let shadowThicknessY = rotationY * 1;

    if (window.location.href === "http://localhost/heroes-arena/heroes-arena/pages/index.php") {
        event.currentTarget.classList.add('z-index');

        if (event.currentTarget.classList.contains('is-flipped')) {
            shadow2.style.boxShadow = `${(mouseX - cardCenterX) * .35 - 1}px ${shadowThicknessY}px 10px 1px rgba(0, 0, 0, .6)`;
        } else {
            shadow.style.boxShadow = `${shadowThicknessX}px ${shadowThicknessY}px 10px 1px rgba(0, 0, 0, .6)`;
        }
    } else {
        if (document.querySelector('.heroes-list').childElementCount === 557) {
            event.currentTarget.classList.add('z-index');
        } else {
            event.currentTarget.firstElementChild.classList.add('z-index');
        }
        if (event.currentTarget.firstElementChild.classList.contains('is-flipped')) {
            shadow2.style.boxShadow = `${(mouseX - cardCenterX) * .35 - 1}px ${shadowThicknessY}px 10px 1px rgba(0, 0, 0, .6)`;
        } else {
            shadow.style.boxShadow = `${shadowThicknessX}px ${shadowThicknessY}px 10px 1px rgba(0, 0, 0, .6)`;
        }
    }
}

function isFlipped(target, cardCenterX, mouseX) {
    if (window.location.href === "http://localhost/heroes-arena/heroes-arena/pages/index.php") {
        if (target.classList.contains('is-flipped')) {
            return (mouseX - cardCenterX) * 0.3;
        } else {
            return (mouseX - cardCenterX) * -0.3;
        }
    } else {
        if (target.firstElementChild.classList.contains('is-flipped')) {
            return (mouseX - cardCenterX) * 0.3;
        } else {
            return (mouseX - cardCenterX) * -0.3;
        }
    }
}

function resetCardRotation(event) {
    let card = event.currentTarget.querySelector('.hero-card');
    let shadow = event.currentTarget.querySelector('.hero-card-shadow');
    let shadow2 = event.currentTarget.querySelector('.hero-card-shadow-2');

    card.classList.remove('transition-0s');
    card.classList.add('transition-1s');
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    shadow2.classList.remove('transition-0s');
    shadow.classList.remove('transition-0s');
    shadow2.classList.add('transition-1s');
    shadow.classList.add('transition-1s');
    shadow2.style.boxShadow = '0px 0px 10px 1px rgba(0, 0, 0, .6)';
    shadow.style.boxShadow = '0px 0px 10px 1px rgba(0, 0, 0, .6)';

    setTimeout(() => {
        card.parentElement.classList.remove('z-index');
    }, 1000);
}
function listenMyMouse() {
    let cardContainers = document.querySelectorAll('.hero-card-container');

    cardContainers.forEach((cardContainer) => {
        cardContainer.addEventListener('mousemove', rotateCard);
        cardContainer.addEventListener('mouseleave', resetCardRotation);
        cardContainer.addEventListener('click', function (event) {
            cardContainer.classList.toggle('is-flipped');
            resetCardRotation(event);
            getStats(this);
        });
    });
}
listenMyMouse()

function getStats(card) {
    let stats = card.querySelectorAll('.progress__val');
    stats.forEach(stat => {
        stat.style.width = `${stat.textContent}%`;
    });
}

function fillTheDescription(hero, heroHTML) {
    heroHTML.querySelector('.list-character-card__title').textContent = hero.hero_name;
    heroHTML.querySelector('.progress__val-atq').textContent = hero.hero_strength;
    heroHTML.querySelector('.progress__val-shield').textContent = hero.hero_combat;
    heroHTML.querySelector('.progress__val-speed').textContent = hero.hero_speed;
    heroHTML.querySelector('.progress__val-life').textContent = hero.hero_durability;
    heroHTML.querySelector('.bio__text-name').textContent = hero.hero_full_name;
    heroHTML.querySelector('.bio__text-alignment').textContent = hero.hero_alignment;
    heroHTML.querySelector('.bio__text-universe').textContent = hero.hero_publisher;
    heroHTML.querySelector('.list-character-card__img').src = hero.hero_md;
}

const list = document.querySelector("#search-list");
const button = document.getElementById("name");

/*
* Display Name
     * This function is used to interact with search bar                
     * @param Array is list of heroes in JSON                           
*/
function displayNames(array) {
    let searchList = document.querySelector('.search__list');
    searchList.classList.remove("display-none")
    // If a key is pressed in the search bar then it offers 4 heroes corresponding to the searched text
    let count = 0;
    document.querySelectorAll(".button__lnk").forEach(element => {
        element.remove()
    });
    // Displays the first 4 heroes returned by the table after a filter
    array.forEach(element => {
        if (count >= 10) {
            return;
        }
        let buttonLiHeroes = document.createElement("button");
        buttonLiHeroes.innerText = "";


        // Add the hero's name to the search list
        let liHeroes = document.createElement("li");
        buttonLiHeroes.classList.add("button__lnk")
        list.appendChild(liHeroes);
        liHeroes.appendChild(buttonLiHeroes);
        buttonLiHeroes.setAttribute("id", `${element.id_hero}`);
        buttonLiHeroes.innerText = element.hero_name;


        // If we click on the name of a hero in the search list then we add him as a new fighter
        const buttonHeroes = document.getElementById(`${element.id_hero}`);
        buttonLiHeroes.addEventListener('click', e => {
            selectHero(element.id_hero)
                .then(Response => {
                    if (!Response.result) {
                        console.error('Problème avec la requête.');
                        return;
                    }
                    if (window.location.href === "http://localhost/heroes-arena/heroes-arena/pages/index.php") {
                        // if ($current_page = basename($_SERVER['PHP_SELF']))
                        // If the first hero is not chosen then the selected hero becomes hero 1
                        if (hero1Name.textContent === "Choose Hero") {
                            hero1 = Response.hero_name[0];
                            addHero(hero1, hero1HTML);
                            searchList.classList.add("display-none")
                            searchBar.value = ("")

                        }
                        // If the first hero is already chosen and the second hero is not chosen then the selected hero becomes hero 2
                        else if (hero2Name.textContent === "Choose Hero") {
                            hero2 = Response.hero_name[0];
                            addHero(hero2, hero2HTML);
                            searchList.classList.add("display-none")

                        }
                        // If the 2 heroes are selected then nothing is done
                        else {
                            console.log('Both hero zones are full');
                        }
                        // console.log(Response.hero_name);
                    }
                    else if (window.location.href === "http://localhost/heroes-arena/heroes-arena/pages/list.php") {
                        let hero = Response.hero_name[0];
                        const newLiElement = document.createElement("li");
                        newLiElement.classList.add("container-heros")
                        newLiElement.innerHTML = `
                        <div class="hero-card-container card">
                        <div class="hero-card hero-card-shadow card__face card__face--front hero_information">
                        <div class="face-card">
                        <h3 class="name-hero">${hero.hero_name}</h3>
                        <img class="list_img" src="${hero.hero_md}">
                            </div>
                            <div class="hero-card hero-card-shadow-2 card__face card__face--back hero_information">
                            <div class="character-card__top">
                            <div class="list-character-card__top-title">
                                        <img class="list-character-card__img" src="${hero.hero_sm}">
                                        <h2 class="list-character-card__title">${hero.hero_name}</h2>
                                    </div>
                                    <ul class="character-card__features">
                                        <li class="list-character-card__progress abilities">
                                        <p class="character-card__features__text">Attack:</p>
                                            <div class="progress-list">
                                                <div class="progress__val progress__val-atq">${hero.hero_strength}</div>
                                            </div>
                                            </li>
                                        <li class="list-character-card__progress abilities">
                                        <p class="character-card__features__text">Shield:</p>
                                        <div class="progress-list">
                                        <div class="progress__val progress__val-shield">${hero.hero_combat}</div>
                                        </div>
                                        </li>
                                        <li class="list-character-card__progress abilities">
                                        <p class="character-card__features__text">Speed:</p>
                                            <div class="progress-list">
                                                <div class="progress__val progress__val-speed">${hero.hero_speed}</div>
                                                </div>
                                                </li>
                                                <li class="list-character-card__progress abilities">
                                            <p class="character-card__features__text">Health:</p>
                                            <div class="progress-list">
                                                <div class="progress__val progress__val-life">${hero.hero_durability}</div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="character-card__bio">
                                        <p class="bio__title">Biography:</p>
                                        <p class="bio__text"><span class="bio__text-title">Real-Name:</span><span class="bio__text-text"> ${hero.hero_full_name}</span></p>
                                        <p class="bio__text"><span class="bio__text-title">Alignement:</span><span class="bio__text-text"> ${hero.hero_alignment}</span></p>
                                        <p class="bio__text"><span class="bio__text-title">Universe:</span><span class="bio__text-text"> ${hero.hero_publisher}</span></p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>`;
                        document.querySelector(".heroes-list").appendChild(newLiElement);
                        newLiElement.addEventListener('mousemove', rotateCard);
                        newLiElement.addEventListener('mouseleave', resetCardRotation);
                        newLiElement.addEventListener('click', function (event) {
                            this.firstElementChild.classList.toggle('is-flipped');
                            resetCardRotation(event);
                            getStats(this);
                        });
                    }
                });
            searchList.classList.add("display-none")
        });

        count++;
    })
}

// function getCsrfToken() {
//     return document.querySelector('#token-csrf').value;
// }
/*
                     +------------------------------------------+
                     |                Variables                 |
                     +------------------------------------------+ 
                     */



// const controller = new AbortController();
// const signal = controller.signal;
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
+------------------------------------------+
                     |                Functions                 |
                     +------------------------------------------+ 
                     */



/**
 * Change color of button "combat" if it can not be used
 * @param {string} hero1 is the parent HTML tag where we will add the hero                            
 * @param {string} hero2 is the parent HTML tag where we will add the hero                            
 * @return {string} if 2 heroes are selected, the button "combat" is active, else it is not
*/
function verifyTheHeroes(hero1, hero2) {
    if (hero1 == undefined || hero2 == undefined) {
        buttonCombat.classList.remove("active");
        buttonCombat.classList.add("inactive");
        search.classList.add("display-flex");
        search.classList.remove("display-none");
    }
    else if (hero1 == hero2) {
        buttonCombat.classList.remove("active");
        buttonCombat.classList.add("inactive");
    }
    else {
        buttonCombat.classList.add("active");
        buttonCombat.classList.remove("inactive");
        search.classList.remove("display-flex");
        search.classList.add("display-none");
    }
}



/**
 * Add Hero
 * This function is used to create a hero.                                              
 * It can be used for the first hero or the second hero because their HTML is similar   
 * @param hero is the JSON of the selected hero                                         
 * @param heroHtml is the parent HTML tag where we will add the hero                    
 */

function addHero(hero, heroHtml) {
    // Add and display the name of the hero
    heroHtml.querySelector(".name-hero").textContent = hero.hero_name;
    heroHtml.querySelector(".hero__delete").classList.remove('display-none');
    heroHtml.querySelector(".hero__delete").classList.add('display-flex');

    // Display the picture of the hero
    heroHtml.querySelector('.list_img').src = hero.hero_lg;
    fillTheDescription(hero, heroHtml)
    verifyTheHeroes(hero1, hero2);
}


/**
 * Remove Hero
 * This function is used to delete a hero                          
 * Is the reverse of "addHero"                                        
 * @param heroHtml is HTML relative tag where we will add the hero 
*/
function removeHero(heroHtml) {

    // Remove and hide the hero name
    heroHtml.querySelector(".name-hero").textContent = 'Choose Hero';
    heroHtml.querySelector(".hero__delete").classList.remove('display-flex')
    heroHtml.querySelector(".hero__delete").classList.add('display-none')

    // Remove health point
    heroHtml.querySelector('.life-bar__modular').textContent = '';

    // Remove hero picture
    heroHtml.querySelector('.list_img').classList.remove('display-none');
    heroHtml.querySelector('.list_img').src = "../img/Choix perso mobile.png";

    // Remove hero character-card with hero information
    heroHtml.querySelector('.list-character-card__title').textContent = `Choose Hero`;
    heroHtml.querySelector('.progress__val-atq').textContent = `0`;
    heroHtml.querySelector('.progress__val-shield').textContent = `0`;
    heroHtml.querySelector('.progress__val-speed').textContent = `0`;
    heroHtml.querySelector('.progress__val-life').textContent = `0`;
    heroHtml.querySelector('.bio__text-name').textContent = `Undefined`;
    heroHtml.querySelector('.bio__text-alignment').textContent = `Undefined`;
    heroHtml.querySelector('.bio__text-universe').textContent = `Undefined`;

    heroHtml.querySelector('.list-character-card__img').src = `../img/Choix perso.png`;


    if (heroHtml.id === 'hero1') {
        hero1 = undefined;
    } else {
        hero2 = undefined;
    }
    verifyTheHeroes(hero1, hero2);
}






// If we click on the random button next to the search list then we add him as a new random fighter
const buttonRandom = document.querySelector("#btn-random");
buttonRandom.addEventListener('click', function (e) {

    giveAllId()
        .then(Response => {
            if (!Response.result) {
                console.error('Problème avec la requête.');
                return;
            }

            heroes = Response.heroes_ids;

        });


    let iterations = 10; // Nombre d'itérations avant de s'arrêter sur un héros aléatoire

    if (hero1Name.textContent === "Choose Hero") {
        const interval = setInterval(function () {
            let id = dice(heroes.length);
            selectHero(id)
                .then(Response => {
                    if (!Response.result) {
                        console.error('Problème avec la requête.');
                        return;
                    }

                    hero1 = Response.hero_name[0];
                    addHero(hero1, hero1HTML);
                });

            iterations--;

            if (iterations <= 0) {
                clearInterval(interval); // Stop animation when number of iterations is reached

            }
        }, 150)// Time in milliseconds between each iteration (adjust as needed)
    }


    else if (hero2Name.textContent === "Choose Hero") {
        const interval = setInterval(function () {
            let id = dice(heroes.length);
            const hero2Name = hero2HTML.querySelector(".hero__name");
            selectHero(id)
                .then(Response => {
                    if (!Response.result) {
                        console.error('Problème avec la requête.');
                        return;
                    }
                    hero2 = Response.hero_name[0];
                    addHero(hero2, hero2HTML);
                });

            iterations--;

            if (iterations <= 0) {
                clearInterval(interval); // Stop animation when number of iterations is reached
            }
        }, 150)//Time in milliseconds between each iteration (adjust as needed)
    }
    // If both heroes are already chosen, display an error message
    else {
        console.log('Both hero zones are full');
    }
})





function dice(number) {
    return parseInt(Math.random() * number);
}

// Define the difference of speed of selected heroes
function getMostSpeedHero(hero1, hero2) {
    const speedHero1 = parseInt(hero1.hero_speed);
    const speedHero2 = parseInt(hero2.hero_speed);
    const speedDiff = speedHero1 - speedHero2;
    let attacksLuckH1;
    let attacksLuckH2;
    // If Hero1 have more speed, he win the difference and add a dice (1-100)
    if (speedDiff > 0) {
        attacksLuckH1 = dice(100) + speedDiff
        attacksLuckH2 = dice(100)
    }
    // If Hero2 have more speed, he win the difference and add a dice (1-100)
    else if (speedDiff < 0) {
        attacksLuckH1 = dice(100)
        attacksLuckH2 = dice(100) - speedDiff // speedDiff = negative score (ex: 100 - (-50) = 150)
    }
    // If heroes have same speed, they just launch a dice (1-100)
    else if (speedDiff == 0) {
        attacksLuckH1 = dice(100)
        attacksLuckH2 = dice(100)
    }
    // Return hero with hightest "speed" value
    if (attacksLuckH1 > attacksLuckH2) {
        attacker = hero1;
        defender = hero2;
        resumeText.innerHTML += `<br> ${attacker.hero_name} a obtenu un score de vitesse (${attacksLuckH1}) plus important que celui de ${defender.hero_name} (${attacksLuckH2})`;
        return hero1.hero_name;
    }
    else if (attacksLuckH1 < attacksLuckH2) {
        attacker = hero2;
        defender = hero1;
        resumeText.innerHTML += `<br> ${attacker.hero_name} a obtenu un score de vitesse (${attacksLuckH2}) plus important que celui de ${defender.hero_name} (${attacksLuckH1})`;
        return hero2.hero_name;
    }
    else {
        return getMostSpeedHero(hero1, hero2)
    }
}

// Define "defense" value
// Add a random value to hero "defense" value 
function defenseScore(hero) {
    return parseInt(hero.hero_combat);
}

// Define "strength" value
// Add a random value to defender "strength" value 
function attackDefenserScore(hero) {
    return parseInt(hero.hero_strength) + dice(100);
}

// Define "strength" value
// Add a random value to attacker "strength" value 
function attackScore(hero) {
    return parseInt(hero.hero_strength) + dice(100);
}


/**
 * Execute Fight
 * This function is used to give 1 turn of fight result.                                      
 * @param {string} attacker - Hero with more "speed" (result to function "getMostSpeedHero")
 * @param {string} defender - The other hero                                            
 * @return {string} Return result of fight                                              
*/
function executeFight(attacker, defender) {
    let shieldDefense = defenseScore(defender);
    let damagesAttack = attackScore(attacker);
    // if Attack of attacker is higher than defense of defender, defender take damage 
    if (damagesAttack > shieldDefense) {
        let damage = (damagesAttack - shieldDefense);
        if (defender.hero_durability <= 0) {
            resumeText.innerHTML += `<br> ${defender.hero_name} est K.O`;
            return
        }
        resumeText.innerHTML += `<br> ${attacker.hero_name} a attaqué ${defender.hero_name} et lui a infligé ${damagesAttack}`;
        resumeText.innerHTML += `<br> Il reste ${defender.hero_durability}hp a ${defender.hero_name}.<br>`;
        if (attacker === hero1) {
            // if hero1 is attacker, image of hero go to hero2 and display bubble 
            setTimeout(() => {
                document.querySelector('#hero-container-1').classList.add("hero__container-1")
                setTimeout(() => {
                    if (defender.hero_durability > 0) {
                        document.querySelector('#bam-hero2').classList.remove("display-none")
                    }
                    else if (defender.hero_durability <= 0) {
                        document.querySelector('#aargh-hero2').classList.remove("display-none")
                    }
                    setTimeout(() => {
                        document.querySelector('#aargh-hero2').classList.add("display-none")
                        document.querySelector('#bam-hero2').classList.add("display-none")
                    }, speed1000)
                }, speed750)

            }, speed1000)

            document.querySelector('#hero-container-1').classList.remove("hero__container-1")
        }
        else if (attacker === hero2) {
            // if hero2 is attacker, image of hero go to hero1 and display bubble 
            setTimeout(() => {
                document.querySelector('#hero-container-2').classList.add("hero__container-2")
                setTimeout(() => {
                    if (defender.hero_durability > 0) {
                        document.querySelector('#bam-hero1').classList.remove("display-none")
                    }
                    else if (defender.hero_durability <= 0) {
                        document.querySelector('#aargh-hero1').classList.remove("display-none")
                    }
                    setTimeout(() => {
                        document.querySelector('#aargh-hero1').classList.add("display-none")
                        document.querySelector('#bam-hero1').classList.add("display-none")
                    }, speed1000)
                }, speed750)

            }, speed1000,)

            document.querySelector('#hero-container-2').classList.remove("hero__container-2")
        }
        defender.hero_durability -= damage;
    }
    // if Attack of attacker is lower than defense of defender, defender don't take damage, and defender become attacker and attacker become defender, and launch other turn
    else if (damagesAttack < shieldDefense) {
        if (defender.hero_durability <= 0) {
            resumeText.innerHTML += `<br> ${defender.hero_name} est K.O`;
            return
        }
        resumeText.innerHTML += `<br> ${defender.hero_name} arrive à se défendre, ${attacker.hero_name} n'inflige aucun dégat.`;
        if (attacker === hero1) {
            // if hero1 is attacker, image of hero go to hero2 and display bubble 
            setTimeout(() => {
                document.querySelector('#hero-container-1').classList.add("hero__container-1")
                setTimeout(() => {
                    document.querySelector('#oops-hero2').classList.remove("display-none")
                    setTimeout(() => {
                        document.querySelector('#oops-hero2').classList.add("display-none")
                    }, speed1000)
                }, speed750)

            }, speed1000)

            document.querySelector('#hero-container-1').classList.remove("hero__container-1")
        }
        else if (attacker === hero2) {
            // if hero2 is attacker, image of hero go to hero1 and display bubble 
            setTimeout(() => {
                document.querySelector('#hero-container-2').classList.add("hero__container-2")
                setTimeout(() => {
                    document.querySelector('#oops-hero1').classList.remove("display-none")
                    setTimeout(() => {
                        document.querySelector('#oops-hero1').classList.add("display-none")
                    }, speed1000)
                }, speed750)

            }, speed1000,)

            document.querySelector('#hero-container-2').classList.remove("hero__container-2")
        }
        // attacker == defender && defender == attacker

        // executeFight(attacker, defender);
    }
    else {
        resumeText.innerHTML += `<br> Il y a égalité ! Rien ne se passe.`;
    }
}


// Add console log fight in HTML 
function battle(hero1, hero2) {
    const hero1Life = hero1.hero_durability;
    const hero2Life = hero2.hero_durability;
    let hero1LifeAfterDamage;
    let hero2LifeAfterDamage;
    setTimeout(() => {
        document.querySelector('.fight__img').classList.add('fight-width');
    }, "1000");

    // Executing fight, turn by turn all the 1 sec
    const timer = setInterval(

        function () {
            hero1LifeAfterDamage = (hero1.hero_durability / hero1Life) * 100 // Give percent of life remaining of hero 1
            hero2LifeAfterDamage = (hero2.hero_durability / hero2Life) * 100 // Give percent of life remaining of hero 2
            hero1HTML.querySelector('.life-combat').style.width = Math.max(hero1LifeAfterDamage, 0) + `%`; // Reduce life-bar of hero 1 in terms of his remaining life 
            hero2HTML.querySelector('.life-combat').style.width = Math.max(hero2LifeAfterDamage, 0) + `%`; // Reduce life-bar of hero 2 in terms of his remaining life 
            hero1HTML.querySelector('.progress__life-point').textContent = `${hero1.hero_durability}/${hero1Life}`
            hero2HTML.querySelector('.progress__life-point').textContent = `${hero2.hero_durability}/${hero2Life}`
            getMostSpeedHero(hero1, hero2); //L401
            executeFight(attacker, defender); //L460

            if (hero1LifeAfterDamage < 60) {
                hero1HTML.querySelector('.life-bar__modular').classList.remove("green")
                hero1HTML.querySelector('.life-bar__modular').classList.add("orange")
            }
            if (hero2LifeAfterDamage < 60) {
                hero2HTML.querySelector('.life-bar__modular').classList.remove("green")
                hero2HTML.querySelector('.life-bar__modular').classList.add("orange")
            }
            if (hero1LifeAfterDamage < 30) {
                hero1HTML.querySelector('.life-bar__modular').classList.remove("orange")
                hero1HTML.querySelector('.life-bar__modular').classList.add("red")
            }
            if (hero2LifeAfterDamage < 30) {
                hero2HTML.querySelector('.life-bar__modular').classList.remove("orange")
                hero2HTML.querySelector('.life-bar__modular').classList.add("red")
            }
            if (hero1.hero_durability <= 0) {
                setTimeout(() => {
                    hero1HTML.querySelector('.life-combat').style.width = `0%`;
                    hero1HTML.querySelector('.progress__life-point').textContent = `0/${hero1Life}`
                    hero1HTML.querySelectorAll('.filter-death').forEach(element => {
                        element.classList.add("background-grey")
                    });
                    document.querySelector(".combat-background").classList.toggle("display-none")
                }, speed2000)
            }
            else if (hero2.hero_durability <= 0) {
                setTimeout(() => {
                    hero2HTML.querySelector('.life-combat').style.width = `0%`;
                    hero2HTML.querySelector('.progress__life-point').textContent = `0/${hero2Life}`
                    hero2HTML.querySelectorAll('.filter-death').forEach(element => {
                        element.classList.add("background-grey")
                    });
                    document.querySelector(".combat-background").classList.toggle("display-none")
                }, speed2000)
            }

            if (attacker.hero_durability <= 0) { // If attacker have not life, defender win, and the fight is close 
                winner = defender.hero_name;
                clearInterval(timer);
                resumeText.innerHTML += `<br><br><strong>${winner} gagne le combat !</strong>`
            } else if (defender.hero_durability <= 0) {// If defender have not life, attacker win, and the fight is close 
                winner = attacker.hero_name;
                clearInterval(timer);
                resumeText.innerHTML += `<br><br><strong>${winner} gagne le combat !</strong>`
            };
            document.getElementById('selection-combat-text').scrollTop = document.getElementById('selection-combat-text').scrollHeight; // automatic scroll of text of fight
        }, speed2000)
}


/**
 * Customize page for fight
 *  Return design for the fight page                                                    
 *  @param {string} heroHTML is the parent HTML tag where we will add the hero          
 *  @return {string} return modification of css                                         
 */
function preparHeroToCombat(heroHTML) {
    heroHTML.querySelector(".life-bar__modular").classList.add("life-combat");
    heroHTML.querySelector(".life-bar__modular").classList.remove("display-none");
    heroHTML.querySelector(".hero__life-container").classList.remove("display-none");
    document.querySelector(".health-img-1").classList.remove("display-none");
    document.querySelector(".health-img-2").classList.remove("display-none");
    document.querySelector(".body__background").classList.add('opacity-0');
    heroHTML.querySelector(".hero__delete").classList.add('display-none');
    heroHTML.querySelector(".hero__delete").classList.remove('display-flex');

}

function preparCharacterCard(hero, heroHTML) {
    if (hero !== undefined) {

        heroHTML.querySelector('.progress__val-atq').style.width = hero.hero_strength + '%'
        heroHTML.querySelector('.progress__val-life').style.width = hero.hero_durability + '%'
        heroHTML.querySelector('.progress__val-shield').style.width = hero.hero_combat + '%'
        heroHTML.querySelector('.progress__val-speed').style.width = hero.hero_speed + '%'
    }
};




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/*
                         +------------------------------------------+
                         |                Execution                 |
                         +------------------------------------------+ 
 */
if (window.location.href === "http://localhost/heroes-arena/heroes-arena/pages/index.php") {
    const resumeCbt = document.querySelector('.resume__button');
    const hero1HTML = document.getElementById("hero1");
    const hero2HTML = document.getElementById("hero2");
    searchBar.value = ("")
    // waitingForResponse();
    resumeCbt.addEventListener('click', function (e) {
        combatText.classList.toggle("display-none")
    });

    // Remove hero 1 if you click on the delete button
    hero1HTML.querySelector('.hero__delete').addEventListener('click', function (e) { removeHero(hero1HTML) }, true);

    // Remove hero 2 if you click on the delete button
    hero2HTML.querySelector('.hero__delete').addEventListener('click', function (e) { removeHero(hero2HTML) }, true);

    document.querySelector('.speed__selection').addEventListener('click', function (event) {
        document.querySelector('.speed__button').classList.toggle("display-none")
        document.querySelector('.play__button').classList.toggle("margin-right")
        if (speed1000 === 1000) {
            speed750 /= 5;

            speed1000 /= 5;

            speed2000 /= 5;

            hero1Container.style.animationDuration = "0.15s";
            hero2Container.style.animationDuration = "0.15s";

        }
        else {
            speed750 *= 5;

            speed1000 *= 5;

            speed2000 *= 5;

            hero1Container.style.animationDuration = "0.75s";
            hero2Container.style.animationDuration = "0.75s";
        }
    });
    // On click of button "combat", fight starting
    buttonCombat.addEventListener('click', function (event) {

        // If hero 1 or héro 2 is not selected, so the fight don't start
        if (hero1 == undefined || hero2 == undefined) {
            return;
        }

        // If hero 1 and héro 2 is same, so the fight don't start
        if (hero1 == hero2) {
            return;
        }
        preparHeroToCombat(hero1HTML);
        preparHeroToCombat(hero2HTML);
        combatArea.classList.add("background-fight");
        document.querySelector(".combat-background").classList.toggle("display-none");
        resumeCbt.classList.toggle("display-none");
        buttonCombat.classList.add('display-none');
        selectionTitle.classList.toggle("display-none");
        search.classList.add('display-none');
        margin.classList.toggle("margin-bottom");
        imgVS.classList.toggle("display-none");
        document.querySelector(".fight__img").classList.add("fight-transition");
        selectionHeroes.classList.toggle("flex-wrap");
        hero2.hero_durability *= 10;
        hero1.hero_durability *= 10;
        battle(hero1, hero2);
    });
};


