# Dashboard Meteorológico · Estación INNOVATOR

Réplica web autónoma del dashboard de 11 pestañas construido con Gradio en
`web.ipynb`. Es una página estática: no necesita Python, servidor ni conexión a
internet (Plotly y los datos están incluidos en el proyecto).

## Acceso en línea

- **Acceso directo al dashboard:** [dashboard-meteorologico-ivory.vercel.app](https://dashboard-meteorologico-ivory.vercel.app/)
- **Despliegue en Vercel:** [Ver despliegue en la plataforma](https://dashboard-meteorologico-ivory.vercel.app/)

Ambos enlaces apuntan al mismo despliegue; un clic redirige directamente a la plataforma.

## Cómo abrirla

Haz doble clic en `index.html` o arrástralo a cualquier navegador moderno
(Chrome, Edge, Firefox, Safari).

Si prefieres servirla localmente (por ejemplo, para probarla desde el móvil en
la misma red), desde esta carpeta:

```powershell
python -m http.server 8000
# o, si no tienes Python:
npx serve .
```

y abre `http://localhost:8000`.

## Contenido

| Pestaña | Contenido |
|---|---|
| 1 · Explicación | Contexto del proyecto, KPI generales y objetivos |
| 2 · DataFrame | Tabla completa de 2.999 registros con búsqueda y paginación |
| 3 · Estadísticas | Resumen descriptivo por variable, nulos y tipos |
| 4 · Univariado | Histogramas, boxplots y estadísticos por variable |
| 5 · Bivariado | Dispersión entre pares de variables y tendencia |
| 6 · Correlación | Matriz de correlación completa |
| 7 · Regresión | Regresión ridge de temperatura + simulador con sliders |
| 8 · Clasificación | Regresión logística de hoja mojada, matriz de confusión, ROC y simulador |
| 9 · Clustering | K-Means (k = 3) y perfil de cada clúster |
| 10 · Series temporales | Evolución horaria y modelo autorregresivo de 24 retardos |
| 11 · Conclusiones | Hallazgos, limitaciones y recomendaciones |

## Datos

- Fuente: `BASE DATOS Estacion Meteorologica INNOVATOR - 10102024.xlsx`.
- 2.999 registros horarios entre el **07-jun-2024** y el **10-oct-2024**.
- Limpieza aplicada (igual que el notebook): cabecera en la fila 2, fechas
  `dd/MM/yy`, decimales con coma y eliminación de filas vacías.
- Los datos ya limpios están embebidos en `js/data.js` (`HOBO_DATA`), por lo que
  la página funciona sin el Excel.

## Modelos

Los modelos se entrenan en el navegador la primera vez que abres su pestaña y
quedan cacheados. Se eligieron equivalentes ligeros a los del notebook porque
los artefactos de scikit-learn/Keras no están disponibles:

- **Regresión**: ridge con estandarización y partición 70 / 15 / 15.
- **Clasificación**: regresión logística con pesos de clase, umbral 0,5.
- **Clustering**: K-Means con k = 3 e inicialización determinista.
- **Series temporales**: autorregresivo con 24 retardos (sustituto funcional
  del LSTM del notebook).

Métricas que muestra la página con los datos reales:

| Modelo | Métrica | Valor |
|---|---|---|
| Regresión | R² | 0,8460 |
| Regresión | RMSE | 1,086 °C |
| Regresión | MAE | 0,814 °C |
| Regresión | MAPE | 5,07 % |
| Clasificación | Exactitud | 92,00 % |
| Clasificación | AUC ROC | 0,9830 |
| Series temporales | MAE | 0,837 °C |
| Series temporales | RMSE | 1,194 °C |

> Los valores pueden diferir de los del notebook (R² 0,7615; exactitud 91,56 %)
> porque allí se usaban modelos Keras y otra partición de entrenamiento.

## Funciones añadidas

- Cambio de tema claro/oscuro (se recuerda en el navegador).
- Descarga de la tabla filtrada en CSV.
- Búsqueda y paginación en las tablas.
- Enlaces directos: `index.html?tab=7&theme=dark`.
- Simuladores de regresión y clasificación con valores iniciales reales.

## Estructura

```
dashboard-meteorologico/
├── index.html          # estructura de las 11 pestañas
├── css/styles.css      # temas, tarjetas, tablas y diseño responsive
├── js/data.js          # dataset limpio embebido
├── js/dashboard.js     # estadísticas, modelos, gráficas e interacción
├── vendor/plotly.min.js
└── README.md
```

## Actualizar los datos

Sustituye el array `HOBO_DATA` de `js/data.js` manteniendo los nombres de campo
(`temp`, `hr`, `hum_foliar`, `radiacion`, `vel_viento`, `rafagas`, `lluvia`,
`dir_viento`, `pt_rocio`, `dif_rocio`, `hora_sin`, `hora_cos`, `hoja_mojada`,
`fecha`, `hora`, …). El resto se recalcula automáticamente.

## Notas

- No hay backend: todo el procesamiento ocurre en el navegador.
- La tipografía de Google Fonts es opcional; sin internet se usan las fuentes
  del sistema.
- Probado en Edge/Chrome de escritorio; el diseño se adapta a móvil
  (pestañas y tablas con desplazamiento horizontal).
