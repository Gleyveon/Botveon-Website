// src/components/loading
import './styles.scss';

function Loading() {

  return (
    <>
      <div className="component component-loading">

      <div className="loader"></div>

        <div className="loading-container">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;
