console.log("linked");
async function loginHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#user-login').value.trim();
    const password = document.querySelector('#pwd-login').value.trim();

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
        console.log(response);
        if (response.ok) {
            document.location.replace('/');
            console.log("logged in");
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.login-form').addEventListener('submit', loginHandler);