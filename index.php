<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <title>Bookmarkletsgo</title>
    <meta name="description" content="A collection of bookmarklets">

    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div id="page">
        <h1>Bookmarkletsgo!</h1>

        <p>Drag these to your bookmarks:</p>
        <ul id="bookmarklets">

            <?php
            echo "\n";
            foreach (new DirectoryIterator(__DIR__ . '/js') as $fileInfo) {
                if ($fileInfo->isFile() && substr($fileInfo->getFilename(), -7) === '.min.js') {
                    $path = $fileInfo->getPathname();
                    $minified = file_get_contents($path);
                    $url = 'javascript:' . rawurlencode($minified);
                    $urlSize = strlen($url);
                    $filenameBase = substr($fileInfo->getFilename(), 0, -7);
                    $name = htmlentities($filenameBase);
                    $title = htmlentities(str_replace('-', ' ', $filenameBase));

                    echo "<li>\n";
                    echo "<a href=\"$url\" title=\"$title\" class=\"bookmarklet\">$name ($urlSize bytes)</a>\n";
                    echo "<span class=\"sources\">";
                    echo " <a href=\"$path\">min</a>";
                    echo " <a href=\"" . str_replace('.min.js', '.src.js', $path) . "\">src</a>";
                    echo "</span>\n";
                    echo "</li>\n";
                }
            }
            ?>

        </ul>

        <a href="https://github.com/soxofaan/bookmarkletsgo"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub"></a>

    </div>

</body>
</html>
