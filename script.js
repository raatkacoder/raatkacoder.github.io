// Meme Generator App
class MemeGenerator {
    constructor() {
        this.canvas = document.getElementById('memeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentImage = null;
        this.currentTemplate = null;
        this.memeCount = parseInt(localStorage.getItem('memeCount') || '0');
        this.currentPage = 0;
        this.textColor = '#FFFFFF';
        
        this.init();
    }

    init() {
        this.loadTemplates();
        this.setupEventListeners();
        this.updateMemeCount();
    }

    // Load meme templates from Imgflip API
    async loadTemplates() {
        const grid = document.getElementById('templateGrid');
        grid.innerHTML = '<div class="loading">Loading epic templates... 🚀</div>';

        try {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            
            if (data.success) {
                this.templates = data.data.memes;
                this.displayTemplates(0, 12);
            }
        } catch (error) {
            grid.innerHTML = '<div class="loading">Oops! Could not load templates 😢</div>';
            console.error('Error loading templates:', error);
        }
    }

    displayTemplates(start, count) {
        const grid = document.getElementById('templateGrid');
        grid.innerHTML = '';

        const templates = this.templates.slice(start, start + count);
        
        templates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.innerHTML = `
                <img src="${template.url}" alt="${template.name}" loading="lazy">
                <div class="template-name">${template.name}</div>
            `;
            
            card.addEventListener('click', () => this.selectTemplate(template));
            grid.appendChild(card);
        });

        this.currentPage = start + count;
    }

    selectTemplate(template) {
        this.currentTemplate = template;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            this.currentImage = img;
            this.setupCanvas(img);
            this.showEditor();
            this.drawMeme();
            this.showToast('Template selected! Start creating 🎨');
        };
        
        img.src = template.url;
    }

    setupCanvas(img) {
        const maxWidth = 500;
        const scale = maxWidth / img.width;
        
        this.canvas.width = img.width > maxWidth ? maxWidth : img.width;
        this.canvas.height = img.height * (img.width > maxWidth ? scale : 1);
    }

    showEditor() {
        document.getElementById('editorSection').style.display = 'block';
        document.getElementById('editorSection').scrollIntoView({ behavior: 'smooth' });
    }

    drawMeme() {
        if (!this.currentImage) return;

        const ctx = this.ctx;
        const canvas = this.canvas;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image
        ctx.drawImage(this.currentImage, 0, 0, canvas.width, canvas.height);

        // Setup text style
        const fontSize = document.getElementById('fontSize').value;
        ctx.fillStyle = this.textColor;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.floor(fontSize / 20);
        ctx.font = `bold ${fontSize}px Impact, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Top text
        const topText = document.getElementById('topText').value.toUpperCase();
        if (topText) {
            this.drawText(topText, canvas.width / 2, 20);
        }

        // Bottom text
        const bottomText = document.getElementById('bottomText').value.toUpperCase();
        if (bottomText) {
            ctx.textBaseline = 'bottom';
            this.drawText(bottomText, canvas.width / 2, canvas.height - 20);
        }
    }

    drawText(text, x, y) {
        const ctx = this.ctx;
        const maxWidth = this.canvas.width - 40;
        
        // Word wrap
        const words = text.split(' ');
        let line = '';
        let lines = [];
        
        words.forEach(word => {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && line !== '') {
                lines.push(line);
                line = word + ' ';
            } else {
                line = testLine;
            }
        });
        lines.push(line);

        // Draw lines
        lines.forEach((line, index) => {
            const lineY = y + (index * parseInt(document.getElementById('fontSize').value));
            ctx.strokeText(line, x, lineY);
            ctx.fillText(line, x, lineY);
        });
    }

    setupEventListeners() {
        // Text inputs
        document.getElementById('topText').addEventListener('input', () => this.drawMeme());
        document.getElementById('bottomText').addEventListener('input', () => this.drawMeme());

        // Font size
        document.getElementById('fontSize').addEventListener('input', (e) => {
            document.getElementById('fontSizeValue').textContent = e.target.value;
            this.drawMeme();
        });

        // Color buttons
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.textColor = e.target.dataset.color;
                this.drawMeme();
            });
        });

        // Image upload
        document.getElementById('imageUpload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        this.currentImage = img;
                        this.setupCanvas(img);
                        this.showEditor();
                        this.drawMeme();
                        this.showToast('Custom image uploaded! 📸');
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadMeme());

        // Share button
        document.getElementById('shareBtn').addEventListener('click', () => this.shareMeme());

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetEditor());

        // Load more templates
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.displayTemplates(this.currentPage, 12);
        });

        // Random meme
        document.getElementById('randomMemeBtn').addEventListener('click', () => this.loadRandomMeme());
    }

    downloadMeme() {
        if (!this.currentImage) {
            this.showToast('Please select a template first! 🖼️');
            return;
        }

        const link = document.createElement('a');
        link.download = `meme-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();

        this.memeCount++;
        localStorage.setItem('memeCount', this.memeCount);
        this.updateMemeCount();
        
        this.showToast('Meme downloaded! Share it with the world! 🎉');
    }

    async shareMeme() {
        if (!this.currentImage) {
            this.showToast('Please create a meme first! 🖼️');
            return;
        }

        try {
            this.canvas.toBlob(async (blob) => {
                const file = new File([blob], 'meme.png', { type: 'image/png' });
                
                if (navigator.share && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: 'Check out this meme!',
                        text: 'Made with Epic Meme Generator'
                    });
                    this.showToast('Meme shared! 🚀');
                } else {
                    this.downloadMeme();
                    this.showToast('Share not supported. Downloaded instead! 📥');
                }
            });
        } catch (error) {
            console.error('Error sharing:', error);
            this.showToast('Could not share. Try downloading! 😅');
        }
    }

    resetEditor() {
        document.getElementById('topText').value = '';
        document.getElementById('bottomText').value = '';
        document.getElementById('fontSize').value = 40;
        document.getElementById('fontSizeValue').textContent = 40;
        this.drawMeme();
        this.showToast('Reset complete! Start fresh 🔄');
    }

    async loadRandomMeme() {
        const container = document.getElementById('randomMemeContainer');
        container.innerHTML = '<div class="loading">Fetching random meme... 🎲</div>';

        try {
            const response = await fetch('https://meme-api.com/gimme');
            const data = await response.json();
            
            container.innerHTML = `
                <img src="${data.url}" alt="${data.title}">
                <p style="margin-top: 1rem; font-size: 1.2rem; font-weight: 600;">${data.title}</p>
                <p style="opacity: 0.7;">from r/${data.subreddit}</p>
            `;
        } catch (error) {
            container.innerHTML = '<div class="loading">Could not fetch meme 😢</div>';
            console.error('Error loading random meme:', error);
        }
    }

    updateMemeCount() {
        document.getElementById('memeCount').textContent = this.memeCount;
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemeGenerator();
});

// Add some fun console message
console.log('%c🔥 MEME GENERATOR 🔥', 'font-size: 30px; font-weight: bold; color: #667eea;');
console.log('%cMade with 💖 for the meme community!', 'font-size: 14px; color: #764ba2;');
