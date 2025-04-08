
'use client';
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <Card className="p-4 space-y-2">
      <h2 className="text-xl font-semibold">⏱ Temporizador Pomodoro</h2>
      <div className="text-3xl text-center font-mono">{formatTime(timeLeft)}</div>
      <div className="flex justify-center space-x-4">
        <Button onClick={() => setIsRunning(true)}>Iniciar</Button>
        <Button onClick={() => setIsRunning(false)}>Pausar</Button>
        <Button onClick={resetTimer}>Resetar</Button>
      </div>
    </Card>
  );
}

export default function TDAHPlanner() {
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tasks, setTasks] = useState([
    { text: "", reward: "", done: false },
    { text: "", reward: "", done: false },
    { text: "", reward: "", done: false }
  ]);
  const [sessions, setSessions] = useState([
    { start: "", end: "", done: false },
    { start: "", end: "", done: false },
    { start: "", end: "", done: false }
  ]);
  const [partner, setPartner] = useState("");
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">📅 Planner Diário TDAH</h1>
      <Input placeholder="Data" value={date} onChange={(e) => setDate(e.target.value)} />
      <Textarea placeholder="🎯 Propósito do Dia" value={purpose} onChange={(e) => setPurpose(e.target.value)} />

      <div className="space-y-2">
        <h2 className="font-semibold">🎮 Tarefas e Recompensas</h2>
        {tasks.map((task, index) => (
          <Card key={index} className="p-4 space-y-2">
            <Input
              placeholder={`Tarefa ${index + 1}`}
              value={task.text}
              onChange={(e) => {
                const updated = [...tasks];
                updated[index].text = e.target.value;
                setTasks(updated);
              }}
            />
            <Input
              placeholder="Recompensa"
              value={task.reward}
              onChange={(e) => {
                const updated = [...tasks];
                updated[index].reward = e.target.value;
                setTasks(updated);
              }}
            />
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={task.done}
                onCheckedChange={(checked) => {
                  const updated = [...tasks];
                  updated[index].done = checked;
                  setTasks(updated);
                }}
              />
              <span>Concluído</span>
            </label>
          </Card>
        ))}
      </div>

      <PomodoroTimer />

      <div className="space-y-2">
        <h2 className="font-semibold">⏳ Sessões de Estudo (Pomodoro)</h2>
        {sessions.map((session, index) => (
          <Card key={index} className="p-4 space-y-2">
            <Input
              placeholder="Início"
              value={session.start}
              onChange={(e) => {
                const updated = [...sessions];
                updated[index].start = e.target.value;
                setSessions(updated);
              }}
            />
            <Input
              placeholder="Fim"
              value={session.end}
              onChange={(e) => {
                const updated = [...sessions];
                updated[index].end = e.target.value;
                setSessions(updated);
              }}
            />
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={session.done}
                onCheckedChange={(checked) => {
                  const updated = [...sessions];
                  updated[index].done = checked;
                  setSessions(updated);
                }}
              />
              <span>Concluída</span>
            </label>
          </Card>
        ))}
      </div>

      <Input placeholder="🤝 Nome da Pessoa de Apoio" value={partner} onChange={(e) => setPartner(e.target.value)} />

      <div className="space-y-2">
        <h2 className="font-semibold">📌 Como estou hoje?</h2>
        <div className="flex space-x-4">
          {['🟢', '🟡', '🔴'].map((m) => (
            <Button
              key={m}
              variant={m === mood ? "default" : "outline"}
              onClick={() => setMood(m)}
            >
              {m}
            </Button>
          ))}
        </div>
      </div>

      <Textarea placeholder="Observações do Dia" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <Button onClick={() => alert("Parabéns por organizar seu dia! Volte amanhã!")}>Salvar Planejamento</Button>
    </div>
  );
}
