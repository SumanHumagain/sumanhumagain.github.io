/**
 * TERMINAL PORTFOLIO - INTERACTIVE JAVASCRIPT
 * Cyberpunk Edition with Matrix Effects
 */

// ===========================================
// MATRIX BACKGROUND EFFECT
// ===========================================

class MatrixEffect {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		if (!this.canvas) return;

		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.fontSize = 14;
		this.columns = this.canvas.width / this.fontSize;
		this.drops = Array(Math.floor(this.columns)).fill(1);

		this.chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?';

		window.addEventListener('resize', () => this.resize());
		this.animate();
	}

	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.columns = this.canvas.width / this.fontSize;
		this.drops = Array(Math.floor(this.columns)).fill(1);
	}

	animate() {
		this.ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.fillStyle = '#00ff41';
		this.ctx.font = this.fontSize + 'px monospace';

		for (let i = 0; i < this.drops.length; i++) {
			const char = this.chars[Math.floor(Math.random() * this.chars.length)];
			this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

			if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
				this.drops[i] = 0;
			}
			this.drops[i]++;
		}

		requestAnimationFrame(() => this.animate());
	}
}

// ===========================================
// BOOT SEQUENCE
// ===========================================

function initBootSequence() {
	const bootSequence = document.getElementById('boot-sequence');
	const terminalContent = document.getElementById('terminal-content');

	if (!bootSequence || !terminalContent) return;

	setTimeout(() => {
		bootSequence.style.display = 'none';
		terminalContent.style.display = 'block';

		// Ensure page stays at top after boot
		window.scrollTo(0, 0);

		initTypingEffect();
		initCommandInput();
	}, 3500);
}

// ===========================================
// TYPING EFFECT FOR ROLE
// ===========================================

function initTypingEffect() {
	const roles = [
		'Full Stack Software Developer',
		'AI & Automation Specialist',
		'DevOps Engineer',
		'Cloud Architect',
		'Code Wizard 🧙',
		'Bug Hunter 🐛',
		'Terminal Enthusiast 💻'
	];

	let roleIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	const typingSpeed = 100;
	const deletingSpeed = 50;
	const pauseTime = 2000;

	const typingElement = document.getElementById('typing-role');
	if (!typingElement) return;

	function type() {
		const currentRole = roles[roleIndex];

		if (isDeleting) {
			typingElement.textContent = currentRole.substring(0, charIndex - 1);
			charIndex--;
		} else {
			typingElement.textContent = currentRole.substring(0, charIndex + 1);
			charIndex++;
		}

		let timeout = isDeleting ? deletingSpeed : typingSpeed;

		if (!isDeleting && charIndex === currentRole.length) {
			timeout = pauseTime;
			isDeleting = true;
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
		}

		setTimeout(type, timeout);
	}

	type();
}

// ===========================================
// NAVIGATION SYSTEM
// ===========================================

function navigate(section) {
	const sections = ['skills-section', 'experience-section', 'projects-section'];

	if (section === 'back') {
		sections.forEach(id => {
			const el = document.getElementById(id);
			if (el) el.classList.add('hidden');
		});
		return;
	}

	sections.forEach(id => {
		const el = document.getElementById(id);
		if (el) el.classList.add('hidden');
	});

	const targetSection = document.getElementById(section + '-section');
	if (targetSection) {
		targetSection.classList.remove('hidden');
		// Don't scroll on page load, only on user navigation
		if (section) {
			setTimeout(() => {
				targetSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}, 100);
		}
	}
}

// ===========================================
// COMMAND SYSTEM
// ===========================================

