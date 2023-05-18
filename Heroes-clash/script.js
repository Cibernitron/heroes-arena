/*
                         +------------------------------------------+
                         |                Variables                 |
                         +------------------------------------------+ 
 */
let heroes;
let hero1;
let hero2;
let attacker;
let defender;
const list = document.querySelector("#search-list");
const button = document.getElementById("name");
const hero1HTML = document.getElementById("hero1");
const hero2HTML = document.getElementById("hero2");
const buttonCombat = document.querySelector("#button-combat");
const combatArea = document.querySelector(".combat-design");
const combatText = document.querySelector("#selection-combat-text");
const selectionTitle = document.querySelector("#selection-ttl");
const fightTitle = document.querySelector("#fight-ttl");
const search = document.querySelector("#search");
const margin = document.querySelector("#margin-bottom");
const imgVS = document.querySelector('.selection__img-versus')
const selectionDivHeroes = document.querySelector('.selection__heroes')
const resumeCbt = document.querySelector('.button-resume')
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
 * @return {string} if 2 heros are selected, the button "combat" is active, else it is not
 */
function verifyTheHeroes(hero1, hero2) {
    if (hero1 == undefined || hero2 == undefined) {
        buttonCombat.classList.remove("button--active");
        search.style.display = "flex"
    }
    else if (hero1 == hero2) {
        buttonCombat.classList.remove("button--active");
    }
    else {
        buttonCombat.classList.add("button--active");
        search.style.display = "none"
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
    heroHtml.querySelector(".selection__heroe-name").textContent = hero.name;
    heroHtml.querySelector(".selection__heroe-name").classList.remove('display-none');
    heroHtml.querySelector(".selection__heroe-name").classList.add("name-combat");

    // Display the life points of the hero
    // heroHtml.querySelector('.selection__heroe-life').textContent = `${hero.powerstats.durability}`;

    // Display the picture of the hero
    heroHtml.querySelector('.selection__img').src = hero.images.md;

    // Display stat button of the hero
    heroHtml.querySelector('.btn-stat').classList.remove('display-none');

    // Fill the hero caracter-card
    heroHtml.querySelector('.character-card').innerHTML = displayCards(hero);

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
    heroHtml.querySelector(".selection__heroe-name").textContent = '';
    heroHtml.querySelector(".selection__heroe-name").classList.remove('name-combat');
    heroHtml.querySelector(".selection__heroe-name").classList.add('display-none');

    // Remove health point
    heroHtml.querySelector('.selection__heroe-life').textContent = '';

    // Remove hero picture
    heroHtml.querySelector('.selection__img').src = "img/Choix perso mobile.png";

    // Hide stat button
    heroHtml.querySelector('.btn-stat').classList.add('display-none');

    // Remove hero character-card with hero information
    heroHtml.querySelector('.character-card').innerHTML = '';

    if (heroHtml.id === 'hero1') {
        hero1 = undefined;
    } else {
        hero2 = undefined;
    }
    verifyTheHeroes(hero1, hero2);
}

/**
 * Display Name
 * This function is used to interact with search bar                
 * @param Array is list of heroes in JSON                           
 */
function displayNames(array) {

    // If a key is pressed in the search bar then it offers 4 heroes corresponding to the searched text
    button.addEventListener('keyup', function (event) {
        const input = button.value;
        list.innerHTML = '';
        if (input === '') {
            return;
        }
        const result = array.filter(item => item.name.toLocaleLowerCase().startsWith(input.toLocaleLowerCase()))
        let count = 0;

        // Displays the first 4 heroes returned by the table after a filter
        result.forEach(element => {
            if (count >= 4) {
                return;
            }

            // Add the hero's name to the search list
            let liHeroes = document.createElement("li");
            let buttonLiHereos = document.createElement("button");
            buttonLiHereos.classList.add("button__lnk")
            list.appendChild(liHeroes);
            liHeroes.appendChild(buttonLiHereos);
            buttonLiHereos.setAttribute("id", `${element.id}`);
            buttonLiHereos.innerText = element.name;

            // If we click on the name of a hero in the search list then we add him as a new fighter
            const buttonHereos = document.getElementById(`${element.id}`);
            buttonHereos.addEventListener('click', function (e) {
                const hero1Name = hero1HTML.querySelector(".selection__heroe-name");
                const hero2Name = hero2HTML.querySelector(".selection__heroe-name");

                // If the first hero is not chosen then the selected hero becomes hero 1
                if (hero1Name.textContent === "") {
                    hero1 = element;
                    addHero(element, hero1HTML);
                }

                // If the first hero is already chosen and the second hero is not chosen then the selected hero becomes hero 2
                else if (hero2Name.textContent === "") {
                    hero2 = element;
                    addHero(element, hero2HTML);
                }

                // If the 2 heroes are selected then nothing is done
                else {
                    console.log('Both hero zones are full');

                }
            });
            count++;
        });
    });
}



// Function use to call JSON data
async function waitingForResponse() {
    const response = await fetch("https://akabab.github.io/superhero-api/api/all.json");
    heroes = await response.json();
    displayNames(heroes);
}

function dice() {
    return parseInt(Math.random() * 100);
}


// Define "speed" value
// Add a random value to hero "speed" value 
function speedScore(hero) {
    hero.powerstats.speed = hero.powerstats.speed + dice();
    return hero.powerstats.speed
}

// Return hero with hightest "speed" value
function getMostSpeedHero(hero1, hero2) {

    if (speedScore(hero1) > speedScore(hero2)) {
        attacker = hero1;
        defender = hero2;
        document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} à obtenu un score de vitesse plus important (${attacker.powerstats.speed}) que celui de ${defender.name}(${defender.powerstats.speed})`;
        return hero1.name;
    }
    else if (speedScore(hero1) < speedScore(hero2)) {
        attacker = hero2;
        defender = hero1;
        document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} à obtenu un score de vitesse plus important (${attacker.powerstats.speed}) que celui de ${defender.name}(${defender.powerstats.speed})`;
        return hero2.name;
    }

    else {
        return
    }
}


