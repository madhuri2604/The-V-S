function EmployeeLogin() {
return (
<div className="p-8">
<h1 className="text-2xl font-bold mb-4">Employee Login</h1>
<form>
<input className="border p-2 w-full mb-2" placeholder="Employee ID" />
<input className="border p-2 w-full mb-4" type="password" placeholder="Password" />
<button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
</form>
</div>
);
}

export default EmployeeLogin;