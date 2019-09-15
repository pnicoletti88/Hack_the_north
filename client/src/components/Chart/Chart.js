import React, { Component } from "react";
import axios from "axios";
import { getBlocks } from "../../util";
import "./styles/chart.css";
import arrow from "../../assets/arrow.png";
import {dbURL} from "../../util";

export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      blocks: [],
      error: null,
      isLoading: true
    };
  }

  getData = async () => {
    const data = await axios.get(`${dbURL}/hooks/getBlocks`);
    this.setState({ blocks: data.data, isLoading: false });
  };

  componentDidMount() {
    this.getData();
  }

  renderBlocks() {
    if (this.state.blocks) {
      return (
        <div className="blocks-holder">
          {this.state.blocks.map((block, i) => {
            return (
              <div className="flexxin">
              <div className="block-container" key={i + "key"}>
                <div className="forced-container d-flex flex-column justify-content-center align-items-center">
                  <h4 className="block-index">{this.state.blocks.length -i}</h4>
                  <h4 className="transaction-type">{block.data.type}</h4>
                  <h4 className="transaction-type">{block.data.amount}</h4>
                  <h4 className="timestamp">{block.timeStamp}</h4>
                </div>
              </div>
              {i !== 0 ? <img src={arrow} className="arrow"/> : null}
              </div>
            );
          })}
        </div>
      );
    }
  }
  render() {
    const { blocks } = this.state;

    if (!blocks) {
      return null;
    }

    return <div className="blocks-main-container">{this.renderBlocks()}</div>;
  }
  v;
}
