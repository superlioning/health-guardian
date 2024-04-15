import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QNA } from "../graphql/mutations"; // Import the mutation

const SymptomCheckerPage = () => {
  const [symptom, setSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // GraphQL Mutation
  const [createQnA] = useMutation(CREATE_QNA, {
    onCompleted: (data) => {
      setResult(data.createQnA);
      setLoading(false);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      setLoading(false);
    },
  });

  const handleSymptomSelection = async (selectedSymptom) => {
    setLoading(true);
    setSymptom(selectedSymptom);

    // Call the GraphQL mutation
    try {
      await createQnA({ variables: { symptom: selectedSymptom } });
    } catch (error) {
      console.error("Error creating QnA:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome to the Symptom Checker</h1>
      <p>Please select your symptom:</p>
      <div>
        <label>
          <input
            type="radio"
            value="Ankle Problems"
            checked={symptom === "Ankle Problems"}
            onChange={() => handleSymptomSelection("Ankle Problems")}
          />
          Ankle Problems
        </label>
        {/* TODO: add more symptoms in the future */}
      </div>

      {loading && <p>Loading...</p>}

      {result && (
        <div>
          <h2>Symptom Information</h2>
          <p>Symptom: {result.symptom}</p>
          <h3>Guidelines:</h3>
          <table className="question-answer-table">
            <tbody>
              {result.answers
                .filter((item) => item.answer.length > 0)
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.question}</td>
                    <td>{item.answer[0].text}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SymptomCheckerPage;
