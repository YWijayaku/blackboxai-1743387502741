// User menu functionality
let userMenu = null;

function createUserMenu() {
    const menuHTML = `
        <div id="userMenu" class="hidden absolute right-4 top-16 w-48 bg-white rounded-lg shadow-lg py-2">
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100" onclick="showProfile(event)">
                <i class="fas fa-user-circle mr-2"></i>Profile
            </a>
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100" onclick="showSettings(event)">
                <i class="fas fa-cog mr-2"></i>Settings
            </a>
            <hr class="my-2 border-gray-200">
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100" onclick="handleLogout(event)">
                <i class="fas fa-sign-out-alt mr-2"></i>Logout
            </a>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', menuHTML);
    userMenu = document.getElementById('userMenu');

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (userMenu && !e.target.closest('#userMenu') && !e.target.closest('a[href="#"]')) {
            userMenu.classList.add('hidden');
        }
    });
}

function showUserMenu(e) {
    e.preventDefault();
    if (!userMenu) {
        createUserMenu();
    }
    userMenu.classList.toggle('hidden');
}

// Profile Modal
let profileModal = null;

function createProfileModal() {
    const modalHTML = `
        <div id="profileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
            <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Profile</h2>
                    <button class="text-gray-600 hover:text-gray-800" onclick="closeProfileModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" id="profileName" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" id="profileEmail" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold mb-2">Recent Activity</h3>
                        <div id="recentActivity" class="space-y-2">
                            <!-- Activity items will be inserted here -->
                        </div>
                    </div>

                    <button onclick="saveProfile()" 
                        class="w-full bg-[#0A1172] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    profileModal = document.getElementById('profileModal');
}

function showProfile(e) {
    e.preventDefault();
    if (!profileModal) {
        createProfileModal();
    }

    // Load user data
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('profileName').value = user.name || '';
        document.getElementById('profileEmail').value = user.email || '';
    }

    // Load recent activity (simulated)
    loadRecentActivity();

    profileModal.classList.remove('hidden');
    userMenu.classList.add('hidden');
}

function closeProfileModal() {
    if (profileModal) {
        profileModal.classList.add('hidden');
    }
}

async function saveProfile() {
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;

    if (!name || !email) {
        showProfileError('Please fill in all fields');
        return;
    }

    try {
        // Simulate API call
        await simulateProfileUpdate(name, email);

        // Update local storage
        const user = JSON.parse(localStorage.getItem('user'));
        user.name = name;
        user.email = email;
        localStorage.setItem('user', JSON.stringify(user));

        // Update UI
        updateAuthUI(user);

        // Show success message and close modal
        showSuccessNotification('Profile updated successfully');
        closeProfileModal();
    } catch (error) {
        showProfileError(error.message);
    }
}

function showProfileError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4';
    errorDiv.innerHTML = message;

    const form = profileModal.querySelector('.space-y-4');
    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

async function simulateProfileUpdate(name, email) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate validation
    if (email === 'taken@example.com') {
        throw new Error('Email is already taken');
    }

    return { success: true };
}

function loadRecentActivity() {
    const activityContainer = document.getElementById('recentActivity');
    
    // Simulate recent activity data
    const activities = [
        { type: 'search', text: 'Searched for "AI research papers"', time: '2 hours ago' },
        { type: 'upload', text: 'Uploaded research.pdf', time: '1 day ago' },
        { type: 'comment', text: 'Added a comment to Paper #123', time: '3 days ago' }
    ];

    activityContainer.innerHTML = activities.map(activity => `
        <div class="flex items-center text-sm text-gray-600">
            <i class="fas fa-${getActivityIcon(activity.type)} mr-2"></i>
            <span>${activity.text}</span>
            <span class="ml-auto text-xs">${activity.time}</span>
        </div>
    `).join('');
}

function getActivityIcon(type) {
    switch (type) {
        case 'search': return 'search';
        case 'upload': return 'upload';
        case 'comment': return 'comment';
        default: return 'circle';
    }
}

function handleLogout(e) {
    e.preventDefault();
    
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Reset UI
    const loginButton = document.querySelector('a[href="#"]');
    loginButton.innerHTML = '<i class="fas fa-user"></i> Login';
    loginButton.onclick = showAuthModal;

    // Close user menu
    userMenu.classList.add('hidden');

    // Show success message
    showSuccessNotification('Successfully logged out');
}

// Initialize profile functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in and create menu if needed
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        createUserMenu();
    }
});