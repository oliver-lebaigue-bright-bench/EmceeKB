// Shared Authentication Module
export function checkAuthentication() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser;
}

export function redirectToLogin() {
    if (!checkAuthentication()) {
        window.location.href = './Login.html';
    }
}

export function displayUserInfo() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userElements = document.querySelectorAll('[data-user-display]');
        userElements.forEach(element => {
            element.textContent = currentUser;
        });
    }
}

export function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = './Login.html';
}

export function initializeAuthUI() {
    displayUserInfo();
    
    // Add logout button to navbar if not already present
    const navbar = document.querySelector('.navbar-nav');
    if (navbar && !document.querySelector('#logoutBtn')) {
        const logoutItem = document.createElement('li');
        logoutItem.className = 'nav-item';
        logoutItem.style.marginTop = 'auto';
        logoutItem.innerHTML = `
            <a id="logoutBtn" class="nav-link" href="#" style="cursor: pointer;">
                <img src="icons/logout.svg" alt="Logout" style="width: 2rem; min-width: 2rem; margin: 0 1.5rem; filter: drop-shadow(-3px -5px 0px #AA10D8);" />
                <span class="link-text">Logout</span>
            </a>
        `;
        navbar.appendChild(logoutItem);
        
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}
