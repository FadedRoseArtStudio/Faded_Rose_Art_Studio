/* Faded Rose Art Studio artwork carousel */
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const artworks = [
        ["Watercolor Girl.jpeg", "Watercolor Girl"],
        ["Apple.jpeg", "Apple"],
        ["Baby.jpg", "Baby"],
        ["Belle.jpg", "Belle"],
        ["Bubba.jpg", "Bubba"],
        ["Bunny.jpg", "Bunny"],
        ["Burger.jpeg", "Burger"],
        ["Cherry.jpeg", "Cherry"],
        ["Coworker.jpg", "Coworker"],
        ["Cupcake.jpeg", "Cupcake"],
        ["Donut.jpeg", "Donut"],
        ["Dragon 2.jpg", "Dragon 2"],
        ["Dragon.jpg", "Dragon"],
        ["Elephant.jpg", "Elephant"],
        ["Flower.jpg", "Flower"],
        ["Girl.jpg", "Girl"],
        ["Gnome.jpg", "Gnome"],
        ["Goofy Girl.jpg", "Goofy Girl"],
        ["Grandma Glo.jpg", "Grandma Glo"],
        ["Greek.jpg", "Greek"],
        ["Hatter.jpg", "Hatter"],
        ["Joker.jpg", "Joker"],
        ["Lime-wedge.jpeg", "Lime Wedge"],
        ["Little Lyss.jpg", "Little Lyss"],
        ["Lyss.jpg", "Lyss"],
        ["Marilyn 2.jpeg", "Marilyn 2"],
        ["Marilyn.jpg", "Marilyn"],
        ["Miracle.jpg", "Miracle"],
        ["Monkey.jpg", "Monkey"],
        ["Pumpkin.jpg", "Pumpkin"],
        ["Santa.jpg", "Santa"],
        ["Snowman.jpg", "Snowman"],
        ["SpongeBob.jpg", "SpongeBob"],
        ["Strawberries.jpeg", "Strawberries"],
        ["Windmill.jpg", "Windmill"],
        ["American Psyho.jpeg", "American Psyho"]
];
   

    const image = carousel.querySelector("[data-artwork-image]");
    const link = carousel.querySelector("[data-artwork-link]");
    const caption = carousel.querySelector("[data-artwork-caption]");
    const status = carousel.querySelector("[data-artwork-status]");
    const stage = carousel.querySelector(".carousel-stage");
    let currentIndex = 0;
    let touchStart = null;

    function showArtwork(index) {
        currentIndex = (index + artworks.length) % artworks.length;

        const [filename, title] = artworks[currentIndex];
        const path = `images/${filename}`;

        image.src = path;
        image.alt = `${title} — artwork by Darlene Viera`;
        link.href = path;
        link.setAttribute("aria-label", `Open full image: ${title}`);
        caption.textContent = title;
        status.textContent =
            `Artwork ${currentIndex + 1} of ${artworks.length}`;
    }

    carousel.querySelector("[data-previous]").addEventListener("click", () => {
        showArtwork(currentIndex - 1);
    });

    carousel.querySelector("[data-next]").addEventListener("click", () => {
        showArtwork(currentIndex + 1);
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showArtwork(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showArtwork(currentIndex + 1);
        }
    });

    stage.addEventListener("touchstart", (event) => {
        if (event.touches.length !== 1) {
            touchStart = null;
            return;
        }

        touchStart = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    }, { passive: true });

    stage.addEventListener("touchend", (event) => {
        if (!touchStart) return;

        const distanceX =
            event.changedTouches[0].clientX - touchStart.x;
        const distanceY =
            event.changedTouches[0].clientY - touchStart.y;

        if (
            Math.abs(distanceX) > 50 &&
            Math.abs(distanceX) > Math.abs(distanceY)
        ) {
            showArtwork(currentIndex + (distanceX < 0 ? 1 : -1));
        }

        touchStart = null;
    }, { passive: true });

    stage.addEventListener("touchcancel", () => {
        touchStart = null;
    });

    /* Prevent a swipe from opening the image accidentally. */
    link.addEventListener("click", (event) => {
        if (event.defaultPrevented) return;
    });

    showArtwork(0);
});