import { useState } from "react";
import { Link } from "react-router-dom";
function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setIsLoading(false);

      if (data.success === false) {
        setError(true);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  );
}

export default SignUp;
