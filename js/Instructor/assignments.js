let instUserID = localStorage.getItem('instUserID');
const subjectSelect = document.getElementById('subject-select');

fetch('https://ilms.esol.dev/api/Groups')
.then(response => response.json())
.then(data => {
const subjects = data.filter(item => item.instructorID == instUserID);

subjects.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject.subjectID;
    option.textContent = subject.subjectName;
    subjectSelect.appendChild(option);
});

subjectSelect.value = selectedSubjectID;
subjectSelect.dispatchEvent(new Event('change'));
});

subjectSelect.addEventListener('change', function() {
  selectedSubjectID = subjectSelect.value;
  localStorage.setItem('selectedSubjectID', selectedSubjectID);
//   window.location.reload(); // Reload the page
});

let selectedSubjectID = localStorage.getItem('selectedSubjectID');

// Fetch data from the API
fetch('https://ilms.esol.dev/api/Assignments')
.then(response => response.json())
.then(data => {
    let filteredAssignments = data.filter(assignment => assignment.subjectID === parseInt(selectedSubjectID));

    filteredAssignments.forEach(assignment => {

        let assignmentElement = document.createElement('div');
        assignmentElement.classList.add('library-block', 'as-homework', 'col-12', 'col-m-6');

        let contentBoxElement = document.createElement('div');
        contentBoxElement.classList.add('content-box');

        let assignmentLinkElement = document.createElement('a');
        assignmentLinkElement.href = 'assig-details.html';

        let assignmentTitleElement = document.createElement('h3');
        assignmentTitleElement.textContent = assignment.assignmentTitle;

        let assignmentContentElement = document.createElement('p');
        assignmentContentElement.textContent = assignment.assignmentContent;

        let rowElement = document.createElement('div');
        rowElement.classList.add('row', 'align-between');

        let lectureIDElement = document.createElement('div');
        lectureIDElement.classList.add('col-12', 'col-s-6', 'col-m-5');
        lectureIDElement.innerHTML = `<span class="ti-book">المادة: ${assignment.subjectName}</span>`;

        let assignmentDateElement = document.createElement('div');
        assignmentDateElement.classList.add('col-12', 'col-s-6', 'col-m-4');
        assignmentDateElement.innerHTML = `<span class="ti-clock">التاريخ: ${assignment.assignmentDateDeu.split('T')[0]}</span>`;

        let rowBouttElement = document.createElement('div');
        rowBouttElement.classList.add('col-12', 'col-s-6');

        let reportLinkElement = document.createElement('a');
        reportLinkElement.href = 'assig-details.html';
        reportLinkElement.classList.add('btn', 'small', 'primary', 'block-lvl', 'btn-icon', 'ti-radio-checkmark');
        reportLinkElement.textContent = 'تقرير الطلاب';

        let rowBoutt2Element = document.createElement('div');
        rowBoutt2Element.classList.add('col-12', 'col-s-6');
        let attachmentElement = document.createElement('a');
        attachmentElement.id = 'attachment';
        attachmentElement.href = assignment.attachment;
        attachmentElement.classList.add('btn', 'small', 'success', 'block-lvl', 'btn-icon', 'ti-file-rar');
        attachmentElement.textContent = 'تحميل المرفقات';

        rowElement.appendChild(lectureIDElement);
        rowElement.appendChild(assignmentDateElement);

        rowBouttElement.appendChild(reportLinkElement);
        rowBoutt2Element.appendChild(attachmentElement);

        contentBoxElement.appendChild(assignmentLinkElement);
        assignmentLinkElement.appendChild(assignmentTitleElement);
        contentBoxElement.appendChild(assignmentContentElement);
        contentBoxElement.appendChild(rowElement);
        rowElement.appendChild(rowBouttElement);
        rowElement.appendChild(rowBoutt2Element);

        assignmentElement.appendChild(contentBoxElement);

        let rowContainer = document.querySelector('.block-assign');
        rowContainer.appendChild(assignmentElement);
    });
})
.catch(error => {
    console.log('Error:', error);
});