// Define "defense" value
// Add a random value to hero "defense" value 
function defenseScore(hero) {
    return hero.powerstats.combat + dice();
}

// Define "strength" value
// Add a random value to defender "strength" value 
function attackDefenserScore(hero) {
    return hero.powerstats.strength + dice();
}

// Define "strength" value
// Add a random value to attacker "strength" value 
function attackScore(hero) {
    return hero.powerstats.strength + dice();
}

/**
 * Execute Fight
 * This function is used to give the fight result.                                      
 * @param {string} attacker - Hero with more "speed" (result to function "getMostSpeedHero")
 * @param {string} defender - The other hero                                            
 * @return {string} Return result of fight                                              
 */
function executeFight(attacker, defender) {
    let shieldDefense = defenseScore(defender);
    let damagesAttack = attackScore(attacker);
    let defenseCounterAttack = attackDefenserScore(defender);

    if (damagesAttack > shieldDefense) {
        defender.powerstats.durability -= damagesAttack;
        setTimeout(() => {
            document.querySelector('.selection__img').classList.add("position-attack-1");
        }, "500");
        setTimeout(() => {
            document.querySelector('.selection__img').classList.remove("position-attack-1");
        }, "500");

        document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} a attaqué ${defender.name} et lui a infligé ${damagesAttack}`;
        document.querySelector('.selection_combat_text').innerHTML += `<br> Il reste ${defender.powerstats.durability}hp a ${defender.name}.<br>`;

        if (defender.powerstats.durability <= 0) {
            document.querySelector('.selection_combat_text').innerHTML += `<br> ${defender.name} est K.O`;
        }
    }

    else if (damagesAttack < shieldDefense) {
        // attacker == defender && defender == attacker
        // executeFight(attacker, defender)
        attacker.powerstats.durability -= defenseCounterAttack;

        document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} loupe son attaque.`;
        document.querySelector('.selection_combat_text').innerHTML += `<br> ${defender.name} riposte et inflige ${defenseCounterAttack} points de dégâts à ${attacker.name}.`;
        document.querySelector('.selection_combat_text').innerHTML += `<br> Il reste ${attacker.powerstats.durability}hp à ${attacker.name}.<br>`;
        if (attacker.powerstats.durability <= 0) {
            document.querySelector('.selection_combat_text').innerHTML += `<br> ${attacker.name} est K.O`;
            attacker.powerstats.durability = 0
        }
    }
    else {
        document.querySelector('.selection_combat_text').innerHTML += `<br> Il y a égalité!`;
    }

}


