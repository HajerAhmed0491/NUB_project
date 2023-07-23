document.addEventListener("DOMContentLoaded", function() {
    let userID = localStorage.getItem('userID');

    let studentData = new XMLHttpRequest();
    studentData.open("GET", "https://ilms.esol.dev/api/Students/" + userID);
    studentData.send();
    studentData.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let stData = JSON.parse(this.responseText);

            var stuName = document.getElementById('studentName');
            stuName.value = stData.studentName;

            var stuID = document.getElementById('studentCode');
            stuID.value = stData.studentCode;

            var stuEmail = document.getElementById('studentEmail');
            stuEmail.value = stData.studentEmail;

            var stuPhone = document.getElementById('studentPhone');
            stuPhone.value = stData.studentPhone;

            var stuImg = document.getElementById('studentImage');
            stuImg.setAttribute("src", '/dist/img/profile_imags/' + stData.studentImage);
            stuImg.value = stData.studentImage;

            var orgStuImgs = document.getElementsByClassName('advanced-uploader');

            for (var i = 0; i < orgStuImgs.length; i++) {
            var orgStuImg = orgStuImgs[i];
            orgStuImg.style.backgroundImage = 'url(/dist/img/profile_imags/' + stData.studentImage + ')';
            }

            let userData = new XMLHttpRequest();
            userData.open("GET", "https://ilms.esol.dev/api/Users/" + userID);
            userData.send();
            userData.onreadystatechange = function() {
                if (userData.readyState == 4 && userData.status == 200) {
                    let stUserData = JSON.parse(userData.responseText);
                    var stuUserName = document.getElementById('userNme');
                    stuUserName.value = stUserData.userNme;
                    
                    var stuPass = document.getElementById('password');
                    stuPass.value = stUserData.password;
                }
            };
        }
    };

    // var form = document.querySelector('form');
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();

    //     var updatedStudentData = {
    //         id: userID,
    //         studentName: document.getElementById('studentName').value,
    //         studentCode: document.getElementById('studentCode').value,
    //         studentImage: document.getElementById('studentImage').value,
    //         studentEmail: document.getElementById('studentEmail').value,
    //         studentPhone: document.getElementById('studentPhone').value
    //     };


    //     fetch("https://ilms.esol.dev/api/Students/" + userID, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(updatedStudentData)
    //         })
    //         .then(response => {
    //         if (response.ok) {
    //             console.log("Student data updated successfully.");
    //         } else {
    //             console.error("Failed to update student data. Error status:", response.status);
    //         }
    //         })
    //         .catch(error => {
    //         console.error("An error occurred while updating student data:", error);
    //         });

    //     var updatedUserData = {
    //         userNme: document.getElementById('username').value,
    //         password: document.getElementById('password').value,
    //     };
        
    //     fetch("https://ilms.esol.dev/api/Users/" + userID, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(updatedUserData)
    //         })
    //         .then(response => {
    //         if (response.ok) {
    //             console.log("Student data updated successfully.");
    //         } else {
    //             console.error("Failed to update student data. Error status:", response.status);
    //         }
    //         })
    //         .catch(error => {
    //         console.error("An error occurred while updating student data:", error);
    //         });
    // });
});

