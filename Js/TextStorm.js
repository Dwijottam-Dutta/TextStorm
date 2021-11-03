// getting few global variables
let myDocument = document.documentElement;
let UserData = localStorage.getItem("User's Data");
let FileData = localStorage.getItem("File Name");
let edit_button = document.getElementById("editbutton");
let user_welcome = document.getElementById("user_welcome");
let unlimited = document.getElementById("apnatext");
let file_menu_parent = document.getElementById("file_menu_parent");
let file_dropdown = document.getElementById("file_dropdown");
let btn = document.getElementById("btn");


// TEXTSTORM $ROOT FUNCTIONS FROM NAVBAR TO OPTIMIZATIONS

// Event for checking and doing the Worker; That File Dropdown is on/off or not
let file_dropdown_on = false;
file_menu_parent.addEventListener("click", () => {
    if (file_dropdown_on) {
        file_dropdown.style.display = "none"
        file_dropdown_on = false;
    } else {
        file_dropdown.style.display = "flex"
        file_dropdown_on = true;
    }
})

function newFile() {
    document.getElementById("message_id_three").style.display = "flex";
}


function downloadText() {
    let filecontent = document.getElementById("fileid").innerHTML;
    let content = document.getElementById("apnatext").value;
    const blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, filecontent);
}

function openFile() {
    const pickerOpts = {
        types: [{
            description: 'Text',
            accept: {
                'text/*': ['.txt']
            }
        }, ],
        excludeAcceptAllOption: true,
        multiple: false
    };

    async function getTheFile() {
        // open file picker
        [fileHandle] = await window.showOpenFilePicker(pickerOpts);

        // get file contents
        const fileData = await fileHandle.getFile();
        const fileText = await fileData.text();
        document.getElementById("apnatext").value = fileText;
        document.getElementById("fileid").innerHTML = "Untitled.txt";
    }
    getTheFile()
}

// File Menu Save Button Function
function saveText() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let filecontent = document.getElementById("fileid").innerHTML;
                let content = document.getElementById("apnatext").value;
                let user_details_updating = {
                    Data: content,
                    File_Data: filecontent,
                };
                firebase
                    .database()
                    .ref("Users_Data/" + user.uid)
                    .update(user_details_updating)
                    .catch((error) => {
                        console.log("Something went wrong");
                    });
                let errordump = document.getElementById("message_id");
                errordump.style.display = "flex";
            }
        });
}

// Copy Text
function myCopy() {
	let copyText = document.getElementById("apnatext").value;
	navigator.clipboard.writeText(copyText);
}

// Navigation Bar FullScreen Button Function
let full_screen_mode = false;
btn.addEventListener("click", () => {
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
let dark_mode_btn_home = document.querySelector(".dark_mode_btn_home");
let body = document.querySelector("body");
let dark_mode_status_home = false;
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


window.addEventListener('keydown', e => {
    if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
        e.preventDefault();
        saveText();
    }
    if(e.ctrlKey && e.keyCode == 'O'.charCodeAt(0)){
        e.preventDefault();
        openFile();
    }
    if(e.altKey && e.keyCode == 'C'.charCodeAt(0)){
        myCopy();
    }
    if(e.ctrlKey && e.keyCode == 'N'.charCodeAt(0)){
        newFile();
    }
});


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