const commands = {
	help: () => {
		return `
<div class="output">
<pre>Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span style="color: #ff2a6d;">help</span>        - Show this help message
<span style="color: #ff2a6d;">skills</span>      - View technical skills
<span style="color: #ff2a6d;">experience</span>  - View work experience
<span style="color: #ff2a6d;">projects</span>    - View portfolio projects
<span style="color: #ff2a6d;">stats</span>       - Show performance stats
<span style="color: #ff2a6d;">contact</span>     - Get contact information
<span style="color: #ff2a6d;">matrix</span>      - Enter the Matrix
<span style="color: #ff2a6d;">clear</span>       - Clear the terminal
<span style="color: #ff2a6d;">whoami</span>      - Display user info
<span style="color: #ff2a6d;">ls</span>          - List directories
<span style="color: #ff2a6d;">sudo</span>        - Try it 😏
<span style="color: #ff2a6d;">hack</span>        - Initiate hack sequence
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</pre>
</div>`;
	},

	skills: () => {
		navigate('skills');
		return '';
	},

	experience: () => {
		navigate('experience');
		return '';
	},

	projects: () => {
		navigate('projects');
		return '';
	},

	stats: () => {
		return `
<div class="output">
<pre style="color: #05d9e8;">
╔════════════════════════════════════════╗
║     PERFORMANCE METRICS - SUMAN        ║
╠════════════════════════════════════════╣
║ Companies Worked:      <span style="color: #00ff41;">4+</span>             ║
║ Projects Completed:    <span style="color: #00ff41;">20+</span>            ║
║ Technologies Mastered: <span style="color: #00ff41;">15+</span>            ║
║ Years of Experience:   <span style="color: #00ff41;">7+</span>             ║
║ Coffee Consumed:       <span style="color: #ff2a6d;">∞ cups</span>        ║
║ Bugs Fixed:            <span style="color: #00ff41;">9999+</span>          ║
║ Lines of Code:         <span style="color: #00ff41;">100K+</span>          ║
║ Code Quality:          <span style="color: #00ff41;">EXCELLENT</span>      ║
╚════════════════════════════════════════╝
</pre>
</div>`;
	},

	contact: () => {
		return `
<div class="output">
<pre style="color: #00ff41;">
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span style="color: #ff2a6d;">📧 CONTACT INFORMATION</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span style="color: #05d9e8;">Email:</span>    returnzerosh@gmail.com
<span style="color: #05d9e8;">Phone:</span>    +1 647 553 8666
<span style="color: #05d9e8;">GitHub:</span>   github.com/SumanHumagain
<span style="color: #05d9e8;">LinkedIn:</span> linkedin.com/in/returnzerosh
<span style="color: #05d9e8;">Location:</span> Sudbury, Ontario, Canada

<span style="color: #ffd300;">► Open to opportunities and collaborations!</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</pre>
</div>`;
	},

	clear: () => {
		const outputDiv = document.getElementById('command-output');
		if (outputDiv) outputDiv.innerHTML = '';
		return '';
	},

	whoami: () => {
		return `
<div class="output">
<pre style="color: #00ff41;">
<span style="color: #ff2a6d;">root@portfolio</span>

You are currently browsing the portfolio of:
<span style="color: #05d9e8; font-size: 18px;">SUMAN HUMAGAIN</span>

Role: <span style="color: #ffd300;">Full Stack Software Developer</span>
Superpower: <span style="color: #ff2a6d;">Turning coffee into code ☕→💻</span>
Status: <span style="color: #00ff41;">ONLINE & READY TO BUILD</span>
</pre>
</div>`;
	},

	ls: () => {
		return `
<div class="output">
<pre>
total 6
drwxr-xr-x  2 suman  staff   <span style="color: #05d9e8;">skills/</span>
drwxr-xr-x  2 suman  staff   <span style="color: #05d9e8;">experience/</span>
drwxr-xr-x  2 suman  staff   <span style="color: #05d9e8;">projects/</span>
-rwxr-xr-x  1 suman  staff   <span style="color: #00ff41;">stats.sh</span>
-rwxr-xr-x  1 suman  staff   <span style="color: #ff2a6d;">matrix.exe</span>
-rw-r--r--  1 suman  staff   contact.txt
</pre>
</div>`;
	},

	sudo: () => {
		return `
<div class="output">
<pre style="color: #ff2a6d;">
╔═══════════════════════════════════════╗
║  <span style="color: #ffd300;">⚠️  PERMISSION DENIED  ⚠️</span>           ║
╠═══════════════════════════════════════╣
║  Nice try! You need to hire me first  ║
║  to get sudo access 😎                ║
╚═══════════════════════════════════════╝
</pre>
</div>`;
	},

	hack: () => {
		let output = `<div class="output"><pre style="color: #00ff41;">`;
		output += `Initiating hack sequence...\n`;
		output += `[<span style="color: #ff2a6d;">████████████████████</span>] 100%\n\n`;
		output += `<span style="color: #05d9e8;">ACCESS GRANTED</span>\n`;
		output += `Connecting to mainframe...\n`;
		output += `Bypassing firewall...\n`;
		output += `Downloading secrets...\n\n`;
		output += `<span style="color: #ffd300;">SECRET REVEALED:</span>\n`;
		output += `The best way to "hack" this portfolio is to\n`;
		output += `click on the projects and check out my code! 🚀\n`;
		output += `</pre></div>`;
		return output;
	},

	matrix: () => {
		openMatrix();
		return '';
	}
};

