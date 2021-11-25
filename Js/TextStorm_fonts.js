    /***************************File*Header********************************** 
    
    * File Name: TextStorm_fonts.js
    *
    * JS Description: This JS File contains a object of fonts functions...
    *                                   MASTERPIECE !
    *
    * Available Fonts:
    * -> font-family: 'Comfortaa', cursive;
    * -> font-family: 'Didact Gothic', sans-serif;
    * -> font-family: 'Fira Code', monospace;
    * -> font-family: 'JetBrains Mono', monospace;
    * -> font-family: 'Klee One', cursive;
    * -> font-family: 'Merriweather', serif;
    * -> font-family: 'Montserrat', sans-serif;
    * -> font-family: 'Noto Sans', sans-serif;
    * -> font-family: 'Nunito', sans-serif;
    * -> font-family: 'Open Sans', sans-serif;
    * -> font-family: 'Questrial', sans-serif;
    * -> font-family: 'Raleway', sans-serif;
    * -> font-family: 'Roboto', sans-serif;
    * -> font-family: 'Rubik', sans-serif;
    * -> font-family: 'Shippori Antique', sans-serif;
    * -> font-family: 'Titillium Web', sans-serif;
    * -> font-family: 'Ubuntu', sans-serif;
    * -> font-family: 'Work Sans', sans-serif; 
    
    ****************************************************************************/
    const FONTS_OBJECTS = {
        Comfortaa: function () {
            document.getElementById("apnatext").style.fontFamily = 'Comfortaa, cursive';
            document.getElementById("current_font").innerHTML = `Comfortaa <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Comfortaa");

        },
        Didact_Gothic: function () {
            document.getElementById("apnatext").style.fontFamily = 'Didact Gothic, sans-serif';
            document.getElementById("current_font").innerHTML = `Didact Gothic <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Didact_Gothic");
        },
        Fira_Code: function () {
            document.getElementById("apnatext").style.fontFamily = 'Fira Code, monospace';
            document.getElementById("current_font").innerHTML = `Fira Code <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Fira_Code");
        },
        JetBrains_Mono: function () {
            document.getElementById("apnatext").style.fontFamily = 'JetBrains Mono, monospace';
            document.getElementById("current_font").innerHTML = `JetBrains Mono <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "JetBrains_Mono");
        },
        Klee_One: function () {
            document.getElementById("apnatext").style.fontFamily = 'Klee One, cursive';
            document.getElementById("current_font").innerHTML = `Klee One <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Klee_One");
        },
        Merriweather: function () {
            document.getElementById("apnatext").style.fontFamily = 'Merriweather, serif';
            document.getElementById("current_font").innerHTML = `Merriweather <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Merriweather");

        },
        Montserrat: function () {
            document.getElementById("apnatext").style.fontFamily = 'Montserrat, sans-serif';
            document.getElementById("current_font").innerHTML = `Montserrat <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Montserrat");
        },
        Noto_Sans: function () {
            document.getElementById("apnatext").style.fontFamily = 'Noto Sans, sans-serif';
            document.getElementById("current_font").innerHTML = `Noto Sans <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Noto_Sans");
        },
        Nunito: function () {
            document.getElementById("apnatext").style.fontFamily = 'Nunito, sans-serif';
            document.getElementById("current_font").innerHTML = `Nunito <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Nunito");
        },
        Open_Sans: function () {
            document.getElementById("apnatext").style.fontFamily = 'Open Sans, sans-serif';
            document.getElementById("current_font").innerHTML = `Open Sans <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Open_Sans");
        },
        Questrial: function () {
            document.getElementById("apnatext").style.fontFamily = 'Questrial, sans-serif';
            document.getElementById("current_font").innerHTML = `Questrial <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Questrial");
        },
        Raleway: function () {
            document.getElementById("apnatext").style.fontFamily = 'Raleway, sans-serif';
            document.getElementById("current_font").innerHTML = `Raleway <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Raleway");
        },
        Roboto: function () {
            document.getElementById("apnatext").style.fontFamily = 'Roboto, sans-serif';
            document.getElementById("current_font").innerHTML = `Roboto <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Roboto");
        },
        Rubik: function () {
            document.getElementById("apnatext").style.fontFamily = 'Rubik, sans-serif';
            document.getElementById("current_font").innerHTML = `Rubik <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Rubik");
        },
        Shippori_Antique: function () {
            document.getElementById("apnatext").style.fontFamily = 'Shippori Antique, sans-serif';
            document.getElementById("current_font").innerHTML = `Shippori Antique <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Shippori_Antique");
        },
        Titillium_Web: function () {
            document.getElementById("apnatext").style.fontFamily = 'Titillium Web, serif';
            document.getElementById("current_font").innerHTML = `Titillium Web <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Titillium_Web");
        },
        Ubuntu: function () {
            document.getElementById("apnatext").style.fontFamily = 'Ubuntu, serif';
            document.getElementById("current_font").innerHTML = `Ubuntu <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Ubuntu");
        },
        Work_Sans: function () {
            document.getElementById("apnatext").style.fontFamily = 'Work Sans, serif';
            document.getElementById("current_font").innerHTML = `Work Sans <i class="fas fa-chevron-down" id="font_arrow_chevron" onclick="Font_List()"></i>`;
            localStorage.setItem("TextStorm_Font_Preferences", "Work_Sans");
        }
    };