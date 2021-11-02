    /***************************File*Header********************************** 
    
    * File Name: $textstorm.boot.sector.js
    *
    * JS Description: This JS File will boot TextStorm and init All the Things...
    *
    * Client Warnings:
    * Please don't change the file, it can harm your data, keep in mind this will not change the original source code
    
    ****************************************************************************/

    console.log("Welcome to TextStorm");

    //$STARTUP
    function TEXTSTORM_STARTUP() {
        document.getElementById("editor").style.display = "none"; // CSS with JS
        return new Promise(function (resolve) {
            document.getElementById("STARTUP_SCREEN_PARENT").style.display = "none";
            setTimeout(() => {
                document.getElementById("STARTUP_SCREEN_PARENT").style.display = "flex";
                resolve();
            }, 1000);
        });
    }

    function STARTUP_AFTER() {
        return new Promise(function (resolve) {
            setTimeout(() => {
                document.getElementById("STARTUP_SCREEN").style.background = "transparent";
                resolve();
            }, 5000);
        });

    }

    function START() {
        return new Promise(function (resolve_start) {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    document.getElementById("hide_while_other").style.visibility = "hidden";
                    document.getElementById("user_welcome").style.display = "none";
                    document.getElementById("STARTUP_SCREEN").style.display = "none";
                    document.getElementById("editor").style.display = "none";
                    document.getElementById("signup_wrapper").style.display = "block"; // SignUp Window would appear
                } else {
                    const database_ref = firebase.database();
                    database_ref.ref("Users_Data/" + user.uid).on("value", function (snapshot) {
                        let user_name = snapshot.val().User; //Get user name
                        let user_email = snapshot.val().Email; //Get user email
                        let user_filename = snapshot.val().File_Data; // Get user file name
                        let user_data = snapshot.val().Data; //Get user text/notes data
                        let split_username = user_name.split(" "); // Splitting user name
                        let user_first_name = split_username[0]; // Getting first name by removing last name    

                        document.getElementById("user_welcome").style.display = "flex";
                        user_welcome.innerHTML = user_first_name; //Changing user name
                        document.getElementById("fileid").innerHTML = user_filename; //Changing file name
                        document.title = "TextStorm | " + user_filename; //Changing website tab title
                        document.getElementById("apnatext").value = user_data; //Changing text/notes data

                        document.getElementById("user_name_account").innerHTML = user_name;
                        document.getElementById("user_email_account").innerHTML = user_email;

                        document.getElementById("STARTUP_SCREEN").style.display = "none";
                        document.getElementById("editor").style.display = "flex";
                        // JS API STABILITY CHECK
                        if (window.File && window.Blob && window.showOpenFilePicker) {
                            // Great success! All the File APIs are supported.
                        } else {
                            const bypass_id = localStorage.getItem("$bypass_id");
                            if (bypass_id != "crack" || bypass_id == null) {
                                console.log("Unstable");
                                document.getElementById("in_error_id").style.display = "block";
                                document.getElementById("editor").style.display = "none";
                                document.getElementById("navbar").style.display = "none";
                            }
                        }
                    });
                }
            });
            mode = localStorage.getItem("TextStorm_Mode")
            if (mode == "$dark") {
                dark_mode_status_home = true;
                body.classList.toggle('dark_mode_active_home');
                dark_mode_btn_home.innerHTML = '<i class="far fa-sun"></i>';
            } else if (mode == "$light") {
                dark_mode_status_home = false;
                body.classList.remove('dark_mode_active_home');
                dark_mode_btn_home.innerHTML = '<i class="far fa-moon"></i>';
            }
            let startup_sound = new Audio("/audio/startup.mp3");
            startup_sound.play();
            resolve_start();
        });
    }

    
    TEXTSTORM_STARTUP().then(STARTUP_AFTER).then(START);



    // Checking for devices api for application stability
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        while(1 == 1){
            alert("TextStorm is not avalaible for mobile and tablets");
        }
    }

    setInterval(() => {
        if (document.body.clientWidth < 710) {
            document.getElementById("error_id").style.display = "block";
        }
        if (document.body.clientHeight < 500) {
            document.getElementById("error_id").style.display = "block";
        }

    }, 1);

    // create and show the notification
    const showNotification = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const database_ref = firebase.database();
                database_ref.ref("Users_Data/" + user.uid).on("value", function (snapshot) {
                    let user_name_first = snapshot.val().User; //Get user name
                    let split_username = user_name_first.split(" "); // Splitting user name
                    let USER_NAME = split_username[0]; // Getting first name by removing last name 

                    const database = firebase.database();
                    database.ref("Notification").on('value', function (snapshot) {
                        let body_id = snapshot.val().body;
                        let title_id = snapshot.val().title;
                        let body_id_final;
                        if (body_id.includes("$USER_NAME")) {
                            body_id_final = body_id.replace("$USER_NAME", USER_NAME);
                        } else {
                            body_id_final = body_id;
                        }
                        // create a new notification
                        const notification = new Notification(title_id, {
                            body: body_id_final,
                            icon: "Icon/textstorm.svg"
                        });


                        // close the notification after 10 seconds
                        setTimeout(() => {
                            notification.close();
                        }, 10000);

                        // navigate to a URL when clicked
                        notification.addEventListener('click', () => {
                            null
                        });
                    });
                });

            }
        });



    }

    // show an error message
    const showError = () => {

    }

    // check notification permission
    // let granted = false;

    if (Notification.permission === 'granted') {
        var delayInMilliseconds = 5000; //10 second

        setTimeout(function () {
            showNotification();
            console.log("NOTIFICATION");
        }, delayInMilliseconds);
    }