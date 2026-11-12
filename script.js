// ---------- Toast message ----------
const toast = document.getElementById("toast");
let toastTimer;

function showMessage(text) {
    toast.textContent = text || "Thanks for visiting our website!";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

// ---------- Navbar: changes colour and size when scrolled ----------
const nav = document.getElementById("nav");
function updateNav() {
    nav.classList.toggle("scrolled", window.scrollY > 50);
}
window.addEventListener("scroll", updateNav);
updateNav(); // run once on page load

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
});

menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// ---------- Highlight current section in menu ----------
const links = document.querySelectorAll(".menu ul a");
const sections = [...links].map(a => document.querySelector(a.getAttribute("href")));

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(s => s && observer.observe(s));

// ---------- Contact form ----------
const form = document.getElementById("contactForm");
const errorBox = document.getElementById("formError");

form.addEventListener("submit", e => {
    e.preventDefault();

    const fields = [form.name, form.email, form.message];
    fields.forEach(f => f.classList.remove("invalid"));
    errorBox.textContent = "";

    const emptyField = fields.find(f => !f.value.trim());
    if (emptyField) {
        emptyField.classList.add("invalid");
        emptyField.focus();
        errorBox.textContent = "Please fill in all fields.";
        return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim());
    if (!emailOk) {
        form.email.classList.add("invalid");
        form.email.focus();
        errorBox.textContent = "Enter a valid email address, like name@example.com.";
        return;
    }

    form.reset();
    showMessage("Message sent. We will reply within one working day.");
});
