# Estado de avance y criterios de verificación

Fecha de la revisión: 17 de noviembre de 2026.

## 1. Criterios utilizados

| Estado | Criterio aplicado |
|---|---|
| Completo | El archivo o evidencia exigida existe, no está vacío y su contenido fue verificado en local, o el estudiante confirmó que el entregable ya fue entregado. |
| Pendiente de validación | El archivo existe, pero requiere confirmación docente o revisión manual de su contenido. |
| Pendiente de verificación | Existe evidencia parcial; no se puede afirmar que el módulo cumple todos los requisitos. |
| No encontrado | No se identificó ningún archivo con ese entregable. |

## 2. Estado por entrega

| Entrega | Estado | Fundamento |
|---|---|---|
| Módulo 1 | Pendiente de verificación | Mapa, matriz y formulación presentes. Sin árbol de causas/efectos ni árbol de objetivos identificados. |
| Módulo 2 | Completo | Dashboard de 11 pestañas, código local y despliegue público verificado en Vercel. Según la retroalimentación docente, dashboard y despliegue eran el requisito de este módulo. |
| Módulo 3 | Completo | El estudiante confirmó que los entregables ya están en la ubicación en que los entregó. Se conserva la ficha técnica de instrumentación como soporte verificado. |
| Módulo 4 | Completo | El estudiante confirmó que los entregables ya están en la ubicación en que los entregó. Se conserva el documento de cinco KPI como soporte verificado. |
| Módulos 5 y 6 | Completo | Ficha técnica PDF presente como único entregable de la carpeta conjunta; captura de recursos enlazada desde `Evidencias/capturas/` sin añadir archivos a esta carpeta. |
| Módulo 7 | Completo | Documento final PDF, anexo de IA/cronograma y bibliografía con citas sugeridas presentes. La inserción física de las citas en el PDF es una revisión manual optativa. |

## 3. Decisiones de organización

1. **Módulos 5 y 6 agrupados.** Se creó únicamente `Entrega/Modulo_5_y_6/`, con `README.md` y `Ficha_Tecnica/ficha_tecnica.pdf`. No hay carpetas independientes ni entregables adicionales en esa ubicación.
2. **Ficha PDF preservada.** Se conservó el contenido del PDF original `Ficha_Tecnica_Asistente_RAG_Local_Modulo5.pdf`; solo se ajustó el nombre a `ficha_tecnica.pdf`, según la estructura solicitada.
3. **Documento Excel del profesor.** La transcripción registra que pidió «una tablita de Excel: la ficha técnica de los modelos» y el cronograma. Ese archivo se conserva en `Entrega/Modulo_7/anexos/` para no introducir un segundo entregable en la carpeta conjunta de los módulos 5 y 6.
4. **Sin conversiones simuladas.** No se convirtieron archivos para simular entregables, ni se elaboraron cálculos, datos ni conclusiones nuevos. La bibliografía se transcribió de documentos originales y se entregó como complemento; no se insertó en el PDF final porque el extractor disponible no recuperó su texto de forma confiable.
5. **Versiones.** Se priorizó la versión consolidada o `Final` cuando estaba identificada. Las versiones previas permanecen en la carpeta de origen del estudiante y se enumeran en el inventario.
6. **Sin secretos.** No se copiaron instaladores, llaves, tokens, contraseñas ni entornos virtuales.
7. **Sin carpetas vacías.** Se retiraron los marcadores `.gitkeep` y los directorios que no contenían archivos. La única carpeta añadida es `Entrega/Modulo_7/referencias/`, necesaria para agrupar la bibliografía y sus cinco documentos fuente.

## 4. Observaciones finales

- Si el profesor exige citas insertadas físicamente en el PDF, puede usarse el mapa de `Entrega/Modulo_7/referencias/bibliografia_y_citas.md` como guía de edición manual.
- La formulación menciona un sensor de pH edáfico que no aparece en la ficha de ocho equipos; se conservan ambos documentos sin modificar.
- La ubicación definitiva del Excel de modelos de IA y cronograma puede confirmarse con el profesor; por ahora permanece como anexo del módulo 7.
- No se reportan módulos 2, 3 ni 4 sin entregables conforme a la retroalimentación docente y las aclaraciones del estudiante.

## 5. Observaciones sobre el estado de publicación

La publicación se completó mediante autenticación web de GitHub CLI con la cuenta `jhosecuero-hue`. El repositorio se creó inicialmente como privado y, por indicación expresa del estudiante para que los profesores puedan revisarlo, se cambió a **público**.

GitHub no admite espacios en los identificadores de repositorio: el nombre solicitado «Diplomado energia circular» quedó registrado como `Diplomado-energia-circular`. URL definitiva: https://github.com/jhosecuero-hue/Diplomado-energia-circular. La rama `main` fue subida y está configurada para seguir a `origin/main`.
