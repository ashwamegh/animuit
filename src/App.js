import React, { Component } from "react";
import "./App.css";
import { Navbar, Main } from "./components";

class App extends Component {
  state = {
    items: [],
    isLoading: false
  };

  componentWillMount() {
    this.updateItemsList("animals");
  }

  fetchItems = endpoint => {
    return new Promise((resolve, reject) => {
      fetch(endpoint)
        .then(response => {
          if (response.status !== 200) {
            this.setState({ isLoading: false });
            reject(
              "Looks like there was a problem. Status Code: " + response.status
            );
          }

          // Examine the items in the response
          response.json().then(data => {
            this.setState({ isLoading: false });
            resolve(data);
          });
        })
        .catch(err => {
          this.setState({ isLoading: false });
          reject("Fetch Error :-S", err);
        });
    });
  };

  updateItemsList = category => {
    try {
      this.setState({ isLoading: true });
      switch (category) {
        case "animals":
          this.fetchItems(
            "http://styleguide.effectivedigital.com/interview/api/animals"
          ).then(items => this.setState({ items }));
          return;
        case "fruits&veg":
          this.fetchItems(
            "http://styleguide.effectivedigital.com/interview/api/fruitveg"
          ).then(items => this.setState({ items }));
          return;
        default:
          return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { isLoading, items } = this.state;

    return (
      <div>
        <Navbar loadItems={this.updateItemsList} />
        <Main isLoading={isLoading} items={items} />
      </div>
    );
  }
}

export default App;
