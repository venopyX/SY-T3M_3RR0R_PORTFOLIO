document.addEventListener('DOMContentLoaded', function() {
    // Initialize date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Set build date
    const buildDate = new Date();
    buildDate.setDate(buildDate.getDate() - Math.floor(Math.random() * 5));
    document.getElementById('build-date').textContent = formatDate(buildDate);
    
    // Set up console input
    setupConsole();
    
    // Set up clickable error triggers
    setupErrorTriggers();
    
    // Add occasional glitches
    setupGlitches();
});

// Update the current date and time display
function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('datetime').textContent = formattedDate;
}

// Format date as YYYY-MM-DD HH:MM:SS
function formatDate(date) {
    return date.toISOString().replace('T', ' ').substring(0, 19);
}

// Set up console input functionality
function setupConsole() {
    const consoleInput = document.getElementById('console-input');
    
    consoleInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            processCommand(command);
            this.value = '';
        }
    });
}

// Process console commands
function processCommand(command) {
    const consoleElement = document.querySelector('.terminal-prompt').parentElement;
    
    // Create response element
    const response = document.createElement('div');
    response.classList.add('mb-2');
    
    switch(command) {
        case 'help':
            response.innerHTML = `
                <div class="text-blue-400 mb-1">Available commands:</div>
                <div class="ml-4 text-slate-300">help - Show this help message</div>
                <div class="ml-4 text-slate-300">about - Show developer information</div>
                <div class="ml-4 text-slate-300">projects - Display projects</div>
                <div class="ml-4 text-slate-300">contact - Show contact information</div>
                <div class="ml-4 text-slate-300">skills - List developer skills</div>
                <div class="ml-4 text-slate-300">clear - Clear console output</div>
                <div class="ml-4 text-slate-300">fix - Attempt to fix portfolio</div>
            `;
            break;
            
        case 'about':
            toggleProject('about-section');
            response.innerHTML = '<div class="text-green-400">Loading developer information...</div>';
            break;
            
        case 'projects':
            toggleProject('projects-section');
            response.innerHTML = '<div class="text-green-400">Loading projects collection...</div>';
            break;
            
        case 'contact':
            toggleProject('contact-section');
            response.innerHTML = '<div class="text-green-400">Loading contact information...</div>';
            break;
            
        case 'skills':
            response.innerHTML = `
                <div class="text-blue-400 mb-1">Developer Skills:</div>
                <div class="ml-4 text-slate-300">• JavaScript & TypeScript</div>
                <div class="ml-4 text-slate-300">• React & React Native</div>
                <div class="ml-4 text-slate-300">• Node.js & Express</div>
                <div class="ml-4 text-slate-300">• Python & Django</div>
                <div class="ml-4 text-slate-300">• MongoDB & PostgreSQL</div>
                <div class="ml-4 text-slate-300">• UI/UX Design</div>
            `;
            break;
            
        case 'clear':
            // Clear all responses except the initial help message
            const responses = consoleElement.querySelectorAll('div.mb-2:not(:last-child)');
            responses.forEach(el => {
                if (!el.textContent.includes('Try typing "help"')) {
                    el.remove();
                }
            });
            return;
            
        case 'fix':
            response.innerHTML = '<div class="text-yellow-400">Attempting to fix portfolio...</div>';
            setTimeout(() => {
                const fixResponse = document.createElement('div');
                fixResponse.classList.add('mb-2', 'text-red-400');
                fixResponse.textContent = "ERROR: Cannot fix portfolio. Try clicking highlighted code elements.";
                consoleElement.insertBefore(fixResponse, document.querySelector('.terminal-prompt'));
            }, 1500);
            break;
            
        default:
            response.innerHTML = `<div class="text-red-400">Command not recognized: "${command}". Type "help" for available commands.</div>`;
    }
    
    // Insert response before the input
    consoleElement.insertBefore(response, document.querySelector('.terminal-prompt'));
}

// Set up clickable error triggers
function setupErrorTriggers() {
    const triggers = document.querySelectorAll('.error-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            toggleProject(targetId);
            
            // Add a slight glitch effect when clicked
            this.classList.add('glitch');
            setTimeout(() => {
                this.classList.remove('glitch');
            }, 500);
        });
    });
}

// Toggle project visibility
function toggleProject(projectId) {
    const project = document.getElementById(projectId);
    const allProjects = document.querySelectorAll('.project-card');
    
    // First hide all projects
    allProjects.forEach(proj => {
        if (proj.id !== projectId) {
            proj.classList.remove('active');
            setTimeout(() => {
                proj.style.height = '0px';
            }, 10);
        }
    });
    
    // Show the target project
    if (!project.classList.contains('active')) {
        project.classList.add('active');
        const height = project.scrollHeight;
        
        // Use a small delay to ensure the height transition works
        setTimeout(() => {
            project.style.height = height + 'px';
            
            // Scroll to the project
            setTimeout(() => {
                project.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }, 10);
    }
}

// Set up random glitches
function setupGlitches() {
    // Types of glitches
    const glitches = [
        // Text flicker
        () => {
            const headers = document.querySelectorAll('h2, h3');
            if (headers.length > 0) {
                const randomHeader = headers[Math.floor(Math.random() * headers.length)];
                randomHeader.classList.add('glitch');
                setTimeout(() => {
                    randomHeader.classList.remove('glitch');
                }, 1000);
            }
        },
        
        // Console message
        () => {
            const consoleElement = document.querySelector('.terminal-prompt').parentElement;
            const glitchMessage = document.createElement('div');
            glitchMessage.classList.add('mb-2', 'text-yellow-400');
            glitchMessage.innerText = "WARNING: Memory leak detected in segment 0x" + 
                Math.floor(Math.random() * 1000000).toString(16).padStart(6, '0');
            consoleElement.insertBefore(glitchMessage, document.querySelector('.terminal-prompt'));
        },
        
        // Brief layout shift
        () => {
            const main = document.querySelector('main');
            main.style.transform = `translateX(${Math.random() * 3 - 1.5}px)`;
            setTimeout(() => {
                main.style.transform = '';
            }, 150);
        }
    ];
    
    // Trigger random glitches occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            const randomGlitch = glitches[Math.floor(Math.random() * glitches.length)];
            randomGlitch();
        }
    }, 5000);
}
