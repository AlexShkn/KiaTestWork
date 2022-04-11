function getCar() {
	fetch('http://109.236.74.74:9900/getdata')
		.then(car => car.json())
		.then(renderCard)
		.catch(err => console.log(err));
}

const renderFormBtn = document.querySelector('.btn-edit');
const cardForm = document.forms['card-form'];
const inputCardName = cardForm.elements['card-name'];
const inputCardOwner = cardForm.elements['card-owner'];
const inputCardEmail = cardForm.elements['card-email'];
const inputCardAll = document.querySelectorAll('.card-form__input');

renderFormBtn.addEventListener('click', () => {
	cardForm.classList.toggle('form-visible');
});

cardForm.addEventListener('submit', e => {
	e.preventDefault();
	validateForm(inputCardAll);
	cardEditValue();
});

function renderCard(data) {
	const dataLowerKey = objectKeysToLowerCase(data);
	const carCard = document.querySelector('.car-card');
	let template = cardTemplate(dataLowerKey);
	carCard.insertAdjacentHTML('afterbegin', template);
}

function cardTemplate({ item, garage }) {
	const imageCar = 'https://avtonam.ru/wp-content/uploads/2021/07/kia-sportage-2022-1.jpg';
	return `
      <div class="card-car__main card">
      <div class="card__description">
         <div class="card__title">${item.title}</div>
         <div class="card__text">${item.description}</div>
      </div>
      <div class="car-card__bottom">
         <div class="card__img"><img src="${imageCar}" alt="kia sportage"></div>
         <div class="car__options">
            <div class="car__original original">
               <div class="original__make bold">Make: <span>${item.original.make}</span></div>
               <div class="original__model bold">Model: <span>${item.original.model}</span></div>
               <div class="original__color bold">Color: <span>${
									item.original.caroptions.title
								}</span></div>
            </div>
            <div class="car__values values">
               <div class="values__fuel-type bold">Fuel type: <span>${item.keyvalues.fueltype.toUpperCase()}</span></div>
               <div class="values__trim-level bold">Trim level: <span>${
									item.keyvalues.trimlevel
								}</span></div>
               <div class="values__gear-box bold">Gear box: <span>${item.keyvalues.gearbox.toUpperCase()}</span></div>
            </div>
         </div>
      </div>
   </div>
   <div class="car__contacts contacts-car">
      <h2 class="contacts-car__title">Garage contacts:</h2>
      <div class="contacts-car__name bold">Name: <span>${garage.name}</span></div>
      <div class="contacts-car__owner bold">Owner: <span>${garage.owner}</span></div>
      <div class="contacts-car__email bold">Email: <span>${garage.email}</span></div>
   </div>
	`;
}

function cardEditValue() {
	if (inputCardOwner.value && inputCardName.value && inputCardEmail.value) {
		document.querySelector('.contacts-car__name span').textContent = inputCardName.value;
		document.querySelector('.contacts-car__owner span').textContent = inputCardOwner.value;
		document.querySelector('.contacts-car__email span').textContent = inputCardEmail.value;
		cardForm.reset();
	}
}

function validateForm(inputs) {
	inputs.forEach(input =>
		!input.value ? input.classList.add('warning') : input.classList.remove('warning'),
	);
}

function objectKeysToLowerCase(input) {
	if (typeof input !== 'object') return input;
	if (Array.isArray(input)) return input.map(objectKeysToLowerCase);
	return Object.keys(input).reduce(function (newObj, key) {
		let val = input[key];
		let newVal = typeof val === 'object' && val !== null ? objectKeysToLowerCase(val) : val;
		newObj[key.toLowerCase()] = newVal;
		return newObj;
	}, {});
}

getCar();
