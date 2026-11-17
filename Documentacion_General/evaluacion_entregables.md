# Evaluación del estado actual de los entregables

Fecha de la evaluación: 17 de noviembre de 2026.

## Fuentes consultadas

1. `Documentacion_General/programa_diplomado.pdf`: copia íntegra del PDF del diplomado aportado por el estudiante (SHA256 `9FE02A15740586BB56AE6C30A51191E58AD2A51857D478FEA9AA97A3DD45A349`).
2. `Evidencias/Transcripcion_Retroalimentacion_Profe.md`: retroalimentación específica del profesor, más reciente que el programa general.

**Limitación de extracción:** el programa PDF se leyó con un extractor local que inserta espacios entre glifos. No fue posible recuperar de forma confiable las líneas exactas de “Evidencia de aprendizaje” de los módulos 3 y 5. Para esos módulos se toma como referencia la retroalimentación docente. No se inventa contenido del PDF.

## Evaluación por módulo

| Módulo | Evidencia exigida | Ya está en el repositorio | Falta | Conclusión |
|---|---|---|---|---|
| 1 | Según el PDF: mapa territorial argumentado, matriz normativa y formulación del problema. Según el profesor: causas técnicas, ficha del problema, objetivo general y justificación de objetivos específicos. | Documento consolidado, mapa en PDF e imagen, matriz en PDF, ficha del problema y formulación v2. | Árbol de causas y efectos y árbol de objetivos como documentos identificables. | **Casi completo.** Cumple la evidencia del PDF; quedan dos elementos señalados por el profesor. |
| 2 | Según el PDF: informe de auditoría energética introductorio, conjunto de datos documentado, código de análisis, tablero de indicadores y **cartera priorizada de medidas**. | Dataset original, notebook, laboratorio P4.1, dashboard local y URL pública verificada. | Informe de auditoría en PDF y cartera priorizada de medidas (antes registrada como “matriz de consumo”). | **Parcial.** Faltan dos entregables. |
| 3 | La línea exacta del PDF no pudo extraerse. Según el profesor: PDF con selección de equipos, justificación, cantidades, potencia/voltaje/corriente, predimensionamiento solar, inversores, almacenamiento, modelo energético, esquema de operación, inversión, vida útil y retorno. | Ficha técnica de instrumentación de los ocho equipos. | Documento PDF integral con los apartados indicados. | **Parcial.** Hay base técnica, pero no el documento completo. |
| 4 | Según el PDF: mapa circular, inventario de ciclo de vida simplificado, huella de carbono básica y modelo de intervención con indicadores. | Cinco fichas de KPI con fórmula, unidad y meta. | Mapa circular, LCI, huella de carbono y modelo de intervención. | **Parcial.** Solo está completamente cubierto el componente de indicadores. |
| 5 y 6 | Según el profesor: ficha técnica de los modelos de IA y cronograma Gantt. Según instrucción del estudiante: módulos 5 y 6 son **una sola entrega** y solo se exige la ficha del módulo 5. | Ficha RAG en PDF dentro de `Modulo_5_y_6/`; Excel de modelos y Gantt en `Modulo_7/anexos/`; captura del consumo de la PC en `Evidencias/capturas/consumo_pc_opencode.png`, enlazada desde el README de la entrega conjunta. | Confirmar que el Excel corresponde a lo pedido por el profesor, que la ficha RAG es suficiente para la entrega conjunta y que la captura externa satisface el espacio de evidencia del PDF. | **Completo según la instrucción recibida**, sujeto a validación docente. |
| 6 (programa general) | Según el PDF: paquete multimodal con imagen, video, modelo 3D, archivo fuente, ficha de procedencia y criterios de validación técnica. | No incluido. | No aplica por decisión académica declarada: el profesor pidió solo la ficha y el estudiante confirmó la entrega conjunta. | **No exigido en esta entrega** según retroalimentación/instrucción, aunque difiere del programa general. |
| 7 | Según el PDF: 13 entregables mínimos, entre ellos línea base, indicadores, alternativa renovable, mapa de circularidad, LCI, carbono, sistema IoT, código, asistente RAG, producto visual, video, modelo 3D, evaluación financiera preliminar e informe técnico con repositorio. Según el profesor: además, bibliografía y citas. | Documento final PDF, anexo Excel, dataset, notebook, dashboard, RAG y repositorio público. | Producto visual, video, modelo 3D, evaluación financiera preliminar y verificación manual de las secciones internas del PDF. Pendiente además de bibliografía y citas. | **Suficiente según la retroalimentación recibida** (“el resto, hasta ahí van bien”), pero **incompleto frente al listado formal del PDF**. Conviene confirmar cuál criterio prevalece. |

## Veredicto

**Sí, estamos bien con respecto a lo que el profesor pidió en la retroalimentación**:

- GitHub: repositorio público y verificable. ✅
- Ficha técnica: presente en los módulos 5 y 6. ✅
- Cronograma Gantt y ficha de modelos en Excel: presentes como anexo. ✅
- Dashboard con enlace directo y despliegue en Vercel: verificado. ✅
- Evidencia de recursos computacionales: captura de la PC publicada y enlazada en módulos 5 y 6. ✅
- Bibliografía y citas: **pendiente**, recomendación expresa del profesor. ⚠️

**No estamos del todo bien frente al programa PDF**: faltan entregables formales en los módulos 2, 3, 4 y varios de los mínimos del módulo 7. Como la retroalimentación del profesor es posterior y dice “el resto, hasta ahí van bien”, ese es el criterio que se ha seguido para organizar el repositorio.

## Recomendación

Antes de la sustentación, conviene:

1. Complementar bibliografía y citas, tal como pidió el profesor.
2. Confirmar con él si el listado “Entregables mínimos” del módulo 7 aplica a esta entrega o si la retroalimentación lo sustituye.
3. Ajustar la denominación “matriz de consumo” por “cartera priorizada de medidas”, que es el término usado en el programa.
4. Revisar manualmente el PDF final para confirmar que incluye resumen, conclusiones, recomendaciones y referencias.
