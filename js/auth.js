// DOM Elements for Auth Modal
let authModal = null;
let currentAuthMode = 'login'; // 'login' or 'register'

// Initialize auth functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add click event to login button
    const loginButton = document.querySelector('a[href="#"]');
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        showAuthModal();
    });

    // Create and append modal to body
    createAuthModal();
});

function createAuthModal() {
    const modalHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50" id="authModal">
            <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <!-- Modal Header -->
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800" id="modalTitle">Login</h2>
                    <button class="text-gray-600 hover:text-gray-800" onclick="closeAuthModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Auth Forms -->
                <form id="loginForm" onsubmit="handleLogin(event)" class="space-y-4">
                    <!-- Error container -->
                    <div id="loginErrorContainer"></div>
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">
                            Email
                        </label>
                        <input type="email" id="loginEmail" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="loginPassword">
                            Password
                        </label>
                        <input type="password" id="loginPassword"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password">
                    </div>
                    <button type="submit" 
                        class="w-full bg-[#0A1172] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Login
                    </button>
                </form>

                <form id="registerForm" onsubmit="handleRegister(event)" class="hidden space-y-4">
                    <!-- Error container -->
                    <div id="registerErrorContainer"></div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="registerName">
                            Full Name
                        </label>
                        <input type="text" id="registerName"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="registerEmail">
                            Email
                        </label>
                        <input type="email" id="registerEmail"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="registerPassword">
                            Password
                        </label>
                        <input type="password" id="registerPassword"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password">
                    </div>
                    <button type="submit"
                        class="w-full bg-[#0A1172] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Register
                    </button>
                </form>

                <!-- Switch between login and register -->
                <div class="mt-4 text-center">
                    <p class="text-gray-600">
                        <span id="switchText">Don't have an account?</span>
                        <a href="#" class="text-blue-600 hover:text-blue-800 ml-1" onclick="toggleAuthMode(event)">
                            <span id="switchLink">Register</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    authModal = document.getElementById('authModal');
}

function showAuthModal() {
    authModal.classList.remove('hidden');
}

function closeAuthModal() {
    authModal.classList.add('hidden');
    resetAuthForms();
}

function toggleAuthMode(e) {
    e.preventDefault();
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('modalTitle');
    const switchText = document.getElementById('switchText');
    const switchLink = document.getElementById('switchLink');

    if (currentAuthMode === 'login') {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        modalTitle.textContent = 'Register';
        switchText.textContent = 'Already have an account?';
        switchLink.textContent = 'Login';
        currentAuthMode = 'register';
    } else {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        modalTitle.textContent = 'Login';
        switchText.textContent = 'Don\'t have an account?';
        switchLink.textContent = 'Register';
        currentAuthMode = 'login';
    }
}

function resetAuthForms() {
    // Reset login form
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';

    // Reset register form
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';

    // Reset to login mode
    if (currentAuthMode === 'register') {
        toggleAuthMode(new Event('click'));
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!validateLoginInput(email, password)) {
        return;
    }

    try {
        // Simulate API call
        const response = await simulateLogin(email, password);
        
        // Handle successful login
        handleSuccessfulAuth(response);
    } catch (error) {
        showAuthError(error.message);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!validateRegisterInput(name, email, password)) {
        return;
    }

    try {
        // Simulate API call
        const response = await simulateRegister(name, email, password);
        
        // Handle successful registration
        handleSuccessfulAuth(response);
    } catch (error) {
        showAuthError(error.message);
    }
}

function validateLoginInput(email, password) {
    if (!email || !password) {
        showAuthError('Please fill in all fields');
        return false;
    }
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email address');
        return false;
    }
    return true;
}

function validateRegisterInput(name, email, password) {
    if (!name || !email || !password) {
        showAuthError('Please fill in all fields');
        return false;
    }
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email address');
        return false;
    }
    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters long');
        return false;
    }
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAuthError(message) {
    const containerId = `${currentAuthMode}ErrorContainer`;
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Error container not found: ${containerId}`);
        return;
    }

    // Clear existing errors
    container.innerHTML = '';

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4';
    errorDiv.role = 'alert';
    errorDiv.innerHTML = `
        <span class="block sm:inline">${message}</span>
        <button class="absolute top-0 right-0 px-4 py-3" onclick="this.parentElement.remove()">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
        </button>
    `;

    // Add error to container
    container.appendChild(errorDiv);

    // Remove error after 3 seconds
    setTimeout(() => {
        if (errorDiv.parentNode === container) {
            errorDiv.remove();
        }
    }, 3000);
}

async function simulateLogin(email, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate successful login
    return {
        token: 'fake-jwt-token',
        user: {
            name: 'John Doe',
            email: email
        }
    };
}

async function simulateRegister(name, email, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate successful registration
    return {
        token: 'fake-jwt-token',
        user: {
            name: name,
            email: email
        }
    };
}

function handleSuccessfulAuth(response) {
    // Store auth data
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    // Update UI
    updateAuthUI(response.user);

    // Close modal
    closeAuthModal();

    // Show success message
    showSuccessNotification('Successfully logged in!');
}

function updateAuthUI(user) {
    const loginButton = document.querySelector('a[href="#"]');
    loginButton.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-user-circle"></i>
            <span>${user.name}</span>
        </div>
    `;
    loginButton.onclick = showUserMenu;
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        updateAuthUI(user);
    }
});