function ResultQuestions({ question, number }) {
  const isCorrect = question.submitted_answer.id === question.answer.id;

  return (
    <div className="bg-base-100 rounded-lg p-4 md:p-6 shadow-sm border border-base-300 mb-4">
      {/* Question */}
      <h3 className="text-lg md:text-xl font-medium text-base-content mb-4">
        <span className="text-primary font-semibold">{number}.</span>{" "}
        {question.question}
      </h3>

      {/* Submitted Answer */}
      <div
        className={`p-3 md:p-4 rounded-lg border-l-4 ${
          isCorrect
            ? "bg-success/10 border-l-success text-success-content"
            : "bg-error/10 border-l-error text-error-content"
        }`}
      >
        <div className="flex items-start gap-2">
          <span className="font-semibold shrink-0 text-black">
            {question.submitted_answer.id}.
          </span>
          <span className="font-medium text-black">
            {question.submitted_answer.value}
          </span>
          <div className="ml-auto">
            {isCorrect ? (
              <div className="badge badge-success badge-sm">Correct</div>
            ) : (
              <div className="badge badge-error badge-sm">Incorrect</div>
            )}
          </div>
        </div>
      </div>

      {/* Correct Answer (if wrong) */}
      {!isCorrect && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2 uppercase tracking-wide">
            Correct Answer:
          </p>
          <div className="p-3 md:p-4 rounded-lg bg-success/10 border-l-4 border-l-success text-success-content">
            <div className="flex items-start gap-2">
              <span className="font-semibold shrink-0 text-black">
                {question.answer.id}.
              </span>
              <span className="font-medium text-black">
                {question.answer.value}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultQuestions;
