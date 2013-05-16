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

        <ul class="bookmarklets">

            <?php
            echo "\n";
            foreach (new DirectoryIterator(__DIR__ . '/js') as $fileInfo) {
                if ($fileInfo->isFile() && substr($fileInfo->getFilename(), -7) === '.min.js') {
                    $minified = file_get_contents($fileInfo->getPathname());
                    $url = 'javascript:' . rawurlencode($minified);
                    $filenameBase = substr($fileInfo->getFilename(), 0, -7);
                    $name = htmlentities($filenameBase);
                    $title = htmlentities(str_replace('-', ' ', $filenameBase));

                    echo "<li><a href=\"$url\" title=\"$title\" class=\"bookmarklet\">$name</a></li>\n";
                }
            }
            ?>

        </ul>
    </div>

</body>
</html>
