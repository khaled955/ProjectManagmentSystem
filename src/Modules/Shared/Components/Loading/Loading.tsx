


export default function Loading() {
  return (
  <>
    <div className="custom-loading-overlay">
      <div className="custom-loading-spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
      <p className="loading-text">Please wait, loading your workspace...</p>
    </div>
  </>
  );
}
