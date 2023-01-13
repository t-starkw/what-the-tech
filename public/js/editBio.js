console.log("linked");
async function bioHandler(event) {
    event.preventDefault();

    const bio = document.querySelector('textarea[name="user-bio"]').value.trim();
    const id = document.querySelector('input[name="user-id"]').value;

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            bio
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/settings/dashboard')
        console.log("Bio updated");
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.bio-form').addEventListener('submit', bioHandler);
