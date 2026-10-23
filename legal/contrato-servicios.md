# CONTRATO DE PRESTACIÓN DE SERVICIOS DE PLATAFORMA — RIR-HUB

**BORRADOR — Pendiente de revisión legal. Documento base para la relación RIR-HUB ↔ Gimnasio.**

---

**ENTRE:**

**[RAZÓN SOCIAL DEL PROVEEDOR / LUIS V. ROSALES]** ("RIR-HUB" o "EL PROVEEDOR"), representada por **[NOMBRE]**, RFC **[RFC]**, con domicilio en **[DOMICILIO]**.

**[RAZÓN SOCIAL DEL GIMNASIO]** ("EL CLIENTE" o "EL GIMNASIO"), representada por **[NOMBRE DEL REPRESENTANTE LEGAL]**, RFC **[RFC]**, con domicilio en **[DOMICILIO]**.

Ambas en adelante "LAS PARTES".

---

## DECLARACIONES

I. EL PROVEEDOR declara ser titular de la plataforma tecnológica "RIR-HUB", consistente en: (a) aplicación móvil para socios del gimnasio personalizable con la marca del CLIENTE; (b) consola web de administración y operación ("B2B"); (c) infraestructura de backend, base de datos y notificaciones.

II. EL CLIENTE declara ser [persona moral/física con actividad empresarial] dedicada a la operación de gimnasio(s), con capacidad legal para contratar.

III. LAS PARTES declaran que es su voluntad obligarse conforme a las cláusulas siguientes.

## CLÁUSULAS

### PRIMERA. Objeto

EL PROVEEDOR presta a EL CLIENTE el servicio de acceso y uso de la plataforma RIR-HUB, que incluye:

- App móvil del socio con branding del CLIENTE: check-in por QR, aforo en vivo, reservas de clases, programa de lealtad, cupones, chat de soporte y pago de membresía
- Consola B2B: gestión de socios, sedes, clases, entrenadores, planes, promociones, publicidad de terceros, reportes y notificaciones push
- Módulo de inventario publicitario con métricas (impresiones, toques, CTR) para que EL CLIENTE comercialice espacios dentro de su app
- Soporte y mantenimiento correctivo de la plataforma

### SEGUNDA. Vigencia

Vigencia inicial de **[12] meses** a partir del **[FECHA]**, renovable automáticamente por periodos iguales salvo aviso de no renovación con **[30] días** de anticipación.

### TERCERA. Contraprestación y forma de pago

- Cuota mensual de **$[MONTO] MXN** + IVA, pagadera los primeros [5] días de cada mes
- [OPCIONAL] Cuota única de implementación: $[MONTO] MXN
- [OPCIONAL] Comisión por transacción procesada en la plataforma: [%]
- Moratoria: [X]% mensual sobre saldos vencidos
- EL PROVEEDOR emitirá factura (CFDI) correspondiente

### CUARTA. Implementación y alcance

- EL PROVEEDOR entregará la plataforma configurada en un plazo de [X] semanas: branding del CLIENTE, sedes, planes, usuarios administrativos
- EL CLIENTE proporcionará la información, logotipos, datos fiscales y accesos necesarios
- Desarrollos a la medida no incluidos en la plataforma estándar se cotizarán por separado

### QUINTA. Obligaciones del CLIENTE

- Usar la plataforma conforme a la ley y a estos términos
- Mantener actualizada su información operativa (planes, horarios, sedes)
- Designar al menos un usuario administrador
- Proporcionar a sus socios el aviso de privacidad correspondiente como **responsable** del tratamiento (ver cláusula novena)
- Ser responsable de su política comercial: precios, reembolsos, promociones y contenido publicitario que publique
- Obtener de sus socios los consentimientos necesarios para el tratamiento de datos y, si aplica, para la exhibición de publicidad

### SEXTA. Obligaciones del PROVEEDOR

