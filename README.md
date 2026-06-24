# Micrositio — II Foro de Alto Nivel · 25 Años de Autocuidado (ILAR)

Sitio web estático para el evento de 25 años de ILAR:
**II Foro de Alto Nivel: 25 Años Impulsando el Autocuidado en América Latina**
· 21 de octubre de 2026 · Hotel Barceló México Reforma, Ciudad de México.

## Estructura

```
.
├── index.html        Página única con todas las secciones
├── styles.css        Estilos y paleta de marca (azul→cian, verde lima)
├── script.js         Menú móvil, sombra del header, animaciones de scroll
└── assets/
    ├── hero-banner.png        Banner principal (imagen provista)
    ├── logo-ilar.png          Logo ILAR (extraído del banner, fondo transparente)
    ├── logo-25.png            Marca "25 aniversario" (extraída del banner)
    ├── centro_historico.jpg   Foto de la sección Atracciones
    ├── chapultepec.jpeg       Foto de la sección Atracciones
    ├── polanco.jpg            Foto de la sección Atracciones
    └── flags/                 Banderas SVG de los países confirmados
        ├── br.svg  co.svg  us.svg  ec.svg  sv.svg
        └── gt.svg  do.svg  jp.svg  pe.svg
```

> Las banderas SVG provienen de [flagcdn.com](https://flagcdn.com) (imágenes de
> dominio público). Centroamérica se representa con un icono de región (globo),
> al no corresponder a un solo país.

## Ver el sitio localmente

Abre `index.html` con doble clic, o sirve la carpeta con un servidor estático
(recomendado para que las rutas funcionen igual que en producción):

```bash
# Python
python -m http.server 8000
# luego visita http://localhost:8000
```

## Publicar (hosting estático gratuito)

- **Netlify / Cloudflare Pages:** arrastra la carpeta o conéctala a un repo. Sin build.
- **GitHub Pages:** sube los archivos al repo y activa Pages sobre la rama principal.
- **Vercel:** importa el directorio; framework = "Other".

No hay paso de compilación: son archivos estáticos.

## Inscripciones

Todas las llamadas a la acción ("Regístrate / Inscríbete", incluido el botón verde del
banner) enlazan al **formulario de Microsoft Office Forms** que recolecta los datos.
El equipo de ILAR contacta luego al participante para coordinar el pago.

Contacto: **esalmeron@infoilar.org**

## Pendientes opcionales

- Reemplazar los placeholders con degradado de la sección *Atracciones* por fotos reales.
- Agregar la URL real de LinkedIn / redes de ILAR en el footer.
- Sustituir los logos recortados por versiones en alta resolución / SVG si están disponibles.
