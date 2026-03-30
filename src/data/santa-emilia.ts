// ---------------------------------------------------------------------------
// Caso demo: Alimentos Santa Emilia, C.A. — Pedido a Despacho
// Todos los datos pre-cargados (sin DB)
// ---------------------------------------------------------------------------

export const caseData = {
  name: "Alimentos Santa Emilia — Pedido a Despacho",
  companyName: "Alimentos Santa Emilia, C.A.",
  sector: "Alimentos y consumo masivo",
  processFocus: "Pedido a despacho",
  currency: "USD",
  locale: "es-VE",
  metrics: {
    weeklyOrders: 210,
    avgTicketUsd: 480,
    contributionMargin: 0.22,
    otdOtif: 0.62,
    leadTimeDays: 6.8,
    modifiedOrders: 0.16,
    correctedOrders: 0.18,
    financialHold: 0.11,
    reworkPicking: 0.09,
    microOutageHoursMonth: 9,
  },
} as const;

// ---------------------------------------------------------------------------
// Diagnóstico
// ---------------------------------------------------------------------------

export const diagnosticQuestions = [
  { category: "Planificación", questionText: "¿Existe un flujo documentado y actualizado del proceso de pedido a despacho?", score: 3 },
  { category: "Planificación", questionText: "¿Los roles y responsabilidades de cada etapa están claramente definidos?", score: 2 },
  { category: "Planificación", questionText: "¿Se han establecido métricas de desempeño para el proceso?", score: 3 },
  { category: "Ejecución", questionText: "¿Se cumplen los estándares operativos definidos para cada etapa?", score: 2 },
  { category: "Ejecución", questionText: "¿Existe un mecanismo formal para gestionar incidencias en tiempo real?", score: 3 },
  { category: "Ejecución", questionText: "¿La coordinación entre áreas (ventas, almacén, logística) es fluida y oportuna?", score: 2 },
  { category: "Control", questionText: "¿Se utilizan indicadores de seguimiento para monitorear el proceso semanalmente?", score: 3 },
  { category: "Control", questionText: "¿Se realizan auditorías internas periódicas sobre el proceso?", score: 2 },
  { category: "Control", questionText: "¿Existe un mecanismo de retroalimentación del cliente interno y externo?", score: 3 },
  { category: "Mejora", questionText: "¿Hay proyectos de mejora activos relacionados con este proceso?", score: 3 },
  { category: "Mejora", questionText: "¿Existe una cultura organizacional que promueva la mejora continua?", score: 2 },
  { category: "Mejora", questionText: "¿Se utilizan datos y análisis para la toma de decisiones operativas?", score: 3 },
  { category: "Contexto", questionText: "¿Existe un plan de contingencia ante cortes de energía eléctrica?", score: 3 },
  { category: "Contexto", questionText: "¿Se gestiona activamente la reposición de materiales importados críticos?", score: 2 },
  { category: "Contexto", questionText: "¿Hay un plan de contingencia ante fallas de proveedores de transporte?", score: 3 },
];

// ---------------------------------------------------------------------------
// VSM — Pasos del proceso
// ---------------------------------------------------------------------------

export const processSteps = [
  { stepName: "Registro del pedido", department: "Ventas", processTimeMinutes: 12, waitTimeHours: 4, reworkPercentage: 18, systemUsed: "ERP + correo", addsValue: false },
  { stepName: "Validación financiera", department: "Crédito y cobranza", processTimeMinutes: 15, waitTimeHours: 8, reworkPercentage: 11, systemUsed: "ERP + revisión manual", addsValue: false },
  { stepName: "Revisión de inventario", department: "Planificación", processTimeMinutes: 20, waitTimeHours: 10, reworkPercentage: 7, systemUsed: "ERP + Excel", addsValue: false },
  { stepName: "Producción / picking", department: "Planta / almacén", processTimeMinutes: 75, waitTimeHours: 18, reworkPercentage: 9, systemUsed: "Hoja de picking", addsValue: true },
  { stepName: "Facturación", department: "Administración", processTimeMinutes: 18, waitTimeHours: 6, reworkPercentage: 3, systemUsed: "ERP", addsValue: false },
  { stepName: "Despacho", department: "Logística", processTimeMinutes: 12, waitTimeHours: 8, reworkPercentage: 4, systemUsed: "Manual + WhatsApp", addsValue: true },
];

