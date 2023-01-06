async function loginHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#pwd').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/home');
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.login-form').addEventListener('submit', loginHandler);