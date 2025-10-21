
import React, { useEffect, useReducer } from "react";
import { Button, Container, Card, Badge } from "react-bootstrap";

const QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
  },
];

const HIGH_KEY = "questionbank_high_score";

function init() {
  const high = Number(localStorage.getItem(HIGH_KEY) || 0);
  return {
    questions: QUESTIONS,
    currentQuestion: 0,
    selectedOption: "",
    answered: false,
    feedback: null,
    score: 0,
    showScore: false,
    timeLeft: 10,
    highScore: high,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION": {
      if (state.answered || state.showScore) return state;
      const option = action.payload;
      const correct = state.questions[state.currentQuestion].answer;
      const isCorrect = option === correct;
      return {
        ...state,
        selectedOption: option,
        answered: true,
        feedback: isCorrect
          ? "✅ Correct! 🎉"
          : `❌ Incorrect! The correct answer is: ${correct}`,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }
    case "NEXT_QUESTION": {
      const isLast = state.currentQuestion === state.questions.length - 1;
      if (isLast) {
        const newHigh = Math.max(state.highScore, state.score);
        localStorage.setItem(HIGH_KEY, String(newHigh));
        return { ...state, showScore: true, highScore: newHigh };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        answered: false,
        feedback: null,
        timeLeft: 10,
      };
    }
    case "TICK": {
      if (state.answered || state.showScore) return state;
      const next = Math.max(0, state.timeLeft - 1);
      return { ...state, timeLeft: next };
    }
    case "TIME_UP": {
      if (state.answered || state.showScore) return state;
      const correct = state.questions[state.currentQuestion].answer;
      return {
        ...state,
        answered: true,
        feedback: `⏰ Time's up! ❌ The correct answer is: ${correct}`,
      };
    }
    case "RESTART": {
      const keepHigh = state.highScore;
      return { ...init(), highScore: keepHigh };
    }
    default:
      return state;
  }
}

export default function QuestionBank1() {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const {
    questions,
    currentQuestion,
    selectedOption,
    answered,
    feedback,
    score,
    showScore,
    timeLeft,
    highScore,
  } = state;

  const total = questions.length;
  const q = questions[currentQuestion];

  // Timer 1s
  useEffect(() => {
    if (showScore) return;
    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(id);
  }, [showScore]);

  // Hết giờ
  useEffect(() => {
    if (timeLeft === 0 && !answered && !showScore) {
      dispatch({ type: "TIME_UP" });
    }
  }, [timeLeft, answered, showScore]);

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        {!showScore ? (
          <>
            {/* Tiêu đề dự án */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">QuestionBank</h5>
              <Badge bg="secondary">
                {currentQuestion + 1} / {total}
              </Badge>
            </div>

            {/* Đồng hồ */}
            <div
              className="mb-2"
              style={{
                fontWeight: 700,
                color: timeLeft <= 5 ? "#dc3545" : "#0d6efd",
              }}
            >
              Time: {timeLeft}s
            </div>

            <h4 className="mb-3">
              Question {q.id}:<br />
              {q.question}
            </h4>

            <div className="mt-2">
              {q.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={
                    selectedOption === option ? "success" : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() =>
                    dispatch({ type: "SELECT_OPTION", payload: option })
                  }
                  disabled={answered}
                >
                  {option}
                </Button>
              ))}
            </div>

            {feedback && (
              <Card className="mt-3">
                <Card.Body className="py-2" style={{ fontWeight: 600 }}>
                  {feedback}
                </Card.Body>
              </Card>
            )}

            <Button
              className="mt-3"
              variant="primary"
              disabled={!answered}
              onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            >
              {currentQuestion === total - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </>
        ) : (
          <div className="text-center">
            <h2>Your Score: {score} / {total}</h2>
            <p style={{ fontSize: 18, marginTop: 8 }}>
              High Score: <strong style={{ color: "#0d6efd" }}>{highScore}</strong>
            </p>
            <Button variant="primary" onClick={() => dispatch({ type: "RESTART" })}>
              Restart
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
