/*
les tutos de guillaume :

comment parser un fichier json en php
comment lire le fichier, recuperer son contenus, pour sortir les requetes a mettre en SQL 
et créer un modele sql 
 */
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
const imgVS = document.querySelector('.versus__img')
const selectionHeroes = document.querySelector('.selection__heroes')
const resumeCbt = document.querySelector('.resume__button')
const hero1Name = hero1HTML.querySelector(".hero__name");
const hero2Name = hero2HTML.querySelector(".hero__name");
const resumeText = document.querySelector('.resume__text')
const hero1Container = document.querySelector('.hero__container-1')
const hero2Container = document.querySelector('.hero__container-2')
let speed750 = 750;
let speed1000 = 1000;
let speed2000 = 2000;

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

// Display or not character-card in the place of picture on click on this last one
function displayOrNotCharacterCard(hero, heroHtml, number) {
    // display character-card in the place of picture on click on this last one
    heroHtml.querySelector('.hero__character-card').classList.toggle('display-none')
    heroHtml.querySelector('.hero__img').classList.toggle('display-none')
    if (hero.powerstats.durability <= 0 && hero.powerstats.durability <= 0) {
        heroHtml.querySelector(`.hero__cross-${number}-display`).classList.toggle('display-none')
    }
}

/**
 * Verify if heroes are defined, 
 * @param {string} hero is the hero in API                           
 * @param {string} heroHTML is the parent HTML tag where we will add the hero                            
 * @param {string} number is number of the place of hero (1 or 2)                            
 * @return {string} if the hero is selected, we can click for display character card
 */
