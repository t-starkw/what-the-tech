console.log("linked");
async function postEditHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    console.log(title);
    const content = document.querySelector('textarea[name="description"]').value;
    console.log(content)

    var pathArray = window.location.pathname.split( '/' );
    console.log(pathArray);
    const post_id = pathArray[3];
    console.log(post_id + "from editpost.js");

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard')
        console.log("updated");
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-form').addEventListener('submit', postEditHandler);