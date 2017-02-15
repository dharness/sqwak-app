import React, {Component} from 'react';
import hljs from 'highlight.js'

class ResultsPanel extends Component {

  componentDidMount() {
    hljs.highlightBlock(this.codeBlock);
  }

  render () {
    return (
      <div className="sq-json-results-panel">
        <div className="sq-json-results-panel--header">
          JSON Response
        </div>
        <pre className="sq-json-results-panel--body json">
          <code ref={(e)=> {this.codeBlock = e; }}>
          {JSON.stringify({
            query: "Lemmons",
            topScoringIntent: {
              intent: "None",
              score: 0.9898
            },
            intents: [{
              intent: "None",
              score: 0.222
            }],
            entities: []
          }, null, "  ")}
          </code>
        </pre>
      </div>
    )
  }
}

export default ResultsPanel