console.log("Welcome to TextStorm");

// getting few global variables
let myDocument = document.documentElement;
let UserData = localStorage.getItem("User's Data");
let FileData = localStorage.getItem("File Name");
let edit_button = document.getElementById("editbutton");
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

if ((UserVerification == "$verified$") && (!(UserVerification == null))) {
    if (!((UserIdVerification == null) || (UserIdVerification == "")) && !((UserNameVerification == null) || (UserNameVerification == ""))) {
        unlimited.removeAttribute("onKeyDown");
        unlimited.removeAttribute("onKeyUp");
        const database_user_name = firebase.database();
        database_user_name.ref("Users_Data/" + UserIdVerification).on('value', function (snapshot) {
            let user_database = snapshot.val().User;
            localStorage.setItem("User_Name", user_database);
        });
    }
    else{
        alert("Please don't try to hack/crash the application...");
        alert("Your data will be vulnerable or leaked to all...");
        alert("For Recovering the application to real start, you need to do what we are telling");
        validation_mess();
    }
}

if ((UserIdVerification == null) || (UserIdVerification == "")) {
    anonymous_id = makeid(8);
    localStorage.setItem("User_Id", anonymous_id);
    localStorage.removeItem("$verfication");
}

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

if (UserData == "" || UserData == null) {
    document.getElementById("apnatext").value = "Write your text here";
} else {
    // document.getElementById("apnatext").value = UserData;          //temp
    const database = firebase.database();
    database.ref("Users_Data/" + UserIdVerification).on('value', function (snapshot) {
        document.getElementById("apnatext").value = snapshot.val().Data;
    });
}

// Limitting Text Function for Anonymous onclick(ok button)
function validation_mess() {
	// alert("You have consumed non-verified user (anonymous) Usage, now you have to verify yourself for writing unlimited notes/texts in TextStorm");
	userproduct = prompt("Enter your name:");
	if (!((userproduct == null) || (userproduct == ""))) {
		userpass = prompt("Create an unique id/password for your username:");
		if (!((userpass == null) || (userpass == ""))) {
			unlimited.removeAttribute("onKeyDown");
			unlimited.removeAttribute("onKeyUp");
			alert("You are now an verified user...");
			// Get a reference to the database service
			var database = firebase.database();
			let client_text = document.getElementById("apnatext").value;   //getting text from client to server
			let filecontent = document.getElementById("fileid").innerHTML;
			let data = {
				User: userproduct,
				Password: userpass,
				Data: client_text,
				File_Data: filecontent
			}
			var ref = database.ref("Users_Data/" + userpass);
			ref.set(data);
			console.log("Hello " + userproduct)
			let errordump = document.getElementById("error_id");
			errordump.style.display = "none";
			localStorage.setItem("$verfication", "$verified$");
			localStorage.setItem("User_Id", userpass);
			localStorage.setItem("User_Name", userproduct);
		}
	}
	// else if (userproduct != ""){
	//   unlimited.removeAttribute("onKeyDown");
	//   unlimited.removeAttribute("onKeyUp");
	//   alert("You are now an verified user...");
	// }
}

// Save Button Function
function saveText() {
    let ifConnected = window.navigator.onLine;
    if (ifConnected) {
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
