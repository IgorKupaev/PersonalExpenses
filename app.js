import { getAll, removeOne, createOne, editOne } from "./requests.js";

const appItems = document.querySelector('#appItems');
const totalCost = document.querySelector('#total');
const placeInput = document.querySelector('#placeInput');
const costInput = document.querySelector('#costInput');
const createButton = document.querySelector('#createButton');
const modal = document.querySelector('#modal');
const modalContainer = document.querySelector('#modalContainer');

const changeWhy = document.querySelector('#changeWhy');
const changeDate = document.querySelector('#changeDate');
const changeCost = document.querySelector('#changeCost');
const changeButton = document.querySelector('#changeButton');

let spendingItems = [];

let costInputState = '';
let placeInputState = '';

const setCostInputState = (value) => {
  costInputState = value;
  costInput.value = value;
}

const setPlaceInputState = (value) => {
  placeInputState = value;
  placeInput.value = value;
}

let changeWhyState = '';
let changeDateState = '';
let changeCostState = '';
let changeId = null;

const setChangeWhy = (value) => {
  changeWhyState = value;
  changeWhy.value = value;
}

const setChangeDate = (value) => {
  changeDateState = value;
  changeDate.value = value;
}

const setChangeCost = (value) => {
  changeCostState = value;
  changeCost.value = value;
}

const setChangeId = (value) => {
  changeId = value;
}

const containsOnlyNumbers = (str) => {
  return !isNaN(Number(str));
}

const getFormatedDate = () => {
  let year = new Date().getFullYear();
  let day = new Date().getDate();
  let month = String(new Date().getMonth() + 1);
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

const getTotal = (arr) => arr.reduce((acc, item) => acc + Number(item.cost), 0);

const createItem = () => {
  if (containsOnlyNumbers(costInputState)
    && placeInputState
    && costInputState
  ) {
    const item = {
      place: placeInputState,
      date: getFormatedDate(),
      cost: costInputState,
    }
    createOne(item);
    spendingItems.push(item);
    setCostInputState('');
    setPlaceInputState('');
    render();
  }
}

const changeItem = () => {
  if (changeWhyState && changeDateState && containsOnlyNumbers(changeCostState)) {
    spendingItems[changeId].place = changeWhyState;
    spendingItems[changeId].date = changeDateState;
    spendingItems[changeId].cost = changeCostState;
    editOne(spendingItems[changeId]._id, changeWhyState, changeDateState, changeCostState);
    closeModal();
    render();
  }
}

const removeItem = (e) => {
  const domEl = e.target.parentNode.parentNode.id;
  removeOne(spendingItems[domEl]._id);
  spendingItems = spendingItems.filter((el, index) => {
    return index != domEl ? true : false;
  })
  render();
}

const openModal = (e) => {
  modal.style = 'display: flex';
  const id = e.target.parentNode.parentNode.id;
  setChangeId(id);
  const item = spendingItems[id];
  setChangeCost(item.cost);
  setChangeDate(item.date);
  setChangeWhy(item.place);
}

const closeModal = () => {
  modal.style = '';
  setChangeId(null);
  setChangeCost('');
  setChangeDate('');
  setChangeWhy('');
}

function render() {
  appItems.innerHTML = '';
  spendingItems.forEach((el, index) => {
    const spendingItem = document.createElement('div');
    const appItemWhy = document.createElement('div');
    const appItemDate = document.createElement('div');
    const appItemSum = document.createElement('div');
    const appItemButtons = document.createElement('div');
    const appItemEdit = document.createElement('div');
    const appItemEditimage = document.createElement('img');
    const appItemRemove = document.createElement('div');
    const appItemRemoveImage = document.createElement('img');
    
    spendingItem.className = 'appItem';
    spendingItem.id = index;
    appItemWhy.className = 'appItemWhy';
    appItemDate.className = 'appItemDate';
    appItemSum.className = 'appItemSum';
    appItemButtons.className = 'appItemButtons';
    appItemEdit.classList = 'appItemEdit';
    appItemEditimage.src = 'images/edit.svg';
    appItemEditimage.alt = 'edit';
    appItemRemove.className = 'appItemRemove';
    appItemRemoveImage.src = 'images/remove.svg';
    appItemRemoveImage.alt = 'remove';

    spendingItem.appendChild(appItemWhy);
    spendingItem.appendChild(appItemDate);
    spendingItem.appendChild(appItemSum);
    spendingItem.appendChild(appItemButtons);
    appItemButtons.appendChild(appItemEdit);
    appItemEdit.appendChild(appItemEditimage);
    appItemButtons.appendChild(appItemRemove);
    appItemRemove.appendChild(appItemRemoveImage);

    appItemWhy.innerText = `${index + 1}) ${el.place.trim()}`;
    appItemDate.innerText = `${el.date}`;
    appItemSum.innerText = `${el.cost} р.`;
    
    appItems.appendChild(spendingItem);
    
    appItemEdit.addEventListener('click', openModal);
    appItemRemove.addEventListener('click', removeItem);
  })
  totalCost.innerText = `Итого: ${getTotal(spendingItems)} р.`;
}

costInput.addEventListener('change', e => setCostInputState(e.target.value));
placeInput.addEventListener('change', e => setPlaceInputState(e.target.value));
changeWhy.addEventListener('change', e => setChangeWhy(e.target.value));
changeDate.addEventListener('change', e => setChangeDate(e.target.value));
changeCost.addEventListener('change', e => setChangeCost(e.target.value));
createButton.addEventListener('click', createItem);
modal.addEventListener('click', closeModal);
modalContainer.addEventListener('click', e => e.stopPropagation());
changeButton.addEventListener('click', changeItem);

const runApp = async () => {
  spendingItems = await getAll();
  await render();
}

runApp();
