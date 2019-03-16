import React, { Component } from "react";
import "./App.css";
import { Navbar, Main } from "./components";

class App extends Component {
  state = {
    items: [],
    isLoading: true
  };

  fetchItems = endpoint => {
    return new Promise((resolve, reject) => {
      fetch(endpoint)
        .then(response => {
          if (response.status !== 200) {
            reject(
              "Looks like there was a problem. Status Code: " + response.status
            );
          }

          // Examine the items in the response
          response.json().then((data) => {
            resolve(data);
          });
        })
        .catch(function(err) {
          reject("Fetch Error :-S", err);
        });
    });
  };

  updateItemsList = category => {
    try {
      switch (category) {
        case "animals":
          this.fetchItems("http://styleguide.effectivedigital.com/interview/api/animals")
          .then((response) => console.log(response));
          return;
        case "fruits&veg":
          this.fetchItems("http://styleguide.effectivedigital.com/interview/api/fruitveg")
          .then((response) => console.log(response));
          return;
        default:
          return;
      }
    } catch (error) {
      
    }
    
  };

  render() {
    const { isLoading, items } = this.state;

    return (
      <div>
        <Navbar loadItems={this.updateItemsList}/>
        <Main isLoading={isLoading} items={items} />
      </div>
    );
  }
}

export default App;
