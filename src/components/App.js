import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  //lifecycle methods
  componentDidMount() {
    //refs in firebadse are a reference to a piecve of data in the db
    //first reinstate local storage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  //when we leave a component that is syncing data we need to unmount it to clean things up and avoid memory leaks
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  //custom methods
  addFish = fish => {
    const fishesCopy = { ...this.state.fishes };
    fishesCopy[`fish${Date.now()}`] = fish;
    this.setState({
      fishes: fishesCopy
    });
  };

  updateFish = (key, updatedFish) => {
    //take copy of state
    const fishesCopy = { ...this.state.fishes };
    //update the state
    fishesCopy[key] = updatedFish;
    //set the state
    this.setState({ fishes: fishesCopy });
  };

  deleteFish = key => {
    //copy state
    const fishesCopy = { ...this.state.fishes };
    //remove the fish from the copy
    fishesCopy[key] = null;
    //set the new state
    this.setState({ fishes: fishesCopy });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    //take copy of state
    const orderCopy = { ...this.state.order };

    //add to the order or update the number in our order
    orderCopy[key] = orderCopy[key] + 1 || 1;

    //call setstate to update our state object
    this.setState({
      order: orderCopy
    });
  };

  deleteFromOrder = key => {
    //get a copy of the order
    const orderCopy = { ...this.state.order };
    //remove the item from the order
    delete orderCopy[key];
    //update state
    this.setState({
      order: orderCopy
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Get ya fish bish" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => {
              return (
                <Fish
                  addToOrder={this.addToOrder}
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          loadSampleFishes={this.loadSampleFishes}
          addFish={this.addFish}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
