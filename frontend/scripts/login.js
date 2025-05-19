const form = document.getElementById('loginForm')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
        const response = await fetch('/ebookstore/api/users/login', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            credentials: 'include',
            body : JSON.stringify({
                email : email.value.trim(),
                password : password.value.trim()
            })
        })

        if(!response.ok){
            const errorData = await response.json()
            console.error("login failed: " + JSON.stringify(errorData))
            alert('login failed: ' + errorData.message)
            return
        }

        const result = await response.json()
        console.log('token : ',result.token)
        // localStorage.setItem('token', result.token)

        alert(`Login successfull: welcome ${result.user.name.firstName}`) 
        window.location.href = '/ebookstore/home'
    } catch (error) {
        console.error("Network or server error:", error)
    }
})