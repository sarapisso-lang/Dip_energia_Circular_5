# Módulos 5 y 6 — Ficha técnica (entrega conjunta)

## 1. Identificación de la entrega

Los módulos 5 y 6 se entregan **conjuntamente** en esta única carpeta. No existen carpetas independientes `Modulo_5/` ni `Modulo_6/`.

**Único entregable requerido:** la ficha técnica solicitada por el profesor.

## 2. Objetivo

Conservar la ficha técnica del asistente de inteligencia artificial local con arquitectura RAG, que constituye la entrega conjunta de ambos módulos según la documentación disponible.

## 3. Descripción del contenido

El archivo `Ficha_Tecnica/ficha_tecnica.pdf` documenta:

- Arquitectura técnica del asistente RAG local: motor de inferencia, LLM, embeddings, base vectorial, estrategia de chunking y entorno de hardware.
- Corpus documental indexado: normativa colombiana, dataset INNOVATOR y memoria técnica del prototipo.
- Instrucción base del sistema para mitigar alucinaciones.
- Banco de pruebas de seis casos, incluidas dos pruebas de negativa correcta.
- Reporte de consumo de recursos computacionales y espacio reservado para la captura de evidencia del administrador de tareas.

Su título original es *Ficha técnica y bitácora de inferencia — Asistente RAG local (Módulo 5)*. El contenido se conserva sin modificación; únicamente se adoptó el nombre de archivo requerido en la estructura del repositorio.

## 4. Entregables exigidos

| Entregable | Situación |
|---|---|
| Ficha técnica (módulos 5 y 6) | Presente en `Ficha_Tecnica/ficha_tecnica.pdf` |

No se incluyen otros archivos en esta carpeta, de acuerdo con la regla de entrega conjunta.

## 5. Estructura de carpetas

```text
Modulo_5_y_6/
├── README.md
└── Ficha_Tecnica/
    └── ficha_tecnica.pdf
```

## 6. Relación de archivos existentes

| Archivo original | Archivo en el repositorio |
|---|---|
| `Ficha_Tecnica_Asistente_RAG_Local_Modulo5.pdf` | `Ficha_Tecnica/ficha_tecnica.pdf` |

## 7. Enlaces externos

No se registran enlaces externos en la ficha técnica. Las herramientas mencionadas (Ollama, AnythingLLM, LanceDB, ChromaDB) se citan como componentes, sin URL de descarga o documentación.

## 8. Evidencias

La bitácora de inferencia incluye seis pruebas y un espacio para captura del administrador de tareas. Dicha captura no se encuentra en el repositorio; el espacio reservado está en `../../Evidencias/capturas/`.

El documento complementario solicitado por el profesor — ficha de modelos de IA y cronograma en formato Excel — se conserva en `../Modulo_7/anexos/Ficha_Tecnica_Modelos_IA_y_Cronograma.xlsx` para no incorporar un segundo entregable en esta carpeta conjunta.

## 9. Estado de avance

**Completo**, respecto del único entregable definido para esta carpeta. Queda pendiente la validación docente de su contenido.

## 10. Actividades pendientes

- Confirmar con el profesor que la ficha PDF del asistente RAG es el único archivo esperado en la carpeta conjunta, o que debe complementarse con el documento Excel de modelos de IA y cronograma.
- Incorporar la captura del administrador de tareas a `Evidencias/capturas/` si se requiere como soporte de las métricas de CPU, RAM y VRAM.
- Verificar que las versiones de herramientas consignadas en la ficha coincidan con el entorno final utilizado.
