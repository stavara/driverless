# Instalación de CarMaker (Formula Student / FSAA)

Guía de instalación y licenciamiento de CarMaker/Office para el equipo, basada
en la documentación oficial de IPG Automotive (`InstallationGuide.pdf`) y el
tutorial del programa Formula CarMaker (`vFSAA_IPG_CarMaker_Tutorial_1.pdf`).

!!! info "Requisito previo"
    Necesitás permisos de **administrador** en la PC donde vayas a instalar.

---

## 1. Registro en el programa Formula CarMaker

1. Registrate para la temporada vigente de Formula CarMaker en:
   [ipg-automotive.com — Formula CarMaker Registration](https://www.ipg-automotive.com/en/company/how-we-are-connected/investing-in-education/research-teaching/registration-formula-carmaker-program/)
2. Una vez aprobado el sponsorship y solicitadas las licencias, vas a recibir
   un login para el **FCM Customer Area**.
3. Descargá ahí la última versión de **CarMaker/Office** y de **IPGKinematics**.

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
    (como nuestro dashboard de telemetría). Ver la página
    [Telemetría en vivo](carmaker-telemetria.md) para ese setup.

---

## 5. MSYS (opcional — solo si compilás modelos en C)

Si tu equipo va a integrar modelos basados en código C en CarMaker (Office o
HIL Xpack4), instalá el paquete MSYS-2023 con el mismo IPG Installer:

```
msys-2023-<version>.tgz
```

Esto:

- Se instala junto al directorio `IPGHOME`.
- Define la variable de entorno `MSYS_ROOT`.
- Crea un acceso directo en el menú de inicio, dentro de la carpeta `IPG`.

---

## 6. Verificación final

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

---
