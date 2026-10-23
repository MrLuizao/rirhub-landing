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
  interest: 'Demo remota en vivo (30 min)'
})

const openDemoModal = (option = 'Demo remota en vivo (30 min)') => {
  form.value.interest = option
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
    <nav class="sticky top-0 z-50 bg-[#07090e]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo (Sin caja R, solo nombre con gradiente de texto) -->
        <a href="#" class="flex items-center">
          <span class="font-display text-2xl tracking-tight text-white uppercase">
            RIR<span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span>
          </span>
        </a>

        <!-- CTA Header (Estilo Outline como "Descubre Cómo Te Ayuda la IA") -->
        <div class="flex items-center gap-3">
          <button
            @click="openDemoModal('Demo remota en vivo (30 min)')"
            class="px-5 py-2.5 rounded-xl border border-[#1e2638] bg-[#10141e]/80 hover:bg-[#10141e] hover:border-[#6d5df1]/50 text-white font-semibold text-xs tracking-wide uppercase transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Calendar class="w-4 h-4 text-[#6d5df1]" />
            <span>Agendar Demo</span>
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
        <div class="reveal delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6d5df1]/30 bg-[#6d5df1]/10 text-[#c4b5fd] text-xs font-bold tracking-wide uppercase mb-8">
          <Brain class="w-3.5 h-3.5 text-[#6d5df1] animate-pulse" />
          <span>Retención Predictiva con IA · App White-Label · Medio Publicitario Propio</span>
        </div>

        <!-- Main Display Headline -->
        <h1 class="reveal delay-200 font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white max-w-5xl mx-auto leading-[1.05]">
          Tu Audiencia Es un Activo.
          <span class="block bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent drop-shadow-sm">
            Nosotros lo Activamos con IA.
          </span>
        </h1>

        <!-- Subhead -->
        <p class="reveal delay-300 mt-6 text-lg sm:text-xl text-slate-100 max-w-3xl mx-auto font-normal leading-relaxed">
          <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> es el sistema operativo que <strong class="text-[#c4b5fd] font-bold">frena la fuga de socios 18 días antes con Inteligencia Artificial</strong> y convierte tu app en un segundo mostrador: tus socios <strong class="text-[#6ee7b7] font-bold">renuevan su membresía con un toque</strong> y las marcas de tu zona pagan por anunciarse frente a una <strong class="text-[#38bdf8] font-bold">audiencia cautiva que abre la app todos los días</strong>.
        </p>

        <!-- Hero Buttons -->
        <div class="reveal delay-400 mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            @click="openDemoModal('Demo remota en vivo (30 min)')"
            class="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-sm uppercase tracking-wider transition-colors duration-200 flex items-center justify-center cursor-pointer"
          >
            <span>Agendar Demo en Vivo</span>
          </button>
          <a
            href="#ia"
            class="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#1e2638] bg-[#10141e]/80 hover:bg-[#10141e] hover:border-[#6d5df1]/50 text-white font-display text-sm uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Brain class="w-4 h-4 text-[#6d5df1]" />
            <span>CÓMO TE AYUDA LA IA</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- THE HOOK: TU APP ES UN MEDIO DE COMUNICACIÓN (Slide 2 del Deck)    -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section id="audiencia" class="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-y border-[#1e2638] bg-[#0b0e17] overflow-hidden">
      <!-- Glow ambiental de alto contraste para legibilidad perfecta -->
      <div class="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[300px] bg-gradient-to-b from-[#6d5df1]/15 via-[#8b5cf6]/8 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div class="max-w-7xl mx-auto relative z-10">
        <!-- Section Header -->
        <div class="reveal text-center max-w-3xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6d5df1]/15 border border-[#6d5df1]/40 text-[#a78bfa] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm shadow-[#6d5df1]/15">
            <Brain class="w-3.5 h-3.5 text-[#a78bfa]" />
            <span>El Doble Motor de Tu Gimnasio</span>
          </div>

          <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white leading-[1.08]">
            Detén las Bajas con IA.
            <span class="block bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#f472b6] bg-clip-text text-transparent drop-shadow-sm">
              Activa Tu Audiencia como un Medio Propio.
            </span>
          </h2>

          <p class="mt-4 text-base sm:text-lg text-slate-100 leading-relaxed max-w-3xl mx-auto font-normal">
            La plataforma dual que blinda tus ingresos: <strong class="text-[#c4b5fd] font-bold">la IA predictiva rescata socios 18 días antes</strong> de que cancelen y las marcas locales pagan por anunciarse frente a una comunidad activa con <strong class="text-[#6ee7b7] font-bold">$0 costo de distribución</strong>.
          </p>
        </div>

        <!-- 4 Metric Cards (Framer Aesthetic) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Card 1: IA Churn -->
          <div class="reveal delay-100 relative p-6 sm:p-7 rounded-2xl border border-[#6d5df1]/40 bg-[#10141e]/90 hover:border-[#6d5df1] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-[0_0_30px_rgba(109,93,241,0.1)] group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#6d5df1]/15 text-[#6d5df1] border border-[#6d5df1]/30">
                  Retención IA
                </span>
                <span class="w-2 h-2 rounded-full bg-[#6d5df1] animate-pulse" />
              </div>
              <div class="text-4xl lg:text-5xl font-display text-[#6d5df1] tracking-tight mb-2">-42%</div>
              <div class="text-sm font-bold text-white uppercase tracking-wide">Deserción de Socios</div>
              <p class="text-xs sm:text-sm text-slate-100 mt-2 leading-relaxed">
                Aprende los hábitos de cada socio y detecta la ruptura de rutina 18 días antes del corte de pago.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#1e2638] text-xs sm:text-sm font-bold text-[#6d5df1] flex items-center gap-2">
              <Brain class="w-4 h-4 shrink-0" />
              <span>Predicción temprana anti-churn</span>
            </div>
          </div>

          <!-- Card 2: 100% Cautivo -->
          <div class="reveal delay-200 relative p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#38bdf8]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
                  Audiencia Fiel
                </span>
                <CheckCircle2 class="w-3.5 h-3.5 text-[#38bdf8]" />
              </div>
              <div class="text-4xl lg:text-5xl font-display text-[#38bdf8] tracking-tight mb-2">100%</div>
              <div class="text-sm font-bold text-white uppercase tracking-wide">Es Tu Propio Socio</div>
              <p class="text-xs sm:text-sm text-slate-100 mt-2 leading-relaxed">
                Audiencia cautiva, activa y local. Abren la app a diario para QR, aforo y clases sin impactos desperdiciados.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#1e2638] text-xs sm:text-sm font-bold text-[#38bdf8] flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 shrink-0" />
              <span>Target hiper-segmentado</span>
            </div>
          </div>

          <!-- Card 3: $0 Costo Distribución -->
          <div class="reveal delay-300 relative p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#10b981]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                  Canal Propio
                </span>
                <TrendingUp class="w-3.5 h-3.5 text-[#10b981]" />
              </div>
              <div class="text-4xl lg:text-5xl font-display text-[#10b981] tracking-tight mb-2">$0</div>
              <div class="text-sm font-bold text-white uppercase tracking-wide">Costo de Distribución</div>
              <p class="text-xs sm:text-sm text-slate-100 mt-2 leading-relaxed">
                Medio 100% propio. Las marcas pagan por pauta directa y el dinero ingresa íntegro a tu cuenta bancaria.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#1e2638] text-xs sm:text-sm font-bold text-[#10b981] flex items-center gap-2">
              <TrendingUp class="w-4 h-4 shrink-0" />
              <span>100% margen para tu gym</span>
            </div>
          </div>

          <!-- Card 4: Pauta con CTR real -->
          <div class="reveal delay-400 relative p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#ec4899]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#ec4899]/15 text-[#ec4899] border border-[#ec4899]/30">
                  Pauta Local
                </span>
                <Sparkles class="w-3.5 h-3.5 text-[#ec4899]" />
              </div>
              <div class="text-4xl lg:text-5xl font-display text-[#ec4899] tracking-tight mb-2">+$32K</div>
              <div class="text-sm font-bold text-white uppercase tracking-wide">Ingreso Extra / Sede</div>
              <p class="text-xs sm:text-sm text-slate-100 mt-2 leading-relaxed">
                12,810 impresiones promedio con 6.3% CTR real cobrado en piloto automático con Stripe en <a href="https://gym-b2b-template.vercel.app/anuncia" target="_blank" rel="noopener noreferrer" class="text-[#38bdf8] hover:text-[#7dd3fc] underline decoration-[#38bdf8]/40 hover:decoration-[#38bdf8] transition-colors">/anuncia</a>.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#1e2638] text-xs sm:text-sm font-bold text-[#ec4899] flex items-center gap-2">
              <Sparkles class="w-4 h-4 shrink-0" />
              <span>Resultados comprobados</span>
            </div>
          </div>
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
            <span class="block bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent drop-shadow-sm">
              La IA Te lo Avisa Antes de que Cancelen.
            </span>
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-100 leading-relaxed max-w-3xl mx-auto font-normal">
            El 70% de las cancelaciones en un gimnasio no ocurren por sorpresa: el socio espacia sus visitas semanas antes de abandonar. Mientras los software tradicionales avisan cuando ya es tarde, <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> <strong class="text-[#c4b5fd] font-bold">predice y actúa 18 días antes</strong> para <strong class="text-[#6ee7b7] font-bold">salvar esa mensualidad en automático</strong>.
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

          <div class="reveal delay-100 relative z-10 p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#6d5df1]/60 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/40 group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-10 h-10 rounded-xl bg-[#6d5df1]/15 border border-[#6d5df1]/30 text-[#c4b5fd] font-display text-base font-bold flex items-center justify-center">
                  01
                </div>
                <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#6d5df1]/15 text-[#c4b5fd] border border-[#6d5df1]/30">
                  Paso 1
                </span>
              </div>
              <h3 class="font-display text-lg uppercase tracking-tight text-white mb-2.5 group-hover:text-[#c4b5fd] transition-colors">
                Aprende la Rutina de Cada Socio
              </h3>
              <p class="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                Mapea días, horarios y clases favoritas. <strong class="text-[#c4b5fd] font-semibold">Aprende sola con cada check-in</strong> sin configuraciones manuales.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#1e2638] text-sm sm:text-base font-bold text-[#c4b5fd] flex items-center gap-2 sm:gap-2.5">
              <Eye class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Monitoreo silencioso 24/7</span>
            </div>
          </div>

          <div class="reveal delay-200 relative z-10 p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#ea580c]/60 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/40 group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-10 h-10 rounded-xl bg-[#ea580c]/15 border border-[#ea580c]/30 text-[#f59e0b] font-display text-base font-bold flex items-center justify-center">
                  02
                </div>
                <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ea580c]/15 text-[#f59e0b] border border-[#ea580c]/30">
                  Paso 2
                </span>
              </div>
              <h3 class="font-display text-lg uppercase tracking-tight text-white mb-2.5 group-hover:text-[#f59e0b] transition-colors">
                Detecta el Peligro 18 Días Antes
              </h3>
              <p class="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                Identifica la ruptura de rutina semanas antes del corte. Te alerta en <strong class="text-[#f59e0b] font-semibold">amarillo o rojo</strong> con la causa exacta.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#1e2638] text-sm sm:text-base font-bold text-[#f59e0b] flex items-center gap-2 sm:gap-2.5">
              <AlertTriangle class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Diagnóstico explicativo claro</span>
            </div>
          </div>

          <div class="reveal delay-300 relative z-10 p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#10b981]/60 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/40 group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-10 h-10 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#6ee7b7] font-display text-base font-bold flex items-center justify-center">
                  03
                </div>
                <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#6ee7b7] border border-[#10b981]/30">
                  Paso 3
                </span>
              </div>
              <h3 class="font-display text-lg uppercase tracking-tight text-white mb-2.5 group-hover:text-[#6ee7b7] transition-colors">
                Rescata al Socio en Automático
              </h3>
              <p class="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                Envía <strong class="text-[#6ee7b7] font-semibold">pushes inteligentes con incentivos</strong> y avisa a tu staff en recepción para salvar la mensualidad.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#1e2638] text-sm sm:text-base font-bold text-[#6ee7b7] flex items-center gap-2 sm:gap-2.5">
              <Zap class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Recuperación antes de cancelar</span>
            </div>
          </div>
        </div>

        <!-- SIMULADOR INTERACTIVO DEL SEMÁFORO DE RETENCIÓN -->
        <div class="reveal-scale delay-200 p-7 sm:p-9 rounded-3xl border-2 border-[#1e2638] bg-[#10141e] shadow-2xl relative overflow-hidden">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#1e2638] gap-4">
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6d5df1]/15 text-[#c4b5fd] border border-[#6d5df1]/30 text-xs font-bold uppercase tracking-wider mb-2">
                <Activity class="w-3.5 h-3.5 text-[#6d5df1]" />
                <span>Simulador en Vivo para Dueños de Gym</span>
              </div>
              <h3 class="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Mira Cómo Evalúa la IA a Tres de Tus Socios
              </h3>
            </div>

            <!-- Tab Buttons (Green, Yellow, Red) con diseño Framer refinado -->
            <div class="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0a0d14] border border-[#1e2638]">
              <button
                @click="activeAiTab = 'healthy'"
                :class="[
                  'px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center gap-2',
                  activeAiTab === 'healthy'
                    ? 'bg-[#10b981]/15 text-[#6ee7b7] border border-[#10b981]/40'
                    : 'text-slate-400 hover:text-white border border-transparent'
                ]"
              >
                <span class="w-2 h-2 rounded-full bg-[#10b981]" />
                Socio Fiel
              </button>
              <button
                @click="activeAiTab = 'warning'"
                :class="[
                  'px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center gap-2',
                  activeAiTab === 'warning'
                    ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/40'
                    : 'text-slate-400 hover:text-white border border-transparent'
                ]"
              >
                <span class="w-2 h-2 rounded-full bg-[#f59e0b]" />
                Alerta Temprana
              </button>
              <button
                @click="activeAiTab = 'critical'"
                :class="[
                  'px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center gap-2',
                  activeAiTab === 'critical'
                    ? 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/40'
                    : 'text-slate-400 hover:text-white border border-transparent'
                ]"
              >
                <span class="w-2 h-2 rounded-full bg-[#ef4444]" />
                Riesgo Crítico
              </button>
            </div>
          </div>

          <!-- Active Case Content -->
          <div class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
            <!-- Left Info Column: Ficha del Socio -->
            <div class="lg:col-span-5 p-6 rounded-2xl bg-[#0a0d14] border border-[#1e2638] flex flex-col justify-between space-y-5">
              <div class="space-y-4">
                <div class="flex items-center gap-3.5">
                  <div class="relative">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1c2436] to-[#0f1420] border border-[#2a364f] flex items-center justify-center font-display text-white font-black text-base shadow-inner">
                      {{ aiSimulatorCases[activeAiTab].member.name.split(' ').map(n => n[0]).join('') }}
                    </div>
                    <span
                      class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0a0d14]"
                      :class="activeAiTab === 'healthy' ? 'bg-[#10b981]' : activeAiTab === 'warning' ? 'bg-[#f59e0b]' : 'bg-[#ef4444]'"
                    />
                  </div>
                  <div>
                    <h4 class="font-display text-lg uppercase tracking-tight text-white">
                      {{ aiSimulatorCases[activeAiTab].member.name }}
                    </h4>
                    <p class="text-xs text-slate-300 font-medium">
                      {{ aiSimulatorCases[activeAiTab].member.plan }}
                    </p>
                  </div>
                </div>

                <div class="space-y-3 p-4 rounded-xl bg-[#0f131d] border border-[#1e2638]/70 text-xs">
                  <div>
                    <span class="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                      Hábito Registrado
                    </span>
                    <p class="text-slate-100 font-medium leading-relaxed">
                      {{ aiSimulatorCases[activeAiTab].member.habit }}
                    </p>
                  </div>
                  <div class="pt-2.5 border-t border-[#1e2638]/70">
                    <span class="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                      Historial Reciente
                    </span>
                    <p class="text-slate-200 font-normal leading-relaxed">
                      {{ aiSimulatorCases[activeAiTab].member.history }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border self-start shadow-sm"
                :class="aiSimulatorCases[activeAiTab].badgeClass"
              >
                <span
                  class="w-2 h-2 rounded-full animate-pulse"
                  :class="activeAiTab === 'healthy' ? 'bg-[#10b981]' : activeAiTab === 'warning' ? 'bg-[#f59e0b]' : 'bg-[#ef4444]'"
                />
                <span>{{ aiSimulatorCases[activeAiTab].tag }}</span>
              </div>
            </div>

            <!-- Right Action & Outcome Column: Diagnóstico y Acción IA -->
            <div class="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#0a0d14] border border-[#1e2638] flex flex-col justify-between space-y-6 shadow-xl">
              <div class="space-y-5">
                <div>
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6d5df1]/15 text-[#c4b5fd] border border-[#6d5df1]/30 text-[10px] font-black uppercase tracking-wider mb-2.5">
                    <Brain class="w-3.5 h-3.5 text-[#6d5df1]" />
                    <span>Diagnóstico de la Inteligencia Artificial</span>
                  </div>
                  <p class="text-sm sm:text-base text-slate-100 font-normal leading-relaxed">
                    {{ aiSimulatorCases[activeAiTab].aiDetection }}
                  </p>
                </div>

                <div class="pt-5 border-t border-[#1e2638]">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10b981]/15 text-[#6ee7b7] border border-[#10b981]/30 text-[10px] font-black uppercase tracking-wider mb-2.5">
                    <Zap class="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Acción Automatizada por el Sistema</span>
                  </div>
                  <p class="text-sm sm:text-base text-slate-100 font-normal leading-relaxed">
                    {{ aiSimulatorCases[activeAiTab].actionTaken }}
                  </p>
                </div>
              </div>

              <div class="pt-5 border-t border-[#1e2638] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="text-xs leading-snug">
                  <span class="text-slate-400 font-medium block sm:inline mr-1.5">Impacto directo:</span>
                  <strong class="text-[#6ee7b7] font-semibold">{{ aiSimulatorCases[activeAiTab].businessOutcome }}</strong>
                </div>
                <button
                  @click="openDemoModal('Demo remota en vivo (30 min)')"
                  class="px-5 py-2.5 rounded-xl border border-[#1e2638] bg-[#10141e] hover:bg-[#10141e] hover:border-[#6d5df1]/50 text-white font-semibold text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer shrink-0 text-center"
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
            <ul class="space-y-2 text-xs text-slate-300">
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
              <span><span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> con Retención Predictiva</span>
            </div>
            <h4 class="font-display text-lg text-white mb-3">Proactivos y Preventivos</h4>
            <ul class="space-y-2 text-xs text-slate-300">
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
            <span>Medio Publicitario Propio · Vende Espacios · Mide Resultados</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            Vende Espacios.
            <span class="block bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent drop-shadow-sm">
              Mide Resultados en Piloto Automático.
            </span>
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-100 leading-relaxed max-w-3xl mx-auto font-normal">
            Tus socios son el target más codiciado por marcas locales: personas activas con poder adquisitivo. Con <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span>, cualquier negocio de tu zona compra pauta en <a href="https://gym-b2b-template.vercel.app/anuncia" target="_blank" rel="noopener noreferrer" class="text-[#38bdf8] hover:text-[#7dd3fc] font-bold underline decoration-[#38bdf8]/40 hover:decoration-[#38bdf8] transition-colors">/anuncia</a> y tú cobras en automático con Stripe directo a tu banco con <strong class="text-[#6ee7b7] font-bold">100% de margen y $0 comisiones</strong>.
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
                  Anuncios en el inicio de la app
                </h4>
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
              <div class="w-14 h-14 rounded-full border-2 border-[#6d5df1]/60 bg-[#10141e] flex items-center justify-center text-[#6d5df1] transition-colors duration-200">
                <ArrowRight class="w-7 h-7 stroke-[2.5]" />
              </div>
            </div>

            <!-- ═════════════════════════════════════════════════════════ -->
            <!-- TELÉFONO 2: TU FICHA DE ALIADO (SIEMPRE INCLUIDA)        -->
            <!-- ═════════════════════════════════════════════════════════ -->
            <div class="w-full max-w-[320px] sm:max-w-[340px] flex flex-col">
              <!-- Header Row -->
              <div class="mb-4 flex items-center justify-between">
                <h4 class="flex items-center text-xs sm:text-sm font-display font-black uppercase tracking-wider text-white">
                  <span class="w-1.5 h-4.5 rounded-full bg-[#f4e701] mr-2.5 inline-block" />
                  DETALLE DEL ANUNCIO
                </h4>
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
          <div class="text-center max-w-2xl mx-auto mb-12">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6d5df1]/10 border border-[#6d5df1]/30 text-[#c4b5fd] text-xs font-bold uppercase tracking-wider mb-3">
              <Zap class="w-3.5 h-3.5 text-[#6d5df1]" />
              <span>Flujo de Cobro Automatizado</span>
            </div>
            <h3 class="font-display text-2xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              ¿Cómo Funciona el Cobro?
              <span class="block bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#38bdf8] bg-clip-text text-transparent">
                Cero Trabajo para Tu Equipo
              </span>
            </h3>
            <p class="mt-3 text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed font-normal">
              No tienes que andar cobrando con transferencias ni diseñando flyers: <strong class="text-[#38bdf8] font-bold">el anunciante se autogestiona en línea</strong> y <strong class="text-[#6ee7b7] font-bold">tú recibes el dinero directo a tu banco</strong>.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Step 1 -->
            <div class="reveal delay-100 p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#6d5df1]/60 transition-colors duration-300 flex flex-col justify-between shadow-lg shadow-black/40 group">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 rounded-xl bg-[#6d5df1]/15 border border-[#6d5df1]/30 text-[#c4b5fd] font-display text-base font-bold flex items-center justify-center">
                    01
                  </div>
                  <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#6d5df1]/15 text-[#c4b5fd] border border-[#6d5df1]/30">
                    Paso 1 · Self-Serve
                  </span>
                </div>
                <h4 class="font-display text-lg uppercase tracking-tight text-white mb-2.5 group-hover:text-[#c4b5fd] transition-colors">
                  El Anunciante Compra en Línea
                </h4>
                <p class="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                  El comercio local entra a <a href="https://gym-b2b-template.vercel.app/anuncia" target="_blank" rel="noopener noreferrer" class="text-[#38bdf8] hover:text-[#7dd3fc] font-bold underline decoration-[#38bdf8]/40 hover:decoration-[#38bdf8] transition-colors">/anuncia</a>, sube su creativo y paga con tarjeta en <strong class="text-white font-semibold">Stripe</strong> en 2 minutos.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-[#1e2638] text-sm sm:text-base font-bold text-[#c4b5fd] flex items-center gap-2 sm:gap-2.5">
                <CreditCard class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Cobro 100% autogestionado</span>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="reveal delay-200 p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#38bdf8]/60 transition-colors duration-300 flex flex-col justify-between shadow-lg shadow-black/40 group">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8] font-display text-base font-bold flex items-center justify-center">
                    02
                  </div>
                  <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
                    Paso 2 · 1 Clic
                  </span>
                </div>
                <h4 class="font-display text-lg uppercase tracking-tight text-white mb-2.5 group-hover:text-[#38bdf8] transition-colors">
                  Tú Sólo Presionas "Aprobar"
                </h4>
                <p class="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                  Revisas el anuncio en tu consola <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> y das clic en <strong class="text-white font-semibold">Aprobar</strong>. Entra en vivo al carrusel al instante.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-[#1e2638] text-sm sm:text-base font-bold text-[#38bdf8] flex items-center gap-2 sm:gap-2.5">
                <CheckCircle2 class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Control editorial instantáneo</span>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="reveal delay-300 p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#10141e]/90 hover:border-[#10b981]/60 transition-colors duration-300 flex flex-col justify-between shadow-lg shadow-black/40 group">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#6ee7b7] font-display text-base font-bold flex items-center justify-center">
                    03
                  </div>
                  <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#6ee7b7] border border-[#10b981]/30">
                    Paso 3 · Automático
                  </span>
                </div>
                <h4 class="font-display text-lg uppercase tracking-tight text-white mb-2.5 group-hover:text-[#6ee7b7] transition-colors">
                  Dinero Directo a Tu Banco
                </h4>
                <p class="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                  Cobras con <strong class="text-[#6ee7b7] font-bold">100% de margen directo a tu banco</strong> y el anunciante recibe su reporte de métricas en automático.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-[#1e2638] text-sm sm:text-base font-bold text-[#6ee7b7] flex items-center gap-2 sm:gap-2.5">
                <TrendingUp class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Depósito bancario directo</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Breakdown Card: Ejemplo de Ingresos Reales y Métricas del Deck -->
        <div class="reveal-scale delay-200 p-7 sm:p-9 rounded-3xl border border-[#6d5df1]/50 bg-gradient-to-br from-[#10141e] via-[#141a27] to-[#0d1017] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(109,93,241,0.15)] relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-[#6d5df1]/10 rounded-full blur-[100px] pointer-events-none" />
          <div class="relative z-10">
            <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#6d5df1]/15 text-[#c4b5fd] border border-[#6d5df1]/30 mb-3">
              <Sparkles class="w-3.5 h-3.5 text-[#6d5df1]" />
              Métricas Comprobadas en Producción
            </span>
            <h4 class="font-display text-2xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              <span class="text-[#38bdf8]">12,810 Impresiones</span>
              <span class="text-slate-500 mx-2">·</span>
              <span class="text-[#6ee7b7]">6.3% CTR Real</span>
            </h4>
            <p class="text-sm sm:text-base text-slate-100 mt-2.5 max-w-2xl leading-relaxed font-normal">
              2 tiendas de suplementos ($7,000) + 1 clínica de fisio ($5,000) + 2 marcas fitness o cafeterías ($8,000) + pushes patrocinados: <strong class="text-[#6ee7b7] font-bold">+$32,000 MXN al mes por sede</strong> en ingresos <strong class="text-[#38bdf8] font-bold">100% pasivos vía Stripe</strong>.
            </p>
          </div>
          <a
            href="https://gym-b2b-template.vercel.app/anuncia"
            target="_blank"
            rel="noopener noreferrer"
            class="relative z-10 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center shrink-0 cursor-pointer text-center"
          >
            <span>¡CREA UN ANUNCIO EN VIVO AHORA!</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- ECOSISTEMA DUAL: B2B VS APP SOCIO (Slide 4 del Deck)               -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section id="ecosistema" class="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0f17]/90 border-t border-[#1e2638]">
      <div class="max-w-7xl mx-auto">
        <div class="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div class="text-xs font-bold uppercase tracking-widest text-[#6d5df1] mb-2">
              Arquitectura en Tiempo Real
            </div>
            <h2 class="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white">
              La App de Tu Socio + La Consola de Tu Equipo
            </h2>
            <p class="mt-3 text-base sm:text-lg text-slate-100 max-w-2xl leading-relaxed font-normal">
              Sincronización instantánea en tiempo real: <strong class="text-[#38bdf8] font-bold">recepción, aforo, torniquetes y la app del socio</strong> conectados al milisegundo bajo una sola base de datos.
            </p>
          </div>

          <div class="flex items-center p-1 rounded-xl bg-[#10141e] border border-[#1e2638]">
            <button
              @click="activeEcosystemTab = 'b2b'"
              :class="[ 'px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2', activeEcosystemTab === 'b2b' ? 'bg-[#6d5df1] hover:bg-[#5b4be2] text-white shadow-md' : 'text-slate-300 hover:text-white' ]"
            >
              Consola Web
            </button>
            <button
              @click="activeEcosystemTab = 'app'"
              :class="[ 'px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2', activeEcosystemTab === 'app' ? 'bg-[#6d5df1] hover:bg-[#5b4be2] text-white shadow-md' : 'text-slate-300 hover:text-white' ]"
            >
              APP iOS & Android
            </button>
          </div>
        </div>

        <!-- B2B Tab Content -->
        <div v-if="activeEcosystemTab === 'b2b'" class="reveal-scale delay-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
          <div class="lg:col-span-5 space-y-6">
            <h3 class="font-display text-2xl sm:text-3xl uppercase tracking-tight">
              <span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent drop-shadow-sm">
                Control Total en Tiempo Real
              </span>
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed">
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
              class="px-6 py-3 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
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
            <h3 class="font-display text-2xl sm:text-3xl uppercase tracking-tight">
              <span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent drop-shadow-sm">
                La App que Tus Socios Amarán Usar
              </span>
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed">
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
              class="px-6 py-3 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
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
          <p class="mt-4 text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed font-normal">
            Descubre cuánto capital adicional genera <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> al <strong class="text-[#c4b5fd] font-bold">salvar socios con IA</strong> y <strong class="text-[#6ee7b7] font-bold">monetizar tu primer inventario de pauta local</strong>.
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
              <div class="flex justify-between text-[11px] text-slate-300 mt-1">
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
              <div class="flex justify-between text-[11px] text-slate-300 mt-1">
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
              <div class="flex justify-between text-[11px] text-slate-300 mt-1">
                <span>1 sede</span>
                <span>10 sedes</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 p-8 rounded-2xl border-2 border-[#6d5df1]/60 bg-gradient-to-b from-[#131823] to-[#07090e] relative overflow-hidden">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Impacto Anual Estimado
            </div>
            <div class="text-3xl sm:text-4xl font-display text-[#6d5df1] mb-6">
              {{ formatCurrency(roiCalculation.totalAnnualBenefit) }}
            </div>

            <div class="space-y-4 pt-4 border-t border-[#1e2638]">
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-300">Socios retenidos al año:</span>
                <span class="font-bold text-white">+{{ roiCalculation.savedMembersYear }} socios</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-300">Ingreso preservado por retención:</span>
                <span class="font-bold text-[#10b981]">{{ formatCurrency(roiCalculation.annualSavedRevenue) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-300">Ganancia por Publicidad Local:</span>
                <span class="font-bold text-[#6d5df1]">{{ formatCurrency(roiCalculation.annualAdsRevenue) }}</span>
              </div>
            </div>

            <button
              @click="openDemoModal"
              class="w-full mt-8 py-3.5 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
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
          <span>El Momento de Activar Tu Audiencia Es Hoy</span>
        </div>

        <h2 class="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Tu Gym Ya Tiene la Audiencia.
          <span class="block bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
            Véndele.
          </span>
        </h2>
        <p class="mt-4 text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed font-normal">
          Tu operación en tiempo real y tu primer inventario publicitario corriendo con datos reales: <strong class="text-[#c4b5fd] font-bold">demostración guiada de 30 minutos</strong> o <strong class="text-[#6ee7b7] font-bold">piloto sin riesgo en una sola sede</strong>.
        </p>

        <!-- Two Action Cards: Opción A y Opción B (Slide 13 del Deck) -->
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <!-- Card Opción A -->
          <div class="p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#0c0f17]/90 hover:border-[#6d5df1]/60 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#6d5df1]/20 text-[#6d5df1] border border-[#6d5df1]/30">
                  Opción A
                </span>
                <span class="text-xs text-slate-300 font-mono">30 Minutos</span>
              </div>
              <h3 class="font-display text-xl uppercase tracking-tight text-white group-hover:text-[#6d5df1] transition-colors mb-2">
                Demo Remota en Vivo
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Recorrido guiado de 30 minutos con tu equipo por la consola B2B y la app móvil. Hacemos la simulación financiera con tus números reales de socios y sedes.
              </p>
              <ul class="space-y-2 mb-6">
                <li class="flex items-center gap-2 text-xs text-[#f8fafc]">
                  <Check class="w-3.5 h-3.5 text-[#6d5df1] shrink-0 stroke-[3]" />
                  <span>Demostración de check-in, aforo e IA en vivo</span>
                </li>
                <li class="flex items-center gap-2 text-xs text-[#f8fafc]">
                  <Check class="w-3.5 h-3.5 text-[#6d5df1] shrink-0 stroke-[3]" />
                  <span>Cálculo personalizado de ingresos por pauta local</span>
                </li>
              </ul>
            </div>
            <button
              @click="openDemoModal('Demo remota en vivo (30 min)')"
              class="w-full py-3.5 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center"
            >
              <span>Agendar Demo de 30 Minutos</span>
            </button>
          </div>

          <!-- Card Opción B -->
          <div class="p-6 sm:p-7 rounded-2xl border border-[#1e2638] bg-[#0c0f17]/90 hover:border-[#1e2638] transition-colors duration-300 flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                  Opción B
                </span>
                <span class="text-xs text-[#10b981] font-semibold">Sin Riesgo</span>
              </div>
              <h3 class="font-display text-xl uppercase tracking-tight text-white group-hover:text-[#10b981] transition-colors mb-2">
                Piloto en Una Sede
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Implementa <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> en una sola de tus sucursales con acompañamiento técnico prioritario. Evalúa la fluidez en torniquetes, la adopción de los socios y tus primeros patrocinios.
              </p>
              <ul class="space-y-2 mb-6">
                <li class="flex items-center gap-2 text-xs text-[#f8fafc]">
                  <Check class="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />
                  <span>Importación asistida sin interrumpir tu operación</span>
                </li>
                <li class="flex items-center gap-2 text-xs text-[#10b981] font-medium">
                  <Check class="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />
                  <span>Publica tus primeros 3 anunciantes locales</span>
                </li>
              </ul>
            </div>
            <button
              @click="openDemoModal('Piloto en una sede')"
              class="w-full py-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-display text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center font-black"
            >
              <span>Solicitar Piloto en Sede</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- FOOTER                                                              -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <footer class="relative z-10 py-10 px-4 sm:px-6 lg:px-8 border-t border-[#1e2638] bg-[#07090e] text-slate-400 text-xs text-center">
      <div class="max-w-7xl mx-auto">
        <p>
          © {{ new Date().getFullYear() }} <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> Inc. Todos los derechos reservados.
        </p>
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
          class="absolute top-5 right-5 text-slate-300 hover:text-white transition-colors cursor-pointer"
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
          <p class="text-sm text-slate-300 max-w-sm mx-auto">
            Gracias por tu interés en <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span>, <strong class="text-white">{{ form.name }}</strong>. Nuestro equipo comercial se comunicará contigo vía WhatsApp / correo para coordinar tu acceso y demostración en vivo.
          </p>
          <button
            @click="closeDemoModal"
            class="mt-4 px-6 py-2.5 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
          >
            Entendido
          </button>
        </div>

        <div v-else>
          <div class="mb-6">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#6d5df1]/10 text-[#6d5df1] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles class="w-3.5 h-3.5" />
              <span>Acceso Preferencial</span>
            </div>
            <h3 class="font-display text-2xl uppercase tracking-tight text-white">
              {{ form.interest === 'Piloto en una sede' ? 'Solicitar Piloto en Sede' : 'Agendar Demo en Vivo' }}
            </h3>
            <p v-if="form.interest === 'Piloto en una sede'" class="text-xs text-slate-300 mt-1">
              Pon a prueba <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> en una sola sede con tu operación y anunciantes reales.
            </p>
            <p v-else class="text-xs text-slate-300 mt-1">
              Conoce la plataforma y descubre cómo <span class="font-display font-black tracking-tight"><span class="text-white">RIR</span><span class="bg-gradient-to-r from-[#6d5df1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">HUB</span></span> activa tu audiencia y reduce el abandono.
            </p>
          </div>

          <form @submit.prevent="submitDemoForm" class="space-y-4">
            <!-- Selector de Modalidad (Slide 13 del Deck) -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Modalidad Seleccionada</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  @click="form.interest = 'Demo remota en vivo (30 min)'"
                  :class="[
                    'py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer',
                    form.interest === 'Demo remota en vivo (30 min)'
                      ? 'border-[#6d5df1] bg-[#6d5df1]/20 text-white shadow-sm'
                      : 'border-[#1e2638] bg-[#07090e] text-slate-300 hover:text-white'
                  ]"
                >
                  Demo Remota (30 min)
                </button>
                <button
                  type="button"
                  @click="form.interest = 'Piloto en una sede'"
                  :class="[
                    'py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer',
                    form.interest === 'Piloto en una sede'
                      ? 'border-[#10b981] bg-[#10b981]/20 text-white shadow-sm'
                      : 'border-[#1e2638] bg-[#07090e] text-slate-300 hover:text-white'
                  ]"
                >
                  Piloto en Sede
                </button>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Tu Nombre Completo</label>
              <input
                v-model="form.name"
                required
                type="text"
                placeholder="Ej. Roberto Salgado"
                class="w-full px-3.5 py-2.5 rounded-xl border border-[#1e2638] bg-[#07090e] text-white text-sm focus:border-[#6d5df1] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Nombre de tu Gimnasio o Cadena</label>
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
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Sedes Actuales</label>
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
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">WhatsApp de Contacto</label>
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
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Correo Electrónico Corporativo</label>
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
              class="w-full mt-2 py-3.5 rounded-xl bg-[#6d5df1] hover:bg-[#5b4be2] text-white font-display text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
            >
              {{ form.interest === 'Piloto en una sede' ? 'Confirmar Solicitud de Piloto' : 'Confirmar Cita para Demostración' }}
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
