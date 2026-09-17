# Prompt para Claude Design — Sistema ESISA (prototipo del cotizador)

> Pegar el bloque completo. Adjuntar `catalogo_partidas.json` y el logo de ESISA.

---

## Contexto

Estoy construyendo un prototipo funcional para ESISA Constructora, una empresa que ejecuta instalaciones (eléctrica, hidrosanitaria, HVAC) y obra industrial ligera. Hoy cotizan en Excel: cada concurso se arma desde cero, las fórmulas se arrastran mal, y los precios varían entre obras del mismo tipo.

El sistema final tendrá seis módulos. **En este prototipo solo uno está vivo: el cotizador.** Los otros cinco aparecen en el hub como estructura visible pero inactiva, en escala de grises. Eso es deliberado: comunica el alcance completo sin prometer nada que todavía no exista.

Este prototipo se muestra en una reunión al dueño y a su mano derecha. **No es un producto en producción: es una demostración de cómo se vería y se sentiría trabajar así.** Debe verse terminado y responder de verdad a la interacción — no una maqueta muerta.

Los momentos que el demo tiene que producir, en orden de importancia:

1. Duplicar una cotización anterior y arrancar con el 80% ya armado.
2. Buscar una partida en el catálogo y que aparezca con su precio unitario ya cargado.
3. Mover el porcentaje de utilidad y ver el total recalcularse en vivo.
4. Corregir un precio dentro de una cotización y decidir si ese cambio actualiza el catálogo para adelante o se queda solo en esa cotización.

---

## Recorrido del demo

El prototipo se presenta de corrido, sin recargar ni saltar a pantallas sueltas. Estos son los dos caminos que tienen que funcionar completos.

### Camino A — de la cotización

1. **Hub.** Se explica el alcance del sistema completo: dos módulos vivos, cuatro por construir.
2. **Clic en Presupuestos y cotizaciones** → histórico. Se ve el tablero de cotizaciones previas, con sus montos y estatus.
3. **Clic en cualquier fila** → abre esa cotización en el editor, ya armada. Se puede recorrer y regresar.
4. **Nueva cotización** → paso de datos base antes del editor (ver abajo).
5. **Editor.** Se agregan partidas desde el catálogo, se capturan cantidades, se ajusta utilidad, se corrige un precio y se decide su alcance.
6. **Guardar** → regresa al histórico y **la cotización nueva aparece en la lista**.
7. **Regresar al hub** → **las cifras del tile de cotizaciones reflejan la cotización recién creada**.

### Camino B — del catálogo

1. **Hub → Catálogo y datos maestros** → catálogo en pantalla completa.
2. Navegar por capítulos, buscar una partida.
3. **Editar el precio de una partida existente** → se actualiza y queda registrado con usuario y fecha.
4. **Crear una partida nueva** → formulario breve: capítulo, clave (sugerida automáticamente según el capítulo), descripción, unidad, precio unitario. Al guardar entra al catálogo y aparece en la bitácora.
5. **Regresar al hub** → el contador de partidas y la fecha de última actualización cambiaron.
6. Entrar a una cotización y **buscar la partida recién creada** — está disponible.

---

## Paleta de Colores ESISA

- Vinotinto (`#6E2A38`): Chrome de marca, header, botones primarios.
- Vinotinto Oscuro (`#4E1C28`): Hover de botones primarios.
- Vinotinto Tinte (`#F6EDEF`): Filas seleccionadas, chips suaves.
- Cobre (`#B8623C`): Exclusivamente para el total de la cotización y monto de utilidad.
- Slate (`#4E6E85`): Encabezados de tabla, etiquetas de agrupación.
