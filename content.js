chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "ON",
    });
  });

let estados = [false,false,false,false];
const valoresEstados = [1,2,4,8];
const idBotones = ["minusculas","mayusculas", "numeros", "simbolos"]

const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
const ABC = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const NUMS = ['0','1','2','3','4','5','6','7','8','9']
const SIGNOS = ['!','@','#','_','*','¡','?']



const min = document.getElementById("minusculas");
if(min){
    console.log("Hola que tal");
    min.addEventListener("click", cambiarEstado(0));
}

const may = document.getElementById("mayusculas");
if(min){
    console.log("Hola que tal");
    min.addEventListener("click", cambiarEstado(1));
}

const num = document.getElementById("numeros");
if(min){
    console.log("Hola que tal");
    min.addEventListener("click", cambiarEstado(2));
}

const simb = document.getElementById("simbolos");
if(min){
    console.log("Hola que tal");
    min.addEventListener("click", cambiarEstado(3));
}

const gen = document.getElementById("generar");
if(gen){
    console.log("Hola que tal");
    min.addEventListener("click", generate());
}

copiar();


function animacionCopiar(){
    document.getElementById('copiar').style.backgroundColor = "#77dd77";
    document.getElementById('copiar').style.color = "#FFFFFF";
    setTimeout(() => {
        document.getElementById('copiar').style.backgroundColor = "#d8dbe0";
        document.getElementById('copiar').style.color = "#000000";
       
    }, 1500);
}

function copiar(){
    var codigoACopiar = document.getElementById('password');
    var seleccion = document.createRange();
    seleccion.selectNodeContents(codigoACopiar);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(seleccion);
    var res = document.execCommand('copy');
    window.getSelection().removeRange(seleccion);
    animacionCopiar();
}

function getRandabc()
{
    return abc[Math.trunc(Math.random()*abc.length)];
}

function getRandABC()
{
    return ABC[Math.trunc(Math.random()*ABC.length)];
}

function getRandNUMS()
{
    return NUMS[Math.trunc(Math.random()*NUMS.length)];
}

function getRandSIGNOS()
{
    return SIGNOS[Math.trunc(Math.random()*SIGNOS.length)];
}

function cambiarEstado(boton)
{
    estados[boton] = !estados[boton];

    if(estados[boton])
        document.getElementById(idBotones[boton]).style.backgroundColor = "#77dd77";
    else
        document.getElementById(idBotones[boton]).style.backgroundColor = "#d8dbe0";
    
}

function getLon()
{
    var lon = document.getElementById("slide").value;
    document.getElementById("textLargo").innerHTML = lon;
    return lon;
}

function getNumTrue()
{
    let count = 0;

    for(let i = 0; i < 4; i++)
    {
        if(estados[i])
            count++;
    }

    return count;
}

function escoger(num, numTrue, valor)
{
    let tryButton = num % numTrue;

    switch (valor) {
        case 1:
            return getRandabc();
            break;

        case 2:
            return getRandABC();
            break;

        case 3:
            if(tryButton == 0)
                return getRandabc();
            else
                return getRandABC();
            break; 

        case 4:
            return getRandNUMS();
            break;
        
        case 5:
            if(tryButton == 0)
                return getRandabc();
            else
                return getRandNUMS();
            break;

        case 6:
            if(tryButton == 0)
                return getRandABC();
            else
                return getRandNUMS();
            break;

        case 7:
            if(tryButton == 0)
                return getRandabc();
            else if(tryButton == 1)
                return getRandABC();
            else
                return getRandNUMS();
            break;

        case 8:
            return getRandSIGNOS();
            break;

        case 9:
            if(tryButton == 0)
                return getRandabc();
            else
                return getRandSIGNOS();
            break;

        case 10:
            if(tryButton == 0)
                return getRandABC();
            else
                return getRandSIGNOS();
            break;

        case 11:
            if(tryButton == 0)
                return getRandabc();
            else if(tryButton == 1)
                return getRandABC();
            else
                return getRandSIGNOS();
            break;

        case 12:
            if(tryButton == 0)
                return getRandNUMS();
            else
                return getRandSIGNOS();
            break;

        case 13:
            if(tryButton == 0)
                return getRandabc();
            else if(tryButton == 1)
                return getRandNUMS();
            else
                return getRandSIGNOS();
            break;

        case 14:
            if(tryButton == 0)
                return getRandABC();
            else if(tryButton == 1)
                return getRandNUMS();
            else
                return getRandSIGNOS();
            break;
            
        case 15:
            if(tryButton == 0)
                return getRandabc();
            else if(tryButton == 1)
                return getRandABC();
            else if(tryButton == 2)
                return getRandNUMS();
            else
                return getRandSIGNOS();
            break;
    }

}

function generate() //genero un numero aleatorio de getLon() de largo
{
    //longitud del numero
    var lonS = getLon();
    var lon = parseInt(lonS);

    //genero numero aleatorio
    var vecNum = []
    for (let i = 0; i < lon; i++) {
        vecNum.push(Math.trunc(Math.random()*10));
    }

    //miro que botones estan pulsados
    let valorPulsados = 0;
    for (let i = 0; i < estados.length; i++) {
        valorPulsados += estados[i]*valoresEstados[i];
    }

    if(valorPulsados == 0)
    {
        alert("No hay ningun boton pulsado");
        document.getElementById("password").innerHTML = "Your password";
        return 0;
    }

        //genero la contrasenya mediante escoger
    var contrasenya = "";
    for (let i = 0; i < vecNum.length; i++) {
        contrasenya += escoger(vecNum[i], getNumTrue(), valorPulsados)
    }

    document.getElementById("password").innerHTML = contrasenya;
        
}
