import { useState, useEffect} from "react";
import questionsData from "../data/questions.json";

const QuestionBox = () => {
  const [questions, setQuestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {

    setLoading(true);
    setError(null);

    try {

      // Asynchronous question fetching from Backend
      // const res = await fetch(
      //   `http://localhost:3000questions?page=${page}&limit=${limit}`
      // );
      
      const start = (page - 1) * limit;
      const end = start + limit;

      // Paging the data
      const paginatedData = questionsData.data.slice(start, end);

      setQuestions(paginatedData);
      setTotal(questionsData.data.length);
      
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuestions() }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="all-question-container">
      <h2 className="heading"> Newest Questions </h2>

      {
      loading ? <p className="loading">Loading...</p> :
      error ?
        <>
          <p className="error">{error}</p> 
          <button className="error-try-again-but" onClick={()=>fetchQuestions()}> Try Again </button>
        </> :
        <>
          <ul className="question-list">
            {questions.map((q) => (
              <li className="question-container" key={q.id}>
                <div className="question">
                <p className="question-views"> {q.views} views </p>
                <a href='' className="question-title"> {q.title} </a>
                <small className="question-creation-time">
                  {"Created at: " + new Date(q.created_at).toLocaleString()}
                </small>
                </div>
              </li>
            ))}
          </ul>

          <div className="button-container">
            <button className="btn prev-button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            <span className="page-number">
              Page {page} of {totalPages}
            </span>

            <button className="btn next-button"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      }
    </div>

  );
}

export default QuestionBox;