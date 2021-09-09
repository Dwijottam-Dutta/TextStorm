console.log("Welcome to TextStorm");

// getting few global variables
let myDocument = document.documentElement;
let UserData = localStorage.getItem("User's Data");
let FileData = localStorage.getItem("File Name");
let edit_button = document.getElementById("editbutton");
let user_welcome = document.getElementById("user_welcome");
let UserVerification = localStorage.getItem("$verfication");
let UserIdVerification = localStorage.getItem("User_Id");
let UserNameVerification = localStorage.getItem("User_Name");
let unlimited = document.getElementById("apnatext");
let btn = document.getElementById("btn");

// getting some css & html done with javascript           LOL
document.getElementById("apnatext").disabled = true;
edit_button.innerHTML = document.write = '<i class="far fa-pencil-square-o" id="icon"></i>';

// StartUp Logic Begins...


// Make random text from anonymous users
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

// SECURITY LAYERS (starts here while user directly enters TextEditor)

// Details: While it is verified check that id id null or not, if not then check that the id is available or not
if ((UserVerification == "$verified$") && (!(UserVerification == null))) {
    document.getElementById("loader").style.display = "block";
    if (!((UserIdVerification == null) || (UserIdVerification == "")) && !((UserNameVerification == null) || (UserNameVerification == ""))) {
        const database_ref = firebase.database().ref();  //different because ref added means refernce
        database_ref.child("Users_Data").orderByChild("Password").once("value", function (snapshot) {
            let snap_val = snapshot.val(); // on newer SDKs, this may be snapshot.key
            var keys = Object.keys(snap_val);
            //
            if (keys.includes(UserIdVerification)) {
                unlimited.removeAttribute("onKeyDown");
                unlimited.removeAttribute("onKeyUp");
                const database_user_name = firebase.database();
                database_user_name.ref("Users_Data/" + UserIdVerification).on('value', function (snapshot) {
                    let user_database = snapshot.val().User;
                    let user_filedata = snapshot.val().File_Data;
                    let user_data = snapshot.val().Data;
                    let final = user_database.split(' ');
                    let last_final = final[0]
                    user_welcome.innerHTML = "Welcome "+ last_final;
                    localStorage.setItem("User_Name", user_database);
                    localStorage.setItem("User's Data", user_data);
                    localStorage.setItem("File Name", user_filedata);
                    document.getElementById("loader").style.display = "none";
                });
            }
            else {
                localStorage.clear();
                alert("You are signed out...");
                validation_mess();
            }
        });

    }
    else {
        localStorage.clear();
        validation_mess();
    }

}

// Details: If id is null by any chance, clear local storage
if ((UserIdVerification == null) || (UserIdVerification == "")) {
    validation_mess();
    localStorage.clear();
}

if ((UserVerification == null) || (UserVerification == "") || (UserVerification != "$verified$")) {
    validation_mess();
}

// Details: If the id is not null check that the user id is their in database or not, if not kick the user out
if (!((UserIdVerification == null) || (UserIdVerification == ""))) {
    const database_ref = firebase.database().ref();  //different because ref added means refernce
    database_ref.child("Users_Data").orderByChild("Password").once("value", function (snapshot) {
        let snap_val = snapshot.val(); // on newer SDKs, this may be snapshot.key
        var keys = Object.keys(snap_val);
        //
        if (keys.includes(UserIdVerification)) {
            null
            return true;
        }
        else {
            localStorage.clear();
            alert("You are kicked out...");
            validation_mess();
        }
    });

}


// Default Value for file name
if (FileData == null || FileData == "") {
    document.getElementById("fileid").innerHTML = "Untitled.txt";
} else {
    // document.getElementById("fileid").innerHTML = FileData;        //temp
    const database = firebase.database();
    database.ref("Users_Data/" + UserIdVerification).on('value', function (snapshot) {
        document.getElementById("fileid").innerHTML = snapshot.val().File_Data;
    });
    document.title = "Textstorm | " + FileData;
}


// Default Value for Text
if (UserData == "" || UserData == null) {
    document.getElementById("apnatext").value = "Write your text here...";
} else {
    // document.getElementById("apnatext").value = UserData;          //temp
    const database = firebase.database();
    database.ref("Users_Data/" + UserIdVerification).on('value', function (snapshot) {
        document.getElementById("apnatext").value = snapshot.val().Data;
    });
}

