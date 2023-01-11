console.log("linked");
async function commentSubmissionHandler(event) {
    event.preventDefault();

    const content = document.querySelector('textarea[name="comment-body"]').value.trim();
    console.log(content)

    var pathArray = window.location.pathname.split( '/' );
    console.log(pathArray);
    const post_id = pathArray[2];
    console.log(post_id + "from comment.js");

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            post_id,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload()
        console.log("posted");
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentSubmissionHandler);