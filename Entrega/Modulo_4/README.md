# Módulo 4 — Economía circular e intervención

## 1. Objetivo

Documentar los indicadores de impacto y eficiencia del prototipo y preservar la evidencia disponible sobre economía circular, ciclo de vida y huella de carbono, sin estimar valores que no consten en los archivos originales.

## 2. Descripción del contenido

El documento de indicadores consigna cinco KPI: eficiencia en asimilación de nutrientes, intensidad energética del monitoreo, disponibilidad e integridad de datos, índice de alerta fitosanitaria foliar y mantenibilidad/economía circular del hardware. Cada ficha incluye fórmula, unidad y meta proposal; el cuadro resumen añade frecuencia de evaluación. Algunas Variables como línea base, fecha de medición y método de comparación antes/después no están documentadas y se marcan como pendientes.

## 3. Entregables exigidos

1. Mapa de economía circular.
2. Inventario simplificado del ciclo de vida.
3. Estimación de huella de carbono, si existe información suficiente.
4. Modelo de intervención.
5. Indicadores KPI (el profesor recomienda entre 3 y 5).

## 4. Estructura de carpetas

```text
Modulo_4/
├── README.md
├── economia_circular/    Sin evidencia identificada (.gitkeep)
├── mapa_circular/        Sin evidencia identificada (.gitkeep)
├── ciclo_vida/           Sin evidencia identificada (.gitkeep)
├── huella_carbono/       Sin evidencia identificada (.gitkeep)
├── modelo_intervencion/  Sin evidencia identificada (.gitkeep)
└── indicadores_KPI/      Documento de los cinco indicadores
```

## 5. Relación de archivos existentes

| Archivo | Ubicación | Contenido verificado |
|---|---|---|
| `Indicadores_de_Impacto_Proyecto_Integrador-v2.docx` | `indicadores_KPI/` | Cinco fichas de indicadores con fórmula, unidad, meta y justificación agronómica/técnica, más cuadro resumen de frecuencias. |

Resumen verificado de los KPI:

| # | Indicador | Unidad | Meta consignada | Frecuencia consignada |
|---|---|---|---|---|
| 1 | Eficiencia en asimilación de nutrientes | % | ≥ 80,0 % | Semanal / ciclo |
| 2 | Intensidad energética del monitoreo | Wh/trama | ≤ 0,50 Wh/trama | Diaria / automática |
| 3 | Disponibilidad e integridad de datos | % | ≥ 98,0 % | Diaria / mensual |
| 4 | Índice de alerta fitosanitaria foliar | % tiempo mojado | Línea base empírica | Horaria / nocturna |
| 5 | Mantenibilidad y economía circular del hardware | % | ≤ 15,0 % | Anual / mantenimiento |

Los valores y metas se transcriben del documento original; no se han validado ni recalculado.

## 6. Metodología

Los indicadores se asocian a variables del prototipo y al dataset real de INNOVATOR. El indicador 4 usa la humedad foliar medida; el indicador 2 usa consumos del sistema off-grid; el indicador 5 se apoya en el diseño modular de la sonda y el chasis.

## 7. Enlaces externos

No se registran enlaces externos en la documentación disponible. La referencia a ISO 14040 aparece en el cronograma del anexo del módulo 7, pero no se incorporó un inventario de ciclo de vida con ese método.

## 8. Evidencias

El documento de indicadores se conserva íntegro. La serie temporal utilizada como base argumentativa está en `../Modulo_2/analisis/Laboratorio_P4_1_Monitoreo_Agrometeorologico-v2.xlsx` y en el dataset del módulo 2.

## 9. Estado de avance

**Pendiente de evidencias.** Los cinco KPI están documentados; no se encontraron el mapa de economía circular, el inventario de ciclo de vida, la estimación de huella de carbono ni el modelo de intervención como archivos independientes.

## 10. Actividades pendientes

- Incorporar el mapa de economía circular.
- Incorporar el inventario simplificado del ciclo de vida.
- Si hay información suficiente, documentar la huella de carbono con su método y supuestos; de lo contrario, dejar constancia expresa de que no se estimó.
- Incorporar el modelo de intervención.
- Completar, para cada KPI, línea base, meta confirmada, fuente de información, variable medida y método de comparación antes/después.
- Revisar la coherencia del indicador 1 (basado en pH edáfico) con la instrumentación final descrita en el módulo 3, que no incluye sensor de pH.
