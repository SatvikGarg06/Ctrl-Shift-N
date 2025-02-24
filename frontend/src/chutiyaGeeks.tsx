import { Outlet } from 'react-router-dom';

function ChutiyaGeeks() {
  console.log('ChutiyaGeeks rendered'); // ✅ Debugging
  return (
    <div>
      <h1>Parent Component</h1>
      <Outlet /> {/* ✅ This will render child routes */}
    </div>
  );
}

export default ChutiyaGeeks;
