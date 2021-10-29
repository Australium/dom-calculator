'use strict';

let screenContainerEl = document.querySelector('#screen');
let actionsContainerEl = document.querySelector('#action-list');
let operandsContainerEl = document.querySelector('#number-list');
let calcContainerEL = document.querySelector('#calc');
let buttonContainerEl = document.querySelector('#button-container');
let buttonContainerForClearingEL = document.querySelector('#clear-container');
let lastChildEl = document.querySelector('#screen:last-child');

function Calculator () {

    this.operators = ['+','-','/','*','='];
    this.numbers = [1,2,3,4,5,6,7,8,9,0];
    this.buttonsForClearingContent = ['C','X'];
    this.storedOperands = [];
    this.storedOperator = null;

    this.addClassList = function (element,className) {
        element.classList.add(`${className}`);
    };

    this.addTextContent = function (element,textContent) {
        element.textContent = textContent;
    };

    this.appendElements = function (elementToAppend, whereToAppend) {
        whereToAppend.append(elementToAppend);
    };

    this.addListeners = function (element,typeOfEvent,handler,thisForBind) {
        thisForBind !== undefined ? 
        element.addEventListener(typeOfEvent,handler.bind(thisForBind)) :
        element.addEventListener(typeOfEvent,handler);
    };

    this.showElementOnScreen = function (passedTarget, appendPlaceName,tagName,nameOfClass) {
        let itemOnScreen = document.createElement(tagName);
        this.addClassList(itemOnScreen,nameOfClass)
        this.addTextContent(itemOnScreen,passedTarget);
        this.appendElements(itemOnScreen,appendPlaceName);
    };

    this.clearContentFromContainer = function (passedContainer) {
        let containerToBeCleared = passedContainer;
        containerToBeCleared.innerHTML = '';
    };

    this.clearOnlyOneElementFromContainer = function (passedElement) {
        let elementToBeCLeared = passedElement;
        elementToBeCLeared.removeChild(elementToBeCLeared.lastChild);
    };

    this.addOperandsToArray = function (passedArray,passedElement) {
        passedArray.push(passedElement);
    };

    this.clearArray = function (passedArray) {
        passedArray.splice(0,passedArray.length);
    };

    this.clearArrayElement = function (passedArray) {
        passedArray.pop();
    };

    // this.calculate = function (array,passedEvent) {
    //     array.forEach(element => {
    //         if (passedEvent.target.textContent === element) {
                
    //         }
    //     })
    // };

    this.onClickOperators = function (e) {
        console.log(e.target)
        console.log(this);

        let itemOperator = e.target.closest('.operator');
        let itemOperatorTextContent = e.target.textContent;

        if(e.target.classList.contains('operator')) {
            this.showElementOnScreen(itemOperatorTextContent,screenContainerEl,'span','screen-process_element');
            // do something with operators
            if (this.operators.includes(e.target.textContent)) {

                // if(e.target.textContent === '=') {
                //     this.calculate();
                // };

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
            this.numbers.forEach((el,i,array) => {
                if (itemOperandTextContent == el) {
                    console.log(el);
                    this.showElementOnScreen(itemOperandTextContent,screenContainerEl,'span','screen-process_element');
                    // this.storedOperands.push(el);
                    this.addOperandsToArray(this.storedOperands,el);
                    console.log(this.storedOperands);
                }
            });
    };

    this.onClickButtonsForClearingContent = function (e) {
        // let closetEL = e.target.closest('.clear-buttons');
        if (e.target.textContent === this.buttonsForClearingContent[0]) {
            console.log(e.target.textContent);
            this.clearContentFromContainer(screenContainerEl);
            this.clearArray(this.storedOperands);
            console.log(this.storedOperands);
        } else if (e.target.textContent === this.buttonsForClearingContent[1]) {
            console.log(e.target.textContent);
            this.clearOnlyOneElementFromContainer(screenContainerEl);
            this.clearArrayElement(this.storedOperands);
            console.log(this.storedOperands);
        }
        // this.buttonsForClearingContent.forEach((elem,i,array) => {
        //     if (e.target.textContent === array[0]) {
        //         console.log(elem);
        //         // console.log(array[0]);
        //         // console.log(e)
        //         this.clearContentFromContainer(screenContainerEl);
        //     } else if (e.target.textContent === array[1]) {
        //         console.log(array[1]);
        //         this.clearOnlyOneElementFromContainer(screenContainerEl);
        //         // console.log(screenContainerEl.children.length)
        //     }
        // })
    };
    
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
    this.renderElements(this.buttonsForClearingContent,buttonContainerForClearingEL,'button','button','clear-buttons');

    this.addListeners(calcContainerEL,'click',this.onClickOperators,this);
    this.addListeners(calcContainerEL,'click',this.onClickOperands,this);
    this.addListeners(calcContainerEL,'click',this.onClickButtonsForClearingContent,this);
}

let calc = new Calculator();

// calc.showElementOnScreen();
// calc.onClickOperators();
// calc.renderElements()