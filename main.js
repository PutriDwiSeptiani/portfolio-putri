// toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger di click
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// click di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});



// type effect beranda text
const element = document.getElementById("job");
const jobs = ["Graphic Designer", "Content Creator"];
let jobIndex = 0; // Menunjuk pekerjaan dalam daftar
let letterIndex = 0; // Menunjuk huruf dalam pekerjaan yang sedang diketik

function typeEffect(element, jobs, speed = 100) {
  // Jika masih ada huruf dalam pekerjaan yang sedang diketik
  if (letterIndex < jobs[jobIndex].length) {
    element.innerHTML += jobs[jobIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(() => typeEffect(element, jobs, speed), speed);
  } else {
    // Jika pekerjaan saat ini sudah selesai diketik, beri jeda sebelum pindah ke pekerjaan berikutnya
    setTimeout(() => {
      element.innerHTML = ""; // Hapus teks
      letterIndex = 0; // Reset index huruf
      jobIndex = (jobIndex + 1) % jobs.length; // Pindah ke pekerjaan berikutnya (looping)
      typeEffect(element, jobs, speed); // Mulai ulang efek pengetikan untuk pekerjaan berikutnya
    }, 2000); // Tunda 2 detik sebelum ketik ulang
  }
}

// Mulai efek pengetikan
typeEffect(element, jobs);


// Fungsi untuk membuka popup
function openPopup(imageSrc) {
  let popup = document.getElementById("imagePopup");
  let popupImage = document.getElementById("imgInPopup");

  popup.style.display = "flex";  // Tampilkan popup
  popupImage.src = imageSrc;     // Tampilkan gambar yang di-klik
}

// Fungsi untuk menutup popup
function closePopup() {
  let popup = document.getElementById("imagePopup");
  popup.style.display = "none";  // Sembunyikan popup
}

// Event listener untuk gambar
let images = document.querySelectorAll('.popup-trigger');
images.forEach(function (image) {
  image.addEventListener('click', function () {
    openPopup(this.src);  // Ambil sumber gambar yang di-klik
  });
});



// animasi AOS
function aosControl() {
  if (window.innerWidth < 768) {
    // Menonaktifkan AOS pada layar kecil
    AOS.init({
      disable: true
    });
  } else {
    // Mengaktifkan kembali AOS pada layar lebih besar
    AOS.init({
      disable: false
    });
  }
}

// Panggil fungsi ketika halaman dimuat
aosControl();

// Panggil fungsi saat ukuran layar berubah (resize)
window.addEventListener('resize', aosControl);

document.addEventListener('DOMContentLoaded', function () {
  const imgContents = document.querySelectorAll('.img-content');

  imgContents.forEach((imgContent) => {
    let images = imgContent.querySelectorAll('img');
    let currentIndex = 0;

    // Show the first image
    images[currentIndex].classList.add('active');

    // Function to handle sliding
    function slideShow() {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }

    // Set interval for the slideshow
    setInterval(slideShow, 3000); // Ganti gambar setiap 3 detik
  });
});


// Get elements
const popupForm = document.getElementById('popupForm');
const mailIcon = document.getElementById('mailIcon');
const closeBtn = document.querySelector('.close-btn');

// Show form when mail icon is clicked
mailIcon.addEventListener('click', function () {
  popupForm.style.display = 'flex';  // Tampilkan popup form
});

// Close the form when close button is clicked
closeBtn.addEventListener('click', function () {
  popupForm.style.display = 'none';  // Sembunyikan popup form
});

// Close the form if clicked outside of the form
window.addEventListener('click', function (e) {
  if (e.target === popupForm) {
    popupForm.style.display = 'none';  // Sembunyikan popup form jika klik di luar form
  }
});

document.querySelector('.close-btn').addEventListener('click', function() {
  document.getElementById('popupForm').style.display = 'none';
});


document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah pengiriman form default

  let email = document.getElementById('user_email').value;
  let validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validEmailPattern.test(email)) {
    alert('Please enter a valid email address.');
  } else {
    // Kirim email menggunakan EmailJS
    emailjs.sendForm('service_ikmk5vu', 'template_3kem65f', this)
      .then(function() {
        alert('Pesan kamu berhasil di kirim! cek email kamu');
        document.getElementById('contactForm').reset(); // Reset form setelah berhasil
        popupForm.style.display = 'none'; // Tutup pop-up setelah berhasil
      }, function(error) {
        alert('Gagal mengirim pesan. Coba kembali setelah ini.');
        console.error('EmailJS Error:', error);
      });
  }
});

