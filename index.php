<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <title>My bookmarklets</title>
    <meta name="description" content="A collection of my bookmarklets">

    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <h1>My bookmarklets</h1>

    <ul>
        <?php
        foreach (new DirectoryIterator(__DIR__ . '/js') as $fileInfo) {
            if ($fileInfo->isFile() && substr($fileInfo->getFilename(), -7) === '.min.js') {
                $minified = file_get_contents($fileInfo->getPathname());
                $url = 'javascript:' . rawurlencode($minified);
                $name = $fileInfo->getFilename();

                echo "<li><a href=\"$url\">$name</a></li>";
            }
        }
        ?>
    </ul>

</body>
</html>
