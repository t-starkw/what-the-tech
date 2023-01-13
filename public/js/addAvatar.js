console.log("linked");

const id = document.querySelector('input[name="user-id"]').value;

$("img").click(async function () {
    const avatar = $(this).attr('src');
    console.log(avatar)

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ avatar }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/settings/about');
    } else {
        alert(response.statusText);
    }
})

