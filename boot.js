/***************************File*Header********************************** 
 
* File Name: boot.js
*
* JS Description: This JS File will boot TextStorm and init All the Things...
*
* THE MOST IMPORTANT FILE FOR TEXTSTORM FOR STARTUP
 
****************************************************************************/

console.log("Welcome to TextStorm");

// GLOBAL VARIABLES

// Global Modes
let dark_mode_status_home = false; // Keep Dark Mode Off in Desktop (Default)
let dark_mode_status = false; // Keep Dark Mode Off in Editor (Default)

// Document Elements
let body = document.querySelector("body");
let dark_mode_btn_home = document.querySelector(".dark_mode_btn_home");
let dark_mode_btn = document.querySelector(".dark_mode_btn");
let fullscreen_mode_btn = document.querySelector(".fullscreen_mode_btn");

//Audio Load
let startup_audio = new Audio("audio/startup.mp3");
let success_audio = new Audio("audio/success.mp3");
let error_audio = new Audio("audio/error.mp3");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    alert("TextStorm is not stable for mobile and tablet devices");
    location.replace("about/about.html");
}

//$STARTUP
function TEXTSTORM_STARTUP() {
    document.getElementById("editor").style.display = "none"; // CSS with JS
    return new Promise(function (resolve) {
        document.getElementById("STARTUP_SCREEN_PARENT").style.display = "none";
        setTimeout(() => {
            document.getElementById("STARTUP_SCREEN_PARENT").style.display = "flex";
            setTimeout(() => {
                document.getElementById("welcome_loader").style.visibility = "visible";
                resolve();
            }, 1500);
        }, 1000);
    });
}

function SETTING() {
    return new Promise(function (resolve) {

        // Changing DESKTOP Mode in last user preference Mode
        let mode = localStorage.getItem("TextStorm_Mode");
        if (mode == "$dark") {
            dark_mode_status_home = true;
            body.classList.toggle('dark_mode_active_home');
            dark_mode_btn_home.innerHTML = '<i class="far fa-sun"></i>';
        } else if (mode == "$light") {
            dark_mode_status_home = false;
            body.classList.remove('dark_mode_active_home');
            dark_mode_btn_home.innerHTML = '<i class="far fa-moon"></i>';
        }

        // Changing EDITOR Mode in last user preference Mode
        let editor_mode = localStorage.getItem("TextStorm_Editor_Mode");
        if (editor_mode == "$dark") {
            dark_mode_btn.innerHTML = '<i class="far fa-sun"></i>';
            dark_mode_status = true;
            document.getElementById("editor").classList.toggle("dark_mode_active");
        } else if (editor_mode == "$light") {
            dark_mode_btn.innerHTML = '<i class="far fa-moon"></i>';
            dark_mode_status = false;
            document.getElementById("editor").classList.remove("dark_mode_active");
        }


        // Changing EDITOR_FONT in last user preference Mode
        let editor_font = localStorage.getItem("TextStorm_Font_Preferences");
        try { // Try that the preference actually exists or not
            FONTS_OBJECTS[editor_font]();
        } catch (error) {
            FONTS_OBJECTS["Questrial"](); // If no preference or corrupted preference then shift to default 
        }


        setTimeout(() => {
            document.getElementById("STARTUP_SCREEN").style.background = "transparent";
            setTimeout(() => {
                document.getElementById("welcome_loader").style.visibility = "hidden";
                resolve();
            }, 1000);
        }, 6000);
    });

}

var user_first_name;

