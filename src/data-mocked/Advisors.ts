// Interfaz TypeScript para los asesores
export interface Advisor {
  id: string
  nameAdvisor: string
  email: string
  phone: string
  specialty: string[]
  schedule: ScheduleSlot[]
  appointments: Appointment[]
}

export interface ScheduleSlot {
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado'
  start: string // HH:MM formato 24h
  end: string // HH:MM formato 24h
}

export interface Appointment {
  id: string
  client: string
  date: string // ISO 8601
  start: string // HH:MM
  end: string // HH:MM
  status: 'confirmada' | 'pendiente' | 'completada'
}

// Datos simulados de asesores
export const advisors: Advisor[] = [
  {
    id: 'adv-001',
    nameAdvisor: 'María Rodríguez',
    email: 'mrodriguez@inmobiliaria.com',
    phone: '+574604123456',
    specialty: ['El Poblado', 'apartamentos de lujo'],
    schedule: [
      { day: 'Lunes', start: '09:00', end: '13:00' },
      { day: 'Lunes', start: '14:00', end: '18:00' },
      { day: 'Miércoles', start: '08:00', end: '12:00' },
      { day: 'Jueves', start: '10:00', end: '17:00' },
      { day: 'Viernes', start: '09:30', end: '16:30' },
    ],
    appointments: [
      {
        id: 'app-101',
        client: 'Carlos Andrade',
        date: '2025-06-25',
        start: '10:00',
        end: '11:30',
        status: 'confirmada',
      },
      {
        id: 'app-102',
        client: 'Laura Gutiérrez',
        date: '2025-06-25',
        start: '15:00',
        end: '16:00',
        status: 'pendiente',
      },
    ],
  },
  {
    id: 'adv-002',
    nameAdvisor: 'Carlos Vélez',
    email: 'cvelez@casasymas.com',
    phone: '+574604654321',
    specialty: ['Laureles', 'casas familiares'],
    schedule: [
      { day: 'Martes', start: '08:30', end: '12:30' },
      { day: 'Miércoles', start: '09:00', end: '13:00' },
      { day: 'Miércoles', start: '14:30', end: '18:00' },
      { day: 'Jueves', start: '10:00', end: '16:00' },
      { day: 'Sábado', start: '09:00', end: '13:00' },
    ],
    appointments: [
      {
        id: 'app-201',
        client: 'Roberto Sánchez',
        date: '2025-06-25',
        start: '11:00',
        end: '12:30',
        status: 'confirmada',
      },
      {
        id: 'app-202',
        client: 'Sofía Ramírez',
        date: '2025-06-26',
        start: '15:30',
        end: '17:00',
        status: 'confirmada',
      },
    ],
  },
  {
    id: 'adv-003',
    nameAdvisor: 'Laura Gutiérrez',
    email: 'lgutierrez@comerciales.com',
    phone: '+574604112233',
    specialty: ['locales comerciales', 'oficinas'],
    schedule: [
      { day: 'Lunes', start: '10:00', end: '18:00' },
      { day: 'Martes', start: '08:00', end: '16:00' },
      { day: 'Jueves', start: '09:00', end: '17:00' },
      { day: 'Viernes', start: '07:30', end: '15:30' },
    ],
    appointments: [
      {
        id: 'app-301',
        client: 'Inversiones ABC',
        date: '2025-06-25',
        start: '10:30',
        end: '12:00',
        status: 'confirmada',
      },
      {
        id: 'app-302',
        client: 'Restaurante La Casona',
        date: '2025-06-25',
        start: '14:00',
        end: '15:30',
        status: 'confirmada',
      },
      {
        id: 'app-303',
        client: 'Farmacias Salud',
        date: '2025-06-27',
        start: '11:00',
        end: '12:30',
        status: 'pendiente',
      },
    ],
  },
]

export const getAllAdvisors = () => {
  return  advisors
}