// ---------------------------------------------------------------------------
// Riesgos
// ---------------------------------------------------------------------------

export const risks = [
  { riskDescription: "Pedido con datos incompletos", riskType: "Disciplina comercial", probability: 4, impact: 4 },
  { riskDescription: "Liberación manual por presión", riskType: "Gobierno", probability: 3, impact: 4 },
  { riskDescription: "Quiebre de empaque importado", riskType: "Reposición", probability: 4, impact: 5 },
  { riskDescription: "Microcorte en turno", riskType: "Energía", probability: 3, impact: 5 },
  { riskDescription: "Dependencia de supervisor clave", riskType: "Talento", probability: 4, impact: 4 },
  { riskDescription: "Camión tercerizado llega tarde", riskType: "Proveedor externo", probability: 3, impact: 4 },
];

// ---------------------------------------------------------------------------
// Desperdicio
// ---------------------------------------------------------------------------

export const wasteItems = [
  { problemDescription: "Corrección de pedidos", frequencyPerWeek: 38, minutesLostPerEvent: 25, hourlyLaborCost: 8, unitsAffected: 5, unitMargin: 105.6 },
  { problemDescription: "Pedidos en hold financiero", frequencyPerWeek: 23, minutesLostPerEvent: 45, hourlyLaborCost: 10, unitsAffected: 3, unitMargin: 105.6 },
  { problemDescription: "Re-trabajo de picking", frequencyPerWeek: 19, minutesLostPerEvent: 35, hourlyLaborCost: 7, unitsAffected: 2, unitMargin: 105.6 },
  { problemDescription: "Quiebre de empaque", frequencyPerWeek: 4, minutesLostPerEvent: 120, hourlyLaborCost: 12, unitsAffected: 8, unitMargin: 105.6 },
];

// ---------------------------------------------------------------------------
// Iniciativas
// ---------------------------------------------------------------------------

export const initiatives = [
  { name: "Checklist obligatorio de pedido", impactLeadTime: 4, impactEconomic: 4, impactResilience: 3, feasibility30d: 5, effort: 2, externalDependency: 1 },
  { name: "Ventana diaria de liberación financiera", impactLeadTime: 3, impactEconomic: 3, impactResilience: 3, feasibility30d: 4, effort: 2, externalDependency: 2 },
  { name: "Semáforo de materiales críticos", impactLeadTime: 3, impactEconomic: 4, impactResilience: 5, feasibility30d: 3, effort: 3, externalDependency: 3 },
  { name: "Congelar cambios de prioridad después del corte", impactLeadTime: 4, impactEconomic: 3, impactResilience: 4, feasibility30d: 4, effort: 2, externalDependency: 1 },
  { name: "Back-up del supervisor de picking", impactLeadTime: 2, impactEconomic: 2, impactResilience: 5, feasibility30d: 4, effort: 3, externalDependency: 1 },
];

// ---------------------------------------------------------------------------
// Plan de acción
// ---------------------------------------------------------------------------

export const actionItems = [
  { initiative: "Checklist obligatorio de pedido", actionDescription: "Diseñar e implementar checklist digital de campos obligatorios en el ERP", responsible: "Jefe de Ventas", startDate: "2026-04-01", endDate: "2026-04-15", leadMetric: "% pedidos con datos completos", baselineValue: "82", targetValue: "95", status: "in_progress" as const },
  { initiative: "Ventana diaria de liberación financiera", actionDescription: "Establecer ventana de liberación financiera de 10:00 a 11:00 con SLA de 30 min", responsible: "Gerente de Crédito", startDate: "2026-04-01", endDate: "2026-04-08", leadMetric: "% pedidos liberados en ventana", baselineValue: "0", targetValue: "80", status: "completed" as const },
  { initiative: "Semáforo de materiales críticos", actionDescription: "Crear dashboard de semáforo de materiales importados con alertas a 30, 15 y 7 días", responsible: "Jefe de Planificación", startDate: "2026-04-07", endDate: "2026-04-28", leadMetric: "# quiebres de empaque/mes", baselineValue: "17", targetValue: "5", status: "in_progress" as const },
  { initiative: "Congelar cambios de prioridad", actionDescription: "Definir política de corte: cambios solo hasta las 14:00 del día anterior", responsible: "Gerente de Operaciones", startDate: "2026-04-01", endDate: "2026-04-10", leadMetric: "% pedidos modificados post-corte", baselineValue: "16", targetValue: "5", status: "completed" as const },
  { initiative: "Back-up del supervisor de picking", actionDescription: "Capacitar a dos operarios como back-up con certificación interna", responsible: "Supervisor de Almacén", startDate: "2026-04-07", endDate: "2026-05-05", leadMetric: "# personas certificadas", baselineValue: "0", targetValue: "2", status: "pending" as const },
];

