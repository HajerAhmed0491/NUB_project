// fetch('/dist/header-side.html')
//     .then(response => response.text())
//     .then(html => {
//         debugger;
//         const headerElement = document.querySelector('#header');
//         headerElement.innerHTML = html;
//     });


const studentId = localStorage.getItem('userID');

fetch('https://ilms.esol.dev/api/GroupStudents/StudentID?StudentID=' + studentId)
    .then(response => response.json())
    .then(groupStudentsResponse => {
        fetch('https://ilms.esol.dev/api/Groups')
        .then(response => response.json())
        .then(groupsResponse => {
            const studentGroupIDs = groupStudentsResponse.map(group => group.groupID);
            const studentGroups = groupsResponse.filter(group => studentGroupIDs.includes(group.id));
            const subjectListHTML = studentGroups.map(group => `<li><a href="#" onclick="sendId(${group.subjectID})">${group.subjectName}</a></li>`).join('');
            document.getElementById('subjectList').innerHTML = subjectListHTML;
        });
    });


    function sendId(id) {
        var url = 'student-lessons.html?id=' + id;
    window.location.href = url;
    }
    
