// =====================================================
// PROJECTAI - MAIN JAVASCRIPT FILE
// =====================================================


// -----------------------------------------------------
// 1. BACKEND API URL
// -----------------------------------------------------

// Backend developer baad mein is URL ko change karega.

const API_BASE_URL = "http://localhost:8000/api";



// -----------------------------------------------------
// 2. GLOBAL APPLICATION DATA
// -----------------------------------------------------

// Application ki current information yahan store hogi.

const appState = {

    currentPage: "dashboard",

    selectedFile: null

};



// -----------------------------------------------------
// 3. PAGE LOAD
// -----------------------------------------------------

// HTML completely load hone ke baad code chalega.

document.addEventListener("DOMContentLoaded", function () {

    console.log("ProjectAI Frontend Started");

    initializeNavigation();

    initializeUpload();

    initializeChat();

});



// =====================================================
// 4. NAVIGATION
// =====================================================

function initializeNavigation() {

    // Sidebar ke saare buttons select karna

    const buttons =
        document.querySelectorAll(".nav-btn");


    // Har button ke liye click event

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Button ke data-page ko read karna

            const pageName =
                button.getAttribute("data-page");


            // Page open karna

            openPage(pageName);

        });

    });

}



// -----------------------------------------------------
// PAGE OPEN FUNCTION
// -----------------------------------------------------

function openPage(pageName) {

    // Saare pages select karo

    const pages =
        document.querySelectorAll(".page");


    // Pehle sab pages hide karo

    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    // Required page find karo

    const selectedPage =
        document.getElementById(pageName);


    // Required page show karo

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    // Sidebar buttons

    const buttons =
        document.querySelectorAll(".nav-btn");


    // Sab buttons se active remove

    buttons.forEach(function (button) {

        button.classList.remove("active");

    });


    // Current button active karo

    buttons.forEach(function (button) {

        if (
            button.getAttribute("data-page")
            === pageName
        ) {

            button.classList.add("active");

        }

    });


    // Current page save

    appState.currentPage = pageName;


    // Heading change

    updatePageHeading(pageName);

}



// -----------------------------------------------------
// PAGE HEADING
// -----------------------------------------------------

function updatePageHeading(pageName) {

    const title =
        document.getElementById("pageTitle");

    const subtitle =
        document.getElementById("pageSubtitle");


    const pageData = {

        dashboard: [
            "Project Dashboard",
            "Monitor your infrastructure project"
        ],

        documents: [
            "Project Documents",
            "Upload and analyze project reports"
        ],

        schedule: [
            "Project Schedule",
            "Compare planned and actual activities"
        ],

        progress: [
            "Progress Monitoring",
            "Track project execution"
        ],

        risks: [
            "Risks & Delays",
            "Identify project risks"
        ],

        assistant: [
            "AI Project Assistant",
            "Ask questions about your project"
        ]

    };


    // Current page ki information

    const data =
        pageData[pageName];


    if (data) {

        title.textContent = data[0];

        subtitle.textContent = data[1];

    }

}



// =====================================================
// 5. DOCUMENT UPLOAD
// =====================================================

function initializeUpload() {

    // File input

    const fileInput =
        document.getElementById("fileInput");


    // Choose file button

    const chooseButton =
        document.getElementById("chooseFile");


    // Upload area

    const dropArea =
        document.getElementById("dropArea");


    // Scan button

    const scanButton =
        document.getElementById("scanBtn");


    // Choose File button click

    chooseButton.addEventListener(
        "click",
        function () {

            fileInput.click();

        }
    );


    // File select hone par

    fileInput.addEventListener(
        "change",
        function () {

            const file =
                fileInput.files[0];


            if (file) {

                handleFile(file);

            }

        }
    );


    // Drag over

    dropArea.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            dropArea.classList.add("drag");

        }
    );


    // Drag leave

    dropArea.addEventListener(
        "dragleave",
        function () {

            dropArea.classList.remove("drag");

        }
    );


    // File drop

    dropArea.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            dropArea.classList.remove("drag");


            const file =
                event.dataTransfer.files[0];


            if (file) {

                handleFile(file);

            }

        }
    );


    // Scan button

    scanButton.addEventListener(
        "click",
        function () {

            scanDocument();

        }
    );

}



// =====================================================
// 6. FILE VALIDATION
// =====================================================

function handleFile(file) {

    // Allowed file extensions

    const allowedExtensions = [
        ".pdf",
        ".docx",
        ".xlsx",
        ".csv"
    ];


    // File name

    const fileName =
        file.name.toLowerCase();


    // Check extension

    const valid =
        allowedExtensions.some(
            function (extension) {

                return fileName.endsWith(extension);

            }
        );


    // Invalid file

    if (!valid) {

        alert(
            "Please upload PDF, DOCX, XLSX or CSV file."
        );

        return;

    }


    // Maximum 10 MB

    if (file.size > 10 * 1024 * 1024) {

        alert(
            "File size must be less than 10 MB."
        );

        return;

    }


    // File save

    appState.selectedFile = file;


    // File information show

    showFileInfo(file);

}



// =====================================================
// 7. SHOW SELECTED FILE
// =====================================================

