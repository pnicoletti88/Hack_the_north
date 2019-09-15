import React, { Component } from "react";
import { getBlocks } from "../../util";
import "./styles/chart.css";

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
    const data = await getBlocks();
    this.setState({ blocks: data, isLoading: false });
  };

  componentDidMount() {
    this.getData();
  }

  renderBlocks() {
    if (this.state.blocks) {
      console.log(this.state.blocks);
      return (
        <div className="blocks-holder">
          {this.state.blocks.map((block, i) => {
            return (
              <div className="block-container" key={i + "key"}>
                <div className="forced-container d-flex flex-column justify-content-center align-items-center">
                  <h4 className="block-index">{block.blockIndex}</h4>
                  <h4 className="transaction-type">{block.data.yeet1}</h4>
                  <h4 className="timestamp">{block.timeStamp}</h4>
                </div>
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