- Mantener la plataforma operativa con las medidas de seguridad descritas en el Anexo Técnico
- Brindar soporte en horario [DEFINIR], con tiempos de respuesta de [X] horas hábiles
- Notificar cambios relevantes del servicio con anticipación razonable
- Tratar los datos personales conforme a la cláusula novena y al contrato/lineamientos de encargado

### SÉPTIMA. Disponibilidad y limitación de responsabilidad

- La plataforma se ofrece con disponibilidad de "mejor esfuerzo" (mejor esfuerzo / best effort). Metas orientativas: [99]% mensual, excluyendo mantenimiento programado y fallas de terceros (Firebase, Stripe, Vercel, App Store/Play Store)
- EL PROVEEDOR no responde por lucro cesante del CLIENTE ni por decisiones comerciales tomadas con base en métricas de la plataforma
- Responsabilidad máxima acumulada: [3] mensualidades pagadas
- EL CLIENTE es el único responsable de la relación comercial con sus socios (precios, membresías, reembolsos, reglamento interno)

### OCTAVA. Propiedad intelectual

- La plataforma, código, diseños y marca RIR-HUB son propiedad del PROVEEDOR. EL CLIENTE recibe licencia de uso no exclusiva durante la vigencia
- Los datos de socios, la información operativa y la marca del CLIENTE son propiedad del CLIENTE
- Al término, EL PROVEEDOR entregará al CLIENTE un export de sus datos en formato estándar [CSV/JSON] dentro de [30] días

### NOVENA. Tratamiento de datos personales (encargado/responsable)

- EL CLIENTE es **responsable** del tratamiento de los datos personales de sus socios; EL PROVEEDOR actúa como **encargado**
- EL PROVEEDOR tratará los datos únicamente conforme a instrucciones del CLIENTE y para prestar el servicio, sin usarlos para fines propios ni transferirlos salvo a los sub-encargados listados en el Anexo Técnico
- EL PROVEEDOR mantendrá medidas de seguridad administrativas, técnicas y físicas razonables
- En caso de brecha de seguridad que afecte datos de socios, EL PROVEEDOR notificará al CLIENTE sin demora indebida y cooperará en las obligaciones de notificación
- Al término del contrato, EL PROVEEDOR eliminará o devolverá los datos personales, salvo obligación legal de conservación
- Cada parte será responsable de los avisos de privacidad que le correspondan conforme a la LFPDPPP

### DÉCIMA. Confidencialidad

Cada parte mantendrá confidencial la información no pública de la otra durante la vigencia y [2] años posteriores.

### DÉCIMA PRIMERA. Terminación anticipada

Podrán rescindir sin responsabilidad: (a) por incumplimiento no subsanado en [15] días tras requerimiento; (b) por falta de pago de [2] mensualidades. En cualquier terminación se aplicará la entrega de datos de la cláusula octava.

### DÉCIMA SEGUNDA. No exclusividad / [OPCIONAL: exclusividad por zona]

El servicio no es exclusivo. [OPCIONAL: EL PROVEEDOR se obliga a no licenciar la plataforma a gimnasios competidores dentro de un radio de X km durante la vigencia.]

### DÉCIMA TERCERA. Jurisdicción

Tribunales de **[CIUDAD/ENTIDAD — ej. Toluca, Estado de México]**. Leyes de los Estados Unidos Mexicanos.

---

## ANEXO TÉCNICO (resumen de arquitectura y seguridad)

- Infraestructura: Firebase (Google Cloud), Vercel, Stripe
- Autenticación: Google/Apple Sign-In (socios), correo (staff)
- Seguridad: reglas de acceso por rol y sede, cifrado TLS, tokens de sesión
- Sub-encargados de datos: Google LLC (Firebase), Stripe Inc., Vercel Inc., [proveedor SMTP]
- Respaldo/disponibilidad: dependiente de los SLA de los terceros listados

---

## Firmas

**EL PROVEEDOR** — [NOMBRE], firma: _______________

**EL CLIENTE** — [NOMBRE DEL REPRESENTANTE], firma: _______________

Fecha: [FECHA] · Lugar: [CIUDAD]
