var dia = 1

if (dia === 1) {
    console.log('Domingo')
}
else {
    if (dia === 2) {
        console.log('Segunda')
    }
    else {
        if (dia === 3) {
            console.log('Terça')
        }
        else {
            if (dia === 4) {
                console.log('Quarta')
            }
            else {
                if (dia === 5) {
                    console.log('Quinta')
                }
                else {
                    if (dia === 6) {
                        console.log('Sexta')
                    }
                    else {
                        if (dia === 6) {
                            console.log('Sexta')
                        }
                        else {
                            console.log('Dia inválido')
                        }
                    }
                }
            }
        }
    }
}


let r = '';

switch(dia) {
    case 1: r = 'Domingo'; break;
    case 2: r = 'Segunda'; break;
    case 3: r = 'Terça'; break;
    case 4: r = 'Quarta'; break;
    case 5: r = 'Quinta'; break;
    case 6: r = 'Sexta'; break;
    case 7: r = 'Sábado'; break;

    default: r = 'Dia inváido';
}

console.log(r)