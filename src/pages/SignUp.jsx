import { useState } from "react";

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

export const SignUp = () => {
  const [formState, setFormstate] = useState(initialFormState);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    const newFormState = { ...formState, [field]: value };
    setFormstate(newFormState);
  };

  const saveUser = async () => {
    try {
      // function Name soll verändert werden
      const res = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        //
      });
      if (!res.ok) throw new Error("Fetch failed");

      setData(await res.json());
      console.log(data);
    } catch {
      console.log("error");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    saveUser();
  };

  return (
    <div>
      <h1>Sign-up Form</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "42rem",
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
        />
        <label htmlFor="email">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
        ></input>{" "}
        {
          // Noch ein Passwort Input zu hinzufügen
        }
        <button type="submit">Sumbit</button>
      </form>
    </div>
  );
};
