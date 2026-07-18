# Inicio

Bienvenido al sitio oficial de nuestro equipo para el **IPG Driverless Competition (IPG-DV)**, disciplina de conducción autónoma dentro de la Virtual Formula Student Alpe Adria (vFSAA).

A diferencia de las demás disciplinas de vFSAA, en IPG-DV no hay ningún piloto humano al volante. Lo que desarrollamos y entregamos es un modelo de Simulink capaz de conducir el vehículo de forma completamente autónoma: el modelo calcula por sí solo el acelerador, el freno y el ángulo de dirección a partir de los sensores de carretera del coche. Todo nuestro trabajo como equipo es de ingeniería de control, modelado y optimización, no de conducción en tiempo real.

En esta página reunimos, de forma detallada y organizada, la normativa que rige nuestra participación: qué está permitido modificar en el modelo, qué penalizaciones existen, cómo funciona el proceso de la competición y cómo se decide la clasificación final.

!!! warning "Este resumen no sustituye al reglamento oficial"
    Todo el contenido de esta página está basado en el *IPG Driverless Competition Handbook*, complementado por las secciones generales del *vFSAA 3rd Edition Competition Handbook* que aplican a nuestra disciplina. Es un resumen elaborado para uso interno del equipo. Ante cualquier duda, ambigüedad o conflicto de interpretación, prevalece siempre el documento oficial correspondiente, y el equipo debe contactar directamente a los organizadores.

---

## 1. Marco general de participación

### Relación entre vFSAA e IPG-DV

El IPG Driverless Competition es una disciplina integrada dentro de la Virtual Formula Student Alpe Adria. Esto significa que, salvo que el handbook específico de IPG-DV indique una excepción explícita, todas las reglas generales de comunicación y organización definidas en el handbook principal de vFSAA aplican también a nuestra parte. En caso de que exista una contradicción entre ambos documentos, el equipo debe contactar directamente a los organizadores para resolver la ambigüedad, en lugar de asumir una interpretación propia.

### Idioma y canales de comunicación

El idioma oficial de toda la competición es el inglés. Esto incluye documentación, anuncios y cualquier comunicación oficial emitida por la organización; no se publica nada en otro idioma. Antes de que cierre el periodo de inscripción, el canal principal de contacto entre los equipos y los organizadores es el correo electrónico. Una vez cerrada la inscripción, toda la comunicación oficial pasa a realizarse exclusivamente a través de Discord, por lo que la incorporación de todo el equipo al servidor oficial es obligatoria para no perder actualizaciones, coordinación de horarios o avisos de última hora. Las preguntas específicas de IPG-DV se canalizan a través del capitán del equipo, en el canal dedicado dentro del Discord oficial de vFSAA.

### Zona horaria y formato de fecha

Todos los plazos y horarios del evento se rigen por la zona horaria de Europa Central (CET en invierno, CEST en verano, según el cambio de horario europeo). El formato utilizado para expresar fecha y hora en cualquier comunicación oficial es `AAAA-MM-DD hh:mm`, en reloj de 24 horas. Es responsabilidad de cada equipo convertir estos horarios a su zona horaria local para evitar confusiones respecto a fechas límite o inicio de sesiones.

### Software y versiones oficiales

| Componente | Versión / Plataforma |
|---|---|
| Modelo de vehículo | CarMaker 14.1 (IPG Automotive) |
| Modelo de conducción (driver model) | Simulink R2024b (MathWorks MATLAB) |
| Sistema operativo recomendado | Windows 11 |

Cada equipo debe contar con licencias válidas para todo el software mencionado. Es posible desarrollar el modelo en un sistema operativo distinto a Windows 11 durante la fase de trabajo interno del equipo, pero la responsabilidad de garantizar que el modelo se ejecute correctamente bajo Windows 11 recae por completo en el equipo, ya que ese es el entorno de evaluación oficial. Un modelo que falle por incompatibilidad de sistema operativo en la evaluación no recibe trato especial por haber funcionado en otro entorno durante el desarrollo.

---

## 2. Elegibilidad y registro

Para que el equipo sea elegible para participar en el IPG Driverless Competition, debe cumplir dos condiciones de forma simultánea: estar correctamente registrado en el evento vFSAA correspondiente, y estar inscrito en el Formula CarMaker Program a través del sitio web oficial de IPG Automotive. Un equipo que no cumpla ambos requisitos no será considerado elegible para participar, independientemente de si cumple solo uno de ellos.

No existe un procedimiento de inscripción adicional específico para IPG-DV más allá de estos dos requisitos. El registro se considera formalmente completo en el momento en que todos los archivos requeridos han sido subidos correctamente a la carpeta oficial de Google Drive proporcionada por los organizadores. Se recomienda verificar que la subida de los archivos se haya completado correctamente y que sean accesibles antes de que venza el plazo de entrega, para asegurar una participación válida.

---

## 3. Qué se puede y qué no se puede modificar en el modelo

