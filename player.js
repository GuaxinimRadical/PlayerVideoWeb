
// const css = '<style> [raccon]{ background-color: blue; } </style>'

// document.querySelector('html').src += css

const corpoVideo = document.querySelector('.corpoVideo')

const video = document.querySelector('[raccon]')
const butao = document.querySelector('[raccon_play]')
const barraCompleta = document.querySelector('.barraCompleta')
const barra = document.querySelector('.barra')
const barraMouse = document.querySelector('.mouse')
const caixaTempoMouse = document.querySelector('.caixaTempoMouse')

const botaoMais10 = document.querySelector('[racconMore10]')
const botaoMenos10 = document.querySelector('[racconLess10]')
const botaoAbrirMenu = document.querySelector('.openMenu')
const menuTempoAvancar = document.querySelectorAll('.menu')
let segundosParaAvancar = 30


const duracao = document.querySelector('.tempoVideo')

butao.onclick = e => {
    if(video.paused){
        video.play()
        butao.src = '../PlayerVideo/imgs/pause.png'
    } else {
        video.pause()
        butao.src = '../PlayerVideo/imgs/play.png'
    }
}
botaoMais10.onclick = e => video.currentTime += segundosParaAvancar
botaoMenos10.onclick= e => video.currentTime -= segundosParaAvancar
botaoMais10.innerHTML = `+${segundosParaAvancar}`
botaoMenos10.innerHTML= `-${segundosParaAvancar}`

botaoAbrirMenu.onclick = e => {
    const displayMenu = menuTempoAvancar[0].style.display

    if(!displayMenu || displayMenu==='none'){
        menuTempoAvancar.forEach( h => h.style.display='flex')
    } else {
        menuTempoAvancar.forEach( h => h.style.display='none')
    }
}

menuTempoAvancar.forEach( h => { 
    h.onclick = e =>{
        const tempo = h.innerText.replace('s','')
        segundosParaAvancar = Number(tempo)

        botaoMais10.innerHTML = `+${segundosParaAvancar}`
        botaoMenos10.innerHTML= `-${segundosParaAvancar}`

        menuTempoAvancar.forEach( h => h.style.display='none')
    }
})


barraCompleta.onmouseleave = e => {
    barraMouse.style.display = 'none'
    caixaTempoMouse.style.display = 'none'
}

function formatarSegundos (i) {
    const minutos = Math.trunc(i/60)
    const segundos = Math.trunc(i%60)
    let zeroAdicional = ''
    
    if(segundos<10){
        zeroAdicional = '0'
    } 
    
    const tempoFormatado = `${minutos}:${zeroAdicional}${segundos}`
    
    return tempoFormatado
}


function atualizacaoStatus() {
    
    barraCompleta.addEventListener('mousemove' , (event) => {
        const posicaoMouseTela = event.layerX 
        const tamanhoTotalBarra = barraCompleta.clientWidth
        
        const porcetagemMouseNaBarra = posicaoMouseTela/tamanhoTotalBarra
        
        if(posicaoMouseTela>=2){
            const posicaoPonteiroNaBarra = `${porcetagemMouseNaBarra*100}%`
            barraMouse.style.left = posicaoPonteiroNaBarra
            barraMouse.style.display = 'block'


            const tempoMouse = video.duration*porcetagemMouseNaBarra
            const zero = tempo => (Math.trunc((tempo%60)))<10 ? '0' : '' ;
            caixaTempoMouse.style.left = `${porcetagemMouseNaBarra*100}%`
            caixaTempoMouse.style.display = 'block'
            caixaTempoMouse.innerHTML = formatarSegundos(tempoMouse)

            if(porcetagemMouseNaBarra<=0.12){
                caixaTempoMouse.style.top = `100%`
            } else {
                caixaTempoMouse.style.top = `-100%`
            }

            if((porcetagemMouseNaBarra*100)>92){
                caixaTempoMouse.style.left = '92%'
            }
        } else {
            barraMouse.style.display = 'none'
            caixaTempoMouse.style.display = 'none'
        }

        barraCompleta.onclick = e => {
            if(porcetagemMouseNaBarra*100>=5){
                console.log(porcetagemMouseNaBarra)
                video.currentTime = video.duration*porcetagemMouseNaBarra
            }
        }
    });

    barra.style.width = `${(video.currentTime/video.duration)*100}% `
    const zero = tempo => (Math.trunc((tempo%60)))<10 ? '0' : '' ;

    const tempoAtual = formatarSegundos(video.currentTime)
    const tempoTotal = formatarSegundos(video.duration)


    duracao.innerHTML = `${tempoAtual} | ${tempoTotal}`
}

setInterval(atualizacaoStatus,500)



/*
const aparecimentoElementos = e => {
    butao.style.display = 'block'
    botaoMais10.style.display = 'block'
    botaoMenos10.style.display = 'block'
}

corpoVideo.onmouseout = e=> {
    setTimeout(() => {
    butao.style.display = 'none'
    botaoMais10.style.display = 'none'
    botaoMenos10.style.display = 'none'
    },500)
}

video.onmousemove = aparecimentoElementos
butao.onmousemove = aparecimentoElementos
barra.onmousemove = aparecimentoElementos
*/