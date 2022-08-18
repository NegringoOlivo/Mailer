

window.onload = () => {
    const mailerForm = document.getElementById("mailer-form")
    mailerForm.onsubmit = async (e) =>{
        e.preventDefault()
        const error = document.getElementById("error")
        error.innerHTML = ""
        const formData = new FormData(mailerForm)
        const data  = Object.fromEntries(formData.entries())//Dos lineas que se utilizan para transformar campos del formulario a javascript
       
        const response = await fetch("/send", {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-type": "application/json",
            }
        })
       
        const responseText = await response.text()
        console.log(responseText)
        if(response.status>300){
            error.innerHTML = responseText
            return
        }
        mailerForm.reset()
        alert("Correo enviado con exito...")
        

        }
    } 