Esta es la sección más importante para el equipo técnico, porque define exactamente el margen de libertad que tenemos al optimizar nuestro modelo de conducción autónoma antes de la entrega final.

Durante la fase de optimización, la competición entrega un conjunto de archivos base, pero **solo cinco de ellos pueden modificarse**:

- `Livery.png`
- `FSAA-AutoX.rd5`
- `FSAAII.rd5`
- `DriverModel.slx`
- `DriverModelParameters.m`

Cualquier otro archivo del paquete original se considera fuera de los límites permitidos de edición.

### Qué está permitido modificar

En el caso de los archivos de pista (`FSAA-AutoX.rd5` y `FSAAII.rd5`), el único cambio autorizado es la trayectoria objetivo, también llamada centerline o target trajectory. No se puede alterar ningún otro aspecto de estos archivos de pista; la organización proporcionará un tutorial específico explicando el procedimiento correcto para modificar esa trayectoria.

En el archivo `DriverModel.slx`, los cambios están limitados exclusivamente al subsistema `Vehicle Control`. Todo lo que quede fuera de ese subsistema —en particular las entradas y salidas de CarMaker hacia el modelo— no se puede alterar bajo ninguna circunstancia.

El archivo `DriverModelParameters.m`, en cambio, no tiene ninguna restricción de edición: se puede modificar libremente para ajustar el comportamiento del modelo.

Respecto a `Livery.png`, se permite personalizar la textura visual del vehículo, siempre que se respeten las dimensiones del ejemplo original entregado por la organización y que el archivo comprimido no supere los 30 MB. El contenido de la livery no puede incluir material ofensivo, inapropiado o protegido por derechos de autor de terceros; la organización se reserva el derecho de rechazar o retirar cualquier livery que incumpla esta condición.

Más allá de estos cinco archivos, el reglamento también autoriza explícitamente al equipo a:

- Optimizar manualmente la línea de trayectoria (racing line) en cada pista de forma individual, con el objetivo de minimizar el tiempo de vuelta.
- Optimizar los parámetros internos del driver model para mejorar su desempeño.
- Modificar el Driver Model, o incluso reemplazarlo completamente por uno propio, siempre que el modelo sustituto utilice exactamente las mismas entradas y salidas que el archivo `DriverModel.slx` original entregado por la organización.

### Qué no está permitido bajo ninguna circunstancia

Existen una serie de restricciones técnicas estrictas, diseñadas para garantizar que todos los equipos compitan bajo las mismas condiciones de herramientas y capacidades del modelo:

No se puede modificar las entradas ni las salidas de CarMaker hacia o desde el modelo de Simulink. El modelo debe comunicarse con el simulador exactamente de la misma manera en que lo hace el archivo original.

No se puede cambiar la distancia de look-ahead de ninguno de los tres sensores de carretera que trae el vehículo por defecto: el sensor cercano (near, 2 metros), el sensor medio (middle, 15 metros) y el sensor lejano (far, 75 metros). Estos valores están fijados por diseño de la competición y no forman parte de los parámetros optimizables.

No se puede utilizar, bajo ninguna circunstancia, la función `Write CM Dict` de la librería CarMaker4SL. Esta función está expresamente prohibida en el reglamento.

Las únicas tres salidas que el modelo de Simulink puede enviar hacia CarMaker son el acelerador (Gas), el freno (Brake) y el ángulo de dirección (Steering Angle), y deben pasar obligatoriamente a través del subsistema `Vehicle Control`. Cualquier otra forma de comunicar salidas hacia el simulador queda fuera del reglamento.

El modelo solo puede construirse utilizando bloques provenientes de un conjunto cerrado de toolboxes de Simulink, que en la versión provisional del reglamento incluye:

- Simulink
- CarMaker4SL, limitado únicamente a los bloques predefinidos que ya vienen incluidos en el `DriverModel` original
- HDL Coder
- Simulink Extras
- Stateflow

Esta lista es provisional y la versión definitiva se publicará junto con la liberación oficial del track y del modelo de conductor, por lo que conviene revisarla de nuevo cuando esa actualización esté disponible.

Tampoco se puede actuar sobre parámetros adicionales del modelo que no estén contemplados en el diseño original, ni intentar explotar comportamientos claramente irreales del vehículo o de la física de la pista con el fin de obtener una ventaja competitiva que no reflejaría un desempeño real del sistema de conducción autónoma.

!!! danger "Consecuencia de incumplir estas restricciones"
    Cualquiera de las acciones descritas como no permitidas en esta sección se clasifica como Unsporting Behavior (comportamiento antideportivo) y provoca la descalificación inmediata del equipo en el evento. La evaluación del comportamiento del modelo la realiza directamente el equipo de IPG Automotive, y su decisión es definitiva y no admite apelación. La organización se reserva el derecho de permitir, a su exclusivo criterio, que un equipo corrija su modelo si existe tiempo suficiente para hacerlo y volver a ejecutar la simulación, pero esto no es un derecho automático del equipo, sino una excepción discrecional.

