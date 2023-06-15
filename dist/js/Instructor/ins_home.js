window.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const formattedDateElement = document.getElementById('formatted-date');
    formattedDateElement.textContent = formattedDate;
});

document.addEventListener("DOMContentLoaded", function() {
    let instUserID = localStorage.getItem('instUserID');
    let studentData = new XMLHttpRequest();
    studentData.open("GET", "https://ilms.esol.dev/api/Instructors/" + instUserID);
    studentData.send();
    studentData.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let stData = JSON.parse(this.responseText);
            var stuName = document.getElementById('instructorName');
            stuName.textContent = 'Dr/ ' + stData.instructorName;
        }
    };
});