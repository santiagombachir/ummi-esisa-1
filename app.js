/**
 * ESISA CONSTRUCTORA - SISTEMA DE COTIZACIÓN Y CATÁLOGO
 * Main Application Logic & Reactive State Management
 */

(function() {
  'use strict';

  // Seed Data Initializer (Fallback if JSON fetch is local)
  const SEED_DATA = {
    capitulos: [
      { clave: "PRE", nombre: "Preliminares y obra civil complementaria" },
      { clave: "EST", nombre: "Estructura metálica y cubierta" },
      { clave: "EMT", nombre: "Eléctrica — media tensión y subestación" },
      { clave: "EBT", nombre: "Eléctrica — baja tensión y canalizaciones" },
      { clave: "ILU", nombre: "Iluminación" },
      { clave: "IHS", nombre: "Instalación hidrosanitaria" },
      { clave: "HVA", nombre: "HVAC y ventilación" },
      { clave: "SES", nombre: "Sistemas especiales y protección" },
      { clave: "PPM", nombre: "Pruebas, puesta en marcha y documentación" }
    ],
    partidas: [
      { clave: "PRE-010", capitulo: "PRE", descripcion: "Trazo y nivelación de terreno con equipo topográfico, incluye estacado y referencias", unidad: "m2", pu: 34.50 },
      { clave: "PRE-020", capitulo: "PRE", descripcion: "Excavación a máquina en material tipo B, incluye afine de taludes y retiro a banco de tiro", unidad: "m3", pu: 268.00 },
      { clave: "PRE-030", capitulo: "PRE", descripcion: "Relleno compactado con material de banco al 95% Proctor, en capas de 20 cm", unidad: "m3", pu: 412.00 },
      { clave: "PRE-040", capitulo: "PRE", descripcion: "Plantilla de concreto f'c=100 kg/cm2, espesor 5 cm, acabado regleado", unidad: "m2", pu: 186.00 },
      { clave: "PRE-050", capitulo: "PRE", descripcion: "Zapata aislada de concreto f'c=250 kg/cm2, incluye acero de refuerzo, cimbra y colado", unidad: "m3", pu: 6480.00 },
      { clave: "PRE-060", capitulo: "PRE", descripcion: "Firme de concreto MR-42, espesor 15 cm, con fibra estructural y acabado pulido", unidad: "m2", pu: 612.00 },
      { clave: "PRE-070", capitulo: "PRE", descripcion: "Registro eléctrico de 60x60x60 cm de tabique, con tapa de concreto armado y marco de ángulo", unidad: "pza", pu: 3850.00 },
      { clave: "PRE-080", capitulo: "PRE", descripcion: "Ranurado y resane en muro de block para alojar canalización oculta", unidad: "ml", pu: 128.00 },

      { clave: "EST-010", capitulo: "EST", descripcion: "Suministro y montaje de estructura metálica a base de armaduras y columnas A-36, incluye placas base y anclas", unidad: "kg", pu: 62.00 },
      { clave: "EST-020", capitulo: "EST", descripcion: "Suministro y colocación de largueros monten galvanizado calibre 12, incluye tornillería", unidad: "ml", pu: 285.00 },
      { clave: "EST-030", capitulo: "EST", descripcion: "Cubierta de lámina galvanizada pintro calibre 26, incluye pijas, sellador y traslapes", unidad: "m2", pu: 468.00 },
      { clave: "EST-040", capitulo: "EST", descripcion: "Lámina translúcida de fibra de vidrio para tragaluz, calibre estructural, incluye sellado", unidad: "m2", pu: 725.00 },
      { clave: "EST-050", capitulo: "EST", descripcion: "Aplicación de primario anticorrosivo y acabado esmalte industrial en estructura, 2 manos", unidad: "m2", pu: 158.00 },

      { clave: "EMT-010", capitulo: "EMT", descripcion: "Subestación compacta tipo pedestal 300 kVA, 13.2 kV / 480-277 V, incluye maniobras de descarga y montaje", unidad: "pza", pu: 486000.00 },
      { clave: "EMT-020", capitulo: "EMT", descripcion: "Transformador tipo poste 75 kVA, 13.2 kV monofásico, incluye herrajes de montaje", unidad: "pza", pu: 92500.00 },
      { clave: "EMT-030", capitulo: "EMT", descripcion: "Cable de media tensión XLP 15 kV, calibre 1/0 AWG, incluye tendido en ducto", unidad: "ml", pu: 612.00 },
      { clave: "EMT-040", capitulo: "EMT", descripcion: "Terminal premoldeada uso interior 15 kV, incluye habilitado y prueba", unidad: "pza", pu: 5480.00 },
      { clave: "EMT-050", capitulo: "EMT", descripcion: "Cortacircuito fusible tipo XS 15 kV con apartarrayos, incluye montaje en poste", unidad: "juego", pu: 18400.00 },

      { clave: "EBT-010", capitulo: "EBT", descripcion: "Tablero de distribución principal 800 A, 480 V, 3F-4H, con interruptor principal y 12 derivados", unidad: "pza", pu: 178000.00 },
      { clave: "EBT-020", capitulo: "EBT", descripcion: "Centro de carga 12 circuitos, 120/240 V, con interruptores termomagnéticos, montaje sobreponer", unidad: "pza", pu: 8950.00 },
      { clave: "EBT-030", capitulo: "EBT", descripcion: "Tubería conduit pared gruesa galvanizada 3/4\", incluye coples, soportería y accesorios", unidad: "ml", pu: 218.00 },
      { clave: "EBT-040", capitulo: "EBT", descripcion: "Tubería conduit pared gruesa galvanizada 2\", incluye coples, soportería y accesorios", unidad: "ml", pu: 486.00 },
      { clave: "EBT-050", capitulo: "EBT", descripcion: "Charola portacable tipo escalera 30 cm, galvanizada en caliente, incluye soportería y curvas", unidad: "ml", pu: 1240.00 },
      { clave: "EBT-060", capitulo: "EBT", descripcion: "Cable THHW-LS calibre 12 AWG, incluye guiado, identificación y conexión", unidad: "ml", pu: 42.00 },
      { clave: "EBT-070", capitulo: "EBT", descripcion: "Cable THHW-LS calibre 4/0 AWG, incluye guiado, identificación y conexión", unidad: "ml", pu: 386.00 },
      { clave: "EBT-080", capitulo: "EBT", descripcion: "Salida para contacto dúplex polarizado 20 A, incluye caja, placa, cableado y canalización", unidad: "salida", pu: 1180.00 },

      { clave: "ILU-010", capitulo: "ILU", descripcion: "Luminaria LED tipo high bay 150 W, 5000 K, IP65, incluye suspensión y conexión", unidad: "pza", pu: 4280.00 },
      { clave: "ILU-020", capitulo: "ILU", descripcion: "Luminaria LED lineal 40 W para oficinas, empotrada en plafón, incluye conexión", unidad: "pza", pu: 1650.00 },
      { clave: "ILU-030", capitulo: "ILU", descripcion: "Reflector LED 200 W para exterior, con brazo de montaje y ajuste de ángulo", unidad: "pza", pu: 5940.00 },
      { clave: "ILU-040", capitulo: "ILU", descripcion: "Luminaria de emergencia autónoma con batería de respaldo 90 min, incluye prueba", unidad: "pza", pu: 2380.00 },

      { clave: "IHS-010", capitulo: "IHS", descripcion: "Tubería de cobre tipo M 1/2\" para agua fría, incluye conexiones soldadas y soportería", unidad: "ml", pu: 268.00 },
      { clave: "IHS-020", capitulo: "IHS", descripcion: "Tubería PVC hidráulica RD-26 de 2\", incluye conexiones cementadas y soportería", unidad: "ml", pu: 224.00 },
      { clave: "IHS-030", capitulo: "IHS", descripcion: "Tubería PVC sanitaria de 4\", incluye conexiones, pendientes y soportería", unidad: "ml", pu: 312.00 },
      { clave: "IHS-060", capitulo: "IHS", descripcion: "Cisterna de concreto armado de 20 m3, incluye impermeabilización y tapa de registro", unidad: "pza", pu: 186000.00 },
      { clave: "IHS-070", capitulo: "IHS", descripcion: "Equipo hidroneumático de 2 bombas de 3 HP con tanque precargado y control automático", unidad: "equipo", pu: 94500.00 },

      { clave: "HVA-010", capitulo: "HVA", descripcion: "Ducto de lámina galvanizada calibre 24, rectangular, incluye refuerzos, colgantes y sellado", unidad: "m2", pu: 1180.00 },
      { clave: "HVA-020", capitulo: "HVA", descripcion: "Aislamiento térmico de ducto con fibra de vidrio 1-1/2\" y forro de aluminio", unidad: "m2", pu: 412.00 },
      { clave: "HVA-030", capitulo: "HVA", descripcion: "Difusor de techo de 4 vías con cuello y damper de regulación, incluye montaje", unidad: "pza", pu: 3240.00 },
      { clave: "HVA-050", capitulo: "HVA", descripcion: "Unidad paquete de aire acondicionado 10 TR, incluye base, conexión eléctrica y arranque", unidad: "equipo", pu: 248000.00 },
      { clave: "HVA-060", capitulo: "HVA", descripcion: "Minisplit inverter 2 TR, incluye interconexión, soportería y carga de refrigerante", unidad: "equipo", pu: 32800.00 },

      { clave: "SES-010", capitulo: "SES", descripcion: "Red de tierra física con varilla copperweld 5/8\" y cable desnudo 2/0, incluye soldadura exotérmica", unidad: "ml", pu: 486.00 },
      { clave: "SES-020", capitulo: "SES", descripcion: "Pozo de tierra con registro de inspección, incluye electrodo y tratamiento del terreno", unidad: "pza", pu: 12400.00 },
      { clave: "SES-040", capitulo: "SES", descripcion: "Panel de detección de incendio direccionable 2 lazos, incluye programación", unidad: "pza", pu: 86000.00 },

      { clave: "PPM-010", capitulo: "PPM", descripcion: "Pruebas de resistencia de aislamiento y continuidad en instalación eléctrica, con reporte", unidad: "lote", pu: 38000.00 },
      { clave: "PPM-040", capitulo: "PPM", descripcion: "Elaboración de planos as-built de instalaciones, en formato digital editable e impreso", unidad: "lote", pu: 56000.00 },
      { clave: "PPM-050", capitulo: "PPM", descripcion: "Dictamen de unidad verificadora de instalaciones eléctricas (UVIE) conforme NOM-001-SEDE", unidad: "lote", pu: 94000.00 }
    ],
    cotizaciones_historicas: [
      {
        folio: "COT-2026-0184",
        cliente: "Grupo Logístico del Norte",
        obra: "Nave de distribución — Parque Industrial Las Torres",
        fecha: "2026-06-18",
        vigencia_dias: 30,
        monto: 8942600.00,
        estatus: "Enviada",
        indirectos_pct: 12,
        utilidad_pct: 15,
        items: [
          { clave: "PRE-010", cantidad: 4500, pu: 34.50 },
          { clave: "PRE-050", cantidad: 35, pu: 6480.00 },
          { clave: "PRE-060", cantidad: 3800, pu: 612.00 },
          { clave: "EST-010", cantidad: 42000, pu: 62.00 },
          { clave: "EST-030", cantidad: 4500, pu: 468.00 },
          { clave: "EMT-010", cantidad: 1, pu: 486000.00 },
          { clave: "EBT-010", cantidad: 1, pu: 178000.00 },
          { clave: "EBT-050", cantidad: 240, pu: 1240.00 },
          { clave: "EBT-070", cantidad: 850, pu: 386.00 },
          { clave: "ILU-010", cantidad: 120, pu: 4280.00 },
          { clave: "IHS-060", cantidad: 1, pu: 186000.00 },
          { clave: "HVA-050", cantidad: 4, pu: 248000.00 },
          { clave: "PPM-050", cantidad: 1, pu: 94000.00 }
        ]
      },
      {
        folio: "COT-2026-0179",
        cliente: "Alimentos Sierra Alta",
        obra: "Ampliación de cuarto frío y subestación",
        fecha: "2026-06-04",
        vigencia_dias: 30,
        monto: 4318400.00,
        estatus: "Ganada",
        indirectos_pct: 10,
        utilidad_pct: 14,
        items: [
          { clave: "EMT-010", cantidad: 1, pu: 486000.00 },
          { clave: "EBT-010", cantidad: 1, pu: 178000.00 },
          { clave: "HVA-050", cantidad: 2, pu: 248000.00 },
          { clave: "PPM-010", cantidad: 1, pu: 38000.00 }
        ]
      },
      {
        folio: "COT-2026-0171",
        cliente: "Autopartes Delta Manufacturing",
        obra: "Instalación eléctrica planta 2 — línea de ensamble",
        fecha: "2026-05-21",
        vigencia_dias: 45,
        monto: 6187900.00,
        estatus: "Ganada",
        indirectos_pct: 11,
        utilidad_pct: 16,
        items: [
          { clave: "EMT-010", cantidad: 1, pu: 486000.00 },
          { clave: "EBT-010", cantidad: 2, pu: 178000.00 },
          { clave: "EBT-050", cantidad: 500, pu: 1240.00 },
          { clave: "ILU-010", cantidad: 80, pu: 4280.00 }
        ]
      },
      {
        folio: "COT-2026-0165",
        cliente: "Inmobiliaria Punto Norte",
        obra: "Instalaciones edificio corporativo — 4 niveles",
        fecha: "2026-05-09",
        vigencia_dias: 30,
        monto: 3746200.00,
        estatus: "Perdida",
        indirectos_pct: 12,
        utilidad_pct: 12,
        items: []
      },
      {
        folio: "COT-2026-0158",
        cliente: "Grupo Logístico del Norte",
        obra: "HVAC y ventilación — bodega refrigerada",
        fecha: "2026-04-27",
        vigencia_dias: 30,
        monto: 2914800.00,
        estatus: "Ganada",
        indirectos_pct: 10,
        utilidad_pct: 15,
        items: []
      },
      {
        folio: "COT-2026-0146",
        cliente: "Constructora Peninsular",
        obra: "Subcontrato de instalaciones — nave textil",
        fecha: "2026-04-02",
        vigencia_dias: 30,
        monto: 5629300.00,
        estatus: "Perdida",
        indirectos_pct: 12,
        utilidad_pct: 14,
        items: []
      }
    ],
    bitacora_catalogo: [
      {
        fecha: "2026-09-08 11:24",
        clave: "ILU-010",
        descripcion: "Luminaria LED tipo high bay 150 W",
        usuario: "Ing. Santiago M.",
        pu_anterior: 3950.00,
        pu_nuevo: 4280.00,
        origen: "COT-2026-0184",
        alcance: "Actualización global de catálogo"
      },
      {
        fecha: "2026-09-01 16:45",
        clave: "EMT-010",
        descripcion: "Subestación compacta tipo pedestal 300 kVA",
        usuario: "Ing. Carlos R.",
        pu_anterior: 460000.00,
        pu_nuevo: 486000.00,
        origen: "COT-2026-0179",
        alcance: "Actualización global de catálogo"
      },
      {
        fecha: "2026-08-19 09:30",
        clave: "EST-010",
        descripcion: "Suministro y montaje de estructura metálica A-36",
        usuario: "Ing. Santiago M.",
        pu_anterior: 58.00,
        pu_nuevo: 62.00,
        origen: "Edición Directa Catálogo",
        alcance: "Actualización global de catálogo"
      }
    ]
  };

  // Gray Modules Info Content
  const GRAY_MODULES = {
    "projects": {
      title: "Proyectos y Plan de Trabajo",
      phase: "Fase 1 · Próximo despliegue",
      desc: "Gestión de cronogramas, diagrama de Gantt por especialidad, asignación de cuadrillas y seguimiento de hitos de entrega para obras contratadas.",
      reqs: [
        "Normalización previa del catálogo de conceptos",
        "Integración con catálogo de rendimientos de mano de obra",
        "Matriz de asignación de supervisores de campo"
      ]
    },
    "materials": {
      title: "Control de Material por Obra",
      phase: "Fase 2 · En diseño",
      desc: "Requisición de insumos contra explosión de insumos de la cotización ganada, control de vales de almacén y comparativo de consumo teórico vs. real.",
      reqs: [
        "Módulo de Cotizaciones operando como fuente de insumos",
        "Catálogo de proveedores homologados",
        "Workflow de autorización de compras por montos"
      ]
    },
    "progress": {
      title: "Reportes de Avance Físico y Financiero",
      phase: "Fase 3 · Planeado",
      desc: "Generación de estimaciones de cobro para el cliente, curado de evidencias fotográficas por partida y tablero de avance financiero en tiempo real.",
      reqs: [
        "Cierre diario de avance por residente de obra",
        "Integración con plan de trabajo (Gantt)",
        "Validación de firmas digitales de supervisión"
      ]
    },
    "closure": {
      title: "Cierre y Expediente de Obra",
      phase: "Fase 3 · Planeado",
      desc: "Consolidación de planos As-Built, pruebas protocolizadas (UVIE, hidrostáticas), garantias de equipos y memoria técnica final para entrega recepción.",
      reqs: [
        "Certificados de calidad de insumos desde recepción en almacén",
        "Formato digital estandarizado de protocolos de prueba",
        "Checklist de entregables contractuales por especialidad"
      ]
    }
  };

  // State Singleton
  class ApplicationState {
    constructor() {
      this.currentView = 'hub';
      this.catalog = JSON.parse(localStorage.getItem('esisa_catalog')) || SEED_DATA.partidas;
      this.chapters = SEED_DATA.capitulos;
      this.quotes = JSON.parse(localStorage.getItem('esisa_quotes')) || SEED_DATA.cotizaciones_historicas;
      this.auditLog = JSON.parse(localStorage.getItem('esisa_audit')) || SEED_DATA.bitacora_catalogo;

      // Default active quote being edited
      this.activeQuote = this.quotes[0] || null;
      this.tempPriceChange = null; // Stores pending price change for scope modal
      this.collapsedChapters = {}; // Keeps track of collapsed chapters in editor
      this.animatedValues = {}; // For number interpolations
    }

    save() {
      localStorage.setItem('esisa_catalog', JSON.stringify(this.catalog));
      localStorage.setItem('esisa_quotes', JSON.stringify(this.quotes));
      localStorage.setItem('esisa_audit', JSON.stringify(this.auditLog));
    }
  }

  const appState = new ApplicationState();

  // Utility Functions
  function formatCurrency(num) {
    if (isNaN(num) || num === null) return '$0.00';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }

  function formatNumber(num) {
    if (isNaN(num) || num === null) return '0.00';
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }

  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('active');
      setTimeout(() => toast.classList.remove('active'), 3200);
    }
  }

  function openModal(id) {
    const backdrop = document.getElementById('modalBackdrop');
    const modal = document.getElementById(id);
    if (backdrop && modal) {
      backdrop.classList.add('active');
      modal.classList.add('active');
    }
  }

  function closeModal(id) {
    const backdrop = document.getElementById('modalBackdrop');
    const modal = document.getElementById(id);
    if (backdrop && modal) {
      backdrop.classList.remove('active');
      modal.classList.remove('active');
    }
  }

  // Number Interpolation Engine using requestAnimationFrame
  function animateValue(elementId, startVal, endVal, duration = 300, isCurrency = true) {
    const elem = document.getElementById(elementId);
    if (!elem) return;

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = startVal + (endVal - startVal) * easeProgress;

      elem.textContent = isCurrency ? formatCurrency(currentVal) : formatNumber(currentVal);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        elem.textContent = isCurrency ? formatCurrency(endVal) : formatNumber(endVal);
      }
    }

    requestAnimationFrame(update);
  }

  // Main App Controller
  const AppController = {
    init() {
      this.renderCurrentView();
      this.setupEventListeners();
    },

    setupEventListeners() {
      document.getElementById('brandHomeBtn').addEventListener('click', () => this.navigateTo('hub'));
    },

    navigateTo(viewName, params = {}) {
      appState.currentView = viewName;

      // Update Nav active classes
      document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
      if (viewName === 'hub') document.getElementById('navHubBtn')?.classList.add('active');
      if (viewName === 'quotes') document.getElementById('navQuotesBtn')?.classList.add('active');
      if (viewName === 'catalog') document.getElementById('navCatalogBtn')?.classList.add('active');

      if (params.quoteFolio) {
        const found = appState.quotes.find(q => q.folio === params.quoteFolio);
        if (found) appState.activeQuote = found;
      }

      this.renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderCurrentView() {
      const main = document.getElementById('appMain');
      if (!main) return;

      switch (appState.currentView) {
        case 'hub':
          main.innerHTML = this.renderHubView();
          break;
        case 'quotes':
          main.innerHTML = this.renderQuotesHistoryView();
          break;
        case 'editor':
          main.innerHTML = this.renderQuoteEditorView();
          this.recalculateEditorTotals(false);
          break;
        case 'catalog':
          main.innerHTML = this.renderCatalogView();
          break;
        case 'preview':
          main.innerHTML = this.renderDocumentPreviewView();
          break;
        default:
          main.innerHTML = this.renderHubView();
      }
    },

    /* ==========================================================================
       VIEW RENDERERS
       ========================================================================== */

    renderHubView() {
      // Metrics calculation for Hub
      const totalQuotes = appState.quotes.length;
      const monthTotal = appState.quotes.reduce((acc, q) => acc + q.monto, 0);
      const pendingCount = appState.quotes.filter(q => q.estatus === 'Enviada').length;
      const wonCount = appState.quotes.filter(q => q.estatus === 'Ganada').length;
      const conversionRate = totalQuotes > 0 ? Math.round((wonCount / totalQuotes) * 100) : 0;
      const catalogCount = appState.catalog.length;
      const chaptersCount = appState.chapters.length;

      return `
        <div class="hub-view">
          <div class="view-header">
            <div>
              <h1>Hub del Sistema ESISA</h1>
              <p>Tablero de control de cotizaciones e infraestructura de módulos de obra</p>
            </div>
          </div>

          <div class="hub-grid">
            <!-- Module 1: Cotizaciones (Vivo con datos) -->
            <div class="hub-card hub-card-active-primary" onclick="app.navigateTo('quotes')">
              <div class="hub-card-top">
                <div class="hub-card-title-group">
                  <div class="hub-card-icon hub-icon-vinotinto">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                  </div>
                  <div>
                    <h3>Presupuestos y Cotizaciones</h3>
                    <p>Módulo activo · Fase 2</p>
                  </div>
                </div>
                <span class="badge badge-green">En operación</span>
              </div>

              <div class="hub-metrics-row">
                <div class="metric-item">
                  <span class="metric-label">Cotizado del Mes</span>
                  <span class="metric-value cobre">${formatCurrency(monthTotal)}</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Pendientes por Resolver</span>
                  <span class="metric-value">${pendingCount} obras</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Por Vencer (&lt;10 días)</span>
                  <span class="metric-value">2 concursos</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Tasa de Conversión</span>
                  <span class="metric-value">${conversionRate}%</span>
                </div>
              </div>
            </div>

            <!-- Module 2: Catálogo (Vivo, Acceso Directo) -->
            <div class="hub-card hub-card-active-secondary" onclick="app.navigateTo('catalog')">
              <div class="hub-card-top">
                <div class="hub-card-title-group">
                  <div class="hub-card-icon hub-icon-slate">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M21 19c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                  </div>
                  <div>
                    <h3>Catálogo y Datos Maestros</h3>
                    <p>Módulo activo · Acceso directo</p>
                  </div>
                </div>
                <span class="badge badge-slate">Base maestra</span>
              </div>

              <div class="catalog-tile-info">
                <div>
                  <div class="catalog-tile-count">${catalogCount} partidas</div>
                  <div class="catalog-tile-sub">Distribuidas en ${chaptersCount} capítulos de especialidad</div>
                </div>
                <div style="text-align: right;">
                  <span class="badge badge-gray">Última ed. hoy</span>
                </div>
              </div>
            </div>

            <!-- Gray Module 3: Proyectos -->
            <div class="hub-card hub-card-gray" onclick="app.openGrayModuleModal('projects')">
              <div class="hub-card-top">
                <div class="hub-card-title-group">
                  <div class="hub-card-icon hub-icon-gray">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div>
                    <h3>Proyectos y Plan de Trabajo</h3>
                    <p>Programación y cuadrillas de obra</p>
                  </div>
                </div>
                <span class="badge badge-gray">Fase 1</span>
              </div>
              <div class="gray-skeleton">
                <div class="skeleton-bar w-75"></div>
                <div class="skeleton-bar w-50"></div>
              </div>
            </div>

            <!-- Gray Module 4: Materiales -->
            <div class="hub-card hub-card-gray" onclick="app.openGrayModuleModal('materials')">
              <div class="hub-card-top">
                <div class="hub-card-title-group">
                  <div class="hub-card-icon hub-icon-gray">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                  <div>
                    <h3>Control de Material por Obra</h3>
                    <p>Explosión de insumos y vales</p>
                  </div>
                </div>
                <span class="badge badge-gray">Fase 2</span>
              </div>
              <div class="gray-skeleton">
                <div class="skeleton-bar w-75"></div>
                <div class="skeleton-bar w-50"></div>
              </div>
            </div>

            <!-- Gray Module 5: Avances -->
            <div class="hub-card hub-card-gray" onclick="app.openGrayModuleModal('progress')">
              <div class="hub-card-top">
                <div class="hub-card-title-group">
                  <div class="hub-card-icon hub-icon-gray">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  </div>
                  <div>
                    <h3>Reportes de Avance Físico</h3>
                    <p>Estimaciones y evidencias</p>
                  </div>
                </div>
                <span class="badge badge-gray">Fase 3</span>
              </div>
              <div class="gray-skeleton">
                <div class="skeleton-bar w-75"></div>
                <div class="skeleton-bar w-50"></div>
              </div>
            </div>

            <!-- Gray Module 6: Cierre -->
            <div class="hub-card hub-card-gray" onclick="app.openGrayModuleModal('closure')">
              <div class="hub-card-top">
                <div class="hub-card-title-group">
                  <div class="hub-card-icon hub-icon-gray">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><polyline points="9 14 11 16 15 11"></polyline></svg>
                  </div>
                  <div>
                    <h3>Cierre y Expediente</h3>
                    <p>Planos As-Built y pruebas</p>
                  </div>
                </div>
                <span class="badge badge-gray">Fase 3</span>
              </div>
              <div class="gray-skeleton">
                <div class="skeleton-bar w-75"></div>
                <div class="skeleton-bar w-50"></div>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    renderQuotesHistoryView() {
      const rowsHtml = appState.quotes.map(q => {
        let badgeClass = 'badge-gray';
        if (q.estatus === 'Ganada') badgeClass = 'badge-green';
        if (q.estatus === 'Enviada') badgeClass = 'badge-slate';

        return `
          <tr>
            <td class="cell-mono" style="font-weight:700; color:var(--color-vinotinto);">${q.folio}</td>
            <td><strong>${q.cliente}</strong></td>
            <td>${q.obra}</td>
            <td class="cell-mono">${q.fecha}</td>
            <td class="cell-mono">${q.vigencia_dias} días</td>
            <td class="cell-mono cell-right" style="font-weight:700;">${formatCurrency(q.monto)}</td>
            <td><span class="badge ${badgeClass}">${q.estatus}</span></td>
            <td class="cell-actions">
              <div class="row-actions">
                <button class="btn btn-secondary btn-sm" onclick="app.openQuoteEditor('${q.folio}')" title="Abrir editor">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  Editar
                </button>
                <button class="btn btn-secondary btn-sm" onclick="app.duplicateQuote('${q.folio}')" title="Duplicar cotización">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Duplicar
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="quotes-view">
          <div class="view-header" style="margin-bottom: 20px;">
            <div>
              <h1>Histórico de Cotizaciones y Concursos</h1>
              <p>Registro completo de propuestas comerciales de ESISA Constructora</p>
            </div>
            <button class="btn btn-primary" onclick="app.openNewQuoteModal()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Nueva Cotización
            </button>
          </div>

          <div class="table-container">
            <div class="table-toolbar">
              <div class="toolbar-filters">
                <div class="search-input-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <input type="text" id="quoteSearchInput" placeholder="Buscar por cliente, obra o folio..." oninput="app.filterQuotesTable()">
                </div>
                <select id="quoteStatusFilter" onchange="app.filterQuotesTable()" style="width: 160px;">
                  <option value="">Todos los estatus</option>
                  <option value="Enviada">Enviada</option>
                  <option value="Ganada">Ganada</option>
                  <option value="Perdida">Perdida</option>
                </select>
              </div>
              <span class="badge badge-slate" id="quoteCountBadge">${appState.quotes.length} cotizaciones registrados</span>
            </div>

            <table class="data-table" id="quotesTable">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Cliente</th>
                  <th>Obra / Concurso</th>
                  <th>Fecha</th>
                  <th>Vigencia</th>
                  <th style="text-align:right;">Monto Total</th>
                  <th>Estatus</th>
                  <th style="text-align:right;">Acciones</th>
                </tr>
              </thead>
              <tbody id="quotesTableBody">
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    renderQuoteEditorView() {
      const q = appState.activeQuote;
      if (!q) return '<div class="editor-layout"><p>No hay cotización activa seleccionada.</p></div>';

      // Group quote items by chapter
      const groupedItems = {};
      appState.chapters.forEach(ch => {
        groupedItems[ch.clave] = [];
      });

      // Ensure items match catalog or existing state
      (q.items || []).forEach(item => {
        const catItem = appState.catalog.find(c => c.clave === item.clave) || {};
        const cap = catItem.capitulo || (item.clave ? item.clave.split('-')[0] : 'PRE');
        if (!groupedItems[cap]) groupedItems[cap] = [];
        groupedItems[cap].push({
          ...catItem,
          ...item
        });
      });

      const chaptersHtml = appState.chapters.map(ch => {
        const items = groupedItems[ch.clave] || [];
        const isCollapsed = appState.collapsedChapters[ch.clave];
        const chapterSubtotal = items.reduce((acc, it) => acc + (it.cantidad * it.pu), 0);

        const rowsHtml = items.map((it, idx) => {
          const itemImporte = it.cantidad * it.pu;
          const isAdjusted = it.isAdjusted;

          return `
            <tr>
              <td class="cell-mono" style="font-weight:600; color:var(--color-slate);">${it.clave}</td>
              <td>
                <div>${it.descripcion}</div>
                ${isAdjusted ? `
                  <span class="price-adjusted-tag" onclick="app.showAuditHistory('${it.clave}')">
                    <span class="dot-indicator dot-cobre"></span> ajustado (ver auditoría)
                  </span>
                ` : ''}
              </td>
              <td style="color:var(--color-text-muted);">${it.unidad}</td>
              <td class="cell-right">
                <input type="number" class="input-qty" value="${it.cantidad}" min="0" step="any" onchange="app.updateItemQty('${ch.clave}', ${idx}, this.value)">
              </td>
              <td class="cell-right">
                <input type="number" class="input-pu" value="${it.pu}" min="0" step="0.01" onchange="app.handleItemPriceEdit('${ch.clave}', ${idx}, ${it.pu}, this.value)">
              </td>
              <td class="cell-mono cell-right" style="font-weight:700;">${formatCurrency(itemImporte)}</td>
              <td class="cell-actions">
                <button class="icon-btn" onclick="app.removeItemFromQuote('${ch.clave}', ${idx})" title="Eliminar partida">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </td>
            </tr>
          `;
        }).join('');

        return `
          <div class="chapter-block">
            <div class="chapter-header" onclick="app.toggleChapterCollapse('${ch.clave}')">
              <div class="chapter-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: ${isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)'}; transition: transform 200ms;"><polyline points="6 9 12 15 18 9"></polyline></svg>
                <span>CAPÍTULO ${ch.clave} — ${ch.nombre}</span>
                <span class="badge badge-gray">${items.length} partidas</span>
              </div>
              <div class="chapter-subtotal">
                Subtotal: ${formatCurrency(chapterSubtotal)}
              </div>
            </div>

            ${!isCollapsed ? `
              <table class="data-table chapter-table">
                <thead>
                  <tr>
                    <th style="width:100px;">Clave</th>
                    <th>Descripción de la Partida</th>
                    <th style="width:70px;">Unidad</th>
                    <th style="width:90px; text-align:right;">Cantidad</th>
                    <th style="width:130px; text-align:right;">P. Unitario</th>
                    <th style="width:140px; text-align:right;">Importe</th>
                    <th style="width:50px; text-align:right;"></th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml.length > 0 ? rowsHtml : `<tr><td colspan="7" style="text-align:center; color:var(--color-text-subdued); padding:16px;">No hay partidas agregadas en este capítulo.</td></tr>`}
                </tbody>
              </table>
              <div class="chapter-footer">
                <button class="btn btn-secondary btn-sm" onclick="app.openDrawerForChapter('${ch.clave}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Agregar Partida a ${ch.clave}
                </button>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');

      return `
        <div class="editor-layout">
          <!-- Editor Top Card -->
          <div class="editor-header-card">
            <div class="editor-header-top">
              <div style="display:flex; align-items:center; gap:12px;">
                <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('quotes')">&larr; Regresar al Histórico</button>
                <span class="editor-folio-badge">${q.folio}</span>
                <span class="badge badge-green">${q.estatus}</span>
              </div>
              <div style="display:flex; gap:10px;">
                <button class="btn btn-secondary" onclick="app.navigateTo('preview')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  Vista Previa Documento
                </button>
                <button class="btn btn-primary" onclick="app.saveActiveQuote()">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                  Guardar Cotización
                </button>
              </div>
            </div>

            <div class="quote-meta-grid">
              <div class="meta-field">
                <label>Cliente</label>
                <input type="text" value="${q.cliente}" onchange="appState.activeQuote.cliente = this.value">
              </div>
              <div class="meta-field">
                <label>Nombre de la Obra</label>
                <input type="text" value="${q.obra}" onchange="appState.activeQuote.obra = this.value">
              </div>
              <div class="meta-field">
                <label>Fecha de Emisión</label>
                <input type="date" value="${q.fecha}" onchange="appState.activeQuote.fecha = this.value">
              </div>
              <div class="meta-field">
                <label>Vigencia (Días)</label>
                <input type="number" value="${q.vigencia_dias}" onchange="appState.activeQuote.vigencia_dias = parseInt(this.value)">
              </div>
            </div>
          </div>

          <!-- Chapters & Items List -->
          <div class="editor-chapters-container">
            ${chaptersHtml}
          </div>

          <!-- FIXED FOOTER TOTALS BAR -->
          <div class="fixed-totals-bar">
            <div class="totals-bar-container">
              <div class="totals-breakdown">
                <div class="total-item">
                  <span class="total-label">Subtotal Partidas</span>
                  <span class="total-value" id="totSubtotalPartidas">$0.00</span>
                </div>

                <div class="total-item">
                  <span class="total-label">Indirectos</span>
                  <div class="total-input-group">
                    <input type="number" id="inputIndirectosPct" value="${q.indirectos_pct || 12}" min="0" max="50" oninput="app.onIndirectosChange(this.value)">
                    <span style="font-size:11px;">%</span>
                    <input type="range" min="0" max="30" value="${q.indirectos_pct || 12}" oninput="app.onIndirectosChange(this.value)">
                  </div>
                  <span class="total-value" id="totIndirectosMonto" style="font-size:12px; opacity:0.8;">$0.00</span>
                </div>

                <div class="total-item">
                  <span class="total-label">Utilidad</span>
                  <div class="total-input-group">
                    <input type="number" id="inputUtilidadPct" value="${q.utilidad_pct || 15}" min="0" max="50" oninput="app.onUtilidadChange(this.value)">
                    <span style="font-size:11px;">%</span>
                    <input type="range" min="0" max="40" value="${q.utilidad_pct || 15}" oninput="app.onUtilidadChange(this.value)">
                  </div>
                  <span class="utility-pesos" id="totUtilidadMonto">$0.00</span>
                </div>

                <div class="total-item">
                  <span class="total-label">Subtotal sin IVA</span>
                  <span class="total-value" id="totSubtotalConGastos">$0.00</span>
                </div>

                <div class="total-item">
                  <span class="total-label">IVA (16%)</span>
                  <span class="total-value" id="totIvaMonto">$0.00</span>
                </div>
              </div>

              <div class="grand-total-block">
                <span class="grand-total-label">TOTAL COTIZACIÓN</span>
                <span class="grand-total-amount" id="totGrandTotal">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    renderCatalogView() {
      const rowsHtml = appState.catalog.map(cat => {
        const cap = appState.chapters.find(c => c.clave === cat.capitulo);
        const capName = cap ? cap.nombre : cat.capitulo;

        return `
          <tr>
            <td class="cell-mono" style="font-weight:700; color:var(--color-slate);">${cat.clave}</td>
            <td><span class="badge badge-slate">${cat.capitulo}</span> ${capName}</td>
            <td>${cat.descripcion}</td>
            <td style="color:var(--color-text-muted);">${cat.unidad}</td>
            <td class="cell-mono cell-right" style="font-weight:700;">
              <input type="number" class="input-pu" value="${cat.pu}" step="0.01" onchange="app.editCatalogItemDirectPrice('${cat.clave}', this.value)">
            </td>
          </tr>
        `;
      }).join('');

      const auditRowsHtml = appState.auditLog.map(log => `
        <tr>
          <td class="cell-mono">${log.fecha}</td>
          <td class="cell-mono" style="font-weight:700;">${log.clave}</td>
          <td>${log.descripcion}</td>
          <td><strong>${log.usuario}</strong></td>
          <td class="cell-mono cell-right">${formatCurrency(log.pu_anterior)}</td>
          <td class="cell-mono cell-right" style="color:var(--color-cobre); font-weight:700;">${formatCurrency(log.pu_nuevo)}</td>
          <td><span class="badge badge-slate">${log.origen}</span></td>
        </tr>
      `).join('');

      return `
        <div class="catalog-view">
          <div class="view-header" style="margin-bottom:16px;">
            <div>
              <h1>Catálogo Maestro y Datos de Referencia</h1>
              <p>Base de precios unitarios homologada para instalaciones y obra industrial</p>
            </div>
            <button class="btn btn-primary" onclick="app.openNewItemModal()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Nueva Partida de Catálogo
            </button>
          </div>

          <div class="catalog-tabs">
            <button class="tab-item active" id="tabItemsBtn" onclick="app.switchCatalogTab('items')">Partidas del Catálogo (${appState.catalog.length})</button>
            <button class="tab-item" id="tabAuditBtn" onclick="app.switchCatalogTab('audit')">Bitácora de Cambios (${appState.auditLog.length})</button>
          </div>

          <!-- Tab Content 1: Items Table -->
          <div id="catalogTabItems" class="table-container">
            <div class="table-toolbar">
              <div class="toolbar-filters">
                <div class="search-input-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <input type="text" id="catalogSearchInput" placeholder="Buscar por clave o descripción..." oninput="app.filterCatalogTable()">
                </div>
                <select id="catalogChapterFilter" onchange="app.filterCatalogTable()" style="width: 220px;">
                  <option value="">Todos los capítulos</option>
                  ${appState.chapters.map(c => `<option value="${c.clave}">${c.clave} — ${c.nombre}</option>`).join('')}
                </select>
              </div>
            </div>

            <table class="data-table" id="catalogTable">
              <thead>
                <tr>
                  <th>Clave</th>
                  <th>Capítulo</th>
                  <th>Descripción del Concepto</th>
                  <th>Unidad</th>
                  <th style="text-align:right;">P. Unitario Base</th>
                </tr>
              </thead>
              <tbody id="catalogTableBody">
                ${rowsHtml}
              </tbody>
            </table>
          </div>

          <!-- Tab Content 2: Audit Log -->
          <div id="catalogTabAudit" class="table-container" style="display:none;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Clave</th>
                  <th>Descripción</th>
                  <th>Usuario</th>
                  <th style="text-align:right;">P.U. Anterior</th>
                  <th style="text-align:right;">P.U. Nuevo</th>
                  <th>Origen / Cotización</th>
                </tr>
              </thead>
              <tbody>
                ${auditRowsHtml.length > 0 ? auditRowsHtml : `<tr><td colspan="7" style="text-align:center; color:var(--color-text-subdued); padding:20px;">No hay registros en la bitácora aún.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    renderDocumentPreviewView() {
      const q = appState.activeQuote;
      if (!q) return '<p>No hay cotización seleccionada.</p>';

      // Group items for print layout
      const grouped = {};
      appState.chapters.forEach(ch => grouped[ch.clave] = []);
      (q.items || []).forEach(it => {
        const cat = appState.catalog.find(c => c.clave === it.clave) || {};
        const cap = cat.capitulo || 'PRE';
        if (!grouped[cap]) grouped[cap] = [];
        grouped[cap].push({ ...cat, ...it });
      });

      // Calculate totals
      let subtotalPartidas = 0;
      (q.items || []).forEach(it => subtotalPartidas += (it.cantidad * it.pu));

      const indPct = q.indirectos_pct || 12;
      const utilPct = q.utilidad_pct || 15;

      const indMonto = subtotalPartidas * (indPct / 100);
      const utilMonto = subtotalPartidas * (utilPct / 100);
      const subtotalConGastos = subtotalPartidas + indMonto + utilMonto;
      const ivaMonto = subtotalConGastos * 0.16;
      const totalGeneral = subtotalConGastos + ivaMonto;

      let tableBodyHtml = '';
      appState.chapters.forEach(ch => {
        const items = grouped[ch.clave] || [];
        if (items.length === 0) return;

        tableBodyHtml += `
          <tr class="paper-chapter-row">
            <td colspan="6">CAPÍTULO ${ch.clave} — ${ch.nombre.toUpperCase()}</td>
          </tr>
        `;

        items.forEach(it => {
          tableBodyHtml += `
            <tr>
              <td class="cell-mono">${it.clave}</td>
              <td>${it.descripcion}</td>
              <td>${it.unidad}</td>
              <td class="cell-mono cell-right">${formatNumber(it.cantidad)}</td>
              <td class="cell-mono cell-right">${formatCurrency(it.pu)}</td>
              <td class="cell-mono cell-right" style="font-weight:600;">${formatCurrency(it.cantidad * it.pu)}</td>
            </tr>
          `;
        });
      });

      return `
        <div class="document-preview-view">
          <div class="preview-toolbar">
            <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('editor')">&larr; Volver al Editor</button>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-secondary btn-sm" onclick="app.exportSimulatedExcel()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                Exportar Excel (.xlsx)
              </button>
              <button class="btn btn-primary btn-sm" onclick="window.print()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Imprimir / PDF
              </button>
            </div>
          </div>

          <div class="paper-page">
            <div class="paper-header">
              <div class="paper-brand">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#6E2A38" stroke="#6E2A38" stroke-width="1.5"/>
                  <path d="M7 8H16M7 12H14M7 16H16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div class="paper-brand-text">
                  <h2>ESISA</h2>
                  <p>CONSTRUCTORA & INSTALACIONES</p>
                </div>
              </div>
              <div class="paper-quote-title">
                <h1>COTIZACIÓN COMERCIAL</h1>
                <div class="paper-folio">${q.folio}</div>
              </div>
            </div>

            <div class="paper-info-grid">
              <div class="paper-info-block">
                <h4>CLIENTE & OBRA</h4>
                <p><strong>${q.cliente}</strong></p>
                <p>${q.obra}</p>
              </div>
              <div class="paper-info-block">
                <h4>CONDICIONES COMERCIALES</h4>
                <p><strong>Fecha de emisión:</strong> ${q.fecha}</p>
                <p><strong>Vigencia:</strong> ${q.vigencia_dias} días naturales</p>
                <p><strong>Forma de pago:</strong> Anticipo 30% y estimaciones quincenales</p>
              </div>
            </div>

            <table class="paper-table">
              <thead>
                <tr>
                  <th style="width:80px;">Clave</th>
                  <th>Concepto / Descripción</th>
                  <th style="width:60px;">Unidad</th>
                  <th style="width:80px; text-align:right;">Cantidad</th>
                  <th style="width:110px; text-align:right;">P. Unitario</th>
                  <th style="width:120px; text-align:right;">Importe Total</th>
                </tr>
              </thead>
              <tbody>
                ${tableBodyHtml}
              </tbody>
            </table>

            <div class="paper-totals-box">
              <div class="paper-total-row">
                <span>Subtotal Partidas:</span>
                <span class="cell-mono">${formatCurrency(subtotalPartidas)}</span>
              </div>
              <div class="paper-total-row">
                <span>Subtotal sin IVA:</span>
                <span class="cell-mono">${formatCurrency(subtotalConGastos)}</span>
              </div>
              <div class="paper-total-row">
                <span>IVA (16%):</span>
                <span class="cell-mono">${formatCurrency(ivaMonto)}</span>
              </div>
              <div class="paper-total-row grand-total">
                <span>TOTAL COTIZACIÓN:</span>
                <span class="cell-mono">${formatCurrency(totalGeneral)}</span>
              </div>
            </div>

            <div class="paper-signatures">
              <div class="signature-box">
                <br><br>
                <strong>${q.cliente}</strong><br>
                Aceptación de Propuesta Comercial
              </div>
              <div class="signature-box">
                <br><br>
                <strong>Ing. Santiago Martinez B.</strong><br>
                ESISA Constructora S.A. de C.V.
              </div>
            </div>
          </div>
        </div>
      `;
    },

    /* ==========================================================================
       BUSINESS LOGIC & INTERACTION HANDLERS
       ========================================================================== */

    openQuoteEditor(folio) {
      const q = appState.quotes.find(item => item.folio === folio);
      if (q) {
        appState.activeQuote = q;
        this.navigateTo('editor');
      }
    },

    openNewQuoteModal() {
      // Auto-generate next folio
      const lastFolioNum = appState.quotes.reduce((max, q) => {
        const num = parseInt(q.folio.replace('COT-2026-', '')) || 0;
        return num > max ? num : max;
      }, 184);

      const nextFolio = `COT-2026-0${lastFolioNum + 1}`;
      document.getElementById('baseFolio').value = nextFolio;
      document.getElementById('baseFecha').value = new Date().toISOString().split('T')[0];
      document.getElementById('baseCliente').value = '';
      document.getElementById('baseObra').value = '';

      openModal('newQuoteBaseModal');
    },

    startNewQuoteFromForm() {
      const folio = document.getElementById('baseFolio').value;
      const fecha = document.getElementById('baseFecha').value;
      const cliente = document.getElementById('baseCliente').value.trim();
      const obra = document.getElementById('baseObra').value.trim();
      const vigencia = parseInt(document.getElementById('baseVigencia').value) || 30;

      if (!cliente || !obra) {
        alert('Por favor capture el cliente y nombre de la obra.');
        return;
      }

      // Seed new quote with ~15 default items for instant rich demo
      const seedItems = [
        { clave: "PRE-010", cantidad: 2500, pu: 34.50 },
        { clave: "PRE-050", cantidad: 20, pu: 6480.00 },
        { clave: "EST-010", cantidad: 28000, pu: 62.00 },
        { clave: "EST-030", cantidad: 2500, pu: 468.00 },
        { clave: "EMT-010", cantidad: 1, pu: 486000.00 },
        { clave: "EBT-010", cantidad: 1, pu: 178000.00 },
        { clave: "EBT-050", cantidad: 180, pu: 1240.00 },
        { clave: "ILU-010", cantidad: 60, pu: 4280.00 },
        { clave: "IHS-060", cantidad: 1, pu: 186000.00 },
        { clave: "HVA-050", cantidad: 2, pu: 248000.00 },
        { clave: "PPM-050", cantidad: 1, pu: 94000.00 }
      ];

      const newQuote = {
        folio,
        cliente,
        obra,
        fecha,
        vigencia_dias: vigencia,
        monto: 0,
        estatus: 'Enviada',
        indirectos_pct: 12,
        utilidad_pct: 15,
        items: seedItems
      };

      appState.quotes.unshift(newQuote);
      appState.activeQuote = newQuote;
      appState.save();

      closeModal('newQuoteBaseModal');
      this.navigateTo('editor');
      showToast(`Cotización ${folio} creada con éxito.`);
    },

    duplicateQuote(folio) {
      const original = appState.quotes.find(q => q.folio === folio);
      if (!original) return;

      const lastFolioNum = appState.quotes.reduce((max, q) => {
        const num = parseInt(q.folio.replace('COT-2026-', '')) || 0;
        return num > max ? num : max;
      }, 184);

      const nextFolio = `COT-2026-0${lastFolioNum + 1}`;
      const duplicated = {
        ...JSON.parse(JSON.stringify(original)),
        folio: nextFolio,
        fecha: new Date().toISOString().split('T')[0],
        estatus: 'Enviada',
        cliente: `${original.cliente} (Copia)`
      };

      appState.quotes.unshift(duplicated);
      appState.activeQuote = duplicated;
      appState.save();

      this.navigateTo('editor');
      showToast(`Cotización duplicada con éxito como ${nextFolio}`);
    },

    saveActiveQuote() {
      const q = appState.activeQuote;
      if (!q) return;

      // Recalculate total amount for historical row
      let subtotalPartidas = 0;
      (q.items || []).forEach(it => subtotalPartidas += (it.cantidad * it.pu));

      const indPct = q.indirectos_pct || 12;
      const utilPct = q.utilidad_pct || 15;
      const indMonto = subtotalPartidas * (indPct / 100);
      const utilMonto = subtotalPartidas * (utilPct / 100);
      const subtotalConGastos = subtotalPartidas + indMonto + utilMonto;
      const totalGeneral = subtotalConGastos * 1.16;

      q.monto = totalGeneral;
      appState.save();

      showToast(`Cotización ${q.folio} guardada. El histórico y el hub se han actualizado.`);
      this.navigateTo('quotes');
    },

    /* ==========================================================================
       EDITOR INTERACTIVITY & LIVE CALCS
       ========================================================================== */

    toggleChapterCollapse(capKey) {
      appState.collapsedChapters[capKey] = !appState.collapsedChapters[capKey];
      this.renderCurrentView();
    },

    updateItemQty(capKey, idx, newQtyVal) {
      const q = appState.activeQuote;
      if (!q) return;

      const catItems = appState.catalog.filter(c => c.capitulo === capKey);
      // Find matching item in quote items
      const itemsInCap = [];
      (q.items || []).forEach(it => {
        const cat = appState.catalog.find(c => c.clave === it.clave);
        if ((cat && cat.capitulo === capKey) || (it.clave && it.clave.startsWith(capKey))) {
          itemsInCap.push(it);
        }
      });

      if (itemsInCap[idx]) {
        itemsInCap[idx].cantidad = parseFloat(newQtyVal) || 0;
        this.recalculateEditorTotals(true);
      }
    },

    handleItemPriceEdit(capKey, idx, oldPrice, newPriceVal) {
      const newPrice = parseFloat(newPriceVal);
      if (isNaN(newPrice) || newPrice === oldPrice) return;

      const q = appState.activeQuote;
      // Find item
      const itemsInCap = [];
      (q.items || []).forEach(it => {
        const cat = appState.catalog.find(c => c.clave === it.clave);
        if ((cat && cat.capitulo === capKey) || (it.clave && it.clave.startsWith(capKey))) {
          itemsInCap.push(it);
        }
      });

      const targetItem = itemsInCap[idx];
      if (!targetItem) return;

      appState.tempPriceChange = {
        item: targetItem,
        oldPrice: oldPrice,
        newPrice: newPrice,
        capKey: capKey
      };

      // Set values in modal
      document.getElementById('scopeItemName').textContent = targetItem.descripcion || targetItem.clave;
      document.getElementById('scopeOldPrice').textContent = formatCurrency(oldPrice);
      document.getElementById('scopeNewPrice').textContent = formatCurrency(newPrice);

      openModal('scopeChoiceModal');
    },

    confirmPriceScope(scopeType) {
      const change = appState.tempPriceChange;
      if (!change) return;

      const { item, oldPrice, newPrice } = change;

      item.pu = newPrice;
      item.isAdjusted = true;

      if (scopeType === 'catalog') {
        // Update global catalog item
        const catItem = appState.catalog.find(c => c.clave === item.clave);
        if (catItem) {
          catItem.pu = newPrice;
        }

        // Add to audit trail
        appState.auditLog.unshift({
          fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
          clave: item.clave,
          descripcion: item.descripcion || '',
          usuario: "Ing. Santiago M.",
          pu_anterior: oldPrice,
          pu_nuevo: newPrice,
          origen: appState.activeQuote ? appState.activeQuote.folio : "Editor",
          alcance: "Actualización global de catálogo"
        });

        showToast(`El catálogo maestro y la bitácora se actualizaron con el nuevo precio de ${item.clave}.`);
      } else {
        // Local quote only
        showToast(`Precio actualizado solo para esta cotización (${appState.activeQuote.folio}).`);
      }

      appState.save();
      closeModal('scopeChoiceModal');
      this.renderCurrentView();
    },

    removeItemFromQuote(capKey, idx) {
      const q = appState.activeQuote;
      if (!q) return;

      const itemsInCap = [];
      (q.items || []).forEach(it => {
        const cat = appState.catalog.find(c => c.clave === it.clave);
        if ((cat && cat.capitulo === capKey) || (it.clave && it.clave.startsWith(capKey))) {
          itemsInCap.push(it);
        }
      });

      const targetItem = itemsInCap[idx];
      if (targetItem) {
        q.items = q.items.filter(it => it !== targetItem);
        this.renderCurrentView();
        showToast(`Partida ${targetItem.clave} eliminada de la cotización.`);
      }
    },

    onIndirectosChange(val) {
      const q = appState.activeQuote;
      if (!q) return;
      const num = parseFloat(val) || 0;
      q.indirectos_pct = num;

      document.getElementById('inputIndirectosPct').value = num;
      this.recalculateEditorTotals(true);
    },

    onUtilidadChange(val) {
      const q = appState.activeQuote;
      if (!q) return;
      const num = parseFloat(val) || 0;
      q.utilidad_pct = num;

      document.getElementById('inputUtilidadPct').value = num;
      this.recalculateEditorTotals(true);
    },

    recalculateEditorTotals(animate = false) {
      const q = appState.activeQuote;
      if (!q) return;

      let subtotalPartidas = 0;
      (q.items || []).forEach(it => subtotalPartidas += (it.cantidad * it.pu));

      const indPct = q.indirectos_pct || 12;
      const utilPct = q.utilidad_pct || 15;

      const indMonto = subtotalPartidas * (indPct / 100);
      const utilMonto = subtotalPartidas * (utilPct / 100);
      const subtotalConGastos = subtotalPartidas + indMonto + utilMonto;
      const ivaMonto = subtotalConGastos * 0.16;
      const totalGeneral = subtotalConGastos + ivaMonto;

      const prevTotal = appState.animatedValues['totGrandTotal'] || subtotalPartidas;
      appState.animatedValues['totGrandTotal'] = totalGeneral;

      if (animate) {
        animateValue('totSubtotalPartidas', 0, subtotalPartidas, 300);
        animateValue('totIndirectosMonto', 0, indMonto, 300);
        animateValue('totUtilidadMonto', 0, utilMonto, 300);
        animateValue('totSubtotalConGastos', 0, subtotalConGastos, 300);
        animateValue('totIvaMonto', 0, ivaMonto, 300);
        animateValue('totGrandTotal', prevTotal, totalGeneral, 300);

        // Flash total container briefly
        const totElem = document.getElementById('totGrandTotal');
        if (totElem) {
          totElem.classList.add('pulse');
          setTimeout(() => totElem.classList.remove('pulse'), 500);
        }
      } else {
        const setVal = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.textContent = formatCurrency(val);
        };
        setVal('totSubtotalPartidas', subtotalPartidas);
        setVal('totIndirectosMonto', indMonto);
        setVal('totUtilidadMonto', utilMonto);
        setVal('totSubtotalConGastos', subtotalConGastos);
        setVal('totIvaMonto', ivaMonto);
        setVal('totGrandTotal', totalGeneral);
      }
    },

    /* ==========================================================================
       SIDE DRAWER (CATALOG SELECTION IN EDITOR)
       ========================================================================== */

    openDrawerForChapter(capKey) {
      const drawer = document.getElementById('sideDrawer');
      const overlay = document.getElementById('drawerOverlay');
      const chapterSelect = document.getElementById('drawerChapterSelect');

      if (chapterSelect) {
        chapterSelect.innerHTML = `
          <option value="">Todos los capítulos</option>
          ${appState.chapters.map(c => `<option value="${c.clave}" ${c.clave === capKey ? 'selected' : ''}>${c.clave} — ${c.nombre}</option>`).join('')}
        `;
      }

      this.filterDrawerItems();

      if (drawer && overlay) {
        overlay.classList.add('active');
        drawer.classList.add('active');
      }
    },

    closeDrawer() {
      const drawer = document.getElementById('sideDrawer');
      const overlay = document.getElementById('drawerOverlay');
      if (drawer && overlay) {
        overlay.classList.remove('active');
        drawer.classList.remove('active');
      }
    },

    filterDrawerItems() {
      const searchVal = (document.getElementById('drawerSearch')?.value || '').toLowerCase();
      const capFilter = document.getElementById('drawerChapterSelect')?.value || '';

      const filtered = appState.catalog.filter(it => {
        const matchesSearch = it.clave.toLowerCase().includes(searchVal) || it.descripcion.toLowerCase().includes(searchVal);
        const matchesCap = !capFilter || it.capitulo === capFilter;
        return matchesSearch && matchesCap;
      });

      const drawerBody = document.getElementById('drawerBody');
      if (!drawerBody) return;

      drawerBody.innerHTML = filtered.map(it => `
        <div class="drawer-item-card">
          <div style="flex:1;">
            <span class="drawer-item-clave">${it.clave}</span>
            <p class="drawer-item-desc">${it.descripcion}</p>
            <span class="drawer-item-price">${formatCurrency(it.pu)} / ${it.unidad}</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="app.addItemToActiveQuote('${it.clave}')">
            + Agregar
          </button>
        </div>
      `).join('');
    },

    addItemToActiveQuote(clave) {
      const q = appState.activeQuote;
      if (!q) return;

      const catItem = appState.catalog.find(c => c.clave === clave);
      if (!catItem) return;

      // Check if already in quote
      const existing = (q.items || []).find(i => i.clave === clave);
      if (existing) {
        existing.cantidad += 1;
      } else {
        if (!q.items) q.items = [];
        q.items.push({
          clave: catItem.clave,
          cantidad: 1,
          pu: catItem.pu
        });
      }

      showToast(`Partida ${clave} agregada a la cotización.`);
      this.renderCurrentView();
    },

    /* ==========================================================================
       CATALOG FULLSCREEN OPERATIONS
       ========================================================================== */

    switchCatalogTab(tabName) {
      const tabItemsBtn = document.getElementById('tabItemsBtn');
      const tabAuditBtn = document.getElementById('tabAuditBtn');
      const contentItems = document.getElementById('catalogTabItems');
      const contentAudit = document.getElementById('catalogTabAudit');

      if (tabName === 'items') {
        tabItemsBtn.classList.add('active');
        tabAuditBtn.classList.remove('active');
        contentItems.style.display = 'block';
        contentAudit.style.display = 'none';
      } else {
        tabAuditBtn.classList.add('active');
        tabItemsBtn.classList.remove('active');
        contentAudit.style.display = 'block';
        contentItems.style.display = 'none';
      }
    },

    editCatalogItemDirectPrice(clave, newPriceVal) {
      const newPrice = parseFloat(newPriceVal);
      if (isNaN(newPrice)) return;

      const catItem = appState.catalog.find(c => c.clave === clave);
      if (!catItem || catItem.pu === newPrice) return;

      const oldPrice = catItem.pu;
      catItem.pu = newPrice;

      // Add to audit trail
      appState.auditLog.unshift({
        fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
        clave: catItem.clave,
        descripcion: catItem.descripcion,
        usuario: "Ing. Santiago M.",
        pu_anterior: oldPrice,
        pu_nuevo: newPrice,
        origen: "Edición Directa Catálogo",
        alcance: "Actualización global de catálogo"
      });

      appState.save();
      showToast(`Precio base de ${clave} actualizado en catálogo.`);
    },

    openNewItemModal() {
      const chapterSelect = document.getElementById('newItemChapter');
      if (chapterSelect) {
        chapterSelect.innerHTML = appState.chapters.map(c => `<option value="${c.clave}">${c.clave} — ${c.nombre}</option>`).join('');
      }

      this.autoSuggestClave();
      openModal('newItemModal');
    },

    autoSuggestClave() {
      const capKey = document.getElementById('newItemChapter')?.value || 'PRE';
      const countInCap = appState.catalog.filter(c => c.capitulo === capKey).length;
      const nextNum = (countInCap + 1) * 10;
      const suggestedClave = `${capKey}-${nextNum < 100 ? '0' + nextNum : nextNum}`;
      document.getElementById('newItemClave').value = suggestedClave;
    },

    saveNewCatalogItem() {
      const cap = document.getElementById('newItemChapter').value;
      const clave = document.getElementById('newItemClave').value.trim();
      const desc = document.getElementById('newItemDesc').value.trim();
      const unidad = document.getElementById('newItemUnidad').value;
      const pu = parseFloat(document.getElementById('newItemPU').value) || 0;

      if (!clave || !desc) {
        alert('Por favor complete la clave y la descripción.');
        return;
      }

      const newItem = {
        clave,
        capitulo: cap,
        descripcion: desc,
        unidad,
        pu
      };

      appState.catalog.push(newItem);

      // Audit log
      appState.auditLog.unshift({
        fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
        clave,
        descripcion: desc,
        usuario: "Ing. Santiago M.",
        pu_anterior: 0,
        pu_nuevo: pu,
        origen: "Creación de Partida",
        alcance: "Nueva entrada en catálogo maestro"
      });

      appState.save();
      closeModal('newItemModal');
      this.renderCurrentView();
      showToast(`Partida ${clave} creada y guardada en el catálogo.`);
    },

    /* ==========================================================================
       MODALS & DIALOG HANDLERS
       ========================================================================== */

    openGrayModuleModal(moduleKey) {
      const mod = GRAY_MODULES[moduleKey];
      if (!mod) return;

      document.getElementById('grayModPhase').textContent = mod.phase;
      document.getElementById('grayModTitle').textContent = mod.title;
      document.getElementById('grayModDesc').textContent = mod.desc;

      const reqsUl = document.getElementById('grayModReqs');
      if (reqsUl) {
        reqsUl.innerHTML = mod.reqs.map(r => `<li>${r}</li>`).join('');
      }

      openModal('grayModuleModal');
    },

    showAuditHistory(clave) {
      const logs = appState.auditLog.filter(l => l.clave === clave);
      const title = document.getElementById('auditItemTitle');
      const body = document.getElementById('auditModalBody');

      if (title) title.textContent = `Historial de Ajustes — ${clave}`;

      if (body) {
        if (logs.length === 0) {
          body.innerHTML = '<p>No hay registros de auditoría para esta partida.</p>';
        } else {
          body.innerHTML = logs.map(l => `
            <div style="background:var(--color-card-bg); padding:12px; border-radius:6px; margin-bottom:10px; font-size:12px;">
              <div style="display:flex; justify-between; margin-bottom:4px;">
                <strong>${l.usuario}</strong>
                <span style="color:var(--color-text-muted);">${l.fecha}</span>
              </div>
              <p>${l.descripcion}</p>
              <div style="font-family:var(--font-mono); margin-top:6px; color:var(--color-cobre); font-weight:700;">
                ${formatCurrency(l.pu_anterior)} &rarr; ${formatCurrency(l.pu_nuevo)}
              </div>
              <div style="font-size:11px; color:var(--color-text-muted); margin-top:4px;">
                Origen: ${l.origen} (${l.alcance})
              </div>
            </div>
          `).join('');
        }
      }

      openModal('auditTrailModal');
    },

    exportSimulatedExcel() {
      showToast('Generando reporte en Excel (.xlsx)... Descarga iniciada.');
    },

    // Table Filter Utilities
    filterQuotesTable() {
      const query = (document.getElementById('quoteSearchInput')?.value || '').toLowerCase();
      const statusFilter = document.getElementById('quoteStatusFilter')?.value || '';

      const rows = document.querySelectorAll('#quotesTableBody tr');
      let visibleCount = 0;

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const matchesSearch = text.includes(query);
        const matchesStatus = !statusFilter || text.includes(statusFilter.toLowerCase());

        if (matchesSearch && matchesStatus) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      const badge = document.getElementById('quoteCountBadge');
      if (badge) badge.textContent = `${visibleCount} cotizaciones visibles`;
    },

    filterCatalogTable() {
      const query = (document.getElementById('catalogSearchInput')?.value || '').toLowerCase();
      const chapterFilter = document.getElementById('catalogChapterFilter')?.value || '';

      const rows = document.querySelectorAll('#catalogTableBody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const matchesSearch = text.includes(query);
        const matchesChapter = !chapterFilter || text.includes(chapterFilter.toLowerCase());

        if (matchesSearch && matchesChapter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    },

    closeModal
  };

  // Expose to window scope for inline HTML handlers
  window.app = AppController;

  // Initialize App when DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    AppController.init();
  });

})();