En cualquier caso, independientemente de correcciones o excepciones, el modelo final debe entregarse a más tardar en la fecha límite oficial establecida en el cronograma del evento.

---

## 4. Proceso de la competición

El desarrollo de IPG-DV sigue una secuencia de siete pasos:

1. **Preparación del modelo.** El equipo trabaja sobre los archivos base entregados por la organización.
2. **Descarga.** A partir de la fecha especificada en el cronograma oficial, los equipos pueden descargar todos los archivos del track y del modelo de conductor, y ejecutarlos en sus propios computadores.
3. **Optimización.** El equipo modifica únicamente los cinco archivos permitidos, descritos en la sección 3 de esta página.
4. **Subida.** Los archivos finales se entregan antes del plazo límite oficial.
5. **Driverless Autocross (DV-AX).** Primera prueba dinámica de evaluación del modelo.
6. **Driverless Endurance (DV-ED).** Segunda prueba dinámica, de mayor duración.
7. **Transmisión.** Los resultados oficiales se revelan durante la transmisión en vivo de la competición, comentada por expertos de IPG Automotive y de Formula Student Alpe Adria.

---

## 5. Sistema de penalizaciones

Durante las pruebas de Driverless Autocross (DV-AX) y Driverless Endurance (DV-ED), el desempeño del modelo se evalúa bajo tres categorías de penalización:

**Cono derribado o desplazado (Cone Down or Out, abreviado DOO).** Se considera que un cono está en estado DOO si el vehículo lo ha tocado en cualquier momento del recorrido. Cada ocurrencia de este tipo añade una penalización de dos segundos al tiempo total del intento. Si el modelo omite una o más puertas de un tramo de slalom, la penalización se calcula según el número de conos que resulten en estado DOO como consecuencia de esa omisión.

**Salida de pista (Off Course, abreviado OC).** Ocurre cuando el vehículo abandona el trazado definido de la pista con al menos una rueda. Cuando esto sucede, la simulación se detiene inmediatamente y se registra la distancia recorrida hasta el momento de la salida. El intento se clasifica como Did Not Finish (DNF), y todos los intentos que terminan en DNF se ordenan entre sí según la distancia alcanzada antes de la salida de pista.

**Comportamiento antideportivo (Unsporting Behavior, abreviado UB).** Cubre tanto las violaciones técnicas descritas en la Sección 3 como cualquier desarrollo del modelo que no respete el espíritu deportivo de la competición, incluyendo ignorar deliberadamente puertas de slalom para obtener ventaja injusta. Un caso de UB resulta en descalificación inmediata del evento.

Para que un modelo sea considerado válido y pueda aparecer en la clasificación oficial, el archivo `DriverModelParameters.m` debe contener al menos un valor de parámetro distinto al del archivo original, y el modelo debe poder ejecutarse sin errores mayores. Es decir, no basta con entregar el paquete de archivos: el modelo tiene que reflejar trabajo real de optimización y ser funcional.

---

## 6. Clasificación final y premios

La clasificación final de IPG-DV se construye combinando el resultado de ambas pruebas dinámicas. Las posiciones de la uno a la diez se asignan a los diez equipos que participan en la Driverless Endurance, ordenados según su tiempo acumulado en esa prueba, incluyendo todas las penalizaciones de tiempo aplicables. Si algún equipo no logra completar la prueba debido a una salida de pista (OC), se ubica según la distancia recorrida hasta ese momento, por detrás de los equipos que sí finalizaron.

A partir de la posición once en adelante, la clasificación se determina según el tiempo acumulado en la Driverless Autocross, también incluyendo las penalizaciones correspondientes, y aplicando el mismo criterio de distancia recorrida para los equipos que no logren finalizar por salida de pista. Cualquier equipo descalificado por comportamiento antideportivo queda excluido por completo de la clasificación oficial, independientemente del desempeño que haya mostrado en las pruebas.

Los tres primeros equipos de la clasificación reciben reconocimiento oficial durante la ceremonia de cierre de vFSAA, además de paquetes de soporte técnico por parte de IPG Automotive: cuatro horas de soporte en CarMaker para el primer lugar, dos horas para el segundo, y una hora para el tercero. Las sesiones de soporte se entregan mediante reuniones en línea o, según disponibilidad mutua, mediante una visita a las instalaciones de IPG Automotive.

Todos los equipos que aparezcan en la clasificación oficial de IPG-DV reciben setenta y cinco puntos hacia las Semifinales de vFSAA. La organización se reserva el derecho de comunicar posibles descalificaciones por comportamiento antideportivo hasta el inicio de la Final. Los equipos que además clasifiquen a la Final reciben puntos adicionales según su posición en una versión reducida de la clasificación de IPG-DV, de la cual se eliminan los equipos que no avanzaron a la Final.

---

Para el detalle completo y vinculante de cualquiera de estos puntos, consulta siempre el IPG Driverless Competition Handbook oficial. Esta página tiene fines exclusivamente informativos para uso interno del equipo, y se actualizará conforme se publiquen nuevas versiones del handbook oficial.
