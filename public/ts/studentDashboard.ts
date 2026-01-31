/**
 * Student Dashboard Script
 * Handles dynamic loading of student information and courses
 */
import { AppUI } from './utils/ui.js';
import { Auth } from './modules/auth.js';
import { Categories } from './modules/categories.js';
import { Theme } from './utils/theme.js';

let allCourses: any[] = [];
let currentView: 'courses' | 'certificates' = 'courses';

document.addEventListener('DOMContentLoaded', async () => {
    Theme.init();
    Auth.init();
    // Check if user is logged in
    const userStr = localStorage.getItem('auth_user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
        // Redirect to home page if not logged in
        console.warn('No user session found, redirecting to home.');
        window.location.href = 'index.html';
        return;
    }

    console.log('Student session detected:', user.name);

    // Update user info in the header
    updateUserInfo(user);

    // Setup sidebar navigation
    setupNavigation();

    // Setup Search
    setupSearch();

    // Load dynamic courses
    await loadStudentCourses();

    // Setup Category Filter
    setupCategoryFilter();

});

/**
 * Updates the user information displayed in the header
 */
function updateUserInfo(user: any) {
    const headerName = document.getElementById('header-user-name');
    const roleText = document.getElementById('header-user-role');
    const welcomeTitle = document.getElementById('welcome-title');
    const userDisplayName = document.getElementById('user-display-name');
    const coursesStatus = document.getElementById('courses-status');
    const sidebarUserName = document.getElementById('sidebar-user-name');
    const sidebarUserRole = document.getElementById('sidebar-user-role');

    const popupName = document.getElementById('popup-user-name');
    const popupRole = document.getElementById('popup-user-role');

    if (headerName) {
        headerName.textContent = user.name || 'Aluno';
    }

    if (userDisplayName) {
        userDisplayName.textContent = user.name ? user.name.split(' ')[0] : 'Antonio';
    }

    if (sidebarUserName) {
        sidebarUserName.textContent = user.name || 'Aluno';
    }

    if (sidebarUserRole) {
        const userRole = (user.role || 'STUDENT').toLowerCase();
        sidebarUserRole.textContent = userRole === 'instructor' ? 'Instrutor' : 'Estudante';
    }

    if (popupName) popupName.textContent = user.name || 'Aluno';
    if (popupRole) {
        const userRole = (user.role || 'STUDENT').toLowerCase();
        popupRole.textContent = userRole === 'instructor' ? 'Instrutor' : 'Estudante';
    }

    if (roleText) {
        const userRole = (user.role || 'STUDENT').toUpperCase();
        roleText.textContent = userRole === 'INSTRUCTOR' ? 'Instrutor' : 'Aluno';
    }

    if (welcomeTitle) {
        // Welcome title now has a span for the name
    }

    if (coursesStatus) {
        coursesStatus.innerHTML = `Carregando seus cursos...`;
    }
}

/**
 * Fetches courses from API
 */