// ===========================================
// COMMAND INPUT HANDLER
// ===========================================

function initCommandInput() {
	const input = document.getElementById('commandInput');
	if (!input) return;

	const commandHistory = [];
	let historyIndex = -1;

	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			const command = input.value.trim().toLowerCase();

			if (command) {
				commandHistory.unshift(command);
				historyIndex = -1;
				executeCommand(command);
			}

			input.value = '';
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				input.value = commandHistory[historyIndex];
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				input.value = commandHistory[historyIndex];
			} else {
				historyIndex = -1;
				input.value = '';
			}
		} else if (e.key === 'Tab') {
			e.preventDefault();
			const partial = input.value.toLowerCase();
			const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
			if (matches.length === 1) {
				input.value = matches[0];
			}
		}
	});

	// Focus input when clicking anywhere in terminal
	document.addEventListener('click', (e) => {
		// Don't scroll when focusing
		const scrollY = window.scrollY;
		input.focus({ preventScroll: true });
		window.scrollTo(0, scrollY);
	});

	// Initial focus without scrolling
	input.focus({ preventScroll: true });
}

function executeCommand(cmd) {
	const cmdName = cmd.split(' ')[0];

	// Create command output div if it doesn't exist
	let outputDiv = document.getElementById('command-output');
	if (!outputDiv) {
		outputDiv = document.createElement('div');
		outputDiv.id = 'command-output';
		const inputContainer = document.querySelector('.command-input-container');
		if (inputContainer && inputContainer.parentNode) {
			inputContainer.parentNode.insertBefore(outputDiv, inputContainer);
		}
	}

	// Add command to output
	const commandLine = document.createElement('div');
	commandLine.className = 'prompt-line';
	commandLine.innerHTML = `<span class="user">visitor@portfolio</span>:<span class="path">~</span>$ ${cmd}`;
	outputDiv.appendChild(commandLine);

	// Execute command
	if (commands[cmdName]) {
		const result = commands[cmdName](cmd);
		if (result) {
			const resultDiv = document.createElement('div');
			resultDiv.innerHTML = result;
			outputDiv.appendChild(resultDiv);
		}
	} else {
		const errorDiv = document.createElement('div');
		errorDiv.className = 'output';
		errorDiv.innerHTML = `<span style="color: #ff2a6d;">Command not found: ${cmd}</span>\nType '<span style="color: #05d9e8;">help</span>' for available commands.`;
		outputDiv.appendChild(errorDiv);
	}

	// Scroll command output into view
	const terminalContent = document.getElementById('terminal-content');
	if (terminalContent) {
		terminalContent.scrollTop = terminalContent.scrollHeight;
	}
}

// ===========================================
// MATRIX MODAL (Easter Egg)
// ===========================================

