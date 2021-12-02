const LoginModelInput = ({
  placeholder,
  type,
  isRequired,
  className,
  formData,
  setFormData,
  name,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [name]: e.target.value });
  };


  return (
    <input
      placeholder={placeholder}
      className={className}
      type={type}
      required={isRequired}
      onChange={handleChange}
      value={formData[name]}
    />
  );
};

export default LoginModelInput;
