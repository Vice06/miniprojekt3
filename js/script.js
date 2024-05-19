/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let setNewValue = false; //rensar display för nästa värde

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
    
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);

    } else if (btn.substring(0, 2) === 'co') { // Inte en siffertangent, comma tangent.
        addComma();
    } else if (btn.substring(0, 2) === 'cl') { // Inte en siffertangent, clear tangenten
        memClear();
    } else {
        let operator = btn.substring(0, 1);
        setOperator(operator);
        if(operator != '='){
            setNewValue = true;
        }
       

    }

}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    //rensar display för nästa nummer
    if(setNewValue){
        memory = lcd.value;
        clearLCD();
        setNewValue = false;
    }
    //lägger till värde i display
    lcd.value += digit;

}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    lcd.value += '.';

}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
        if(operator === 'a'){
            arithmetic = '+';
    
        } else if(operator === 's'){
            arithmetic = '-';
    
        } else if(operator === 'd'){
            arithmetic = '/';
    
        } else if(operator === 'm'){
            arithmetic = '*';
    
        } else{
            calculate();
        }
  

    
}

/**
 * Beräknar och visar resultatet på displayen.
 */
function calculate() {
    let result = 0;
    if(arithmetic === '+'){
        result = parseFloat(memory) + parseFloat(lcd.value);
        memory = result - memory;
        lcd.value = result;
        console.log(memory);
        
    } else if(arithmetic === '-'){
        result = parseFloat(memory) - parseFloat(lcd.value);
        
        lcd.value = result;
        
    } else if(arithmetic === '*'){
        result = parseFloat(memory) * parseFloat(lcd.value);
        lcd.value = result;
        
    } else if(arithmetic === '/'){
        result = parseFloat(memory) / parseFloat(lcd.value);
        lcd.value = result;
        
    }  
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;

}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
