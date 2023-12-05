function displayAddImg() {
    // Sélection de l'élément input de type file
    var uploadInput = document.getElementById('uploadInput');

    // Ajout d'un écouteur d'événements sur le clic de l'image
    document.querySelector('.picture_hero').addEventListener('click', function () {
        // Déclencher le clic sur l'élément input de type file
        uploadInput.click();
    });

    // Ajout d'un écouteur d'événements sur le changement de fichier sélectionné
    uploadInput.addEventListener('change', function () {
        // Récupérer le fichier sélectionné
        var selectedFile = uploadInput.files[0];

        // Vérifier si un fichier a été sélectionné
        if (selectedFile) {
            // Créer un objet URL pour l'aperçu de l'image
            var previewUrl = URL.createObjectURL(selectedFile);

            // Afficher l'aperçu de l'image
            document.querySelector('.picture_hero').src = `${previewUrl}`;
        }
    });
}

displayAddImg()


var pointsToDistribute = 40;
// Fonction pour ajuster une statistique (attack, shield, speed, health)
function adjustStat(stat, adjustment, event) {
    // Empêcher le comportement par défaut du bouton
    event.preventDefault();
  
    // Récupérer l'élément de la barre de statistiques et la valeur actuelle
    var barElement = document.getElementById('bar_' + stat);
    var valueElement = document.getElementById('value_' + stat);
    var inputElement = document.getElementById('input_' + stat);
    var currentValue = parseInt(valueElement.textContent);
  
    // Vérifier si l'ajustement est possible
    if ((adjustment === -1 && currentValue > 0) || (adjustment === 1 && pointsToDistribute > 0)) {
      // Ajuster la valeur et la barre
      currentValue += adjustment;
      pointsToDistribute -= adjustment;
  
      // Mettre à jour l'affichage
      valueElement.textContent = currentValue;
      inputElement.value = currentValue;
      barElement.style.width = (currentValue) + '%'; // Ajuster en fonction de votre échelle
      document.getElementById('pointsToDistribute').textContent = pointsToDistribute;
    }
  }
  