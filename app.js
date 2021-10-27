'use strict';

let screenContainerEl = document.querySelector('#screen');
let actionsContainerEl = document.querySelector('#action-list');
let operandsContainerEl = document.querySelector('#number-list');
let calcContainerEL = document.querySelector('#calc');

function Calculator () {

    this.operators = ['+','-','/','*','='];
    this.numbers = [1,2,3,4,5,6,7,8,9,0];

    this.addClassList = function (element,className) {
        element.classList.add(`${className}`);
    };

    this.addTextContent = function (element,textContent) {
        element.textContent = textContent;
    };

    this.appendElements = function (elementToAppend, whereToAppend) {
        whereToAppend.append(elementToAppend);
    };

    this.showElementOnScreen = function (passedTarget, appendPlaceName,tagName,nameOfClass) {
        let itemOnScreen = document.createElement(tagName);
        this.addClassList(itemOnScreen,nameOfClass)
        this.addTextContent(itemOnScreen,passedTarget);
        this.appendElements(itemOnScreen,appendPlaceName);
    };

    this.onClickOperators = function (e) {
        console.log(e.target)
        console.log(this);

        let itemOperator = e.target.closest('.operator');
        let itemOperatorTextContent = e.target.textContent;

        console.log(itemOperator);

        if(e.target.classList.contains('operator')) {
            this.showElementOnScreen(itemOperatorTextContent,screenContainerEl,'span','screen-process_element');
            // do something with operators
            if (this.operators.includes(e.target.textContent)) {
                console.log(e.target.textContent);

                this.operators.forEach(el => {
                    if (e.target.textContent === el) {
                        console.log(el);
                    }
                });
            }
        }
    };

    this.onClickOperands = function (e) {
            let itemOperand = e.target.closest('.operand');
            let itemOperandTextContent = e.target.textContent;
            console.log(itemOperand);
            console.log(e);
            this.numbers.forEach(el => {
                if (e.target.textContent == el) {
                   console.log(el);
                   this.showElementOnScreen(itemOperandTextContent,screenContainerEl,'span','screen-process_element');
                }
            });
    }
    
    this.renderElements = function (elementsReceived,appendPlace,tag,className1,className2) {
        elementsReceived.forEach(e => {
            let createdEL = document.createElement(tag);
            this.appendElements(createdEL,appendPlace);
            this.addClassList(createdEL, className1);
            this.addClassList(createdEL, className2);
            this.addTextContent(createdEL,`${e}`);
        });
    };
    
    this.renderElements(this.numbers,operandsContainerEl,'button','button','operand');
    this.renderElements(this.operators,actionsContainerEl,'button','button','operator');

    calcContainerEL.addEventListener('click',this.onClickOperators.bind(this));
    calcContainerEL.addEventListener('click',this.onClickOperands.bind(this));

}

let calc = new Calculator();

// calc.showElementOnScreen();
// calc.onClickOperators();
// calc.renderElements()