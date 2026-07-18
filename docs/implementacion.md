# Implementación

Documentación técnica del desarrollo de nuestro modelo de conductor autónomo (driver model) para IPG CarMaker / Simulink.

## Arquitectura del sistema

_Diagrama general del lazo de control: percepción → planificación de trayectoria → control lateral/longitudinal → actuación en CarMaker._

## Modelado del vehículo

- Función de transferencia / espacio de estados utilizado para representar la dinámica del vehículo.
- Parámetros identificados y su fuente (datasheet del modelo CarMaker, ensayos, etc.).

## Lazo de control

### Control longitudinal (velocidad)

- Estructura del controlador PID.
- Estrategia de anti-windup y saturación de actuador.
- Resultados de sintonización (Kp, Ki, Kd) y criterios usados (sobreimpulso, tiempo de establecimiento, error en régimen permanente).

### Control lateral (trayectoria)

- Enfoque utilizado (Pure Pursuit, Stanley, LQR, etc.).
- Parámetros y justificación.

## Discretización y solver

- Tipo de solver Simulink utilizado (paso fijo / variable) y su justificación.
- Tiempo de paso y su relación con los requisitos de tiempo real de CarMaker.

## Validación

- Escenarios de prueba (Autocross, Endurance).
- Métricas de desempeño registradas.

!!! tip "Edita esta página"
    Esta estructura está pensada para documentar el trabajo desarrollado siguiendo el flujo de sintonización PID y buenas prácticas de modelado en Simulink. Complétala a medida que avances en el proyecto.