function START() {
    return new Promise(function (resolve_start) {
        firebase.auth().onIdTokenChanged((user) => {
            if (!user) {
                document.getElementById("hide_while_other").style.visibility = "hidden";
                document.getElementById("user_welcome_button").style.visibility = "hidden";
                document.getElementById("STARTUP_SCREEN").style.display = "none";
                document.getElementById("editor").style.display = "none";
                document.getElementById("signup_wrapper").style.display = "block"; // SignUp Window would appear
                localStorage.setItem("TextStorm_User", "Guest");
            } else {
                // Get the head tag
                var head_ID = document.getElementsByTagName("head")[0];
                // Create script element       
                var script_element = document.createElement('script');
                script_element.type = 'text/javascript';
                script_element.id = 'my-test-script';
                script_element.src = 'Js/TextStorm.js';

                // Create script element       
                var script_element_two = document.createElement('script');
                script_element_two.type = 'text/javascript';
                script_element_two.id = 'my-test-script-two';
                script_element_two.src = 'Js/TextStorm_window.js';

                head_ID.appendChild(script_element_two);
                head_ID.appendChild(script_element);

                const database_ref = firebase.database();
                database_ref.ref("Users_Data/" + user.uid).on("value", function (snapshot) {
                    let user_name = snapshot.val().User; //Get user name
                    let user_email = snapshot.val().Email; //Get user email
                    let user_filename = snapshot.val().File_Data; // Get user file name
                    let user_data = snapshot.val().Data; //Get user text/notes data
                    let split_username = user_name.split(" "); // Splitting user name
                    user_first_name = split_username[0]; // Getting first name by removing last name  
                    localStorage.setItem("TextStorm_User", user_first_name);

                    document.getElementById("fileid").innerHTML = user_filename; //Changing file name
                    document.title = "TextStorm | " + user_filename; //Changing website tab title
                    document.getElementById("apnatext").value = user_data; //Changing text/notes data

                    document.getElementById("user_name_account").innerHTML = user_name;
                    document.getElementById("user_email_account").innerHTML = user_email;

                    document.getElementById("STARTUP_SCREEN").style.display = "none";
                    // ADD SHORTCUTS
                    window.addEventListener('keydown', e => {
                        if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
                            e.preventDefault();
                            saveText();
                        }
                        if (e.ctrlKey && e.keyCode == 'O'.charCodeAt(0)) {
                            e.preventDefault();
                            openFile();
                        }
                        if (e.altKey && e.keyCode == 'C'.charCodeAt(0)) {
                            myCopy();
                        }
                        if (e.altKey && e.keyCode == 'D'.charCodeAt(0)) {
                            e.preventDefault();
                            downloadText();
                        }
                        if (e.altKey && e.keyCode == 'N'.charCodeAt(0)) {
                            e.preventDefault();
                            newFile();
                        }
                    });

                    document.getElementById("editor").style.display = "flex";
                    resolve_start();
                });
            }
        });
    });
}

function STABILITY() {
    return new Promise(function (resolve) {
        firebase.auth().onIdTokenChanged((user) => {
            if (user) {
                if (window.File && window.Blob && window.showOpenFilePicker) {
                    console.log("TEXTSTORM IS STABLE IN YOUR BROWSER AS YOU ARE USING CHROME");
                } else {
                    const bypass_id = localStorage.getItem("$bypass_id");
                    if (bypass_id != "crack" || bypass_id == null) {
                        error_audio.play();
                        OPEN_WINDOW("in_error_id");
                        console.log("TEXTSTORM IS LITTLE UNSTABLE IN YOUR BROWSER AS YOU ARE USING FIREFOX/SAFARI/INTERNET EXPLORER");
                    }
                }

                setInterval(() => {
                    if (document.body.clientWidth < 620 || document.body.clientHeight < 510) {
                        OPEN_WINDOW("error_id");
                        document.getElementById("navbar").style.display = "none";
                    } else {
                        CLOSE_WINDOW("error_id");
                        document.getElementById("navbar").style.display = "flex";
                    }
                }, 1000);
            }
        });
        resolve();
    });
}

function STARTUP_NOTIFICATION() {
    return new Promise(function (resolve) {
        firebase.auth().onIdTokenChanged((user) => {
            if (user) {
                let body_id;
                let body_id_final;
                let title_id;
                let confetti;
                let startup_notification_time;
                const database = firebase.database();
                database.ref("Notification").once('value', function (snapshot) {
                    body_id = snapshot.val().body;
                    title_id = snapshot.val().title;
                    confetti = snapshot.val().confetti;
                    startup_notification_time = snapshot.val().time;
                    if (confetti == true) {
                        startit();
                        stopit();
                    }
                    setTimeout(function () {
                        let USER_NAME = localStorage.getItem("TextStorm_User");
                        if (body_id.includes("$USER_NAME")) {
                            body_id_final = body_id.replace("$USER_NAME", USER_NAME);
                        } else {
                            body_id_final = body_id;
                        }
                        TEXTSTORM_NOTIFICATION_SHOW(null, title_id, body_id_final, startup_notification_time, "startup");
                        resolve();

                    }, 3000);
                });
            }
        });
    });
}

