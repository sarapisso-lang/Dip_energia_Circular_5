# Módulo 2 — Auditoría energética y análisis de datos

## 1. Objetivo

Conservar y organizar la fuente de datos, el procesamiento analítico y la visualización desarrollados a partir de la serie temporal real de la estación meteorológica INNOVATOR, de modo que el profesor pueda verificar el análisis sin reconstruirlo.

## 2. Descripción del contenido

El dataset original contiene 2.999 registros horarios entre el 7 de junio y el 10 de octubre de 2024, con variables de humedad foliar, lluvia, radiación, temperatura, humedad relativa, viento y punto de rocío. El notebook desarrolla limpieza, ingeniería de características, análisis exploratorio, regresión, clasificación, clustering y series temporales. El dashboard web reproduce el análisis en 11 pestañas y entrena modelos ligeros en el navegador.

## 3. Entregables exigidos

1. Informe de auditoría energética en PDF.
2. Matriz de consumo energético.
3. Conjunto de datos utilizado.
4. Código de análisis.
5. Notebook de Jupyter o Google Colab.
6. Tablero de indicadores.
7. Enlaces funcionales al dashboard.

## 4. Estructura de carpetas

```text
Modulo_2/
├── README.md
├── informe_auditoria/    Sin evidencia identificada (.gitkeep)
├── matriz_consumo/       Sin documento independiente (.gitkeep)
├── datasets/             Fuente de datos original
├── analisis/             Notebook y libro de laboratorio P4.1
└── dashboard/            Aplicación web estática y su documentación
```

## 5. Relación de archivos existentes

| Archivo | Ubicación | Contenido verificado |
|---|---|---|
| `BASE_DATOS_Estacion_Meteorologica_INNOVATOR_10102024.xlsx` | `datasets/` | Libro original de la estación (175.911 bytes). Nombre original: `BASE DATOS Estacion Meteorologica INNOVATOR - 10102024.xlsx`. No se alteró. |
| `web.ipynb` | `analisis/` | Notebook de 36 celdas con el flujo completo de ciencia de datos; usa la ruta `/content/BASE DATOS Estacion Meteorologica INNOVATOR - 10102024.xlsx` en Colab. |
| `Laboratorio_P4_1_Monitoreo_Agrometeorologico-v2.xlsx` | `analisis/` | Mapeo P4.1, balance de masa y energía, serie humedad foliar vs. humedad relativa. Contiene consumos por trama y registros de campo. |
| `dashboard/index.html` | `dashboard/` | Estructura de las 11 pestañas del tablero. |
| `dashboard/README.md` | `dashboard/` | Documentación original del dashboard: datos, modelos, métricas y funcionamiento. |
| `dashboard/js/data.js` | `dashboard/` | Dataset limpio embebido (`HOBO_DATA`). |
| `dashboard/js/dashboard.js` | `dashboard/` | Estadísticas, modelos, gráficas e interacción. |
| `dashboard/css/styles.css` | `dashboard/` | Estilos, temas y diseño responsive. |
| `dashboard/vendor/plotly.min.js` | `dashboard/` | Biblioteca Plotly incluida para funcionamiento sin conexión. |
| `dashboard/vercel.json` | `dashboard/` | Configuración de despliegue y cabeceras HTTP. |

## 6. Metodología y resultados documentados en los originales

La limpieza registra cabecera en la fila 2, fechas `dd/MM/yy`, decimales con coma, valores `-888.88` interpolados, lluvia nula en cero y duplicados eliminados. La documentación del dashboard reporta métricas de los modelos del navegador (R² 0,8460 en regresión; exactitud 92,00 % en clasificación) y advierte que difieren de las del notebook por el tipo de modelos y la partición. Estos valores se transcriben como consta en el archivo original; no se han recalculado.

## 7. Enlaces externos

No se encontró una URL pública funcional del dashboard. El archivo `vercel.json` indica configuración para Vercel, pero ningún documento registra el dominio resultante. El acceso disponible es local: abrir `dashboard/index.html` o servir la carpeta con un servidor estático.

## 8. Evidencias

La fuente de datos se conserva íntegramente en `datasets/`. El dashboard funciona sin conexión porque incorpora los datos y Plotly. No se han sustituido los resultados del notebook ni del tablero.

## 9. Estado de avance

**Pendiente de evidencias.** Hay dataset, notebook, libro de laboratorio y dashboard; faltan el informe de auditoría en PDF, una matriz de consumo energético identificada como tal y el enlace público al tablero.

## 10. Actividades pendientes

- Incorporar el informe de auditoría energética en PDF.
- Incorporar o designar formalmente la matriz de consumo energético; el libro de laboratorio P4.1 contiene datos de consumo, pero no está rotulado como la matriz exigida.
- Publicar el dashboard y documentar su URL en `../Evidencias/enlaces.md` y en este README.
- Confirmar si la ficha técnica de instrumentación del módulo 3 debe vincularse también a la auditoría energética.
