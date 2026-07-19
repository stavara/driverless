# Telemetría en vivo de CarMaker

App de escritorio para telemetría en tiempo real, cronometraje de
vueltas/sectores, mapa del track en vivo y análisis — conectada directo por
TCP a CarMaker, **sin navegador ni servidor intermedio**.

!!! info "Reemplaza a la versión anterior basada en navegador"
    Esta app (PyQt5 + pyqtgraph) reemplaza al dashboard web
    (`carmaker_bridge.py` + `dashboard.html` + `http.server`) que usábamos
    antes. Es un solo programa, más simple de correr y con funciones nuevas
    (mapa del track, modo demo, persistencia de vueltas entre sesiones).

---

## Descargar

[Descargar la app de telemetría (.zip)](downloads/carmaker-dashboard.zip)

!!! warning "Ruta asumida — ajustar si es distinta"
    Este link asume que subiste el `.zip` a
    `docs/implementacion/downloads/carmaker-dashboard.zip`. Si le pusiste
    otro nombre o lo guardaste en otra carpeta, avisame el nombre/ruta real
    y actualizo el link.

---

## 1. Componentes

Todos estos archivos van **en la misma carpeta**:

| Archivo | Qué hace |
|---|---|
| `app.py` | La aplicación en sí (interfaz PyQt5 + gráficos pyqtgraph). Es lo que se ejecuta. |
| `carmaker_core.py` | Lógica pura de telemetría y cronometraje (máquina de estados esperando/corriendo, detección de vueltas/sectores). Sin dependencias de Qt ni de CarMaker — se puede testear sola. |
| `carmaker_client.py` | Cliente TCP hacia CarMaker (misma API que usa IPGControl) + un generador de datos sintéticos para modo demo. |
| `run_app.bat` | Lanzador para Windows: instala dependencias si faltan y corre `app.py`. |
| `requirements.txt` | Dependencias de Python: PyQt5, pyqtgraph, pycarmaker. |
| `track_autox_slim.json` / `track_endurance_slim.json` | Trazado y límites de sector de cada pista, extraídos de los `.rd5` del challenge — usados para dibujar el mapa y como respaldo del cronometraje. |
| `cm_dashboard_state.json` | Estado persistido: vueltas completadas, mejor vuelta. Se autoguarda cada 2 segundos. |
| `test_carmaker_core.py` | Tests de la lógica de cronometraje con datos sintéticos (no necesita CarMaker corriendo). |

---

## 2. Configuración inicial

### 2.1 Dependencias de Python

`run_app.bat` las instala solo la primera vez. Si preferís hacerlo a mano:

```powershell
pip install -r requirements.txt
```

(instala PyQt5, pyqtgraph, y pycarmaker desde su repositorio de GitHub)

### 2.2 Habilitar el puerto TCP de CarMaker