function openMatrix() {
	const modal = document.getElementById('matrix-modal');
	if (modal) {
		modal.style.display = 'block';

		// Initialize matrix canvas in modal
		const matrixCanvas = new MatrixEffect('matrix-modal-canvas');

		// Play sound if available
		playMatrixSound();
	}
}

function closeMatrix() {
	const modal = document.getElementById('matrix-modal');
	if (modal) {
		modal.style.display = 'none';
	}
}

function playMatrixSound() {
	// You can add sound effects here if desired
	console.log('🎵 Matrix theme playing...');
}

// Close modal when clicking outside
window.onclick = function(event) {
	const modal = document.getElementById('matrix-modal');
	if (event.target === modal) {
		closeMatrix();
	}
}

// ===========================================
// THEME TOGGLE
// ===========================================

function initThemeToggle() {
	const themeSwitch = document.getElementById('themeSwitch');
	if (!themeSwitch) return;

	themeSwitch.addEventListener('click', () => {
		document.body.classList.toggle('light-theme');

		const icon = themeSwitch.querySelector('i');
		if (document.body.classList.contains('light-theme')) {
			icon.className = 'fas fa-moon';
		} else {
			icon.className = 'fas fa-sun';
		}
	});
}

// ===========================================
// EASTER EGGS & SECRET COMMANDS
// ===========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
	konamiCode.push(e.key);
	konamiCode = konamiCode.slice(-10);

	if (konamiCode.join('') === konamiSequence.join('')) {
		activateKonamiEasterEgg();
	}
});

function activateKonamiEasterEgg() {
	alert('🎮 KONAMI CODE ACTIVATED! 🎮\n\nYou found the secret! You are a true geek! 🚀');
	document.body.style.animation = 'rainbow 2s infinite';

	setTimeout(() => {
		document.body.style.animation = '';
	}, 5000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
	@keyframes rainbow {
		0% { filter: hue-rotate(0deg); }
		100% { filter: hue-rotate(360deg); }
	}
`;
document.head.appendChild(style);

// ===========================================
// GLITCH EFFECT ON HOVER
// ===========================================

function initGlitchEffects() {
	const glitchElements = document.querySelectorAll('.glitch-text');

	glitchElements.forEach(el => {
		el.addEventListener('mouseenter', () => {
			el.style.animation = 'glitch 0.3s infinite';
		});

		el.addEventListener('mouseleave', () => {
			el.style.animation = 'glitch 2s infinite';
		});
	});
}

// ===========================================
// RANDOM GLITCH OVERLAY
// ===========================================

function randomGlitch() {
	setInterval(() => {
		if (Math.random() > 0.95) {
			const overlay = document.querySelector('.glitch-overlay');
			if (overlay) {
				overlay.style.opacity = '0.3';
				setTimeout(() => {
					overlay.style.opacity = '0';
				}, 100);
			}
		}
	}, 2000);
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
	// Scroll to top on page load
	window.scrollTo(0, 0);

	// Initialize Matrix background
	new MatrixEffect('matrix-canvas');

	// Initialize boot sequence
	initBootSequence();

	// Initialize theme toggle
	initThemeToggle();

	// Initialize glitch effects
	initGlitchEffects();

	// Start random glitches
	randomGlitch();

	// Console Easter Egg
	console.log('%c🚀 WELCOME TO THE MATRIX 🚀', 'color: #00ff41; font-size: 20px; font-weight: bold;');
	console.log('%cLooking for secrets? Try the Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #ff2a6d; font-size: 14px;');
	console.log('%cOr type "matrix" in the terminal...', 'color: #05d9e8; font-size: 14px;');
});

// ===========================================
// PERFORMANCE MONITORING
// ===========================================

if (window.performance) {
	window.addEventListener('load', () => {
		setTimeout(() => {
			const perfData = window.performance.timing;
			const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
			console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #ffd300; font-size: 12px;');
		}, 0);
	});
}

// ===========================================
// EXPOSE GLOBAL FUNCTIONS
// ===========================================

window.navigate = navigate;
window.executeCommand = executeCommand;
window.closeMatrix = closeMatrix;
