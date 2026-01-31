/**
 * Theme Utility for Dark/Light Mode
 */
export const Theme = {
    init() {
        const savedTheme = localStorage.getItem('app-theme') || 'dark';
        this.applyTheme(savedTheme);

        const toggleBtns = document.querySelectorAll('#theme-toggle');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.applyTheme(newTheme);
            });
        });
    },

    applyTheme(theme: string) {
        if (theme === 'light') {
            document.documentElement.classList.add('light');
            localStorage.setItem('app-theme', 'light');
        } else {
            document.documentElement.classList.remove('light');
            localStorage.setItem('app-theme', 'dark');
        }

        // Update Icons
        const icons = document.querySelectorAll('#theme-toggle .material-symbols-outlined, .btn-theme-toggle .material-symbols-outlined');
        icons.forEach(icon => {
            // If it's the dual-icon approach from student.html, we don't need to change textContent
            // But if it's a single icon, we toggle it
            if (!icon.classList.contains('dark-icon') && !icon.classList.contains('light-icon')) {
                icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
            }
        });
    }
};
