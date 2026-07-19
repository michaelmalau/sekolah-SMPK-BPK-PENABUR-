document.addEventListener("DOMContentLoaded", () => {
    
    // --- FEATURE 1: ANIMASI ANGKA BERJALAN (COUNTER ANIMATION) ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Semakin tinggi nilainya, semakin lambat jalannya angka

    const startCounter = (counter) => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            
            // Tentukan langkah kenaikan angka
            const inc = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + inc;
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + "+"; // Tambahkan tanda plus di akhir target
            }
        };
        updateCount();
    };

    // Deteksi jika bagian statistik terlihat di layar pengguna sebelum menjalankan fungsi
    const observerOptions = {
        threshold: 0.5 // Aktif jika 50% elemen sudah masuk layar
    };

    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                counters.forEach(counter => startCounter(counter));
                observer.unobserve(entry.target); // Matikan observer setelah berjalan sekali
            }
        });
    }, observerOptions);

    if(statsSection) {
        observer.observe(statsSection);
    }


    // --- FEATURE 2: EFEK ACTIVE LINK PADA NAVIGASI SAAT DI-SCROLL ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});