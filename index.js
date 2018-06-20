// Define root action reducer
const rootReducer = (state={count: 0}, action) => {
	
	let newState = Object.assign({}, state);

	switch(action.type){
		case "INCREMENT": // increment count by 1
			newState.count++;
			return newState;

		case "DECREMENT": // decrement count by 1
			newState.count--;
			return newState;

		case "SAVE": // save count to local storage
			localStorage.setItem('count', newState.count);
			return newState;

		case "RESET": // reset count to 0 and clear local storage
			localStorage.removeItem('count');
			return {count: 0};

		case "LOAD":
			newState.count = localStorage.getItem('count');
			return newState;

		default:
			return newState;
	}
};

// Create store using rootReducer
const store = Redux.createStore(rootReducer);

// Define callback function updating displayed count
const updateCountCB = () => {
	let count = document.getElementById('count');
	count.textContent = store.getState().count;
}

// Attach callback function to state change
store.subscribe(updateCountCB);

// Check if count has been saved to localStorage
if(localStorage.getItem('count')){
	let count = document.getElementById('count');
	count.textContent = localStorage.getItem('count');
	store.dispatch({type: "LOAD"});
}

// Add event listeners to buttons
const incButton = document.getElementsByClassName('inc')[0];
incButton.addEventListener('click', function(event){
	store.dispatch({type:"INCREMENT"});
});

const decButton = document.getElementsByClassName('dec')[0];
decButton.addEventListener('click', function(event){
	store.dispatch({type:"DECREMENT"});
});

const saveButton = document.getElementsByClassName('save')[0];
saveButton.addEventListener('click', function(event){
	store.dispatch({type:"SAVE"});
});

const resetButton = document.getElementsByClassName('reset')[0];
resetButton.addEventListener('click', function(event){
	store.dispatch({type:"RESET"});
});