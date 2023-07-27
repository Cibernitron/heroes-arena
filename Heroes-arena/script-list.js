// const heroes = document.querySelectorAll(".hero-card-container");

// heroes.forEach(element => {
//     element.addEventListener('click', function (event) {

//         element.children[1].classList.toggle("display-none");
//         element.children[0].classList.toggle("display-none");
//     })
// });

function rotateCard(event) {
    const card = event.currentTarget.querySelector('.hero-card');
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // Rotation horizontale (axe Y)
    const rotationX = (mouseX - cardCenterX) * 0.5;
  
    // Rotation verticale (axe X)
    const rotationY = (mouseY - cardCenterY) * -0.3;
  
    card.style.transform = `perspective(1000px) rotateX(${rotationY}deg) rotateY(${rotationX}deg)`;
  }
  
  function resetCardRotation(event) {
    const card = event.currentTarget.querySelector('.hero-card');
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  }

  // function toggleCardFlip(event) {
  //   const cardContainer = event.currentTarget;
  //   cardContainer.classList.toggle('flipped');
  // }