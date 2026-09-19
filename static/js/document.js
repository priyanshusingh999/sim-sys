// ==========================================
// DOCUMENT UPLOAD
// ==========================================


// Selected file ko store karne ke liye variable
let selectedFile = null;


// File input
const fileInput =
    document.getElementById("fileInput");


// Choose file button
const chooseFile =
    document.getElementById("chooseFile");


// Scan button
const scanButton =
    document.getElementById("scanBtn");


// Upload area
const dropArea =
    document.getElementById("dropArea");

if (!fileInput || !chooseFile || !scanButton || !dropArea) {
    // Upload controls are only present on the documents page.
} else {


// ==========================================
// CHOOSE FILE BUTTON
// ==========================================

chooseFile.addEventListener("click", function () {

    // Hidden file input open hoga
    fileInput.click();

});


// ==========================================
// FILE SELECTED
// ==========================================

fileInput.addEventListener("change", function () {

    const file = fileInput.files[0];

    if (file) {

        handleFile(file);

    }

});


// ==========================================
// HANDLE FILE
// ==========================================

function handleFile(file) {

    selectedFile = file;


    // File information show karo
    document
        .getElementById("fileInfo")
        .classList.remove("hidden");


    // File name
    document.getElementById("fileName").textContent =
        file.name;


    // File size
    document.getElementById("fileSize").textContent =
        (file.size / 1024).toFixed(2) + " KB";

}


// ==========================================
// DRAG OVER
// ==========================================

dropArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    dropArea.classList.add("drag");

});


// ==========================================
// DRAG LEAVE
// ==========================================

dropArea.addEventListener("dragleave", function () {

    dropArea.classList.remove("drag");

});


// ==========================================
// DROP FILE
// ==========================================

dropArea.addEventListener("drop", function (event) {

    event.preventDefault();

    dropArea.classList.remove("drag");


    const file = event.dataTransfer.files[0];


    if (file) {

        handleFile(file);

    }

});


// ==========================================
// SCAN DOCUMENT
// ==========================================

scanButton.addEventListener("click", function () {

    if (!selectedFile) {
        alert("Please select a document first.");
        return;
    }

    // File ko FormData mein add karo
    const formData = new FormData();
    formData.append("file", selectedFile);

    // Backend ko file bhejo
    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(async response => {
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Upload failed.");
        }

        return data;
    })
    .then(data => {
        setTimeout(function () {
            document.getElementById("result").innerHTML = `
                <div class="result-card success">
                    <div class="result-heading">
                        <span class="result-icon">✓</span>
                        <div>
                            <h3>Document scanned successfully</h3>
                            <p>${data.filename}</p>
                        </div>
                    </div>
                    <div class="demo-result-grid">
                        <div>
                            <span>Document type</span>
                            <strong>Project progress report</strong>
                        </div>
                        <div>
                            <span>Pages detected</span>
                            <strong>4 pages</strong>
                        </div>
                        <div>
                            <span>Completion status</span>
                            <strong>On track</strong>
                        </div>
                        <div>
                            <span>Key items found</span>
                            <strong>12 action items</strong>
                        </div>
                    </div>
                    <p class="demo-note">Demo extraction result. Connect the document analysis service to replace these values with live data.</p>
                </div>
            `;
        }, 2000);
    })
    .catch(error => {
        console.error("Upload failed:", error);
        document.getElementById("result").innerHTML = `
            <div class="error">
                <h3>Upload failed</h3>
                <p>${error.message}</p>
            </div>
        `;
    });


    // Processing section show karo
    document
        .getElementById("processing")
        .classList.remove("hidden");


    // Scan button temporarily disable
    scanButton.disabled = true;


    // Demo processing ke liye 2 seconds wait
    setTimeout(function () {

        // Processing hide
        document
            .getElementById("processing")
            .classList.add("hidden");


        // Button enable
        scanButton.disabled = false;


    }, 2000);

});

}