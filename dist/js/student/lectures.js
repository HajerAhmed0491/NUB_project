
const urlParams = new URLSearchParams(window.location.search);
const subIID = urlParams.get('id');

fetch("https://ilms.esol.dev/api/Lecturies/SubjectID?SubjectID=" + subIID)
    .then(response => response.json())
    .then(data => {
        const lessonBlock = document.getElementById("lessonBlock");
        
        data.forEach(lecture => {
            var lecName = document.getElementById('mainSubLec');
            lecName.textContent = lecture.subjectName;

            var lessonBlockItem = document.createElement("div");
            lessonBlockItem.className = "lesson-block col-12 col-m-6 col-l-4";

            var contentBox = document.createElement("div");
            contentBox.className = "content-box ti-book-spells-outline";

            var lessonDetailsLink = document.createElement("a");
            lessonDetailsLink.onclick = function() {
            sendId(lecture.id);
            };
            lessonDetailsLink.href = "#";

            var heading = document.createElement("h3");
            heading.textContent = lecture.title;

            lessonDetailsLink.appendChild(heading);
            var lectureDateSpan = document.createElement("span");
            lectureDateSpan.className = "ti-calendar-day";
            const originalDate = lecture.lectureDate;
            const formattedDateTime = new Date(originalDate).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour12: true
            });
            lectureDateSpan.textContent = formattedDateTime;

            function sendId(id) {
                var url = 'student-lesson-details.html?id=' + id;
                window.location.href = url;
            }

            var lessonDetailsButton = document.createElement("a");
            lessonDetailsButton.onclick = function() {
            sendId(lecture.id);
            };
            lessonDetailsButton.href = "#";
            lessonDetailsButton.className = "btn ti-arrow-left-c btn-icon-after primary small";
            lessonDetailsButton.textContent = "عرض";


            contentBox.appendChild(lessonDetailsLink);
            contentBox.appendChild(lectureDateSpan);
            contentBox.appendChild(lessonDetailsButton);

            lessonBlockItem.appendChild(contentBox);

            lessonBlock.appendChild(lessonBlockItem);
        });

        const attachment = document.getElementById("attachment");

        data.forEach(lecAttachment => {
            const libraryBlock = document.createElement("div");
            libraryBlock.className = "library-block col-12 col-m-6 col-l-4";

            const contentBox = document.createElement("div");
            contentBox.className = "content-box ti-file-document-outline";

            // const headingLink = document.createElement("a");
            // headingLink.href = "#download";
            // const heading = document.createElement("h3");
            // heading.textContent = "اسم الملف يقع هنا";
            // headingLink.appendChild(heading);

            var span1 = document.createElement("span");
            span1.setAttribute("class", "ti-book");
            span1.textContent = "المادة :  " + lecAttachment.subjectName;

            var span2 = document.createElement("span");
            span2.setAttribute("class", "ti-books");
            span2.textContent = " المحاضرة:" + lecAttachment.title;

            var span3 = document.createElement("span");
            span3.setAttribute("class", "ti-user");
            span3.textContent = "المحاضر :  " + lecAttachment.instructorNmae;

            var span4 = document.createElement("span");
            span4.setAttribute("class", "ti-calendar-day");
            const originalDate = lecAttachment.lectureDate;
            const formattedDateTime = new Date(originalDate).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour12: true
            });
            span4.textContent = formattedDateTime;

            const youtubeLink = document.createElement("a");
            youtubeLink.href = lecAttachment.links;
            youtubeLink.className = "btn ti-youtube-play floating danger small";
            youtubeLink.textContent = "اليوتيوب";

            const downloadLink = document.createElement("a");
            downloadLink.href = lecAttachment.attachment;
            downloadLink.className = "btn ti-cloud-download floating success small";
            downloadLink.textContent = "تحميل";

            // contentBox.appendChild(headingLink);
            contentBox.appendChild(span1);
            contentBox.appendChild(span2);
            contentBox.appendChild(span3);
            contentBox.appendChild(span4);
            contentBox.appendChild(youtubeLink);
            contentBox.appendChild(downloadLink);

            libraryBlock.appendChild(contentBox);
            attachment.appendChild(libraryBlock);
        });
    })
    
    document.addEventListener("DOMContentLoaded", function() {
    let lectureAllData = new XMLHttpRequest();
    const urlParams = new URLSearchParams(window.location.search);
    const lecIID = urlParams.get('id');
    lectureAllData.open("GET", "https://ilms.esol.dev/api/Lecturies/" + lecIID);
    lectureAllData.send();
    lectureAllData.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let lecInfo = JSON.parse(this.responseText);

            var lecTitle = document.getElementById('titleLec');
            lecTitle.textContent = lecInfo.title;

            var lecInst = document.getElementById('instLec');
            lecInst.textContent = 'المحاضر : ' +  lecInfo.instructorNmae;

            var lecDate = document.getElementById('dateLec');
            const originalDate = lecInfo.lectureDate;
            const formattedDateTime = new Date(originalDate).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour12: true
            });
            lecDate.textContent = formattedDateTime;

            var subDate = document.getElementById('subLec');
            subDate.textContent = lecInfo.subjectName;

            var lecName = document.getElementById('mainSubLec');
            lecName.textContent = lecInfo.subjectName;

            var lecAtach = document.getElementById('attachment');
            lecAtach.setAttribute("href", '/dist/img/lecAttatch/' + lecInfo.attachment);

            var lecLink = document.getElementById('linkLec');
            lecLink.setAttribute("src", lecInfo.links);

            var lecContent = document.getElementById('contentLec');
            lecContent.textContent = lecInfo.content;
        }
    };
});