function showFileInfo(file) {

    const fileInfo =
        document.getElementById("fileInfo");


    const fileName =
        document.getElementById("fileName");


    const fileSize =
        document.getElementById("fileSize");


    // File box show

    fileInfo.classList.remove("hidden");


    // File name

    fileName.textContent =
        "📄 " + file.name;


    // File size calculate

    const size =
        (file.size / 1024).toFixed(2);


    // File size show

    fileSize.textContent =
        size + " KB";

}



// =====================================================
// 8. SCAN DOCUMENT
// =====================================================

async function scanDocument() {

    // Selected file

    const file =
        appState.selectedFile;


    // Agar file selected nahi hai

    if (!file) {

        alert("Please select a document first.");

        return;

    }


    // Processing screen

    showProcessing();


    /*
    =====================================================
    BACKEND CONNECTION WILL COME HERE
    =====================================================

    Backend developer baad mein is code ko
    uncomment/use karega.

    const formData = new FormData();

    formData.append("document", file);

    const response = await fetch(
        `${API_BASE_URL}/documents/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    showExtractionResult(data);

    =====================================================
    */


    // Abhi backend nahi hai,
    // isliye frontend testing ke liye
    // 1.5 second ka loading effect.

    setTimeout(function () {

        hideProcessing();

        showBackendMessage();

    }, 1500);

}



// =====================================================
// 9. PROCESSING SCREEN
// =====================================================

function showProcessing() {

    const processing =
        document.getElementById("processing");


    processing.classList.remove("hidden");

}



// -----------------------------------------------------

function hideProcessing() {

    const processing =
        document.getElementById("processing");


    processing.classList.add("hidden");

}



// =====================================================
// 10. BACKEND WAITING MESSAGE
// =====================================================

function showBackendMessage() {

    const result =
        document.getElementById("result");


    result.innerHTML = `

        <div class="result-card">

            <div class="success-icon">
                ✓
            </div>

            <h3>
                Document Ready
            </h3>

            <p>
                Your document has been selected successfully.
            </p>

            <p>
                AI extraction results will appear here
                when the backend API is connected.
            </p>

        </div>

    `;

}



// =====================================================
// 11. AI CHAT ASSISTANT
// =====================================================

function initializeChat() {

    const input =
        document.getElementById("chatInput");


    const sendButton =
        document.getElementById("sendBtn");


    // Send button

    sendButton.addEventListener(
        "click",
        sendMessage
    );


    // Enter key

    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                sendMessage();

            }

        }
    );

}



// =====================================================
// 12. SEND CHAT MESSAGE
// =====================================================

async function sendMessage() {

    const input =
        document.getElementById("chatInput");


    const message =
        input.value.trim();


    // Empty message

    if (!message) {

        return;

    }


    // User message display

    addChatMessage(
        "You",
        message,
        "user"
    );


    // Input clear

    input.value = "";


    /*
    =====================================================
    FUTURE BACKEND API
    =====================================================

    const response = await fetch(
        `${API_BASE_URL}/assistant`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        }
    );

    const data = await response.json();

    addChatMessage(
        "ProjectAI",
        data.answer,
        "bot"
    );

    =====================================================
    */


    // Temporary frontend response

    setTimeout(function () {

        addChatMessage(
            "ProjectAI",
            "Backend AI service will process this question.",
            "bot"
        );

    }, 500);

}



// =====================================================
// 13. ADD CHAT MESSAGE
// =====================================================

function addChatMessage(
    sender,
    message,
    type
) {

    const chat =
        document.getElementById(
            "chatMessages"
        );


    const messageBox =
        document.createElement("div");


    // User / bot class

    if (type === "user") {

        messageBox.className =
            "user-message";

    } else {

        messageBox.className =
            "bot-message";

    }


    // Message HTML

    messageBox.innerHTML = `

        <strong>
            ${type === "user" ? "👤" : "🤖"}
            ${sender}
        </strong>

        <p>
            ${message}
        </p>

    `;


    // Chat mein add

    chat.appendChild(messageBox);


    // Automatically bottom par scroll

    chat.scrollTop =
        chat.scrollHeight;

}



// =====================================================
// 14. FUTURE BACKEND FUNCTIONS
// =====================================================


// Dashboard backend data

function updateDashboard(data) {

    document.getElementById(
        "progressValue"
    ).textContent =
        data.overallProgress + "%";


    document.getElementById(
        "activityValue"
    ).textContent =
        data.totalActivities;


    document.getElementById(
        "delayValue"
    ).textContent =
        data.delayedActivities;


    document.getElementById(
        "documentValue"
    ).textContent =
        data.documents;

}



// Schedule backend data

function updateSchedule(activities) {

    const table =
        document.getElementById(
            "scheduleTable"
        );


    table.innerHTML = "";


    activities.forEach(function (activity) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${activity.name}
            </td>

            <td>
                ${activity.planned}%
            </td>

            <td>
                ${activity.actual}%
            </td>

            <td>
                ${activity.variance}%
            </td>

            <td>
                ${activity.status}
            </td>

        `;


        table.appendChild(row);

    });

}