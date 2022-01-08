/***************************File*Header********************************** 

* File Name: TextStorm.js
*
* JS Description: This JS File contains TextStorm 2nd Major Functions which
*                 are in navbar and desktop...
*
* IMPORTANT: This file gets loaded after successful boot of TextStorm
*            due to console security reasons

****************************************************************************/

// getting few global variables
let file_menu_parent = document.getElementById("file_menu_parent");
let file_dropdown = document.getElementById("file_dropdown");


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
    OPEN_WINDOW("message_id_three");
}

function newFile_after_Download() {
    firebase.auth().onIdTokenChanged((user) => {
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
                    TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm File System", error, 10000, "error");
                });
        }
    });
    CLOSE_WINDOW("message_id_three");
    if (window.navigator.onLine) {
        TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm File System", "New File has been created successfully...", 10000, "success");
    } else {
        TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm File System", "Can't create a new file on Cloud... Please make sure that you have a stable internet connection for saving your file", 20000, "error")
    }
};

function newFile_no_Download() {
    firebase.auth().onIdTokenChanged((user) => {
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
                    TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm File System", error, 10000, "error");
                });
            CLOSE_WINDOW("message_id_three");
            if (window.navigator.onLine) {
                TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm File System", "New File has been created successfully...", 10000, "success");
            } else {
                TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm File System", "Can't create a new file on Cloud... Please make sure that you have a stable internet connection for saving your file", 20000, "error")
            }
        }
    });
};


function downloadText() {
    firebase.auth().onIdTokenChanged((user) => {
        if (user) {
            let filecontent = document.getElementById("fileid").innerHTML;
            let content = document.getElementById("apnatext").value;
            const blob = new Blob([content], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(blob, filecontent);
            TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm File System", "Downloaded your file in your local system, it is saved on your Desktop, or the directory you have chosen in the prompt", 20000, "success");
        }
    });
};

function openFile() {
    const pickerOpts = {
        types: [{
            description: 'Text',
            accept: {
                'text/*': ['.txt']
            }
        },],
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
    getTheFile();
};

// File Menu Save Button Function
function saveText() {
    function saveText_process() {
        return new Promise(function (resolve) {
            firebase.auth().onIdTokenChanged((user) => {
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
            if (window.navigator.onLine) {
                OPEN_WINDOW("message_id");
            } else {
                TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm File System", "Can't Save File on Cloud... Please make sure that you have a stable internet connection for saving your file", 20000, "error")
            }
            resolve();
        });
    };

    saveText_process().then(saveText_done);
};

// Copy Text
function myCopy() {
    let copyText = document.getElementById("apnatext").value;
    navigator.clipboard.writeText(copyText);
};