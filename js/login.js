/*cambiar entre login y registro */
function cambiar(formId) {
    document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

    document.getElementById(formId).classList.add('active');
    document.querySelector(`.tab[onclick*="${formId}"]`).classList.add('active');
}

$(document).ready(function () {
    //iniciar sesión
    $('.checklogin').click(async function (e) {
        e.preventDefault();

        let nombre = $('#nombre').val().trim();
        let password = $('#password').val().trim();
        console.log(nombre);
        console.log(password);
        
        try {
            const response = await $.ajax({
                type: 'POST',
                url: 'https://api-tfc-five.vercel.app/api/checkLogin',
                contentType: 'application/json',
                data: JSON.stringify({ nombre, password })
            });
            // Guardar datos del usuario en localStorage

            console.log("caracola");
            console.log(response.usuario.rol);
            
            if (response.usuario.rol == "user") {
                window.location.href = "../html/home.html";
            }else if (response.usuario.rol == "admin") {
                window.location.href = "../html/admin.html";
            }else{
                console.log("nonononno");
                
            }


            localStorage.setItem('usuario', JSON.stringify(response.usuario));
            //alert(response.mensaje);
            //window.location.href = "../html/home.html";

        } catch (error) {
            if (error.status === 401) {
                alert("Nombre o contraseña incorrecta.");
            } else {
                alert("Error en el servidor, intenta más tarde.");
                console.error(error);
            }
        }
    });
    //nuevo usuario
    $('.checkregis').click(async function (e) {
        e.preventDefault();

        const nombre = $('#nuevo_nombre').val().trim();
        const email = $('#email_nuevo').val().trim();
        const password1 = $('#contresena1').val();
        const password2 = $('#contrasena2').val();

        console.log("datos a enviar" , { nombre, email, password1, password2 });
        

        if (!nombre || !email || !password1 || !password2) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (password1 !== password2) {
            console.log("no coinciden las contraseñas");
            
            return;
        }

        try {
            /*Api login*/
            const response = await $.ajax({
                type: 'POST',
                url: 'https://api-tfc-five.vercel.app/api/registrarse',
                contentType: 'application/json',
                data: JSON.stringify({ nombre, email, password1 })
            });

            alert(response.mensaje);

            if (response.success) {
                cambiar('login'); // Cambia a pestaña login tras registrarse
            }

        } catch (error) {
            alert(error.responseJSON?.mensaje || "Error en el servidor");
            console.error(error);
        }
    });
});