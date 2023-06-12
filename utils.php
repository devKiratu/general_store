<?php
function load_class($class)
{
  $prefixes = [
    'Controllers\\' => 'controllers/',
    'Models\\' => 'models/',
  ];

  $base_dir = __DIR__ . '/';

  foreach ($prefixes as $prefix => $directory) {

    $len = strlen($prefix);

    if (strncmp($prefix, $class, $len) !== 0) {
      continue;
    }

    $relative_class = substr($class, $len);

    $file = $base_dir . $directory . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
      require $file;
      return;
    }
  }
};
