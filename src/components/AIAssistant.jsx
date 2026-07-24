function AIAssistant() {
  return (
    <div className="app">
      <div className="card">
        <h1>🤖 FarmIntel AI Assistant</h1>

        <div style={{ textAlign: "left" }}>
          <p><strong>👨‍🌾 Farmer:</strong> Which zone should I visit first?</p>
          <p><strong>🤖 AI:</strong> Visit Zone 3 first. It has the lowest health score (58/100) and shows a possible disease risk.</p>

          <hr />

          <p><strong>👨‍🌾 Farmer:</strong> Why is Zone 3 unhealthy?</p>
          <p><strong>🤖 AI:</strong> The uploaded crop image indicates disease symptoms, and the sensor values suggest unfavorable soil conditions.</p>

          <hr />

          <p><strong>👨‍🌾 Farmer:</strong> What should I do tomorrow?</p>
          <p><strong>🤖 AI:</strong> Inspect Zone 3, apply preventive treatment if needed, and increase irrigation in Zone 2 by about 20%.</p>
        </div>

        <input
          type="text"
          placeholder="Ask FarmIntel AI..."
        />

        <button>Ask AI</button>
      </div>
    </div>
  );
}

export default AIAssistant;