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

    this.storedResults = {
        storedOperands: [],
        storedOperator: [],
        storedResult: [],
        storedOperand1: '',
    };

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

    this.addValueToArray = function (passedArray,passedElement) {
        if (passedElement === '' || passedElement === '=') {
            return;
        } else {
            passedArray.push(passedElement);
        };
    };

    this.clearArray = function (passedArray) {
        passedArray.splice(0,passedArray.length);
    };

    this.clearArrayElement = function (passedArray) {
        passedArray.pop();
    };

    this.addValueToVariable = function (passedVar,value) {
        if (Number(value) || value == 0) {
            return passedVar += value;
        } else if (!Number(value)) {
            return passedVar = value;
        };
    };

    this.clearVariable = function (passedOperation) {
        return passedOperation = ''; 
    };

    this.calculate = function (numberArray,operatorArray) {

        let result = 0;

        numberArray.forEach((e,i,array) => {
            switch(operatorArray.length === 1 ? operatorArray[0] : operatorArray[1]) {
                case '+': 
                    operatorArray[0] === '-' ? result = -(-(Number(e)) + result) : result += Number(e);
                    console.log(result);
                    break;
                case '-':
                    operatorArray.length > 1 ? result = -(array[0]) : result = array[0];
                    console.log(result);
                    result -= Number(e);
                    console.log(result);
                    break;
                case '/':
                    operatorArray.length > 1 ? result = -(array[0]) : result = array[0];
                    console.log(result);
                    result /= Number(e);
                    console.log(result);
                    break;
                case '*':
                    operatorArray.length > 1 ? result = -(array[0]) : result = array[0];
                    console.log(result);
                    result *= Number(e);
                    console.log(result);
            };
        });

        this.storedResults.storedResult.push(result);
    };

    this.onClickOperators = function (e) {

        let itemContainsOperator = e.target.classList.contains('operator');
        let itemOperatorTextContent = e.target.textContent;

        if (this.storedResults.storedResult.length > 0) {
            console.log(itemOperatorTextContent);

            console.log('Final Result' ,this.storedResults.storedResult);
            
            return;

        }  else if (itemOperatorTextContent === '=' && this.storedResults.storedOperator.length > 0 && this.storedResults.storedOperands.length < 1) {
            console.log(itemOperatorTextContent);
            return;

        }  else if (itemOperatorTextContent === '=' && this.storedResults.storedOperator.length >= 1 && this.storedResults.storedOperand1.length > 0) { 
            console.log(itemOperatorTextContent);

            this.addValueToArray(this.storedResults.storedOperands,this.storedResults.storedOperand1);
            console.log('this.storedResults.storedOperands  ',this.storedResults.storedOperands)

            this.calculate(this.storedResults.storedOperands,this.storedResults.storedOperator);
            console.log('Final Result' ,this.storedResults.storedResult);

            this.showElementOnScreen(itemOperatorTextContent,screenContainerEl,'span','screen-process_element');
            this.showElementOnScreen(this.storedResults.storedResult,screenContainerEl,'span','screen-process_element');

        } else if (this.storedResults.storedOperator.length > 0 && this.storedResults.storedOperand1.length === 0) {
            console.log(itemOperatorTextContent);
            return;
            
        } else if (itemOperatorTextContent === '-' && this.storedResults.storedOperands.length === 0 && this.storedResults.storedOperand1.length < 1) {
            console.log(itemOperatorTextContent);

            this.showElementOnScreen(itemOperatorTextContent,screenContainerEl,'span','screen-process_element');

            this.addValueToArray(this.storedResults.storedOperator,itemOperatorTextContent);

            console.log('this.storedResults.storedOperator', this.storedResults.storedOperator);

        } else if (this.storedResults.storedOperand1.length > 0
            && this.storedResults.storedOperands.length > 0
            && this.storedResults.storedOperator.length > 0
            && itemOperatorTextContent !== '=') {
                console.log(itemOperatorTextContent);
                return;
        } else if (this.storedResults.storedOperand1.length === 0 && this.storedResults.storedOperands.length < 1 && this.storedResults.storedOperator.length < 1) {
            console.log(itemOperatorTextContent);
            return;

        } else if(itemContainsOperator && itemOperatorTextContent !== '=') {
            console.log(itemOperatorTextContent);
            this.showElementOnScreen(itemOperatorTextContent,screenContainerEl,'span','screen-process_element');
            

            this.addValueToArray(this.storedResults.storedOperator,itemOperatorTextContent);

            this.addValueToArray(this.storedResults.storedOperands,this.storedResults.storedOperand1);
            this.storedResults.storedOperand1 = this.clearVariable(this.storedResults.storedOperand1);

            console.log('this.storedResults.storedOperands  ',this.storedResults.storedOperands);
            console.log('this.storedResults.storedOperand1  ',this.storedResults.storedOperand1);

            console.log('this.storedResults.storedOperator  ',this.storedResults.storedOperator);
        };
    };

    this.onClickOperands = function (e) {

        let itemOperand = e.target.classList.contains('operand');
        let itemTextContent = e.target.textContent;

        if (this.storedResults.storedResult.length > 0) {
            console.log(itemTextContent);
            console.log('this.storedResults.storedResult.length ',this.storedResults.storedResult.length)
            return;

        } else if (this.storedResults.storedOperand1.length > 9) {
            console.log(itemTextContent);

            return;

        } else if (itemOperand) {
            console.log(itemTextContent);

            this.showElementOnScreen(itemTextContent,screenContainerEl,'span','screen-process_element');
            this.storedResults.storedOperand1 = this.addValueToVariable(this.storedResults.storedOperand1,itemTextContent);

            console.log('this.storedResults.storedOperand1 ',this.storedResults.storedOperand1);
            console.log('this.storedResults.storedOperands ',this.storedResults.storedOperands);
        };
    };

    this.onClickButtonsForClearingContent = function (e) {

        let pressedDeleteButton = e.target.textContent;

        if (pressedDeleteButton === this.buttonsForClearingContent[0] 
            && this.storedResults.storedOperands.length < 1 
            && this.storedResults.storedOperand1.length < 1 
            && this.storedResults.storedOperator.length < 1) {
                console.log(pressedDeleteButton);
                return;
        } else if (pressedDeleteButton === this.buttonsForClearingContent[0]) {

            console.log(pressedDeleteButton);

            this.clearContentFromContainer(screenContainerEl);

            this.clearArray(this.storedResults.storedOperands);
            console.log(this.storedResults.storedOperands);

            this.clearArray(this.storedResults.storedOperator);
            console.log(this.storedResults.storedOperator);

            this.clearArray(this.storedResults.storedResult);
            console.log(this.storedResults.storedResult);

            this.storedResults.storedOperand1 = this.clearVariable(this.storedResults.storedOperand1);
            console.log('this.storedResults.storedOperand1 ',this.storedResults.storedOperand1);

        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] && this.storedResults.storedResult.length > 0) {
            console.log(pressedDeleteButton);
            return;
        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] 
            && this.storedResults.storedOperands.length < 1 
            && this.storedResults.storedOperand1.length < 1 
            && this.storedResults.storedOperator.length < 1) {
                console.log(pressedDeleteButton);
                return;
        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] 
            && this.storedResults.storedOperands.length > 0 
            && this.storedResults.storedOperand1.length < 1 
            && this.storedResults.storedOperator.length > 1) {
                console.log(pressedDeleteButton);
                this.clearOnlyOneElementFromContainer(screenContainerEl);
                this.clearArrayElement(this.storedResults.storedOperator);
                console.log('this.storedResults.storedOperator ',this.storedResults.storedOperator);
        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] 
            && this.storedResults.storedOperands.length < 1 
            && this.storedResults.storedOperand1.length > 0 
            && this.storedResults.storedOperator.length > 0) {
                console.log(pressedDeleteButton);
                this.clearOnlyOneElementFromContainer(screenContainerEl);
                this.storedResults.storedOperand1 = this.storedResults.storedOperand1.slice(0, -1);
                console.log('this.storedResults.storedOperand1 ',this.storedResults.storedOperand1);
        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] 
            && this.storedResults.storedOperands.length < 1 
            && this.storedResults.storedOperand1.length < 1 
            && this.storedResults.storedOperator.length > 0) {
                console.log(pressedDeleteButton);
                this.clearOnlyOneElementFromContainer(screenContainerEl);
                this.clearArrayElement(this.storedResults.storedOperator);
                console.log('this.storedResults.storedOperator ',this.storedResults.storedOperator);
        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] 
            && this.storedResults.storedOperands.length > 0 
            && this.storedResults.storedOperand1.length > 0 
            && this.storedResults.storedOperator.length > 0) {
                console.log(pressedDeleteButton);
                this.clearOnlyOneElementFromContainer(screenContainerEl);
                this.storedResults.storedOperand1 = this.storedResults.storedOperand1.slice(0, -1);
                console.log('this.storedResults.storedOperand1 ',this.storedResults.storedOperand1);
        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] 
            && this.storedResults.storedOperands.length > 0 
            && this.storedResults.storedOperand1.length < 1 
            && this.storedResults.storedOperator.length > 0) {
                console.log(pressedDeleteButton);
                this.clearOnlyOneElementFromContainer(screenContainerEl);
                this.clearArrayElement(this.storedResults.storedOperator);
                console.log('this.storedResults.storedOperator ',this.storedResults.storedOperator);
        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] 
            && this.storedResults.storedOperands.length > 0 
            && this.storedResults.storedOperand1.length < 1 
            && this.storedResults.storedOperator.length < 1) {
                console.log(pressedDeleteButton);
                this.clearOnlyOneElementFromContainer(screenContainerEl);
                console.log('this.storedResults.storedOperands[0]', this.storedResults.storedOperands[0]);
                this.storedResults.storedOperand1 = this.addValueToVariable(this.storedResults.storedOperand1,this.storedResults.storedOperands[0]);
                this.clearArrayElement(this.storedResults.storedOperands);
                this.storedResults.storedOperand1 = this.storedResults.storedOperand1.slice(0, -1);
                console.log('this.storedResults.storedOperand1 ',this.storedResults.storedOperand1);
                console.log('this.storedResults.storedOperator ',this.storedResults.storedOperands);
        } else if (pressedDeleteButton === this.buttonsForClearingContent[1] 
            && this.storedResults.storedOperands.length < 1 
            && this.storedResults.storedOperand1.length > 0 
            && this.storedResults.storedOperator.length < 1) {
                console.log(pressedDeleteButton);
                console.log('this.storedResults.storedOperand1 ',this.storedResults.storedOperand1);
                this.clearOnlyOneElementFromContainer(screenContainerEl);
                this.storedResults.storedOperand1 = this.storedResults.storedOperand1.slice(0, -1);
                console.log('this.storedResults.storedOperand1 ',this.storedResults.storedOperand1);
        };
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