function verifyTheHeroes2(hero, heroHTML, number) {
    if (hero === undefined) { return; }
    displayOrNotCharacterCard(hero, heroHTML, number)
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
    heroHtml.querySelector(".hero__name").textContent = hero.name;
    heroHtml.querySelector(".hero__name").classList.remove('display-none');
    heroHtml.querySelector(".hero__name").classList.add("name-combat");
    heroHtml.querySelector(".hero__delete").style.display = 'flex';

    // Display the picture of the hero
    heroHtml.querySelector('.hero__img').src = hero.images.lg;

    // Fill the hero caracter-card
    heroHtml.querySelector('.hero__character-card').innerHTML = displayCards(hero);

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
    heroHtml.querySelector(".hero__name").textContent = '';
    heroHtml.querySelector(".hero__name").classList.remove('name-combat');
    heroHtml.querySelector(".hero__name").classList.add('display-none');
    heroHtml.querySelector(".hero__delete").style.display = 'none';

    // Remove health point
    heroHtml.querySelector('.life-bar__modular').textContent = '';

    // Remove hero picture
    heroHtml.querySelector('.hero__img').classList.remove('display-none');
    heroHtml.querySelector('.hero__img').src = "img/Choix perso mobile.png";

    // Remove hero character-card with hero information
    heroHtml.querySelector('.hero__character-card').innerHTML = '';
    heroHtml.querySelector('.hero__character-card').classList.add('display-none');


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
            let buttonLiHeroes = document.createElement("button");
            buttonLiHeroes.classList.add("button__lnk")
            list.appendChild(liHeroes);
            liHeroes.appendChild(buttonLiHeroes);
            buttonLiHeroes.setAttribute("id", `${element.id}`);
            buttonLiHeroes.innerText = element.name;

            // If we click on the name of a hero in the search list then we add him as a new fighter
            const buttonHeroes = document.getElementById(`${element.id}`);
            buttonHeroes.addEventListener('click', function (e) {


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


    // If we click on the random button next to the search list then we add him as a new random fighter
    const buttonRandom = document.querySelector("#btn-random");
    buttonRandom.addEventListener('click', function (e) {
        let iterations = 10; // Nombre d'itérations avant de s'arrêter sur un héros aléatoire

        if (hero1Name.textContent === "") {
            const interval = setInterval(function () {
                let id = dice(heroes.length);
                const hero1Name = hero1HTML.querySelector(".hero__name");

                // Afficher l'image correspondant à l'ID aléatoire
                addHero(heroes[id], hero1HTML);

                iterations--;

                if (iterations <= 0) {
                    clearInterval(interval); // Arrêter l'animation lorsque le nombre d'itérations est atteint

                    let id = dice(heroes.length);
                    addHero(heroes[id], hero1HTML);

                    // Sélectionner un héros aléatoire
                    const randomIndex = Math.floor(Math.random() * heroes.length);
                    const selectedHero = heroes[randomIndex];

                    hero1 = selectedHero;
                    addHero(selectedHero, hero1HTML);
                }
            }, 100)// Temps en millisecondes entre chaque itération (ajustez selon vos besoins)
        }


        else if (hero2Name.textContent === "") {
            const interval = setInterval(function () {
                let id = dice(heroes.length);
                const hero2Name = hero2HTML.querySelector(".hero__name");

                // Afficher l'image correspondant à l'ID aléatoire
                addHero(heroes[id], hero2HTML);

                iterations--;

                if (iterations <= 0) {
                    clearInterval(interval); // Arrêter l'animation lorsque le nombre d'itérations est atteint

                    let id = dice(heroes.length);
                    addHero(heroes[id], hero2HTML);

                    // Sélectionner un héros aléatoire
                    const randomIndex = Math.floor(Math.random() * heroes.length);
                    const selectedHero = heroes[randomIndex];

                    hero2 = selectedHero;
                    addHero(selectedHero, hero2HTML);
                }
            }, 100)// Temps en millisecondes entre chaque itération (ajustez selon vos besoins)
        }
        // Si les deux héros sont déjà choisis, afficher un message d'erreur
        else {
            console.log('Both hero zones are full');
        }
    })

}

// Function use to call JSON data
async function waitingForResponse() {
    const response = await fetch("https://akabab.github.io/superhero-api/api/all.json");
    heroes = await response.json();
    displayNames(heroes);
}

function dice(number) {
    return parseInt(Math.random() * number);
}

// Define the difference of speed of selected heroes
function getMostSpeedHero(hero1, hero2) {
    const speedHero1 = hero1.powerstats.speed;
    const speedHero2 = hero2.powerstats.speed;
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
        resumeText.innerHTML += `<br> ${attacker.name} a obtenu un score de vitesse (${attacksLuckH1}) plus important que celui de ${defender.name} (${attacksLuckH2})`;
        return hero1.name;
    }
    else if (attacksLuckH1 < attacksLuckH2) {
        attacker = hero2;
        defender = hero1;
        resumeText.innerHTML += `<br> ${attacker.name} a obtenu un score de vitesse (${attacksLuckH2}) plus important que celui de ${defender.name} (${attacksLuckH1})`;
        return hero2.name;
    }
    else {
        getMostSpeedHero(hero1, hero2)
    }
}

// Define "defense" value
// Add a random value to hero "defense" value 
function defenseScore(hero) {
    return hero.powerstats.combat + dice(100);
}

// Define "strength" value
// Add a random value to defender "strength" value 
function attackDefenserScore(hero) {
    return hero.powerstats.strength + dice(100);
}

// Define "strength" value
// Add a random value to attacker "strength" value 
function attackScore(hero) {
    return hero.powerstats.strength + dice(100);
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
    // if Attack of attacker is higher than defense of defender, defender take damage 
    if (damagesAttack > shieldDefense) {
        let damage = (damagesAttack - shieldDefense)*10;
        if (defender.powerstats.durability <= 0) {
            resumeText.innerHTML += `<br> ${defender.name} est K.O`;
            return
        }
        resumeText.innerHTML += `<br> ${attacker.name} a attaqué ${defender.name} et lui a infligé ${damagesAttack}`;
        resumeText.innerHTML += `<br> Il reste ${defender.powerstats.durability}hp a ${defender.name}.<br>`;
        if (attacker === hero1) {
            // if hero1 is attacker, image of hero go to hero2 and display bubble 
            setTimeout(() => {
                document.querySelector('#hero1-container').classList.add("hero__container-1")
                setTimeout(() => {
                    if (defender.powerstats.durability > 0) {
                    document.querySelector('#bam-hero2').classList.remove("display-none")
                }
                    else if (defender.powerstats.durability <= 0) {
                        document.querySelector('#aargh-hero2').classList.remove("display-none")
                    }
                    setTimeout(() => {
                        document.querySelector('#aargh-hero2').classList.add("display-none")
                        document.querySelector('#bam-hero2').classList.add("display-none")
                    }, speed1000)
                }, speed750)

            }, speed1000)

            document.querySelector('#hero1-container').classList.remove("hero__container-1")
        }
        else if (attacker === hero2) {
            // if hero2 is attacker, image of hero go to hero1 and display bubble 
            setTimeout(() => {
                document.querySelector('#hero2-container').classList.add("hero__container-2")
                setTimeout(() => {
                    if (defender.powerstats.durability > 0) {
                        document.querySelector('#bam-hero1').classList.remove("display-none")
                    }
                    else if (defender.powerstats.durability <= 0) {
                        document.querySelector('#aargh-hero1').classList.remove("display-none")
                    }
                    setTimeout(() => {
                        document.querySelector('#aargh-hero1').classList.add("display-none")
                        document.querySelector('#bam-hero1').classList.add("display-none")
                    }, speed1000)
                }, speed750)

            }, speed1000,)

            document.querySelector('#hero2-container').classList.remove("hero__container-2")
        }
        defender.powerstats.durability -= damage;
    }
    // if Attack of attacker is lower than defense of defender, defender don't take damage, and defender become attacker and attacker become defender, and launch other turn
    else if (damagesAttack < shieldDefense) {
        if (defender.powerstats.durability <= 0) {
            resumeText.innerHTML += `<br> ${defender.name} est K.O`;
            return
        }
        resumeText.innerHTML += `<br> ${defender.name} arrive à se défendre, ${attacker.name} n'inflige aucun dégat.`;
        if (attacker === hero1) {
            // if hero1 is attacker, image of hero go to hero2 and display bubble 
            setTimeout(() => {
                document.querySelector('#hero1-container').classList.add("hero__container-1")
                setTimeout(() => {
                    document.querySelector('#oops-hero2').classList.remove("display-none")
                    setTimeout(() => {
                        document.querySelector('#oops-hero2').classList.add("display-none")
                    }, speed1000)
                }, speed750)

            }, speed1000)

            document.querySelector('#hero1-container').classList.remove("hero__container-1")
        }
        else if (attacker === hero2) {
            // if hero2 is attacker, image of hero go to hero1 and display bubble 
            setTimeout(() => {
                document.querySelector('#hero2-container').classList.add("hero__container-2")
                setTimeout(() => {
                    document.querySelector('#oops-hero1').classList.remove("display-none")
                    setTimeout(() => {
                        document.querySelector('#oops-hero1').classList.add("display-none")
                    }, speed1000)
                }, speed750)

            }, speed1000,)

            document.querySelector('#hero2-container').classList.remove("hero__container-2")
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
    const hero1Life = hero1.powerstats.durability;
    const hero2Life = hero2.powerstats.durability;
    let hero1LifeAfterDamage;
    let hero2LifeAfterDamage;
    setTimeout(() => {
        document.querySelector('.fight__img').style.width = "20%";
        document.querySelector('.fight__img').style.maxWidth = "160px";
        document.querySelector('.fight__img').style.top = "0";
    }, "1000");

    // Executing fight, turn by turn all the 1 sec
    const timer = setInterval(

        function () {
            hero1LifeAfterDamage = (hero1.powerstats.durability / hero1Life) * 100 // Give percent of life remaining of hero 1
            hero2LifeAfterDamage = (hero2.powerstats.durability / hero2Life) * 100 // Give percent of life remaining of hero 2
            hero1HTML.querySelector('.life-combat').style.width = Math.max(hero1LifeAfterDamage, 0) + `%`; // Reduce life-bar of hero 1 in terms of his remaining life 
            hero2HTML.querySelector('.life-combat').style.width = Math.max(hero2LifeAfterDamage, 0) + `%`; // Reduce life-bar of hero 2 in terms of his remaining life 
            hero1HTML.querySelector('.progress__life-point').textContent = `${hero1.powerstats.durability}/${hero1Life}`
            hero2HTML.querySelector('.progress__life-point').textContent = `${hero2.powerstats.durability}/${hero2Life}`
            getMostSpeedHero(hero1, hero2)
            executeFight(attacker, defender); // Do 1 turn of the fight

            if (hero1LifeAfterDamage < 60) {
                hero1HTML.querySelector('.life-bar__modular').style.backgroundColor = "orange";
            }
            if (hero2LifeAfterDamage < 60) {
                hero2HTML.querySelector('.life-bar__modular').style.backgroundColor = "orange";
            }
            if (hero1LifeAfterDamage < 30) {
                hero1HTML.querySelector('.life-bar__modular').style.backgroundColor = "red";
            }
            if (hero2LifeAfterDamage < 30) {
                hero2HTML.querySelector('.life-bar__modular').style.backgroundColor = "red";
            }
            if (hero1.powerstats.durability <= 0) {
                setTimeout(() => {
                    hero1HTML.querySelector('.life-combat').style.width = `0%`;
                    hero1HTML.querySelector('.progress__life-point').textContent = `0/${hero1Life}`
                    hero1HTML.querySelector('.hero__cross-1').classList.add("hero__cross-1-display")
                    document.querySelector(".combat-background").classList.toggle("display-none")
                }, speed2000)
            }
            else if (hero2.powerstats.durability <= 0) {
                setTimeout(() => {
                    hero2HTML.querySelector('.life-combat').style.width = `0%`;
                    hero2HTML.querySelector('.progress__life-point').textContent = `0/${hero2Life}`
                    hero2HTML.querySelector('.hero__cross-2').classList.add("hero__cross-2-display")
                    document.querySelector(".combat-background").classList.toggle("display-none")
                }, speed2000)
            }

            if (attacker.powerstats.durability <= 0) { // If attacker have not life, defender win, and the fight is close 
                winner = defender.name;
                clearInterval(timer);
                resumeText.innerHTML += `<br><br><strong>${winner} gagne le combat !</strong>`
            } else if (defender.powerstats.durability <= 0) {// If defender have not life, attacker win, and the fight is close 
                winner = attacker.name;
                clearInterval(timer);
                resumeText.innerHTML += `<br><br><strong>${winner} gagne le combat !</strong>`
            };
            document.getElementById('selection-combat-text').scrollTop = document.getElementById('selection-combat-text').scrollHeight; // automatic scroll of text of fight
        }, speed2000)
}



/**
 * Display Character Card
 * Return HTML use to display the characteristic of the hero                           
 * @param {string} hero is a JSON of selected hero                                      
 * @return {string} return characteristic card                                          
 */
function displayCards(hero) {
    return `
        <li class="character-card__list">
            <div class="character-card__top">
                <div class="character-card__top-title">
                    <img class="character-card__img" src="${hero.images.sm}">
                    <h2 class="character-card__title">${hero.name}</h2>
                </div>
                <div class="character-card__features">
                        <li class="character-card__progress abilities">  
                            <p class="character-card__features__text">Attack:</p>
                            <div class="progress">
                                <div class="progress__val progress__val-atq">${hero.powerstats.strength}</div>
                            </div>
                        </li>
                        <li class="character-card__progress abilities">  
                            <p class="character-card__features__text">Shield:</p>
                            <div class="progress">
                                <div class="progress__val progress__val-shield">${hero.powerstats.combat}</div>
                            </div>
                        </li>
                        <li class="character-card__progress abilities">  
                            <p class="character-card__features__text">Speed:</p>
                            <div class="progress">
                                <div class="progress__val progress__val-speed">${hero.powerstats.speed}</div>
                            </div>
                        </li>
                        <li class="character-card__progress abilities">  
                            <p class="character-card__features__text">Health:</p>
                            <div class="progress">
                                <div class="progress__val progress__val-life">${hero.powerstats.durability}</div>
                            </div>
                        </li> 
                </div>
            </div>
            <div class="character-card__bio">
                <p class="bio__title">Biography:</p>
                <p class="bio__text"><span class="bio__text-title">Real-Name:</span> ${hero.biography.fullName}</p>
                <p class="bio__text"><span class="bio__text-title">Alignement:</span> ${hero.biography.alignment}</p>
                <p class="bio__text"><span class="bio__text-title">Universe:</span> ${hero.biography.publisher}</p>
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
    heroHTML.querySelector(".hero__name").classList.add("name-combat");
    heroHTML.querySelector(".name-combat").style.marginBottom = "0";
    heroHTML.querySelector(".life-bar__modular").classList.add("life-combat");
    heroHTML.querySelector(".life-bar__modular").classList.remove("display-none");
    // heroHTML.querySelector(".progress").style.display = "flex";
    heroHTML.querySelector(".hero__life-container").classList.remove("display-none");
    document.querySelector(".health-img-1").classList.remove("display-none");
    document.querySelector(".health-img-2").classList.remove("display-none");
    document.querySelector(".body__background").style.opacity = "0%";
    heroHTML.querySelector(".hero__delete").style.display = 'none';
}

function preparCharacterCard(hero, heroHTML) {
    if (hero !== undefined) {

        heroHTML.querySelector('.progress__val-atq').style.width = hero.powerstats.strength + '%'
        heroHTML.querySelector('.progress__val-life').style.width = hero.powerstats.durability + '%'
        heroHTML.querySelector('.progress__val-shield').style.width = hero.powerstats.combat + '%'
        heroHTML.querySelector('.progress__val-speed').style.width = hero.powerstats.speed + '%'
    }
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/*
                         +------------------------------------------+
                         |                Execution                 |
                         +------------------------------------------+ 
 */

waitingForResponse();

hero1HTML.querySelector('.hero__container').addEventListener('click', function () { preparCharacterCard(hero1, hero1HTML) })
hero2HTML.querySelector('.hero__container').addEventListener('click', function () { preparCharacterCard(hero2, hero2HTML) })

hero1HTML.querySelector('.hero__container').addEventListener('click', function (e) {
    verifyTheHeroes2(hero1, hero1HTML, 1)
});
hero2HTML.querySelector('.hero__container').addEventListener('click', function (e) {
    verifyTheHeroes2(hero2, hero2HTML, 2)
});

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
        console.log(speed750);
        speed1000 /= 5;
        console.log(speed1000);
        speed2000 /= 5;
        console.log(speed2000);
        hero1Container.style.animationDuration = "0.15s";
        hero2Container.style.animationDuration = "0.15s";

    }
    else {
        speed750 *= 5;
        console.log(speed750);
        speed1000 *= 5;
        console.log(speed1000);
        speed2000 *= 5;
        console.log(speed2000);
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
    preparHeroToCombat(hero1HTML)
    preparHeroToCombat(hero2HTML)
    combatArea.style.backgroundImage = "url(img/cataclysm.gif)"
    document.querySelector(".combat-background").classList.toggle("display-none")
    resumeCbt.classList.toggle("display-none")
    buttonCombat.style.display = "none"
    selectionTitle.classList.toggle("display-none")
    search.style.display = "none"
    margin.classList.toggle("margin-bottom")
    imgVS.classList.toggle("display-none")
    document.querySelector(".fight__img").style.width = "80%";
    document.querySelector(".fight__img").style.top = "1vw";
    selectionHeroes.classList.toggle("flex-wrap")
    hero2.powerstats.durability *= 10;
    hero1.powerstats.durability *= 10;
    battle(hero1, hero2);
});
