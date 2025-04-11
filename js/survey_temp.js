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
