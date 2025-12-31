function irPara(id) {
    document.querySelectorAll('.room').forEach(r => r.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Feedback de som ou haptic pode ser adicionado aqui
    console.log(`[MOVIMENTO]: Entrando na ${id}`);
}

// O resto da lógica de salvar notas e fotos permanece, mas agora 
// dentro da volumetria da mansão.
