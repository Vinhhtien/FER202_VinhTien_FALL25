import React, { useReducer } from "react";
import { Button, Container, Card, ProgressBar, Badge } from "react-bootstrap";

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

function initState() {
  const savedHigh = Number(localStorage.getItem("quiz_high_score") || 0);
  return {
    questions: QUESTIONS,
    currentQuestion: 0,
    selectedOption: "",
    answered: false,
    feedback: null,
    score: 0,
    showScore: false,
    highScore: savedHigh,
  };
}

function quizReducer(state, action) {
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
      const last = state.currentQuestion === state.questions.length - 1;
      if (last) {
        const newHigh = Math.max(state.highScore, state.score);
        localStorage.setItem("quiz_high_score", String(newHigh));
        return { ...state, showScore: true, highScore: newHigh };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        answered: false,
        feedback: null,
      };
    }
    case "RESTART_QUIZ": {
      const keepHigh = state.highScore;
      return { ...initState(), highScore: keepHigh };
    }
    default:
      return state;
  }
}

export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, undefined, initState);
  const {
    questions, currentQuestion, selectedOption,
    answered, feedback, score, showScore, highScore,
  } = state;

  const total = questions.length;
  const q = questions[currentQuestion];

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        {!showScore ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Quiz</h5>
              <Badge bg="secondary">{currentQuestion + 1} / {total}</Badge>
            </div>
            <ProgressBar
              now={((currentQuestion + 1) / total) * 100}
              className="mb-3"
              style={{ height: 8 }}
            />

            <h4 className="mb-3">
              Question {q.id}:<br />{q.question}
            </h4>

            <div className="mt-2">
              {q.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const variant = isSelected ? "success" : "outline-secondary";
                return (
                  <Button
                    key={idx}
                    variant={variant}
                    className="m-2"
                    onClick={() => dispatch({ type: "SELECT_OPTION", payload: option })}
                    disabled={answered}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {feedback && (
              <Card className="mt-3">
                <Card.Body className="py-2" style={{ fontWeight: 600 }}>
                  {feedback}
                </Card.Body>
              </Card>
            )}

            <div className="mt-3">
              <Button
                variant="primary"
                onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                disabled={!answered}
              >
                {currentQuestion === total - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="mb-3">Your Score: {score} / {total}</h2>
            <p className="mb-4" style={{ fontSize: 18 }}>
              High Score: <strong style={{ color: "#0d6efd" }}>{highScore}</strong>
            </p>
            <Button variant="primary" onClick={() => dispatch({ type: "RESTART_QUIZ" })}>
              Restart Quiz
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}


// // src/components/QuestionBank.js
// import React, { useEffect, useReducer } from "react";
// import { Button, Container, Card, ProgressBar, Badge } from "react-bootstrap";

// // ----- DỮ LIỆU CÂU HỎI MẪU -----
// const QUESTIONS = [
//   {
//     id: 1,
//     question: "What is the capital of Australia?",
//     options: ["Sydney", "Canberra", "Melbourne", "Perth"],
//     answer: "Canberra",
//   },
//   {
//     id: 2,
//     question: "Which planet is known as the Red Planet?",
//     options: ["Venus", "Mars", "Jupiter", "Saturn"],
//     answer: "Mars",
//   },
//   {
//     id: 3,
//     question: "What is the largest ocean on Earth?",
//     options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
//     answer: "Pacific Ocean",
//   },
// ];

// // ----- HÀM KHỞI TẠO LƯỜI (đọc highScore từ localStorage) -----
// function initState() {
//   const savedHigh = Number(localStorage.getItem("quiz_high_score") || 0);
//   return {
//     questions: QUESTIONS,
//     currentQuestion: 0,
//     selectedOption: "",
//     answered: false,          // Đã trả lời câu hiện tại chưa?
//     feedback: null,           // "Correct! 🎉" hoặc "Incorrect! ..."
//     score: 0,
//     showScore: false,
//     timeLeft: 10,             // 10 giây mỗi câu
//     highScore: savedHigh,     // Điểm cao nhất đã lưu
//   };
// }

// // ----- REDUCER -----
// function quizReducer(state, action) {
//   switch (action.type) {
//     case "SELECT_OPTION": {
//       if (state.answered || state.showScore) return state; // khóa nếu đã trả lời/hết bài
//       const option = action.payload;
//       const correct = state.questions[state.currentQuestion].answer;
//       const isCorrect = option === correct;

//       return {
//         ...state,
//         selectedOption: option,
//         answered: true,
//         feedback: isCorrect
//           ? "✅ Correct! 🎉"
//           : `❌ Incorrect! The correct answer is: ${correct}`,
//         score: isCorrect ? state.score + 1 : state.score,
//       };
//     }

//     case "NEXT_QUESTION": {
//       // Nếu là câu cuối -> kết thúc, cập nhật high score
//       const last = state.currentQuestion === state.questions.length - 1;
//       if (last) {
//         const newHigh = Math.max(state.highScore, state.score);
//         // Lưu vào localStorage
//         localStorage.setItem("quiz_high_score", String(newHigh));
//         return {
//           ...state,
//           showScore: true,
//           highScore: newHigh,
//         };
//       }

//       // Sang câu mới: reset trạng thái câu, timer về 10s
//       return {
//         ...state,
//         currentQuestion: state.currentQuestion + 1,
//         selectedOption: "",
//         answered: false,
//         feedback: null,
//         timeLeft: 10,
//       };
//     }

//     case "TICK": {
//       // Không đếm khi đã trả lời hoặc đã kết thúc
//       if (state.answered || state.showScore) return state;
//       const next = Math.max(0, state.timeLeft - 1);
//       return { ...state, timeLeft: next };
//     }

//     case "TIME_UP": {
//       // Nếu đã trả lời hoặc đã kết thúc thì bỏ qua
//       if (state.answered || state.showScore) return state;
//       const correct = state.questions[state.currentQuestion].answer;
//       return {
//         ...state,
//         answered: true,
//         feedback: `⏰ Time's up! ❌ The correct answer is: ${correct}`,
//       };
//     }

//     case "RESTART_QUIZ": {
//       // Bắt đầu lại từ đầu, giữ highScore hiện có
//       const keepHigh = state.highScore;
//       return {
//         ...initState(),
//         highScore: keepHigh,
//       };
//     }

//     default:
//       return state;
//   }
// }

// // ----- COMPONENT CHÍNH -----
// export default function QuestionBank() {
//   const [state, dispatch] = useReducer(quizReducer, undefined, initState);
//   const {
//     questions,
//     currentQuestion,
//     selectedOption,
//     answered,
//     feedback,
//     score,
//     showScore,
//     timeLeft,
//     highScore,
//   } = state;

//   const total = questions.length;
//   const q = questions[currentQuestion];

//   // ----- TIMER: đếm ngược 1s -----
//   useEffect(() => {
//     if (showScore) return;          // hết bài thì ngừng
//     const id = setInterval(() => {
//       dispatch({ type: "TICK" });
//     }, 1000);

//     return () => clearInterval(id);
//   }, [showScore]);

//   // Khi timeLeft = 0 mà chưa trả lời -> TIME_UP
//   useEffect(() => {
//     if (timeLeft === 0 && !answered && !showScore) {
//       dispatch({ type: "TIME_UP" });
//     }
//   }, [timeLeft, answered, showScore]);

//   // ----- HANDLERS -----
//   const handleOptionSelect = (option) =>
//     dispatch({ type: "SELECT_OPTION", payload: option });

//   const handleNextQuestion = () => dispatch({ type: "NEXT_QUESTION" });

//   const handleRestartQuiz = () => dispatch({ type: "RESTART_QUIZ" });

//   // ----- UI -----
//   return (
//     <Container className="mt-4">
//       <Card className="p-4 shadow-sm">
//         {!showScore ? (
//           <>
//             {/* Tiêu đề + Tiến trình */}
//             <div className="d-flex justify-content-between align-items-center mb-2">
//               <h5 className="mb-0">Quiz</h5>
//               <Badge bg="secondary">
//                 {currentQuestion + 1} / {total}
//               </Badge>
//             </div>

//             <ProgressBar
//               now={((currentQuestion + 1) / total) * 100}
//               className="mb-3"
//               animated
//               style={{ height: 10 }}
//             />

//             {/* Đồng hồ đếm ngược */}
//             <div className="d-flex align-items-center gap-2 mb-2">
//               <strong>Time:</strong>
//               <span
//                 style={{
//                   fontWeight: 700,
//                   color: timeLeft <= 5 ? "#dc3545" : "#0d6efd",
//                 }}
//               >
//                 {timeLeft}s
//               </span>
//             </div>

//             {/* Câu hỏi */}
//             <h4 className="mb-3">
//               Question {q.id}:<br />
//               {q.question}
//             </h4>

//             {/* Các lựa chọn */}
//             <div className="mt-2">
//               {q.options.map((option, idx) => {
//                 const isSelected = selectedOption === option;
//                 // Khi đã answered, tô nút đã chọn (xanh) hoặc sai (viền xám) — vẫn giữ đơn giản
//                 const variant = isSelected
//                   ? "success"
//                   : "outline-secondary";

//                 return (
//                   <Button
//                     key={idx}
//                     variant={variant}
//                     className="m-2"
//                     onClick={() => handleOptionSelect(option)}
//                     disabled={answered} // khóa chọn sau khi đã trả lời/hết giờ
//                   >
//                     {option}
//                   </Button>
//                 );
//               })}
//             </div>

//             {/* Phản hồi đúng/sai */}
//             {feedback && (
//               <Card className="mt-3">
//                 <Card.Body
//                   className="py-2"
//                   style={{ fontWeight: 600 }}
//                 >
//                   {feedback}
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Nút Next / Finish */}
//             <div className="mt-3">
//               <Button
//                 variant="primary"
//                 onClick={handleNextQuestion}
//                 disabled={!answered}
//               >
//                 {currentQuestion === total - 1 ? "Finish Quiz" : "Next Question"}
//               </Button>
//             </div>
//           </>
//         ) : (
//           // ----- MÀN HÌNH KẾT QUẢ -----
//           <div className="text-center">
//             <h2 className="mb-3">
//               Your Score: {score} / {total}
//             </h2>
//             <p className="mb-4" style={{ fontSize: 18 }}>
//               High Score:{" "}
//               <strong style={{ color: "#0d6efd" }}>{highScore}</strong>
//             </p>
//             <div className="d-flex justify-content-center gap-2">
//               <Button variant="primary" onClick={handleRestartQuiz}>
//                 Restart Quiz
//               </Button>
//             </div>
//           </div>
//         )}
//       </Card>
//     </Container>
//   );
// }
