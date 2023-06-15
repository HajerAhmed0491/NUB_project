const urlParams = new URLSearchParams(window.location.search);
const assignID = urlParams.get('id');
    document.addEventListener("DOMContentLoaded", function() {
    let assignAllData = new XMLHttpRequest();
    assignAllData.open("GET", "https://ilms.esol.dev/api/Assignments/" + assignID);
    assignAllData.send();
    assignAllData.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let assInfo = JSON.parse(this.responseText);

            var assignTitle = document.getElementById('titleAssign');
            assignTitle.textContent = assInfo.assignmentTitle;

            var assignContent = document.getElementById('contentAssign');
            assignContent.textContent = assInfo.assignmentContent;

            var assignSubject = document.getElementById('subAssign');
            assignSubject.textContent = "المادة: " + assInfo.subjectName;

            const originalDate = assInfo.assignmentDateDeu;
            const formattedDateTime = new Date(originalDate).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            var assignDateDue = document.getElementById('dateDueAssign');
            assignDateDue.textContent = "التاريخ: " + formattedDateTime;

            var assignAttch = document.getElementById('attachAssign');
            assignAttch.setAttribute("href", "/dist/img/assignAttatch/" + assInfo.attachment);

            // Move the following code inside the callback function
            document.querySelector('form').addEventListener('submit', function (event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                const jsonObject = {};
                formData.forEach(function (value, key) {
                    jsonObject[key] = value;
                });
                console.log('Request Payload:', jsonObject);

                fetch('https://ilms.esol.dev/api/AssignmentsAnswer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonObject),
                }).then(response => {
                    console.log('Response Status:', response.status);
                    window.location.href = "/dist/student/student-lessons.html?id=" + assInfo.subjectID;
                    return response.json();
                }).then(() => {
                    const modelContainer = document.getElementById('model-container');
                    const scriptTag = document.createElement('script');
                    scriptTag.src = '/dist/animation/celebrate.js';
                    scriptTag.type = 'module';
                    modelContainer.appendChild(scriptTag);
                })
                .then(data => {
                    console.log('Response Data:', data);
                })
                .catch(error => {
                    console.error(error);
                });
            });
        }
    };
});
