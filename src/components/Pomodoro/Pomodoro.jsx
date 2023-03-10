import { useState, useRef, useEffect } from "react";
import Settings from "../Settings/Settings";
import Popup from "../Popup/Popup";
import format_time from "../../utilities/time";
import alarm from "../../assets/alarm_sound.mp3";
import "./pomodoro.css";

export default function Pomodoro() {
  const [settings, setSettings] = useState(() => {
    let settings;

    settings = localStorage.getItem("_clock_settings_");
    if (!settings) {
      settings = {
        times: {
          "pomodoro-mode": 1500,
          "short-break-mode": 300,
          "long-break-mode": 900,
        },
        font: "kumbh",
        color: "red",
        mode: "pomodoro-mode",
      };
      localStorage.setItem("_clock_settings_", JSON.stringify(settings));
    } else settings = JSON.parse(settings);
    return settings;
  });
  const [timeLeft, setTimeLeft] = useState(null);
  const [state, setState] = useState(() => ({
    value: "paused",
    label: "start",
  }));
  const [settingsOpen, setSettingsOpen] = useState(false);
  const intervalIdRef = useRef(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const futureRef = useRef(null);
  const animeRef = useRef(-1);
  const animeEdRef = useRef(-1);
  const modes = [
    { value: "pomodoro-mode", label: "pomodoro" },
    { value: "short-break-mode", label: "short break" },
    { value: "long-break-mode", label: "long break" },
  ];
  const colors = { red: "#f87070", blue: "#70f3f8", purple: "#d881f8" };

  function tick() {
    setTimeLeft((prevTime) => {
      if (prevTime > 1) return prevTime - 1;

      setState({ value: "finished", label: "restart" });
      audioRef.current.play();
      clearInterval(intervalIdRef.current);
      cancelAnimationFrame(animeRef.current);
      animeEdRef.current = -1;
      end_anime();
      return 0;
    });
  }

  function clean_up(mode) {
    const context = canvasRef.current.getContext("2d");

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    cancelAnimationFrame(animeRef.current);
    cancelAnimationFrame(animeEdRef.current);
    animeEdRef.current = null;
    context.strokeStyle = colors[settings.color];
    draw_arc(canvasRef.current, Math.PI * 2);
    setTimeLeft(settings.times[mode]);
    setState({ value: "paused", label: "start" });
  }

  function begin_anime() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const length =
      (Math.PI * 2 * (futureRef.current - Date.now())) /
      (settings.times[settings.mode] * 1000);

    context.strokeStyle = colors[settings.color];

    draw_arc(canvas, length);

    animeRef.current = requestAnimationFrame(begin_anime);
  }

  function end_anime() {
    draw_circles(canvasRef.current, 50, 5);

    if (animeEdRef.current !== null)
      animeEdRef.current = requestAnimationFrame(end_anime);
  }

  function draw_circles(canvas, steps, speed) {
    const context = canvas.getContext("2d");
    const lineWidth = canvas.width / steps;

    context.lineWidth = lineWidth;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < steps; i++) {
      context.beginPath();
      context.strokeStyle = `hsl(${
        (i * speed + Date.now() / 10) % 360
      }, 100%, 50%)`;
      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        (i * lineWidth) / 2,
        0,
        Math.PI * 2
      );
      context.stroke();
    }
  }

  function draw_arc(canvas, angle) {
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (angle <= 0) return;

    context.lineWidth = 13;
    context.lineCap = "round";
    context.beginPath();
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      160,
      -Math.PI / 2,
      angle - Math.PI / 2
    );
    context.stroke();
  }

  function handle_click() {
    switch (state.value) {
      case "paused":
        cancelAnimationFrame(animeEdRef.current);
        intervalIdRef.current = setInterval(tick, 1000);
        setState({ value: "running", label: "pause" });
        futureRef.current = Date.now() + timeLeft * 1000;
        begin_anime();
        break;
      case "running":
        clearInterval(intervalIdRef.current);
        cancelAnimationFrame(animeRef.current);
        setState({ value: "paused", label: "start" });
        break;
      case "finished":
        clean_up(settings.mode);
    }
  }

  function change_mode(event) {
    clearInterval(intervalIdRef.current);
    cancelAnimationFrame(animeEdRef.current);
    clean_up(event.target.value);
    setSettings((prevSettings) => ({
      ...prevSettings,
      mode: event.target.value,
    }));
  }

  function open_settings() {
    if (state.value === "finished") clean_up(settings.mode);

    clearInterval(intervalIdRef.current);
    cancelAnimationFrame(animeRef.current);
    setState({ value: "paused", label: "start" });
    setSettingsOpen(true);
  }

  function update_settings(newSettings) {
    if (settings.times[settings.mode] !== newSettings.times[settings.mode]) {
      setTimeLeft(newSettings.times[settings.mode]);
      draw_arc(canvasRef.current, Math.PI * 2);
    }

    localStorage.setItem("_clock_settings_", JSON.stringify(newSettings));

    setSettings(newSettings);
  }

  useEffect(() => {
    setTimeLeft(settings.times[settings.mode]);
  }, [settings.mode]);

  useEffect(() => {
    audioRef.current = new Audio(alarm);
    audioRef.current.loop = true;

    return () => audioRef.current.pause();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const length =
      timeLeft === null
        ? Math.PI * 2
        : Math.PI * 2 -
          (Math.PI * 2 * (settings.times[settings.mode] - timeLeft)) /
            settings.times[settings.mode];

    context.strokeStyle = colors[settings.color];

    draw_arc(canvas, length);
  }, [settings.color]);

  return (
    <div
      className={`pomodoro ${settings.mode} ${settings.font} ${
        settings.color
      } ${state.value === "finished" ? "finished" : ""}`}
    >
      <Popup shown={settingsOpen} close={() => setSettingsOpen(false)}>
        <Settings
          initial={settings}
          set={update_settings}
          close={() => setSettingsOpen(false)}
        />
      </Popup>
      <h2 className="title">pomodoro</h2>
      <ul className="modes">
        {modes.map((mode) => (
          <li key={mode.value}>
            <label htmlFor={mode.value}>
              <input
                type="radio"
                checked={mode.value === settings.mode}
                id={mode.value}
                name="radio-mode"
                value={mode.value}
                onChange={change_mode}
              />
              <span className="p1">{mode.label}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="timer">
        <canvas width="366" height="366" ref={canvasRef}></canvas>
        <div className="timer-content">
          <h1 className="h1">
            {format_time(timeLeft)
              .filter((_, index) => index)
              .map((n) => String(n).padStart(2, "0"))
              .join(":")
              .split("")
              .map((digit, index) => (
                <span key={index} className={index === 2 ? "dots" : "digit"}>
                  {digit}
                </span>
              ))}
          </h1>
          <button onClick={handle_click} className="h3">
            {state.label}
          </button>
        </div>
      </div>
      <button className="open-settings" onClick={open_settings}></button>
    </div>
  );
}