export const getByName = (name: string) => {
  const advisor = advisors.find((advisor) =>
    advisor.nameAdvisor.toLowerCase().includes(name.toLowerCase()),
  )

  if (!advisor) {
    return {
      status: 'error',
      message: 'No se encontró al asesor',
    }
  }

  return advisor
}

export const getAvailability = (name: string, date: string) => {
  const advisor = getByName(name)

  if (!advisor) {
    return {
      status: 'error',
      message: 'No se encontró al asesor',
    }
  }

  const availability = calculateAvailability(advisor as Advisor, date)

  return availability
}

// Función para calcular disponibilidad
function calculateAvailability(
  advisor: Advisor,
  dateString: string,
): { time: string; available: boolean }[] {
  const date = new Date(dateString)
  const dayName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][
    date.getDay()
  ]

  // Encontrar el horario para este día
  const daySchedule = advisor.schedule.filter((s) => s.day === dayName)

  if (daySchedule.length === 0) {
    return [{ time: 'Todo el día', available: false }]
  }

  // Generar slots de 30 minutos
  const slots: { time: string; available: boolean }[] = []

  daySchedule.forEach((scheduleSlot) => {
    const start = parseInt(scheduleSlot.start.split(':')[0])
    const end = parseInt(scheduleSlot.end.split(':')[0])

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const fullDateTime = `${dateString}T${time}:00`

        // Verificar si hay citas en este horario
        const isBooked = advisor.appointments.some(
          (app) => app.date === dateString && app.start <= time && time < app.end,
        )

        slots.push({
          time: time,
          available: !isBooked,
        })
      }
    }
  })

  return slots
}

export function generateAppointmentId(): string {
  return 'app-' +  crypto.randomUUID()
}


// Función para verificar disponibilidad
export function isSlotAvailable(
  advisor: Advisor,
  date: string,
  start: string,
  duration: number
): boolean {
  const dayName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][
    new Date(date).getDay()
  ];

  // 1. Verificar si el asesor trabaja ese día
  const daySchedule = advisor.schedule.find(s => s.day === dayName);
  if (!daySchedule) return false;

  // Calcular hora de fin
  const [startHour, startMinute] = start.split(':').map(Number);
  const endMinutes = startMinute + duration;
  const endHour = startHour + Math.floor(endMinutes / 60);
  const endMinute = endMinutes % 60;
  const end = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

  // 2. Verificar si está dentro del horario laboral
  if (start < daySchedule.start || end > daySchedule.end) {
    return false;
  }
 // 3. Verificar conflicto con otras citas
  return !advisor.appointments.some(app => {
    if (app.date !== date) return false;
    
    const appStart = app.start.split(':').map(Number);
    const appEnd = app.end.split(':').map(Number);
    const slotStart = [startHour, startMinute];
    const slotEnd = [endHour, endMinute];
    
    // Conversión a minutos totales para comparación
    const toMinutes = (time: number[]) => time[0] * 60 + time[1];
    
    return (
      toMinutes(slotStart) < toMinutes(appEnd) &&
      toMinutes(slotEnd) > toMinutes(appStart)
    );
  });
}

export function convertRelativeDate(dateInput: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return dateInput; // Ya es formato correcto
  }

  const today = new Date();
  const normalizedInput = dateInput.toLowerCase();

  if (normalizedInput === 'hoy') {
    return today.toISOString().split('T')[0];
  }

  if (normalizedInput === 'mañana') {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  if (normalizedInput === 'pasado mañana') {
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow.toISOString().split('T')[0];
  }

  // Manejar días de la semana
  const daysOfWeek = [
    'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
  ];
  const dayIndex = daysOfWeek.findIndex(d => normalizedInput.includes(d));
  
  if (dayIndex !== -1) {
    const targetDay = new Date(today);
    const currentDay = targetDay.getDay();
    let daysToAdd = (dayIndex - currentDay + 7) % 7;
    daysToAdd = daysToAdd === 0 ? 7 : daysToAdd; // Si es hoy, agendar para la próxima semana
    targetDay.setDate(targetDay.getDate() + daysToAdd);
    return targetDay.toISOString().split('T')[0];
  }

  return null;
}