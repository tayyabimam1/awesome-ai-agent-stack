(function () {
  var index = null, loaded = false;
  function loadIndex(cb) {
    if (loaded) return cb(index);
    fetch('data.json').then(function (r) { return r.json(); }).then(function (d) {
      index = d; loaded = true; cb(index);
    }).catch(function () { cb([]); });
  }
  function fmtStars(n) {
    if (!n) return '';
    return n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : '' + n;
  }
  function wire(input, box) {
    var current = -1;
    function render(q) {
      if (!q || q.length < 2) { box.classList.remove('open'); box.innerHTML = ''; return; }
      loadIndex(function (idx) {
        q = q.toLowerCase();
        var hits = [];
        for (var i = 0; i < idx.length && hits.length < 12; i++) {
          var e = idx[i];
          if ((e.n + ' ' + e.d).toLowerCase().indexOf(q) !== -1) hits.push(e);
        }
        if (!hits.length) {
          box.innerHTML = '<div class="result"><div class="r-meta">No matches — try another term</div></div>';
        } else {
          box.innerHTML = hits.map(function (e) {
            var stars = e.s ? ' ★ ' + fmtStars(e.s) : '';
            return '<a class="result" href="' + e.sec + '.html#e-' + e.i + '">' +
              '<div class="r-name">' + e.n + '<span class="r-meta">' + stars + ' · ' + e.st + '</span></div>' +
              '<div class="r-desc">' + e.d + '</div></a>';
          }).join('');
        }
        box.classList.add('open');
      });
    }
    var t;
    input.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () { render(input.value.trim()); }, 120);
    });
    input.addEventListener('focus', function () { render(input.value.trim()); });
    document.addEventListener('click', function (ev) {
      if (!box.contains(ev.target) && ev.target !== input) box.classList.remove('open');
    });
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') box.classList.remove('open');
    });
  }
  document.querySelectorAll('[data-search]').forEach(function (wrap) {
    wire(wrap.querySelector('input'), wrap.querySelector('.results'));
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === '/' && document.activeElement.tagName !== 'INPUT') {
      ev.preventDefault();
      var first = document.querySelector('[data-search] input');
      if (first) first.focus();
    }
  });
})();
