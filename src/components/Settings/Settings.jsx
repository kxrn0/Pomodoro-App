import { useEffect, useState } from "react";
import format_time from "../../utilities/time";
import "./settings.css";

export default function Settings({ initial, set, close }) {
  const MIN = 0;
  const MAX = 59;
  const [settings, setSettings] = useState(() => {
    const times = [];

    for (let mode in initial.times)
      times.push({
        value: format_time(initial.times[mode])[1],
        mode,
        label: mode
          .split("-")
          .map((word, index, array) =>
            array.length > 2 ? (index < 2 ? word : null) : !index ? word : null
          )
          .filter((word) => word)
          .join(" "),
      });

    return {
      font: initial.font,
      fonts: ["kumbh", "roboto", "space"],
      color: initial.color,
      colors: ["red", "blue", "purple"],
      mode: initial.mode,
      times,
    };
  });

  function handle_input_input(event) {
    const id = event.target.id;
    let value;

    value = event.target.value.trim();

    if (value) {
      const reg = /^[0-9]+$/;

      if (reg.test(value)) {
        value = Number(value);

        value = Math.min(value, MAX);
      } else value = MIN;
    }

    setSettings((prevSettings) => ({
      ...prevSettings,
      times: prevSettings.times.map((time) =>
        time.mode === id ? { ...time, value } : time
      ),
    }));
  }

  function validate_input_value(event) {
    const id = event.target.id;
    let value;

    value = event.target.value.trim();

    if (!value || isNaN(Number(value))) value = 5;
    else value = Number(value);

    setSettings((prevSettings) => ({
      ...prevSettings,
      times: prevSettings.times.map((time) =>
        time.mode === id ? { ...time, value } : time
      ),
    }));
  }

  function handle_value_change(event) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [event.target.name]: event.target.value,
    }));
  }

  function warudo(event) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      times: prevSettings.times.map((time) =>
        time.mode === event.target.dataset.mode
          ? {
              ...time,
              value: Math.min(
                Math.max(time.value + Number(event.target.dataset.value), MIN),
                MAX
              ),
            }
          : time
      ),
    }));
  }

  function handle_submission(event) {
    event.preventDefault();

    const times = settings.times.reduce((obj, time) => {
      obj[time.mode] = time.value * 60;

      return obj;
    }, {});

    set({
      font: settings.font,
      color: settings.color,
      times,
      mode: initial.mode,
    });
    close();
  }

  useEffect(() => {
    function listen(event) {
      if (event.key === "Enter" && event.target.name === "time-input") {
        event.preventDefault();
        event.target.blur();
      }
    }

    document.addEventListener("keypress", listen);

    () => document.removeEventListener("keypress", listen);
  }, []);

  return (
    <form className="settings" onSubmit={handle_submission}>
      <h2 className="h2">Settings</h2>
      <span className="br"></span>
      <button type="button" className="close-settings" onClick={close}></button>
      <ul className="sections">
        <li className="setting-item time-setting">
          <h4 className="h4">time (minutes)</h4>
          <ul className="inputs">
            {settings.times.map((time) => (
              <li key={time.mode}>
                <label htmlFor={time.mode} className="p2">
                  {time.label}
                </label>
                <div className="input">
                  <input
                    type="number"
                    id={time.mode}
                    value={time.value}
                    onInput={handle_input_input}
                    onBlur={validate_input_value}
                    name="time-input"
                  />
                  <button
                    type="button"
                    className="plus"
                    data-mode={time.mode}
                    data-value="1"
                    onClick={warudo}
                  ></button>
                  <button
                    type="button"
                    className="minus"
                    data-mode={time.mode}
                    data-value="-1"
                    onClick={warudo}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li className="setting-item font-setting">
          <h4 className="h4">font</h4>
          <ul className="inputs">
            {settings.fonts.map((font) => (
              <li key={font}>
                <input
                  type="radio"
                  id={font}
                  name="font"
                  value={font}
                  checked={font === settings.font}
                  onChange={handle_value_change}
                />
                <label htmlFor={font}>Aa</label>
              </li>
            ))}
          </ul>
        </li>
        <li className="setting-item color-setting">
          <h4 className="h4">Color</h4>
          <ul className="inputs">
            {settings.colors.map((color) => (
              <li key={color}>
                <input
                  type="radio"
                  id={color}
                  value={color}
                  name="color"
                  checked={color === settings.color}
                  onChange={handle_value_change}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <button className="apply-button">Apply</button>
    </form>
  );
}
