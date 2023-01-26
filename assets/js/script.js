class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      // Store the text elements for the previous and current operands
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    // Clear the current and previous operands and set operation to undefined
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
   // Remove the last digit of current operand
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    // Append a number to the current operand
    appendNumber(number) {
      // If the number is a decimal point and the current operand already has a decimal point, return
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    // Choose an operation
    chooseOperation(operation) {
      // If the current operand is empty, return
      if (this.currentOperand === '') return
      // If there is a previous operand, compute the result
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
     // Compute the result based on the previous operand, current operand, and chosen operation
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      // If either operand is not a number, return
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    // Format the number to add commas for thousands
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    //updateDisplay function updates the current operand and previous operand on the calculator screen
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  // Selecting all the buttons from the calculator
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  
  document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key === '.') {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      calculator.chooseOperation(event.key)
      calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calculator.compute()
      calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      calculator.delete()
      calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
      event.preventDefault();
      calculator.clear()
      calculator.updateDisplay()
    }
  
  });
  