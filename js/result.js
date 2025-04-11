// Base de datos de actividades, cursos, videos y eventos
const activitiesDatabase = {
    deportes: [
        {
            title: "Fútbol Recreativo",
            description: "Únete a equipos locales de fútbol para principiantes y avanzados.",
            icon: "fas fa-futbol",
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
            level: "principiante",
            type: "grupal",
            intensidad: "alto",
            costoMensual: "medio",
            estiloAprendizaje: ["practico", "visual"]
        },
        {
            title: "Yoga para Estudiantes",
            description: "Clases de yoga adaptadas para reducir el estrés académico.",
            icon: "fas fa-pray",
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600",
            level: "principiante",
            type: "individual",
            intensidad: "bajo",
            costoMensual: "bajo",
            estiloAprendizaje: ["practico", "visual"]
        },
        {
            title: "Natación",
            description: "Aprende a nadar o mejora tu técnica con instructores certificados.",
            icon: "fas fa-swimming-pool",
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
            level: "intermedio",
            type: "individual",
            intensidad: "medio",
            costoMensual: "medio",
            estiloAprendizaje: ["practico"]
        }
    ],
    arte: [
        {
            title: "Pintura Creativa",
            description: "Talleres de pintura donde aprenderás diferentes técnicas artísticas.",
            icon: "fas fa-palette",
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
            level: "principiante",
            type: "individual",
            intensidad: "bajo",
            costoMensual: "medio",
            estiloAprendizaje: ["practico", "visual"]
        },
        {
            title: "Teatro Juvenil",
            description: "Grupo de teatro para desarrollar habilidades de expresión.",
            icon: "fas fa-theater-masks",
            bgColor: "bg-red-100",
            iconColor: "text-red-600",
            level: "principiante",
            type: "grupal",
            intensidad: "medio",
            costoMensual: "bajo",
            estiloAprendizaje: ["practico", "visual"]
        }
    ],
    tecnologia: [
        {
            title: "Programación Web",
            description: "Aprende a crear sitios web desde cero con HTML, CSS y JavaScript.",
            icon: "fas fa-laptop-code",
            bgColor: "bg-indigo-100",
            iconColor: "text-indigo-600",
            level: "principiante",
            type: "individual",
            intensidad: "bajo",
            costoMensual: "bajo",
            estiloAprendizaje: ["teorico", "practico"]
        },
        {
            title: "Robótica Básica",
            description: "Introducción a la robótica y programación de dispositivos.",
            icon: "fas fa-robot",
            bgColor: "bg-gray-100",
            iconColor: "text-gray-600",
            level: "intermedio",
            type: "grupal",
            intensidad: "medio",
            costoMensual: "alto",
            estiloAprendizaje: ["practico", "visual"]
        }
    ],
    musica: [
        {
            title: "Guitarra para Principiantes",
            description: "Clases de guitarra desde lo básico hasta nivel intermedio.",
            icon: "fas fa-guitar",
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
            level: "principiante",
            type: "individual",
            intensidad: "bajo",
            costoMensual: "medio",
            estiloAprendizaje: ["practico", "visual"]
        },
        {
            title: "Coro Estudiantil",
            description: "Grupo coral para desarrollar habilidades vocales y trabajo en equipo.",
            icon: "fas fa-music",
            bgColor: "bg-pink-100",
            iconColor: "text-pink-600",
            level: "principiante",
            type: "grupal",
            intensidad: "medio",
            costoMensual: "bajo",
            estiloAprendizaje: ["practico", "visual"]
        }
    ]
};

const videosDatabase = {
    deportes: [
        {
            title: "Rutinas de Ejercicio para Estudiantes",
            duration: "15 min",
            channel: "FitStudent"
        },
        {
            title: "Técnicas Básicas de Fútbol",
            duration: "20 min",
            channel: "DeporteJoven"
        }
    ],
    arte: [
        {
            title: "Dibujo para Principiantes",
            duration: "25 min",
            channel: "ArteCreativo"
        },
        {
            title: "Técnicas de Pintura Acrílica",
            duration: "30 min",
            channel: "PinturaFácil"
        }
    ],
    tecnologia: [
        {
            title: "Introducción a la Programación",
            duration: "45 min",
            channel: "CodeMaster"
        },
        {
            title: "Creación de Apps Móviles",
            duration: "35 min",
            channel: "TechLearn"
        }
    ],
    musica: [
        {
            title: "Primeros Pasos en Guitarra",
            duration: "20 min",
            channel: "MusicaJoven"
        },
        {
            title: "Teoría Musical Básica",
            duration: "30 min",
            channel: "AprenderMusica"
        }
    ]
};

