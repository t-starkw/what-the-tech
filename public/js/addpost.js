console.log("linked");
async function postHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('textarea[name="description"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/settings/dashboard')
        console.log("posted");
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.post-form').addEventListener('submit', postHandler);
