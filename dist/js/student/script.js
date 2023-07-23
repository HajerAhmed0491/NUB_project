
// fetch('/dist/sec_header.html')
//     .then(response => response.text())
//     .then(html => {
//         const secHeaderElement = document.querySelector('.secondary-header');
//         secHeaderElement.innerHTML = html;
//     });    

document.addEventListener("DOMContentLoaded", function() {
    let userID = localStorage.getItem('userID');
    let studentData = new XMLHttpRequest();
    studentData.open("GET", "https://ilms.esol.dev/api/Students/" + userID);
    studentData.send();
    studentData.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let stData = JSON.parse(this.responseText);
            var stuName = document.getElementById('studentName');
            stuName.textContent = stData.studentName;
    
            var stuGPA = document.getElementById('GPA');
            stuGPA.textContent = 'GPA ' + stData.gpa;

            var stuID = document.getElementById('stuCode');
            stuID.textContent = stData.studentCode;

            var department = document.getElementById('departmentName');
            department.textContent = stData.departmentName;

            var collage = document.getElementById('collageName');
            collage.textContent = stData.collageName;
            
            let subReg = new XMLHttpRequest();
            subReg.open("GET", "https://ilms.esol.dev/api/GroupStudents/StudentID?StudentID=" + userID);
            subReg.onreadystatechange = function() {
                let responseData = JSON.parse(this.responseText);
                var courses = document.getElementById('regCourses');
                courses.textContent = responseData.length;
            }
            subReg.send();
            

            var stuImg = document.getElementById('stuImg');
            stuImg.setAttribute("src", '/dist/img/profile_imags/' + stData.studentImage);
        }
    };
});