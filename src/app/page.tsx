'use client';
import { useState } from 'react';

export default function Home() {
  const [date, setDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [tasks, setTasks] = useState([
    { text: '', reward: '', done: false },
    { text: '', reward: '', done: false },
    { text: '', reward: '', done: false }
  ]);
  const [sessions, setSessions] = useState([
    { start: '', end: '', done: false },
    { start: '', end: '', done: false },
    { start: '', end: '', done: false }
  ]);
  const [partner, setPartner] = useState('');
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">📅 Planner Diário TDAH</h1>
      <input className="w-full border p-2" placeholder="Data" value={date} onChange={(e) => setDate(e.target.value)} />
      <textarea className="w-full border p-2" placeholder="🎯 Propósito do Dia" value={purpose} onChange={(e) => setPurpose(e.target.value)} />

      <div className="space-y-2">
        <h2 className="font-semibold">🎮 Tarefas e Recompensas</h2>
        {tasks.map((task, i) => (
          <div key={i} className="border p-4 space-y-2">
            <input className="w-full border p-1" placeholder={`Tarefa ${i + 1}`} value={task.text} onChange={(e) => {
              const newTasks = [...tasks];
              newTasks[i].text = e.target.value;
              setTasks(newTasks);
            }} />
            <input className="w-full border p-1" placeholder="Recompensa" value={task.reward} onChange={(e) => {
              const newTasks = [...tasks];
              newTasks[i].reward = e.target.value;
              setTasks(newTasks);
            }} />
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={task.done} onChange={(e) => {
                const newTasks = [...tasks];
                newTasks[i].done = e.target.checked;
                setTasks(newTasks);
              }} />
              <span>Concluído</span>
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">⏳ Sessões de Estudo (Pomodoro)</h2>
        {sessions.map((session, i) => (
          <div key={i} className="border p-4 space-y-2">
            <input className="w-full border p-1" placeholder="Início" value={session.start} onChange={(e) => {
              const newSessions = [...sessions];
              newSessions[i].start = e.target.value;
              setSessions(newSessions);
            }} />
            <input className="w-full border p-1" placeholder="Fim" value={session.end} onChange={(e) => {
              const newSessions = [...sessions];
              newSessions[i].end = e.target.value;
              setSessions(newSessions);
            }} />
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={session.done} onChange={(e) => {
                const newSessions = [...sessions];
                newSessions[i].done = e.target.checked;
                setSessions(newSessions);
              }} />
              <span>Concluída</span>
            </label>
          </div>
        ))}
      </div>

      <input className="w-full border p-2" placeholder="🤝 Pessoa de Apoio" value={partner} onChange={(e) => setPartner(e.target.value)} />

      <div className="space-y-2">
        <h2 className="font-semibold">📌 Como estou hoje?</h2>
        <div className="flex space-x-4">
          {['🟢', '🟡', '🔴'].map((m) => (
            <button
              key={m}
              className={`border p-2 ${m === mood ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <textarea className="w-full border p-2" placeholder="Observações do Dia" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => alert('Planejamento salvo!')}>
        Salvar Planejamento
      </button>
    </main>
  );
}