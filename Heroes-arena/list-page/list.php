<?php
require "../php/_connection-Bdd.php";
include "../php/_function.php";


?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Marvel:wght@400;700&family=Roboto:wght@100&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="../style.css">

</head>
<?php include "../php/_header.php"?>
<main>
<ul class="heroes-list">
    <?= displayLists() ?>
</ul>
</main>
<?=include "../php/_footer.php";?>
</body>
<script src="script-list.js"></script>

</html>