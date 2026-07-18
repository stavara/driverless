Punto de entrada a toda la documentación de CarMaker del equipo: instalación,
configuración de MATLAB/Simulink, y herramientas propias (telemetría, etc.)
para el **IPG Driverless Challenge**.

Esta página se actualiza cada vez que se agrega una página nueva — es el
único lugar que hay que mirar para saber qué documentación existe.

---

## 🔧 Puesta en marcha

Seguir en este orden la primera vez que se configura una PC nueva.

| # | Página | Qué resuelve |
|---|---|---|
| 1 | [Instalación de CarMaker](instalacioncarmaker.md) | Registro en el programa Formula CarMaker, instalación de CarMaker/Office, licencia, firewall, MSYS/MinGW, y qué archivos del challenge se descargan aparte |
| 2 | [MATLAB / Simulink — Configuración](instalacionmatlab.md) | Versión de MATLAB requerida (R2024b), el ajuste obligatorio de `cmenv.m` (14.1 → 14.1.1), y troubleshooting de `cmenv`/`cmlocaldir` |

---

## 📊 Herramientas del equipo

Cosas que armamos nosotros, además de lo que instala IPG.

| # | Página | Qué resuelve |
|---|---|---|
| 1 | [Telemetría en vivo de CarMaker](telemetrialive.md) | Dashboard en el navegador: datos en vivo, diagrama G-G, pestaña de análisis con selector de canales, medición A/B y exportación a CSV |

---

## 🗺️ Cómo se relacionan

```
Instalación de CarMaker  →  MATLAB / Simulink — Configuración  →  Telemetría en vivo
   (una sola vez)              (una sola vez)                      (cada sesión)
```

1. **Instalación** — se hace una vez por PC nueva.
2. **MATLAB / Simulink** — se hace una vez, pero hay que volver a revisarla
   si el equipo actualiza de versión de CarMaker o de MATLAB.
3. **Telemetría en vivo** — es la rutina de cada sesión de trabajo, una vez
   que lo anterior ya está resuelto.
