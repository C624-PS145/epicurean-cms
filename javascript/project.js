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

// ! CMS MAKANAN
document.addEventListener('DOMContentLoaded', () => {
    const selectWisataKuliner = document.getElementById('selectWisataKuliner');
    const addFoodForm = document.getElementById('addFoodForm');
    const editFoodForm = document.getElementById('editFoodForm');
    const foodList = document.getElementById('foodList');

    // Fungsi untuk mengambil dan menampilkan daftar wisata kuliner
    function fetchWisataKuliner() {
        fetch('http://localhost:3000/api/listallwisatakuliner')
            .then(response => response.json())
            .then(data => {
                data.forEach(wisata => {
                    const option = document.createElement('option');
                    option.value = wisata.id;
                    option.textContent = wisata.nama_tempat;
                    selectWisataKuliner.appendChild(option);
                });
                // Panggil fungsi untuk menampilkan makanan saat wisata kuliner dipilih
                selectWisataKuliner.addEventListener('change', displayFoods);
            })
            .catch(error => console.error('Error:', error));
    }

    // Tambahkan event listener untuk menambahkan makanan
    addFoodForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(addFoodForm);
        const newData = {
            wisata_kuliner_id: selectWisataKuliner.value,
            nama_makanan: formData.get('namaMakanan'),
            harga: formData.get('harga')
        };

        fetch(`http://localhost:3000/api/wisatakuliner/${newData.wisata_kuliner_id}/food`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            displayFoods();
            addFoodForm.reset(); // Reset form setelah makanan ditambahkan
        })
        .catch(error => console.error('Error:', error));
    });

    // Fungsi untuk menampilkan daftar makanan berdasarkan wisata kuliner yang dipilih
    function displayFoods() {
    const selectedId = selectWisataKuliner.value;
    fetch(`http://localhost:3000/api/wisatakuliner/${selectedId}/foods`)
        .then(response => response.json())
        .then(data => {
            foodList.innerHTML = '';
            if (data.length === 0) {
                const li = document.createElement('li');
                li.textContent = 'Makanan masih kosong.';
                foodList.appendChild(li);
            } else {
                data.forEach(food => {
                    const li = document.createElement('li');
                    li.textContent = `${food.nama_makanan} - Rp ${food.harga}`;
                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Edit';
                    updateButton.addEventListener('click', () => fillEditFormAndShow(food));
                    li.appendChild(updateButton);
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => deleteFood(food.id));
                    li.appendChild(deleteButton);
                    foodList.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function deleteFood(foodId) {
    fetch(`http://localhost:3000/api/food/${foodId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        displayFoods();
    })
    .catch(error => console.error('Error:', error));
    }

    // Fungsi untuk mengisi form pengeditan dengan data makanan yang akan diupdate
    function fillEditFormAndShow(food) {
        const editNamaMakananInput = document.getElementById('editNamaMakanan');
        const editHargaInput = document.getElementById('editHarga');
        editNamaMakananInput.value = food.nama_makanan;
        editHargaInput.value = food.harga;

        // Sembunyikan form tambah makanan
        addFoodForm.style.display = 'none';
        // Tampilkan form pengeditan
        editFoodForm.style.display = 'block';

        // Tambahkan event listener untuk form pengeditan
        editFoodForm.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(editFoodForm);
            const updatedData = {
                nama_makanan: formData.get('editNamaMakanan'),
                harga: formData.get('editHarga')
            };

            fetch(`http://localhost:3000/api/food/${food.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                displayFoods();
                // Kembali tampilkan form tambah makanan dan sembunyikan form pengeditan
                addFoodForm.style.display = 'block';
                editFoodForm.style.display = 'none';
            })
            .catch(error => console.error('Error:', error));
        });

        // Tambahkan event listener untuk tombol Batal
        const cancelEditButton = document.getElementById('cancelEdit');
        cancelEditButton.addEventListener('click', () => {
            // Kembali tampilkan form tambah makanan dan sembunyikan form pengeditan
            addFoodForm.style.display = 'block';
            editFoodForm.style.display = 'none';
        });
    }

    // Panggil fungsi untuk mengambil dan menampilkan daftar wisata kuliner saat halaman dimuat
    fetchWisataKuliner();
});

