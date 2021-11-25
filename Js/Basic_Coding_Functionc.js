// Tab Function
document.getElementById('apnatext').addEventListener('keydown', function (e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) +
            "    " + this.value.substring(end);

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + "    ";
    }
});

document.getElementById('apnatext').addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        if (this.value == "!") {
            this.value = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Emmet Abbreviation by TextStorm</h1>
</body>
</html>`
        }
    }
});


function is_it_code_file() {
    if (document.getElementById('apnatext').value == "Write your text here" || document.getElementById('apnatext').value == " " || document.getElementById('apnatext').value == "") {

        // Code for javascript
        if (document.getElementById("fileid").innerHTML.includes(".js")) {
            document.getElementById('apnatext').value = `console.log("TextStorm");`;
        }


        // Code for c
        if (document.getElementById("fileid").innerHTML.includes(".c")) {
            document.getElementById('apnatext').value = `#include <stdio.h>
int main () {
                
    printf("TextStorm" ); 
                
    return 0;
}`;
        }


        // Code for c++
        if (document.getElementById("fileid").innerHTML.includes(".cpp")) {
            document.getElementById('apnatext').value = `#include <iostream>
using namespace std;

int main() {

  cout << "TextStorm";

  return 0;
}`;
        }


        // Code for python
        if (document.getElementById("fileid").innerHTML.includes(".py")) {
            document.getElementById('apnatext').value = `print("TextStorm")`;
        }


        // Code for java
        if (document.getElementById("fileid").innerHTML.includes(".java")) {
            let USER_NAME_FOR_PACKAGE = localStorage.getItem("TextStorm_User").toLowerCase();
            document.getElementById('apnatext').value = `package com.${USER_NAME_FOR_PACKAGE};
import java.util.*;

public class ${document.getElementById("fileid").innerHTML.replace(".java", "")} {
            
    public static void main(String[] args) {
        System.out.println("TextStorm");
    }
}`;
        }


    };
};