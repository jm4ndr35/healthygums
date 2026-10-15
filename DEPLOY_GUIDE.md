# 🚀 GUÍA DE DESPLIEGUE: TEMA GOMAS SALUDABLES

## Resumen
Esta guía te ayudará a desplegar el tema Shopify "Gomas Saludables" desde tu terminal local a tu tienda Shopify. El tema ya está completamente configurado y listo para producción.

## ✅ Requisitos Previos

1. **Tienda Shopify activa**
2. **Acceso de Administrador/Desarrollador** en Shopify Admin
3. **Terminal** (Git Bash, WSL, o Terminal nativo)
4. **Node.js** (opcional - npm para Shopify CLI)

## 🛠️ PASO 1: Instalar Shopify CLI

Abre tu terminal local (Git Bash, CMD, PowerShell, Terminal, WSL, etc.):

```bash
# Instalar Shopify CLI globalmente
npm install -g @shopify/cli@latest

# Verificar instalación
shopify version
# Debería mostrar algo como: 4.8.3
```

## 🔐 PASO 2: Autenticación (REQUIERE NAVEGADOR)

Este paso es interactivo y requiere que abras un navegador:

```bash
# Inicia sesión en Shopify
shopify auth login
```

Qué esperar:
1. Se abrirá una ventana/tab de tu navegador predeterminado
2. Inicia sesión con tu cuenta Shopify
3. Selecciona tu tienda objetivo (ej: mifica.myshopify.com)
4. Autoriza la aplicación CLI
5. Cierra el navegador y vuelve a la terminal

Verifica tu login:
```bash
shopify store list
# Debe mostrar tu(s) tienda(s) disponibles
```

## 📦 PASO 3: Desplegar el Tema

Navega al directorio del proyecto si no estás ya allí:

```bash
# Si estás en otra ubicación, navega a:
cd /ruta/a/tu/proyecto/gomas-store
# (donde se encuentra este README)

# Despliega el tema como borrador
shopify theme push --path "./shopify-theme" --unpublished
```

Qué esperar:
- El CLI creará/actualizará un tema borrador llamado "Gomas Saludables"
- Verás mensajes de progreso como "Uploading assets...", "Updating theme..."
- Al completarse, verás un mensaje de éxito con una URL de vista previa

## 👁️ PASO 4: Verificar el Tema

Después del despliegue exitoso:

1. **Acceder a Shopify Admin**
   - Ve a: https://TU-TIENDA.myshopify.com/admin

2. **Ir a Online Store > Themes**
   - Busca en la sección "Theme library"
   - Deberías ver: "Gomas Saludables" (en modo borrador/no publicado)

3. **Vista Previa**
   - Haz clic en el botón "Actions" (⋮) > "Preview"
   - Navega por tu sitio para confirmar que todo funciona correctamente

4. **Personalización (opcional)**
   - Haz clic en "Customize" para ajustar colores, fuentes, imágenes
   - El tema viene preconfigurado con:
     - Paleta violeta/púrpura (mora azul)
     - Textos en español e inglés
     - Secciones completas (Hero, Product Grid, Quiz, Checkout, etc.)
     - Funcionalidad de carrito completa

## 🎯 PASO 5: Publicar el Tema

Una vez que hayas verificado y personalizado el tema:

### Opción A: Publicar directamente desde el tema push (solo si no hay modificaciones manuales)
```bash
shopify theme push --path "./shopify-theme" --published
```

### Opción B: Publicar desde Shopify Admin (Recomendado)
1. Ve a **Online Store > Themes**
2. Localiza "Gomas Saludables" (debería estar en "Theme library")
3. Haz clic en el botón "Actions" (⋮) > "Publish"
4. Confirma que deseas publicar el tema

## 🔄 DESARROLLO LOCAL (Opcional pero Recomendado)

Para desarrollo iterativo:

```bash
# Desde el directorio shopify-theme
cd ./shopify-theme

# Inicia el servidor de desarrollo
shopify theme serve
```

Esto:
1. Sube el tema como borrador (si no existe)
2. Monitorea cambios locales en tiempo real
3. Permite editar archivos y ver actualizaciones instantáneas
4. Mantiene un enlace activo: https://TU-TIENDA.myshopify.com/?preview_theme_id=...

Para detener: `Ctrl + C` en la terminal

## 📋 COMANDOS ÚTILES

