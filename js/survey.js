// Función para actualizar la barra de progreso
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progress = (window.currentStep / window.totalSteps) * 100;
    
    if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Paso ${window.currentStep} de ${window.totalSteps}`;
    }
}

// Función para mostrar un paso específico
function showStep(step) {
    console.log('Showing step:', step);
    
    // Ocultar todos los pasos
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
        console.log('Removed active from:', el.id);
    });
    
    // Mostrar el paso actual
    const currentStepElement = document.getElementById(`step${step}`);
    console.log('Current step element:', currentStepElement);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        console.log('Added active to:', currentStepElement.id);
    } else {
        console.error(`Step element step${step} not found`);
    }
    
    // Actualizar botones
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = step === window.totalSteps ? 'none' : 'block';
    if (submitBtn) submitBtn.style.display = step === window.totalSteps ? 'block' : 'none';
    
    // Actualizar progreso
    updateProgress();
}

// Función para validar el paso actual
function validateStep(step) {
    let isValid = true;
    console.log('Validating step:', step);
    console.log('Form values:', {
        nombre: document.getElementById('nombre')?.value,
        edad: document.getElementById('edad')?.value,
        nivelEducativo: document.getElementById('nivel-educativo')?.value
    });

    // Validar campos según el paso
    if (step === 1) {
        // Validar nombre
        const nombre = document.getElementById('nombre');
        if (!nombre.value.trim()) {
            showError(nombre, 'Por favor, ingresa tu nombre');
            isValid = false;
        }

        // Validar edad
        const edad = document.getElementById('edad');
        if (!edad.value || edad.value < 12 || edad.value > 100) {
            showError(edad, 'Por favor, ingresa una edad válida (12-100)');
            isValid = false;
        }

        // Validar nivel educativo
        const nivelEducativo = document.getElementById('nivel-educativo');
        console.log('Nivel educativo:', nivelEducativo?.value);
        if (!nivelEducativo || !nivelEducativo.value) {
            showError(document.querySelector('select[name="nivel-educativo"]'), 'Por favor, selecciona tu nivel educativo');
            isValid = false;
        }
    } else if (step === 2) {
        // Validar estilo de aprendizaje
        const estiloAprendizaje = document.querySelector('input[name="estilo-aprendizaje"]:checked');
        if (!estiloAprendizaje) {
            const container = document.querySelector('input[name="estilo-aprendizaje"]').parentElement.parentElement;
            showError(container, 'Por favor, selecciona tu estilo de aprendizaje preferido');
            isValid = false;
        }

        // Validar presupuesto
        const presupuesto = document.querySelector('select[name="presupuesto"]');
        if (!presupuesto.value) {
            showError(presupuesto, 'Por favor, selecciona tu presupuesto mensual');
            isValid = false;
        }

        // Validar nivel de actividad
        const nivelActividad = document.querySelector('input[name="nivel-actividad"]:checked');
        if (!nivelActividad) {
            const container = document.querySelector('input[name="nivel-actividad"]').parentElement.parentElement;
            showError(container, 'Por favor, selecciona tu nivel de actividad preferido');
            isValid = false;
        }

        // Validar intereses
        const intereses = document.querySelectorAll('input[name="intereses"]:checked');
        if (intereses.length === 0) {
            const interesesContainer = document.querySelector('.grid-cols-2');
            showError(interesesContainer, 'Por favor, selecciona al menos un interés');
            isValid = false;
        }

        // Validar tipo de actividad
        const tipoActividad = document.querySelector('input[name="tipo-actividad"]:checked');
        if (!tipoActividad) {
            const tipoActividadContainer = document.querySelector('input[name="tipo-actividad"]').parentElement.parentElement;
            showError(tipoActividadContainer, 'Por favor, selecciona un tipo de actividad');
            isValid = false;
        }
    } else if (step === 3) {
        // Validar horas disponibles
        const horasDisponibles = document.querySelector('select[name="horas-disponibles"]');
        if (!horasDisponibles.value) {
            showError(horasDisponibles, 'Por favor, selecciona las horas disponibles');
            isValid = false;
        }

        // Validar días
        const dias = document.querySelectorAll('input[name="dias"]:checked');
        if (dias.length === 0) {
            const diasContainer = document.querySelector('.grid-cols-4');
            showError(diasContainer, 'Por favor, selecciona al menos un día');
            isValid = false;
        }
    } else if (step === 4) {
        // Validar términos y condiciones
        const terminos = document.getElementById('terminos');
        if (!terminos.checked) {
            showError(terminos, 'Debes aceptar los términos y condiciones');
            isValid = false;
        }
    }

    return isValid;
}

// Función para mostrar errores
function showError(element, message) {
    // Eliminar mensajes de error anteriores
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());

    // Crear y mostrar nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1 bg-red-50 p-2 rounded-md border border-red-200';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-1"></i>${message}`;

    // Si el elemento es un contenedor (para checkboxes/radios), agregar el error después del último elemento
    if (element.classList.contains('grid-cols-2') || element.classList.contains('grid-cols-4')) {
        element.parentElement.appendChild(errorDiv);
    } else {
        // Para inputs normales, agregar después del elemento
        element.parentElement.appendChild(errorDiv);
        
        // Resaltar el campo con error si es un input o select
        if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            element.classList.add('border-red-500', 'bg-red-50');
            
            // Eliminar el error cuando el usuario interactúe con el campo
            const removeError = () => {
                const error = element.parentElement.querySelector('.error-message');
                if (error) {
                    error.remove();
                }
                element.classList.remove('border-red-500', 'bg-red-50');
            };

            element.addEventListener('input', removeError);
            element.addEventListener('change', removeError);
        }
    }

    // Hacer scroll al primer error
    const firstError = document.querySelector('.error-message');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Función para ir al siguiente paso
