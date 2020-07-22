# QAO Theme (Queensland Audit Office)

QAO (Queensland Audit Office) is sub-theme of Bootstrap Barrio (https://www.drupal.org/project/bootstrap_barrio).
Barrio is a Drupal 8 - Bootstrap 4 Base Theme. Drupal markup is completely overwrite as standard Bootstrap 4 markup using from roots twig templates referencing only to Bootstrap CSS, and little custom CSS. Barrio is Flex based for whatever is not covered by Bootstrap.


## Building and watching assets

You need to have node version 10. We use .nvmrc to lock the node version for this specific project.


First step is go to Drupal root folder and run
```
$ npm install
```

Make sure you have global Gulp. 
```
$ npm install -g gulp
```

If you have gulp, then run it directly from the theme folder.(web/themes/custom/qao/)
```
$ gulp
```
