// validations/auth.validation.js

// Validate đăng ký
exports.validateRegister = (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    return "Name, email và password là bắt buộc";
  }

  if (password.length < 6) {
    return "Password phải ít nhất 6 ký tự";
  }

  return null; // hợp lệ
};

// Validate đăng nhập
exports.validateLogin = (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return "Email và password là bắt buộc";
  }

  return null;
};
