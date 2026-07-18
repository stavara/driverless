# Telemetría en vivo de CarMaker

Dashboard de telemetría en tiempo real para simulaciones de CarMaker (Formula
Student Driverless), con vista en vivo y una pestaña de análisis con selector
de canales, medición A/B, diagrama G-G y exportación a CSV.

!!! info "Componentes"
    - **`carmaker_bridge.py`** — se conecta a CarMaker por TCP (puerto 16660)
      y reenvía las variables por WebSocket.
    - **`dashboard.html`** — el dashboard que corre en el navegador, servido
      localmente por HTTP.

---

## 1. Configuración inicial

Esto se hace **una sola vez** por máquina.

### 1.1 Dependencias de Python

```powershell
pip install websockets
pip install https://github.com/gmnvh/pycarmaker/archive/refs/heads/master.zip
```

!!! warning "Sin Git"
    Si `pip install git+https://...` falla porque no tenés Git instalado en
    Windows, usá la URL directa al `.zip` como en el comando de arriba —
    no hace falta Git para eso.

### 1.2 Habilitar el puerto TCP de CarMaker automáticamente

CarMaker no expone el puerto TCP por defecto, ni siquiera si la simulación
está corriendo. Hay que decirle explícitamente que lo habilite al arrancar.

Abrí tu `cmenv.m` (carpeta `src_cm4sl` del proyecto):

```matlab
edit cmenv.m
```

Agregá esta línea al final del archivo y guardá:

```matlab
CMData.GuiArgs = {'-apphost', 'localhost', '-cmdport', '16660'};
```

Con esto, cada vez que corrés `cmenv`, CarMaker se abre con el puerto **16660**
ya habilitado para que `carmaker_bridge.py` se pueda conectar.

!!! tip "Por qué hace falta"
    `CarMaker for Simulink` (el botón *Open CarMaker GUI*) lanza `CM_Office.exe`
    sin argumentos extra. La única forma soportada de pasarle flags de arranque
    (como `-cmdport`) es a través de la variable `CMData.GuiArgs` en MATLAB,
    definida *antes* de abrir la GUI.

### 1.3 Confirmar los nombres de las variables (quantities)

Los nombres de las señales que lee el dashboard están en `QUANTITY_NAMES`
dentro de `carmaker_bridge.py`. Si tu proyecto usa otros nombres, revisalos
en el archivo `OutputQuantities` (Infofile del proyecto) o en IPGControl.

---

## 2. Arrancar una sesión

### Paso 1 — MATLAB (Command Window)

```matlab
cmenv
DriverModelParameters
open('DriverModel.slx')
```

### Paso 2 — Simulink

1. Click en **"Open CarMaker GUI"**.
2. Cargar el TestRun deseado.
3. Click en **Start**.

### Paso 3 — Puente a CarMaker (PowerShell, terminal 1)

!!! note "Ruta del proyecto"
    Reemplazá `<ruta-a-tu-carpeta-del-proyecto>` por la carpeta donde tengas
    guardados `carmaker_bridge.py` y `dashboard.html`.

```powershell
cd "<ruta-a-tu-carpeta-del-proyecto>"
python carmaker_bridge.py
```

Salida esperada:

```
TCP socket connected
Conectado a CarMaker y suscripto a N quantities
Servidor WebSocket escuchando en ws://localhost:8765
```

### Paso 4 — Servidor del dashboard (PowerShell, terminal 2)

```powershell
cd "<ruta-a-tu-carpeta-del-proyecto>"
python -m http.server 8000
```

### Paso 5 — Navegador

```
http://localhost:8000/dashboard.html
```

!!! danger "No abrir el .html directo"
    Abrirlo con doble click lo carga con protocolo `file://`, lo que puede
    causar comportamientos inconsistentes del navegador. Usá siempre la URL
    `http://localhost:8000/...` servida por `http.server`.

---

## 3. Uso del dashboard

### Pestaña "En vivo"

KPIs y mini-gráficos en tiempo real:

- Velocidad, aceleración longitudinal y lateral
- Yaw rate y slip angle (para detectar sobre/subviraje)
- Volante, gas y freno
- Diagrama **G-G** (uso del círculo de fricción del auto)
- Tiempo de sector, última vuelta, mejor vuelta y delta

### Pestaña "Análisis"

| Control | Qué hace |
|---|---|
| **Canales** | Elegís 2 o más para comparar, apilados con el mismo eje de tiempo |
| **Ventana rápida** | 10s / 30s / 60s / Todo el historial grabado |
| **Rango exacto** | Campos "desde → hasta" en segundos de simulación + botón Aplicar |
| **● En vivo / ⏸ Pausado** | Alterna entre seguir el presente o congelar la vista. El historial se sigue grabando igual, aunque esté pausado |
| **Slider** | Recorre manualmente el historial grabado (pausa automáticamente al moverlo) |
| **Medir (A/B)** | Clickeás dos puntos en cualquier gráfico y te muestra el Δtiempo y el Δvalor exacto de cada canal entre esos dos instantes |
| **Exportar CSV** | Descarga todo el historial grabado para analizar offline |
| **Limpiar historial** | Borra el buffer grabado y reinicia mejor vuelta / delta |

!!! note "En vivo después de pausar"
    Al volver a "En vivo", el dashboard salta al **presente** — no reproduce
    lo que pasó durante la pausa (igual que MoTeC i2 / AiM RaceStudio). Ese
    tramo no se pierde: sigue en el historial grabado, así que podés
    recuperarlo con el slider, con un rango exacto, o viendo "Todo".

---

## 4. Troubleshooting

!!! failure "`ConnectionRefusedError` al correr `carmaker_bridge.py`"
    El puerto TCP de CarMaker no está habilitado. Verificá que
    `CMData.GuiArgs` se haya ejecutado **antes** de abrir CarMaker GUI
    (sección 1.2).

!!! failure "`netstat -an | findstr 16660` no muestra nada"
    El puerto nunca se abrió. Confirmá que corriste `cmenv` con la línea de
    `CMData.GuiArgs` ya agregada, y que abriste CarMaker *después* de eso.

!!! failure "Warning `Quantity 'X' invalida o sin datos`"
    El nombre de esa variable no existe en tu proyecto. Revisá el nombre real
    en `OutputQuantities` o en IPGControl, y corregilo en `QUANTITY_NAMES`
    dentro de `carmaker_bridge.py`.

!!! failure "Dashboard no conecta / gráficos vacíos"
    Probablemente lo abriste con `file://` en vez de `http://`. Usá siempre
    `http://localhost:8000/dashboard.html`.

!!! failure "El eje de tiempo se ve raro (números repetidos)"
    Pasa cuando la simulación se reinicia y `Time` retrocede. El dashboard ya
    detecta este salto y limpia los gráficos automáticamente.

---

## 5. Notas técnicas

- El bridge lee las variables a 20 Hz (`READ_HZ` en `carmaker_bridge.py`).
- El buffer de historial en el navegador guarda hasta ~12.000 muestras
  (~10 minutos a 20 Hz), configurable con `MAX_SAMPLES` en `dashboard.html`.
- Todo el tráfico queda en `localhost`; no se expone nada fuera de la PC.
