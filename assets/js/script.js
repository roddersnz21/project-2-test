// Define the Calculator class
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
	  // Convert the number to a string
	  const stringNumber = number.toString()
	  // Split the string into the integer and decimal parts
	  const integerDigits = parseFloat(stringNumber.split('.')[0])
	  const decimalDigits = stringNumber.split('.')[1]
	  // Create a variable to store the integer part of the number in display format
	  let integerDisplay
	  // If the integer part is not a number, set integerDisplay to an empty string
	  if (isNaN(integerDigits)) {
		integerDisplay = ''
	  } else {
		// Otherwise, format the integer part as a localised string with no fractional digits
		integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
	  }
	  // If there are decimal digits, return the number in the format 'integerDisplay.decimalDigits'
	  if (decimalDigits != null) {
		return `${integerDisplay}.${decimalDigits}`
	  } else {
		// Otherwise, return just the formatted integer part
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
  
  // Select all buttons with data-number attribute
  const numberButtons = document.querySelectorAll('[data-number]')
  // Select all buttons with data-operation attribute
  const operationButtons = document.querySelectorAll('[data-operation]')
  // Select the button with data-equals attribute
  const equalsButton = document.querySelector('[data-equals]')
  // Select the button with data-delete attribute
  const deleteButton = document.querySelector('[data-delete]')
  // Select the button with data-all-clear attribute
  const allClearButton = document.querySelector('[data-all-clear]')
  // Select the element with data-previous-operand attribute
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  // Select the element with data-current-operand attribute
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  // Set calculator class to make variable operate in calculator object
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  // Add click event listener to each number button
  numberButtons.forEach(button => {
	button.addEventListener('click', () => {
	  // Append number to calculator and update display
	  calculator.appendNumber(button.innerText)
	  calculator.updateDisplay()
	})
  })
  
  // Add click event listener to each operation button
  operationButtons.forEach(button => {
	button.addEventListener('click', () => {
	  // Choose operation and update display
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