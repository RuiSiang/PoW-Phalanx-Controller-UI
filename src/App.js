import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./views/Home";

function App() {
  const [url, setURL] = useState("");
  const [connect, setConnect] = useState(false);
  return (
    <div className="App">
      {!connect ? (
        <div className="mainscreen one">
          <div className="heading">
            <span className="h4 text-muted">{"PoW Phalanx Endpoint".toUpperCase()}</span>
          </div>
          <div className="row my-3">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="http(s)://ip:port?token=xxxx"
                value={url}
                onChange={(e) => {
                  setURL(e.target.value);
                }}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary mb-3"
                onClick={() => {
                  setConnect(!connect);
                }}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Home url={url} />
      )}
    </div>
  );
}

export default App;
