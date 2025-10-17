import React, { useReducer } from "react";
import { Button } from "react-bootstrap";

const initialState = { BatDen: false };

function reducer(state, action) {
  switch (action.type) {
    case "CHUYEN_DOI":
      return { BatDen: !state.BatDen };
    case "BAT_DEN":
      return { BatDen: true };
    case "TAT_DEN":
      return { BatDen: false };
    default:
      return state;
  }
}

export default function LightSwitch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2 className="mb-3">Công Tắc Đèn</h2>
      <p>Đèn hiện đang: {state.BatDen ? "BẬT" : "TẮT"} </p>

      <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
        <Button
          onClick={() => dispatch({ type: "CHUYEN_DOI" })}
        >
          Chuyển đổi
        </Button>

        <Button
          disabled={state.BatDen}
          onClick={() => dispatch({ type: "BAT_DEN" })}
        >
          Bật đèn
        </Button>

        <Button
          disabled={!state.BatDen}
          onClick={() => dispatch({ type: "TAT_DEN" })}
        >
          Tắt đèn
        </Button>
      </div>
    </div>

);
}
