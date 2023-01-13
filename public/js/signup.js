console.log("linked");
async function signupHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#pwd-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/', {
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
            alert('Account successfully created. You are now logged in.')
            document.location.replace('/settings');
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.signup-form').addEventListener('submit', signupHandler);