// ! CMS Minuman 
document.addEventListener("DOMContentLoaded", function() {
    const selectWisataKuliner = document.getElementById('selectWisataKuliner2');
    const addDrinkForm = document.getElementById('addDrinkForm');
    const editDrinkForm = document.getElementById('editDrinkForm');
    const drinkList = document.getElementById('drinkList');

            // Fungsi untuk mengambil dan menampilkan daftar wisata kuliner
            function fetchWisataKuliner() {
                fetch('http://localhost:3000/api/listallwisatakuliner')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(wisata => {
                            const option = document.createElement('option');
                            option.value = wisata.id;
                            option.textContent = wisata.nama_tempat;
                            selectWisataKuliner.appendChild(option);
                        });
                        // Panggil fungsi untuk menampilkan minuman saat wisata kuliner dipilih
                        selectWisataKuliner.addEventListener('change', displayDrinks);
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Tambahkan event listener untuk menambahkan minuman
            addDrinkForm.addEventListener('submit', event => {
                event.preventDefault();
                const formData = new FormData(addDrinkForm);
                const newData = {
                    wisata_kuliner_id: selectWisataKuliner.value,
                    nama_minuman: formData.get('namaMinuman'),
                    harga: formData.get('harga')
                };

                fetch(`http://localhost:3000/api/wisatakuliner/${newData.wisata_kuliner_id}/drink`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    displayDrinks();
                    addDrinkForm.reset(); // Reset form setelah minuman ditambahkan
                })
                .catch(error => console.error('Error:', error));
            });

            // Fungsi untuk menampilkan daftar minuman berdasarkan wisata kuliner yang dipilih
            function displayDrinks() {
                const selectedId = selectWisataKuliner.value;
                fetch(`http://localhost:3000/api/wisatakuliner/${selectedId}/drinks`)
                    .then(response => response.json())
                    .then(data => {
                        drinkList.innerHTML = '';
                        if (data.length === 0) {
                            const li = document.createElement('li');
                            li.textContent = 'Minuman masih kosong.';
                            drinkList.appendChild(li);
                        } else {
                            data.forEach(drink => {
                                const li = document.createElement('li');
                                li.textContent = `${drink.nama_minuman} - Rp ${drink.harga}`;
                                const updateButton = document.createElement('button');
                                updateButton.textContent = 'Edit';
                                updateButton.addEventListener('click', () => fillEditFormAndShow(drink));
                                li.appendChild(updateButton);
                                const deleteButton = document.createElement('button');
                                deleteButton.textContent = 'Delete';
                                deleteButton.addEventListener('click', () => deleteDrink(drink.id));
                                li.appendChild(deleteButton);
                                drinkList.appendChild(li);
                            });
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Fungsi untuk menghapus minuman
            function deleteDrink(drinkId) {
                fetch(`http://localhost:3000/api/drink/${drinkId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    displayDrinks();
                })
                .catch(error => console.error('Error:', error));
            }

            // Fungsi untuk mengisi form pengeditan dengan data minuman yang akan diupdate
            function fillEditFormAndShow(drink) {
                const editNamaMinumanInput = document.getElementById('editNamaMinuman');
                const editHargaInput = document.getElementById('editHarga');
                editNamaMinumanInput.value = drink.nama_minuman;
                editHargaInput.value = drink.harga;

                // Sembunyikan form tambah minuman
                addDrinkForm.style.display = 'none';
                // Tampilkan form pengeditan
                editDrinkForm.style.display = 'block';

                // Tambahkan event listener untuk form pengeditan
                editDrinkForm.addEventListener('submit', event => {
                    event.preventDefault();
                    const formData = new FormData(editDrinkForm);
                    const updatedData = {
                        nama_minuman: formData.get('editNamaMinuman'),
                        harga: formData.get('editHarga')
                    };

                    fetch(`http://localhost:3000/api/drink/${drink.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message);
                        displayDrinks();
                        // Kembali tampilkan form tambah minuman dan sembunyikan form pengeditan
                        addDrinkForm.style.display = 'block';
                        editDrinkForm.style.display = 'none';
                    })
                    .catch(error => console.error('Error:', error));
                });

                // Tambahkan event listener untuk tombol Batal
                const cancelEditButton = document.getElementById('cancelEdit');
                cancelEditButton.addEventListener('click', () => {
                    // Kembali tampilkan form tambah minuman dan sembunyikan form pengeditan
                    addDrinkForm.style.display = 'block';
                    editDrinkForm.style.display = 'none';
                });
            }

            // Panggil fungsi untuk mengambil dan menampilkan daftar wisata kuliner saat halaman dimuat
            fetchWisataKuliner();
        });