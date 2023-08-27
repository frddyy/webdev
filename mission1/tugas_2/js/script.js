function setInstructorsContent(imageSrc) {
    let container = document.getElementById("instructors");
    let instructorCard = document.createElement("div");
    instructorCard.className = "d-flex col-12 col-lg-6 flex-column flex-lg-row align-items-center text-center text-lg-start g-5";
    let instructorImgContainer = document.createElement("div");
    instructorImgContainer.className = "mx-3 instructor-img d-flex justify-content-center";
    let instructorProfile = document.createElement("div");
    instructorProfile.className = "col-md-d-flex flex-column";

    container.appendChild(instructorCard);
    instructorCard.appendChild(instructorImgContainer);
    instructorCard.appendChild(instructorProfile);

    let image = document.createElement("img");
    image.src = imageSrc;
    image.alt = "instructor";

    instructorImgContainer.appendChild(image);

    let div4 = document.createElement("div");
    div4.className = "col-md-9";
    let div5 = document.createElement("div");
    div5.className = "row";
    let div6 = document.createElement("div");
    div6.className = "col-md-auto";

    let instructorName = document.createElement("h5");
    let instructorDesc = document.createElement("p");
    instructorProfile.appendChild(instructorName);
    instructorProfile.appendChild(instructorDesc);

    // Extract the filename without extension from the image source
    let filenameWithoutExtension = imageSrc.split('/').pop().split('.')[0];
    instructorName.textContent = filenameWithoutExtension;

    //div2.appendChild(div4);
    div4.appendChild(div5);
    div5.appendChild(div6);
    instructorProfile.appendChild(instructorName);

    let div7 = document.createElement("div");
    div7.className = "row";
    let div8 = document.createElement("div");
    div8.className = "col-md-auto";
    let p = document.createElement("p");
    instructorDesc.className = "text-gray";
    instructorDesc.textContent = `Mahasiswa 3B - D4 Teknik Informatika Politeknik Negeri Bandung.`;

    instructorProfile.appendChild(instructorDesc)

    div4.appendChild(div7);
    div7.appendChild(div8);
    div8.appendChild(p);
}

// List of image file names (without extension)
const imageFileNames = [
    "Aini Diah Rahmawati",
    "Aini Nurul Azizah",
    "Amelia Nathasa",
    "Azis Surohman",
    "Danu Mahesa",
    "Dea Salma Isnaini",
    "Delvito Rahim Derivansyah",
    "Egi Satria Dharma Yudha Wicaksana",
    "Falia Davina Gustaman",
    "Ghessa Theniana",
    "Gian Sandrova",
    "Helsa Alika Femiani",
    "Husna Maulana",
    "Jovan Shelomo",
    "Mentari Ayu Alysia Sudrajat",
    "Mey Meizia Galtiady",
    "Mochamad Ferdy Fauzan",
    "Muhammad Daffa Raihandika",
    "Muhammad Rafi Farhan",
    "Nayara Saffa",
    "Novia Nur Azizah",
    "Rachmat Purwa Saputra",
    "Rahma Alia Latifa",
    "Raka Mahardika Maulana",
    "Regi Purnama",
    "Reihan Hadi Fauzan",
    "Reza Ananta Permadi Supriyo",
    "Rivaldo Fauzan Robani",
    "Rofa'ul Akrom Hendrawan",
    "Sendi Setiawan",
    "Syifa Khairina",
    "Yasmin Azizah Tuhfah"
];

// Panggil kode jika instructor.html dimuat
if (window.location.href.endsWith("instructors.html")) {
    for (const fileName of imageFileNames) {
        const imagePath = `assets/img/instructors/${fileName}.jpg`;
        setInstructorsContent(imagePath);
    }
} else {
    for (let i = 0; i < Math.min(12, imageFileNames.length); i++) {
        const imagePath = `assets/img/instructors/${imageFileNames[i]}.jpg`;
        setInstructorsContent(imagePath);
    }
}

$(document).ready(function() {
    // Fungsi untuk memeriksa apakah tombol navbar-toggler tampil
    function isNavbarTogglerVisible() {
        return $(".navbar-toggler").is(":visible");
    }

    // Fungsi untuk mengubah status kelas visually-hidden pada elemen tautan navigasi
    function toggleNavLinksVisibility() {
        const isTogglerVisible = isNavbarTogglerVisible();
        const navLinks = $(".nav-link");
        const navLinksHide = $(".hide");
        const navbarNav = $(".navbar-nav");

        if (isTogglerVisible) {
            navLinks.removeClass("fs-5");
            navLinksHide.removeClass("visually-hidden");
            navbarNav.removeClass("pe-5");
            // Ganti teks tautan "View all lessons" menjadi "Lessons"
            $(".nav-link:contains('View all lessons')").text("Lessons");

        } else {
            navLinks.addClass("fs-5");
            navLinksHide.addClass("visually-hidden");
            navbarNav.addClass("pe-5");
            // Ganti teks tautan "Lessons" menjadi "View all lessons"
            $(".nav-link:contains('Lessons')").text("View all lessons");
        }
    }

    // Panggil toggleNavLinksVisibility saat halaman dimuat dan saat jendela diubah ukurannya
    toggleNavLinksVisibility();
    $(window).resize(toggleNavLinksVisibility);
});
