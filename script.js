document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.getElementById("sidebarToggle");
    const resizer = document.getElementById("sidebarResizer");

    let isResizing = false;

    const MIN_WIDTH = 200;
    const MAX_WIDTH = 420;
    const COLLAPSED_WIDTH = 95;
    const DEFAULT_WIDTH = sidebar.offsetWidth || 260;

    /* ===============================
       EXPANDABLE MENUS
       =============================== */
    document.querySelectorAll(".menu-section.expandable").forEach(section => {
        section.addEventListener("click", () => {
            if (sidebar.classList.contains("collapsed")) return;
            section.parentElement.classList.toggle("open");
        });
    });

    /* ===============================
       COLLAPSE SIDEBAR
       =============================== */
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");

        if (sidebar.classList.contains("collapsed")) {
            sidebar.style.width = COLLAPSED_WIDTH + "px";
            document.querySelectorAll(".menu-group").forEach(group => {
                group.classList.remove("open");
            });
        } else {
            sidebar.style.width = DEFAULT_WIDTH + "px";
        }
    });

    /* ===============================
       RESIZABLE SIDEBAR (FIXED)
       =============================== */
    resizer.addEventListener("mousedown", (e) => {
        if (sidebar.classList.contains("collapsed")) return;

        isResizing = true;
        document.body.style.cursor = "ew-resize";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;

        const sidebarLeft = sidebar.getBoundingClientRect().left;
        const newWidth = e.clientX - sidebarLeft;

        if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
            sidebar.style.width = newWidth + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        if (!isResizing) return;

        isResizing = false;
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
    });
});

/* ===============================
   SCROLL SPY (ACTIVE SECTION)
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".menu-link");

    function activateMenu() {
        let scrollPos = document.querySelector(".content").scrollTop;

        sections.forEach(section => {
            const offsetTop = section.offsetTop - 120;
            const offsetBottom = offsetTop + section.offsetHeight;

            if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                navLinks.forEach(link => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.menu-link[href="#${section.id}"]`
                );

                if (activeLink) activeLink.classList.add("active");
            }
        });
    }

    document.querySelector(".content")
        .addEventListener("scroll", activateMenu);
});

document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".content");
    const menuLinks = document.querySelectorAll(".menu-link");

    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (!targetId.startsWith("#")) return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            e.preventDefault();

            const offset = 100; // adjust if needed (header spacing)
            const targetPosition =
                targetSection.offsetTop - offset;

            content.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });
});

