import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [correctIndex, setCorrectIndex] = useState("0");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      prompt: prompt,
      answers: [answer1, answer2, answer3, answer4].filter((a) => a.trim() !== ""),
      correctIndex: parseInt(correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newQuestion) => {
        onAddQuestion(newQuestion);
      })
      .catch((error) => console.error("Error submitting question:", error));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            value={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            value={answer4}
            onChange={(e) => setAnswer4(e.target.value)}
          />
        </label>
        <label>
          Correct Answer Index:
          <select
            value={correctIndex}
            onChange={(e) => setCorrectIndex(e.target.value)}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;