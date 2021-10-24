'use strict';

let screenContainerEl = document.querySelector('#screen');
let actionsContainerEl = document.querySelector('#action-list');
let operandsContainerEl = document.querySelector('#number-list');

function Calculator () {
    this.numbers = [1,2,3,4,5,6,7,8,9,0];
    this.operators = ['+','-','/','*','='];
    
    this.addClassList = function (element,className) {
        element.classList.add(`${className}`);
    }

    this.addTextContent = function (element,textContent) {
        element.textContent = textContent;
    }

    this.appendElements = function (elementToAppend, whereToAppend) {
        whereToAppend.append(elementToAppend);
    }
    
    this.renderElements = function (elementsReceived,appendPlace,tag,className1,className2) {
        elementsReceived.forEach(e => {
            let createdEL = document.createElement(tag);
            this.appendElements(createdEL,appendPlace);
            this.addClassList(createdEL, className1);
            this.addClassList(createdEL, className2);
            this.addTextContent(createdEL,`${e}`)
        });
    }
    
    this.renderElements(this.numbers,operandsContainerEl,'button','button','operand');
    this.renderElements(this.operators,actionsContainerEl,'button','button','operator');
}

let calc = new Calculator();