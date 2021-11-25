const LoginModelInput = ({ placeholder, type, isRequired, className }) => {
  return (
    <input
      placeholder={placeholder}
      className={className}
      type={type}
      required={isRequired}
    />
  );
};

export default LoginModelInput;
