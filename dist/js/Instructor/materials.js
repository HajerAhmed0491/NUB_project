let instUserID = localStorage.getItem('instUserID');
let selectedSubjectID = localStorage.getItem('selectedSubjectID');
let selectedGroupIndex = localStorage.getItem('selectedGroupIndex');

const subjectSelect = document.getElementById('subject-select');
const lectureSelect = document.getElementById('lecture-select');

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

    subjectSelect.addEventListener('change', () => {
    selectedSubjectID = subjectSelect.value;
    localStorage.setItem('selectedSubjectID', selectedSubjectID); 
    lectureSelect.innerHTML = '<option value="">-- اختيار المحاضرة ---</option>';

    fetch('https://ilms.esol.dev/api/Lecturies')
        .then(response => response.json())
        .then(data => {
            const lectures = data.filter(item => item.subjectID == selectedSubjectID && item.instructorID == instUserID);

            lectures.forEach((lecture, index) => {
            const option = document.createElement('option');
            option.value = lecture.id; 
            option.textContent = lecture.title; 
            option.id = 'lectureID' ;
            lectureSelect.appendChild(option);
            });

            selectedGroupIndex = null;
            localStorage.removeItem('selectedGroupIndex'); 
        });

    });

    lectureSelect.addEventListener('change', () => {
    selectedGroupIndex = parseInt(lectureSelect.value) - 1;
    localStorage.setItem('selectedGroupIndex', selectedGroupIndex); 
    });
