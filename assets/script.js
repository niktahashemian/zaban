
        // mobile nav toggle
        const hamb = document.getElementById('hamb');
        const nav = document.getElementById('mainNav');
        hamb.addEventListener('click', () => {
            if (nav.style.display === 'flex') nav.style.display = 'none';
            else nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.right = '16px';
            nav.style.top = '78px';
            nav.style.background = 'white';
            nav.style.padding = '12px';
            nav.style.borderRadius = '10px';
            nav.style.boxShadow = '0 8px 30px rgba(10,20,50,0.08)';
        });
        (function () {
            const prevBtn = document.getElementById('prev');
            const nextBtn = document.getElementById('next');
            const dotsEl = document.getElementById('dots');
            let current = 0;
            let autoplay = true;
            let interval = 4000; // ms
            let timer = null;
            let isDragging = false, startX = 0, currentTranslate = 0, prevTranslate = 0, animationID;

            // build dots






            prevBtn.addEventListener('click', () => goTo(current - 1));
            nextBtn.addEventListener('click', () => goTo(current + 1));

            // autoplay
            function startTimer() { if (!autoplay) return; timer = setInterval(() => goTo(current + 1), interval) }
            function stopTimer() { clearInterval(timer); timer = null }
            function resetTimer() { stopTimer(); startTimer(); }

            // keyboard
            window.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.key === 'ArrowLeft' ? goTo(current - 1) : goTo(current + 1);
                }
            });


            function touchStart(e) { isDragging = true; startX = e.touches[0].clientX }
            function touchMove(e) { if (!isDragging) return; const dx = startX - e.touches[0].clientX; if (Math.abs(dx) > 50) { if (dx > 0) goTo(current + 1); else goTo(current - 1); isDragging = false; } }
            function touchEnd() { isDragging = false }

            // basic mouse drag for desktop
            function mouseStart(e) { isDragging = true; startX = e.clientX }
            function mouseMove(e) { if (!isDragging) return; const dx = startX - e.clientX; if (Math.abs(dx) > 80) { if (dx > 0) goTo(current + 1); else goTo(current - 1); isDragging = false; } }
            function mouseEnd() { isDragging = false }

            // init
            update(); startTimer();

        })();

        // simple contact submit
        const sendBtn = document.getElementById('sendPhone');
        const modalBack = document.getElementById('modalBack');
        const closeModal = document.getElementById('closeModal');
        sendBtn.addEventListener('click', () => {
            const phone = document.getElementById('phone').value.trim();
            if (!phone) { alert('لطفاً شماره تلفن را وارد کنید'); return }
            // می‌توانید این‌جا درخواست fetch به سرور ارسال کنید
            modalBack.style.display = 'grid';
        });
        closeModal.addEventListener('click', () => modalBack.style.display = 'none');

        // gallery lightbox
        document.querySelectorAll('.gallery img').forEach(img => {
            img.addEventListener('click', () => {
                const full = img.dataset.full || img.src;
                const back = document.createElement('div');
                back.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:grid;place-items:center;z-index:999';
                const i = document.createElement('img');
                i.src = full; i.style.maxWidth = '94%'; i.style.maxHeight = '94%'; i.style.borderRadius = '8px';
                back.appendChild(i);
                back.addEventListener('click', () => document.body.removeChild(back));
                document.body.appendChild(back);
            })
        });
