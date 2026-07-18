# Sitio del equipo — vFSAA / IPG Driverless

Sitio estático construido con [MkDocs](https://www.mkdocs.org/) y el tema [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), desplegado en GitHub Pages.

## Uso local

```bash
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
```

Abre `http://127.0.0.1:8000`.

## Estructura

```
docs/
├── index.md              # Inicio (normas de competición)
├── nosotros.md
├── patrocinadores.md
├── implementacion.md
├── investigacion.md
└── stylesheets/
    └── custom.css         # Paleta rojo carmesí (#B91C1C)
mkdocs.yml                 # Configuración del sitio
.github/workflows/deploy.yml
```

## Antes de publicar

1. Edita `site_url`, `repo_name` y `repo_url` en `mkdocs.yml` con los datos reales de tu repositorio.
2. En el repositorio de GitHub, ve a **Settings → Pages → Source** y selecciona **GitHub Actions**.
3. Haz `git push` a `main`: el workflow construirá y publicará el sitio automáticamente.

## Notas de diseño

- **Modo claro forzado:** no se define paleta oscura ni `palette.toggle`, por lo que Material no ofrece cambio de tema.
- **Color:** `primary` blanco puro, `accent` rojo — sobrescrito a rojo carmesí (`#B91C1C`) vía `custom.css`.
- **Tipografía:** Inter (texto) + Fira Code (código), cargadas automáticamente por Material vía Google Fonts.
- **Velocidad:** `navigation.instant` (navegación tipo SPA sin recargas) + `mkdocs-minify-plugin` (minifica HTML/CSS/JS en el build).