TEXTSTORM_STARTUP().then(SETTING).then(START).then(STABILITY).then(STARTUP_NOTIFICATION);


// Confetti Functions initialize !
const startit = () => {
    setTimeout(function () {
        confetti.start();
    }, 1000);
};

const stopit = () => {
    setTimeout(function () {
        confetti.stop();
    }, 3000);
};


// Keeping Limit Function in boot as it would be required while boot
function limitText(id, limitNum) {
    if (id.value.length > limitNum) {
        id.value = id.value.substring(0, limitNum);
    }
}



// CORE FUNCTIONS
// Navigation Bar FullScreen Button Function
let myDocument = document.documentElement;
let full_screen_mode = false;
fullscreen_mode_btn.addEventListener("click", () => {
    if (full_screen_mode == false) {
        if (myDocument.requestFullscreen) {
            myDocument.requestFullscreen();
        } else if (myDocument.msRequestFullscreen) {
            myDocument.msRequestFullscreen();
        } else if (myDocument.mozRequestFullScreen) {
            myDocument.mozRequestFullScreen();
        } else if (myDocument.webkitRequestFullscreen) {
            myDocument.webkitRequestFullscreen();
        }
        fullscreen_mode_btn.innerHTML = '<i class="fas fa-compress"></i>';
        full_screen_mode = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msexitFullscreen) {
            document.msexitFullscreen();
        } else if (document.mozexitFullscreen) {
            document.mozexitFullscreen();
        } else if (document.webkitexitFullscreen) {
            document.webkitexitFullscreen();
        }
        fullscreen_mode_btn.innerHTML = '<i class="fas fa-expand"></i>';
        full_screen_mode = false;
    }
});

// Navigation Bar Dark Mode Button Function
dark_mode_btn_home.addEventListener("click", function () {
    body.classList.toggle("dark_mode_active_home");
    if (dark_mode_status_home == false) {
        dark_mode_btn_home.innerHTML =
            '<i class="far fa-sun"></i>';
        dark_mode_status_home = true;
        localStorage.setItem("TextStorm_Mode", "$dark");
    } else {
        dark_mode_btn_home.innerHTML =
            '<i class="far fa-moon"></i>';
        dark_mode_status_home = false;
        localStorage.setItem("TextStorm_Mode", "$light");
    }
});


// $BACKGROUND PROCESSES
// Time Function
setInterval(showTime, 1000);

if (navigator.getBattery) {
    setInterval(showBattery, 1000);
}
else {
    document.getElementById("battery_indicator_button").style.display = "none";
    document.getElementById("battery_level_indication_int").style.display = "none";
}

function showTime() {
    let var_date = new Date();
    let hour = var_date.getHours();
    let min = var_date.getMinutes();
    am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    const weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    let current_day = weekday[var_date.getDay()];

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;

    let currentTime = hour + ":" +
        min + " " + am_pm;

    document.getElementById("clock")
        .innerHTML = `<b>` + current_day + `</b>` + "&nbsp;" + currentTime;
}
showTime();

function showBattery() {
    navigator.getBattery()
        .then(function (battery) {

            // Icon Battery Indicator Conditions
            let battery_ico = document.getElementById("battery_indicator_button");
            if (battery.level > 0.94) {
                battery_ico.innerHTML = `<i class="fas fa-battery-full"></i>`;
            }
            else if (battery.level < 0.96 && battery.level > 0.69) {
                battery_ico.innerHTML = `<i class="fas fa-battery-three-quarters"></i>`;
            }
            else if (battery.level < 0.71 && battery.level > 0.29) {
                battery_ico.innerHTML = `<i class="fas fa-battery-half"></i>`;
            }
            else if (battery.level < 0.31 && battery.level > 0.09) {
                battery_ico.innerHTML = `<i class="fas fa-battery-quarter"></i>`;
            }
            else if (battery.level < 0.11) {
                battery_ico.innerHTML = `<i class="fas fa-battery-empty"></i>`;
            }

            // Numerical Battery Indicator Conditions
            let battery_exclude_decimal = (battery.level * 100).toString();
            document.getElementById("battery_level_indication_int").innerHTML = `${battery_exclude_decimal}%`;
        });
}