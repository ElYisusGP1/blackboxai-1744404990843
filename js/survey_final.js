// Function to show a specific step
function showStep(step) {
    console.log('Showing step:', step);
    
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
        console.log('Removed active from:', el.id);
    });
    
    // Show the current step
    const currentStepElement = document.getElementById(`step${step}`);
    console.log('Current step element:', currentStepElement);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        console.log('Added active to:', currentStepElement.id);
    } else {
        console.error(`Step element step${step} not found`);
    }
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = step === window.totalSteps ? 'none' : 'block';
    if (submitBtn) submitBtn.style.display = step === window.totalSteps ? 'block' : 'none';
}

// Function to validate the current step
function validateStep(step) {
    let isValid = true;
    console.log('Validating step:', step);
    
    // Validate fields based on the step
    if (step === 1) {
        // Validate name
        const nombre = document.getElementById('nombre');
        if (!nombre.value.trim()) {
            showError(nombre, 'Por favor, ingresa tu nombre');
            isValid = false;
        }

        // Validate age
        const edad = document.getElementById('edad');
        if (!edad.value || edad.value < 12 || edad.value > 100) {
            showError(edad, 'Por favor, ingresa una edad válida (12-100)');
            isValid = false;
        }

        // Validate educational level
        const nivelEducativo = document.getElementById('nivel-educativo');
        if (!nivelEducativo || !nivelEducativo.value) {
            showError(nivelEducativo, 'Por favor, selecciona tu nivel educativo');
            isValid = false;
        }
    }
    
    return isValid;
}

// Function to show errors
function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove previous error if exists
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    element.parentElement.appendChild(errorDiv);
    
    // Highlight the field with error
    element.classList.add('error');
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
        element.classList.remove('error');
    }, 3000);
}

// Function to update the summary
function updateSummary() {
    const summaryDiv = document.getElementById('survey-summary');
    if (!summaryDiv) return;

    summaryDiv.innerHTML = '';

    // Basic data
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const nivelEducativo = document.getElementById('nivel-educativo').value;

    // Create summary HTML
    const summaryHTML = `
        <div>
            <h4>Resumen de tus respuestas:</h4>
            <p>Nombre: ${nombre}</p>
            <p>Edad: ${edad}</p>
            <p>Nivel Educativo: ${nivelEducativo}</p>
        </div>
    `;

    summaryDiv.innerHTML = summaryHTML;
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Document loaded, initializing form...');
        
        // Variables globales
        window.currentStep = 1;
        window.totalSteps = 4;

        // Mostrar el primer paso
        showStep(1);
        console.log('Initial step shown');
        
        // Get form and buttons
        const form = document.getElementById('survey-form');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (!form || !nextBtn) {
            throw new Error('Required elements not found');
        }
        
        // Handle next button click
        nextBtn.addEventListener('click', function(e) {
            try {
                e.preventDefault();
                console.log('Next button clicked');
                
                // Log current form state
                const formData = {
                    nombre: document.getElementById('nombre').value || '',
                    edad: document.getElementById('edad').value || '',
                    nivelEducativo: document.getElementById('nivel-educativo').value || ''
                };
                console.log('Current form data:', formData);
                
                // Validate and proceed
                if (validateStep(window.currentStep)) {
                    console.log('Step', window.currentStep, 'validated');
                    if (window.currentStep < window.totalSteps) {
                        window.currentStep++;
                        showStep(window.currentStep);
                        console.log('Moved to step', window.currentStep);
                        
                        if (window.currentStep === window.totalSteps) {
                            updateSummary();
                            console.log('Summary updated');
                        }
                    }
                } else {
                    console.log('Validation failed for step', window.currentStep);
                }
            } catch (error) {
                console.error('Error in next button handler:', error);
            }
            return false;
        });
        
        // Handle previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                prevStep();
            });
        }
        
        // Prevent form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            return false;
        });
        
        console.log('Form initialization complete');
    } catch (error) {
        console.error('Error initializing form:', error);
    }
});
