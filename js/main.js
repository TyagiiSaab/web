// Shared interactivity: drawer, dropdowns, reveals, filters, FAQs, forms.
(function(){
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const yearEl=$("#year"); if(yearEl) yearEl.textContent=new Date().getFullYear();

  // Fill editable config placeholders
  try{
    if(typeof SITE_CONFIG!=="undefined"){
      $$("[data-config]").forEach(el=>{
        const k=el.getAttribute("data-config");
        if(SITE_CONFIG[k]) el.textContent=SITE_CONFIG[k];
      });
    }
  }catch(e){}

  // Mobile drawer
  const btn=$("#navToggle"), drawer=$("#drawer");
  if(btn&&drawer){
    const close=()=>{drawer.classList.remove("open");btn.setAttribute("aria-expanded","false");document.body.style.overflow="";};
    const open=()=>{drawer.classList.add("open");btn.setAttribute("aria-expanded","true");document.body.style.overflow="hidden";};
    btn.addEventListener("click",()=>drawer.classList.contains("open")?close():open());
    drawer.addEventListener("click",e=>{if(e.target.hasAttribute("data-close"))close();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
  }

  // Active nav link
  const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  $$("nav.main a.nav-link, .drawer-panel a.dlink").forEach(a=>{
    const href=(a.getAttribute("href")||"").toLowerCase();
    if(href===page||(page==="index.html"&&href==="index.html")) a.classList.add("active");
  });

  // Scroll reveal
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target);}}),{threshold:.12});
  $$(".reveal").forEach(el=>io.observe(el));

  // FAQ accordion
  $$(".faq").forEach(faq=>{
    faq.addEventListener("click",e=>{
      const b=e.target.closest("button.q"); if(!b) return;
      const item=b.parentElement, wasOpen=item.classList.contains("open");
      $$(".item",faq).forEach(i=>{i.classList.remove("open");$("button.q",i).setAttribute("aria-expanded","false");});
      if(!wasOpen){item.classList.add("open");b.setAttribute("aria-expanded","true");}
    });
  });

  // News/event filtering + search (events.html)
  const grid=$("#filterGrid");
  if(grid){
    const chips=$$("#filterChips .chip"), search=$("#newsSearch"), empty=$("#filterEmpty");
    const cards=$$("[data-cat]",grid);
    const count=$("#resultCount");
    function apply(){
      const active=( $(".chip.active")||{} ).dataset?.cat||"all";
      const q=(search?.value||"").toLowerCase().trim();
      let n=0;
      cards.forEach(c=>{
        const okCat=active==="all"||c.dataset.cat===active;
        const okQ=!q||c.textContent.toLowerCase().includes(q);
        const show=okCat&&okQ; c.style.display=show?"":"none"; if(show)n++;
      });
      if(empty) empty.style.display=n?"none":"block";
      if(count) count.textContent=n+" result"+(n===1?"":"s");
    }
    chips.forEach(ch=>ch.addEventListener("click",()=>{chips.forEach(c=>c.classList.remove("active"));ch.classList.add("active");apply();}));
    search?.addEventListener("input",apply); apply();
    $("#loadMore")?.addEventListener("click",e=>{e.preventDefault(); $$(".extra-item").forEach(el=>el.style.display=""); e.target.style.display="none"; if(count)count.textContent=$$("[data-cat]",grid).filter(c=>c.style.display!=="none").length+" results";});
  }

  // Achievement filter (achievements.html)
  const ag=$("#achGrid");
  if(ag){
    const chips=$$("#achChips .chip");
    chips.forEach(ch=>ch.addEventListener("click",()=>{
      chips.forEach(c=>c.classList.remove("active"));ch.classList.add("active");
      const v=ch.dataset.cat;
      $$("[data-cat]",ag).forEach(c=>c.style.display=(v==="all"||c.dataset.cat===v)?"":"none");
    }));
  }

  // Generic validated form handler (contact + admission)
  $$("form[data-validate]").forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault();
      let ok=true;
      $$("[required]",form).forEach(inp=>{
        const field=inp.closest(".field")||inp.parentElement;
        let valid=true;
        const v=inp.value.trim();
        if(inp.type==="checkbox"){valid=inp.checked;}
        else if(!v){valid=false;}
        else if(inp.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){valid=false;}
        else if(inp.name==="phone"&&!/^[+\d][\d\s-]{7,14}$/.test(v)){valid=false;}
        field?.classList.toggle("invalid",!valid);
        if(!valid)ok=false;
      });
      if(!ok){$(".form-error",form)?.removeAttribute("hidden");form.querySelector(".field.invalid input,.field.invalid select,.field.invalid textarea")?.focus();return;}
      // Demo success state — wire to email/CRM/backend before going live.
      form.style.display="none";
      const s=form.parentElement.querySelector(".success"); if(s)s.classList.add("show");
    });
    form.addEventListener("input",e=>{e.target.closest(".field")?.classList.remove("invalid");});
  });
})();
