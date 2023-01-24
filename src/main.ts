import './style.css';

// function to get values from user interface
const getValues = (e: Event): void => {
	// prevent default form behaviour (page refresh)
	e.preventDefault();

	// get elements from html page
	const fizzValueInput = document.getElementById(
		'fizzValue'
	) as HTMLInputElement;
	const buzzValueInput = document.getElementById(
		'buzzValue'
	) as HTMLInputElement;

	// get values from inputs and parse to integers
	const fizzValue = parseInt(fizzValueInput.value);
	const buzzValue = parseInt(buzzValueInput.value);

	// check if values entered by user are invalid
	if (!Number.isInteger(fizzValue) || !Number.isInteger(buzzValue)) {
		// display error on page if invalid input
		handleError('You can only enter numbers in the inputs above.');
	} else {
		// call generateNumbers function to generate numbers from 1 - 100
		const numbers = generateNumbers(1, 100);

		const fizzBuzzResult = fizzBuzz(numbers, fizzValue, buzzValue);

		// call displayNumbers function
		displayNumbers(fizzBuzzResult);
	}
};

// function to generate numbers between two values
const generateNumbers = (startValue: number, endValue: number): number[] => {
	const numbers: number[] = [];

	// loop through all numbers from fizzValue to buzzValue
	for (let i = startValue; i <= endValue; i++) {
		// add current number to end of numbers array
		numbers.push(i);
	}

	return numbers;
};

// function to swap values for fizz/buzz/fizzbuzz
const fizzBuzz = (
	numbers: number[],
	fizzValue: number,
	buzzValue: number
): (number | string)[] => {
	const fizzBuzzResult: (number | string)[] = [];

	// loop through numbers
	for (let i = 0; i < numbers.length; i++) {
		if (numbers[i] % fizzValue === 0 && numbers[i] % buzzValue === 0) {
			// if current number is a multiple of both values replace with fizzbuzz
			fizzBuzzResult[i] = 'FizzBuzz';
		} else if (numbers[i] % fizzValue === 0) {
			// if current number is only a multiple of first value replace with fizz
			fizzBuzzResult[i] = 'Fizz';
		} else if (numbers[i] % buzzValue === 0) {
			// if current number is only a multiple of second value replace with buzz
			fizzBuzzResult[i] = 'Buzz';
		} else {
			// if no match remain as number
			fizzBuzzResult[i] = numbers[i];
		}
	}

	return fizzBuzzResult;
};

// function to display number range
const displayNumbers = (fizzBuzzResult: (number | string)[]): void => {
	// get table body from html document
	const tableBody = document.getElementById(
		'results'
	) as HTMLTableSectionElement;

	let templateRows = '';

	// loop through all the numbers
	for (let i = 0; i < fizzBuzzResult.length; i++) {
		const value = fizzBuzzResult[i];

		// set appropriate class to current result
		const className =
			value === 'FizzBuzz'
				? 'table-primary'
				: value === 'Fizz'
				? 'table-success'
				: value === 'Buzz'
				? 'table-warning'
				: '';

		// update template rows
		templateRows += `<tr class="${className}"><td>${value}<td></tr>`;
	}
	console.log(fizzBuzzResult);
	// update html in table body
	tableBody.innerHTML = templateRows;
};

// function to display and hide error message
const handleError = (message?: string): void => {
	// get error box element from html
	const errorBox = document.getElementById('error') as HTMLDivElement;

	if (message) {
		// display if message received
		errorBox.innerText = message;
		errorBox.classList.remove('d-none');
	} else if (!errorBox.classList.contains('d-none')) {
		// else remove error box if one exists
		errorBox.innerText = '';
		errorBox.classList.add('d-none');
	}
};

// get button element
const submitButton = document.getElementById('submit') as HTMLButtonElement;

// create event listener for when user clicks button
submitButton.addEventListener('click', getValues);
