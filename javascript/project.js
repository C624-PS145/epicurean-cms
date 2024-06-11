      // Ambil elemen konten utama dan konten baru
      const content = document.getElementById('content');
      const wisataKulinerContent = document.getElementById('wisataKulinerContent');
      const foodsCmsContent = document.getElementById('foodsCmsContent');
      const drinkCmsContent = document.getElementById('drinkCmsContent');
      const reviewCmsContent = document.getElementById('reviewCmsContent');
      const artikelCmsContent = document.getElementById('artikelCmsContent');

      // Fungsi untuk menampilkan konten sesuai dengan link yang diklik
      function showContent(page) {
          // Sembunyikan semua konten
          content.style.display = 'none';
          wisataKulinerContent.style.display = 'none';
          foodsCmsContent.style.display = 'none';
          drinkCmsContent.style.display = 'none';
          reviewCmsContent.style.display = 'none';
          artikelCmsContent.style.display = 'none';

          // Tampilkan konten yang sesuai dengan link yang diklik
          switch (page) {
              case 'wisataKuliner':
                  wisataKulinerContent.style.display = 'block';
                  break;
              case 'foodsCms':
                  foodsCmsContent.style.display = 'block';
                  break;
              case 'drinkCms':
                  drinkCmsContent.style.display = 'block';
                  break;
              case 'reviewCms':
                  reviewCmsContent.style.display = 'block';
                  break;
              case 'artikelCms':
                  artikelCmsContent.style.display = 'block';
                  break;
              default:
                  content.style.display = 'block'; 
          }
      }

      // Tambahkan event listener untuk setiap link pada navbar
      document.getElementById('wisataKulinerLink').addEventListener('click', function(e) {
          e.preventDefault();
          showContent('wisataKuliner');
      });

      document.getElementById('foodsCmsLink').addEventListener('click', function(e) {
          e.preventDefault();
          showContent('foodsCms');
      });

      document.getElementById('drinkCmsLink').addEventListener('click', function(e) {
          e.preventDefault();
          showContent('drinkCms');
      });
      document.getElementById('reviewCmsLink').addEventListener('click', function(e) {
          e.preventDefault();
          showContent('reviewCms');
      });

      document.getElementById('artikelCmsLink').addEventListener('click', function(e) {
          e.preventDefault();
          showContent('artikelCms');
      });

// project.js

document.addEventListener("DOMContentLoaded", function() {
    // Ambil tombol logout
    const logoutBtn = document.getElementById('logoutBtn');

    // Tambahkan event listener untuk tombol logout
    logoutBtn.addEventListener('click', function() {
        // Hapus status login dari localStorage
        localStorage.removeItem('isLoggedIn');
        // Redirect ke halaman login setelah logout
        window.location.href = './../index.html';
    });
});