// Add console log fight in HTML 
function battle(hero1, hero2) {
    const hero1Life = hero1.powerstats.durability;
    const hero2Life = hero2.powerstats.durability;
    let hero1LifeAfterDamage;
    let hero2LifeAfterDamage;
    setTimeout(() => {
        document.querySelector('.selection__img-fight').style.width = "20%";
        document.querySelector('.selection__img-fight').style.top = "5rem";
    }, "1000");

    // Executing fight, turn by turn all the 2 sec
    const timer = setInterval(

        function () {
            hero1LifeAfterDamage = (hero1.powerstats.durability / hero1Life) * 100 // Give percent of life remaining of hero 1
            hero2LifeAfterDamage = (hero2.powerstats.durability / hero2Life) * 100 // Give percent of life remaining of hero 2
            getMostSpeedHero(hero1, hero2)
            executeFight(attacker, defender); // Do 1 turn of the fight
            // hero1HTML.querySelector('.progress-life').textContent = `${hero1.powerstats.durability}/${hero1Life}`; // Display number of the life of hero 1 in life-bar
            // hero2HTML.querySelector('.progress-life').textContent = `${hero2.powerstats.durability}/${hero2Life}`; // Display number of the life of hero 2 in life-bar
            hero1HTML.querySelector('.life-combat').style.width = Math.max(hero1LifeAfterDamage, 0) + `%`; // Reduce life-bar of hero 1 in terms of his remaining life 
            hero2HTML.querySelector('.life-combat').style.width = Math.max(hero2LifeAfterDamage, 0) + `%`; // Reduce life-bar of hero 2 in terms of his remaining life 

            if (hero1LifeAfterDamage < 60) {
                hero1HTML.querySelector('.selection__heroe-life').style.backgroundColor = "orange";
            }
            if (hero2LifeAfterDamage < 60) {
                hero2HTML.querySelector('.selection__heroe-life').style.backgroundColor = "orange";
            }
            if (hero1LifeAfterDamage < 30) {
                hero1HTML.querySelector('.selection__heroe-life').style.backgroundColor = "red";
            }
            if (hero2LifeAfterDamage < 30) {
                hero2HTML.querySelector('.selection__heroe-life').style.backgroundColor = "red";
            }
            if (hero1.powerstats.durability <= 0) {
                hero1HTML.querySelector('.selection__heroe-life').textContent = `0`
                hero1HTML.querySelector('.life-combat').style.width = `0%`;
                // hero1HTML.querySelector('.img-cross').classList.remove("display-none")
                hero1HTML.querySelector('.img-cross-1').classList.add("img-cross-1-display")
            }
            else if (hero2.powerstats.durability <= 0) {
                hero2HTML.querySelector('.selection__heroe-life').textContent = `0`
                hero2HTML.querySelector('.life-combat').style.width = `0%`;
                // hero2HTML.querySelector('.img-cross').classList.remove("display-none")
                hero2HTML.querySelector('.img-cross-2').classList.add("img-cross-2-display")
            }

            if (attacker.powerstats.durability <= 0) { // If attacker have not life, defender win, and the fight is close 
                winner = defender.name;
                clearInterval(timer);
                document.querySelector('.selection_combat_text').innerHTML += `<br><br><strong>${winner} gagne le combat !</strong>`
            } else if (defender.powerstats.durability <= 0) {// If defender have not life, attacker win, and the fight is close 
                winner = attacker.name;
                console.log(defender.powerstats.durability);
                clearInterval(timer);
                document.querySelector('.selection_combat_text').innerHTML += `<br><br><strong>${winner} gagne le combat !</strong>`
            };
            document.getElementById('selection-combat-text').scrollTop = document.getElementById('selection-combat-text').scrollHeight; // automatic scroll of text of fight
        }, 2000)
}

/**
 * Display Character Card
 * Return HTML use to display the characteristic of the hero                           
 * @param {string} hero is a JSON of selected hero                                      
 * @return {string} return characteristic card                                          
 */
function displayCards(hero) {
    return `
        <li class="character__card__list">
            <div class="character__card__top">
                <div class="character__card__top-title">
                    <img class="character__card__img" src="${hero.images.sm}">
                    <h2 class="character__card-title">${hero.name}</h2>
                </div>
                <div class="character__features">
                        <li class="flex-progress abilities">  
                            <p class="character__features__text">Attack:</p>
                            <div class="progress">
                                <div class="progress-val progress-val-atq">${hero.powerstats.strength}</div>
                            </div>
                        </li>
                        <li class="flex-progress abilities">  
                            <p class="character__features__text">Shield:</p>
                            <div class="progress">
                                <div class="progress-val progress-val-shield">${hero.powerstats.combat}</div>
                            </div>
                        </li>
                        <li class="flex-progress abilities">  
                            <p class="character__features__text">Speed:</p>
                            <div class="progress">
                                <div class="progress-val progress-val-speed">${hero.powerstats.speed}</div>
                            </div>
                        </li>
                        <li class="flex-progress abilities">  
                            <p class="character__features__text">Health:</p>
                            <div class="progress">
                                <div class="progress-val progress-val-life">${hero.powerstats.durability}</div>
                            </div>
                        </li> 
                </div>
            </div>
            <div class="bio">
                <p class="title__bio">Biography:</p>
                <p class="text__bio"><span class="text__title__bio">Real-Name:</span> ${hero.biography.fullName}</p>
                <p class="text__bio"><span class="text__title__bio">Place of Birth:</span> ${hero.biography.placeOfBirth}</p>
                <p class="text__bio"><span class="text__title__bio">Alignement:</span> ${hero.biography.alignment}</p>
                <p class="text__bio"><span class="text__title__bio">Universe:</span> ${hero.biography.publisher}</p>
            </div>
        </li>`;
};

