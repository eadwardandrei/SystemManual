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


document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".content");
    const menuLinks = document.querySelectorAll(".menu-link");

    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (!targetId.startsWith("#")) return;

            const targetSection = document.querySelector(targetId);
            if (!targetId || targetId === "#") return;

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

document.querySelectorAll('.copy-email').forEach(button => {
    button.addEventListener('click', () => {
        const email = button.dataset.email;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(showToast);
        } else {
            alert("Email copied: " + email);
        }
    });
});

function showToast() {
    const toast = document.getElementById('copy-toast');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 1600);
}



if (!document.body.classList.contains("admin-guide-page")) {
    // existing scroll-based active logic
}