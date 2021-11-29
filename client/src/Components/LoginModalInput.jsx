const LoginModelInput = ({
  placeholder,
  type,
  isRequired,
  className,
  registerForm,
  setRegisterForm,
  name
}) => {
  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [name]: e.target.value });
  };

  return (
    <input
      placeholder={placeholder}
      className={className}
      type={type}
      required={isRequired}
      onChange={handleChange}
    />
  );
};

export default LoginModelInput;
