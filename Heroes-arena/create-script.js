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
