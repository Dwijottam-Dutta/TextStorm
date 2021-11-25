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
});

function newFile() {
    document.getElementById("message_id_three").style.display = "flex";
}

function newFile_after_Download() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            downloadText();
            let user_details_updating = {
                Data: "Write your text here...",
                File_Data: "Untitled_New.txt",
            };
            firebase
                .database()
                .ref("Users_Data/" + user.uid)
                .update(user_details_updating)
                .catch((error) => {
                    alert(error);
                });
        }
    });
    newFileClose();
};

function newFile_no_Download() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let user_details_updating = {
                Data: "Write your text here...",
                File_Data: "Untitled_New.txt",
            };
            firebase
                .database()
                .ref("Users_Data/" + user.uid)
                .update(user_details_updating)
                .catch((error) => {
                    alert(error);
                });
        }
    });
    newFileClose();
};


function downloadText() {
    let filecontent = document.getElementById("fileid").innerHTML;
    let content = document.getElementById("apnatext").value;
    const blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, filecontent);
};

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
};

// File Menu Save Button Function
function saveText() {
    document.getElementById("message_id").style.zIndex = "3"

    function saveText_process() {
        return new Promise(function (resolve) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    let filecontent = document.getElementById("fileid").innerHTML;
                    let content = document.getElementById("apnatext").value;
                    let user_details_updating = {
                        Data: content,
                        File_Data: filecontent
                    };
                    firebase
                        .database()
                        .ref("Users_Data/" + user.uid)
                        .update(user_details_updating)
                        .catch((error) => {
                            console.log("Something went wrong");
                        });
                    resolve();
                }
            });
        });
    };

    function saveText_done() {
        return new Promise(function (resolve) {
            document.getElementById("message_id").style.display = "flex";
            success.play();
        });
    };

    saveText_process().then(saveText_done);
};

// Copy Text
function myCopy() {
    let copyText = document.getElementById("apnatext").value;
    navigator.clipboard.writeText(copyText);
};