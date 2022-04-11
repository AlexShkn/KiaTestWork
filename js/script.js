function getCar() {
	fetch('http://109.236.74.74:9900/getdata')
		.then(car => car.json())
		.then(renderCard)
		.catch(err => console.log(err));
}

// form edit
const cardAddFormBtn = document.querySelector('.btn-edit');
const cardForm = document.forms['card-form'];
const inputCardName = cardForm.elements['card-name'];
const inputCardOwner = cardForm.elements['card-owner'];
const inputCardEmail = cardForm.elements['card-email'];

cardAddFormBtn.addEventListener('click', () => {
	cardForm.classList.toggle('form-visible');
});

cardForm.addEventListener('submit', e => {
	e.preventDefault();
	cardEditValue();
});

function renderCard(data) {
	const carCard = document.querySelector('.car-card');
	let template = cardCarTemplate(data);
	carCard.insertAdjacentHTML('afterbegin', template);
}

function cardCarTemplate({ Item, Garage }) {
	const imageCar = 'https://avtonam.ru/wp-content/uploads/2021/07/kia-sportage-2022-1.jpg';
	return `
	         <div class="card-car__main card">
            <div class="card__description">
               <div class="card__title">${Item.Title}</div>
               <div class="card__text">${Item.Description}</div>
            </div>
            <div class="car-card__bottom">
               <div class="card__img"><img src="${imageCar}" alt="kia sportage"></div>
               <div class="car__options">
                  <div class="car__original original">
                     <div class="original__make bold">Make: <span>${Item.Original.Make}</span></div>
                     <div class="original__model bold">Model: <span>${Item.Original.Model}</span></div>
                     <div class="original__color bold">Color: <span>${Item.Original.CarOptions.Title}</span></div>
                  </div>
                  <div class="car__values values">
                     <div class="values__fuel-type bold">Fuel type: <span>${Item.KeyValues.FuelType}</span></div>
                     <div class="values__trim-level bold">Trim level: <span>${Item.KeyValues.TrimLevel}</span></div>
                     <div class="values__gear-box b bold">Gear box: <span>${Item.KeyValues.GearBox}</span></div>
                  </div>
               </div>
            </div>
         </div>
         <div class="car__contacts contacts-car">
		        <h2 class="contacts-car__title">Garage contacts:</h2>
            <div class="contacts-car__name bold">Name: <span>${Garage.Name}</span></div>
            <div class="contacts-car__owner bold">Owner: <span>${Garage.Owner}</span></div>
            <div class="contacts-car__email bold">Email: <span>${Garage.Email}</span></div>
         </div>
	`;
}

function cardEditValue() {
	const contactName = document.querySelector('.contacts-car__name span');
	const contactOwner = document.querySelector('.contacts-car__owner span');
	const contactEmail = document.querySelector('.contacts-car__email span');

	if (inputCardOwner.value && inputCardName.value && inputCardEmail.value !== '') {
		contactName.textContent = inputCardName.value;
		contactOwner.textContent = inputCardOwner.value;
		contactEmail.textContent = inputCardEmail.value;
	}
	cardForm.reset();
}

getCar();
