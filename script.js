// Image Slider Functionality
let slideIndex = 0;
let slides = [];
let dots = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.slider-dot');
    if (slides.length > 0) {
        showSlide(1);
    }
});

function showSlide(n) {
    const slider = document.getElementById('imageSlider');
    if (!slider || slides.length === 0) return;
    
    slideIndex = n;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    slider.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
    
    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex - 1]?.classList.add('active');
    }
}

function currentSlide(n) {
    showSlide(n);
}

function autoSlide() {
    if (slides.length > 0) {
        slideIndex++;
        showSlide(slideIndex);
    }
}

// Auto slide every 5 seconds
setInterval(autoSlide, 5000);

// Form Validation and Display
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const form = this;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Display submitted data
        displayFormData(data);
        
        // Show success message
        const formDisplay = document.getElementById('formDisplay');
        if (formDisplay) {
            formDisplay.style.display = 'block';
            formDisplay.scrollIntoView({ behavior: 'smooth' });
            formDisplay.classList.add('fade-in');
        }
    });
}

function displayFormData(data) {
    const displayDiv = document.getElementById('displayData');
    if (!displayDiv) return;
    
    displayDiv.innerHTML = '';

    const fields = {
        firstName: 'First Name',
        lastName: 'Last Name',
        fatherName: "Father's Name",
        address: 'Address',
        district: 'District',
        state: 'State',
        phone: 'Phone Number',
        email: 'Email',
        course: 'Course Applied',
        gender: 'Gender',
        caste: 'Caste',
        religion: 'Religion',
        birthState: 'State of Birth',
        occupation: 'Occupation',
        centerName: 'Training Center',
        education: 'Education Qualification',
        experience: 'Working Experience',
        previousCourse: 'Previous Course',
        aadhaar: 'Aadhaar Number',
        pan: 'PAN Number'
    };

    for (const [key, label] of Object.entries(fields)) {
        if (data[key]) {
            const div = document.createElement('div');
            div.className = 'display-item';
            div.innerHTML = `<strong>${label}:</strong> ${data[key]}`;
            displayDiv.appendChild(div);
        }
    }
}

// AI Chatbot Functionality
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    }
}

function handleChat(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('chatInput');
        if (!input) return;
        
        const message = input.value.trim();
        
        if (message) {
            addChatMessage(message, 'user');
            input.value = '';
            
            // AI Response
            setTimeout(() => {
                const response = getAIResponse(message);
                addChatMessage(response, 'bot');
            }, 1000);
        }
    }
}

function addChatMessage(message, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    if (!messagesDiv) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.style.margin = '10px 0';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.maxWidth = '80%';
    
    if (sender === 'user') {
        messageDiv.style.background = '#667eea';
        messageDiv.style.color = 'white';
        messageDiv.style.marginLeft = 'auto';
    } else {
        messageDiv.style.background = '#f1f1f1';
        messageDiv.style.color = 'black';
    }
    
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getAIResponse(message) {
    const responses = {
        'courses': 'We offer 8 courses: PGDCA, ADCA, DCA, Video & Photo Editing, Web Development, App Development, Software Development, and AI & Data Science. Fees range from ₹12,000 to ₹20,000.',
        'fees': 'Course fees range from ₹12,000 to ₹20,000. Check our courses table for detailed pricing.',
        'admission': 'You can apply online through our admission form. Fill in your personal, academic, and other details to get started.',
        'contact': 'You can reach us at +91 9123456789 or info@iapsbiswanath.ac.in. Visit us at Main Road, Biswanath Chariali, Assam.',
        'duration': 'Course durations vary from 3 months to 18 months depending on the program you choose.',
        'default': 'I\'m here to help! Ask me about courses, fees, admission process, or anything else about IAPS Academy.'
    };

    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return responses.default;
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add loading animation to form submission
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', function() {
        const form = document.getElementById('admissionForm');
        if (form && form.checkValidity()) {
            this.innerHTML = '<span class="loading"></span> Processing...';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Application Submitted!';
            }, 2000);
        }
    });
}

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider if elements exist
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.slider-dot');
    if (slides.length > 0 && dots.length > 0) {
        showSlide(1);
    }
});
