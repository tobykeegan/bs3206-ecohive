export default function Header({ userName, pageName }) {
  return (
    <div className="container">
      <h1>
        Hello{userName ? ' ' + userName : ''}, {pageName}
      </h1>
    </div>
  );
}
