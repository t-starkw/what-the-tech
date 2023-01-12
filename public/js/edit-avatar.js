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
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
})





// async function avatarHandler(event) {
//     event.preventDefault();

//     const username = document.querySelector('#user-signup').value.trim();
//     const password = document.querySelector('#pwd-signup').value.trim();

//     if (username && password) {
//         const response = await fetch('/api/users/', {
//             method: 'post',
//             body: JSON.stringify({
//                 username,
//                 password
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (response.ok) {
//             alert('Account successfully created. You are now logged in.')
//             document.location.replace('/dashboard');
//         } else {
//             alert(response.statusText);
//         }
//     }
// }
// document.querySelector('.signup-form').addEventListener('submit', avatarHandler);