fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        fullName: 'System Admin',
        email: 'admin@trusthire.com',
        password: 'adminpassword123',
        role: 'admin'
    })
}).then(res => res.json()).then(console.log).catch(console.error);
