# ESISA Constructora — Sistema de Cotización y Catálogo Maestro

Prototipo de demostración interactivo para **ESISA Constructora**, diseñado para la cotización de instalaciones (eléctrica, hidrosanitaria, HVAC) y obra industrial ligera.

---

## 📌 Contexto del Proyecto

Hoy en día, las cotizaciones en obra industrial e instalaciones se realizan de forma manual en hojas de cálculo de Excel:
- Cada concurso se arma desde cero.
- Las fórmulas y porcentajes de utilidad/indirectos son propensos a errores de arrastre.
- Los precios unitarios varían entre obras del mismo tipo sin trazabilidad ni control centralizado.

El **Sistema ESISA** unifica los procesos comerciales y de ejecución en 6 módulos integrados. En este prototipo, el **Módulo de Presupuestos y Cotizaciones** y el **Catálogo Maestro** se encuentran 100% funcionales para demostración ejecutiva, mientras que los 4 módulos restantes se presentan estructurados en fase de despliegue futuro.

---

## 🎨 Paleta de Colores e Identidad Visual

| Rol | Hex | Aplicación en Interfaz |
|---|---|---|
| **Vinotinto (Marca)** | `#6E2A38` | Header principal, navegación, botones primarios, badges de acción. |
| **Vinotinto Oscuro** | `#4E1C28` | Hover de botones primarios y acentos de contraste. |
| **Vinotinto Tinte** | `#F6EDEF` | Fondo de filas seleccionadas, chips de folio y estado. |
| **Cobre (Énfasis)** | `#B8623C` | **Exclusivo para cifras clave**: Total general de cotización, monto de utilidad en pesos e indicador auditable de precio ajustado. |
| **Slate (Soporte)** | `#4E6E85` | Encabezados de tabla, etiquetas de agrupación y badges de capítulos. |

> **Alineación Tabular:** Todas las columnas numéricas (cantidades, precios unitarios, importes y totales) utilizan la tipografía *JetBrains Mono* con alineación a la derecha y formato de moneda MXN.

---

## 🚀 Recorridos de Demostración (User Stories)

### 🛣️ Camino A — Gestión de Cotización y Recálculo en Vivo
1. **Hub del Sistema:** Visualización del alcance de 6 módulos con los estados visuales activos.
2. **Histórico de Cotizaciones:** Tablero interactivo con búsqueda, filtros por estatus y acción de **Duplicar Cotización** (inicia un nuevo concurso con el 80% premontado).
3. **Paso de Datos Base:** Formulario de captura inicial de cliente, obra, vigencia y condiciones de pago.
4. **Editor de Cotización:**
   - Edición en línea de cantidades y precios unitarios por capítulo.
   - Ajuste mediante inputs numéricos y sliders de **Indirectos %** y **Utilidad %**.
   - **Interpolación numérica en vivo (300 ms)** en la barra de totales fija al pie.
5. **Ajuste Vivo de Catálogo:** Al cambiar un precio en la cotización, un diálogo contextual permite elegir entre:
   - *Solo en esta cotización* (marca la partida con indicador cobre de auditoría `ajustado`).
   - *Actualizar el catálogo maestro* (actualiza el catálogo global y registra en la bitácora de auditoría).
6. **Vista Previa de Documento:** Hoja membretada lista para impresión o exportación a PDF/Excel.

### 🛣️ Camino B — Catálogo y Datos Maestros
1. **Acceso desde el Hub:** Vista completa del catálogo agrupado por 9 capítulos de especialidad.
2. **Creación de Partida:** Sugerencia automática de claves según el capítulo y adición al catálogo.
3. **Bitácora de Cambios:** Historial auditable de quién cambió un precio, cuándo, de cuánto a cuánto y en qué cotización se originó.

---

## 📁 Estructura del Repositorio

```
ummi-esisa.git/
├── index.html                # Estructura semántica HTML5 y modales del prototipo
├── styles.css                # Sistema de diseño, tokens CSS, componentes y barra de totales
├── app.js                    # Motor de estado reactivo, animaciones numéricas y controladores UI
├── catalogo_partidas.json    # Datos semilla (~65 partidas reales de instalaciones y cotizaciones históricas)
├── PROMPT_CLAUDE_DESIGN.md   # Especificaciones de diseño y arquitectura de experiencia de usuario
└── README.md                 # Documentación ejecutiva y técnica del proyecto
```

---

## 🛠️ Ejecución Local

No requiere herramientas de compilación o instalación de paquetes `npm`.

1. Clonar o descargar el repositorio.
2. Abrir `index.html` directamente en cualquier navegador web moderno (Chrome, Edge, Safari, Firefox).
3. O bien, servir mediante cualquier servidor HTTP local:
   ```bash
   python3 -m http.server 8000
   ```
   Y navegar a `http://localhost:8000`.

---

## 🔐 Banner de Realidad Operativa

El prototipo incluye una leyenda fija en el encabezado:
> *"Prototipo de demostración. Catálogo y precios de ejemplo — el catálogo real de ESISA se construye durante la fase de diagnóstico."*
