const heroes = document.querySelectorAll(".container-heros");

heroes.forEach(element => {
    element.addEventListener('click', function (event) {
        element.children[1].classList.toggle("display-none");
        element.children[0].classList.toggle("display-none");
    })
});
