# Módulo 3 — Predimensionamiento energético

## 1. Objetivo

Organizar la evidencia técnica de los equipos de campo y del sistema de alimentación autónoma, de manera que sustente la selección, el predimensionamiento y la evaluación económica sin introducir cálculos no documentados.

## 2. Descripción del contenido

La ficha técnica de instrumentación disponible describe ocho equipos reales de la estación INNOVATOR: anemómetro y veleta, pluviómetro de balancín, piranómetro, sensor T/HR SHT35, datalogger con LoRaWAN 915 MHz y MicroSD, sensor de humedad foliar, trípode/mástil con gabinete IP65 y sistema solar off-grid. También registra consumo de 0,338 Wh por trama, panel de 20 Wp y batería LiFePO4 de 12,8 V / 6 Ah (76,8 Wh).

## 3. Entregables exigidos

El documento PDF del módulo debe cubrir: equipos requeridos; selección de equipos nuevos o existentes; justificación técnica de reemplazos; cantidades; características técnicas; potencia, voltaje y corriente; predimensionamiento de paneles solares si aplica; selección de inversores; almacenamiento con baterías si aplica; modelo energético seleccionado; esquema de operación; proyección de inversión; vida útil; retorno de inversión.

## 4. Estructura de carpetas

```text
Modulo_3/
├── README.md
├── predimensionamiento/      Sin evidencia identificada (.gitkeep)
├── seleccion_equipos/        Ficha técnica de instrumentación
├── dimensionamiento/         Sin evidencia identificada (.gitkeep)
├── modelo_energetico/        Sin evidencia identificada (.gitkeep)
├── almacenamiento/           Sin evidencia identificada (.gitkeep)
└── evaluacion_economica/     Sin evidencia identificada (.gitkeep)
```

## 5. Relación de archivos existentes

| Archivo | Ubicación | Contenido verificado |
|---|---|---|
| `Ficha_Tecnica_Estacion_Meteorologica_INNOVATOR.pdf` | `seleccion_equipos/` | Ficha de instrumentación y equipos: arquitectura, especificaciones de los 8 equipos, características del dataset, KPIs y datos de autonomía solar. |

La ficha no contiene todos los apartados exigidos para el módulo (por ejemplo, inversores, proyección de inversión, vida útil y retorno de inversión), por lo que no se presenta como el documento completo del módulo.

## 6. Metodología

La evidencia disponible corresponde a especificaciones de equipos reales y a datos observados en campo. No se han generado dimensionamientos, potencias corrientes, costos ni tasas de retorno nuevos: esos valores deben provenir de los cálculos originales del estudiante.

## 7. Enlaces externos

No se registran enlaces externos en la documentación del módulo. Las fichas de fabricante citadas en la carpeta de descargas originales no se incorporaron porque no fue posible verificar su correspondencia con el equipo seleccionado.

## 8. Evidencias

La ficha técnica PDF se conserva sin modificar. Los consumos y la serie temporal que la sustentan están en `../Modulo_2/analisis/Laboratorio_P4_1_Monitoreo_Agrometeorologico-v2.xlsx` y en `../Modulo_2/datasets/`.

## 9. Estado de avance

**Pendiente de verificación.** Existe evidencia de selección de equipos, pero no el documento PDF integral con los catorce apartados solicitados.

## 10. Actividades pendientes

- Incorporar el documento PDF del módulo con los catorce apartados exigidos.
- Aportar las fichas técnicas de los equipos seleccionados, si el profesor las requiere como anexo.
- Documentar cantidades, potencia/voltaje/corriente, inversores, esquema de operación y modelo energético con datos verificables.
- Aportar proyección de inversión, vida útil y retorno de inversión calculados con la información real del proyecto.
- Revisar si el alcance edáfico de algunas versiones del problema (sensor de pH de suelo) forma parte de la selección de equipos definitiva; la ficha técnica de la estación no incluye ese sensor.
