function Login({ onLogin }) {
  return (
    <div className="app">
      <div className="card">
        <h1>🌱 FarmIntel</h1>
        <h2>The AI Operating System for Smart Farming</h2>

        <h3>Login</h3>

        <input type="text" placeholder="Enter Mobile Number" />
        <input type="password" placeholder="Enter Password" />

        <button onClick={onLogin}>Login</button>

        <p>One Platform. Every Farm Decision.</p>
      </div>
    </div>
  );
}

export default Login;