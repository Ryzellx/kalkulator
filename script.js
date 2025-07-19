// Animasi transisi tab
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(tc => {
            tc.classList.remove('fade-in');
        });
        setTimeout(() => {
            const activeTab = document.getElementById(btn.dataset.tab);
            if (activeTab) activeTab.classList.add('fade-in');
        }, 50);
    });
});

// Efek tombol interaktif
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.96)';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Highlight input saat hasil keluar
function highlightResult(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.boxShadow = '0 0 0 3px #ffb347, 0 2px 8px #ffeb3b55';
    el.style.transition = 'box-shadow 0.3s';
    setTimeout(() => {
        el.style.boxShadow = '';
    }, 700);
}

// Hook ke fungsi hasil
window._oldSetResult = window._oldSetResult || {};
['basic-result', 'calculus-result', 'conv-result', 'trig-result', 'adv-result', 'algebra-result'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        const desc = Object.getOwnPropertyDescriptor(el.__proto__, 'innerText');
        if (desc && desc.set) {
            window._oldSetResult[id] = desc.set;
            Object.defineProperty(el, 'innerText', {
                set: function(v) {
                    window._oldSetResult[id].call(this, v);
                    highlightResult(id);
                }
            });
        }
    }
});

// Tooltip pada footer
const credit = document.querySelector('.footer-credit');
if (credit) {
    credit.title = "Follow @Ryzellx untuk update!";
    credit.style.cursor = "pointer";
    credit.addEventListener('click', () => {
        window.open('https://github.com/ryzellx', '_blank');
    });
}

// Efek ketik pada judul
const title = document.querySelector('h1');
if (title) {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    function typeTitle() {
        if (i < text.length) {
            title.textContent += text[i++];
            setTimeout(typeTitle, 60);
        }
    }
    typeTitle();
}

// Fade-in CSS class
const style = document.createElement('style');
style.innerHTML = `
.fade-in {
    animation: fadeInTab 0.5s;
}
@keyframes fadeInTab {
    from { opacity: 0; transform: translateY(30px);}
    to { opacity: 1; transform: translateY(0);}
}
`;
document.head.appendChild(style);
