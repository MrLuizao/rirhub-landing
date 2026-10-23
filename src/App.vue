<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Brain,
  Megaphone,
  CreditCard,
  Trophy,
  QrCode,
  MessageSquare,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  CheckCircle2,
  Building2,
  TrendingUp,
  Zap,
  ShieldCheck,
  Smartphone,
  Laptop,
  Flame,
  X,
  Activity,
  DollarSign,
  Layers,
  Lock,
  Calendar,
  Bell,
  MapPin,
  Tag,
  AlertTriangle,
  Clock,
  Eye,
  MousePointerClick,
  Store,
  Signal,
  Wifi,
  BatteryFull,
  Phone,
  MessageCircle,
  Star,
  Camera,
  Globe,
  Dumbbell,
  ExternalLink
} from 'lucide-vue-next'

// Modal State
const isModalOpen = ref(false)
const modalSubmitted = ref(false)
const form = ref({
  name: '',
  gymName: '',
  branches: '1 a 3 sedes',
  email: '',
  phone: '',
  interest: 'IA + Publicidad + Gestión'
})

const openDemoModal = () => {
  isModalOpen.value = true
  modalSubmitted.value = false
}

const closeDemoModal = () => {
  isModalOpen.value = false
}

const submitDemoForm = () => {
  if (!form.value.name || !form.value.email || !form.value.phone) return
  modalSubmitted.value = true
}

// ═════════════════════════════════════════════════════════════════════════
// SIMULADOR INTERACTIVO DEL SEMÁFORO DE IA (Para entender el valor real)
// ═════════════════════════════════════════════════════════════════════════
const activeAiTab = ref('warning') // 'healthy' | 'warning' | 'critical'

const aiSimulatorCases = {
  healthy: {
    status: 'Socio Activo y Saludable',
    tag: 'Riesgo Mínimo (4%)',
    color: 'emerald',
    badgeClass: 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40',
    member: {
      name: 'Sofía Navarro',
      plan: 'Membresía Black Multi-Sede',
      habit: 'Asiste 4 días por semana (Lunes a Jueves, 7:00 AM)',
      history: 'Racha activa de 6 semanas consecutivas con meta cumplida.'
    },
    aiDetection:
      'La IA confirma consistencia de asistencia en su horario habitual. No presenta cambios en su comportamiento de check-in.',
    actionTaken:
      'El sistema abona automáticamente 50 puntos de lealtad a su cuenta y mantiene su racha activa.',
    businessOutcome: 'Cliente fidelizado con alta probabilidad de renovación anual.'
  },
  warning: {
    status: 'Alerta Temprana de Deserción',
    tag: 'Riesgo Medio (52%) — 18 Días Antes',
    color: 'amber',
    badgeClass: 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40',
    member: {
      name: 'Daniel Morales',
      plan: 'Plan Plus Mensual',
      habit: 'Solía venir 3 veces por semana; lleva 8 días sin registrar check-in',
      history: 'Rompió su racha semanal y canceló su última reserva de Spinning.'
    },
    aiDetection:
      'La IA detectó una ruptura abrupta en el patrón de asistencia. La probabilidad de baja dentro de 3 semanas aumentó al 52%.',
    actionTaken:
      'Disparo automático de Push Inteligente: «¡Daniel, tu racha aún puede salvarse! Reserva hoy tu clase favorita y te regalamos 50 pts dobles».',
    businessOutcome: 'Reenganche preventivo oportuno antes de que el socio tome la decisión de cancelar.'
  },
  critical: {
    status: 'Riesgo Crítico de Cancelación',
    tag: 'Riesgo Alto (88%) — Acción Inmediata',
    color: 'rose',
    badgeClass: 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40',
    member: {
      name: 'Mariana Fuentes',
      plan: 'Plan Individual Estándar',
      habit: '17 días continuos sin pisar el gimnasio; renovación en 5 días',
      history: 'Dejó de responder encuestas y su tiempo promedio de sesión cayó a cero.'
    },
    aiDetection:
      'Patrón clásico de abandono silencioso. Sin intervención humana o incentivo directo, el socio cancelará su domiciliación en 5 días.',
    actionTaken:
      '1) Se genera una tarea prioritaria en la consola de recepción para llamada de cortesía del staff. 2) Se envía un pase digital gratuito para que invite a un amigo a entrenar este fin de semana.',
    businessOutcome: 'Recuperas una mensualidad de $750 MXN que ya estaba prácticamente perdida.'
  }
}

// ═════════════════════════════════════════════════════════════════════════
// SIMULADOR INTERACTIVO DE PUBLICIDAD LOCAL (Formatos y flujo de dinero)
// ═════════════════════════════════════════════════════════════════════════
const activeAdTab = ref('dual') // 'dual' | 'carousel' | 'sheet' | 'directory' | 'push' | 'selfserve'
const selectedAdvertiserIdx = ref(0)

const sampleAdvertisers = [
  {
    id: 'alpha',
    name: 'Nutrición Deportiva Alpha',
    category: 'Suplementos & Proteína',
    badge: 'ALIADO',
    title: '20% OFF en Proteínas Isolate',
    subtitle: 'Presenta tu credencial digital en mostrador',
    ctaLabel: 'Ver oferta',
    brandColor: '#6d5df1',
    image: '/shots/publicidad.png',
    description:
      'Especialistas en suplementación deportiva, asesoría nutricional y accesorios para atletas de alto rendimiento.',
    phone: '55 1234 5678',
    whatsapp: '55 9876 5432',
    address: 'Av. Insurgentes Sur #412 · a 250m del gym',
    socials: [
      { icon: Camera, label: '@alphasports' },
      { icon: Globe, label: 'alpha.fit' },
      { icon: Star, label: 'Facebook' }
    ]
  },
  {
    id: 'kinesport',
    name: 'KineSport Fisioterapia',
    category: 'Fisioterapia & Descarga',
    badge: 'ALIADO',
    title: 'Valoración Gratuita + 15% OFF',
    subtitle: 'En terapia de descarga muscular y masajes deportivos',
    ctaLabel: 'Agendar cita',
    brandColor: '#38bdf8',
    image: '/shots/app/04-aliados.png',
    description:
      'Clínica de fisioterapia enfocada en prevención de lesiones, recuperación muscular y optimización biomecánica para socios de gimnasio.',
    phone: '55 4321 8765',
    whatsapp: '55 8765 4321',
    address: 'Calle Durango #180, Col. Roma · a 180m',
    socials: [
      { icon: Camera, label: '@kinesport.mx' },
      { icon: Globe, label: 'kinesport.com' },
      { icon: Star, label: 'Facebook' }
    ]
  },
  {
    id: 'greenbowl',
    name: 'Green Bowl Healthy Bar',
    category: 'Comida Fit & Smoothies',
    badge: 'ALIADO',
    title: 'Smoothie Proteico Gratis en tu Bowl',
    subtitle: 'Al mostrar tu check-in de hoy en la app',
    ctaLabel: 'Ver menú fit',
    brandColor: '#4ade80',
    image: '/shots/app/05-descuentos.png',
    description:
      'Bowls energéticos, ensaladas personalizadas, jugos prensados en frío y snacks nutritivos para antes o después de entrenar.',
    phone: '55 9012 3456',
    whatsapp: '55 6543 2109',
    address: 'Plaza Galerías, Local 14 · Frente al gym',
    socials: [
      { icon: Camera, label: '@greenbowlfit' },
      { icon: Globe, label: 'greenbowl.mx' },
      { icon: Star, label: 'Facebook' }
    ]
  }
]

const currentAdvertiser = computed(
  () => sampleAdvertisers[selectedAdvertiserIdx.value] || sampleAdvertisers[0]
)

const demoWeekDays = computed(() => {
  const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const today = (new Date().getDay() + 6) % 7 // Lun=0 … Dom=6
  const monday = new Date()
  monday.setDate(monday.getDate() - today)
  return labels.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return {
      label,
      num: d.getDate(),
      visited: i < Math.min(today, 3),
      today: i === today,
      future: i > today
    }
  })
})

