import { useState, type ChangeEvent } from "react";
import buttonClasses from "@/components/Button/Button.module.css";
import Input from "@/components/Input/Input";

type Identifier = "email" | "password";

function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier: Identifier, value: string): void {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin(): void {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <div className="controls">
        <Input
          label="Email"
          invalid={emailNotValid}
          type="email"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("email", event.target.value)
          }
        />
        <Input
          label="Password"
          invalid={passwordNotValid}
          type="password"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("password", event.target.value)
          }
        />
      </div>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <button className={buttonClasses.button} onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default AuthInputs;