/**
 * Customize page for fight
 *  Return design for the fight page                                                    
 *  @param {string} heroHTML is the parent HTML tag where we will add the hero          
 *  @return {string} return modification of css                                         
 */
function preparHeroToCombat(heroHTML) {
    heroHTML.querySelector(".selection__heroe-name").classList.add("name-combat");
    heroHTML.querySelector(".selection__heroe-life").classList.add("life-combat");
    heroHTML.querySelector(".selection__heroe-life").classList.remove("display-none");
    heroHTML.querySelector(".progress").style.display = "flex";
    heroHTML.querySelector(".progress-life").style.display = "flex";
    document.querySelector(".health-img-1").classList.remove("display-none");
    document.querySelector(".health-img-2").classList.remove("display-none");
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/*
                         +------------------------------------------+
                         |                Execution                 |
                         +------------------------------------------+ 
 */

waitingForResponse();

// Display the character-card of hero 1 if you click on the Stats button of hero 1
hero1HTML.querySelector('.btn-stat').addEventListener('click', function (e) {
    hero1HTML.querySelector('.character-card').classList.toggle('display-none');
    // Associate stats of hero 1 to progress-bar width
    hero1HTML.querySelector('.progress-val-atq').style.width = hero1.powerstats.strength + '%'
    hero1HTML.querySelector('.progress-val-life').style.width = hero1.powerstats.durability + '%'
    hero1HTML.querySelector('.progress-val-shield').style.width = hero1.powerstats.combat + '%'
    hero1HTML.querySelector('.progress-val-speed').style.width = hero1.powerstats.speed + '%'
});

// Display the character-card of hero 2 if you click on the Stats button of hero 2
hero2HTML.querySelector('.btn-stat').addEventListener('click', function (e) {
    hero2HTML.querySelector('.character-card').classList.toggle('display-none');
    // Associate stats of hero 2 to progress-bar width
    hero2HTML.querySelector('.progress-val-atq').style.width = hero2.powerstats.strength + '%'
    hero2HTML.querySelector('.progress-val-life').style.width = hero2.powerstats.durability + '%'
    hero2HTML.querySelector('.progress-val-shield').style.width = hero2.powerstats.combat + '%'
    hero2HTML.querySelector('.progress-val-speed').style.width = hero2.powerstats.speed + '%'
});
resumeCbt.addEventListener('click', function (e) {
    combatText.classList.toggle("display-none")
});

// Remove hero 1 if you click on his name
hero1HTML.querySelector('.selection__heroe-name').addEventListener('click', function (e) { removeHero(hero1HTML) });

// Remove hero 2 if you click on his name
hero2HTML.querySelector('.selection__heroe-name').addEventListener('click', function (e) { removeHero(hero2HTML) });

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
    preparHeroToCombat(hero1HTML)
    preparHeroToCombat(hero2HTML)
    combatArea.style.backgroundImage = "url(img/fond_combat.png)"
    resumeCbt.classList.toggle("display-none")
    // disabled remove heros
    // hero1HTML.querySelector('.selection__heroe-name').removeEventListener('click', function(e){removeHero(hero1HTML)});
    // hero2HTML.querySelector('.selection__heroe-name').removeEventListener('click', function(e){removeHero(hero2HTML)});

    // combatArea.classList.add("combat-design")
    buttonCombat.style.display = "none"

    selectionTitle.classList.toggle("display-none")
    // fightTitle.classList.toggle("display-none")
    // hero1HTML.querySelector('.selection__heroe-name-cross').style.display = "none"
    // hero2HTML.querySelector('.selection__heroe-name-cross').style.display = "none"
    search.style.display = "none"
    margin.classList.toggle("margin-bottom")
    imgVS.classList.toggle("display-none")
    document.querySelector(".selection__img-fight").style.width = "80%";
    document.querySelector(".selection__img-fight").style.top = "1vw";
    selectionDivHeroes.classList.toggle("flex-wrap")
    hero2.powerstats.durability *= 10;
    hero1.powerstats.durability *= 10;
    battle(hero1, hero2);
});