const adFormats = {
  dual: {
    title: 'Los 2 Puntos Clave de Conversión para Anunciantes',
    subtitle: 'Así se ve en el Home + Tu ficha de aliado al tocar',
    description:
      'El socio ve el banner en el carrusel principal cada vez que abre la app para hacer check-in o ver aforo. Al tocarlo, se abre su Ficha de Aliado con cupón de descuento, contacto a WhatsApp en un clic y ruta GPS en Google Maps.',
    stats: '100% de socios activos lo ven · 14% a 18% tasa de tap · Cero intermediarios',
    pricingTip: 'Precio sugerido: $1,500 – $2,500 MXN / semana por negocio',
    image: '/shots/publicidad.png',
    clientDemo: {
      advertiser: 'Negocios de tu Zona',
      promo: 'Presencia destacada en el Home + Página de conversión completa'
    }
  },
  carousel: {
    title: 'Así se ve en el Home (Carrusel Destacado)',
    subtitle: 'El espacio con mayor visibilidad del gimnasio',
    description:
      'Aparece en la parte superior del Home de la aplicación móvil. Cada socio lo ve obligatoriamente al abrir la app para consultar su aforo, reservar clases o preparar su código QR de acceso.',
    stats: 'Hasta 5 espacios rotativos · 100% de los socios activos lo ven a diario',
    pricingTip: 'Precio sugerido: $1,500 – $2,500 MXN por semana',
    image: '/shots/app/02-home.png',
    clientDemo: {
      advertiser: 'Nutrición Deportiva Alpha',
      promo: '20% OFF en Proteínas Isolate presentando tu credencial digital'
    }
  },
  sheet: {
    title: 'Tu Ficha de Aliado (Micro-Landing de Negocio)',
    subtitle: 'Se abre al tocar el banner; incluye WhatsApp y mapa',
    description:
      'Funciona como una página de aterrizaje completa dentro de la app para el negocio local. Incluye la promoción exclusiva para tus socios, descripción del comercio, botones directos de llamada y WhatsApp, redes sociales y ubicación con botón "Cómo llegar".',
    stats: 'Siempre incluida con cualquier pauta · Redirección instantánea a WhatsApp',
    pricingTip: 'Incluida en el paquete publicitario del anunciante',
    image: '/shots/publicidad.png',
    clientDemo: {
      advertiser: 'Ficha Completa de Marca',
      promo: 'Cupón exclusivo + Botones directos a llamada y WhatsApp'
    }
  },
  directory: {
    title: 'Directorio de Aliados Locales y Descuentos',
    subtitle: 'Tu propia cuponera digital para comercios de la zona',
    description:
      'Una pestaña exclusiva en la app donde tus socios descubren cafeterías saludables, fisioterapeutas, restaurantes fit y tiendas deportivas cercanas con distinción dorada para anunciantes destacados.',
    stats: 'Espacios ilimitados · Distintivo estrella · Geolocalización en mapa',
    pricingTip: 'Precio sugerido: $1,000 – $1,800 MXN por mes',
    image: '/shots/app/04-aliados.png',
    clientDemo: {
      advertiser: 'Clínica de Fisioterapia KineSport',
      promo: 'Valoración postural gratuita + 15% en terapia de descarga'
    }
  },
  push: {
    title: 'Notificación Push Masiva Patrocinada',
    subtitle: 'Un mensaje directo a la pantalla de bloqueo de tus socios',
    description:
      'Envía una notificación push instantánea a todos los miembros con la app instalada. Ideal para inauguraciones, ofertas relámpago o promociones exclusivas de los negocios aliados.',
    stats: 'Tasa de apertura superior al 70% · Enlace directo a la promoción',
    pricingTip: 'Precio sugerido: $800 – $1,500 MXN por envío masivo',
    image: '/shots/app/05-descuentos.png',
    clientDemo: {
      advertiser: 'Green Bowl Healthy Bar',
      promo: '¡Termina tu entreno con energía! Pasa por tu bowl y recibe smoothie gratis'
    }
  },
  selfserve: {
    title: 'Portal de Venta Automatizada /anuncia',
    subtitle: 'El anunciante compra solo; tú cobras en automático',
    description:
      'Los comercios locales ingresan a tu enlace web propio (/anuncia), suben su banner, eligen las semanas de pauta y pagan con tarjeta en Stripe. El dinero cae directo a tu cuenta bancaria y tú sólo das clic en "Aprobar".',
    stats: 'Cero llamadas de ventas · Cero cobranza manual · Pagos con Stripe',
    pricingTip: 'Facturación directa y reporte automático de clicks al terminar',
    image: '/shots/publicidad.png',
    clientDemo: {
      advertiser: 'Plataforma Self-Serve 24/7',
      promo: 'Venta de pauta activa los 365 días del año sin comisiones de intermediarios'
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════
// NUESTRAS VENTAJAS (Carousel 01 a 06)
// ═════════════════════════════════════════════════════════════════════════
const activeAdvantage = ref(0)

const advantages = [
  {
    id: '01',
    category: 'RETENCIÓN PREDICTIVA',
    title: 'Inteligencia Artificial Anti-Deserción de Socios',
    badge: 'Predicción Temprana Real',
    metric: '-42% en Bajas de Socios',
    icon: Brain,
    summary: 'Aprende los hábitos de cada socio y te avisa 18 días antes de que decida darse de baja.',
    description:
      'La mayoría de socios no cancelan de golpe: simplemente dejan de venir poco a poco. Nuestra IA detecta cuándo un socio rompe su rutina y actúa automáticamente con mensajes de motivación y alertas a tu equipo de recepción antes de que sea demasiado tarde.',
    bullets: [
      'Identifica el riesgo semanas antes de la fecha de cobro',
      'Te explica el motivo en español claro ("Sin visitas hace 14 días")',
      'Dispara pushes de rescate con promociones automáticas',
      'Le dice a tu recepcionista a quién consentir al entrar'
    ],
    accentGrad: 'from-[#6d5df1] via-[#8b5cf6] to-[#4338ca]'
  },
  {
    id: '02',
    category: 'NUEVA LÍNEA DE INGRESOS',
    title: 'Monetización con Publicidad Local Self-Serve',
    badge: 'Ingresos Pasivos Extra',
    metric: '+$35,000 MXN / Sede / Mes',
    icon: Megaphone,
    summary: 'Convierte la app de tu gimnasio en una fuente constante de ingresos por patrocinio local.',
    description:
      'Negocios de tu vecindario (nutrición, fisios, comida saludable, ropa) entran a tu portal /anuncia, suben su anuncio y pagan con tarjeta en Stripe. Tú sólo revisas el anuncio en tu pantalla, tocas "Aprobar" y el dinero se deposita en tu cuenta bancaria.',
    bullets: [
      'Página pública /anuncia con pasarela de cobro en línea',
      'Espacios premium en el Home, Directorio y Pushes Masivos',
      'El cliente compra solo sin que tengas que vender por teléfono',
      'Genera reporte automático de visitas al vencer la campaña'
    ],
    accentGrad: 'from-[#6d5df1] via-[#8b5cf6] to-[#4338ca]'
  },
  {
    id: '03',
    category: 'COBROS SIN FRICCIÓN',
    title: 'Pagos en Línea 24/7 sin Fila en Recepción',
    badge: 'Stripe Payment Sheet',
    metric: 'Cobros Rápidos y Seguros',
    icon: CreditCard,
    summary: 'Tus socios renuevan, compran membresías y pagan adeudos en 3 toques desde su celular.',
    description:
      'Elimina filas molestas en el mostrador en los días 1 y 15 de cada mes. La app de tus socios permite pagar con tarjeta de crédito, débito, Apple Pay y Google Pay con acreditación instantánea y reactivación inmediata de su código QR de entrada.',
    bullets: [
      'Acreditación inmediata directo a la cuenta bancaria del gym',
      'Renovación express desde la app del socio en 10 segundos',
      'Historial de pagos digitales descargables por el usuario',
      'Tolerancia de días de gracia y reglas de acceso automatizadas'
    ],
    accentGrad: 'from-[#6d5df1] via-[#8b5cf6] to-[#4338ca]'
  },
  {
    id: '04',
    category: 'ENGAGEMENT ACTIVO',
    title: 'Gamificación Extrema y Tienda de Recompensas',
    badge: 'Fidelización por Hábitos',
    metric: '+58% Asistencia Promedio',
    icon: Trophy,
    summary: 'Multiplica la frecuencia de visitas convirtiendo el ejercicio en un juego gratificante.',
    description:
      'Los socios fijan metas semanales de asistencia (ej. 4 visitas por semana), ganan puntos por cada check-in y obtienen bonos por mantener rachas consecutivas. Esos puntos se canjean por bebidas, playeras o pases para amigos con códigos QR de un solo uso.',
    bullets: [
      'Metas semanales de visitas configuradas por el propio socio',
      'Premios extra por rachas de 2, 4, 8 y 12 semanas entrenando',
      'Catálogo de recompensas con inventario controlado en recepción',
      'Validación antifraude con códigos QR únicos e intransferibles'
    ],
    accentGrad: 'from-[#6d5df1] via-[#8b5cf6] to-[#4338ca]'
  },
  {
    id: '05',
    category: 'OPERACIÓN EN VIVO',
    title: 'Control de Aforo Realtime y Check-In Dinámico',
    badge: 'Actualización en Vivo',
    metric: '< 0.3s por Check-In',
    icon: QrCode,
    summary: 'Monitorea la ocupación exacta de cada sede al segundo y agiliza el acceso de tus socios.',
    description:
      'Tu pantalla de recepción y tu app móvil muestran la capacidad del gimnasio en tiempo real sin recargar la página. El escáner valida en décimas de segundo membresía activa, sede autorizada e incluso acepta pases de Wellhub y TotalPass en la misma pantalla.',
    bullets: [
      'Visualización de capacidad en vivo en pantallas y celulares',
      'Lectura con cámara de celular, tablet o pistola de código',
      'Compatibilidad unificada para socios propios y agregadores',
      'Cierre de día automático a medianoche con reseteo de aforo'
    ],
    accentGrad: 'from-[#6d5df1] via-[#8b5cf6] to-[#4338ca]'
  },
  {
    id: '06',
    category: 'ATENCIÓN INMEDIATA',
    title: 'Soporte Socio-Staff y Mensajería Push Directa',
    badge: 'Canal Oficial Centralizado',
    metric: '98% Satisfacción',
    icon: MessageSquare,
    summary: 'Comunícate directamente con tus socios sin perder el control en grupos de WhatsApp.',
    description:
      'El socio inicia una consulta desde su app y tu equipo de mostrador o gerencia responde al instante desde la consola web con avisos sonoros. Además, puedes enviar notificaciones push a todos tus miembros sobre días festivos, mantenimiento o nuevos horarios.',
    bullets: [
      'Notificaciones instantáneas en la pantalla del socio',
      'Bandeja de atención centralizada para el personal en turno',
      'Campañas de difusión masivas o segmentadas por sucursal',
      'Historial ordenado sin compartir teléfonos personales del staff'
    ],
    accentGrad: 'from-[#6d5df1] via-[#8b5cf6] to-[#4338ca]'
  }
]

const nextAdvantage = () => {
  activeAdvantage.value = (activeAdvantage.value + 1) % advantages.length
}

const prevAdvantage = () => {
  activeAdvantage.value = (activeAdvantage.value - 1 + advantages.length) % advantages.length
}

// Active Ecosystem Tab ('b2b' | 'app')
const activeEcosystemTab = ref('b2b')

// ═════════════════════════════════════════════════════════════════════════
// CALCULADORA DE RETORNO DE INVERSIÓN (ROI)
// ═════════════════════════════════════════════════════════════════════════
const activeMembers = ref(850)
const monthlyFee = ref(650)
const branchesCount = ref(2)
const churnRate = ref(8.5)

const roiCalculation = computed(() => {
  const members = Number(activeMembers.value)
  const fee = Number(monthlyFee.value)
  const branches = Number(branchesCount.value)

  const monthlyChurnMembers = members * (churnRate.value / 100)
  const savedMembersMonthly = Math.round(monthlyChurnMembers * 0.38)
  const annualSavedRevenue = savedMembersMonthly * fee * 12

  // Estimación conservadora de publicidad: 4 anunciantes x $3,500/mes x sedes
  const monthlyAdsRevenue = branches * 14000
  const annualAdsRevenue = monthlyAdsRevenue * 12

  const totalAnnualBenefit = annualSavedRevenue + annualAdsRevenue

  return {
    savedMembersYear: savedMembersMonthly * 12,
    annualSavedRevenue,
    annualAdsRevenue,
    totalAnnualBenefit
  }
})

const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(val)
}

// ═══════════════════════════════════════════════════════════════════
// SCROLL REVEAL Y TRANSICIONES CINEMATOGRÁFICAS
// ═══════════════════════════════════════════════════════════════════
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  )

  // Observar todos los elementos con animaciones de entrada
  document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right').forEach((el) => {
    observer.observe(el)
    // Revelar inmediatamente los que ya están en el viewport inicial
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed')
    }
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#07090e] text-[#f8fafc] font-sans selection:bg-[#6d5df1] selection:text-white overflow-x-hidden">
    <!-- Ambient Radial Glows (Estilo limpio Framer, sin puntos) -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <!-- Glow Nebulae -->
      <div class="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-[#6d5df1]/16 via-[#3b82f6]/8 to-transparent blur-[160px] rounded-full" />
      <div class="absolute top-[35%] -left-[12%] w-[700px] h-[700px] bg-[#6d5df1]/6 blur-[180px] rounded-full" />
      <div class="absolute top-[65%] -right-[12%] w-[700px] h-[700px] bg-[#3b82f6]/6 blur-[180px] rounded-full" />
      <div class="absolute bottom-[0%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#6d5df1]/10 blur-[160px] rounded-full" />
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- NAVBAR                                                            -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <nav class="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/85 border-b border-[#1e2638]/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6d5df1] to-[#8b5cf6] flex items-center justify-center font-display text-white text-xl group-hover:scale-105 transition-transform duration-300">
            R
          </div>
          <div class="flex flex-col">
            <span class="font-display text-2xl tracking-tight text-white flex items-center gap-1.5">
              RIR<span class="text-[#6d5df1]">HUB</span>
              <span class="text-[10px] font-sans font-black tracking-widest px-1.5 py-0.5 rounded bg-[#1e2638] text-[#94a3b8] uppercase">B2B OS</span>
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
          <a href="#ia" class="hover:text-[#6d5df1] transition-colors duration-200 flex items-center gap-1.5">
            <Brain class="w-4 h-4 text-[#6d5df1]" />
            <span>Retención con IA</span>
          </a>
          <a href="#monetizacion" class="hover:text-[#6d5df1] transition-colors duration-200 flex items-center gap-1.5">
            <Megaphone class="w-4 h-4 text-[#6d5df1]" />
            <span>Monetización de Anuncios</span>
          </a>
          <a href="#ventajas" class="hover:text-white transition-colors duration-200">Ventajas</a>
          <a href="#ecosistema" class="hover:text-white transition-colors duration-200">Plataforma Dual</a>
          <a href="#calculadora" class="hover:text-white transition-colors duration-200">Calculadora ROI</a>
        </div>

        <!-- CTA Buttons -->
        <div class="flex items-center gap-3">
          <button
            @click="openDemoModal"
            class="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#6d5df1] hover:bg-[#5b4be2] text-white hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Agendar Demo
            <ArrowRight class="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </nav>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- HERO SECTION                                                      -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section class="relative z-10 pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center">
        <!-- Floating Pill Header -->
        <div class="reveal delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6d5df1]/30 bg-[#6d5df1]/10 text-[#6d5df1] text-xs font-bold tracking-wide uppercase mb-8">
          <Sparkles class="w-3.5 h-3.5" />
          <span>La Plataforma Multi-Sede que Detiene la Fuga de Socios y Crea Nuevos Ingresos</span>
        </div>

        <!-- Main Display Headline -->
        <h1 class="reveal delay-200 font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
          Gana Más Dinero.
          <span class="block bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent drop-shadow-sm">
            Detén las Cancelaciones con IA
          </span>
        </h1>

        <!-- Subhead -->
        <p class="reveal delay-300 mt-6 text-lg sm:text-xl text-[#94a3b8] max-w-3xl mx-auto font-normal leading-relaxed">
          RIR-HUB es el sistema operativo para gimnasios que <strong class="text-white font-semibold">predice qué socios están a punto de abandonar</strong> antes de que cancelen y <strong class="text-white font-semibold">monetiza tu comunidad</strong> vendiendo espacios publicitarios a negocios de tu zona en automático.
        </p>

        <!-- Hero Buttons -->
        <div class="reveal delay-400 mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            @click="openDemoModal"
            class="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-sm uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ver Demostración en Vivo</span>
            <ArrowRight class="w-4 h-4 stroke-[2.5]" />
          </button>
          <a
            href="#ia"
            class="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#1e2638] bg-[#10141e]/80 hover:bg-[#10141e] hover:border-[#6d5df1]/40 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Brain class="w-4 h-4 text-[#6d5df1]" />
            <span>Descubre Cómo Te Ayuda la IA</span>
          </a>
        </div>

        <!-- ═════════════════════════════════════════════════════════════════ -->
        <!-- BROWSER MOCKUP CONTAINER (Perspectiva 3D Cinemática)              -->
        <!-- ═════════════════════════════════════════════════════════════════ -->
        <div class="reveal-scale delay-500 perspective-container mt-14 max-w-5xl mx-auto relative group">
          <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#6d5df1]/25 via-[#ea580c]/20 to-[#6d5df1]/25 opacity-70 blur-2xl group-hover:opacity-100 transition-opacity duration-700" />

          <div class="perspective-tilt relative rounded-2xl border border-[#1e2638] bg-[#10141e] shadow-2xl overflow-hidden text-left">
            <!-- Window Topbar -->
            <div class="h-11 px-4 border-b border-[#1e2638] bg-[#0c0f17] flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                <div class="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                <div class="w-3 h-3 rounded-full bg-[#10b981]/80" />
              </div>

              <div class="flex items-center gap-2 px-4 py-1 rounded-md bg-[#131823] border border-[#1e2638] text-[11px] text-[#94a3b8] font-mono">
                <Lock class="w-3 h-3 text-[#10b981]" />
                <span>app.rirhub.com/consola-inteligente</span>
              </div>

              <div class="flex items-center gap-2 text-[11px] font-semibold text-[#10b981]">
                <span class="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                <span>En Vivo</span>
              </div>
            </div>

            <!-- Preview Image with Floating Real-Action Badges -->
            <div class="relative aspect-video bg-[#0b0e14] overflow-hidden">
              <img
                src="/shots/dashboard.png"
                alt="RIR-HUB Consola B2B"
                class="w-full h-full object-cover object-top opacity-95 group-hover:scale-[1.01] transition-transform duration-700"
              />

              <!-- Floating Micro-Card 1: AI Alert in Plain Language -->
              <div class="absolute top-6 left-6 max-w-xs p-4 rounded-xl border border-[#ef4444]/50 bg-[#07090e]/95 backdrop-blur-md shadow-2xl">
                <div class="flex items-center justify-between text-xs font-bold text-[#ef4444] mb-1">
                  <span class="flex items-center gap-1.5">
                    <Brain class="w-3.5 h-3.5" />
                    Socio en Riesgo de Baja
                  </span>
                  <span class="px-2 py-0.5 rounded bg-[#ef4444]/20 text-[10px] font-black uppercase">84% Riesgo</span>
                </div>
                <p class="text-xs text-white font-bold">Carlos Morales (Sede Roma)</p>
                <p class="text-[11px] text-[#94a3b8] mt-0.5">Lleva 14 días sin asistir tras romper su racha habitual.</p>
                <div class="mt-2.5 pt-2 border-t border-[#1e2638] flex items-center justify-between text-[11px]">
                  <span class="text-[#10b981] flex items-center gap-1 font-semibold">
                    <CheckCircle2 class="w-3 h-3" />
                    Push de rescate enviado
                  </span>
                  <span class="text-[#6d5df1] font-bold">18 días antes</span>
                </div>
              </div>

              <!-- Floating Micro-Card 2: Advertising Revenue -->
              <div class="absolute bottom-6 right-6 p-4 rounded-xl border border-[#6d5df1]/50 bg-[#07090e]/95 backdrop-blur-md shadow-2xl">
                <div class="flex items-center gap-2 text-xs font-bold text-[#6d5df1] mb-1">
                  <Megaphone class="w-3.5 h-3.5" />
                  <span>Publicidad Local Directa</span>
                </div>
                <div class="text-2xl font-display text-white">+$42,500 MXN</div>
                <p class="text-[11px] text-[#94a3b8]">Pagado en automático por 5 negocios locales en /anuncia</p>
                <div class="mt-2 flex items-center gap-1 text-[10px] text-[#10b981] font-semibold">
                  <DollarSign class="w-3 h-3" />
                  <span>Depositado directo a la cuenta del gimnasio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- STATS BAR                                                          -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section class="relative z-10 py-10 px-4 sm:px-6 lg:px-8 border-y border-[#1e2638] bg-[#0c0f17]/70">
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="reveal delay-100 relative p-6 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 group hover:border-[#6d5df1]/50 transition-all duration-300">
          <div class="text-3xl lg:text-4xl font-display text-[#6d5df1] mb-1">-42%</div>
          <div class="text-sm font-bold text-white uppercase tracking-wide">Deserción de Socios</div>
          <p class="text-xs text-[#94a3b8] mt-1">La IA detecta el abandono semanas antes de la fecha límite de pago.</p>
        </div>

        <div class="reveal delay-200 relative p-6 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 group hover:border-[#6d5df1]/50 transition-all duration-300">
          <div class="text-3xl lg:text-4xl font-display text-white mb-1">+$35K</div>
          <div class="text-sm font-bold text-[#6d5df1] uppercase tracking-wide">Ingreso Extra / Mes</div>
          <p class="text-xs text-[#94a3b8] mt-1">Patrocinios de negocios locales cobrados directamente con Stripe.</p>
        </div>

        <div class="reveal delay-300 relative p-6 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 group hover:border-[#6d5df1]/50 transition-all duration-300">
          <div class="text-3xl lg:text-4xl font-display text-white mb-1">99.8%</div>
          <div class="text-sm font-bold text-white uppercase tracking-wide">Precisión en Aforo</div>
          <p class="text-xs text-[#94a3b8] mt-1">Visualiza cuánta gente hay en cada sede sin recargar la pantalla.</p>
        </div>

        <div class="reveal delay-400 relative p-6 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 group hover:border-[#6d5df1]/50 transition-all duration-300">
          <div class="text-3xl lg:text-4xl font-display text-[#6d5df1] mb-1">24/7</div>
          <div class="text-sm font-bold text-white uppercase tracking-wide">Cobros sin Filas</div>
          <p class="text-xs text-[#94a3b8] mt-1">Tus socios renuevan y pagan desde su celular con un solo toque.</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- SECCIÓN CLAVE 1: CÓMO TE AYUDA LA IA (Enfocada 100% en el negocio)  -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section id="ia" class="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0f17]/90 border-t border-[#1e2638]">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="reveal text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6d5df1]/10 border border-[#6d5df1]/30 text-[#6d5df1] text-xs font-bold uppercase tracking-wider mb-4">
            <Brain class="w-3.5 h-3.5" />
            <span>Retención Predictiva Inteligente</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            ¿Por Qué se Van Tus Socios?
            <span class="block text-[#6d5df1]">La IA Te lo Avisa Antes de que Cancelen.</span>
          </h2>
          <p class="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            El 70% de las cancelaciones en un gimnasio no ocurren por sorpresa: el socio pasa semanas espaciando sus visitas hasta que finalmente decide no pagar. Los software tradicionales te avisan cuando ya es tarde; <strong class="text-white">RIR-HUB actúa 18 días antes</strong>.
          </p>
        </div>

        <!-- 3-Step Humanized Process with Animated Circuit Line -->
        <div class="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <!-- Animated Energy Circuit Traces across steps (Inspired by Dribbble video) -->
          <svg class="hidden md:block absolute top-10 left-[16%] right-[16%] w-[68%] h-6 pointer-events-none z-0" fill="none">
            <line x1="0" y1="12" x2="100%" y2="12" stroke="#1e2638" stroke-width="2" stroke-dasharray="4 4" />
            <line x1="0" y1="12" x2="100%" y2="12" stroke="url(#energyGradient)" stroke-width="2.5" class="animate-energy-flow" />
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#6d5df1" stop-opacity="0.3" />
                <stop offset="50%" stop-color="#a855f7" stop-opacity="1" />
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.9" />
              </linearGradient>
            </defs>
          </svg>

          <div class="reveal delay-100 relative z-10 p-6 rounded-2xl border border-[#1e2638] bg-[#10141e] hover:border-[#6d5df1]/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-[#6d5df1]/10 text-[#6d5df1] font-display text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 class="font-display text-lg uppercase text-white mb-2">Aprende la Rutina de Cada Socio</h3>
              <p class="text-xs text-[#94a3b8] leading-relaxed">
                El sistema conoce qué días suele entrenar cada socio, a qué horas, qué clases prefiere y cuál es su meta semanal. No necesitas configurar nada: la IA aprende sola con cada check-in.
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-[#1e2638] text-[11px] font-semibold text-[#6d5df1] flex items-center gap-1.5">
              <Eye class="w-3.5 h-3.5" />
              <span>Monitoreo silencioso 24/7</span>
            </div>
          </div>

          <div class="reveal delay-200 relative z-10 p-6 rounded-2xl border border-[#1e2638] bg-[#10141e] hover:border-[#ea580c]/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-[#ea580c]/10 text-[#ea580c] font-display text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 class="font-display text-lg uppercase text-white mb-2">Detecta el Peligro 18 Días Antes</h3>
              <p class="text-xs text-[#94a3b8] leading-relaxed">
                Si un socio que venía 4 días por semana empieza a venir 1, o rompe su racha de visitas, el semáforo inteligente se enciende en amarillo o rojo y te explica la razón exacta en lenguaje humano.
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-[#1e2638] text-[11px] font-semibold text-[#ea580c] flex items-center gap-1.5">
              <AlertTriangle class="w-3.5 h-3.5" />
              <span>Diagnóstico explicativo claro</span>
            </div>
          </div>

          <div class="reveal delay-300 relative z-10 p-6 rounded-2xl border border-[#1e2638] bg-[#10141e] hover:border-[#10b981]/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-[#10b981]/10 text-[#10b981] font-display text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h3 class="font-display text-lg uppercase text-white mb-2">Rescata al Socio en Automático</h3>
              <p class="text-xs text-[#94a3b8] leading-relaxed">
                Dispara un mensaje push motivacional al celular del socio («Te extrañamos, ven hoy y gana puntos dobles») o le genera un aviso a tu recepcionista para que lo salude con entusiasmo al volver.
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-[#1e2638] text-[11px] font-semibold text-[#10b981] flex items-center gap-1.5">
              <Zap class="w-3.5 h-3.5" />
              <span>Recuperación antes de cancelar</span>
            </div>
          </div>
        </div>

        <!-- SIMULADOR INTERACTIVO DEL SEMÁFORO DE RETENCIÓN -->
        <div class="reveal-scale delay-200 p-8 sm:p-10 rounded-3xl border-2 border-[#1e2638] bg-[#10141e] shadow-2xl relative overflow-hidden">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#1e2638] gap-4">
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-[#6d5df1] mb-1">
                Simulador en Vivo para Dueños de Gimnasio
              </div>
              <h3 class="font-display text-2xl uppercase tracking-tight text-white">
                Mira Cómo Evalúa la IA a Tres de Tus Socios
              </h3>
            </div>

            <!-- Tab Buttons (Green, Yellow, Red) -->
            <div class="flex items-center gap-2 p-1.5 rounded-xl bg-[#07090e] border border-[#1e2638]">
              <button
                @click="activeAiTab = 'healthy'"
                :class="[ 'px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5', activeAiTab === 'healthy' ? 'bg-[#10b981] text-black shadow-md font-black' : 'text-[#94a3b8] hover:text-white' ]"
              >
                <span class="w-2 h-2 rounded-full bg-[#10b981]" :class="activeAiTab === 'healthy' ? 'bg-black' : ''" />
                Socio Fiel
              </button>
              <button
                @click="activeAiTab = 'warning'"
                :class="[ 'px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5', activeAiTab === 'warning' ? 'bg-[#f59e0b] text-black shadow-md font-black' : 'text-[#94a3b8] hover:text-white' ]"
              >
                <span class="w-2 h-2 rounded-full bg-[#f59e0b]" :class="activeAiTab === 'warning' ? 'bg-black' : ''" />
                Alerta Temprana
              </button>
              <button
                @click="activeAiTab = 'critical'"
                :class="[ 'px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5', activeAiTab === 'critical' ? 'bg-[#ef4444] text-white shadow-md font-black' : 'text-[#94a3b8] hover:text-white' ]"
              >
                <span class="w-2 h-2 rounded-full bg-[#ef4444]" />
                Riesgo Crítico
              </button>
            </div>
          </div>

          <!-- Active Case Content -->
          <div class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <!-- Left Info Column -->
            <div class="lg:col-span-5 space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-[#07090e] border border-[#1e2638] flex items-center justify-center font-display text-white text-lg">
                  {{ aiSimulatorCases[activeAiTab].member.name.charAt(0) }}
                </div>
                <div>
                  <h4 class="font-display text-xl text-white">{{ aiSimulatorCases[activeAiTab].member.name }}</h4>
                  <p class="text-xs text-[#94a3b8]">{{ aiSimulatorCases[activeAiTab].member.plan }}</p>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-[#07090e] border border-[#1e2638] space-y-2 text-xs">
                <div>
                  <span class="text-[#94a3b8] font-medium block">Hábito registrado:</span>
                  <span class="text-white font-semibold">{{ aiSimulatorCases[activeAiTab].member.habit }}</span>
                </div>
                <div>
                  <span class="text-[#94a3b8] font-medium block">Historial reciente:</span>
                  <span class="text-white">{{ aiSimulatorCases[activeAiTab].member.history }}</span>
                </div>
              </div>

              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider" :class="aiSimulatorCases[activeAiTab].badgeClass">
                <span>{{ aiSimulatorCases[activeAiTab].tag }}</span>
              </div>
            </div>

            <!-- Right Action & Outcome Column -->
            <div class="lg:col-span-7 space-y-4 p-6 rounded-2xl bg-[#07090e] border border-[#1e2638]">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5 mb-1">
                  <Brain class="w-3.5 h-3.5 text-[#6d5df1]" />
                  Qué Detectó la Inteligencia Artificial:
                </span>
                <p class="text-sm text-white font-medium leading-relaxed">
                  {{ aiSimulatorCases[activeAiTab].aiDetection }}
                </p>
              </div>

              <div class="pt-4 border-t border-[#1e2638]">
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#10b981] flex items-center gap-1.5 mb-1">
                  <Zap class="w-3.5 h-3.5" />
                  Acción Ejecutada por el Sistema:
                </span>
                <p class="text-sm text-[#f8fafc] leading-relaxed">
                  {{ aiSimulatorCases[activeAiTab].actionTaken }}
                </p>
              </div>

              <div class="pt-4 border-t border-[#1e2638] flex items-center justify-between text-xs">
                <span class="text-[#94a3b8]">Impacto directo: <strong class="text-white">{{ aiSimulatorCases[activeAiTab].businessOutcome }}</strong></span>
                <button
                  @click="openDemoModal"
                  class="px-4 py-2 rounded-lg bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider hover:scale-105 transition-transform"
                >
                  Probar con mi Gym
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Direct Comparison: Sin IA vs Con RIR-HUB -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="reveal-left delay-100 p-6 rounded-2xl border border-[#ef4444]/30 bg-[#10141e]/50">
            <div class="flex items-center gap-2 text-xs font-bold text-[#ef4444] uppercase tracking-wider mb-2">
              <X class="w-4 h-4" />
              <span>Sistemas Tradicionales de Gimnasio</span>
            </div>
            <h4 class="font-display text-lg text-white mb-3">Reactivos y Tardíos</h4>
            <ul class="space-y-2 text-xs text-[#94a3b8]">
              <li class="flex items-start gap-2">
                <span class="text-[#ef4444] font-bold">✕</span>
                <span>Te enteras de la baja cuando el socio ya no pagó en la fecha de corte.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[#ef4444] font-bold">✕</span>
                <span>Reportes estáticos en Excel que nadie tiene tiempo de analizar a diario.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[#ef4444] font-bold">✕</span>
                <span>Haces encuestas de salida cuando el socio ya se inscribió en la competencia.</span>
              </li>
            </ul>
          </div>

          <div class="reveal-right delay-200 p-6 rounded-2xl border border-[#10b981]/40 bg-[#10141e] shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div class="flex items-center gap-2 text-xs font-bold text-[#10b981] uppercase tracking-wider mb-2">
              <Check class="w-4 h-4 stroke-[3]" />
              <span>RIR-HUB con Retención Predictiva</span>
            </div>
            <h4 class="font-display text-lg text-white mb-3">Proactivos y Preventivos</h4>
            <ul class="space-y-2 text-xs text-[#94a3b8]">
              <li class="flex items-start gap-2">
                <span class="text-[#10b981] font-bold">✓</span>
                <span>Detecta la ruptura de rutina 18 a 21 días antes del vencimiento.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[#10b981] font-bold">✓</span>
                <span>Dispara reenganche automático por push sin consumir tiempo de tu personal.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[#10b981] font-bold">✓</span>
                <span>Salvas entre el 35% y 45% de los socios que se iban a dar de baja cada mes.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- SECCIÓN CLAVE 2: MONETIZACIÓN DE PUBLICIDAD (Ultra Gráfica y Clara)  -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section id="monetizacion" class="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1e2638]">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="reveal text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6d5df1]/10 border border-[#6d5df1]/30 text-[#6d5df1] text-xs font-bold uppercase tracking-wider mb-4">
            <Megaphone class="w-3.5 h-3.5" />
            <span>Nueva Fuente de Ingresos para Tu Gimnasio</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            Vende Publicidad a Negocios Locales
            <span class="block text-[#6d5df1]">Y Cobra en Piloto Automático.</span>
          </h2>
          <p class="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            Tus socios son el público más deseado por comercios locales: personas activas con poder adquisitivo. Con RIR-HUB, <strong class="text-white">cualquier negocio de tu zona puede anunciarse en la app de tu gym</strong> pagando directamente por internet con tarjeta bancaria.
          </p>
        </div>

        <!-- VISUALIZADOR DE PUBLICIDAD LOCAL (EXACTO COMO LA APP REAL) -->
        <div class="reveal-scale delay-200 p-6 sm:p-10 lg:p-12 rounded-3xl border-2 border-[#1e2638] bg-[#0a0d14] shadow-2xl relative mb-16">
          <div class="flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-14">
            
            <!-- ═════════════════════════════════════════════════════════ -->
            <!-- TELÉFONO 1: ASÍ SE VE EN EL HOME (CARRUSEL PREMIUM)       -->
            <!-- ═════════════════════════════════════════════════════════ -->
            <div class="w-full max-w-[320px] sm:max-w-[340px] flex flex-col">
              <!-- Header Row -->
              <div class="mb-4 flex items-center justify-between">
                <h4 class="flex items-center text-xs sm:text-sm font-display font-black uppercase tracking-wider text-white">
                  <span class="w-1.5 h-4.5 rounded-full bg-[#f4e701] mr-2.5 inline-block" />
                  ASÍ SE VE EN EL HOME
                </h4>
                <span class="rounded-full border border-[#f4e701]/50 bg-[#f4e701]/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#f4e701]">
                  CARRUSEL PREMIUM
                </span>
              </div>

              <!-- Phone Frame Shell -->
              <div class="w-full rounded-[3rem] border-4 border-[#1e2638] bg-black p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative">
                <div class="relative h-[550px] flex flex-col overflow-hidden rounded-[2.5rem] bg-[#07090e]">
                  <!-- Dynamic Island -->
                  <div class="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

                  <!-- Status Bar -->
                  <div class="flex items-center justify-between px-6 pt-3 text-[10px] font-bold text-white select-none">
                    <span>9:41</span>
                    <span class="flex items-center gap-1.5 text-white">
                      <Signal class="h-3 w-3" />
                      <Wifi class="h-3 w-3" />
                      <BatteryFull class="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <!-- Screen Body -->
                  <div class="flex flex-1 flex-col gap-2.5 overflow-hidden px-3.5 pt-4 text-left">
                    <!-- Contexto real difuminado -->
                    <div class="space-y-2 opacity-60 blur-[0.6px] select-none pointer-events-none">
                      <!-- Saludo + Campana -->
                      <div class="flex items-center gap-2 px-1">
                        <div class="flex h-7 w-7 items-center justify-center rounded-full border border-[#1e2638] bg-[#10141e] text-[9px] font-black text-[#94a3b8]">
                          L
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-[9px] font-black text-white">Hola, Luis</p>
                          <p class="text-[7px] font-semibold text-[#94a3b8]">Listo para entrenar hoy</p>
                        </div>
                        <Bell class="h-3.5 w-3.5 text-[#94a3b8]" />
                      </div>

                      <!-- Mis sedes -->
                      <div>
                        <div class="flex items-center justify-between px-1">
                          <p class="text-[8px] font-black uppercase tracking-widest text-[#94a3b8]">MIS SEDES</p>
                          <p class="text-[8px] font-bold text-[#f4e701]">Ver todas</p>
                        </div>
                        <div class="mt-1 rounded-xl border border-[#1e2638] bg-[#10141e] p-2">
                          <div class="flex items-center gap-1.5">
                            <Store class="h-3 w-3 shrink-0 text-[#f4e701]" />
                            <p class="text-[9px] font-black text-white">Sede Centro</p>
                            <span class="ml-auto rounded-full border border-[#f4e701]/40 bg-[#f4e701]/10 px-2 py-0.5 text-[7px] font-black uppercase text-[#f4e701]">
                              ABIERTA
                            </span>
                          </div>
                          <div class="mt-1.5 h-1 overflow-hidden rounded-full bg-[#07090e]">
                            <div class="h-full w-2/3 rounded-full bg-[#f4e701]" />
                          </div>
                          <p class="mt-1 text-[7px] font-semibold text-[#94a3b8]">Aforo actual · 24 personas</p>
                        </div>
                        <div class="mt-1.5 flex items-center justify-center gap-1.5 rounded-xl bg-[#f4e701] py-2 shadow-md">
                          <QrCode class="h-3 w-3 text-black stroke-[2.5]" />
                          <p class="text-[8px] font-black uppercase tracking-wider text-black">HACER CHECK-IN</p>
                        </div>
                      </div>
                    </div>

                    <!-- ═════════════════════════════════════════════════ -->
                    <!-- ANUNCIO DESTACADO: COOFFIT (NÍTIDO Y PROMINENTE)  -->
                    <!-- ═════════════════════════════════════════════════ -->
                    <div class="relative overflow-hidden rounded-2xl border-2 border-[#2e3d2e] shadow-[0_0_25px_rgba(46,61,46,0.4)]">
                      <!-- Creativo gráfico de Cooffit -->
                      <div class="relative h-28 bg-[#243425] overflow-hidden">
                        <img
                          src="/shots/cooffit-banner.svg"
                          alt="Cooffit"
                          class="h-full w-full object-cover"
                        />
                      </div>

                      <!-- Barra inferior de la oferta -->
                      <div class="bg-[#202c20] px-3 py-2 border-t border-white/5 flex items-center justify-between gap-2">
                        <div class="min-w-0">
                          <p class="text-[8px] font-black uppercase tracking-[0.14em] text-white/70">
                            COOFFIT
                          </p>
                          <p class="truncate text-[12px] font-black text-white leading-tight">
                            Combo Fit
                          </p>
                          <p class="truncate text-[8px] font-semibold text-white/80">
                            $135 Desayuno completo
                          </p>
                        </div>
                        <span class="shrink-0 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[8px] font-black text-white shadow-sm">
                          Ver oferta
                        </span>
                      </div>
                    </div>

                    <!-- Dots del Carrusel (5 Espacios) -->
                    <div class="-mt-0.5 flex justify-center items-center gap-1.5">
                      <span class="h-1.5 w-6 rounded-full bg-[#f4e701]" />
                      <span class="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span class="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span class="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span class="h-1.5 w-1.5 rounded-full bg-white/20" />
                    </div>

                    <!-- Racha Semanal difuminada -->
                    <div class="space-y-1.5 opacity-60 blur-[0.6px] select-none pointer-events-none">
                      <div class="rounded-xl border border-[#1e2638] bg-[#10141e] p-2">
                        <div class="flex items-center gap-1.5">
                          <p class="text-[8px] font-black text-white">Racha semanal</p>
                          <span class="ml-auto rounded-full border border-[#f4e701]/40 bg-[#f4e701]/10 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-[#f4e701]">
                            3/4 VISITAS
                          </span>
                          <ChevronRight class="h-2.5 w-2.5 text-[#94a3b8]" />
                        </div>
                        <div class="mt-1 h-1 overflow-hidden rounded-full bg-[#07090e]">
                          <div class="h-full w-3/4 rounded-full bg-[#f4e701]" />
                        </div>
                        <div class="mt-1 flex items-center gap-1">
                          <Flame class="h-2.5 w-2.5 shrink-0 text-[#f4e701]" />
                          <p class="text-[6.5px] font-semibold text-[#94a3b8]">Te falta 1 visita para tu meta de 4 por semana</p>
                        </div>
                        <div class="mt-1.5 flex gap-1">
                          <!-- Lun -->
                          <div class="flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-[#1e2638] bg-[#07090e] py-0.5">
                            <p class="text-[5px] font-black text-[#94a3b8]">Lun</p>
                            <div class="flex h-3 w-3 items-center justify-center rounded-full bg-[#f4e701]/20">
                              <Check class="h-2 w-2 text-[#f4e701]" />
                            </div>
                          </div>
                          <!-- Mar -->
                          <div class="flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-[#1e2638] bg-[#07090e] py-0.5">
                            <p class="text-[5px] font-black text-[#94a3b8]">Mar</p>
                            <div class="flex h-3 w-3 items-center justify-center rounded-full bg-[#f4e701]/20">
                              <Check class="h-2 w-2 text-[#f4e701]" />
                            </div>
                          </div>
                          <!-- Mie -->
                          <div class="flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-[#1e2638] bg-[#07090e] py-0.5">
                            <p class="text-[5px] font-black text-[#94a3b8]">Mié</p>
                            <div class="flex h-3 w-3 items-center justify-center rounded-full bg-[#f4e701]/20">
                              <Check class="h-2 w-2 text-[#f4e701]" />
                            </div>
                          </div>
                          <!-- Jue (Hoy - Resaltado) -->
                          <div class="flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-[#f4e701] bg-[#f4e701] py-0.5">
                            <p class="text-[5px] font-black text-black">Jue</p>
                            <div class="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white shadow-sm">
                              <p class="text-[6px] font-black text-black">22</p>
                            </div>
                          </div>
                          <!-- Vie -->
                          <div class="flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-[#1e2638] bg-[#07090e] py-0.5 opacity-60">
                            <p class="text-[5px] font-black text-[#94a3b8]">Vie</p>
                            <div class="flex h-3 w-3 items-center justify-center rounded-full border border-[#1e2638] bg-[#10141e]">
                              <p class="text-[5px] font-black text-white/70">23</p>
                            </div>
                          </div>
                          <!-- Sab -->
                          <div class="flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-[#1e2638] bg-[#07090e] py-0.5 opacity-60">
                            <p class="text-[5px] font-black text-[#94a3b8]">Sáb</p>
                            <div class="flex h-3 w-3 items-center justify-center rounded-full border border-[#1e2638] bg-[#10141e]">
                              <p class="text-[5px] font-black text-white/70">24</p>
                            </div>
                          </div>
                          <!-- Dom -->
                          <div class="flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-[#1e2638] bg-[#07090e] py-0.5 opacity-60">
                            <p class="text-[5px] font-black text-[#94a3b8]">Dom</p>
                            <div class="flex h-3 w-3 items-center justify-center rounded-full border border-[#1e2638] bg-[#10141e]">
                              <p class="text-[5px] font-black text-white/70">25</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Barra inferior de inicio -->
                  <div class="mx-auto mb-2 h-1 w-20 rounded-full bg-white/20" />
                </div>
              </div>
            </div>

            <!-- ═════════════════════════════════════════════════════════ -->
            <!-- CONECTOR CENTRAL: FLECHA DE ACCIÓN AL TOCAR EL ANUNCIO    -->
            <!-- ═════════════════════════════════════════════════════════ -->
            <div class="flex flex-col items-center justify-center text-center my-4 lg:my-0 px-4">
              <div class="w-14 h-14 rounded-full border-2 border-[#f4e701]/60 bg-[#10141e] flex items-center justify-center text-[#f4e701] hover:scale-105 transition-transform">
                <ArrowRight class="w-7 h-7 stroke-[2.5]" />
              </div>
              <h5 class="font-display text-sm uppercase tracking-wider text-white font-black mt-3">
                AL TOCAR EL ANUNCIO
              </h5>
              <p class="text-xs text-[#94a3b8] mt-1 max-w-[160px] leading-snug font-medium">
                Se abre la Ficha de Aliado con WhatsApp y GPS
              </p>
            </div>

            <!-- ═════════════════════════════════════════════════════════ -->
            <!-- TELÉFONO 2: TU FICHA DE ALIADO (SIEMPRE INCLUIDA)        -->
            <!-- ═════════════════════════════════════════════════════════ -->
            <div class="w-full max-w-[320px] sm:max-w-[340px] flex flex-col">
              <!-- Header Row -->
              <div class="mb-4 flex items-center justify-between">
                <h4 class="flex items-center text-xs sm:text-sm font-display font-black uppercase tracking-wider text-white">
                  <span class="w-1.5 h-4.5 rounded-full bg-[#f4e701] mr-2.5 inline-block" />
                  TU FICHA DE ALIADO
                </h4>
                <span class="rounded-full border border-[#f4e701]/50 bg-[#f4e701]/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#f4e701]">
                  SIEMPRE INCLUIDA
                </span>
              </div>

              <!-- Phone Frame Shell -->
              <div class="w-full rounded-[3rem] border-4 border-[#1e2638] bg-black p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative">
                <div class="relative h-[550px] flex flex-col overflow-hidden rounded-[2.5rem] bg-[#07090e]">
                  <!-- Dynamic Island -->
                  <div class="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

                  <!-- Status Bar -->
                  <div class="flex items-center justify-between px-6 pt-3 text-[10px] font-bold text-white select-none">
                    <span>9:41</span>
                    <span class="flex items-center gap-1.5 text-white">
                      <Signal class="h-3 w-3" />
                      <Wifi class="h-3 w-3" />
                      <BatteryFull class="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <!-- Hero de la Ficha: Foto real de Cooffit -->
                  <div class="relative mt-2 h-32 shrink-0 overflow-hidden bg-[#162216]">
                    <img
                      src="/shots/cooffit-hero.png"
                      alt="Cooffit Café"
                      class="h-full w-full object-cover object-center"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/40 to-transparent" />
                    <div class="absolute bottom-2 left-3.5 right-3.5">
                      <span class="rounded-full border border-[#4ade80]/60 bg-[#4ade80]/15 px-2 py-0.5 text-[7px] font-black uppercase tracking-wider text-[#4ade80]">
                        PUBLICIDAD · ALIADO
                      </span>
                      <p class="mt-1 truncate text-xl font-black leading-tight tracking-tight text-white">
                        Cooffit
                      </p>
                    </div>
                  </div>

                  <!-- Detalle de la Ficha -->
                  <div class="flex-1 space-y-2.5 overflow-hidden px-3.5 py-2 text-left">
                    <!-- Oferta / Cupón -->
                    <div class="rounded-xl border border-[#2f4f2f] bg-[#162216]/90 p-2.5 shadow-sm">
                      <p class="truncate text-[12px] font-black text-[#4ade80]">
                        Combo Fit
                      </p>
                      <p class="truncate text-[8.5px] font-semibold text-white/85 mt-0.5">
                        $135 Desayuno completo
                      </p>
                    </div>

                    <!-- Sobre Cooffit -->
                    <div>
                      <p class="text-[7px] font-black uppercase tracking-[0.16em] text-[#94a3b8]">
                        SOBRE COOFFIT
                      </p>
                      <p class="mt-0.5 text-[9px] font-medium leading-snug text-white">
                        Comida saludable que sí se antoja!
                      </p>
                    </div>

                    <!-- Contacto -->
                    <div>
                      <p class="text-[7px] font-black uppercase tracking-[0.16em] text-[#94a3b8]">
                        CONTACTO
                      </p>
                      <div class="mt-1 flex gap-2">
                        <div class="flex flex-1 items-center gap-1.5 rounded-lg border border-[#1e2638] bg-[#10141e] px-2 py-1.5">
                          <Phone class="h-3 w-3 shrink-0 text-[#f4e701]" />
                          <div class="min-w-0">
                            <p class="text-[8px] font-black text-white leading-none">Llamar</p>
                            <p class="truncate text-[7px] font-semibold text-[#94a3b8] mt-0.5">
                              +527225595400
                            </p>
                          </div>
                        </div>
                        <div class="flex flex-1 items-center gap-1.5 rounded-lg border border-[#1e2638] bg-[#10141e] px-2 py-1.5">
                          <MessageCircle class="h-3 w-3 shrink-0 text-[#10b981]" />
                          <div class="min-w-0">
                            <p class="text-[8px] font-black text-white leading-none">WhatsApp</p>
                            <p class="truncate text-[7px] font-semibold text-[#94a3b8] mt-0.5">
                              7225595400
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Redes sociales -->
                    <div>
                      <p class="text-[7px] font-black uppercase tracking-[0.16em] text-[#94a3b8]">
                        REDES SOCIALES
                      </p>
                      <div class="mt-1 flex flex-wrap gap-1.5">
                        <span class="flex items-center gap-1 rounded-full border border-[#1e2638] bg-[#10141e] px-2 py-0.5 text-[7px] font-bold text-white/90">
                          <Camera class="h-2.5 w-2.5 text-[#f4e701]" />
                          @ Instagram
                        </span>
                        <span class="flex items-center gap-1 rounded-full border border-[#1e2638] bg-[#10141e] px-2 py-0.5 text-[7px] font-bold text-white/90">
                          <Globe class="h-2.5 w-2.5 text-[#f4e701]" />
                          @ Facebook
                        </span>
                        <span class="flex items-center gap-1 rounded-full border border-[#1e2638] bg-[#10141e] px-2 py-0.5 text-[7px] font-bold text-white/90">
                          <Star class="h-2.5 w-2.5 text-[#f4e701]" />
                          TikTok
                        </span>
                        <span class="flex items-center gap-1 rounded-full border border-[#1e2638] bg-[#10141e] px-2 py-0.5 text-[7px] font-bold text-white/90">
                          <ExternalLink class="h-2.5 w-2.5 text-[#f4e701]" />
                          Enlace
                        </span>
                      </div>
                    </div>

                    <!-- Ubicación -->
                    <div>
                      <p class="text-[7px] font-black uppercase tracking-[0.16em] text-[#94a3b8]">
                        UBICACIÓN
                      </p>
                      <div class="mt-1 rounded-xl border border-[#1e2638] bg-[#10141e] p-2">
                        <div class="flex items-center gap-1.5">
                          <MapPin class="h-3 w-3 shrink-0 text-[#f4e701]" />
                          <p class="truncate text-[8px] font-bold text-white">
                            Paseo San Isidro 90 Barrio Santiaguito Mete...
                          </p>
                        </div>
                        <div class="mt-1.5 flex h-6 items-center justify-center rounded-full bg-[#243624] hover:bg-[#2c422c] transition-colors shadow-sm">
                          <span class="text-[7.5px] font-black uppercase tracking-wider text-white">
                            CÓMO LLEGAR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Barra inferior de inicio -->
                  <div class="mx-auto mb-2 h-1 w-20 rounded-full bg-white/20" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- EL FLUJO DE DINERO EN 3 PASOS SIMPLES -->
        <div class="mb-16">
          <div class="text-center max-w-xl mx-auto mb-10">
            <h3 class="font-display text-2xl uppercase tracking-tight text-white">
              ¿Cómo Funciona el Cobro? (Cero Trabajo para Ti)
            </h3>
            <p class="text-xs sm:text-sm text-[#94a3b8] mt-1">
              No tienes que andar cobrando con transferencias ni diseñando flyers. Todo está automatizado.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Step 1 -->
            <div class="reveal delay-100 p-6 rounded-2xl border border-[#1e2638] bg-[#10141e] relative hover:border-[#6d5df1]/50 transition-all duration-300">
              <div class="w-10 h-10 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-base flex items-center justify-center mb-4 font-black">
                Paso 1
              </div>
              <h4 class="font-display text-base uppercase text-white mb-1">El Anunciante Compra en Línea</h4>
              <p class="text-xs text-[#94a3b8] leading-relaxed">
                El negocio entra a tu enlace <strong class="text-white">tu-gimnasio.com/anuncia</strong>, sube su imagen, escribe su promoción y paga con tarjeta en Stripe Checkout.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="reveal delay-200 p-6 rounded-2xl border border-[#1e2638] bg-[#10141e] relative hover:border-[#ea580c]/50 transition-all duration-300">
              <div class="w-10 h-10 rounded-xl bg-[#ea580c] text-white font-display text-base flex items-center justify-center mb-4 font-black">
                Paso 2
              </div>
              <h4 class="font-display text-base uppercase text-white mb-1">Tú Sólo Presionas "Aprobar"</h4>
              <p class="text-xs text-[#94a3b8] leading-relaxed">
                Recibes una alerta en tu consola B2B. Revisas que el anuncio sea adecuado para tu comunidad y das clic en Aprobar. El anuncio se publica inmediatamente.
              </p>
            </div>

            <!-- Step 3 -->
            <div class="reveal delay-300 p-6 rounded-2xl border border-[#1e2638] bg-[#10141e] relative hover:border-[#10b981]/50 transition-all duration-300">
              <div class="w-10 h-10 rounded-xl bg-[#10b981] text-black font-display text-base flex items-center justify-center mb-4 font-black">
                Paso 3
              </div>
              <h4 class="font-display text-base uppercase text-white mb-1">Dinero Directo a Tu Banco</h4>
              <p class="text-xs text-[#94a3b8] leading-relaxed">
                Stripe deposita los fondos directamente a la cuenta bancaria de tu gimnasio. Al vencer la campaña, el cliente recibe en automático su reporte de impresiones.
              </p>
            </div>
          </div>
        </div>

        <!-- Breakdown Card: Ejemplo de Ingresos Reales -->
        <div class="reveal-scale delay-200 p-8 rounded-3xl border border-[#6d5df1]/40 bg-gradient-to-r from-[#10141e] via-[#131823] to-[#10141e] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#6d5df1] block mb-1">
              Ejemplo Real de Facturación Mensual por Sede
            </span>
            <h4 class="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
              +$32,000 MXN al Mes con Solo 5 Negocios Aliados
            </h4>
            <p class="text-xs sm:text-sm text-[#94a3b8] mt-1 max-w-xl">
              2 tiendas de suplementos ($7,000) + 1 clínica de fisio ($5,000) + 2 cafeterías o marcas deportivas ($8,000) + 4 notificaciones push patrocinadas ($12,000).
            </p>
          </div>
          <button
            @click="openDemoModal"
            class="px-8 py-4 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider hover:scale-105 transition-all shrink-0 cursor-pointer"
          >
            Ver Cómo Vender Pauta
          </button>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- NUESTRAS VENTAJAS (Carousel 01 a 06 - Dribbble Concept)             -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section id="ventajas" class="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1e2638]">
      <div class="max-w-7xl mx-auto">
        <div class="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6d5df1] mb-2">
              <Sparkles class="w-3.5 h-3.5" />
              <span>Por qué los gimnasios líderes migran a RIR-HUB</span>
            </div>
            <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Nuestras Ventajas
            </h2>
            <p class="mt-2 text-sm sm:text-base text-[#94a3b8]">
              Diseñado minuciosamente para cadenas fitness, gimnasios boutique y centros de alto rendimiento.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              @click="prevAdvantage"
              class="w-12 h-12 rounded-full border border-[#1e2638] bg-[#10141e] hover:bg-[#1e2638] hover:text-[#6d5df1] text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft class="w-5 h-5" />
            </button>
            <button
              @click="nextAdvantage"
              class="w-12 h-12 rounded-full border border-[#1e2638] bg-[#10141e] hover:bg-[#1e2638] hover:text-[#6d5df1] text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(item, idx) in advantages"
            :key="item.id"
            @click="activeAdvantage = idx"
            :style="{ transitionDelay: (idx * 100) + 'ms' }"
            :class="[ 'reveal relative rounded-2xl p-7 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:shadow-2xl', activeAdvantage === idx ? 'bg-gradient-to-br ' + item.accentGrad + ' text-black scale-[1.02] ring-2 ring-[#6d5df1]' : 'bg-[#10141e] border border-[#1e2638] hover:border-[#6d5df1]/40 text-white' ]"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span
                  :class="[ 'font-display text-2xl tracking-tighter', activeAdvantage === idx ? 'text-black/80' : 'text-[#6d5df1]' ]"
                >
                  {{ item.id }}
                </span>
                <span
                  :class="[ 'text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full', activeAdvantage === idx ? 'bg-black/20 text-black' : 'bg-[#1e2638] text-[#94a3b8]' ]"
                >
                  {{ item.badge }}
                </span>
              </div>

              <h3
                :class="[ 'font-display text-xl uppercase tracking-tight mb-2', activeAdvantage === idx ? 'text-black' : 'text-white' ]"
              >
                {{ item.title }}
              </h3>
              <p
                :class="[ 'text-sm leading-relaxed mb-4', activeAdvantage === idx ? 'text-black/80 font-medium' : 'text-[#94a3b8]' ]"
              >
                {{ item.summary }}
              </p>
            </div>

            <div v-if="activeAdvantage === idx" class="mt-4 pt-4 border-t border-black/20 animate-fadeIn">
              <p class="text-xs text-black/90 font-normal leading-relaxed mb-4">
                {{ item.description }}
              </p>
              <ul class="space-y-1.5 mb-5">
                <li v-for="(b, bIdx) in item.bullets" :key="bIdx" class="text-xs text-black font-semibold flex items-center gap-1.5">
                  <Check class="w-3.5 h-3.5 stroke-[3] text-black" />
                  <span>{{ b }}</span>
                </li>
              </ul>
              <div class="flex items-center justify-between">
                <span class="text-xs font-black uppercase tracking-wider text-black bg-black/15 px-2.5 py-1 rounded">
                  {{ item.metric }}
                </span>
                <button
                  @click.stop="openDemoModal"
                  class="px-3.5 py-1.5 rounded-full bg-black text-[#6d5df1] font-display text-xs uppercase tracking-wider hover:scale-105 transition-transform"
                >
                  Agendar Demo
                </button>
              </div>
            </div>

            <div v-else class="mt-4 pt-4 border-t border-[#1e2638] flex items-center justify-between text-xs">
              <span class="text-[#6d5df1] font-bold">{{ item.metric }}</span>
              <span class="text-[#94a3b8] flex items-center gap-1 group-hover:text-white">
                Ver detalle
                <ArrowRight class="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- ECOSISTEMA DUAL: B2B VS APP SOCIO                                  -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section id="ecosistema" class="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0f17]/90 border-t border-[#1e2638]">
      <div class="max-w-7xl mx-auto">
        <div class="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div class="text-xs font-bold uppercase tracking-widest text-[#6d5df1] mb-2">
              Arquitectura Dual Integrada
            </div>
            <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Ecosistema Integral
            </h2>
            <p class="text-sm sm:text-base text-[#94a3b8] mt-2">
              Una consola potente para tu equipo y una aplicación nativa para tus socios.
            </p>
          </div>

          <div class="flex items-center p-1 rounded-xl bg-[#10141e] border border-[#1e2638]">
            <button
              @click="activeEcosystemTab = 'b2b'"
              :class="[ 'px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2', activeEcosystemTab === 'b2b' ? 'bg-[#6d5df1] hover:bg-[#5b4be2] text-white shadow-md' : 'text-[#94a3b8] hover:text-white' ]"
            >
              <Laptop class="w-3.5 h-3.5" />
              Consola B2B Web
            </button>
            <button
              @click="activeEcosystemTab = 'app'"
              :class="[ 'px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2', activeEcosystemTab === 'app' ? 'bg-[#6d5df1] hover:bg-[#5b4be2] text-white shadow-md' : 'text-[#94a3b8] hover:text-white' ]"
            >
              <Smartphone class="w-3.5 h-3.5" />
              App Socio (Flutter)
            </button>
          </div>
        </div>

        <!-- B2B Tab Content -->
        <div v-if="activeEcosystemTab === 'b2b'" class="reveal-scale delay-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
          <div class="lg:col-span-5 space-y-6">
            <h3 class="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Control Total en Tiempo Real
            </h3>
            <p class="text-sm text-[#94a3b8] leading-relaxed">
              Diseñado para dueños, gerentes y recepcionistas con control estricto de roles y alcances por sucursal:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3 text-sm text-[#f8fafc]">
                <CheckCircle2 class="w-5 h-5 text-[#6d5df1] shrink-0 mt-0.5" />
                <span><strong>Aforo en vivo:</strong> Visualiza la ocupación exacta de cada sede al segundo sin recargar la página.</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-[#f8fafc]">
                <CheckCircle2 class="w-5 h-5 text-[#6d5df1] shrink-0 mt-0.5" />
                <span><strong>Gestión de clases y reservas:</strong> Control de cupo por ocurrencia horaria y lista de asistentes.</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-[#f8fafc]">
                <CheckCircle2 class="w-5 h-5 text-[#6d5df1] shrink-0 mt-0.5" />
                <span><strong>Escáner unificado:</strong> Check-in de socios regulares y pases de Wellhub / TotalPass en segundos.</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-[#f8fafc]">
                <CheckCircle2 class="w-5 h-5 text-[#6d5df1] shrink-0 mt-0.5" />
                <span><strong>Auditoría y finanzas:</strong> Reportes de ingresos, cierres de día automatizados y exportación a Excel.</span>
              </li>
            </ul>
            <button
              @click="openDemoModal"
              class="px-6 py-3 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer"
            >
              Solicitar Acceso al Sandbox
            </button>
          </div>
          <div class="lg:col-span-7">
            <div class="rounded-2xl border border-[#1e2638] bg-[#10141e] p-2 shadow-2xl overflow-hidden">
              <img
                src="/shots/dashboard.png"
                alt="Consola Web B2B"
                class="rounded-xl w-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- App Tab Content -->
        <div v-else class="reveal-scale delay-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
          <div class="lg:col-span-5 space-y-6">
            <h3 class="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
              La App que Tus Socios Amarán Usar
            </h3>
            <p class="text-sm text-[#94a3b8] leading-relaxed">
              Disponible en iOS y Android, creada en Flutter para un rendimiento nativo fluido:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3 text-sm text-[#f8fafc]">
                <CheckCircle2 class="w-5 h-5 text-[#6d5df1] shrink-0 mt-0.5" />
                <span><strong>Pase digital QR dinámico:</strong> Acceso instantáneo a torniquetes sin tarjetas físicas.</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-[#f8fafc]">
                <CheckCircle2 class="w-5 h-5 text-[#6d5df1] shrink-0 mt-0.5" />
                <span><strong>Metas semanales y recompensas:</strong> Acumulación de puntos y tienda digital de premios.</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-[#f8fafc]">
                <CheckCircle2 class="w-5 h-5 text-[#6d5df1] shrink-0 mt-0.5" />
                <span><strong>Pagos in-app 1-Click:</strong> Renovación de mensualidades con Apple Pay y Google Pay.</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-[#f8fafc]">
                <CheckCircle2 class="w-5 h-5 text-[#6d5df1] shrink-0 mt-0.5" />
                <span><strong>Reserva de clases grupales:</strong> Apartado de lugar con recordatorio previo a la sesión.</span>
              </li>
            </ul>
            <button
              @click="openDemoModal"
              class="px-6 py-3 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer"
            >
              Ver Demo Móvil
            </button>
          </div>
          <div class="lg:col-span-7 flex justify-center gap-4 sm:gap-6 overflow-x-auto py-4">
            <div class="w-44 sm:w-56 rounded-3xl border-2 border-[#1e2638] bg-black p-1 shadow-2xl shrink-0">
              <img src="/shots/app/02-home.png" alt="App Home" class="rounded-[22px] w-full" />
            </div>
            <div class="w-44 sm:w-56 rounded-3xl border-2 border-[#1e2638] bg-black p-1 shadow-2xl shrink-0">
              <img src="/shots/app/08-qr-checkin.png" alt="App QR" class="rounded-[22px] w-full" />
            </div>
            <div class="w-44 sm:w-56 rounded-3xl border-2 border-[#1e2638] bg-black p-1 shadow-2xl shrink-0">
              <img src="/shots/app/04-aliados.png" alt="App Aliados" class="rounded-[22px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- CALCULADORA DE RETORNO DE INVERSIÓN (ROI)                           -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section id="calculadora" class="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1e2638]">
      <div class="max-w-7xl mx-auto">
        <div class="reveal text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6d5df1]/10 border border-[#6d5df1]/30 text-[#6d5df1] text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp class="w-3.5 h-3.5" />
            <span>Simulador Financiero</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Calcula el Retorno para Tu Gimnasio
          </h2>
          <p class="mt-4 text-base text-[#94a3b8]">
            Descubre cuánto capital adicional genera RIR-HUB al reducir la fuga de socios y habilitar publicidad local.
          </p>
        </div>

        <div class="reveal-scale delay-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 p-8 rounded-2xl border border-[#1e2638] bg-[#10141e] space-y-8">
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-bold text-white uppercase">Número de Socios Activos</label>
                <span class="text-lg font-display text-[#6d5df1]">{{ activeMembers }} socios</span>
              </div>
              <input
                type="range"
                v-model="activeMembers"
                min="200"
                max="4000"
                step="50"
                class="w-full accent-[#6d5df1] bg-[#1e2638] h-2 rounded-lg cursor-pointer"
              />
              <div class="flex justify-between text-[11px] text-[#94a3b8] mt-1">
                <span>200 socios</span>
                <span>4,000 socios</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-bold text-white uppercase">Cuota Mensual Promedio</label>
                <span class="text-lg font-display text-[#6d5df1]">{{ formatCurrency(monthlyFee) }} / mes</span>
              </div>
              <input
                type="range"
                v-model="monthlyFee"
                min="350"
                max="2500"
                step="50"
                class="w-full accent-[#6d5df1] bg-[#1e2638] h-2 rounded-lg cursor-pointer"
              />
              <div class="flex justify-between text-[11px] text-[#94a3b8] mt-1">
                <span>$350 MXN</span>
                <span>$2,500 MXN</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-bold text-white uppercase">Número de Sedes Operativas</label>
                <span class="text-lg font-display text-[#6d5df1]">{{ branchesCount }} {{ branchesCount === 1 ? 'sede' : 'sedes' }}</span>
              </div>
              <input
                type="range"
                v-model="branchesCount"
                min="1"
                max="10"
                step="1"
                class="w-full accent-[#6d5df1] bg-[#1e2638] h-2 rounded-lg cursor-pointer"
              />
              <div class="flex justify-between text-[11px] text-[#94a3b8] mt-1">
                <span>1 sede</span>
                <span>10 sedes</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 p-8 rounded-2xl border-2 border-[#6d5df1]/60 bg-gradient-to-b from-[#131823] to-[#07090e] relative overflow-hidden">
            <div class="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
              Impacto Anual Estimado
            </div>
            <div class="text-3xl sm:text-4xl font-display text-[#6d5df1] mb-6">
              {{ formatCurrency(roiCalculation.totalAnnualBenefit) }}
            </div>

            <div class="space-y-4 pt-4 border-t border-[#1e2638]">
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#94a3b8]">Socios retenidos al año:</span>
                <span class="font-bold text-white">+{{ roiCalculation.savedMembersYear }} socios</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#94a3b8]">Ingreso preservado por retención:</span>
                <span class="font-bold text-[#10b981]">{{ formatCurrency(roiCalculation.annualSavedRevenue) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#94a3b8]">Ganancia por Publicidad Local:</span>
                <span class="font-bold text-[#6d5df1]">{{ formatCurrency(roiCalculation.annualAdsRevenue) }}</span>
              </div>
            </div>

            <button
              @click="openDemoModal"
              class="w-full mt-8 py-3.5 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider hover:scale-[1.02] transition-all cursor-pointer"
            >
              Comenzar a Maximizar Ingresos
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- FINAL CTA BANNER CON SPOTLIGHT VOLUMÉTRICO                          -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section class="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1e2638] bg-gradient-to-b from-[#0c0f17] via-[#080a11] to-[#05070c] overflow-hidden">
      <!-- Haz de luz de Spotlight desde la base (Inspirado en Dribbble video) -->
      <div class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[560px] overflow-hidden flex items-end justify-center z-0">
        <!-- Cono exterior difuso -->
        <div class="w-full h-full bg-gradient-to-t from-[#6d5df1]/35 via-[#6d5df1]/10 to-transparent [clip-path:polygon(24%_0%,76%_0%,100%_100%,0%_100%)] blur-2xl animate-spotlight"></div>
        <!-- Núcleo brillante enfocado -->
        <div class="absolute bottom-0 w-3/4 h-5/6 bg-gradient-to-t from-white/25 via-[#8b5cf6]/30 to-transparent [clip-path:polygon(36%_0%,64%_0%,85%_100%,15%_100%)] blur-lg animate-spotlight"></div>
        <!-- Foco lumínico en el piso -->
        <div class="absolute -bottom-10 w-[420px] h-32 bg-[#6d5df1] rounded-full blur-3xl opacity-75"></div>
      </div>

      <div class="reveal-scale delay-200 max-w-5xl mx-auto rounded-3xl border border-[#6d5df1]/50 bg-gradient-to-r from-[#10141e]/90 via-[#131823]/95 to-[#10141e]/90 backdrop-blur-xl p-8 sm:p-14 text-center relative z-10 shadow-2xl">
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-[#6d5df1]/15 blur-3xl rounded-full pointer-events-none" />
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-[#3b82f6]/15 blur-3xl rounded-full pointer-events-none" />

        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#6d5df1]/40 bg-[#6d5df1]/10 text-[#6d5df1] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Implementación Rápida · Cero Complicaciones</span>
        </div>

        <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Moderniza Tu Gimnasio con la Tecnología que Otros Aún No Tienen
        </h2>
        <p class="mt-4 text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto">
          Migración asistida sin interrupción de servicio. Importamos tu base de socios y dejamos tu sistema operativo listo en menos de 48 horas.
        </p>

        <div class="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            @click="openDemoModal"
            class="relative w-full sm:w-auto px-9 py-4 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-sm uppercase tracking-wider hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Agendar Demostración Personalizada</span>
            <ArrowRight class="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- FOOTER                                                              -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <footer class="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-[#1e2638] bg-[#07090e] text-[#94a3b8] text-xs">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6d5df1] to-[#8b5cf6] flex items-center justify-center font-display text-black text-sm">
            R
          </div>
          <span class="font-display text-white text-lg tracking-tight">RIR<span class="text-[#6d5df1]">HUB</span></span>
          <span class="text-[#64748b]">· El Sistema Operativo para Cadenas Fitness</span>
        </div>

        <div class="flex items-center gap-6">
          <span class="flex items-center gap-1.5 text-[#10b981]">
            <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            Todos los sistemas operativos
          </span>
          <a href="#" class="hover:text-white transition-colors">Privacidad</a>
          <a href="#" class="hover:text-white transition-colors">Términos de Servicio</a>
          <a href="#" class="hover:text-white transition-colors">Seguridad Stripe</a>
        </div>

        <div>
          © {{ new Date().getFullYear() }} RIR-HUB Inc. Todos los derechos reservados.
        </div>
      </div>
    </footer>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- LEAD CAPTURE MODAL: AGENDAR DEMO                                    -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      @click.self="closeDemoModal"
    >
      <div class="relative w-full max-w-lg rounded-2xl border border-[#1e2638] bg-[#10141e] p-6 sm:p-8 shadow-2xl">
        <button
          @click="closeDemoModal"
          class="absolute top-5 right-5 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>

        <div v-if="modalSubmitted" class="text-center py-8 space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981]">
            <CheckCircle2 class="w-8 h-8" />
          </div>
          <h3 class="font-display text-2xl uppercase tracking-tight text-white">
            ¡Solicitud Recibida!
          </h3>
          <p class="text-sm text-[#94a3b8] max-w-sm mx-auto">
            Gracias por tu interés en RIR-HUB, <strong class="text-white">{{ form.name }}</strong>. Nuestro equipo comercial se comunicará contigo vía WhatsApp / correo para coordinar tu acceso y demostración en vivo.
          </p>
          <button
            @click="closeDemoModal"
            class="mt-4 px-6 py-2.5 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer"
          >
            Entendido
          </button>
        </div>

        <div v-else>
          <div class="mb-6">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#6d5df1]/10 text-[#6d5df1] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles class="w-3 h-3" />
              <span>Acceso Preferencial</span>
            </div>
            <h3 class="font-display text-2xl uppercase tracking-tight text-white">
              Agendar Demo en Vivo
            </h3>
            <p class="text-xs text-[#94a3b8] mt-1">
              Descubre cómo RIR-HUB reduce el churn y monetiza tu comunidad desde el primer mes.
            </p>
          </div>

          <form @submit.prevent="submitDemoForm" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">Tu Nombre Completo</label>
              <input
                v-model="form.name"
                required
                type="text"
                placeholder="Ej. Roberto Salgado"
                class="w-full px-3.5 py-2.5 rounded-xl border border-[#1e2638] bg-[#07090e] text-white text-sm focus:border-[#6d5df1] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">Nombre de tu Gimnasio o Cadena</label>
              <input
                v-model="form.gymName"
                required
                type="text"
                placeholder="Ej. Iron Club Fitness"
                class="w-full px-3.5 py-2.5 rounded-xl border border-[#1e2638] bg-[#07090e] text-white text-sm focus:border-[#6d5df1] focus:outline-none transition-colors"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">Sedes Actuales</label>
                <select
                  v-model="form.branches"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#1e2638] bg-[#07090e] text-white text-sm focus:border-[#6d5df1] focus:outline-none transition-colors"
                >
                  <option>1 sede</option>
                  <option>2 a 3 sedes</option>
                  <option>4 a 10 sedes</option>
                  <option>Más de 10 sedes</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">WhatsApp de Contacto</label>
                <input
                  v-model="form.phone"
                  required
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#1e2638] bg-[#07090e] text-white text-sm focus:border-[#6d5df1] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">Correo Electrónico Corporativo</label>
              <input
                v-model="form.email"
                required
                type="email"
                placeholder="director@ironclub.com"
                class="w-full px-3.5 py-2.5 rounded-xl border border-[#1e2638] bg-[#07090e] text-white text-sm focus:border-[#6d5df1] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              class="w-full mt-2 py-3.5 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider hover:scale-[1.02] transition-all cursor-pointer"
            >
              Confirmar Solicitud de Demostración
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
