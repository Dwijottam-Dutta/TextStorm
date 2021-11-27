/***************************File*Header********************************** 
 * File Name: TextStorm_fonts.js
 *
 * JS Description: This JS File contains all functions of TextStorm 
 *                 Custom Notification...
 *
 * MASTERPIECE !
 *************************************************************************/

function TEXTSTORM_NOTIFICATION_SHOW(icon, title, msg, time, audio_type) {
    return new Promise(function (resolve) {
        TEXTSTORM_NOTIFICATION_HIDE();
        let NOTIFICATION_ACCESS = localStorage.getItem("TextStorm_Notification_Access");
        if (NOTIFICATION_ACCESS == null || NOTIFICATION_ACCESS == "yes") {
            setTimeout(() => {
                if (icon != null) {
                    document.getElementById('notification_ico').src = icon;
                }
                document.getElementById('notification_title').innerHTML = title;
                document.getElementById('notification_msg').innerHTML = msg;
                document.getElementById('notification').classList.add("show");
                document.getElementById('notification').classList.remove("hide");
                document.getElementById('notification').classList.add("showNotification");
                if (audio_type == "error") {
                    error_audio.play();
                } else if (audio_type == "startup"){
                    startup_audio.play();
                }
                else if (audio_type == "success"){
                    success_audio.play();
                }
                else{
                    success_audio.play();
                }

                setTimeout(() => {
                    TEXTSTORM_NOTIFICATION_HIDE();
                    resolve();
                }, time);

            }, 2500);
        } else if (NOTIFICATION_ACCESS == "no") {
            resolve();
        }
    });
};

function TEXTSTORM_NOTIFICATION_HIDE() {
    document.getElementById('notification').classList.remove("show");
    document.getElementById('notification').classList.add("hide");
}