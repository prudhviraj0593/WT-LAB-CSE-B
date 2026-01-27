const toggleBtn = document.getElementById('theme-toggle');
const storageMsg = document.getElementById('storage-msg');


const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    storageMsg.innerText = "Status: Dark Mode (Loaded from LocalStorage)";
} else {
    storageMsg.innerText = "Status: Light Mode (Default)";
}


toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    
    const isDark = document.body.classList.contains('dark-mode');
    const theme = isDark ? 'dark' : 'light';


    localStorage.setItem('theme', theme);
    storageMsg.innerText = `Preference updated: ${theme} mode saved to API`;
});