// ---------------------------------------------------------------------------
// Seguimiento semanal
// ---------------------------------------------------------------------------

export const weeklyMetrics = [
  { weekNumber: 1, weekStartDate: "2026-04-06", leadTime: 6.8, otdOtif: 62, pctOrdersCorrected: 18, pctOrdersRescheduled: 16, reworkPicking: 9.0, planProgress: 15 },
  { weekNumber: 2, weekStartDate: "2026-04-13", leadTime: 6.5, otdOtif: 64, pctOrdersCorrected: 15, pctOrdersRescheduled: 14, reworkPicking: 8.5, planProgress: 35 },
  { weekNumber: 3, weekStartDate: "2026-04-20", leadTime: 6.1, otdOtif: 68, pctOrdersCorrected: 12, pctOrdersRescheduled: 11, reworkPicking: 7.8, planProgress: 55 },
  { weekNumber: 4, weekStartDate: "2026-04-27", leadTime: 5.6, otdOtif: 72, pctOrdersCorrected: 9, pctOrdersRescheduled: 8, reworkPicking: 6.5, planProgress: 75 },
];

// ---------------------------------------------------------------------------
// Insights AI pre-generados
// ---------------------------------------------------------------------------

export const aiInsights = {
  diagnostic: {
    summary: "La organización presenta una madurez operativa media (2.53/5), con brechas significativas en mecanismos formales de control y retroalimentación. Se observa una dependencia alta de procesos informales y conocimiento tácito.",
    findings: [
      "Existe documentación del proceso pero no se actualiza regularmente",
      "Los mecanismos de control son reactivos, no preventivos",
      "La coordinación entre áreas depende de comunicación informal (WhatsApp, correo)",
      "Las contingencias contextuales (energía, materiales importados) no tienen planes formales",
    ],
    quickWins: [
      "Implementar checklist digital de registro de pedidos — impacto inmediato en calidad de datos",
      "Definir ventanas de liberación financiera con SLA — reduce esperas sin inversión",
    ],
  },
  vsm: {
    summary: "El proceso de pedido a despacho tiene un lead time de 6.8 días con una eficiencia de flujo del 0.89%. El 97% del tiempo es espera, concentrada en picking (18h) e inventario (10h). El retrabajo promedio del 8.67% amplifica los tiempos.",
    bottlenecks: [
      "Producción/picking: 18 horas de espera + 9% retrabajo — mayor cuello de botella del proceso",
      "Revisión de inventario: 10 horas de espera causadas por verificación manual en Excel",
      "Validación financiera: 8 horas de espera por proceso manual de aprobación",
    ],
  },
  risks: {
    summary: "Se identificaron 6 riesgos contextualizados, con 1 riesgo crítico (quiebre de empaque importado, exposición 20) y 4 riesgos altos. El 83% de los riesgos están en zona alta o crítica.",
    topRisk: "Quiebre de empaque importado — el riesgo más alto combina alta probabilidad de ocurrencia con impacto severo en la operación. Requiere gestión activa de la cadena de suministro importada.",
  },
  waste: {
    summary: "El desperdicio operativo totaliza $13,409 USD/mes, equivalente a $160,908 USD/año. La corrección de pedidos y los holds financieros representan el 58% del costo total.",
    topOpportunity: "Corrección de pedidos ($3,520/mes): atacar la causa raíz con validación en origen eliminaría 38 eventos semanales de retrabajo.",
  },
  report: {
    executiveSummary: "Alimentos Santa Emilia presenta un proceso de pedido a despacho con lead time de 6.8 días, OTD/OTIF del 62% y un costo de desperdicio de $13,409 USD/mes. El análisis identifica oportunidades de mejora por $160,908 USD/año atacando 4 iniciativas prioritarias en un plan de 30 días. Las primeras 4 semanas de implementación muestran una reducción del lead time del 18% (de 6.8 a 5.6 días) y mejora del OTD/OTIF de 62% a 72%.",
  },
} as const;