### Configuración
```bash
shopify version           # Ver versión CLI
shopify auth login        # Iniciar sesión
shopify auth logout       # Cerrar sesión
shopify store list        # Listar tiendas conectadas
```

### Tema
```bash
shopify theme push --path "./shopify-theme" --unpublished  # Subir como borrador
shopify theme push --path "./shopify-theme" --published    # Subir y publicar
shopify theme pull --path "./shopify-theme"                # Descargar tema actual
shopify theme list                                         # Ver todos los temas
shopify theme dev                                          # Entorno de desarrollo
shopify theme serve                                        # Desarrollo local con hot reload
shopify theme delete [theme-id]                            # Eliminar tema
```

### Solución de Problemas
```bash
shopify help                      # Mostrar ayuda completa
shopify theme --help              # Ayuda específica de tema
shopify auth --help               # Ayuda específica de auth
```

## 🎨 PERSONALIZACIÓN RÁPIDA (Post-Despliegue)

### Colores
El tema usa variables CSS en `assets/styles.css`:
- `--primary`: hsl(262, 80%, 55%) (violeta principal)
- `--accent`: hsl(30, 100%, 55%) (naranja/ámbar para CTA)

Para cambiar colores:
1. Edita `:root` en `assets/styles.css`
2. Vuelve a ejecutar: `shopify theme push --path "./shopify-theme"`

### Imágenes
Reemplaza las imágenes en `assets/` con tus propias versiones del mismo nombre:
- Logo: datos:image/svg+xml (en theme.liquid - mantener)
- Banners: Reemplaza GMSCFF.png, GMSPLN.png, etc.
- Productos: Agrega nuevas imágenes y actualiza en products-grid.liquid

### Texto
Edita los archivos de localización:
- `locales/es.json` (español)
- `locales/en.json` (inglés)

## 🇨🇴 CONFIGURACIÓN COLOMBIA

El tema ya está configurado para Colombia:
- **Moneda**: COP (Peso Colombiano)
- **Formato de precio**: $1.234,56
- **Departamentos**: Lista completa en checkout.liquid
- **Envío**: Mensaje de "Envío gratis a toda Colombia"
- **Pagos**: Integración con Nequi, Daviplata, PSE, Efecty

## ⚠️ NOTAS IMPORTANTES

### Seguridad
- Nunca compartas tu archivo `.shopify/session` (contiene tu token OAuth)
- El login se guarda por máquina - repite `shopify auth login` en nuevas máquinas

### Actualizaciones
- `shopify theme push` sobrescribe archivos existentes en el tema
- Tus personalizaciones manuales en Shopify Admin se perderán al hacer push
- **Recomendación**: Haz todo tu desarrollo local y luego push al tema

### Tamaño de Assets
- Optimiza imágenes antes de agregarlas al tema
- Shopify tiene límites de tamaño para assets individuales
- Usa formatos comprimidos (WebP, JPEG optimizado) cuando sea posible

## 📞 SOPORTE Y RECURSOS

### Documentación Oficial
- [Shopify CLI Documentation](https://shopify.dev/docs/api/cli)
- [Shopify Theme Documentation](https://shopify.dev/docs/themes)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)

### Comunidad
- [Shopify Community Forums](https://community.shopify.com/)
- [Shopify Reddit](https://www.reddit.com/r/Shopify/)
- [Shopify Developers](https://developers.shopify.com/)

### Solución de Problemas Comunes

**Error: "Authentication required"**
```bash
shopify auth login  # Re-authenticar
```

**Error: "Theme not found"**
```bash
shopify theme list  # Ver temas disponibles
shopify theme push --path "./shopify-theme"  # (re)crear tema
```

**Error: "Failed to upload asset"**
- Verifica permisos de archivo
- Reduce tamaño de imágenes > 20MB
- Asegúrate de tener conexión estable

## ✨ ¡Felicitaciones!

Has completado el despliegue del tema Gomas Saludables. Tu tienda ahora tiene:

✅ Diseño premium y profesional
✅ Funcionalidad completa de e-commerce
✅ Optimizado para dispositivos móviles
✅ Soporte multilingüe (es/inglés)
✅ Configuración específica para el mercado colombiano
✅ Experiencia de usuario optimizada para conversión

¡Éxitos con tu tienda de gomitas saludables! 🍬💪

---

**Nota**: Si necesitas ayuda adicional, revisa la documentación en `shopify-development/` o ejecuta `shopify help` en tu terminal.