const cart = [];
const money = new Intl.NumberFormat('es-CO');

const productCards = [...document.querySelectorAll('.product-card')];
const cartItems = document.getElementById('cart-items');
const cartTotals = document.getElementById('cart-totals');
const subtotal = document.getElementById('subtotal');
const totalPrice = document.getElementById('total-price');
const checkoutTotal = document.getElementById('checkout-total');
const cartCount = document.getElementById('cart-count');
const floatingCart = document.getElementById('floating-cart');

function formatPrice(value) {
    return `$${money.format(value)}`;
}

function addToCart(name, price, quantity = 1) {
    const existing = cart.find((item) => item.name === name);
    if (existing) existing.quantity += quantity;
    else cart.push({ name, price, quantity });
    renderCart();
}

function renderCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartCount.textContent = count;
    floatingCart.classList.toggle('hidden', count === 0);
    cartTotals.classList.toggle('hidden', count === 0);

    if (!count) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span class="empty-cart-icon">🛒</span>
                <p>Tu carrito está vacío</p>
                <a href="#productos" class="btn btn-secondary">Ver Productos</a>
            </div>`;
    } else {
        cartItems.innerHTML = cart.map((item) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.quantity} × ${formatPrice(item.price)}</div>
                </div>
                <button class="cart-item-remove" type="button" data-remove="${item.name}" aria-label="Quitar ${item.name}">×</button>
            </div>`).join('');
    }

    subtotal.textContent = formatPrice(total);
    totalPrice.textContent = `${formatPrice(total)} COP`;
    checkoutTotal.textContent = formatPrice(total);

    productCards.forEach((card) => {
        const name = card.dataset.name;
        card.classList.toggle('in-cart', cart.some((item) => item.name === name || item.name.startsWith(name)));
    });
}

document.addEventListener('click', (event) => {
    const pill = event.target.closest('.combo-pill');
    if (pill) {
        const card = pill.closest('.product-card');
        if (card) {
            card.querySelectorAll('.combo-pill').forEach((p) => p.classList.remove('active'));
            pill.classList.add('active');
            const price = Number(pill.dataset.price);
            const qty = Number(pill.dataset.qty);
            card.dataset.price = price;
            card.dataset.selectedQty = qty;
            const priceNew = card.querySelector('.price-new');
            if (priceNew) priceNew.textContent = formatPrice(price);
        }
        return;
    }

    const addButton = event.target.closest('.add-to-cart-btn, .add-bundle-btn');
    if (addButton) {
        const card = addButton.closest('[data-name]');
        if (card) {
            const baseName = card.dataset.name;
            const price = Number(card.dataset.price);
            const qty = Number(card.dataset.selectedQty || 1);
            const itemName = qty > 1 ? `${baseName} (Pack x${qty})` : baseName;
            addToCart(itemName, price, 1);
        }
        document.getElementById('checkout').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }

    const removeButton = event.target.closest('[data-remove]');
    if (removeButton) {
        const index = cart.findIndex((item) => item.name === removeButton.dataset.remove);
        if (index > -1) cart.splice(index, 1);
        renderCart();
    }
});

document.querySelectorAll('.quiz-option').forEach((option) => {
    option.addEventListener('click', () => {
        const recommendation = option.dataset.recommend;
        const result = document.getElementById('quiz-result');
        result.innerHTML = `Tu match: <strong>${recommendation}</strong> <a href="#productos">Ver recomendación →</a>`;
        const card = productCards.find((item) => item.dataset.name === recommendation);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.animate(
                [{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }],
                { duration: 700, easing: 'ease-out' }
            );
        }
    });
});

document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        item.classList.toggle('active');
        question.querySelector('.icon').textContent = item.classList.contains('active') ? '−' : '+';
    });
});

document.querySelectorAll('.payment-method').forEach((method) => {
    method.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach((item) => item.classList.remove('active'));
        method.classList.add('active');
    });
});

document.getElementById('checkout-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!cart.length) {
        document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    const button = document.getElementById('checkout-btn');
    button.textContent = '✅ Pedido recibido — te contactaremos pronto';
    button.disabled = true;
});

const header = document.getElementById('header');
const heroCollage = document.querySelector('.hero-collage');
let ticking = false;
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const distance = Math.min(window.scrollY * 0.08, 36);
            if (heroCollage) heroCollage.style.setProperty('--scroll-drift', `${distance}px`);
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number(element.dataset.counter);
        const suffix = element.dataset.suffix || '';
        const start = performance.now();
        const duration = 1200;
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = `${Math.round(target * eased).toLocaleString('es-CO')}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(element);
    });
}, { threshold: 0.7 });
counters.forEach((counter) => counterObserver.observe(counter));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function startVisibleMotion() {
    document.body.dataset.motionReady = 'true';
}

startVisibleMotion();
renderCart();
