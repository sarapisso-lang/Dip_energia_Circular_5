# Alcance del proyecto y del repositorio

## 1. Alcance académico verificado

Según los documentos originales, el proyecto integrador corresponde al Diplomado en Energía Circular Inteligente 5.0 y se desarrolla en alianza entre Unicomfacauca, el SENA Tecnoparque Nodo Popayán y la empresa INNOVATOR. Los autores identificados son Jhose Cuero y Sara Pisso.

El objetivo general del proyecto es desarrollar un prototipo electrónico funcional para un sistema inteligente de monitoreo de variables hidrometeorológicas para la gestión del riesgo climático en sistemas agrícolas. El documento consolidado del módulo 1 conserva ese enunciado y sus complementos se mantienen sin modificación.

**Los siete módulos académicos están completos** conforme a la retroalimentación del profesor y a la confirmación del estudiante del 19 de noviembre de 2026.

## 2. Alcance técnico documentado

- **Territorio:** Popayán, Cauca; parcelas de café especial, frutales y hortalizas.
- **Instrumentación:** ocho equipos de campo descritos en la ficha técnica de INNOVATOR: anemómetro y veleta, pluviómetro de balancín, piranómetro, sensor T/HR SHT35, datalogger con LoRaWAN 915 MHz y MicroSD, sensor de humedad foliar, trípode/mástil con gabinete IP65 y sistema solar off-grid.
- **Comunicación:** LoRaWAN en 915 MHz y respaldo local en tarjeta MicroSD.
- **Energía:** panel fotovoltaico de 20 Wp, regulador MPPT y batería LiFePO4 de 12,8 V / 6 Ah; consumo registrado de 0,338 Wh por trama.
- **Datos:** 2.999 registros horarios entre junio y octubre de 2024.
- **Análisis:** notebook de Colab con limpieza, EDA, regresión, clasificación, clustering y series temporales.
- **Visualización:** dashboard estático de 11 pestañas con datos embebidos y modelos ejecutados en el navegador; despliegue público verificado.
- **IA local:** asistente RAG sin conexión, documentado en la ficha técnica de los módulos 5 y 6.
- **Indicadores:** cinco KPI con fórmula, unidad y meta; los campos sin valores en el original no se completaron.
- **Bibliografía:** compendio complementario en `Entrega/Modulo_7/referencias/`, transcrito de documentos originales y centrado en la estación, la serie temporal, la lluvia y la energía solar.

## 3. Alcance del repositorio

El repositorio organiza seis carpetas de entrega para siete módulos académicos. Los módulos 5 y 6 comparten `Entrega/Modulo_5_y_6/` y contienen únicamente su ficha técnica. Se conservan los originales de cada entregable sin conversión artificial de formato ni sustitución de datos.

Contenido por entrega:

- `Modulo_1/`: documento consolidado, mapa, matriz normativa, ficha del problema y formulación orientadora.
- `Modulo_2/`: dataset, notebook, laboratorio P4.1 y dashboard con despliegue público.
- `Modulo_3/`: ficha técnica de los ocho equipos y del sistema solar.
- `Modulo_4/`: documento de cinco KPI.
- `Modulo_5_y_6/`: ficha técnica del asistente RAG local.
- `Modulo_7/`: documento final, anexo de IA/cronograma y referencias.

Documentos de apoyo:

- `alcance_proyecto.md`: este archivo.
- `inventario_entregables.md`: correspondencia entre entrega, archivo y estado.
- `estado_avance.md`: contenido verificado y confirmación de los módulos.
- `evaluacion_entregables.md`: comparación entre programa, retroalimentación y entregas.
- `herramientas_ia_utilizadas.md`: declaración de las herramientas de IA empleadas.

Evidencias en `Evidencias/`: transcripción de la retroalimentación docente, carpeta de capturas y registro de enlaces.

## 4. Fuera del alcance

- No se crean resultados experimentales, mediciones, cálculos, referencias ni conclusiones nuevos.
- No se generan entregables adicionales para los módulos 5 y 6.
- No se incorporan versiones intermedias de documentos cuando ya está identificada una versión final o consolidada; esas versiones permanecen en el equipo de origen y se listan como no incorporadas en el inventario.
- No se incluyen instaladores, entornos virtuales, credenciales ni archivos temporales.
- No se conservan carpetas vacías ni marcadores `.gitkeep`.
- No se generó una versión nueva del dashboard: se conserva la versión local y se documenta el despliegue ya existente en [dashboard-meteorologico-ivory.vercel.app](https://dashboard-meteorologico-ivory.vercel.app/).
- No se modificó el PDF final para insertar citas; estas se entregan como documento complementario.

## 5. Confirmación final

No se reportan entregables incumplidos. La inserción física de las citas dentro del PDF, si el profesor la solicita, se haría como revisión manual guiada por `Entrega/Modulo_7/referencias/bibliografia_y_citas.md` y no modifica el estado completo del módulo 7.
