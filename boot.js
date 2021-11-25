    /***************************File*Header********************************** 
    
    * File Name: $textstorm.boot.sector.js
    *
    * JS Description: This JS File will boot TextStorm and init All the Things...
    *
    * Client Warnings:
    * Please don't change the file, it can harm your data, keep in mind this will not change the original source code
    
    ****************************************************************************/

    console.log("Welcome to TextStorm");
    let body = document.querySelector("body");
    let dark_mode_status_home = false;  // Keep Dark Mode Off in Desktop (Default)
    let dark_mode_status = false;   // Keep Dark Mode Off in Editor (Default)
    let dark_mode_btn_home = document.querySelector(".dark_mode_btn_home");
    let dark_mode_btn = document.querySelector(".dark_mode_btn");
    let fresh = new Audio("audio/startup.mp3");
    let success = new Audio("audio/save.mp3");
    let error_sound = new Audio("audio/error.mp3");

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

    function STARTUP_AFTER() {
        return new Promise(function (resolve) {

            // Changing DESKTOP Mode in last user preference Mode
            let mode = localStorage.getItem("TextStorm_Mode")
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
            let editor_mode = localStorage.getItem("TextStorm_Editor_Mode")
            if (editor_mode == "$dark") {
                dark_mode_btn.innerHTML = '<i class="far fa-sun"></i>';
                dark_mode_status = true;
                document.getElementById("editor").classList.toggle("dark_mode_active");
            } else if (editor_mode == "$light"){
                editor_mode.innerHTML = '<i class="far fa-moon"></i>';
                dark_mode_status = false;
                document.getElementById("editor").classList.remove("dark_mode_active");
            }


            // Changing EDITOR_FONT in last user preference Mode
            let editor_font = localStorage.getItem("TextStorm_Font_Preferences");
            try {  // Try that the preference actually exists or not
                FONTS_OBJECTS[editor_font]();
            } catch (error) {
                FONTS_OBJECTS["Questrial"]();  // If no preference or corrupted preference then shift to default 
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
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    document.getElementById("hide_while_other").style.visibility = "hidden";
                    document.getElementById("user_welcome").style.display = "none";
                    document.getElementById("STARTUP_SCREEN").style.display = "none";
                    document.getElementById("editor").style.display = "none";
                    document.getElementById("signup_wrapper").style.display = "block"; // SignUp Window would appear
                    localStorage.setItem("TextStorm_User", "Guest");
                    resolve_start();
                } else {
                    // Get the head tag
                    var head_ID = document.getElementsByTagName("head")[0];
                    // Create script element       
                    var script_element = document.createElement('script');
                    script_element.type = 'text/javascript';
                    script_element.id = 'my-test-script';
                    script_element.src = 'Js/TextStorm.js';
                    head_ID.appendChild(script_element);

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

                        document.getElementById("user_welcome").style.display = "flex";
                        user_welcome.innerHTML = user_first_name; //Changing user name
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
                            if (e.ctrlKey && e.keyCode == 'N'.charCodeAt(0)) {
                                newFile();
                            }
                        });

                        resolve_start();
                    });
                }
            });
        });
    }

    function STABILITY() {
        return new Promise(function (resolve) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    if (window.File && window.Blob && window.showOpenFilePicker) {
                        document.getElementById("editor").style.display = "flex";
                    } else {
                        const bypass_id = localStorage.getItem("$bypass_id");
                        if (bypass_id != "crack" || bypass_id == null) {
                            error_sound.play();
                            console.log("Unstable");
                            document.getElementById("in_error_id").style.display = "block";
                            document.getElementById("editor").style.display = "none";
                            document.getElementById("navbar").style.display = "none";
                        }
                    }
                }
            });
            fresh.play();
            resolve();
        });
    }

    function NOTIFICATION() {
        return new Promise(function (resolve) {
            let body_id;
            let title_id;
            const database = firebase.database();
            database.ref("Notification").once('value', function (snapshot) {
                body_id = snapshot.val().body;
                title_id = snapshot.val().title;
            });
            // create and show the notification
            const showNotification = () => {
                // create a new notification
                const notification = new Notification(title_id, {
                    body: body_id,
                    icon: "../Icon/textstorm.svg"
                });


                // close the notification after 10 seconds
                setTimeout(() => {
                    notification.close();
                }, 10000);

                // navigate to a URL when clicked
                notification.addEventListener('click', () => {
                    null
                });
            }

            // check notification permission
            // let granted = false;

            if (Notification.permission === 'granted') {
                var delayInMilliseconds = 5000; //10 second

                setTimeout(function () {
                    showNotification();
                    resolve();
                }, delayInMilliseconds);
            }
            else{
                resolve();
            }
        });
    }


    TEXTSTORM_STARTUP().then(STARTUP_AFTER).then(START).then(STABILITY).then(NOTIFICATION);



    // Checking for devices api for application stability
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        while (1 == 1) {
            alert("TextStorm is not available for mobile and tablets");
        }
    }

    try {
        var cache = localStorage.getItem("Cache");
        localStorage.setItem("Cache", cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + cache + "CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE_CACHE");
    } catch (error) {
        localStorage.removeItem("Cache")
    }



    // Core Functions which are every time needed
    // Navigation Bar FullScreen Button Function
    let full_screen_mode = false;
    btn.addEventListener("click", () => {
        if (full_screen_mode == false) {
            fresh.play()
            if (myDocument.requestFullscreen) {
                myDocument.requestFullscreen();
            } else if (myDocument.msRequestFullscreen) {
                myDocument.msRequestFullscreen();
            } else if (myDocument.mozRequestFullScreen) {
                myDocument.mozRequestFullScreen();
            } else if (myDocument.webkitRequestFullscreen) {
                myDocument.webkitRequestFullscreen();
            }
            btn.innerHTML = '<i class="fas fa-compress"></i>';
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
            btn.innerHTML = '<i class="fas fa-expand"></i>';
            full_screen_mode = false;
        }
    });

    /*dark_mode home*/
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

    function showTime() {
        let time = new Date();
        let hour = time.getHours();
        let min = time.getMinutes();
        am_pm = "AM";

        if (hour > 12) {
            hour -= 12;
            am_pm = "PM";
        }
        if (hour == 0) {
            hr = 12;
            am_pm = "AM";
        }

        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;

        let currentTime = hour + ":" +
            min + " " + am_pm;

        document.getElementById("clock")
            .innerHTML = currentTime;
    }
    showTime();


    // Checking the device width height is stable
    setInterval(() => {
        if (document.body.clientWidth < 710) {
            document.getElementById("error_id").style.display = "block";
        }
        if (document.body.clientHeight < 500) {
            document.getElementById("error_id").style.display = "block";
        }
    }, 1);


    setInterval(() => {
        document.getElementById("editor").style.minHeight = "220px";
        document.getElementById("editor").style.minWidth = "450px";
    }, 1);