const eventsDatabase = {
    deportes: [
        {
            title: "Torneo Interescolar de Fútbol",
            date: "15 de Mayo",
            location: "Polideportivo Central"
        },
        {
            title: "Maratón Estudiantil",
            date: "22 de Mayo",
            location: "Parque Municipal"
        }
    ],
    arte: [
        {
            title: "Exposición de Arte Joven",
            date: "10 de Mayo",
            location: "Centro Cultural"
        },
        {
            title: "Festival de Teatro Escolar",
            date: "18 de Mayo",
            location: "Auditorio Principal"
        }
    ],
    tecnologia: [
        {
            title: "Hackathon Juvenil",
            date: "20 de Mayo",
            location: "Centro de Innovación"
        },
        {
            title: "Feria de Tecnología",
            date: "25 de Mayo",
            location: "Centro de Convenciones"
        }
    ],
    musica: [
        {
            title: "Concierto de Bandas Estudiantiles",
            date: "12 de Mayo",
            location: "Teatro Municipal"
        },
        {
            title: "Festival de Música Joven",
            date: "28 de Mayo",
            location: "Plaza Central"
        }
    ]
};

// Función para cargar y procesar los datos de la encuesta
function loadSurveyData() {
    const surveyData = JSON.parse(localStorage.getItem('surveyData'));
    if (!surveyData) {
        window.location.href = 'survey.html';
        return;
    }
    return surveyData;
}

// Función para calcular la compatibilidad de una actividad
function calculateCompatibility(activity, surveyData) {
    let score = 0;
    const maxScore = 5;

    // Compatibilidad de tipo de actividad (individual/grupal)
    if (surveyData.intereses.tipoActividad === 'ambas' || activity.type === surveyData.intereses.tipoActividad) {
        score += 1;
    }

    // Compatibilidad de intensidad
    if (activity.intensidad === surveyData.intereses.nivelActividad) {
        score += 1;
    }

    // Compatibilidad de presupuesto
    if (activity.costoMensual === surveyData.preferencias.presupuesto) {
        score += 1;
    }

    // Compatibilidad de estilo de aprendizaje
    if (activity.estiloAprendizaje.includes(surveyData.intereses.estiloAprendizaje)) {
        score += 1;
    }

    // Normalizar el puntaje a un porcentaje
    return Math.round((score / maxScore) * 100);
}

// Función para generar recomendaciones basadas en los intereses y preferencias
function generateRecommendations(surveyData) {
    const recommendations = [];
    const interests = surveyData.intereses.actividades;

    interests.forEach(interest => {
        const activities = activitiesDatabase[interest];
        if (activities) {
            activities.forEach(activity => {
                const compatibility = calculateCompatibility(activity, surveyData);
                if (compatibility >= 50) { // Solo recomendar actividades con más del 50% de compatibilidad
                    recommendations.push({
                        ...activity,
                        compatibility: compatibility
                    });
                }
            });
        }
    });

    // Ordenar por compatibilidad (de mayor a menor)
    recommendations.sort((a, b) => b.compatibility - a.compatibility);
    return recommendations;
}

