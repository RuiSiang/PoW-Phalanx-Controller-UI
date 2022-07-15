import React, { useState, useEffect, useRef } from "react";
import sample from "./../providers/sample";
import colors from "./../providers/colors";
import openSocket from "socket.io-client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import "./../css/Home.css";
ChartJS.register(...registerables);

export default function Home(props) {
  const CTRL_STATS__STATS_REF = useRef(null);
  const CTRL_STATS__WHITELIST_REF = useRef(null);
  const [stats, setStats] = useState([]);
  const [whitelist, setWhitelist] = useState([]);
  const [payload, setPayload] = useState({
    phlx_override_difficulty: "",
    phlx_add_whitelist: "",
    phlx_remove_whitelist: "",
  });
  const [message, setMessage] = useState({
    value: "",
    color: "",
  });
  const socket = openSocket(props.url);

  // Constants**

  const changePayload = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const clearInput = (name) => {
    changePayload({
      target: {
        name: name,
        value: "",
      },
    });
  };

  const toView = (e) => {
    document
      .getElementById(e.target.getAttribute("data-name"))
      .scrollIntoView({ behavior: "smooth" });
  };

  const decodeStat = (stat) => {
    let output = {};
    let temp = stat.split(":");
    output["stat-type"] = temp[0];
    output["client-id"] = temp[1];
    let temp2 = temp[4].split("|");
    output["ISO-Timestamp"] = temp[2] + ":" + temp[3] + ":" + temp2[0];
    output["count"] = temp2[1];

    return output;
  };

  // Useful Functions**

  const phlx_override_difficulty = (e) => {
    if (socket.connected) {
      socket.emit("message", {
        method: "phlx_override_difficulty",
        arguments: [parseInt(payload.phlx_override_difficulty)],
      });
      setMessage({
        value: "phlx_override_difficulty".toUpperCase() + " emitted!",
        color: "success",
      });
      clearInput("phlx_override_difficulty");
    } else {
      setMessage({
        value: "Not connected to socket!",
        color: "danger",
      });
    }
  };

  const phlx_add_whitelist = (e) => {
    if (socket.connected) {
      socket.emit("message", {
        method: "phlx_add_whitelist",
        arguments: [payload.phlx_add_whitelist],
      });
      setMessage({
        value: "phlx_add_whitelist".toUpperCase() + " emitted!",
        color: "success",
      });
      clearInput("phlx_add_whitelist");
    } else {
      setMessage({
        value: "Not connected to socket!",
        color: "danger",
      });
    }
  };

  const phlx_remove_whitelist = (e) => {
    if (socket.connected) {
      socket.emit("message", {
        method: "phlx_remove_whitelist",
        arguments: [payload.phlx_remove_whitelist],
      });
      setMessage({
        value: "phlx_remove_whitelist".toUpperCase() + " emitted!",
        color: "success",
      });
      clearInput("phlx_remove_whitelist");
    } else {
      setMessage({
        value: "Not connected to socket!",
        color: "danger",
      });
    }
  };

  // Form submission functions**

  // useEffect(() => {
  //   let stats = sample.arguments.stats.map((one, i) => {
  //     return decodeStat(one);
  //   });
  //   setStats(stats);
  // }, []);

  // Dummy visuals**

  useEffect(() => {
    socket.on("connect", () => {
      if (socket.disconnected) {
        socket.connect();
      }
      // Re-try if disconnects

      socket.emit("message", {
        method: "ctrl_stats",
        arguments: ["stats", "whitelist"],
      });

      socket.on("message", function (data) {
        data = JSON.parse(data);
        console.log("Received", data.method + "...");
        let stats = data.arguments.stats.map((one, i) => {
          return decodeStat(one);
        });
        CTRL_STATS__STATS_REF.current = stats;
        CTRL_STATS__WHITELIST_REF.current = data.arguments.whitelist;
        setStats(() => {
          return CTRL_STATS__STATS_REF.current.map((item) => {
            return { ...item };
          });
        });
        setWhitelist(() => {
          return CTRL_STATS__WHITELIST_REF.current.map((item) => {
            return item;
          });
        });
      });
    });
    // Connection and post-processing of data**
  }, []);

  // **Charts configuration

  const createChartOptions = (label) => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: label.toUpperCase() + " x Client Stat Chart",
        },
      },
    };
  };

  const createChartContent = (label) => {
    let uniqueClient = [
      ...new Set(
        stats
          .filter((record, index2) => {
            return record["stat-type"] === label;
          })
          .map((a, b) => {
            return a["client-id"];
          })
      ),
    ];
    let labels = [
      ...new Set(
        stats
          .filter((record, index2) => {
            return record["stat-type"] === label;
          })
          .map((a, b) => {
            return a["ISO-Timestamp"];
          })
      ),
    ];
    return {
      labels,
      datasets: uniqueClient.map((client, index1) => {
        return {
          label: "Client# " + parseInt(index1 + 1) + " (" + client + ")",
          data: stats
            .filter((record, index2) => {
              return (
                record["client-id"] === client && record["stat-type"] === label
              );
            })
            .map((record, index2) => {
              return record.count;
            }),
          borderColor: colors[index1].half,
          backgroundColor: colors[index1].value,
        };
      }),
    };
  };

  return (
    <>
      <div className="__Home">
        <div className="heading">
          <span className="display-2">PoW Phalanx</span>
          <span className="display-6">Controller Dashboard</span>
        </div>
        <div className="navigation">
          <ul className="nav justify-content-center w-100">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#?"
                role="button"
                data-name="charts"
                onClick={toView}
              >
                Stat Charts
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#?"
                role="button"
                data-name="whitelist"
                onClick={toView}
              >
                Whitelist Tokens
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#?"
                role="button"
                data-name="forms"
                onClick={toView}
              >
                Control Actions
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="__Home" id="charts">
        <div className="heading">
          <span className="display-6">Stat Charts</span>
          {stats.length <= 0 ? (
            <span className="display-7 text-muted mt-3">Please wait...</span>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="chartParent">
              {stats.length > 0 ? (
                <Line
                  options={createChartOptions("bad_nonce")}
                  data={createChartContent("bad_nonce")}
                />
              ) : (
                "No data recieved for " + "bad_nonce".toUpperCase() + "..."
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="chartParent">
              {stats.length > 0 ? (
                <Line
                  options={createChartOptions("legit_req")}
                  data={createChartContent("legit_req")}
                />
              ) : (
                "No data recieved for " + "legit_req".toUpperCase() + "..."
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="chartParent">
              {stats.length > 0 ? (
                <Line
                  options={createChartOptions("prob_solved")}
                  data={createChartContent("prob_solved")}
                />
              ) : (
                "No data recieved for " + "prob_solved".toUpperCase() + "..."
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="chartParent">
              {stats.length > 0 ? (
                <Line
                  options={createChartOptions("ttl_req")}
                  data={createChartContent("ttl_req")}
                />
              ) : (
                "No data recieved for " + "ttl_req".toUpperCase() + "..."
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="chartParent">
              {stats.length > 0 ? (
                <Line
                  options={createChartOptions("ttl_solve_time")}
                  data={createChartContent("ttl_solve_time")}
                />
              ) : (
                "No data recieved for " + "ttl_solve_time".toUpperCase() + "..."
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="chartParent">
              {stats.length > 0 ? (
                <Line
                  options={createChartOptions("ttl_waf")}
                  data={createChartContent("ttl_waf")}
                />
              ) : (
                "No data recieved for " + "ttl_waf".toUpperCase() + "..."
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="__Home" id="whitelist">
        <div className="heading">
          <span className="display-6">Whitelist Tokens</span>
          {whitelist.length <= 0 ? (
            <span className="display-7 text-muted mt-3">Please wait...</span>
          ) : (
            ""
          )}
        </div>
        {whitelist.length > 0 ? (
          <div className="whitelist">
            <ul className="list-group">
              {whitelist.map((item, index) => {
                return (
                  <li className="list-group-item" key={index}>
                    {parseInt(index + 1)}. {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="__Home" id="forms">
        <div className="heading">
          <span className="display-6">Controller Actions</span>
          <span className={`text-${message.color}`}>{message.value}</span>
        </div>
        <div className="section my-3">
          <div className="one">
            <div className="heading">
              <span className="h4 text-muted">
                {"phlx_override_difficulty".toUpperCase()}
              </span>
            </div>
            <div className="row my-3">
              <div className="col-auto">
                <input
                  type="number"
                  className="form-control"
                  name="phlx_override_difficulty"
                  placeholder="..."
                  value={payload.phlx_override_difficulty}
                  onChange={changePayload}
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-primary mb-3"
                  onClick={phlx_override_difficulty}
                  disabled={
                    payload.phlx_override_difficulty !== "" ? false : true
                  }
                >
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="one">
            <div className="heading">
              <span className="h4 text-muted">
                {"phlx_add_whitelist".toUpperCase()}
              </span>
            </div>
            <div className="row my-3">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  name="phlx_add_whitelist"
                  placeholder="..."
                  value={payload.phlx_add_whitelist}
                  onChange={changePayload}
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-primary mb-3"
                  onClick={phlx_add_whitelist}
                  disabled={payload.phlx_add_whitelist !== "" ? false : true}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="one">
            <div className="heading">
              <span className="h4 text-muted">
                {"phlx_remove_whitelist".toUpperCase()}
              </span>
            </div>
            <div className="row my-3">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  name="phlx_remove_whitelist"
                  placeholder="..."
                  value={payload.phlx_remove_whitelist}
                  onChange={changePayload}
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-primary mb-3"
                  onClick={phlx_remove_whitelist}
                  disabled={payload.phlx_remove_whitelist !== "" ? false : true}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
