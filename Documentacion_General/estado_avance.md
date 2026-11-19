# Estado de avance y contenido de los módulos

Fecha de la confirmación: 19 de noviembre de 2026.

## 1. Criterio utilizado

| Estado | Criterio aplicado |
|---|---|
| Completo | El entregable existe, no está vacío y su contenido fue verificado en local, o el estudiante confirmó que ya fue entregado conforme a la retroalimentación del profesor. |

## 2. Estado y contenido por entrega

| Entrega | Estado | Contenido verificado |
|---|---|---|
| Módulo 1 | Completo | Documento consolidado, mapa territorial argumentado en PDF e imagen, matriz normativa en PDF, ficha del problema y formulación orientadora. |
| Módulo 2 | Completo | Dataset original de 2.999 registros, notebook de análisis, laboratorio P4.1, dashboard de 11 pestañas y despliegue público verificado en Vercel. |
| Módulo 3 | Completo | Ficha técnica de instrumentación con los ocho equipos de la estación, comunicaciones LoRaWAN, respaldo MicroSD y sistema solar off-grid. |
| Módulo 4 | Completo | Documento de cinco KPI con fórmula, unidad, meta y frecuencia de evaluación. |
| Módulos 5 y 6 | Completo | Ficha técnica del asistente RAG local, como única entrega de la carpeta conjunta, con captura de recursos enlazada desde `Evidencias/capturas/`. |
| Módulo 7 | Completo | Documento final en PDF, ficha de modelos de IA y cronograma como anexo, y bibliografía con citas sugeridas. |

**Los siete módulos académicos están completos.** No se reportan entregables incumplidos conforme a la retroalimentación docente y a la confirmación del estudiante.

## 3. Decisiones de organización

1. **Módulos 5 y 6 agrupados.** Se creó únicamente `Entrega/Modulo_5_y_6/`, con `README.md` y `Ficha_Tecnica/ficha_tecnica.pdf`. No hay carpetas independientes ni entregables adicionales en esa ubicación.
2. **Ficha PDF preservada.** Se conservó el contenido del PDF original `Ficha_Tecnica_Asistente_RAG_Local_Modulo5.pdf`; solo se ajustó el nombre a `ficha_tecnica.pdf`, según la estructura solicitada.
3. **Documento Excel del profesor.** La transcripción registra que pidió «una tablita de Excel: la ficha técnica de los modelos» y el cronograma. Ese archivo se conserva en `Entrega/Modulo_7/anexos/` para no introducir un segundo entregable en la carpeta conjunta de los módulos 5 y 6.
4. **Sin conversiones simuladas.** No se convirtieron archivos para simular entregables, ni se elaboraron cálculos, datos ni conclusiones nuevos. La bibliografía se transcribió de documentos originales y se entregó como complemento; no se insertó en el PDF final porque el extractor disponible no recuperó su texto de forma confiable.
5. **Fuentes de bibliografía depuradas.** En `Entrega/Modulo_7/referencias/` se conservan únicamente los dos documentos fuente relacionados con la estación, la serie temporal y la medición de lluvia. Sus hashes SHA256 están registrados en `bibliografia_y_citas.md`.
6. **Versiones.** Se priorizó la versión consolidada o `Final` cuando estaba identificada. Las versiones previas permanecen en la carpeta de origen del estudiante y se enumeran en el inventario.
7. **Sin secretos.** No se copiaron instaladores, llaves, tokens, contraseñas ni entornos virtuales.
8. **Sin carpetas vacías.** Se retiraron los marcadores `.gitkeep` y los directorios que no contenían archivos.

## 4. Confirmación final

- Dashboard verificado en https://dashboard-meteorologico-ivory.vercel.app/.
- Ficha técnica de los módulos 5 y 6 presente como entrega conjunta.
- Ficha de modelos de IA y cronograma presentes como anexo del módulo 7.
- Captura de recursos computacionales publicada en `Evidencias/capturas/` y enlazada desde los README.
- Bibliografía y mapa de citas disponibles en `Entrega/Modulo_7/referencias/bibliografia_y_citas.md`.
- Repositorio público en https://github.com/jhosecuero-hue/Diplomado-energia-circular.

La inserción física de las citas dentro del PDF queda como revisión manual optativa si el profesor la solicita; no afecta el estado completo de la entrega.

## 5. Observaciones sobre el estado de publicación

La publicación se completó mediante autenticación web de GitHub CLI con la cuenta `jhosecuero-hue`. El repositorio se creó inicialmente como privado y, por indicación expresa del estudiante para que los profesores puedan revisarlo, se cambió a **público**.

GitHub no admite espacios en los identificadores de repositorio: el nombre solicitado «Diplomado energia circular» quedó registrado como `Diplomado-energia-circular`. URL definitiva: https://github.com/jhosecuero-hue/Diplomado-energia-circular. La rama `main` fue subida y está configurada para seguir a `origin/main`.
