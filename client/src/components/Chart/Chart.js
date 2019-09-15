import React, { Component } from "react";
import { getBlocks } from "../../util";
import PropTypes from "prop-types";
import "./styles/chart.css";

export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      blocks: null,
      error: null,
      isLoading: true
    };
  }

  getData = async () => {
    const data = await getBlocks();
    this.setState({ blocks: data, isLoading: false });
  };

  componentDidMount() {
    this.getData();
  }

  renderBlocks() {
    if (this.state.blocks) {
      return (
        <div className="blocks-holder d-flex justify-content-center align-items-center">
          {this.state.blocks.map((block, i) => {
            return (
              <div
                className="block-container d-flex flex-column justify-content-center align-items-center"
                key={i + "key"}
              >
                <h4 className="block-index">{block.blockIndex}</h4>
                <h4 className="transaction-type">{block.data.yeet1}</h4>
                <h4 className="timestamp">{block.timeStamp}</h4>
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
