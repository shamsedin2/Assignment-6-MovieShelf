function LoadingSpinner({ message = 'Loading movies...' }) {
  return (
    <div className="status status--loading" role="status">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
