# Estado de avance y criterios de verificación

Fecha de la revisión: 17 de noviembre de 2026.

## 1. Criterios utilizados

| Estado | Criterio aplicado |
|---|---|
| Completo | El archivo exigido existe, no está vacío y su contenido fue verificado en local. |
| Pendiente de validación | El archivo existe, pero requiere confirmación docente o revisión manual de su contenido. |
| Pendiente de verificación | Existe evidencia parcial; no se puede afirmar que el módulo cumple todos los requisitos. |
| Pendiente de evidencias | No se encontró el archivo o enlace correspondiente en los materiales disponibles. |
| No encontrado | No se identificó ningún archivo con ese entregable. |
| No iniciado | No aplica actualmente a ninguna entrega con archivos incorporados. |

## 2. Estado por entrega

| Entrega | Estado | Fundamento |
|---|---|---|
| Módulo 1 | Pendiente de verificación | Mapa, matriz y formulación presentes. Sin árbol de causas/efectos ni árbol de objetivos identificados. |
| Módulo 2 | Pendiente de evidencias | Dataset, notebook, laboratorio y dashboard presentes. Sin informe de auditoría, matriz de consumo designada ni URL pública. |
| Módulo 3 | Pendiente de verificación | Ficha de instrumentación presente. Sin documento PDF integral con los catorce apartados. |
| Módulo 4 | Pendiente de evidencias | Cinco KPI documentados. Sin mapa circular, LCI, huella de carbono ni modelo de intervención. |
| Módulos 5 y 6 | Completo | Ficha técnica PDF presente como único entregable de la carpeta conjunta. |
| Módulo 7 | Pendiente de verificación | Documento final y anexo presentes. Requisitos académicos incompletos en la transcripción. |

## 3. Decisiones de organización

1. **Módulos 5 y 6 agrupados.** Se creó únicamente `Entrega/Modulo_5_y_6/`, con `README.md` y `Ficha_Tecnica/ficha_tecnica.pdf`. No hay carpetas independientes ni entregables adicionales en esa ubicación.
2. **Ficha PDF preservada.** Se conservó el contenido del PDF original `Ficha_Tecnica_Asistente_RAG_Local_Modulo5.pdf`; solo se ajustó el nombre a `ficha_tecnica.pdf`, según la estructura solicitada.
3. **Documento Excel del profesor.** La transcripción registra que pidió «una tablita de Excel: la ficha técnica de los modelos» y el cronograma. Ese archivo se conserva en `Entrega/Modulo_7/anexos/` para no introducir un segundo entregable en la carpeta conjunta de los módulos 5 y 6. Su ubicación definitiva queda sujeta a confirmación.
4. **Sin conversiones simuladas.** No se convirtió el Excel a PDF para hacerlo pasar por el documento oficial, ni se elaboraron monitoras, cálculos ni citas nuevos.
5. **Versiones.** Se priorizó la versión consolidada o `Final` cuando estaba identificada. Las versiones previas permanecen en la carpeta de origen del estudiante y se enumeran en el inventario.
6. **Sin secretos.** No se copiaron instaladores, llaves, tokens, contraseñas ni entornos virtuales.

## 4. Pendientes globales

- Autenticar GitHub y publicar el repositorio privado **`Diplomado energia circular`** en la rama `main`.
- Añadir la URL definitiva del repositorio en el README principal y en `Evidencias/enlaces.md`.
- Completar los entregables marcados como no encontrados o pendientes de evidencias.
- Confirmar los requisitos del módulo 7 y complementar bibliografía y citas, según la recomendación docente.
- Revisar la coherencia entre los documentos que mencionan un sensor de pH edáfico y la ficha técnica de ocho equipos, que no lo incluye.
- Aportar capturas de evidencia de recursos computacionales y URL pública del dashboard si existen.

## 5. Observaciones sobre el estado de publicación

La publicación no se realizó durante la organización local porque no se detectó autenticación disponible: `gh` no está instalado, no hay credenciales Git configuradas, no hay llaves SSH ni sesión iniciada en el navegador. El repositorio queda listo para configurar remoto y hacer `push` una vez provista la autorización.
