const checkForm = (form, setResults) => {
  const {
    firstName,
    lastName,
    userName,
    password,
    confirmPassword,
    email,
  } = form;

  const passwordCheck = () => {
    if (password !== confirmPassword) {
      return { error: "passwords don't match" };
    } else if (password.length < 7) {
      return { error: "password needs to be at least 8 characters long." };
    } else if (password.length > 20) {
      return { error: "password needs to be less than 20 characters. " };
    } else {
      return true;
    }
  };

  const valueCheck = (value, name) => {
    if (value.length < 1) {
      return { error: `please fill the ${name} field.` };
    } else {
      return true;
    }
  };

  const checkEmail = () => {
    if (email.includes("@") && email.includes(".")) {
      return true;
    } else {
      return { error: "please provide a valid email address." };
    }
  };

  setResults([
    valueCheck(firstName, "First Name"),
    valueCheck(lastName, "Last Name"),
    valueCheck(userName, "User Name"),
    checkEmail(),
    passwordCheck(),
  ]);
};

export default checkForm;
