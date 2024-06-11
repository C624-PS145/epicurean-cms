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

document.addEventListener("DOMContentLoaded", function() {
    // Function to show alert
    function showAlert(message) {
        alert(message);
    }

    // Handle form submission for adding new wisata kuliner
    document.getElementById('addForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        fetch('http://localhost:3000/api/detailwisatakuliner', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showAlert('Wisata kuliner berhasil ditambahkan!');
            // Reset the form after successful submission
            document.getElementById('addForm').reset();
            document.getElementById('preview_gambar_katalog').src = '';
            document.getElementById('preview_galeri1').src = '';
            document.getElementById('preview_galeri2').src = '';
            document.getElementById('preview_galeri3').src = '';
            document.getElementById('preview_galeri4').src = '';
            // Reload the page after successful submission
            location.reload();
        })
        .catch(error => {
            showAlert('Error: ' + error);
        });
    });

    fetch('http://localhost:3000/api/listallwisatakuliner')
    .then(response => response.json())
    .then(data => {
        const wisataList = document.getElementById('wisataList');
        data.forEach(wisata => {
            wisataList.innerHTML += `<li data-id="${wisata.id}">${wisata.nama_tempat} <button class="deleteBtn" data-id="${wisata.id}">Delete</button></li>`;
        });

        wisataList.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                fetch(`http://localhost:3000/api/wisatakuliner/${id}`)
                .then(response => response.json())
                .then(wisata => {
                    document.getElementById('wisataId').value = wisata.id;
                    document.getElementById('nama_tempat').value = wisata.nama_tempat;
                    document.getElementById('alamat').value = wisata.alamat;
                    document.getElementById('kabupaten').value = wisata.kabupaten;
                    document.getElementById('deskripsi').value = wisata.deskripsi;
                    document.getElementById('jam_operasional').value = wisata.jam_operasional;
                    document.getElementById('link_wa').value = wisata.link_wa;
                    document.getElementById('link_maps').value = wisata.link_maps;
                    document.getElementById('fasilitas').value = wisata.fasilitas;

                    // Set image src based on data from API
                    document.getElementById('preview_gambar_katalog').src = wisata.gambar_katalog;
                    document.getElementById('preview_galeri1').src = wisata.galeri1;
                    document.getElementById('preview_galeri2').src = wisata.galeri2;
                    document.getElementById('preview_galeri3').src = wisata.galeri3;
                    document.getElementById('preview_galeri4').src = wisata.galeri4;

                    // Show images
                    document.getElementById('preview_gambar_katalog').style.display = 'block';
                    document.getElementById('preview_galeri1').style.display = 'block';
                    document.getElementById('preview_galeri2').style.display = 'block';
                    document.getElementById('preview_galeri3').style.display = 'block';
                    document.getElementById('preview_galeri4').style.display = 'block';
                    document.getElementById('updateForm').style.display = 'block';
                })
                .catch(error => {
                    showAlert('Error: ' + error);
                });
            });
        });

        // Add click event to delete button
        wisataList.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                fetch(`http://localhost:3000/api/wisatakuliner/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    showAlert('Wisata kuliner berhasil dihapus!');
                    // Reload the page after successful deletion
                    location.reload();
                })
                .catch(error => {
                    showAlert('Error: ' + error);
                });
            });
        });
    })
    .catch(error => {
        showAlert('Error: ' + error);
    });

    // Handle Update
    document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        let id = formData.get('id');
        fetch(`http://localhost:3000/api/wisatakuliner/${id}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showAlert('Wisata kuliner berhasil diperbarui!');
            // Reload the page after successful update
            location.reload();
        })
        .catch(error => {
            showAlert('Error: ' + error);
        });
    });
});