async function loadStudentCourses() {
    const status = document.getElementById('courses-status');
    try {
        const response = await AppUI.apiFetch('/my-courses');
        allCourses = response?.data || [];

        if (status) {
            status.innerHTML = `Você tem <span class="text-primary font-bold">${allCourses.length} cursos</span> ativos em andamento.`;
        }

        if (allCourses.length > 0) {
            // Find course with most progress but not 100%, or the first one
            const ongoing = allCourses
                .filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100)
                .sort((a, b) => (b.progress || 0) - (a.progress || 0))[0];

            renderFeaturedCourse(ongoing || allCourses[0]);
        } else {
            const featuredContainer = document.getElementById('featured-course-container');
            if (featuredContainer) featuredContainer.style.display = 'none';
        }

        if (currentView === 'courses') {
            renderCourses(allCourses);
        } else {
            renderCertificates(allCourses);
        }
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
        const grid = document.getElementById('courses-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full py-10 text-center">
                    <p class="text-error mb-4">Erro ao carregar seus cursos.</p>
                    <button onclick="window.location.reload()" class="btn-auth-submit" style="width: auto; padding: 0.5rem 1rem">Tentar Novamente</button>
                </div>
            `;
        }
    }
}

/**
 * Renders course cards to the grid
 */
function renderCourses(courses: any[]) {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    if (courses.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-20 text-center bg-surface-dark border border-white/5 rounded-xl">
                <span class="material-symbols-outlined text-6xl text-slate-700 mb-4">school</span>
                <p class="text-slate-500 text-lg">Nenhum curso encontrado.</p>
                <a href="index.html" class="text-primary hover:underline mt-4 inline-block font-bold">Explorar Catálogo de Cursos</a>
            </div>
        `;
        return;
    }

    grid.innerHTML = courses.map((course: any) => {
        const progress = course.progress || 0;
        let imageUrl = course.coverImageUrl;
        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/') && !imageUrl.startsWith('data:')) {
            imageUrl = '/' + imageUrl;
        }
        if (!imageUrl) {
            imageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
        }

        return `
            <div class="bg-surface-dark border border-white-5 rounded-xl overflow-hidden group hover-border-primary transition-all flex flex-col">
                <div class="relative h-48 overflow-hidden">
                    <div class="absolute inset-0 bg-center bg-cover transform group-hover-scale-105 transition-transform duration-700"
                        style="background-image: url('${imageUrl}')">
                    </div>
                    <div class="absolute inset-0 bg-black-20 group-hover-opacity-0 transition-colors duration-500"></div>
                    <div class="absolute top-4 left-4">
                        <span class="px-3 py-1 bg-black-80 backdrop-blur-md text-primary text-xs font-bold rounded-full border border-primary-30">CURSO</span>
                    </div>
                </div>
                <div class="p-6 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold mb-1 text-white group-hover-text-primary transition-colors">
                        ${course.title}</h3>
                    <p class="text-sm text-slate-500 mb-6 line-clamp-2">${course.description || 'Inicie seus estudos neste treinamento completo.'}</p>
                    <div class="mt-auto">
                        <div class="flex justify-between items-end mb-2">
                            <span class="text-xs font-bold text-slate-500">PROGRESSO</span>
                            <span class="text-sm font-bold text-primary">${progress}%</span>
                        </div>
                        <div class="w-full h-1-5 bg-white-5 rounded-full mb-6 overflow-hidden">
                            <div class="h-full bg-primary shadow-primary-md transition-all duration-1000" style="width: ${progress}%"></div>
                        </div>
                        <a href="player.html?courseId=${course.id}" class="w-full bg-white-5 text-primary py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 group-hover-bg-primary transition-all" style="text-decoration: none;">
                            <span>${progress === 100 ? 'Revisar Conteúdo' : 'Continuar Estudo'}</span>
                            <span class="material-symbols-outlined text-sm">${progress === 100 ? 'verified' : 'play_circle'}</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Renders the featured course (Continue Learning)
 */
function renderFeaturedCourse(course: any) {
    const title = document.getElementById('featured-title');
    const cover = document.getElementById('featured-course-image') as HTMLImageElement;
    const progressText = document.getElementById('featured-progress-text');
    const progressBar = document.getElementById('featured-progress-bar');
    const link = document.getElementById('featured-link') as HTMLAnchorElement;
    const featuredContainer = document.getElementById('featured-course-container');

    if (!course || !featuredContainer) return;

    featuredContainer.style.display = 'flex';

    if (title) title.textContent = course.title;
    if (cover) cover.src = course.coverImageUrl || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80';

    const progress = course.progress || 0;
    if (progressText) progressText.textContent = `${progress}%`;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (link) {
        link.href = `player.html?courseId=${course.id}`;
        link.onclick = (e) => {
            // e.preventDefault();
            // window.location.href = link.href;
        };
    }
}

/**
 * Renders only courses with certificates
 */
function renderCertificates(courses: any[]) {
    const grid = document.getElementById('courses-grid');
    const status = document.getElementById('courses-status');
    if (!grid) return;

    const certificates = courses.filter(c => c.certificateHash || c.progress === 100);

    if (status) {
        status.innerHTML = `Você conquistou <span class="text-primary font-bold">${certificates.length} certificados</span> até agora.`;
    }

    if (certificates.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-20 text-center bg-surface-dark border border-white/5 rounded-xl">
                <span class="material-symbols-outlined text-6xl text-slate-700 mb-4">workspace_premium</span>
                <p class="text-slate-500 text-lg">Nenhum certificado disponível.</p>
                <p class="text-sm text-slate-600">Conclua 100% de um curso para gerar seu certificado.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = certificates.map((course: any) => {
        const date = new Date().toLocaleDateString('pt-BR');
        return `
            <div class="certificate-card-premium group">
                <div class="cert-badge-premium">Conquista</div>
                <div class="cert-icon-wrapper">
                    <span class="material-symbols-outlined">workspace_premium</span>
                </div>
                <div>
                    <h3 class="cert-title-premium">${course.title}</h3>
                    <div class="cert-meta-premium">
                        <span class="material-symbols-outlined" style="font-size: 1rem">calendar_today</span>
                        <span>Concluído em ${date}</span>
                    </div>
                </div>
                <div class="mt-auto pt-2">
                    <a href="${course.certificateHash ? `certificate.html?hash=${course.certificateHash}` : `player.html?courseId=${course.id}`}" 
                       class="btn-download-cert" style="text-decoration: none;">
                        <span class="material-symbols-outlined">download</span>
                        <span>${course.certificateHash ? 'Baixar Certificado' : 'Gerar Agora'}</span>
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Sets up Search functionality
 */
function setupSearch() {
    const searchInput = document.getElementById('course-search-input') as HTMLInputElement;
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = (e.target as HTMLInputElement).value.toLowerCase();
        const filtered = allCourses.filter(course =>
            course.title.toLowerCase().includes(query) ||
            (course.description && course.description.toLowerCase().includes(query))
        );
        renderCourses(filtered);
    });
}

