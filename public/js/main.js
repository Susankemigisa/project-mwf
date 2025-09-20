document.addEventListener("DOMContentLoaded", () => { 
  const menuBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    // Auto-close when clicking a link on mobile
    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("open");
        }
      });
    });

    // Close sidebar when clicking outside of it
    document.addEventListener("click", (e) => {
      const isClickInsideSidebar = sidebar.contains(e.target);
      const isClickOnButton = menuBtn.contains(e.target);

      if (!isClickInsideSidebar && !isClickOnButton && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
      }
    });
  }
});
