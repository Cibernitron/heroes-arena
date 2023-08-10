function rotateCard(event) {
  const card = event.currentTarget.querySelector('.hero-card');
  const cardRect = card.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width / 2;
  const cardCenterY = cardRect.top + cardRect.height / 2;
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  let rotationX = isFlipped(event.currentTarget, cardCenterX, mouseX);

  const rotationY = (mouseY - cardCenterY) * 0.3;

  card.style.transform = `perspective(1000px) rotateX(${rotationY}deg) rotateY(${rotationX}deg)`;

  let shadow = event.currentTarget.querySelector('.hero-card-shadow');
  let shadow2 = event.currentTarget.querySelector('.hero-card-shadow-2');
  let shadowThicknessX = rotationX * -0.3;
  let shadowThicknessY = rotationY * 0.3;

  if (event.currentTarget.classList.contains('is-flipped')) {
    shadow2.style.boxShadow = `${(mouseX - cardCenterX) * 0.1 - 1}px ${shadowThicknessY}px 10px 1px rgba(0, 0, 0, .6)`;
  }
  else {
    shadow.style.boxShadow = `${shadowThicknessX}px ${shadowThicknessY}px 10px 1px rgba(0, 0, 0, .6)`;
  }
}

function isFlipped(target, cardCenterX, mouseX) {
  if (target.classList.contains('is-flipped')) {
    return (mouseX - cardCenterX) * 0.3;
  } else {
    return (mouseX - cardCenterX) * -0.3;
  }
}

function resetCardRotation(event) {
  let shadow = event.currentTarget.querySelector('.hero-card-shadow');
  let shadow2 = event.currentTarget.querySelector('.hero-card-shadow-2');
  const card = event.currentTarget.querySelector('.hero-card');
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  shadow.style.boxShadow = '0px 0px 2px 1px rgba(0, 0, 0, .6)';
  shadow2.style.boxShadow = '0px 0px 2px 1px rgba(0, 0, 0, .6)';
}

let cardContainers = document.querySelectorAll('.hero-card-container');

cardContainers.forEach((cardContainer) => {
  cardContainer.addEventListener('mousemove', rotateCard);
  cardContainer.addEventListener('mouseleave', resetCardRotation);
  cardContainer.addEventListener('click', function (event) {
    cardContainer.classList.toggle('is-flipped');
    resetCardRotation(event);
    getStats(this);
    console.log(this);
  });
});

function getStats(card){
    let stats = card.querySelectorAll('.progress__val');
    stats.forEach(stat => {
      stat.style.width = `${stat.textContent}%`;
      console.log(stat.textContent);
      console.log(stat.style.width);
     
  });
}
