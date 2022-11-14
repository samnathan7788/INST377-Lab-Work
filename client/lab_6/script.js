  let ul = document.createElement('ul');
  div.appendChild(ul);
  for(let i = 0; i < 15; i += 1) 
  {
    let li = document.createElement('li');
    li.innerText = list[i].name;
    ul.appendChild(li);
    const loadingAnimation = document.getElementById('lds-ellipsis');
    loadingAnimation.style.display = 'none';
    submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available
  
    // And here's an eventListener! It's listening for a "submit" button specifically being clicked
    // this is a synchronous event event, because we already did our async request above, and waited for it to resolve
    form.addEventListener('submit', (submitEvent) => {
      // This is needed to stop our page from changing to a new URL even though it heard a GET request
      submitEvent.preventDefault();

      // This constant will have the value of your 15-restaurant collection when it processes
      const restaurantList = processRestaurants(arrayFromJson.data);

      // And this function call will perform the "side effect" of injecting the HTML list for you
      injectHTML(restaurantList);

      // By separating the functions, we open the possibility of regenerating the list
      // without having to retrieve fresh data every time
      // We also have access to some form values, so we could filter the list based on name
    });
  }
}

/*
  This last line actually runs first!
  It's calling the 'mainEvent' function at line 57
  It runs first because the listener is set to when your HTML content has loaded
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
