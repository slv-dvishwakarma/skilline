import { useState } from 'react';

export const PythonCompiler: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    setOutput(data.output);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit">Run</button>
      </form>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
};

