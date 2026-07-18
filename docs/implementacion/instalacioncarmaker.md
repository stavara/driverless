# Instalación de CarMaker (IPG Driverless Challenge — Formula Student)

Guía de instalación y licenciamiento de **CarMaker/Office** para el equipo,
enfocada en lo que hace falta específicamente para el **IPG Driverless
Competition** (control autónomo vía Simulink/CM4SL) — no cubre pasos que no
aplican a este caso de uso, como IPGKinematics o el setup de sistemas
Realtime/HIL. Basada en la documentación oficial de IPG Automotive
(`InstallationGuide.pdf`) y el material del programa Formula CarMaker.

!!! info "Requisito previo"
    Necesitás permisos de **administrador** en la PC donde vayas a instalar.

---

## 1. Registro en el programa Formula CarMaker

1. Registrate para la temporada vigente de Formula CarMaker en:
   [ipg-automotive.com — Formula CarMaker Registration](https://www.ipg-automotive.com/en/company/how-we-are-connected/investing-in-education/research-teaching/registration-formula-carmaker-program/)
2. Una vez aprobado el sponsorship y solicitadas las licencias, vas a recibir
   un login para el **FCM Customer Area**.
3. Descargá ahí la última versión de **CarMaker/Office**.

!!! success "No hace falta IPGKinematics para el Driverless Challenge"
    IPGKinematics sirve para modelar la **cinemática y compliance de la
    suspensión** (K&C) cuando el equipo diseña su propio auto físico. Para el
    **IPG Driverless Competition**, el vehículo (`IPG_Challenge_Car`) lo
    provee IPG Automotive ya armado y con sensores — vos solo entregás un
    modelo Simulink (Driver Model), no tocás nada del auto físico. Así que
    podés omitir la descarga/instalación de IPGKinematics sin problema.

!!! note "Licencia"
    Cada equipo recibe un archivo de licencia con **dos nodos registrados**
    (dos PCs distintas). La licencia queda atada a la información específica
    de cada PC, así que elegí bien las estaciones de trabajo antes de
    solicitarla — cambiarlas después no es trivial. La licencia es válida
    hasta el **31 de octubre** de la temporada en curso.

---

## 2. Instalación del software

1. Iniciá sesión como usuario con privilegios de administrador.
2. Extraé el paquete de instalación descargado (`.zip`).
3. Ejecutá `ipg-install.exe` (doble click).
4. Seguí las instrucciones del instalador (**IPGInstall**):
   - Elegí el directorio de destino — se recomienda `C:\IPG` (no es obligatorio,
     pero evita tener que ajustar manualmente las rutas de IPGKinematics más
     adelante).
   - Aceptá el acuerdo de licencia de usuario final.
   - **Windows + modelos en C**: si vas a implementar modelos basados en
     código C dentro de CarMaker, elegí el toolchain de compilador
     **MSYS/MinGW** durante la instalación.
5. Al finalizar, vas a tener un ícono de acceso directo en
   `Start > Programs > IPG > <Versión_Actual>`.

!!! tip "Dudas durante la instalación"
    El propio `.zip` de instalación incluye un `InstallationGuide.pdf` con el
    detalle paso a paso. Si algo no queda claro, el equipo de soporte de
    Formula CarMaker responde en `FormulaCarMaker@ipg-automotive.com`.

---

## 3. Archivo de licencia

Sin una licencia válida, CarMaker (y el resto de los productos IPG) no arrancan.

1. El archivo de licencia que te envía IPG debe llamarse exactamente
   **`Licenses`** (sin extensión) — o `Licenses.dat`.
2. Colocalo en la carpeta:
   ```
   C:\IPG\etc
   ```

!!! danger "Cuidado con la extensión del archivo"
    Muchos clientes de correo le agregan una extensión automáticamente
    (`.txt`, `.dat`) a archivos sin extensión. Si CarMaker tira el error
    **"License file not found"**, revisá esto primero. Para ver las
    extensiones reales en el Explorador de Windows: *Extras/Opciones de
    carpeta > Ver > desactivar "Ocultar extensiones de archivo conocidas"*.

---

## 4. Configuración del firewall

Los distintos componentes de CarMaker se comunican entre sí por red. En
Windows, el firewall se configura automáticamente durante la instalación,
pero si usás una versión más vieja o tenés problemas de conexión, confirmá
que estos ejecutables tengan permiso de comunicarse entre sí:

- `CarMaker.win64.exe` (o el ejecutable de CarMaker correspondiente)
- `ipg-control.exe`
- `apobrokerd.exe`
- `Movie.exe`
- `ipglockd.exe` (si usás licencia de servidor — puerto TCP 11010)

!!! tip "Relación con la telemetría en vivo"
    Esta misma lógica de puertos es la razón por la que hay que habilitar
    explícitamente el puerto **16660** para conectar herramientas externas
    (como nuestro dashboard de telemetría).

---

## 5. MSYS (necesario para CM4SL — CarMaker for Simulink)

A diferencia de IPGKinematics, **este sí lo necesitás**: `CarMaker for
Simulink` (CM4SL) compila tu modelo Simulink en una S-function para
co-simular con CarMaker, y ese proceso de compilación requiere un compilador
de C/C++ configurado en MATLAB. IPG recomienda el toolchain **MSYS/MinGW**
para Windows.

Instalalo con el mismo IPG Installer:

```
msys-2023-<version>.tgz
```

Esto:

- Se instala junto al directorio `IPGHOME`.
- Define la variable de entorno `MSYS_ROOT`.
- Crea un acceso directo en el menú de inicio, dentro de la carpeta `IPG`.

!!! tip "Verificación en MATLAB"
    Podés confirmar que MATLAB tiene un compilador configurado corriendo
    `mex -setup` en el Command Window.

---

## 5.1 Versión de MATLAB

El handbook oficial del Driverless Challenge especifica:

> "Driver model: Implemented in **Simulink R2024b** (MathWorks MATLAB)"

- Necesitás **MATLAB R2024b con Simulink**.
- Sistema operativo recomendado: **Windows 11** (la evaluación oficial de los
  modelos se hace ahí, aunque puedas desarrollar en otro OS).
- La carpeta `CM4SL` de tu instalación de CarMaker tiene subcarpetas por
  versión de MATLAB (ej. `CM4SL/R2024b/`) — si tenés otra versión de MATLAB,
  puede que esa subcarpeta no exista y `cmenv` falle.

!!! success "Sobre la versión exacta de CarMaker (14.1 vs 14.1.1)"
    El handbook menciona "CarMaker 14.1", pero **14.1.1 es totalmente
    válido** — es un patch/hotfix de la misma serie 14.1, no una versión
    distinta. De hecho es la que distribuye activamente el instalador
    oficial de IPG. No hace falta buscar específicamente la 14.1.0.

---

## 6. Archivos específicos del Driverless Challenge

Estos **no vienen con la instalación de CarMaker** — se descargan aparte,
desde el canal de Discord oficial de la competencia, a partir de la fecha
indicada en el cronograma:

- **Vehicle File** (`IPG_Challenge_Car`) — el auto ya armado con sensores,
  provisto por IPG. No se modifica.
- **Pistas** (`FSAA-AutoX.rd5`, `FSAAII.rd5`) — solo se puede editar la
  trayectoria (centerline) de referencia.
- **`DriverModel.slx`** — el modelo Simulink base. Solo se puede modificar el
  subsistema **Vehicle Control**.
- **`DriverModelParameters.m`** — parámetros del Driver Model, sin
  restricciones de edición.
- **Testruns** (`Autocross_challenge`, `Endurance_challenge`) — no se
  modifican, son los mismos que usa el servidor de IPG para evaluar.

!!! danger "Toolboxes permitidas en el Driver Model"
    Para que todos los modelos corran en el servidor de IPG, el Simulink
    model solo puede usar bloques de: **Simulink, CarMaker4SL (los
    predefinidos en el DriverModel dado), HDL Coder, Simulink Extras y
    Stateflow**. Usar otras toolboxes puede descalificar el modelo.

---

## 7. Verificación final

1. Abrí CarMaker desde el acceso directo del menú de inicio.
2. Si arranca sin el error de licencia, la instalación quedó lista.
3. Cargá el **Generic Car Model** (viene incluido) para confirmar que podés
   correr una simulación simple antes de empezar a trabajar con el modelo
   propio del equipo.

---

## Troubleshooting

!!! failure "\"License file not found\""
    Revisá el nombre exacto del archivo (`Licenses`, sin extensión oculta) y
    que esté en `C:\IPG\etc`.

!!! failure "CarMaker no arranca / se cuelga al abrir"
    Confirmá que el firewall de Windows no esté bloqueando los ejecutables
    listados en la sección 4.

!!! failure "Error de compilación al usar modelos en C"
    Verificá que el toolchain **MSYS/MinGW** se haya instalado (sección 5) y
    que la variable `MSYS_ROOT` esté definida.

!!! failure "`cmenv` da error: \"Unable to find specified CarMaker installation directory\" (busca `win64-14.1` en vez de `win64-14.1.1`)"
    Esto pasa cuando hay un archivo **`cmlocaldir.m`** viejo (de otro
    proyecto/plantilla) en tu MATLAB path, que sobreescribe la ruta por
    defecto de `cmenv.m`. Para solucionarlo:

    1. En MATLAB, corré:
       ```matlab
       which cmlocaldir
       ```
    2. Abrí ese archivo y corregí la ruta a la carpeta real de tu instalación:
       ```matlab
       function d = cmlocaldir
       d = 'C:/IPG/carmaker/win64-14.1.1';
       ```
    3. Guardá y volvé a correr `cmenv`. Si preferís no depender de ese
       archivo, también podés sacarlo del MATLAB path (click derecho sobre
       la carpeta que lo contiene → *Remove from Path*), así `cmenv.m` usa
       su valor por defecto (`14.1.1`), que ya es correcto.

    Cuando funciona, `cmenv` muestra algo así, sin errores:
    ```
    CarMaker directory: C:/IPG/carmaker/win64-14.1.1
    addpath C:/IPG/carmaker/win64-14.1.1/Matlab
    addpath C:/IPG/carmaker/win64-14.1.1/Matlab/R2024b
    addpath C:/IPG/carmaker/win64-14.1.1/CM4SL
    addpath C:/IPG/carmaker/win64-14.1.1/CM4SL/R2024b
    ```