function nextStep() {
    try {
        console.log('Next step called');
        console.log('Current step:', window.currentStep);
        console.log('Total steps:', window.totalSteps);
        
        const validated = validateStep(window.currentStep);
        console.log('Step validation result:', validated);
        
        if (validated) {
            console.log('Step validated, moving to next step');
            if (window.currentStep < window.totalSteps) {
                window.currentStep++;
                console.log('New step:', window.currentStep);
                showStep(window.currentStep);
                window.scrollTo(0, 0);
                
                // Actualizar resumen antes de mostrar el paso final
                if (window.currentStep === window.totalSteps) {
                    updateSummary();
                }
            }
        } else {
            console.log('Step validation failed');
        }
    } catch (error) {
        console.error('Error in nextStep:', error);
    }
}

// Función para ir al paso anterior
function prevStep() {
    if (window.currentStep > 1) {
        window.currentStep--;
        showStep(window.currentStep);
        window.scrollTo(0, 0);
    }
}

// Función para actualizar el resumen antes de enviar
function updateSummary() {
    const summaryDiv = document.getElementById('survey-summary');
    if (!summaryDiv) return;

    summaryDiv.innerHTML = '';

    // Datos básicos
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const nivelEducativo = document.getElementById('nivel-educativo').value;

    // Intereses
    const intereses = Array.from(document.querySelectorAll('input[name="intereses"]:checked'))
        .map(cb => cb.parentElement.textContent.trim());
    const tipoActividad = document.querySelector('input[name="tipo-actividad"]:checked')?.value;

    // Disponibilidad
    const horasDisponibles = document.querySelector('select[name="horas-disponibles"]').value;
    const dias = Array.from(document.querySelectorAll('input[name="dias"]:checked'))
        .map(cb => cb.parentElement.textContent.trim());

    // Obtener los nuevos valores
    const estiloAprendizaje = document.querySelector('input[name="estilo-aprendizaje"]:checked')?.value;
    const presupuesto = document.querySelector('select[name="presupuesto"]').value;
    const nivelActividad = document.querySelector('input[name="nivel-actividad"]:checked')?.value;

    // Traducir valores a texto más amigable
    const traducirEstilo = (estilo) => {
        const estilos = {
            'practico': 'Práctico',
            'visual': 'Visual',
            'teorico': 'Teórico'
        };
        return estilos[estilo] || estilo;
    };

    const traducirPresupuesto = (pres) => {
        const presupuestos = {
            'bajo': 'Menos de $50',
            'medio': '$50 - $150',
            'alto': 'Más de $150'
        };
        return presupuestos[pres] || pres;
    };

    const traducirNivel = (nivel) => {
        const niveles = {
            'bajo': 'Bajo - Actividades suaves',
            'medio': 'Medio - Actividades moderadas',
            'alto': 'Alto - Actividades intensas'
        };
        return niveles[nivel] || nivel;
    };

    // Crear el resumen HTML
    const summaryHTML = `
        <div class="space-y-4">
            <div>
                <h4 class="font-semibold">Datos Personales:</h4>
                <p>Nombre: ${nombre}</p>
                <p>Edad: ${edad}</p>
                <p>Nivel Educativo: ${nivelEducativo}</p>
            </div>
            <div>
                <h4 class="font-semibold">Intereses y Preferencias:</h4>
                <p>Actividades: ${intereses.join(', ') || 'No seleccionado'}</p>
                <p>Tipo de actividad: ${tipoActividad || 'No seleccionado'}</p>
                <p>Estilo de aprendizaje: ${traducirEstilo(estiloAprendizaje) || 'No seleccionado'}</p>
                <p>Nivel de actividad: ${traducirNivel(nivelActividad) || 'No seleccionado'}</p>
                <p>Presupuesto mensual: ${traducirPresupuesto(presupuesto) || 'No seleccionado'}</p>
            </div>
            <div>
                <h4 class="font-semibold">Disponibilidad:</h4>
                <p>Horas semanales: ${horasDisponibles}</p>
                <p>Días disponibles: ${dias.join(', ') || 'No seleccionado'}</p>
            </div>
        </div>
    `;

    summaryDiv.innerHTML = summaryHTML;
}

// Inicializar el formulario y configurar event listeners
// Initialize form when DOM is loaded
// Initialize form when DOM is loaded
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
                    nombre: document.getElementById('nombre')?.value || '',
                    edad: document.getElementById('edad')?.value || '',
                    nivelEducativo: document.getElementById('nivel-educativo')?.value || ''
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
                            .map(cb => cb.value),
                        tipoActividad: document.querySelector('input[name="tipo-actividad"]:checked')?.value,
                        estiloAprendizaje: document.querySelector('input[name="estilo-aprendizaje"]:checked')?.value,
                        nivelActividad: document.querySelector('input[name="nivel-actividad"]:checked')?.value
                    },
                    preferencias: {
                        presupuesto: document.querySelector('select[name="presupuesto"]').value
                    },
                    disponibilidad: {
                        horas: document.querySelector('select[name="horas-disponibles"]').value,
                        dias: Array.from(document.querySelectorAll('input[name="dias"]:checked'))
                            .map(cb => cb.value)
                    }
                };
                
                localStorage.setItem('surveyData', JSON.stringify(formData));
                window.location.href = 'result.html';
            }
        });
    } catch (error) {
        console.error('Error initializing form:', error);
    }
});
