document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    // Periksa status login saat halaman dimuat
    if (localStorage.getItem('isLoggedIn')) {
        window.location.replace('./../pages/project.html');
        return;
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validasi input
        if (!username || !password) {
            errorMsg.textContent = 'Username dan password tidak boleh kosong.';
            errorMsg.style.display = 'block';
            return;
        }

        try {
            const response = await fetch('https://epicurean-backend-umber.vercel.app/api/authlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                // Simpan status login ke localStorage
                localStorage.setItem('isLoggedIn', true);
                // Hapus history setelah login
                window.location.replace('./../pages/project.html');
            } else if (response.status === 401) {
                errorMsg.textContent = 'Username atau password salah.';
                errorMsg.style.display = 'block';
            } else {
                errorMsg.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
                errorMsg.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMsg.textContent = 'Tidak dapat terhubung ke server. Silakan coba lagi nanti.';
            errorMsg.style.display = 'block';
        }
    });

    // Fungsi untuk logout
    function logout() {
        // Hapus status login dari localStorage
        localStorage.removeItem('isLoggedIn');
        // Redirect ke halaman login
        window.location.href = './../index.html';
    }

    // Periksa status login di halaman project
    if (window.location.pathname.endsWith('project.html')) {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = './../index.html';
        }
    }

    // Tambahkan listener untuk menangani event logout
    document.getElementById('logoutButton')?.addEventListener('click', logout);

    // Blokir navigasi maju dan mundur menggunakan popstate
    window.addEventListener('popstate', function(event) {
        if (localStorage.getItem('isLoggedIn')) {
            history.pushState(null, null, window.location.href);
        } else {
            window.location.href = './../index.html';
        }
    });

    // Tambahkan tombol logout di halaman project (hanya contoh)
    if (window.location.pathname.endsWith('project.html')) {
        const logoutButton = document.createElement('button');
        logoutButton.id = 'logoutButton';
        logoutButton.textContent = 'Logout';
        document.body.appendChild(logoutButton);
    }
});
