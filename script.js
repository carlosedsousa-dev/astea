document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("testimonial-carousel");
    const track = document.getElementById("testimonial-track");

    if (!carousel || !track) return;

    let cards = Array.from(track.children);
    const originalCount = cards.length;
    if (!originalCount) return;

    let index = originalCount; // começa no MEIO
    let interval;

    /* =============================
       CLONAR ANTES E DEPOIS
    ============================= */
    cards.forEach(card => {
        track.appendChild(card.cloneNode(true));
        track.insertBefore(card.cloneNode(true), track.firstChild);
    });

    cards = Array.from(track.children);

    /* =============================
       CENTRALIZAÇÃO REAL
    ============================= */
    function centerCard(i, instant = false) {
        const card = cards[i];
        const cardRect = card.getBoundingClientRect();
        const carouselRect = carousel.getBoundingClientRect();

        const offset =
            cardRect.left
            - carouselRect.left
            - (carouselRect.width / 2)
            + (cardRect.width / 2);

        carousel.scrollBy({
            left: offset,
            behavior: instant ? "auto" : "smooth"
        });

        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    }

    /* =============================
       LOOP INFINITO REAL
    ============================= */
    function next() {
        index++;
        centerCard(index);

        // se sair do range, volta silenciosamente
        if (index >= cards.length - originalCount) {
            setTimeout(() => {
                index = originalCount;
                centerCard(index, true);
            }, 400);
        }
    }

    /* =============================
       CONTROLE AUTOMÁTICO
    ============================= */
    function start() {
        interval = setInterval(next, 3000);
    }

    function stop() {
        clearInterval(interval);
    }

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);

    /* =============================
       INIT
    ============================= */
    window.addEventListener("load", () => {
        centerCard(index, true);
        start();
    });
});