// Limitting Text Function for Anonymous onclick(ok button)
function validation_mess() {
    let errordump = document.getElementById("error_id");
    errordump.style.display = "none";
    window.location.replace("index.html");
    // if (!((userpass == null) || (userpass == ""))) {
    // 	unlimited.removeAttribute("onKeyDown");
    // 	unlimited.removeAttribute("onKeyUp");
    // 	alert("You are now an verified user...");
    // 	// Get a reference to the database service
    // 	var database = firebase.database();
    // 	let data = {
    // 		User: userproduct,
    // 		Password: userpass,
    // 	}
    // 	var ref = database.ref("Users_Data/" + userpass);
    // 	ref.set(data);
    // 	console.log("Hello " + userproduct)
    // 	let errordump = document.getElementById("error_id");
    // 	errordump.style.display = "none";
    // 	localStorage.setItem("$verfication", "$verified$");
    // 	localStorage.setItem("User_Id", userpass);
    // 	localStorage.setItem("User_Name", userproduct);
    // }
}

// Save Button Function
function saveText() {
    let ifConnected = window.navigator.onLine;
    if (ifConnected) {
        const database_ref = firebase.database().ref();  //different because ref added means refernce
        database_ref.child("Users_Data").orderByChild("Password").once("value", function (snapshot) {
            let snap_val = snapshot.val(); // on newer SDKs, this may be snapshot.key
            var keys = Object.keys(snap_val);
            //
            if (keys.includes(UserIdVerification)) {

                // If id matches with database then .............................................
                let filecontent = document.getElementById("fileid").innerHTML;
                let content = document.getElementById("apnatext").value;
                let ver = localStorage.getItem("User_Id");

                localStorage.setItem("User's Data", content);
                localStorage.setItem("File Name", filecontent);
                document.title = "Textstorm | " + filecontent;
                let errordump = document.getElementById("message_id");
                errordump.style.display = "flex";
                var database = firebase.database();   //getting text from client to server
                let data = {
                    Data: content,
                    File_Data: filecontent
                }
                var ref = database.ref("Users_Data/" + ver);
                ref.update(data);

            }
            else {
                localStorage.clear();
                alert("You are kicked out...");
                validation_mess();
            }
        });
    } else {
        alert('Connection not available, please connect to the Internet and retry !');
    }
}

// Rename Button Function
function renameFile() {
    let extractname = prompt("Enter your file name: ", 'TextStorm_Untitled');
    if (extractname != null) {
        let storage = extractname + ".txt";
        document.getElementById("fileid").innerHTML = storage;
        document.title = "Textstorm | " + storage;
    }
}

btn.addEventListener("click", () => {
    if (btn.value == '<i class="fas fa-expand"></i>') {
        if (myDocument.requestFullscreen) {
            myDocument.requestFullscreen();
        }
        else if (myDocument.msRequestFullscreen) {
            myDocument.msRequestFullscreen();
        }
        else if (myDocument.mozRequestFullScreen) {
            myDocument.mozRequestFullScreen();
        }
        else if (myDocument.webkitRequestFullscreen) {
            myDocument.webkitRequestFullscreen();
        }
        btn.value = '<i class="fas fa-compress"></i>';
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msexitFullscreen) {
            document.msexitFullscreen();
        }
        else if (document.mozexitFullscreen) {
            document.mozexitFullscreen();
        }
        else if (document.webkitexitFullscreen) {
            document.webkitexitFullscreen();
        }
        btn.value = '<i class="fas fa-expand"></i>';
    }
});


/*dark_mode editor*/
let dark_mode_btn = document.querySelector('.dark_mode_btn');
let dark_mode_status = false;
dark_mode_btn.addEventListener('click', function () {
    body_editor.classList.toggle('dark_mode_active');
    if (dark_mode_status == false) {
        dark_mode_btn.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
        dark_mode_status = true;
    } else {
        dark_mode_btn.innerHTML = '<i class="far fa-moon-o" aria-hidden="true"></i>';
        dark_mode_status = false;
    }
});

/*dark_mode home*/
let dark_mode_btn_home = document.querySelector('.dark_mode_btn_home');
let body = document.querySelector('body');
let dark_mode_status_home = false;
dark_mode_btn_home.addEventListener('click', function () {
    body.classList.toggle('dark_mode_active_home');
    if (dark_mode_status_home == false) {
        dark_mode_btn_home.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i> Light Theme';
        dark_mode_status_home = true;
    } else {
        dark_mode_btn_home.innerHTML = '<i class="far fa-moon-o" aria-hidden="true"></i> Dark Theme';
        dark_mode_status_home = false;
    }
});

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("body").addClass("non");
}
else {
    null
}
