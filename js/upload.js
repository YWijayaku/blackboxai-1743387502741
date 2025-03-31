// Create and append upload button to the search box
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.bg-white.rounded-lg');
    const uploadContainer = document.createElement('div');
    uploadContainer.className = 'mb-4';
    uploadContainer.innerHTML = `
        <div class="flex items-center space-x-2">
            <label class="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-600">
                <i class="fas fa-upload"></i>
                <span>Upload Document</span>
                <input type="file" class="hidden" accept=".pdf,.doc,.docx,.txt">
            </label>
            <div class="upload-status text-sm"></div>
        </div>
        <div class="uploaded-files mt-2"></div>
    `;

    // Insert upload container before the textarea
    const textarea = searchBox.querySelector('textarea');
    searchBox.insertBefore(uploadContainer, textarea);

    // Initialize upload functionality
    initializeUpload();
});

function initializeUpload() {
    const fileInput = document.querySelector('input[type="file"]');
    const uploadStatus = document.querySelector('.upload-status');
    const uploadedFiles = document.querySelector('.uploaded-files');

    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file
        if (!validateFile(file)) {
            showUploadError('Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.');
            return;
        }

        // Show upload progress
        uploadStatus.innerHTML = `
            <div class="flex items-center text-blue-600">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                <span>Uploading ${file.name}...</span>
            </div>
        `;

        try {
            // Simulate file upload (replace with actual upload in production)
            await simulateFileUpload(file);

            // Show success message
            uploadStatus.innerHTML = `
                <div class="text-green-600">
                    <i class="fas fa-check mr-2"></i>
                    <span>Upload complete!</span>
                </div>
            `;

            // Add file to uploaded files list
            addFileToList(file);

            // Clear file input
            fileInput.value = '';

            // Clear status after 3 seconds
            setTimeout(() => {
                uploadStatus.innerHTML = '';
            }, 3000);

        } catch (error) {
            showUploadError('Failed to upload file. Please try again.');
        }
    });
}

function validateFile(file) {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];
    return allowedTypes.includes(file.type);
}

function showUploadError(message) {
    const uploadStatus = document.querySelector('.upload-status');
    uploadStatus.innerHTML = `
        <div class="text-red-600">
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;

    // Clear error after 3 seconds
    setTimeout(() => {
        uploadStatus.innerHTML = '';
    }, 3000);
}

async function simulateFileUpload(file) {
    // Simulate network delay and processing
    const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, delay));

    // Simulate random upload failure (10% chance)
    if (Math.random() < 0.1) {
        throw new Error('Upload failed');
    }
}

function addFileToList(file) {
    const uploadedFiles = document.querySelector('.uploaded-files');
    const fileElement = document.createElement('div');
    fileElement.className = 'flex items-center justify-between bg-gray-100 rounded p-2 mt-2';
    fileElement.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-file text-gray-600"></i>
            <span class="text-sm text-gray-700">${file.name}</span>
        </div>
        <button class="text-red-600 hover:text-red-800" onclick="removeFile(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    uploadedFiles.appendChild(fileElement);
}

function removeFile(button) {
    const fileElement = button.parentElement;
    fileElement.remove();
}