La app se conecta a CarMaker por el mismo puerto TCP que usa IPGControl —
que **no está habilitado por defecto**. Esto se configura del lado de
MATLAB, ya documentado en detalle en
[MATLAB / Simulink — Configuración](instalacionmatlab.md#5-habilitar-acceso-externo-puerto-tcp):

```matlab
CMData.GuiArgs = {'-apphost', 'localhost', '-cmdport', '16660'};
```

Agregá esa línea al final de tu `cmenv.m` para que se configure sola cada
sesión — ver el link de arriba para el detalle completo y el troubleshooting
de esa parte.

!!! tip "No hace falta CarMaker corriendo para probar la app"
    Si el puerto no está disponible (CarMaker cerrado, o el puerto mal
    configurado), la app arranca igual en **modo demo** con datos
    sintéticos — ver sección 5.

---

## 3. Arrancar una sesión

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

### Paso 3 — Correr la app

Doble click en `run_app.bat`, o desde PowerShell:

```powershell
python app.py
```

Si conecta bien a CarMaker, el indicador de estado arriba a la derecha
muestra **"● en vivo"**. Si no pudo conectar, arranca en modo demo
(ver sección 5).

---

## 4. Uso de la app

### Pestaña "En vivo"

8 KPIs (velocidad, volante, gas, freno, vuelta actual, última vuelta, mejor
vuelta, delta vs. mejor) + 6 mini-gráficos en tiempo real: velocidad,
aceleración longitudinal y lateral, yaw rate, slip angle, volante.

### Pestaña "Vueltas y Mapa"

- **Selector de pista**: Autocross (5 vueltas) o Endurance (10 vueltas).
- **Mapa del track** con la posición del auto en vivo (punto rojo) y una
  estela de su recorrido reciente, más los marcadores de meta y de los 3
  sectores.
- **Tabla de vueltas**: sector 1/2/3, total y conos tocados de cada vuelta
  completada, con la vuelta en curso resaltada en amarillo, y la mejor
  vuelta marcada.
- **Exportar CSV de vueltas** y **Borrar historial de vueltas**.

### Pestaña "Análisis"

- **Canales**: checkboxes para elegir cuáles graficar (por defecto
  Velocidad y Volante).
- **Ventana**: 10s / 30s / 60s / Todo.
- **● En vivo / ⏸ Pausado**: mismo comportamiento que la versión web — pausa
  congela la vista sin dejar de grabar en segundo plano.
- **Exportar CSV** de todo el historial grabado, y **Limpiar historial**.

---

## 5. Modo demo

Si `pycarmaker` no está instalado, o no se puede conectar al puerto TCP de
CarMaker, la app **arranca igual**, mostrando un aviso amarillo
("MODO DEMO — no se pudo conectar a CarMaker, mostrando datos sintéticos")
y generando una vuelta simulada en loop. Sirve para:

- Probar/desarrollar la interfaz sin tener CarMaker corriendo.
- Confirmar que la instalación de Python está bien, antes de meterse a
  depurar la conexión real.

---

## 6. Cronometraje: cómo funciona por dentro

La máquina de estados de `carmaker_core.py` resuelve varios casos reales que
antes daban problemas en la versión web:

- **Espera al arranque real**: no arma el cronómetro hasta que `Time`
  efectivamente avanza (ignora el valor "congelado" que CarMaker deja antes
  de darle Play).
- **Pausa/Stop**: si `Time` se congela unas lecturas seguidas, vuelve a
  "esperando" pero **conserva las vueltas ya completadas** — solo descarta
  la vuelta/sector en curso.
- **Corrida nueva**: si `Time` salta hacia atrás de golpe (más de 1
  segundo), asume que es una corrida nueva desde el Test Manager y **borra
  todo** el historial.
- **Sector con respaldo**: si la quantity custom `current_sector` no
  responde (el caso conocido de nuestro proyecto — ver
  [Instalación de CarMaker](instalacioncarmaker.md)), calcula el sector
  usando `Vhcl.sRoad` contra los límites de sector guardados en el JSON de
  cada pista.

---

## 7. Troubleshooting

!!! failure "La app arranca en modo demo aunque CarMaker esté corriendo"
    Repasá la sección 2.2 — el puerto TCP no está habilitado. Confirmá con:
    ```powershell
    netstat -an | findstr 16660
    ```

!!! failure "`ModuleNotFoundError: No module named 'PyQt5'` (o pyqtgraph/pycarmaker)"
    Corré `run_app.bat` (instala todo solo) o `pip install -r requirements.txt`
    a mano.

!!! failure "El mapa no muestra la posición del auto"
    La app necesita las quantities `Car.tx` y `Car.ty`. Si tu proyecto usa
    otros nombres, ajustalos en `_update_car_dot` dentro de `app.py`.

!!! failure "Las vueltas no se guardan entre sesiones"
    Confirmá que `cm_dashboard_state.json` esté en la misma carpeta que
    `app.py` y que la app tenga permiso de escritura ahí.

---

## Ver también

- [Implementación](index.md)
- [Instalación de CarMaker](instalacioncarmaker.md)
- [MATLAB / Simulink — Configuración](instalacionmatlab.md)
