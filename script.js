:root {
    --gold: #00ff41; /* Verde Matrix Vibrante */
    --piano-black: #050505;
    --soft-white: #f0f0f0;
    --transition: all 0.8s cubic-bezier(0.85, 0, 0.15, 1);
}

body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: var(--piano-black); font-family: 'Inter', sans-serif; }

/* NAVEGAÇÃO HUD */
.hud-header {
    position: fixed; top: 0; width: 100%; padding: 30px;
    display: flex; justify-content: space-between; align-items: center;
    z-index: 100; backdrop-filter: blur(5px);
}

.nav-links button {
    background: transparent; border: none; color: #555;
    margin-left: 20px; letter-spacing: 3px; cursor: pointer; transition: 0.3s;
}

.nav-links button:hover { color: var(--gold); }

/* SISTEMA DE CÔMODOS (ROOMS) */
.room {
    position: absolute; width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; visibility: hidden; transform: scale(1.1);
    transition: var(--transition);
}

.room.active { opacity: 1; visibility: visible; transform: scale(1); }

.content { text-align: center; max-width: 80%; }

/* ESTÉTICA DE MANSÃO */
h1 { font-size: 4rem; font-weight: 200; letter-spacing: -2px; }
textarea { 
    width: 600px; height: 300px; background: transparent; 
    border: 1px solid #222; color: var(--gold); padding: 20px; font-size: 1.2rem;
}

canvas#matrix-bg { position: fixed; top: 0; left: 0; z-index: -1; opacity: 0.3; }
