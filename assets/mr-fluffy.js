(function () {
  var root = document.querySelector('[data-mr-fluffy]');
  if (!root) return;

  var countdown = document.querySelector('[data-mf-countdown]');
  var end = Date.now() + (8 * 60 * 60 * 1000) + (24 * 60 * 1000);

  function updateCountdown() {
    if (!countdown) return;
    var diff = Math.max(0, end - Date.now());
    var hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
    var minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    var seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    countdown.textContent = hours + ':' + minutes + ':' + seconds;
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  document.querySelectorAll('[data-mf-mode]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.body.classList.toggle('mf-dark');
    });
  });

  var menuButton = document.querySelector('[data-mf-menu-button]');
  var menu = document.querySelector('[data-mf-menu]');
  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var products = Array.prototype.slice.call(document.querySelectorAll('[data-mf-product]'));
  document.querySelectorAll('[data-mf-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-mf-filter');
      document.querySelectorAll('[data-mf-filter]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      products.forEach(function (product) {
        var pet = product.getAttribute('data-pet');
        var age = product.getAttribute('data-age');
        var show = value === 'all' || pet === value || age === value;
        product.classList.toggle('is-hidden', !show);
      });
    });
  });

  document.querySelectorAll('[data-mf-wishlist]').forEach(function (button) {
    button.addEventListener('click', function () {
      button.classList.toggle('is-loved');
      button.textContent = button.classList.contains('is-loved') ? 'Loved' : 'Love';
    });
  });

  document.querySelectorAll('[data-mf-add]').forEach(function (button) {
    button.addEventListener('click', function () {
      var original = button.textContent;
      button.textContent = 'Added to Cart';
      window.setTimeout(function () {
        button.textContent = original;
      }, 1200);
    });
  });

  var search = document.querySelector('[data-mf-search]');
  if (search) {
    search.addEventListener('input', function () {
      var value = search.value.toLowerCase();
      products.forEach(function (product) {
        var text = product.textContent.toLowerCase();
        product.classList.toggle('is-hidden', value && text.indexOf(value) === -1);
      });
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.mf-reveal').forEach(function (item) {
    observer.observe(item);
  });

  var chat = document.querySelector('[data-mf-chat]');
  if (chat) {
    chat.addEventListener('click', function () {
      var existing = document.querySelector('.mf-chat-panel');
      if (existing) {
        existing.remove();
        return;
      }
      var panel = document.createElement('div');
      panel.className = 'mf-chat-panel';
      panel.innerHTML = '<strong>Fluffy Finder</strong><p>Tell us your pet age, size, and favorite activity. We will suggest food, toys, grooming picks, or cozy beds.</p>';
      document.body.appendChild(panel);
    });
  }
}());