// Función para mostrar las recomendaciones en la página
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = '';

    recommendations.forEach(rec => {
        const card = document.createElement('div');
        card.className = `recommendation-card ${rec.bgColor} rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow`;
        
        // Crear el indicador de compatibilidad
        const compatibilityClass = rec.compatibility >= 80 ? 'bg-green-600' : 
                                 rec.compatibility >= 60 ? 'bg-yellow-500' : 'bg-orange-500';
        
        card.innerHTML = `
            <div class="relative">
                <div class="absolute top-0 right-0 flex items-center">
                    <span class="text-sm font-semibold ${compatibilityClass} text-white px-3 py-1 rounded-full">
                        ${rec.compatibility}% compatible
                    </span>
                </div>
                
                <div class="flex items-center mb-4">
                    <i class="${rec.icon} ${rec.iconColor} text-3xl"></i>
                    <h3 class="text-xl font-semibold ml-3">${rec.title}</h3>
                </div>
                
                <p class="text-gray-600 mb-4">${rec.description}</p>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-sm text-gray-600">
                        <i class="fas fa-signal mr-1"></i> Nivel: ${rec.level}
                    </div>
                    <div class="text-sm text-gray-600">
                        <i class="fas fa-users mr-1"></i> Tipo: ${rec.type === 'individual' ? 'Individual' : 'Grupal'}
                    </div>
                    <div class="text-sm text-gray-600">
                        <i class="fas fa-fire mr-1"></i> Intensidad: ${
                            rec.intensidad === 'bajo' ? 'Baja' :
                            rec.intensidad === 'medio' ? 'Media' : 'Alta'
                        }
                    </div>
                    <div class="text-sm text-gray-600">
                        <i class="fas fa-dollar-sign mr-1"></i> Costo: ${
                            rec.costoMensual === 'bajo' ? 'Económico' :
                            rec.costoMensual === 'medio' ? 'Moderado' : 'Premium'
                        }
                    </div>
                </div>
                
                <div class="flex justify-between items-center">
                    <div class="text-sm text-gray-600">
                        <i class="fas fa-graduation-cap mr-1"></i> 
                        Método: ${rec.estiloAprendizaje.map(estilo => 
                            estilo === 'practico' ? 'Práctico' :
                            estilo === 'visual' ? 'Visual' : 'Teórico'
                        ).join(', ')}
                    </div>
                    <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Más información
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Si no hay recomendaciones, mostrar mensaje
    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8">
                <div class="text-gray-500">
                    <i class="fas fa-search text-4xl mb-4"></i>
                    <p class="text-xl">No encontramos actividades que coincidan con tus preferencias.</p>
                    <p class="mt-2">Intenta ajustar tus filtros para ver más opciones.</p>
                </div>
            </div>
        `;
    }
}

// Función para mostrar videos recomendados
function displayVideos(interests) {
    const container = document.getElementById('videos-container');
    container.innerHTML = '';

    interests.forEach(interest => {
        const videos = videosDatabase[interest];
        if (videos) {
            videos.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.className = 'flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition';
                videoElement.innerHTML = `
                    <div class="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-play text-indigo-600"></i>
                    </div>
                    <div class="ml-4">
                        <h4 class="font-semibold">${video.title}</h4>
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-clock mr-1"></i> ${video.duration} • ${video.channel}
                        </p>
                    </div>
                `;
                container.appendChild(videoElement);
            });
        }
    });
}

// Función para mostrar eventos próximos
function displayEvents(interests) {
    const container = document.getElementById('events-container');
    container.innerHTML = '';

    interests.forEach(interest => {
        const events = eventsDatabase[interest];
        if (events) {
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition';
                eventElement.innerHTML = `
                    <div class="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-calendar text-indigo-600"></i>
                    </div>
                    <div class="ml-4">
                        <h4 class="font-semibold">${event.title}</h4>
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-map-marker-alt mr-1"></i> ${event.location}
                            <br>
                            <i class="fas fa-clock mr-1"></i> ${event.date}
                        </p>
                    </div>
                `;
                container.appendChild(eventElement);
            });
        }
    });
}

// Función para personalizar el mensaje de bienvenida
function updateWelcomeMessage(surveyData) {
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.textContent = `¡Hola ${surveyData.datosBasicos.nombre}! Basado en tus intereses, hemos seleccionado estas actividades para ti`;
}

// Inicializar la página de resultados
document.addEventListener('DOMContentLoaded', () => {
    const surveyData = loadSurveyData();
    if (surveyData) {
        updateWelcomeMessage(surveyData);
        const recommendations = generateRecommendations(surveyData);
        displayRecommendations(recommendations);
        displayVideos(surveyData.intereses.actividades);
        displayEvents(surveyData.intereses.actividades);
    }
});
