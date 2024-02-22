# Lab #5
Create a command line "TO DO" list application that accepts user parameters to read and write a list to a file.

Required functionality :
1. Users should be able to add a new TODO with a `--add` parameter.  EG : `node todo.js --add "My new TODO" --file todoList`
2. Users should be able to delete existing TODO's with a `--delete` parameter.  It's reasonable to assign each of your TODO items a unique identifier and use that to locate it in the file.  `node todo.js --delete 2 --file todoList`
3. Users should be able to list the TODO's that currently exist with a `--list` parameter.  If using unique identifiers then the `--list` functionality should include the IDs so they can be referenced when doing deletes.  `node todo.js --list --file todoList`
4. Each TODO should have a Date property that indicates when it was created
5. TODO's should be stored in a file that is user defined via parameter like `--file <myFile>`
6. Reading and writing of this file should be done using the `fs` core module with the Asynchronous functions (and therefore, promises).
7. The script should generate an error if the file specified by the `--file` parameter does not exist.  Except...
8. When `--add`ing a new TODO, create the specified file if it does not exist.
9. The file contents should be JSON... at least your life will be a lot easier if it is.
10. Required parameters should be checked to ensure they are present.  If not, an error should be thrown along with a "help" or usage explanation
11.  A `--help` parameter should be available to explain the options and how to use the script