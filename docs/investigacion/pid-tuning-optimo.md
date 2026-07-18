# PID Tuning óptimo

!!! info "Ficha del tema"
    **Objetivo:** encontrar un método de sintonización de PID que dé buen
    seguimiento de velocidad/trayectoria sin sobreimpulso ni oscilaciones,
    aplicable dentro del subsistema Vehicle Control del Driver Model.
    **Estado:** Pendiente
    **Relacionado con:** `DriverModel.slx` → subsistema Vehicle Control
    (cálculo de Gas/Brake/Steering)

---

## Por qué nos importa

El único subsistema del `DriverModel.slx` que podemos modificar es **Vehicle
Control** — ahí es donde se calculan las salidas finales de Gas, Brake y
Steering Angle. Si esa lógica usa control PID (por ejemplo para seguir una
velocidad objetivo o corregir el error lateral respecto a la trayectoria del
Road Sensor), la calidad de la sintonización impacta directo en el tiempo de
vuelta y en no tocar conos — que es literalmente el criterio de puntuación
del challenge.

---

## Ideas propias / hipótesis a probar

- Partir de sintonización manual (regla de Ziegler-Nichols u otra heurística
  clásica) como punto de partida, y después ajustar a mano observando el
  comportamiento en el TestRun.
- Probar la app **PID Tuner** de MATLAB/Simulink sobre un modelo linealizado
  simplificado del lazo, si se puede extraer uno razonable del vehículo.
- Evaluar si conviene un PID único o ganancias distintas para distintos
  tramos de velocidad/curvatura (gain scheduling), dado que el Road Sensor
  da look-ahead a 3 distancias distintas (2m, 15m, 75m).
- Usar el dashboard de [telemetría en vivo](../../implementacion/telemetrialive.md)
  para medir sobreimpulso, tiempo de establecimiento y error en régimen
  permanente directamente sobre datos reales de la simulación, en vez de
  solo mirar el tiempo de vuelta final.

---

## Papers relacionados

| Título | Autores / Año | Página |
|---|---|---|
| *(pendiente)* | | |

---

## Qué vamos a implementar

*(pendiente — se completa una vez que se pruebe la primera sintonización y se
decida el método definitivo)*
