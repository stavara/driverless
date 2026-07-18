# MATLAB / Simulink — Configuración (IPG Driverless Challenge)

Requisitos de MATLAB y troubleshooting específico de la integración
CarMaker ↔ Simulink (CM4SL) para el Driverless Challenge.

---

## 1. Versión requerida

El handbook oficial del Driverless Challenge especifica:

> "Driver model: Implemented in **Simulink R2024b** (MathWorks MATLAB)"

- Necesitás **MATLAB R2024b con Simulink**.
- Sistema operativo recomendado: **Windows 11** — la evaluación oficial de
  los modelos se hace ahí, aunque puedas desarrollar en otro OS. Sos
  responsable de que tu modelo funcione en ese entorno.
- Cada equipo debe tener licencias válidas tanto de **CarMaker** como de
  **MATLAB/Simulink**.

!!! info "Por qué importa la versión exacta"
    La carpeta `CM4SL` de tu instalación de CarMaker tiene subcarpetas por
    versión de MATLAB (por ejemplo `CM4SL/R2024b/`). Si tenés otra versión de
    MATLAB instalada, esa subcarpeta puede no existir y `cmenv` va a fallar
    al intentar agregarla al path.

## 2. Compilador requerido (MSYS/MinGW)

`CarMaker for Simulink` (CM4SL) compila tu modelo Simulink en una S-function
para co-simular con CarMaker, y eso requiere un compilador de C/C++
configurado en MATLAB. Instalá el toolchain **MSYS/MinGW** con el IPG
Installer.

Podés confirmar que MATLAB tiene un compilador configurado corriendo:

```matlab
mex -setup
```

## 3. Paso obligatorio: editar `cmenv.m` (14.1 → 14.1.1)

!!! danger "Hace falta para todo el equipo, no es un caso raro"
    El `cmenv.m` que viene en el paquete del Driverless Challenge está
    armado apuntando a **CarMaker 14.1**. Pero lo que efectivamente se
    descarga e instala hoy es la **14.1.1** (patch/hotfix de la misma serie,
    totalmente compatible — no es una versión distinta). Como el nombre de
    carpeta no coincide (`win64-14.1` vs `win64-14.1.1`), si no editás el
    archivo, `cmenv` va a tirar error apenas lo corras.

**Antes de correr `cmenv` por primera vez:**

1. Abrí el archivo (carpeta `src_cm4sl` del proyecto):
   ```matlab
   edit cmenv.m
   ```
2. Buscá la línea que arma la ruta de instalación, similar a:
   ```matlab
   cminstdir = 'C:/IPG/carmaker/win64-14.1';
   ```
3. Agregale el `.1` que falta al final de la versión:
   ```matlab
   cminstdir = 'C:/IPG/carmaker/win64-14.1.1';
   ```
4. Guardá el archivo.

!!! tip "Si tenés más de una referencia a la versión en el archivo"
    Buscá (Ctrl+F) todas las apariciones de `14.1` dentro de `cmenv.m` y
    confirmá que ninguna quede sin el `.1` final — a veces la ruta aparece
    más de una vez (por ejemplo, en la lógica de detección con
    `cmlocaldir`, ver sección 5).

---

## 4. Flujo de trabajo estándar

En el **Command Window** de MATLAB, parado en la carpeta `src_cm4sl` del
proyecto:

```matlab
cmenv
DriverModelParameters
open('DriverModel.slx')
```

Salida esperada de `cmenv` cuando todo está bien configurado (sin errores en
rojo):

```
CarMaker directory: C:/IPG/carmaker/win64-14.1.1
addpath C:/IPG/carmaker/win64-14.1.1/Matlab
addpath C:/IPG/carmaker/win64-14.1.1/Matlab/R2024b
addpath C:/IPG/carmaker/win64-14.1.1/CM4SL
addpath C:/IPG/carmaker/win64-14.1.1/CM4SL/R2024b
```

---

## 5. Troubleshooting

!!! failure "`cmenv` da error: \"Unable to find specified CarMaker installation directory\" (busca `win64-14.1` en vez de `win64-14.1.1`)"
    Si ya hiciste el paso obligatorio de la sección 3 y sigue fallando, puede
    haber una **segunda** fuente de la ruta vieja: un archivo
    **`cmlocaldir.m`** en tu MATLAB path (de otro proyecto o plantilla
    anterior), que tiene prioridad sobre la ruta definida en `cmenv.m`:

    ```matlab
    if isempty(which('cmlocaldir'))
        cminstdir = 'C:/IPG/carmaker/win64-14.1.1';  % lo que edita el paso 3
    else
        cminstdir = cmlocaldir   % esta funcion GANA si existe en el path
    end
    ```

    **Solución:**

    1. En MATLAB, corré:
       ```matlab
       which cmlocaldir
       ```
    2. Si devuelve una ruta, abrí ese archivo y corregilo igual que en el
       paso 3:
       ```matlab
       function d = cmlocaldir
       d = 'C:/IPG/carmaker/win64-14.1.1';
       ```
    3. Guardá y volvé a correr `cmenv`.

    **Alternativa:** si no necesitás ese `cmlocaldir.m` (resabio de un
    proyecto viejo), sacalo del MATLAB path — click derecho sobre la carpeta
    que lo contiene → *Remove from Path*.

!!! failure "Error de compilación al abrir/correr `DriverModel.slx`"
    Verificá que el toolchain **MSYS/MinGW** esté instalado (sección 2) y
    que `mex -setup` detecte un compilador válido.

!!! failure "`cmenv` no encuentra la carpeta `CM4SL/R2024b`"
    Confirmá que tenés instalado **MATLAB R2024b** específicamente (sección
    1) — otras versiones de MATLAB no tienen esa subcarpeta generada dentro
    de la instalación de CarMaker.
