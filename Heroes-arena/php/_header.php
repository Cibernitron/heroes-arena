
<?php
$current_page = basename($_SERVER['PHP_SELF']);
?>
<header class="header">
        <div class="header__band"></div>
        <a class="header__link" href="index.php">
            <img class="header__logo" src="../img/logo_heroes-arena.png" alt="logo">
        </a>
        <nav class="header__nav">
            <ul class="nav">
                <li class="nav__list">
                    <a class="nav__link <?php if ($current_page === 'index.php') echo 'active'; ?>" href="index.php">Accueil</a>
                </li>
                <li class="nav__list">
                    <a class="nav__link <?php if ($current_page === 'list.php') echo 'active'; ?>" href="list.php">Liste</a>
                </li>
                <li class="nav__list">
                    <a class="nav__link <?php if ($current_page === 'create.php') echo 'active'; ?>" href="create.php">Création</a>
                </li>
            </ul>
        </nav>
    </header>