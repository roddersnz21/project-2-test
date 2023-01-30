class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
	  // store the element references for updating the display	
	  this.previousOperandTextElement = previousOperandTextElement
	  this.currentOperandTextElement = currentOperandTextElement
	  // call the clear function to set initial values
	  this.clear()
	}
  
	// function to clear all values
	clear() {
	  this.currentOperand = ''
	  this.previousOperand = ''
	  this.operation = undefined
	}
  
	// function to delete last character from current operand
	delete() {
	  this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
  
	// function to append a number to the current operand
	appendNumber(number) {
	  // prevent adding more than one decimal point
	  if (number === '.' && this.currentOperand.includes('.')) return
	  this.currentOperand = this.currentOperand.toString() + number.toString()
	}
  
	// function to choose an operation
	chooseOperation(operation) {
	  // prevent choosing operation if there's no current operand
	  if (this.currentOperand === '') return
	  // if there's a previous operand, compute it first
	  if (this.previousOperand !== '') {
		this.compute()
	  }
	  // store the operation
	  this.operation = operation
	  // store the current operand as previous operand
	  this.previousOperand = this.currentOperand
	  this.currentOperand = ''
	}
  
	// function to perform the computation
	compute() {
	  let computation
	  const prev = parseFloat(this.previousOperand)
	  const current = parseFloat(this.currentOperand)
	  // return if either prev or current is not a number
	  if (isNaN(prev) || isNaN(current)) return
	  // perform the computation based on the chosen operation
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
	  
	  // update the current operand with the result of the computation
	  this.currentOperand = computation
	  this.operation = undefined
	  this.previousOperand = ''
	}
  
	// function to format the display number
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