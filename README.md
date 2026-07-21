# UCJC Racing — Sitio del equipo (IPG Driverless / vFSAA)

Sitio estático del equipo **UCJC Racing** (Universidad Camilo José Cela) para su disciplina de conducción autónoma dentro de la **Virtual Formula Student Alpe Adria (vFSAA)**: el **IPG Driverless Competition (IPG-DV)**.

Reúne el resumen de normativa de la competición, la documentación técnica interna (instalación de CarMaker/MATLAB, telemetría, etc.) y las líneas de investigación del equipo (control, dinámica vehicular, planificación de trayectoria...).

Construido con [MkDocs](https://www.mkdocs.org/) y el tema [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), desplegado automáticamente en GitHub Pages.

**Sitio publicado:** https://stavara.github.io/driverless/

---

## Requisitos

- Python 3.9+
- pip

## Uso local

```bash
# Clonar el repositorio
git clone https://github.com/stavara/driverless.git
cd driverless

# Crear y activar un entorno virtual
python -m venv .venv
source .venv/bin/activate      # En Windows: .venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Levantar el servidor de desarrollo (con recarga en caliente)
mkdocs serve
```

Abre [http://127.0.0.1:8000](http://127.0.0.1:8000) en el navegador. Cualquier cambio guardado en `docs/` o en `mkdocs.yml` se refleja al instante.

Para generar el sitio estático en local (carpeta `site/`, ignorada por Git):

```bash
mkdocs build
```

---

## Estructura del repositorio

```
.
├── docs/
│   ├── index.md                          # Inicio — resumen del reglamento IPG-DV
│   ├── nosotros.md                       # Equipo
│   ├── patrocinadores.md                 # Patrocinadores
│   ├── implementacion/
│   │   ├── index.md                      # Índice de la documentación técnica
│   │   ├── instalacioncarmaker.md        # Guía de instalación de CarMaker
│   │   ├── instalacionmatlab.md          # Guía de instalación de MATLAB/Simulink
│   │   ├── telemetrialive.md             # Herramienta de telemetría en vivo
│   │   └── downloads/
│   │       └── carmaker-dashboard.zip    # Recursos descargables
│   ├── investigacion/
│   │   ├── index.md                      # Índice de líneas de investigación
│   │   └── pid-tuning/
│   │       ├── index.md                  # Tema: ajuste óptimo de PID
│   │       └── paper.md                  # Paper de referencia
│   ├── stylesheets/
│   │   └── custom.css                    # Paleta rojo carmesí (#B91C1C)
│   └── javascripts/
│       └── highlight-fade.js             # Animación de resaltado de código
├── mkdocs.yml                             # Configuración del sitio (nav, tema, plugins)
├── requirements.txt                       # Dependencias de Python
├── .github/workflows/deploy.yml          # CI/CD: build y despliegue a GitHub Pages
└── LICENSE                                # MIT
```

## Cómo añadir una página nueva

1. Crea el archivo `.md` dentro de `docs/` (o de la subcarpeta correspondiente: `implementacion/` o `investigacion/`).
2. Regístralo en la sección `nav:` de `mkdocs.yml`, respetando la jerarquía existente.
3. Si es documentación técnica, actualiza también la tabla de `docs/implementacion/index.md` (o el índice temático de `docs/investigacion/index.md`) para que quede enlazada desde ahí.
4. Comprueba en local con `mkdocs serve` que el enlace aparece en la navegación y que el contenido renderiza como esperas.

## Despliegue

El despliegue es automático vía **GitHub Actions** (`.github/workflows/deploy.yml`): cada `push` a `main` construye el sitio con `mkdocs build --strict` y lo publica en GitHub Pages. No es necesario ejecutar `mkdocs gh-deploy` manualmente.

Antes del primer despliegue, en el repositorio de GitHub: **Settings → Pages → Source → GitHub Actions**.

Si cambias de repositorio o de organización, recuerda actualizar `site_url`, `repo_name` y `repo_url` en `mkdocs.yml`.

## Notas de diseño

- **Modo claro forzado:** no se define paleta oscura (`slate`) ni `palette.toggle`, por lo que Material no ofrece cambio de tema.
- **Color:** `primary` blanco puro, `accent` rojo — sobrescrito a rojo carmesí (`#B91C1C`) vía `docs/stylesheets/custom.css`.
- **Tipografía:** Inter (texto) + Fira Code (código), cargadas automáticamente por Material vía Google Fonts.
- **Navegación:** `navigation.instant` (tipo SPA, sin recargas completas) + `navigation.tabs` para las secciones de primer nivel.
- **Rendimiento:** `mkdocs-minify-plugin` minifica HTML/CSS/JS en cada build.
- **Markdown extendido:** admoniciones, pestañas (`pymdownx.tabbed`), resaltado de código con números de línea y botón de copiar, listas de tareas y emoji (vía `pymdownx`).

## Licencia

Distribuido bajo licencia MIT. Ver [`LICENSE`](./LICENSE).
