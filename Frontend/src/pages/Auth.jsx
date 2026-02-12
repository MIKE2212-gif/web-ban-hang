import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Auth() {
	const [isRegister, setIsRegister] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [regEmail, setRegEmail] = useState("");
	const [regPassword, setRegPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const res = await api.login({ email, password });
			if (res.token) {
				localStorage.setItem("token", res.token);
				localStorage.setItem("user", JSON.stringify(res.user));
				window.dispatchEvent(new Event("authChange"));
				navigate("/");
			}
		} catch (err) {
			setError("Email hoặc mật khẩu không đúng");
		} finally {
			setLoading(false);
		}
	};

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await api.register({ name, email: regEmail, password: regPassword });
			setIsRegister(false);
		} catch (err) {
			setError("Đăng ký thất bại");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
			<div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

				{/* FORM */}
				<div className="p-10 flex flex-col justify-center">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						{isRegister ? "Tạo tài khoản" : "Chào mừng bạn quay lại"}
					</h1>
					<p className="text-gray-500 mb-6">
						{isRegister
							? "Đăng ký để bắt đầu mua sắm"
							: "Vui lòng đăng nhập để tiếp tục"}
					</p>

					{error && (
						<div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					{!isRegister ? (
						<form onSubmit={handleLoginSubmit} className="space-y-4">
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
								required
							/>
							<input
								type="password"
								placeholder="Mật khẩu"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
								required
							/>

							<button
								disabled={loading}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
							>
								{loading ? "Đang xử lý..." : "Đăng nhập"}
							</button>

							<p className="text-center text-sm text-gray-600">
								Chưa có tài khoản?{" "}
								<button
									type="button"
									onClick={() => setIsRegister(true)}
									className="text-blue-600 font-medium"
								>
									Đăng ký
								</button>
							</p>
						</form>
					) : (
						<form onSubmit={handleRegisterSubmit} className="space-y-4">
							<input
								placeholder="Họ và tên"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full px-4 py-3 rounded-xl border"
								required
							/>
							<input
								type="email"
								placeholder="Email"
								value={regEmail}
								onChange={(e) => setRegEmail(e.target.value)}
								className="w-full px-4 py-3 rounded-xl border"
								required
							/>
							<input
								type="password"
								placeholder="Mật khẩu"
								value={regPassword}
								onChange={(e) => setRegPassword(e.target.value)}
								className="w-full px-4 py-3 rounded-xl border"
								required
							/>

							<button
								disabled={loading}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
							>
								{loading ? "Đang xử lý..." : "Tạo tài khoản"}
							</button>

							<p className="text-center text-sm">
								Đã có tài khoản?{" "}
								<button
									type="button"
									onClick={() => setIsRegister(false)}
									className="text-blue-600 font-medium"
								>
									Đăng nhập
								</button>
							</p>
						</form>
					)}
				</div>

				{/* IMAGE */}
				<div className="relative hidden md:block">
					<img
						src="/images/products/auth.jpg"
						alt="Auth"
						className="absolute inset-0 w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black/30" />
					<div className="relative z-10 h-full flex items-end p-8 text-white">
						<div>
							<h2 className="text-2xl font-bold">Mua sắm dễ dàng</h2>
							<p className="text-sm opacity-90">
								Trải nghiệm mua sắm nhanh chóng và tiện lợi
							</p>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