/**
 * Sets up sidebar navigation and UI toggles
 */
function setupNavigation() {
    // Sidebar Toggle
    const btnToggle = document.getElementById('btn-toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    if (btnToggle && sidebar) {
        btnToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // --- Auth Card UI Listeners ---
    const avatarBtn = document.getElementById('user-avatar-btn');
    const authContainer = document.getElementById('auth-card-container');
    const cardInner = document.getElementById('auth-card');

    if (avatarBtn && authContainer) {
        avatarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authContainer.classList.toggle('show');
            // Refresh content when showing
            if (authContainer.classList.contains('show')) {
                Auth.updateAuthUI();
            }
        });

        document.addEventListener('click', (e) => {
            if (
                authContainer.classList.contains('show') &&
                !authContainer.contains(e.target as Node) &&
                !avatarBtn.contains(e.target as Node)
            ) {
                authContainer.classList.remove('show');
            }
        });
    }

    // Auth Card Action Handlers
    document.getElementById('btn-logout')?.addEventListener('click', async () => {
        const confirmed = await AppUI.promptModal('Sair da Conta', 'Tem certeza que deseja sair agora?');
        if (confirmed) {
            await Auth.logout();
            window.location.href = 'index.html';
        }
    });

    document.getElementById('btn-my-learning')?.addEventListener('click', () => {
        authContainer?.classList.remove('show');
        // Already here, but just in case
        window.location.href = 'student.html';
    });

    document.getElementById('btn-instructor-dash')?.addEventListener('click', () => {
        window.location.href = 'instructor.html';
    });

    document.getElementById('btn-create-course')?.addEventListener('click', () => {
        window.location.href = 'instructor.html';
    });

    document.getElementById('btn-manage-categories')?.addEventListener('click', (e) => {
        e.preventDefault();
        // Redirect to instructor dash for this for now as it needs complex templates
        window.location.href = 'instructor.html';
    });

    document.getElementById('btn-view-profile')?.addEventListener('click', () => {
        Auth.showProfileView();
    });

    document.getElementById('btn-back-from-profile')?.addEventListener('click', () => {
        Auth.updateAuthUI();
    });

    // Mirroring instructor's initial update
    Auth.updateAuthUI();

    // Home link in breadcrumb or logo
    const homeLinks = document.querySelectorAll('a');
    homeLinks.forEach(link => {
        if (link.textContent?.trim() === 'Início') {
            link.href = 'index.html';
        }
    });


    const sidebarProfileCard = document.getElementById('sidebar-profile-card');
    const sidebarAvatarContainer = document.getElementById('sidebar-avatar-container');
    const sidebarPopup = document.getElementById('sidebar-profile-popup');

    if (sidebarAvatarContainer && sidebarPopup) {
        sidebarAvatarContainer.addEventListener('click', (e) => {
            if (sidebar?.classList.contains('collapsed')) {
                e.preventDefault();
                e.stopPropagation();
                sidebarPopup.classList.toggle('show');
            }
        });

        document.addEventListener('click', (e) => {
            if (sidebarPopup.classList.contains('show') && !sidebarPopup.contains(e.target as Node) && !sidebarAvatarContainer.contains(e.target as Node)) {
                sidebarPopup.classList.remove('show');
            }
        });
    }

    if (sidebarProfileCard) {
        sidebarProfileCard.addEventListener('click', () => {
            if (!sidebar?.classList.contains('collapsed')) {
                authContainer?.classList.add('show');
                Auth.showProfileView();
            }
        });
    }

    const headerAvatar = document.getElementById('header-avatar-btn');
    if (headerAvatar) {
        headerAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            authContainer?.classList.toggle('show');
            if (authContainer?.classList.contains('show')) {
                Auth.updateAuthUI();
            }
        });
    }

    // Profile link or other navigation items
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const a = link as HTMLAnchorElement;
        const text = a.textContent?.trim() || '';

        if (text.includes('Dashboard') || text.includes('Meus Cursos')) {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                currentView = 'courses';
                updateActiveLink(a);
                document.getElementById('welcome-title')!.innerHTML = `Meus <span class="text-primary">Cursos</span>`;
                renderCourses(allCourses);
            });
        } else if (text.includes('Certificados')) {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                currentView = 'certificates';
                updateActiveLink(a);
                document.getElementById('welcome-title')!.innerHTML = `Meus <span class="text-primary">Certificados</span>`;
                renderCertificates(allCourses);
            });
        } else if (text.includes('Perfil')) {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                // Open auth card and show profile
                authContainer?.classList.add('show');
                Auth.showProfileView();
            });
        }
    });

    // Set initial active link
    const initialLink = document.querySelector('nav a') as HTMLAnchorElement;
    if (initialLink) updateActiveLink(initialLink);

    // Initial Active state handling for sidebar sections
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.classList.contains('active')) {
            // already correct
        }
    });
}

function updateActiveLink(activeLink: HTMLAnchorElement) {
    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
    });

    activeLink.classList.add('active');
}

/**
 * Sets up category filter logic
 */
async function setupCategoryFilter() {
    const filter = document.getElementById('category-filter') as HTMLSelectElement;
    if (!filter) return;

    try {
        const categories = await Categories.getAll();
        filter.innerHTML = `<option value="">Todas Categorias</option>` +
            categories.map((c: any) => `<option value="${c.id}">${c.name}</option>`).join('');

        filter.addEventListener('change', () => {
            const categoryId = filter.value;
            if (!categoryId) {
                renderCourses(allCourses);
            } else {
                const filtered = allCourses.filter(c => c.categoryId === categoryId);
                renderCourses(filtered);
            }
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

