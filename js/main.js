      
      const items = [
        { t: "PYTHON", up: true },
        { t: "SQL", up: true },
        { t: "STREAMLIT", up: true },
        { t: "POSTGRESQL", up: true },
        { t: "POWER BI", up: true },
        { t: "ETL", up: true },
        { t: "MODELAGEM", up: true },
        { t: "PLOTLY", up: true },
        { t: "GIT", up: true },
        { t: "EXCEL", up: true },
      ]
      const track = document.getElementById("ticker")
      const html = items
        .map((i) => `<span class="tick ${i.up ? "up" : "down"}">${i.t}</span>`)
        .join("")
      track.innerHTML = html + html + html + html 

      
      const nameEl = document.getElementById("type-name");
      const nameText = "Olá, meu nome é Abrahão Levy.";
      let nIdx = 0;
      function typeName() {
        if (nIdx < nameText.length) {
          nameEl.textContent += nameText.charAt(nIdx);
          nIdx++;
          setTimeout(typeName, 65); 
        } else {
          
          const cursor = document.querySelector(".cursor-blink");
          if(cursor) setTimeout(() => { cursor.style.opacity = 0; cursor.style.animation = 'none'; }, 4000);
        }
      }
      setTimeout(typeName, 400); 
      
      
      const phrases = [
        "Transformar dados em decisão, um dashboard de cada vez.",
        "Intermediário em dados, avançado em curiosidade.",
        "SELECT foco, dedicacao FROM carreira;",
      ]
      const el = document.getElementById("typed-line")
      let pIndex = 0,
        cIndex = 0,
        deleting = false

      function typeLoop() {
        const phrase = phrases[pIndex]
        if (!deleting) {
          cIndex++
          el.textContent = phrase.slice(0, cIndex)
          if (cIndex === phrase.length) {
            deleting = true
            setTimeout(typeLoop, 1600)
            return
          }
        } else {
          cIndex--
          el.textContent = phrase.slice(0, cIndex)
          if (cIndex === 0) {
            deleting = false
            pIndex = (pIndex + 1) % phrases.length
          }
        }
        setTimeout(typeLoop, deleting ? 28 : 42)
      }
      typeLoop()

      
      const reveals = document.querySelectorAll(".reveal")
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("in")
          })
        },
        { threshold: 0.15 },
      )
      reveals.forEach((r) => io.observe(r))

      
      const burger = document.getElementById("burger-btn")
      const navLinks = document.querySelector(".nav-links")
      if(burger) {
        burger.addEventListener("click", () => {
          const isActive = navLinks.classList.toggle("active")
          burger.textContent = isActive ? "[-]" : "[+]"
          burger.setAttribute("aria-expanded", isActive)
        })
        
        
        navLinks.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", () => {
            navLinks.classList.remove("active")
            burger.textContent = "[+]"
            burger.setAttribute("aria-expanded", "false")
          })
        })
      }
