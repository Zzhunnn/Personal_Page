$(document).ready(function() {
    // 1. 平滑錨點 (jQuery 寫法)
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 600);
        }
    });

    // 2. Ajax 請求載入個人資料
    $.ajax({
        url: 'data.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // --- 渲染技能標籤 ---
            data.skills.forEach(function(skill) {
                const tagHtml = `<span class="tag tag--${skill.color}" role="listitem" tabindex="0" data-weight="${skill.weight}">${skill.name}</span>`;
                $('#skills-container').append(tagHtml);
            });
            initTagCloud(); // 渲染完畢後初始化標籤雲動畫

            // --- 渲染經歷時間軸 ---
            data.timeline.forEach(function(event) {
                const eventHtml = `
                    <div class="event" role="listitem" style="position:relative;margin-bottom:1.125rem;padding:0.875rem 0.75rem 0.875rem 3.5rem;line-height:1.6;">
                        <span class="timeline-dot" aria-hidden="true"></span>
                        <div style="position:absolute;left:-4.5rem;top:0.75rem;color:var(--muted);font-size:0.9rem">${event.year}</div>
                        <strong style="font-size:1.125rem;">${event.period} — ${event.role}</strong>
                        <div>${event.desc}</div>
                    </div>`;
                $('#timeline-container').append(eventHtml);
            });

            // --- 渲染專案作品集 ---
            data.projects.forEach(function(proj) {
                let linkHtml = '';
                if(proj.link !== "") {
                    linkHtml = `
                    <div style="margin-top:10px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                        <a class="clickable" href="${proj.link}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--accent);font-weight:600;font-size:0.95rem">
                            🔗 ${proj.linkName}
                        </a>
                    </div>`;
                }

                const projectHtml = `
                    <div class="timeline projects-list" role="list" style="position:relative;padding-left:1rem;border-left:none;margin-top:0.5rem;">
                        <div class="event" role="listitem" style="position:relative;margin-bottom:1.125rem;padding:0.875rem 0.75rem 0.875rem 2.25rem;line-height:1.6;">
                            <div class="project-row" style="display:flex;gap:12px;align-items:flex-start;">
                                <img class="media-img lightbox-trigger" src="${proj.img}" loading="lazy" data-full="${proj.img}" data-lightbox-size="small" style="width:240px;height:135px;object-fit:cover;border-radius:6px;cursor:pointer" />
                                <div class="project-content">
                                    <strong style="font-size:1.125rem;"><span class="project-title-main">${proj.titleMain}</span><span class="project-title-sub">${proj.titleSub}</span></strong>
                                    <div>${proj.desc}</div>
                                    <div style="margin-top:6px;color:var(--muted)">角色分工：${proj.role}</div>
                                    ${linkHtml}
                                </div>
                            </div>
                        </div>
                    </div>`;
                $('#projects-container').append(projectHtml);
            });

            initLightbox(); // 渲染完畢後初始化 Lightbox 功能
            initClickAnimations(); // 重新綁定按鈕動畫
        },
        error: function(xhr, status, error) {
            console.error("Ajax 載入失敗: ", error);
            $('#projects-container').html('<p style="color:red;">資料載入失敗，請確認是否使用 Live Server 啟動網頁。</p>');
        }
    });

    // 3. 標籤雲動畫邏輯 (轉為 jQuery)
    function initTagCloud() {
        const $tags = $('.tags .tag');
        if (!$tags.length) return;
        
        let weights = [];
        $tags.each(function() { weights.push(parseInt($(this).data('weight') || 50, 10)); });
        const minW = Math.min(...weights);
        const maxW = Math.max(...weights);
        
        $tags.each(function() {
            const w = parseInt($(this).data('weight') || 50, 10);
            const norm = (w - minW) / (maxW - minW || 1);
            const size = (0.9 + norm * (1.4 - 0.9)).toFixed(3);
            $(this).css({
                'font-size': size + 'rem',
                'opacity': (0.85 + (norm * 0.15)).toFixed(2),
                'font-weight': Math.round(400 + norm * 200)
            });
            
            $(this).on('mouseenter', function() {
                $(this).css({'transform': 'translateY(-3px)', 'box-shadow': '0 8px 18px rgba(0,0,0,0.08)'});
            }).on('mouseleave', function() {
                $(this).css({'transform': '', 'box-shadow': ''});
            });
        });
    }

    // 4. Clickable 按鈕動畫 (jQuery)
    function initClickAnimations() {
        $('.clickable').on('mousedown touchstart keydown', function(e) {
            if(e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
            $(this).addClass('pressed');
        }).on('mouseup mouseleave touchend keyup', function() {
            $(this).removeClass('pressed');
        });
    }
    initClickAnimations();

    // 5. Lightbox 燈箱功能 (jQuery)
    function initLightbox() {
        const overlayHTML = `
            <div id="lightbox-overlay" class="lightbox-overlay" role="dialog">
                <figure class="lightbox-figure">
                    <img id="lightbox-img" class="lightbox-img" src="" alt="" />
                    <button id="lightbox-close" class="lightbox-close">關閉</button>
                </figure>
            </div>`;
        $('body').append(overlayHTML);

        $(document).on('click', '.lightbox-trigger', function(e) {
            e.preventDefault();
            const src = $(this).data('full') || $(this).attr('src');
            $('#lightbox-img').attr('src', src);
            $('#lightbox-overlay').addClass('open').attr('aria-hidden', 'false');
            if($(this).data('lightbox-size') === 'small') {
                $('#lightbox-overlay').addClass('small');
            }
        });

        $('#lightbox-overlay, #lightbox-close').on('click', function(e) {
            if (e.target === this || e.target.id === 'lightbox-close') {
                $('#lightbox-overlay').removeClass('open small').attr('aria-hidden', 'true');
                $('#lightbox-img').attr('src', '');
            }
        });
    }
});