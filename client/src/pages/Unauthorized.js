import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    // navigate(-1, { replace: true });
    window.location.href = "/";
  };

  return (
    <section className="position-relative h-100 w-100">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div className="flexGrow">
          <button onClick={goBack} className="btn btn-outline-secondary">Go Back</button>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
