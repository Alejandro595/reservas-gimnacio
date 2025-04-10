// Datos simulados para entrenadores, reservas, progreso y foro
const trainers = [
    { name: 'Entrenador de Boxeo', type: 'boxing', price: 30, availableTimes: ['10:00 AM', '2:00 PM', '5:00 PM'] },
    { name: 'Entrenador de Fitness', type: 'fitness', price: 25, availableTimes: ['9:00 AM', '11:00 AM', '3:00 PM'] },
];

let reservations = [];
let exercisesCompleted = 0;
let achievements = [];
let forumPosts = [];

// Función para cambiar entre pantallas
function goToScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Función para cargar entrenadores según especialidad
function loadTrainersBySpecialty() {
    const specialty = document.getElementById('specialty-select').value;
    const trainersList = document.getElementById('trainers-list');
    trainersList.innerHTML = '';

    const filteredTrainers = specialty ? trainers.filter(t => t.type === specialty) : trainers;

    filteredTrainers.forEach(trainer => {
        const trainerItem = document.createElement('li');
        trainerItem.textContent = `${trainer.name} (${trainer.type}) - $${trainer.price}/hora. Horarios disponibles: ${trainer.availableTimes.join(', ')}`;
        trainersList.appendChild(trainerItem);
    });
}

// Función para confirmar la reserva de clase
function confirmReservation() {
    const trainerSelect = document.getElementById('trainer-select').value;
    const reservationTime = document.getElementById('reservation-time').value;

    if (!reservationTime) {
        alert('Por favor, selecciona una fecha y hora');
        return;
    }

    const trainer = trainers.find(t => t.type === trainerSelect);
    if (trainer) {
        reservations.push({ trainer: trainer.name, time: reservationTime });
        alert(`Reserva confirmada con ${trainer.name} a las ${reservationTime}.`);
        goToScreen('home-screen');
    }
}

// Función para mostrar las notificaciones
function loadNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = '';

    reservations.forEach(reservation => {
        const notificationItem = document.createElement('li');
        notificationItem.textContent = `Reserva confirmada con ${reservation.trainer} a las ${reservation.time}`;
        notificationsList.appendChild(notificationItem);
    });
}

// Función para completar una tarea y aumentar el progreso
function completeTask() {
    exercisesCompleted++;
    document.getElementById('exercises-completed').textContent = exercisesCompleted;

    if (exercisesCompleted >= 10 && !achievements.includes('¡Logro alcanzado: 10 ejercicios completados!')) {
        achievements.push('¡Logro alcanzado: 10 ejercicios completados!');
    }

    if (exercisesCompleted >= 20 && !achievements.includes('¡Logro alcanzado: 20 ejercicios completados!')) {
        achievements.push('¡Logro alcanzado: 20 ejercicios completados!');
    }

    loadAchievements();
}

// Función para cargar los logros
function loadAchievements() {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';

    achievements.forEach(achievement => {
        const achievementItem = document.createElement('li');
        achievementItem.textContent = achievement;
        achievementsList.appendChild(achievementItem);
    });
}

// Función para publicar en el foro
function submitPost() {
    const postText = document.getElementById('forum-post').value;
    if (postText) {
        forumPosts.push(postText);
        const forumPostsList = document.getElementById('forum-posts');
        const postItem = document.createElement('li');
        postItem.textContent = postText;
        forumPostsList.appendChild(postItem);
        document.getElementById('forum-post').value = '';  // Limpiar textarea
    }
}

// Al cargar la página, mostrar la pantalla de inicio
window.onload = function() {
    goToScreen('home-screen');
    loadTrainersBySpecialty();  // Cargar entrenadores según especialidad
    loadNotifications();  // Cargar notificaciones
};
