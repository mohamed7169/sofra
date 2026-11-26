(function () {
  "use strict";

  /* ---------- بيانات المنيو ---------- */
  const MENU = {
    "الأطباق الرئيسية": [
      ["كشري سُفرة", "أرز وعدس ومكرونة وحمص بصلصة طماطم وشطة ودقة.", 55],
      ["ملوخية بالفراخ", "ملوخية خضرا مع فراخ بلدي وأرز بالشعرية.", 120],
      ["طاجن بامية باللحمة", "بامية بصلصة طماطم ولحمة ضاني على نار هادية.", 160],
      ["ممبار محشي", "ممبار بالأرز والتتبيلة، مع سلطة وعيش.", 95],
    ],
    "المشويات": [
      ["كباب مشوي", "نص كيلو كباب على الفحم مع أرز وطحينة.", 280],
      ["ريش ضاني", "ريش متتبلة تتشوى على الفحم، مع خضار مشوي.", 340],
      ["شيش طاووق", "صدور فراخ متتبلة بالثوم والليمون.", 190],
      ["مشكل مشويات", "كباب وكفتة وطاووق، يكفي شخصين.", 420],
    ],
    "المقبلات": [
      ["بابا غنوج", "باذنجان مشوي بالطحينة وزيت الزيتون.", 45],
      ["سلطة بلدي", "طماطم وخيار وجرجير بعصير الليمون.", 35],
      ["فطير مشلتت", "فطير بالسمن البلدي، يتقدم سخن.", 60],
      ["حواوشي", "عيش بلدي محشي لحمة مفرومة ومشوي.", 75],
    ],
    "الحلويات": [
      ["أم علي", "عجينة ومكسرات ولبن في طاجن فخار.", 65],
      ["كنافة بالقشطة", "كنافة مقرمشة بقشطة طازة وقطر خفيف.", 70],
      ["أرز باللبن", "أرز باللبن بالفانيليا وقرفة.", 40],
      ["بسبوسة", "بسبوسة بجوز الهند، مع شاي أو قهوة.", 45],
    ],
  };

  const tabsEl = document.getElementById("tabs");
  const listEl = document.getElementById("menuList");
  const cats = Object.keys(MENU);

  function renderMenu(cat) {
    listEl.innerHTML = "";
    MENU[cat].forEach(function (item) {
      const li = document.createElement("li");
      li.innerHTML =
        '<div class="menu__top"><span class="menu__name"></span>' +
        '<span class="menu__dots" aria-hidden="true"></span>' +
        '<span class="menu__price"></span></div><p class="menu__desc"></p>';
      li.querySelector(".menu__name").textContent = item[0];
      li.querySelector(".menu__desc").textContent = item[1];
      li.querySelector(".menu__price").textContent = item[2] + " ج.م";
      listEl.appendChild(li);
    });
  }

  function selectTab(cat) {
    tabsEl.querySelectorAll(".tab").forEach(function (b) {
      b.setAttribute("aria-selected", String(b.dataset.cat === cat));
    });
    renderMenu(cat);
  }

  cats.forEach(function (cat) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tab";
    b.dataset.cat = cat;
    b.setAttribute("role", "tab");
    b.textContent = cat;
    b.addEventListener("click", function () { selectTab(cat); });
    tabsEl.appendChild(b);
  });
  selectTab(cats[0]);

  /* ---------- قائمة الموبايل ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  function closeNav() {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });

  /* ---------- نموذج الحجز ---------- */
  const form = document.getElementById("bookForm");
  const ok = document.getElementById("ok");
  const dateInput = form.elements.date;
  dateInput.min = new Date().toISOString().split("T")[0];

  function setError(name, msg) {
    const field = form.elements[name];
    form.querySelector('.err[data-for="' + name + '"]').textContent = msg;
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }

  function validate() {
    const f = form.elements;
    const phone = f.phone.value.replace(/[\s-]/g, "");
    let valid = true;
    valid = setError("name", f.name.value.trim().length >= 3 ? "" : "اكتب اسمك (3 حروف على الأقل).") && valid;
    valid = setError("phone", /^(\+?20|0)?1[0125]\d{8}$/.test(phone) ? "" : "اكتب رقم موبايل مصري صحيح.") && valid;
    valid = setError("date", f.date.value ? "" : "اختار التاريخ.") && valid;
    valid = setError("time", f.time.value ? "" : "اختار الوقت.") && valid;
    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ok.hidden = true;
    if (!validate()) {
      const bad = form.querySelector('[aria-invalid="true"]');
      if (bad) bad.focus();
      return;
    }
    const name = form.elements.name.value.trim();
    ok.textContent = "شكرًا يا " + name + "! استلمنا طلب الحجز وهنكلمك للتأكيد.";
    ok.hidden = false;
    form.reset();
  });

  /* ---------- السنة في الفوتر ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
