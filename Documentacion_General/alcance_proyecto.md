# Alcance del proyecto y del repositorio

## 1. Alcance académico verificado

Según los documentos originales, el proyecto integrador corresponde al Diplomado en Energía Circular Inteligente 5.0 y se desarrolla en alianza entre Unicomfacauca, el SENA Tecnoparque Nodo Popayán y la empresa INNOVATOR. Los autores identificados son Jhose Cuero y Sara Pisso.

El objetivo general consignado en el documento consolidado del módulo 1 es desarrollar un prototipo electrónico funcional para un sistema inteligente de monitoreo de variables hidrometeorológicas para la gestión del riesgo climático en sistemas agrícolas. Una versión posterior amplía el enunciado para incluir variables edáficas; ambas se conservan y su vigencia está pendiente de validación.

## 2. Alcance técnico documentado

- **Territorio:** Popayán, Cauca; parcelas de café especial, frutales y hortalizas.
- **Instrumentación:** ocho equipos de campo descritos en la ficha técnica de INNOVATOR. La ficha no reporta sensor de pH de suelo, aunque algunos documentos de formulación y KPI sí lo mencionan.
- **Comunicación:** LoRaWAN en 915 MHz y respaldo local en tarjeta MicroSD.
- **Energía:** panel fotovoltaico de 20 Wp, regulador MPPT y batería LiFePO4 de 12,8 V / 6 Ah; consumo registrado de 0,338 Wh por trama.
- **Datos:** 2.999 registros horarios entre junio y octubre de 2024.
- **Análisis:** notebook de Colab con limpieza, EDA, regresión, clasificación, clustering y series temporales.
- **Visualización:** dashboard estático de 11 pestañas con datos embebidos y modelos ejecutados en el navegador.
- **IA local:** asistente RAG sin conexión, documentado en la ficha técnica de los módulos 5 y 6.
- **Indicadores:** cinco KPI con fórmula, unidad y meta; su línea base y comparación antes/después están pendientes en varios casos.

## 3. Alcance del repositorio

El repositorio organiza seis carpetas de entrega para siete módulos académicos. Los módulos 5 y 6 comparten `Entrega/Modulo_5_y_6/` y contienen únicamente su ficha técnica. Se conservan los originales de cada entregable sin conversión artificial de formato ni sustitución de datos.

Documentos de apoyo:

- `alcance_proyecto.md`: este archivo.
- `inventario_entregables.md`: correspondencia entre entrega, archivo y estado.
- `estado_avance.md`: criterios de estado, pendientes y decisiones de organización.

Evidencias en `Evidencias/`: transcripción de la retroalimentación docente, carpeta de capturas y registro de enlaces.

## 4. Fuera del alcance

- No se crean resultados experimentales, mediciones, cálculos, referencias ni conclusiones nuevos.
- No se generan entregables adicionales para los módulos 5 y 6.
- No se incorporan versiones intermedias de documentos cuando ya está identificada una versión final o consolidada; esas versiones permanecen en el equipo de origen y se listan como no incorporadas en el inventario.
- No se incluyen instaladores, entornos virtuales, credenciales ni archivos temporales.
- No se generó una versión nueva del dashboard: se conserva la versión local y se documenta el despliegue ya existente en [dashboard-meteorologico-ivory.vercel.app](https://dashboard-meteorologico-ivory.vercel.app/).

## 5. Información que requiere validación

1. Vigencia de la redacción del objetivo general (con o sin variables edáficas).
2. Correspondencia real entre la ficha técnica PDF de RAG y la ficha Excel de modelos de IA solicitada por el profesor.
3. Presencia de árbol de causas/efectos y árbol de objetivos como documentos separados.
4. Existencia de un informe de auditoría energética y de la cartera priorizada de medidas como entregables propios del módulo 2 (el programa usa ese término; antes se registró como matriz de consumo).
5. Estructura interna del PDF final (capítulos, resumen, referencias), que no pudo extraerse con las herramientas disponibles.
6. Requisitos completos del módulo 7, cuya explicación quedó incompleta en la grabación.
