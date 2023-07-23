function checkLogin() {
    let userLogin = new XMLHttpRequest();
    userLogin.open("GET", "https://ilms.esol.dev/api/Users");
    userLogin.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let userData = JSON.parse(this.responseText);
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            let foundUser = false;
            for (let i = 0; i < userData.length; i++) {
                const loginData = userData[i];
                if (username === loginData.userNme && password === loginData.password) {
                    foundUser = true;                    
                    if (loginData.userTypeID == 4) {
                        let getUserID = new XMLHttpRequest();
                        getUserID.open("GET", "https://ilms.esol.dev/api/Students");
                        getUserID.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let userDataID = JSON.parse(this.responseText);
                            for (let i = 0; i < userDataID.length; i++) {
                                const loginDataID = userDataID[i];
                                if (loginDataID.studentCode === username) {
                                    let userID = loginDataID.id;
                                    localStorage.setItem('userID', userID);
                                    window.location.href = "/dist/student/home.html";
                                    return;
                                }
                            }
                        }
                        };
                        getUserID.send();
                    } if (loginData.userTypeID == 2) {

                        let getInstUserID = new XMLHttpRequest();
                        getInstUserID.open("GET", "https://ilms.esol.dev/api/Instructors");
                        getInstUserID.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let userDataID = JSON.parse(this.responseText);
                            for (let i = 0; i < userDataID.length; i++) {
                                const loginInstDataID = userDataID[i];
                                if (loginInstDataID.instructorCode === username) {
                                    let instUserID = loginInstDataID.id;
                                    localStorage.setItem('instUserID', instUserID);
                                    window.location.href = "/dist/Instructors/home.html";
                                    return;
                                }
                            }
                        }
                        };
                        getInstUserID.send();
                    }
                }
            }
            if (!foundUser) {
                alert("Invalid username or password.");
            }
        }
    }
    userLogin.send();
}