fetch("https://ilms.esol.dev/api/Assignments/SubjectID?SubjectID=" + subIID)
    .then(response => response.json())
    .then(data => {
        const assignBlock = document.getElementById("assignBlock");

        data.forEach(assignment => {
            var assignmentBlock = document.createElement("div");
            assignmentBlock.classList.add("library-block", "as-homework", "col-12", "col-m-6");

            var contentBox = document.createElement("div");
            contentBox.classList.add("content-box");

            var titleLink = document.createElement("a");
            titleLink.setAttribute("href", "studnet-assig-details.html");

            var titleHeading = document.createElement("h3");
            titleHeading.textContent = assignment.assignmentTitle;

            titleLink.appendChild(titleHeading);

            var paragraph = document.createElement("p");
            paragraph.textContent = assignment.assignmentContent;

            contentBox.appendChild(titleLink);
            contentBox.appendChild(paragraph);

            var rowElement = document.createElement("div");
            rowElement.classList.add("row", "align-between");

            var subjectColumn = document.createElement("div");
            subjectColumn.classList.add("col-12", "col-s-6", "col-m-4");

            var subjectSpan = document.createElement("span");
            subjectSpan.classList.add("ti-book");
            subjectSpan.textContent = "المادة : " + assignment.subjectName;

            subjectColumn.appendChild(subjectSpan);

            rowElement.appendChild(subjectColumn);

            var dateColumn = document.createElement("div");
            dateColumn.classList.add("col-12", "col-s-6", "col-m-4");

            var dateSpan = document.createElement("span");
            dateSpan.classList.add("ti-clock");
            dateSpan.textContent = "التاريخ : " + assignment.assignmentDateDeu; 

            dateColumn.appendChild(dateSpan);

            rowElement.appendChild(dateColumn);

            var statusColumn = document.createElement("div");
            statusColumn.classList.add("col-12", "col-s-6", "col-m-3");

            var statusBadge = document.createElement("span");
            statusBadge.classList.add("badge", "gray");
            statusBadge.textContent = "لم يتم التصحيح";

            statusColumn.appendChild(statusBadge);

            rowElement.appendChild(statusColumn);

            var solveButtonColumn = document.createElement("div");
            solveButtonColumn.classList.add("col-12", "col-s-6");

            function sendId(id) {
                var url = 'studnet-assig-details.html?id=' + id;
                window.location.href = url;
            }
            var solveButtonLink = document.createElement("a");
            solveButtonLink.onclick = function() {
                sendId(assignment.id);
            };
            solveButtonLink.href = "#";
            solveButtonLink.classList.add("btn", "small", "primary", "block-lvl", "btn-icon", "ti-radio-checkmark");
            solveButtonLink.textContent = "حل التدريب";

            solveButtonColumn.appendChild(solveButtonLink);

            rowElement.appendChild(solveButtonColumn);

            var downloadButtonColumn = document.createElement("div");
            downloadButtonColumn.classList.add("col-12", "col-s-6");

            var downloadButtonLink = document.createElement("a");
            downloadButtonLink.setAttribute("href", "/dist/img/assignAttatch/" + assignment.attachment);
            downloadButtonLink.classList.add("btn", "small", "success", "block-lvl", "btn-icon", "ti-file-rar");
            downloadButtonLink.textContent = "تحميل المرفقات";

            downloadButtonColumn.appendChild(downloadButtonLink);

            rowElement.appendChild(downloadButtonColumn);

            contentBox.appendChild(rowElement);
            assignmentBlock.appendChild(contentBox);
            assignBlock.appendChild(assignmentBlock);
        });
    });