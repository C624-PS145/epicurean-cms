document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('https://epicurean-backend-umber.vercel.app/api/authlogin', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.status === 200) {
                // Simpan status login ke localStorage
                localStorage.setItem('isLoggedIn', true);
                window.location.href = './../pages/project.html'; // Arahkan ke halaman proyek setelah login berhasil
            } else {
                document.getElementById('errorMsg').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Periksa status login saat halaman dimuat
    if (localStorage.getItem('isLoggedIn')) {
        // Jika pengguna sudah login, arahkan ke halaman proyek
        window.location.href = './../pages/project.html';
    }
});