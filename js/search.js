// DOM Elements
const searchTextarea = document.querySelector('textarea');
const submitButton = document.querySelector('button');
const searchTypes = document.querySelectorAll('input[name="searchType"]');

// Example queries for demonstration
const exampleQueries = [
    "Write Java code for quick sort.",
    "Show me the research on style transfer.",
    "How to treat lyme disease?"
];

// Event Listeners
submitButton.addEventListener('click', handleSearch);
searchTextarea.addEventListener('keydown', handleKeyPress);

// Handle search submission
async function handleSearch() {
    const query = searchTextarea.value.trim();
    if (!query) {
        showNotification('Please enter a question', 'error');
        return;
    }

    // Get selected search type
    const selectedType = Array.from(searchTypes).find(radio => radio.checked).nextElementSibling.textContent.toLowerCase();

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';

    try {
        // Simulate API call (replace with actual API call in production)
        const response = await simulateSearch(query, selectedType);
        displayResults(response);
    } catch (error) {
        showNotification('An error occurred while processing your request', 'error');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit';
    }
}

// Handle enter key press
function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSearch();
    }
}

// Simulate search API call
async function simulateSearch(query, type) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate response based on search type
    return {
        type: type,
        query: query,
        response: `This is a simulated response for your "${type}" search: "${query}"`
    };
}

// Display search results
function displayResults(results) {
    // Create results container if it doesn't exist
    let resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container mt-8 bg-white rounded-lg shadow-lg p-6';
        document.querySelector('main .max-w-4xl').appendChild(resultsContainer);
    }

    // Display results
    resultsContainer.innerHTML = `
        <div class="mb-4">
            <h2 class="text-xl font-semibold mb-2">Results</h2>
            <p class="text-gray-600">${results.response}</p>
        </div>
    `;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize example query links
document.addEventListener('DOMContentLoaded', () => {
    const queryLinks = document.querySelectorAll('.text-blue-600');
    queryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            searchTextarea.value = exampleQueries[index];
        });
    });
});