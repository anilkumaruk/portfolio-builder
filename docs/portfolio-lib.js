'use strict';
globalThis.__TEMPLATES__ = {"default":{"css":"/* ---------- tokens ---------- */\n:root{\n  --ground:#EEF1F8;\n  --sheet:#FFFFFF;\n  --tile:#F7F9FD;\n  --tile-2:#EFF3FB;\n  --text:#101728;\n  --text-2:#4B5872;\n  --text-3:#7C88A3;\n  --line:#E3E8F2;\n  --line-strong:#D3DBEA;\n  --accent:#4560FF;\n  --accent-2:#8B5CF6;\n  --accent-soft:rgba(69,96,255,.10);\n  --good:#16A34A;\n  --shadow:0 1px 2px rgba(16,23,40,.05), 0 12px 34px -18px rgba(16,23,40,.30);\n  --shadow-lift:0 2px 6px rgba(16,23,40,.06), 0 26px 50px -24px rgba(16,23,40,.38);\n\n  /* the hero keeps its night sky in every theme — it is the signature */\n  --night-1:#070D22;\n  --night-2:#0B1435;\n  --night-3:#141F4A;\n  --night-text:#F2F5FF;\n  --night-text-2:#97A5CC;\n  --night-line:rgba(255,255,255,.10);\n  --night-fill:rgba(255,255,255,.055);\n\n  --radius:16px;\n  --radius-lg:24px;\n  --rail:236px;\n  --maxw:1180px;\n}\n@media (prefers-color-scheme: dark){\n  :root:not([data-theme=\"light\"]){\n    --ground:#05091A;\n    --sheet:#0E1530;\n    --tile:#141C3A;\n    --tile-2:#18204A;\n    --text:#E9EEFB;\n    --text-2:#9AA6C6;\n    --text-3:#7C88A8;\n    --line:rgba(255,255,255,.09);\n    --line-strong:rgba(255,255,255,.16);\n    --accent:#7E93FF;\n    --accent-2:#A78BFA;\n    --accent-soft:rgba(126,147,255,.14);\n    --good:#34D399;\n    --shadow:0 1px 2px rgba(0,0,0,.4), 0 14px 34px -20px rgba(0,0,0,.8);\n    --shadow-lift:0 2px 8px rgba(0,0,0,.45), 0 28px 54px -26px rgba(0,0,0,.9);\n  }\n}\n:root[data-theme=\"dark\"]{\n  --ground:#05091A;\n  --sheet:#0E1530;\n  --tile:#141C3A;\n  --tile-2:#18204A;\n  --text:#E9EEFB;\n  --text-2:#9AA6C6;\n  --text-3:#7C88A8;\n  --line:rgba(255,255,255,.09);\n  --line-strong:rgba(255,255,255,.16);\n  --accent:#7E93FF;\n  --accent-2:#A78BFA;\n  --accent-soft:rgba(126,147,255,.14);\n  --good:#34D399;\n  --shadow:0 1px 2px rgba(0,0,0,.4), 0 14px 34px -20px rgba(0,0,0,.8);\n  --shadow-lift:0 2px 8px rgba(0,0,0,.45), 0 28px 54px -26px rgba(0,0,0,.9);\n}\n\n/* ---------- base ---------- */\n*{box-sizing:border-box}\nhtml{-webkit-text-size-adjust:100%;scroll-behavior:smooth}\n@media (prefers-reduced-motion: reduce){ html{scroll-behavior:auto} *{animation-duration:.001ms!important;transition-duration:.001ms!important} }\nbody{\n  margin:0;\n  background:var(--ground);\n  color:var(--text);\n  font-family:\"Manrope\",ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",sans-serif;\n  font-size:15px;line-height:1.65;\n  -webkit-font-smoothing:antialiased;\n}\nimg{max-width:100%;display:block}\na{color:inherit;text-decoration:none}\nbutton{font:inherit;color:inherit;background:none;border:0;cursor:pointer}\n:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}\nh1,h2,h3,h4{font-family:\"Outfit\",ui-sans-serif,system-ui,sans-serif;margin:0;text-wrap:balance;letter-spacing:-.02em;line-height:1.14}\np{margin:0}\nul{margin:0;padding:0;list-style:none}\n.mono{font-family:\"JetBrains Mono\",ui-monospace,SFMono-Regular,Menlo,monospace}\n.eyebrow{\n  font-family:\"JetBrains Mono\",ui-monospace,monospace;\n  font-size:11px;letter-spacing:.16em;text-transform:uppercase;\n  color:var(--accent);display:flex;align-items:center;gap:8px;\n}\n.eyebrow::before{content:\"\";width:14px;height:2px;border-radius:2px;background:currentColor;opacity:.7}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n\n/* ---------- rail ---------- */\n.rail{\n  position:fixed;left:0;top:0;bottom:0;width:var(--rail);z-index:40;\n  padding:calc(26px + env(safe-area-inset-top,0px)) 18px calc(20px + env(safe-area-inset-bottom,0px));\n  display:flex;flex-direction:column;gap:26px;\n  background:linear-gradient(180deg,var(--night-1),var(--night-2));\n  border-right:1px solid var(--night-line);\n}\n.brand{font-family:\"Outfit\";font-weight:800;font-size:22px;letter-spacing:-.03em;color:var(--night-text);padding-left:10px}\n.brand span{color:var(--accent-2)}\n.nav{display:flex;flex-direction:column;gap:3px}\n.nav a{\n  display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;\n  color:var(--night-text-2);font-size:14px;font-weight:600;\n  transition:background .18s ease,color .18s ease,transform .18s ease;\n}\n.nav a svg{width:17px;height:17px;flex:none;opacity:.85}\n.nav a:hover{color:var(--night-text);background:var(--night-fill)}\n.nav a[aria-current=\"true\"]{\n  color:#fff;background:linear-gradient(135deg,var(--accent),#5C4BE0);\n  box-shadow:0 10px 24px -14px rgba(69,96,255,.95);\n}\n.nav a[aria-current=\"true\"] svg{opacity:1}\n.rail-foot{margin-top:auto;padding-left:12px;font-size:11.5px;color:var(--night-text-2);line-height:1.5}\n.rail-foot b{display:block;color:var(--night-text);font-weight:600;font-size:12.5px}\n\n/* ---------- shell ---------- */\n.shell{margin-left:var(--rail)}\n.wrap{max-width:var(--maxw);margin:0 auto;padding-inline:clamp(18px,3vw,40px)}\n\n/* ---------- top actions ---------- */\n.topbar{\n  position:fixed;top:calc(22px + env(safe-area-inset-top,0px));right:clamp(18px,3vw,40px);\n  display:flex;align-items:center;gap:12px;z-index:20;\n}\n.icon-btn{\n  width:38px;height:38px;border-radius:11px;display:grid;place-items:center;\n  color:var(--night-text-2);border:1px solid transparent;transition:.18s ease;\n}\n.icon-btn:hover{color:var(--night-text);background:var(--night-fill);border-color:var(--night-line)}\n.icon-btn svg{width:18px;height:18px}\n.cv-btn{\n  display:inline-flex;align-items:center;gap:9px;padding:10px 17px;border-radius:12px;\n  border:1px solid var(--night-line);background:var(--night-fill);color:var(--night-text);\n  font-size:13.5px;font-weight:600;backdrop-filter:blur(8px);transition:.18s ease;\n}\n.cv-btn:hover{background:rgba(255,255,255,.12);transform:translateY(-1px)}\n.cv-btn svg{width:16px;height:16px}\n\n/* ---------- hero ---------- */\n.hero{\n  position:relative;overflow:hidden;\n  background:\n    radial-gradient(900px 520px at 78% -6%, rgba(139,92,246,.30), transparent 62%),\n    radial-gradient(760px 480px at 8% 108%, rgba(69,96,255,.26), transparent 64%),\n    linear-gradient(160deg,var(--night-1) 0%,var(--night-2) 52%,#0A1230 100%);\n  color:var(--night-text);\n  padding-block:clamp(78px,10vw,112px) clamp(84px,9vw,110px);\n}\n.hero::after{ /* faint circuit grid, drawn not decorated: the CS thread */\n  content:\"\";position:absolute;inset:0;pointer-events:none;opacity:.5;\n  background-image:linear-gradient(var(--night-line) 1px,transparent 1px),linear-gradient(90deg,var(--night-line) 1px,transparent 1px);\n  background-size:62px 62px;\n  mask-image:radial-gradient(800px 460px at 30% 30%,#000,transparent 75%);\n  -webkit-mask-image:radial-gradient(800px 460px at 30% 30%,#000,transparent 75%);\n}\n.hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:clamp(28px,5vw,64px);align-items:center}\n.hello{font-family:\"JetBrains Mono\",monospace;font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--night-text-2)}\n.hero h1{font-size:clamp(40px,5.6vw,66px);font-weight:800;margin:14px 0 6px;letter-spacing:-.035em}\n.hero h1 .dot{color:var(--accent-2)}\n.role{font-family:\"Outfit\";font-size:clamp(19px,2.3vw,26px);font-weight:600;\n  background:linear-gradient(92deg,#7E93FF,#C4B5FD);-webkit-background-clip:text;background-clip:text;color:transparent}\n.hero p.lede{margin-top:16px;max-width:52ch;color:var(--night-text-2);font-size:15.5px}\n.cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}\n.btn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border-radius:13px;font-size:14.5px;font-weight:700;font-family:\"Outfit\";transition:.2s ease}\n.btn svg{width:16px;height:16px}\n.btn-primary{background:linear-gradient(135deg,var(--accent),#7B5CF0);color:#fff;box-shadow:0 16px 34px -16px rgba(91,80,240,.95)}\n.btn-primary:hover{transform:translateY(-2px);box-shadow:0 22px 40px -16px rgba(91,80,240,1)}\n.btn-primary .arrow{transition:transform .2s ease}\n.btn-primary:hover .arrow{transform:translateX(3px)}\n.btn-ghost{border:1px solid var(--night-line);background:var(--night-fill);color:var(--night-text)}\n.btn-ghost:hover{background:rgba(255,255,255,.12);transform:translateY(-2px)}\n.socials{display:flex;gap:10px;margin-top:26px}\n.socials a{\n  width:40px;height:40px;border-radius:12px;display:grid;place-items:center;\n  border:1px solid var(--night-line);background:var(--night-fill);color:var(--night-text-2);transition:.2s ease;\n}\n.socials a:hover{color:#fff;border-color:rgba(126,147,255,.6);background:rgba(126,147,255,.18);transform:translateY(-3px)}\n.socials svg{width:17px;height:17px}\n\n.portrait-col{position:relative;display:flex;justify-content:center}\n.portrait{position:relative;width:clamp(210px,26vw,290px);aspect-ratio:1;border-radius:50%;\n  padding:6px;background:conic-gradient(from 200deg,var(--accent),#A78BFA,#38BDF8,var(--accent));\n  box-shadow:0 0 0 12px rgba(126,147,255,.08),0 40px 80px -32px rgba(69,96,255,.75);\n}\n.portrait-inner{width:100%;height:100%;border-radius:50%;overflow:hidden;background:linear-gradient(160deg,#25304F,#161E3C);display:grid;place-items:center;position:relative}\n.portrait-inner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1}\n.monogram{font-family:\"Outfit\";font-weight:800;font-size:64px;letter-spacing:-.04em;color:#8FA3FF}\n.monogram small{display:block;font-family:\"JetBrains Mono\",monospace;font-size:9.5px;font-weight:400;letter-spacing:.16em;color:var(--night-text-2);margin-top:6px}\n.script{position:absolute;top:-46px;right:6%;z-index:2;font-family:\"Caveat\",cursive;font-size:clamp(20px,2.4vw,27px);line-height:1.1;color:var(--night-text);text-align:center;opacity:.92;white-space:nowrap}\n.script svg{width:70px;height:11px;display:block;margin:2px auto 0;color:var(--accent-2)}\n.status{\n  position:absolute;bottom:4%;right:-4%;z-index:2;display:flex;align-items:center;gap:10px;\n  padding:11px 15px;border-radius:14px;background:rgba(14,21,48,.92);border:1px solid var(--night-line);\n  font-size:12.5px;font-weight:600;color:var(--night-text);line-height:1.3;backdrop-filter:blur(10px);\n  box-shadow:0 20px 40px -22px rgba(0,0,0,.9);max-width:170px;\n}\n.pulse{width:9px;height:9px;border-radius:50%;background:var(--good);flex:none;box-shadow:0 0 0 0 rgba(22,163,74,.6);animation:pulse 2.4s infinite}\n@keyframes pulse{70%{box-shadow:0 0 0 10px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)}}\n\n/* ---------- sheet ---------- */\n.sheet{\n  position:relative;z-index:2;background:var(--sheet);\n  border-radius:var(--radius-lg) var(--radius-lg) 0 0;margin-top:-30px;\n  border:1px solid var(--line);border-bottom:0;\n}\n.section{padding-block:clamp(44px,5.5vw,68px);border-bottom:1px solid var(--line)}\n.section:last-child{border-bottom:0}\n.section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:26px}\n.section-head h2{font-size:clamp(25px,3.2vw,34px);font-weight:700;margin-top:10px}\n.section-head h2 em{font-style:normal;background:linear-gradient(92deg,var(--accent),var(--accent-2));-webkit-background-clip:text;background-clip:text;color:transparent}\n.link-more{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:700;color:var(--accent);font-family:\"Outfit\"}\n.link-more svg{width:14px;height:14px;transition:transform .2s ease}\n.link-more:hover svg{transform:translateX(3px)}\n\n/* about */\n.about-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(26px,4vw,56px);align-items:start}\n.about-body{color:var(--text-2);max-width:56ch;margin-top:18px;font-size:15.2px}\n.facts{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}\n.fact{display:inline-flex;align-items:center;gap:8px;padding:7px 13px;border-radius:999px;background:var(--tile);border:1px solid var(--line);font-size:12.5px;font-weight:600;color:var(--text-2)}\n.fact svg{width:14px;height:14px;color:var(--accent)}\n.stats{display:grid;grid-template-columns:1fr 1fr;gap:16px}\n.stat{background:var(--tile);border:1px solid var(--line);border-radius:var(--radius);padding:20px 20px 18px;box-shadow:var(--shadow);transition:.2s ease}\n.stat:hover{transform:translateY(-3px);box-shadow:var(--shadow-lift)}\n.stat .ic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent);margin-bottom:16px}\n.stat .ic svg{width:19px;height:19px}\n.stat .num{font-family:\"Outfit\";font-size:30px;font-weight:700;letter-spacing:-.03em;font-variant-numeric:tabular-nums}\n.stat .lbl{font-size:12.5px;color:var(--text-3);font-weight:600;margin-top:2px}\n\n/* skills */\n.chips{display:grid;grid-template-columns:repeat(auto-fill,minmax(146px,1fr));gap:12px}\n.chip{display:flex;align-items:center;gap:11px;padding:12px 14px;border-radius:14px;background:var(--sheet);border:1px solid var(--line);box-shadow:var(--shadow);font-weight:600;font-size:14px;transition:.2s ease}\n.chip:hover{transform:translateY(-3px);border-color:var(--line-strong);box-shadow:var(--shadow-lift)}\n.mark{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-family:\"Outfit\";font-weight:700;font-size:13px;color:#fff;flex:none;letter-spacing:-.02em}\n.core{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px;align-items:center}\n.core .label{font-family:\"JetBrains Mono\",monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--text-3)}\n.tag{padding:6px 12px;border-radius:999px;font-size:12.5px;font-weight:600;background:var(--accent-soft);color:var(--accent)}\n\n/* projects */\n.projects{display:grid;grid-template-columns:1fr 1fr;gap:20px}\n.project{background:var(--sheet);border:1px solid var(--line);border-radius:var(--radius-lg);padding:22px;box-shadow:var(--shadow);display:grid;grid-template-columns:minmax(0,1fr) 168px;gap:20px;transition:.25s ease}\n.project:hover{transform:translateY(-4px);box-shadow:var(--shadow-lift);border-color:var(--line-strong)}\n.project h3{font-size:18.5px;font-weight:700;display:flex;align-items:center;gap:8px}\n.project h3 svg{width:14px;height:14px;color:var(--text-3)}\n.p-head{display:flex;gap:13px;align-items:flex-start}\n.p-ic{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;color:#fff;flex:none}\n.p-ic svg{width:20px;height:20px}\n.p-meta{font-family:\"JetBrains Mono\",monospace;font-size:11px;color:var(--text-3);margin-top:4px}\n.project p{color:var(--text-2);font-size:14.2px;margin-top:14px}\n.p-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}\n.p-tags span{padding:5px 11px;border-radius:999px;font-size:11.5px;font-weight:600;background:var(--tile-2);color:var(--text-2)}\n.p-link{display:inline-flex;align-items:center;gap:7px;margin-top:16px;font-size:13px;font-weight:700;color:var(--accent);font-family:\"Outfit\"}\n.p-link svg{width:13px;height:13px}\n.mock{border-radius:14px;overflow:hidden;border:1px solid var(--line);background:#0B1226;align-self:stretch;min-height:150px}\n.mock svg{width:100%;height:100%;display:block}\n\n/* tri column */\n.tri{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.2fr) minmax(0,1fr);gap:clamp(24px,3.5vw,44px)}\n.col-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:20px}\n.col-head h2{font-size:21px;font-weight:700}\n\n.timeline{position:relative;padding-left:24px}\n.timeline::before{content:\"\";position:absolute;left:5px;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--accent),var(--accent-2));opacity:.35;border-radius:2px}\n.tl-item{position:relative;padding-bottom:22px}\n.tl-item:last-child{padding-bottom:0}\n.tl-item::before{content:\"\";position:absolute;left:-23px;top:6px;width:12px;height:12px;border-radius:50%;background:var(--accent);border:3px solid var(--sheet);box-shadow:0 0 0 2px var(--accent-soft)}\n.tl-item h4{font-size:15px;font-weight:700}\n.tl-item .sub{font-size:13.2px;color:var(--text-2);margin-top:3px}\n.tl-item .when{font-family:\"JetBrains Mono\",monospace;font-size:11.5px;color:var(--text-3);margin-top:4px}\n\n.certs li{display:flex;gap:13px;padding:13px 0;border-bottom:1px dashed var(--line)}\n.certs li:last-child{border-bottom:0}\n.certs .mark{width:34px;height:34px;border-radius:10px;font-size:11px}\n.certs h4{font-size:14.3px;font-weight:700;line-height:1.35}\n.certs .when{font-family:\"JetBrains Mono\",monospace;font-size:11.3px;color:var(--text-3);margin-top:3px}\n\n.wins li{display:flex;gap:12px;align-items:flex-start;padding:11px 0}\n.wins .ic{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent);flex:none}\n.wins .ic svg{width:15px;height:15px}\n.wins p{font-size:13.6px;color:var(--text-2)}\n.wins b{color:var(--text);font-weight:700}\n\n/* contact */\n.contact{\n  background:\n    radial-gradient(700px 320px at 12% 0%, rgba(69,96,255,.30), transparent 65%),\n    radial-gradient(620px 300px at 88% 100%, rgba(139,92,246,.26), transparent 62%),\n    linear-gradient(140deg,var(--night-1),var(--night-2));\n  color:var(--night-text);padding-block:clamp(44px,5.5vw,64px);\n}\n.contact-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:32px;align-items:center}\n.contact h2{font-size:clamp(24px,3vw,32px);font-weight:700;margin-top:12px}\n.contact p{color:var(--night-text-2);margin-top:12px;max-width:50ch;font-size:14.8px}\n.contact-actions{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:flex-end}\n.reach{display:grid;gap:10px;width:100%;max-width:330px}\n.reach a{display:flex;align-items:center;gap:12px;padding:12px 15px;border-radius:13px;border:1px solid var(--night-line);background:var(--night-fill);transition:.2s ease}\n.reach a:hover{background:rgba(126,147,255,.16);border-color:rgba(126,147,255,.5);transform:translateX(3px)}\n.reach svg{width:16px;height:16px;color:var(--night-text-2);flex:none}\n.reach .k{font-family:\"JetBrains Mono\",monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--night-text-2)}\n.reach .v{font-size:13.6px;font-weight:600;word-break:break-all}\n\nfooter.base{background:var(--night-1);color:var(--night-text-2);border-top:1px solid var(--night-line);padding-block:20px calc(20px + env(safe-area-inset-bottom,0px))}\n.base-in{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;font-size:12.6px}\n.base-in nav{display:flex;gap:18px;flex-wrap:wrap}\n.base-in nav a:hover{color:var(--night-text)}\n\n/* reveal — from a visible resting state */\n.rv{opacity:1;transform:none;transition:opacity .5s ease,transform .5s ease}\n@media (prefers-reduced-motion: no-preference){\n  .js .rv{opacity:0;transform:translateY(14px)}\n  .js .rv.in{opacity:1;transform:none}\n}\n\n/* ---------- responsive ---------- */\n@media (max-width:1080px){\n  :root{--rail:0px}\n  .rail{\n    position:sticky;top:0;bottom:auto;width:auto;height:auto;flex-direction:row;align-items:center;gap:16px;\n    padding:calc(10px + env(safe-area-inset-top,0px)) 14px 10px;border-right:0;border-bottom:1px solid var(--night-line);\n  }\n  .nav{flex-direction:row;gap:4px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}\n  .nav::-webkit-scrollbar{display:none}\n  .nav a{padding:8px 12px;white-space:nowrap;font-size:13px}\n  .nav a svg{display:none}\n  .rail-foot{display:none}\n  .shell{margin-left:0}\n  .topbar{position:static;justify-content:flex-end;margin-left:auto}\n  .cv-btn span{display:none}\n  .cv-btn{padding:9px 11px}\n  .hero{padding-block:44px 76px}\n  .hero-grid{grid-template-columns:1fr;gap:40px}\n  .portrait-col{order:-1;justify-content:flex-start}\n  .script{right:auto;left:calc(clamp(210px,26vw,290px) - 6px)}\n  .status{right:auto;left:calc(clamp(210px,26vw,290px) - 42px)}\n  .about-grid,.projects,.tri,.contact-grid{grid-template-columns:1fr}\n  .contact-actions{justify-content:flex-start}\n}\n@media (max-width:640px){\n  .project{grid-template-columns:1fr}\n  .mock{min-height:132px;order:-1}\n  .stats{gap:12px}\n  .portrait{width:180px}\n  .script,.status{display:none}\n  .hero h1{font-size:38px}\n}\n\n@media print{\n  .rail,.topbar,.mock,.socials,.cta-row,.contact-actions,footer.base,.script,.status{display:none!important}\n  body{background:#fff;color:#000}\n  .shell{margin-left:0}\n  .hero,.contact{background:#fff!important;color:#000!important;padding-block:18px}\n  .hero h1,.role,.section-head h2 em{color:#000!important;-webkit-text-fill-color:#000}\n  .sheet{margin-top:0;border:0}\n  .section{break-inside:avoid;padding-block:14px}\n  .about-grid,.projects,.tri{grid-template-columns:1fr 1fr}\n}\n\n\n/* ---------- builder additions: graceful empty sections (desktop only; mobile rules above still win) ---------- */\n@media (min-width:1081px){\n  .tri[data-cols=\"1\"]{grid-template-columns:minmax(0,1fr);max-width:640px}\n  .tri[data-cols=\"2\"]{grid-template-columns:repeat(2,minmax(0,1fr))}\n  .projects[data-count=\"1\"]{grid-template-columns:minmax(0,1fr)}\n}\n.project.no-mock{grid-template-columns:minmax(0,1fr)}\n@media (min-width:1081px){\n  .about-grid.solo{grid-template-columns:minmax(0,1fr);max-width:760px}\n}\n","js":"document.documentElement.classList.add('js');\n\n/* theme toggle — remembers the choice per browser, never required for the page to read */\n(function(){\n  var root=document.documentElement, btn=document.getElementById('theme'), icon=document.getElementById('theme-icon');\n  var sun='<circle cx=\"12\" cy=\"12\" r=\"4.2\"/><path d=\"M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4\"/>';\n  var moon='<path d=\"M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7\"/>';\n  function paint(){\n    var dark = root.getAttribute('data-theme')==='dark' ||\n      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);\n    icon.innerHTML = dark ? sun : moon;\n  }\n  try{ var saved=localStorage.getItem('__THEME_KEY__'); if(saved) root.setAttribute('data-theme',saved); }catch(e){}\n  paint();\n  btn.addEventListener('click',function(){\n    var dark = root.getAttribute('data-theme')==='dark' ||\n      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);\n    var next = dark ? 'light' : 'dark';\n    root.setAttribute('data-theme',next);\n    try{ localStorage.setItem('__THEME_KEY__',next); }catch(e){}\n    paint();\n  });\n})();\n\n/* scroll spy */\n(function(){\n  var links=[].slice.call(document.querySelectorAll('.nav a'));\n  var map={}; links.forEach(function(a){ var el=document.querySelector(a.getAttribute('href')); if(el) map[a.getAttribute('href').slice(1)]=a; });\n  var sections=Object.keys(map).map(function(id){ return document.getElementById(id); }).filter(Boolean);\n  if(!('IntersectionObserver' in window)) return;\n  var io=new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if(e.isIntersecting){\n        links.forEach(function(a){ a.removeAttribute('aria-current'); });\n        map[e.target.id].setAttribute('aria-current','true');\n      }\n    });\n  },{rootMargin:'-45% 0px -50% 0px',threshold:0});\n  sections.forEach(function(s){ io.observe(s); });\n})();\n\n/* reveal */\n(function(){\n  var items=[].slice.call(document.querySelectorAll('.rv'));\n  if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches){\n    items.forEach(function(el){ el.classList.add('in'); }); return;\n  }\n  var io=new IntersectionObserver(function(entries){\n    entries.forEach(function(e,i){\n      if(e.isIntersecting){ e.target.style.transitionDelay=(i*55)+'ms'; e.target.classList.add('in'); io.unobserve(e.target); }\n    });\n  },{rootMargin:'0px 0px -8% 0px',threshold:.08});\n  items.forEach(function(el){ io.observe(el); });\n  // anything already on screen resolves immediately\n  requestAnimationFrame(function(){ items.forEach(function(el){ if(el.getBoundingClientRect().top < innerHeight){ el.classList.add('in'); } }); });\n})();\n\n/* CV: open the generated resume, or download the uploaded PDF, otherwise print this page */\ndocument.getElementById('cv').addEventListener('click',function(){\n  var src=document.getElementById('resume-src');\n  if(src){\n    var url=URL.createObjectURL(new Blob([src.textContent],{type:'text/html'}));\n    window.open(url,'_blank');\n    return;\n  }\n  var pdf='__CV_PATH__';\n  if(!pdf){ window.print(); return; }\n  var a=document.createElement('a'); a.href=pdf; a.download='Resume.pdf'; a.target='_blank'; a.rel='noopener';\n  document.body.appendChild(a); a.click(); a.remove();\n});\n"}};
(function () {
  var defs = {}, cache = {};
  function key(n) { return n.replace(/^.*\//, '').replace(/\.(js|json)$/, ''); }
  function req(n) {
    var k = key(n);
    if (cache[k]) return cache[k].exports;
    if (!defs[k]) throw new Error('module not available in browser: ' + n);
    var m = cache[k] = { exports: {} };
    defs[k](m, m.exports, req);
    return m.exports;
  }
  function def(k, fn) { defs[k] = fn; }
  def('portfolio.schema', function (module) { module.exports = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://portfolio-builder.local/schema/portfolio.schema.json",
  "title": "Portfolio",
  "description": "Everything a template needs to render one portfolio site. Only `basics.name` is required; every section is optional and is hidden when empty. This same schema is used by (1) the manual form, (2) the resume-parsing LLM prompt, and (3) the renderer.",
  "type": "object",
  "required": ["basics"],
  "additionalProperties": false,
  "properties": {
    "$schema": { "type": "string" },
    "version": { "type": "integer", "const": 1, "description": "Schema version, for future migrations." },

    "seo": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "title": { "type": "string", "description": "<title>. Defaults to basics.name." },
        "description": { "type": "string", "maxLength": 300, "description": "Meta description. Defaults to a sentence built from name + role." }
      }
    },

    "basics": {
      "type": "object",
      "required": ["name"],
      "additionalProperties": false,
      "properties": {
        "name": { "type": "string", "minLength": 1, "maxLength": 80 },
        "role": { "type": "string", "maxLength": 120, "description": "One-line title shown under the name, e.g. 'B.Tech CSE Student · Full-stack & AI'." },
        "summary": { "type": "string", "maxLength": 500, "description": "Short intro paragraph in the hero." },
        "location": { "type": "string", "maxLength": 80 },
        "languages": { "type": "array", "items": { "type": "string" }, "maxItems": 8, "description": "Spoken languages." },
        "photo": { "type": "string", "description": "Path relative to the data folder, e.g. assets/profile.jpg. Omit to show initials only." },
        "resume": { "type": "string", "description": "Path to a PDF relative to the data folder. Omit and the CV button prints the page instead." },
        "motto": { "type": "array", "items": { "type": "string", "maxLength": 20 }, "maxItems": 4, "description": "Up to 4 short words in the handwritten note beside the photo." },
        "availability": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "badge": { "type": "string", "maxLength": 40, "description": "Pill under the photo, e.g. 'Open to opportunities'." },
            "note": { "type": "string", "maxLength": 100, "description": "Sidebar line under the location." }
          }
        }
      }
    },

    "about": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "heading": { "type": "string", "maxLength": 60, "description": "Plain part of the heading." },
        "headingAccent": { "type": "string", "maxLength": 40, "description": "Gradient-highlighted tail of the heading." },
        "body": { "type": "string", "maxLength": 1500 }
      }
    },

    "stats": {
      "type": "array",
      "maxItems": 4,
      "description": "Up to 4 stat cards. Omit to auto-generate (projects / certifications / skills counts).",
      "items": {
        "type": "object",
        "required": ["value", "label"],
        "additionalProperties": false,
        "properties": {
          "value": { "type": "string", "maxLength": 8 },
          "label": { "type": "string", "maxLength": 40 },
          "icon": { "$ref": "#/$defs/iconName" }
        }
      }
    },

    "education": {
      "type": "array",
      "maxItems": 6,
      "items": {
        "type": "object",
        "required": ["institution"],
        "additionalProperties": false,
        "properties": {
          "institution": { "type": "string", "maxLength": 100 },
          "degree": { "type": "string", "maxLength": 100, "description": "e.g. 'B.Tech, Computer Science & Engineering'." },
          "start": { "type": "string", "maxLength": 12 },
          "end": { "type": "string", "maxLength": 12, "description": "Year, or 'Present'." },
          "score": { "type": "string", "maxLength": 30, "description": "e.g. 'CGPA 6.4' or '77.5%'." }
        }
      }
    },

    "skills": {
      "type": "array",
      "maxItems": 30,
      "description": "Skill chips. Known technologies get their brand colour and mark automatically (see src/catalog.js); unknown ones get initials and a stable colour.",
      "items": {
        "type": "object",
        "required": ["name"],
        "additionalProperties": false,
        "properties": {
          "name": { "type": "string", "maxLength": 40 },
          "mark": { "type": "string", "maxLength": 4, "description": "Override the 1–3 character badge." },
          "color": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$", "description": "Override the badge colour." }
        }
      }
    },
    "strengths": {
      "type": "array",
      "maxItems": 10,
      "items": { "type": "string", "maxLength": 40 },
      "description": "Soft skills shown as tags under the chips."
    },

    "projects": {
      "type": "array",
      "maxItems": 12,
      "items": {
        "type": "object",
        "required": ["title"],
        "additionalProperties": false,
        "properties": {
          "title": { "type": "string", "maxLength": 80 },
          "subtitle": { "type": "string", "maxLength": 100, "description": "e.g. 'EdTech platform · personal · full stack + AI'." },
          "description": { "type": "string", "maxLength": 600 },
          "tags": { "type": "array", "items": { "type": "string", "maxLength": 24 }, "maxItems": 6 },
          "link": {
            "type": "object",
            "required": ["url"],
            "additionalProperties": false,
            "properties": {
              "url": { "type": "string", "pattern": "^https?://" },
              "label": { "type": "string", "maxLength": 40, "description": "Defaults to the hostname." },
              "kind": { "type": "string", "enum": ["live", "code"], "description": "'live' shows an external-link icon next to the title." }
            }
          },
          "icon": { "$ref": "#/$defs/iconName" },
          "gradient": {
            "type": "array",
            "items": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
            "minItems": 2,
            "maxItems": 2,
            "description": "Two colours for the project icon tile. Defaults to a stable pair derived from the title."
          },
          "mockup": { "type": "string", "enum": ["dashboard", "cards", "none"], "description": "Decorative preview art. Defaults to 'dashboard'." }
        }
      }
    },

    "certifications": {
      "type": "array",
      "maxItems": 12,
      "items": {
        "type": "object",
        "required": ["title"],
        "additionalProperties": false,
        "properties": {
          "title": { "type": "string", "maxLength": 140 },
          "issuer": { "type": "string", "maxLength": 60, "description": "Used to pick the badge colour when `mark` is absent." },
          "date": { "type": "string", "pattern": "^\\d{4}(-\\d{2}(-\\d{2})?)?$", "description": "ISO date: YYYY, YYYY-MM or YYYY-MM-DD." },
          "verb": { "type": "string", "enum": ["Issued", "Earned", "Completed"], "description": "Defaults to 'Completed'." },
          "mark": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "text": { "type": "string", "maxLength": 4 },
              "color": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" }
            }
          }
        }
      }
    },

    "achievements": {
      "type": "array",
      "maxItems": 10,
      "items": {
        "type": "object",
        "required": ["text"],
        "additionalProperties": false,
        "properties": {
          "text": { "type": "string", "maxLength": 240, "description": "Plain text. Wrap a phrase in **double asterisks** to bold it. No HTML." },
          "icon": { "$ref": "#/$defs/iconName" }
        }
      }
    },

    "contact": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "email": { "type": "string", "format": "email", "maxLength": 120 },
        "phone": { "type": "string", "maxLength": 30, "description": "As it should be displayed, e.g. '+91 88611 42813'." },
        "linkedin": { "type": "string", "pattern": "^https?://", "maxLength": 200 },
        "github": { "type": "string", "pattern": "^https?://", "maxLength": 200 },
        "heading": { "type": "string", "maxLength": 80 },
        "body": { "type": "string", "maxLength": 400 },
        "cta": { "type": "string", "maxLength": 30, "description": "Button label. Defaults to 'Get in touch'." }
      }
    },

    "theme": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "template": { "type": "string", "enum": ["default"], "description": "Template folder name under templates/." }
      }
    }
  },

  "$defs": {
    "iconName": {
      "type": "string",
      "enum": ["graduation", "code", "medal", "book", "ticket", "trophy", "chart", "chart-alt", "star", "rocket", "globe", "briefcase", "bolt"],
      "description": "Name from the built-in icon set (src/icons.js)."
    }
  }
}; });
  def('icons', function (module, exports, require) {
'use strict';
// Built-in icon set. All paths are authored on a 24x24 grid and drawn as strokes
// unless listed in FILLED. Users choose from the named content icons in the schema;
// UI icons are used by the template only.

const PATHS = {
  // content icons (selectable in the schema)
  graduation: '<path d="M12 3 2.5 8 12 13l9.5-5z"/><path d="M6.5 10.5V16c0 1.5 2.7 3 5.5 3s5.5-1.5 5.5-3v-5.5"/>',
  code: '<path d="m9 8-5 4 5 4M15 8l5 4-5 4"/>',
  medal: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5"/>',
  book: '<path d="M4 19V5.5A1.5 1.5 0 0 1 5.5 4H19v15"/><path d="M4 19a2 2 0 0 0 2 2h13"/><path d="M8 8h7M8 12h7"/>',
  ticket: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M2.5 10.5h19M8 6v12M16 6v12"/>',
  trophy: '<path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M9.5 20h5M12 15v5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  'chart-alt': '<path d="M4 20V13M10 20V6M16 20v-9M22 20H2"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2l-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
  rocket: '<path d="M14 4c3.5 0 6 2.5 6 6-3 3-5 4.5-8 5l-3-3c.5-3 2-5 5-8z"/><circle cx="14.5" cy="9.5" r="1.5"/><path d="M8 15c-2 .5-3 2-3.5 4.5C7 19 8.5 18 9 16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c4 4.5 4 13.5 0 18-4-4.5-4-13.5 0-18"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18"/>',
  bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>',

  // ui icons
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5S20 17 20 21"/>',
  folder: '<path d="M3 7.5h6l2 2.5h10V19a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19z"/>',
  'folder-tab': '<path d="M3 7.5h6l2 2.5h10V19a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19z"/><path d="M3 7.5V5.5A1.5 1.5 0 0 1 4.5 4h4"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  'trophy-nav': '<path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 5H4v2a4 4 0 0 0 3 3.9M17 5h3v2a4 4 0 0 1-3 3.9"/><path d="M9.5 20h5M12 15v5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.6 6.8 8.4 6 8.4-6"/>',
  download: '<path d="M12 3v12"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4.5 20h15"/>',
  arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5.5A1.5 1.5 0 0 1 16.5 21h-11A1.5 1.5 0 0 1 4 19.5v-11A1.5 1.5 0 0 1 5.5 7H11"/>',
  phone: '<path d="M5 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 5.6 5.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7 2 2 0 0 1 5 3.5"/>',
  pin: '<path d="M12 21s-7-4.4-7-9.8A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 3.2C19 16.6 12 21 12 21z"/>',
  moon: '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7"/>',
};

const FILLED = {
  linkedin: '<path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5M3 9.5h4V21H3zM9.5 9.5h3.8v1.6c.6-1 1.8-1.9 3.7-1.9 3 0 4 1.9 4 4.9V21h-4v-6.1c0-1.5-.5-2.4-1.8-2.4-1.1 0-1.7.7-2 1.5-.1.3-.1.7-.1 1V21h-4z"/>',
  github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2"/>',
};

const ICON_NAMES = ['graduation', 'code', 'medal', 'book', 'ticket', 'trophy', 'chart', 'chart-alt', 'star', 'rocket', 'globe', 'briefcase', 'bolt'];

/** Stroke icon. `cls` adds a class on the <svg>; `sw` is the stroke width. */
function icon(name, sw = 2, cls = '') {
  const body = PATHS[name] || PATHS.code;
  const c = cls ? ` class="${cls}"` : '';
  return `<svg${c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

/** Filled brand glyph (linkedin, github). */
function glyph(name) {
  return `<svg viewBox="0 0 24 24" fill="currentColor">${FILLED[name]}</svg>`;
}

module.exports = { icon, glyph, ICON_NAMES };

  });
  def('mockups', function (module, exports, require) {
'use strict';
// Decorative "app screenshot" art for project cards. Each takes the project's two gradient colours
// so the preview matches its icon tile. Purely presentational (aria-hidden in the template).

function dashboard(c1, c2) {
  return `<svg viewBox="0 0 168 190" preserveAspectRatio="xMidYMid slice">
                <rect width="168" height="190" fill="#0B1226"/>
                <rect x="0" y="0" width="168" height="16" fill="#111A38"/>
                <circle cx="10" cy="8" r="2.4" fill="#F87171"/><circle cx="19" cy="8" r="2.4" fill="#FBBF24"/><circle cx="28" cy="8" r="2.4" fill="#34D399"/>
                <rect x="8" y="24" width="44" height="158" rx="6" fill="#141E44"/>
                <rect x="14" y="32" width="32" height="5" rx="2.5" fill="#3B4A80"/>
                <rect x="14" y="44" width="32" height="7" rx="3.5" fill="${c1}"/>
                <rect x="14" y="56" width="26" height="5" rx="2.5" fill="#2C3868"/>
                <rect x="14" y="66" width="30" height="5" rx="2.5" fill="#2C3868"/>
                <rect x="14" y="76" width="22" height="5" rx="2.5" fill="#2C3868"/>
                <rect x="60" y="24" width="100" height="40" rx="7" fill="#16225A"/>
                <rect x="68" y="34" width="52" height="7" rx="3.5" fill="#8FA3FF"/>
                <rect x="68" y="46" width="76" height="5" rx="2.5" fill="#3B4A80"/>
                <rect x="60" y="72" width="47" height="46" rx="7" fill="#141E44"/>
                <rect x="113" y="72" width="47" height="46" rx="7" fill="#141E44"/>
                <circle cx="76" cy="88" r="7" fill="${c2}"/><circle cx="129" cy="88" r="7" fill="#38BDF8"/>
                <rect x="68" y="102" width="30" height="4" rx="2" fill="#2C3868"/>
                <rect x="121" y="102" width="30" height="4" rx="2" fill="#2C3868"/>
                <rect x="60" y="126" width="100" height="56" rx="7" fill="#141E44"/>
                <rect x="68" y="136" width="60" height="5" rx="2.5" fill="#3B4A80"/>
                <rect x="68" y="148" width="84" height="4" rx="2" fill="#26315E"/>
                <rect x="68" y="157" width="70" height="4" rx="2" fill="#26315E"/>
                <rect x="68" y="166" width="40" height="8" rx="4" fill="${c1}"/>
              </svg>`;
}

function cards(c1, c2) {
  return `<svg viewBox="0 0 168 190" preserveAspectRatio="xMidYMid slice">
                <rect width="168" height="190" fill="#0B1226"/>
                <rect x="0" y="0" width="168" height="16" fill="#111A38"/>
                <circle cx="10" cy="8" r="2.4" fill="#F87171"/><circle cx="19" cy="8" r="2.4" fill="#FBBF24"/><circle cx="28" cy="8" r="2.4" fill="#34D399"/>
                <rect x="12" y="26" width="64" height="6" rx="3" fill="#8FA3FF"/>
                <rect x="12" y="38" width="96" height="8" rx="4" fill="${c1}"/>
                <rect x="12" y="56" width="42" height="58" rx="6" fill="#1C2550"/>
                <rect x="63" y="56" width="42" height="58" rx="6" fill="#1C2550"/>
                <rect x="114" y="56" width="42" height="58" rx="6" fill="#1C2550"/>
                <rect x="12" y="56" width="42" height="34" rx="6" fill="${c2}" opacity=".55"/>
                <rect x="63" y="56" width="42" height="34" rx="6" fill="#7B5CF0" opacity=".6"/>
                <rect x="114" y="56" width="42" height="34" rx="6" fill="#38BDF8" opacity=".5"/>
                <rect x="18" y="96" width="28" height="4" rx="2" fill="#3B4A80"/>
                <rect x="69" y="96" width="28" height="4" rx="2" fill="#3B4A80"/>
                <rect x="120" y="96" width="28" height="4" rx="2" fill="#3B4A80"/>
                <rect x="18" y="104" width="18" height="4" rx="2" fill="#26315E"/>
                <rect x="69" y="104" width="18" height="4" rx="2" fill="#26315E"/>
                <rect x="120" y="104" width="18" height="4" rx="2" fill="#26315E"/>
                <path d="M20 132h128" stroke="#3B4A80" stroke-width="3" stroke-linecap="round"/>
                <g fill="#2C3868">
                  <rect x="26" y="144" width="10" height="9" rx="2.5"/><rect x="42" y="144" width="10" height="9" rx="2.5"/>
                  <rect x="58" y="144" width="10" height="9" rx="2.5"/><rect x="74" y="144" width="10" height="9" rx="2.5"/>
                  <rect x="90" y="144" width="10" height="9" rx="2.5"/><rect x="106" y="144" width="10" height="9" rx="2.5"/>
                  <rect x="122" y="144" width="10" height="9" rx="2.5"/>
                  <rect x="26" y="158" width="10" height="9" rx="2.5"/><rect x="42" y="158" width="10" height="9" rx="2.5"/>
                  <rect x="90" y="158" width="10" height="9" rx="2.5"/><rect x="106" y="158" width="10" height="9" rx="2.5"/>
                  <rect x="122" y="158" width="10" height="9" rx="2.5"/>
                </g>
                <g fill="#34D399"><rect x="58" y="158" width="10" height="9" rx="2.5"/><rect x="74" y="158" width="10" height="9" rx="2.5"/></g>
                <rect x="26" y="174" width="106" height="9" rx="4.5" fill="${c1}"/>
              </svg>`;
}

module.exports = { dashboard, cards };

  });
  def('catalog', function (module, exports, require) {
'use strict';
// Brand lookups so a skill or issuer typed as plain text still renders with the right badge.
// Anything not listed falls back to initials + a colour derived from the text (stable across builds).

const SKILLS = [
  { aliases: ['java'], mark: 'J', bg: '#E76F00' },
  { aliases: ['python'], mark: 'Py', bg: 'linear-gradient(135deg,#3776AB,#FFD43B)' },
  { aliases: ['c / c++', 'c/c++', 'c++', 'c', 'cpp'], mark: 'C++', bg: '#00599C' },
  { aliases: ['html', 'html5'], mark: '<>', bg: '#E34F26' },
  { aliases: ['css', 'css3'], mark: '#', bg: '#1572B6' },
  { aliases: ['javascript', 'js', 'es6'], mark: 'JS', bg: '#F7DF1E', fg: '#20201A' },
  { aliases: ['react / jsx', 'react', 'react.js', 'reactjs', 'jsx'], mark: 'JSX', bg: '#61DAFB', fg: '#0B2230' },
  { aliases: ['firebase'], mark: 'Fb', bg: '#FFA000' },
  { aliases: ['databases & sql', 'sql', 'mysql', 'postgresql', 'databases'], mark: 'DB', bg: '#00758F' },
  { aliases: ['google cloud', 'gcp', 'google cloud platform'], mark: 'GC', bg: '#4285F4' },
  { aliases: ['azure fundamentals', 'azure', 'microsoft azure'], mark: 'Az', bg: '#0078D4' },
  { aliases: ['git & github', 'git', 'github'], mark: 'Git', bg: '#171515' },
  { aliases: ['typescript', 'ts'], mark: 'TS', bg: '#3178C6' },
  { aliases: ['node.js', 'node', 'nodejs'], mark: 'N', bg: '#339933' },
  { aliases: ['mongodb'], mark: 'M', bg: '#47A248' },
  { aliases: ['docker'], mark: 'Dk', bg: '#2496ED' },
  { aliases: ['aws', 'amazon web services'], mark: 'AWS', bg: '#232F3E' },
  { aliases: ['figma'], mark: 'Fg', bg: '#A259FF' },
  { aliases: ['tailwind', 'tailwind css', 'tailwindcss'], mark: 'Tw', bg: '#06B6D4' },
  { aliases: ['next.js', 'nextjs', 'next'], mark: 'Nx', bg: '#000000' },
  { aliases: ['flutter'], mark: 'Fl', bg: '#02569B' },
  { aliases: ['kotlin'], mark: 'Kt', bg: '#7F52FF' },
  { aliases: ['go', 'golang'], mark: 'Go', bg: '#00ADD8' },
  { aliases: ['rust'], mark: 'Rs', bg: '#B7410E' },
];

const ISSUERS = [
  { aliases: ['microsoft'], mark: 'MS', bg: '#0078D4' },
  { aliases: ['google'], mark: 'G', bg: '#4285F4' },
  { aliases: ['ibm'], mark: 'IBM', bg: '#1F70C1' },
  { aliases: ['uc santa cruz', 'ucsc', 'university of california, santa cruz', 'university of california santa cruz'], mark: 'UC', bg: '#003C6C' },
  { aliases: ['amazon', 'aws'], mark: 'AWS', bg: '#232F3E' },
  { aliases: ['meta'], mark: 'M', bg: '#0866FF' },
  { aliases: ['coursera'], mark: 'Co', bg: '#0056D2' },
  { aliases: ['udemy'], mark: 'Ud', bg: '#A435F0' },
  { aliases: ['nptel'], mark: 'NP', bg: '#C0392B' },
];

const FALLBACK_BG = ['#4560FF', '#7B5CF0', '#0EA5E9', '#10B981', '#F97316', '#F43F5E', '#0F766E', '#B45309'];

const norm = (s) => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');

/** Small stable string hash → non-negative int. */
function hash(s) {
  let h = 5381;
  for (const ch of String(s)) h = ((h << 5) + h + ch.codePointAt(0)) | 0;
  return Math.abs(h);
}

function find(list, text) {
  const t = norm(text);
  return list.find((e) => e.aliases.includes(t));
}

/** Pick readable foreground for a #RRGGBB background. */
function fgFor(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return undefined;
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.72 ? '#20201A' : undefined;
}

function initials(text, max = 2) {
  const words = String(text).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  if (!words.length) return '?';
  if (words.length === 1) return words[0].slice(0, max);
  return words.slice(0, max).map((w) => w[0]).join('').toUpperCase();
}

function fallback(text, max) {
  const bg = FALLBACK_BG[hash(norm(text)) % FALLBACK_BG.length];
  return { mark: initials(text, max), bg, fg: fgFor(bg) };
}

function skillBadge(skill) {
  const hit = find(SKILLS, skill.name) || fallback(skill.name, 2);
  const bg = skill.color || hit.bg;
  return { mark: skill.mark || hit.mark, bg, fg: skill.color ? fgFor(skill.color) : hit.fg };
}

/** Issuer lookup that also accepts "Microsoft Certified", "Google Cloud" etc. (alias as a leading word). */
function findIssuer(text) {
  const t = norm(text);
  return find(ISSUERS, text) || ISSUERS.find((e) => e.aliases.some((a) => t.startsWith(a + ' ')));
}

function certBadge(cert) {
  if (cert.mark && (cert.mark.text || cert.mark.color)) {
    const base = findIssuer(cert.issuer) || fallback(cert.issuer || cert.title, 2);
    const bg = cert.mark.color || base.bg;
    return { mark: cert.mark.text || base.mark, bg, fg: cert.mark.color ? fgFor(bg) : base.fg };
  }
  return findIssuer(cert.issuer) || fallback(cert.issuer || cert.title, 2);
}

// Stable gradient pairs for project icon tiles when none is given.
const GRADIENTS = [
  ['#4560FF', '#7B5CF0'], ['#F43F5E', '#F97316'], ['#0EA5E9', '#10B981'], ['#7B5CF0', '#F43F5E'],
  ['#F59E0B', '#F43F5E'], ['#10B981', '#0EA5E9'],
];
const gradientFor = (title) => GRADIENTS[hash(norm(title)) % GRADIENTS.length];

module.exports = { skillBadge, certBadge, gradientFor, initials, hash };

  });
  def('validate', function (module, exports, require) {
'use strict';
// Minimal JSON Schema validator (the subset portfolio.schema.json uses) so the builder has zero dependencies.
// Supports: type, required, properties, additionalProperties:false, items, enum, const, minLength/maxLength,
// minItems/maxItems, pattern, local $ref. `format` is deliberately ignored except a basic email check.

function validate(data, schema) {
  const errors = [];
  const root = schema;

  const resolve = (s) => {
    if (s && s.$ref) {
      const path = s.$ref.replace(/^#\//, '').split('/');
      return path.reduce((o, k) => o[k], root);
    }
    return s;
  };

  const typeOf = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : Number.isInteger(v) ? 'integer' : typeof v);

  function walk(value, s, path) {
    s = resolve(s);
    const t = typeOf(value);
    if (s.type) {
      const ok = s.type === t || (s.type === 'number' && t === 'integer');
      if (!ok) return errors.push(`${path || '(root)'}: expected ${s.type}, got ${t}`);
    }
    if (s.const !== undefined && value !== s.const) errors.push(`${path}: must be ${JSON.stringify(s.const)}`);
    if (s.enum && !s.enum.includes(value)) errors.push(`${path}: must be one of ${s.enum.join(', ')}`);

    if (t === 'string') {
      if (s.minLength != null && value.length < s.minLength) errors.push(`${path}: too short`);
      if (s.maxLength != null && value.length > s.maxLength) errors.push(`${path}: too long (max ${s.maxLength})`);
      if (s.pattern && !new RegExp(s.pattern).test(value)) errors.push(`${path}: does not match ${s.pattern}`);
      if (s.format === 'email' && !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(value)) errors.push(`${path}: not a valid email`);
    }
    if (t === 'array') {
      if (s.minItems != null && value.length < s.minItems) errors.push(`${path}: needs at least ${s.minItems} items`);
      if (s.maxItems != null && value.length > s.maxItems) errors.push(`${path}: too many items (max ${s.maxItems})`);
      if (s.items) value.forEach((v, i) => walk(v, s.items, `${path}[${i}]`));
    }
    if (t === 'object') {
      for (const k of s.required || []) if (value[k] === undefined) errors.push(`${path ? path + '.' : ''}${k}: required`);
      const props = s.properties || {};
      for (const [k, v] of Object.entries(value)) {
        if (props[k]) walk(v, props[k], path ? `${path}.${k}` : k);
        else if (s.additionalProperties === false) errors.push(`${path ? path + '.' : ''}${k}: unknown field`);
      }
    }
  }

  walk(data, schema, '');
  return errors;
}

module.exports = { validate };

  });
  def('render', function (module, exports, require) {
'use strict';
// portfolio JSON -> one self-contained HTML string. Every section is optional and is dropped when empty.
// Asset fields (photo, resume) may be relative paths (CLI build) or data: URIs (web app).

const { icon, glyph } = require('./icons');
const { skillBadge, certBadge, gradientFor, initials } = require('./catalog');
const { dashboard, cards } = require('./mockups');

// Templates: bundled into globalThis.__TEMPLATES__ for the browser build, read from disk under Node.
function loadTemplate(name) {
  const bundled = globalThis.__TEMPLATES__ && globalThis.__TEMPLATES__[name];
  if (bundled) return bundled;
  const fs = require('fs');
  const path = require('path');
  const dir = path.join(__dirname, '..', 'templates', name);
  const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
  return { css: read('style.css') + '\n' + read('extras.css'), js: read('client.js') };
}
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const has = (a) => Array.isArray(a) && a.length > 0;
const safeUrl = (u) => (/^(https?:\/\/|mailto:|tel:)/i.test(u) ? u : '#');
const safeAsset = (u) => (/^(data:(image|application)\/|[\w./~-]+$|https?:\/\/)/i.test(u) ? u : '');

/** **bold** -> <b>, everything else escaped. */
const richText = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

function fmtDate(d, verb) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  let out = y;
  if (m) out = `${MONTHS[+m - 1]} ${day ? +day + ', ' : ''}${y}`;
  return `${verb || 'Completed'} ${out}`;
}

const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; } };
const handleOf = (u) => { try { return new URL(u).pathname.split('/').filter(Boolean).pop() || hostOf(u); } catch { return u; } };

function markHtml(b, extra = '') {
  const style = `background:${b.bg}${b.fg ? `;color:${b.fg}` : ''}`;
  return `<span class="mark"${extra} style="${esc(style)}">${esc(b.mark)}</span>`;
}

function render(data, opts = {}) {
  const b = data.basics || {};
  const c = data.contact || {};
  const about = data.about || {};
  const av = b.availability || {};
  const edu = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const certs = data.certifications || [];
  const wins = data.achievements || [];
  const tplName = (data.theme && data.theme.template) || 'default';
  const tpl = loadTemplate(tplName);
  const css = tpl.css;
  const themeKey = 'pf-theme-' + (b.name || 'site').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const resume = b.resume ? safeAsset(b.resume) : '';
  const js = tpl.js
    .replace(/__THEME_KEY__/g, esc(themeKey))
    .replace('__CV_PATH__', resume.replace(/\\/g, '\\\\').replace(/'/g, "\\'"));

  const nameWords = b.name.split(/\s+/).filter(Boolean);
  const mono = (nameWords.length > 1 ? nameWords[0][0] + nameWords[nameWords.length - 1][0] : initials(b.name, 2)).toUpperCase();
  const brand = `${esc(mono)}<span>.</span>`;
  const title = (data.seo && data.seo.title) || b.name;
  const desc = (data.seo && data.seo.description) || [b.name, b.role].filter(Boolean).join(' — ');

  // ---- stats (explicit, else auto from counts) ----
  let stats = data.stats;
  if (!has(stats)) {
    stats = [];
    if (projects.length) stats.push({ value: String(projects.length), label: projects.length === 1 ? 'Project' : 'Projects', icon: 'code' });
    if (certs.length) stats.push({ value: String(certs.length), label: certs.length === 1 ? 'Certification' : 'Certifications', icon: 'medal' });
    if (skills.length) stats.push({ value: String(skills.length), label: 'Languages & tools', icon: 'book' });
  }

  // ---- facts ----
  const facts = [];
  if (b.location) facts.push(['pin', b.location]);
  if (has(b.languages)) facts.push(['globe', b.languages.join(' · ')]);
  if (edu[0]) facts.push(['graduation', [edu[0].institution, [edu[0].start, edu[0].end].filter(Boolean).join('–')].filter(Boolean).join(', ')]);

  const showAbout = Boolean(about.body || has(stats) || facts.length);
  const showTri = has(edu) || has(certs) || has(wins);
  const triCols = [has(edu), has(certs), has(wins)].filter(Boolean).length;
  const triId = has(certs) ? 'certificates' : has(edu) ? 'education' : 'achievements';

  // ---- nav ----
  const nav = [['home', 'Home', 'home']];
  if (showAbout) nav.push(['about', 'About', 'user']);
  if (has(skills)) nav.push(['skills', 'Skills', 'grid']);
  if (has(projects)) nav.push(['projects', 'Projects', 'folder-tab']);
  if (has(certs) || has(edu)) nav.push([triId, has(certs) ? 'Certificates' : 'Education', 'medal']);
  if (has(wins) && (has(certs) || has(edu))) nav.push(['achievements', 'Achievements', 'trophy-nav']);
  const hasContact = Boolean(c.email || c.phone || c.linkedin || c.github);
  if (hasContact) nav.push(['contact', 'Contact', 'mail']);

  const out = [];
  out.push(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${esc(desc)}">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@600&display=swap">
<style>
${css}
</style>
</head>
<body>

<aside class="rail">
  <div class="brand">${brand}</div>
  <nav class="nav" id="nav" aria-label="Sections">
${nav.map(([id, label, ic], i) => `    <a href="#${id}"${i === 0 ? ' aria-current="true"' : ''}>${icon(ic, 1.9)}${esc(label)}</a>`).join('\n')}
  </nav>
  ${b.location || av.note ? `<div class="rail-foot">${b.location ? `<b>${esc(b.location)}</b>` : ''}${esc(av.note || '')}</div>` : ''}
  <div class="topbar">
    <button class="icon-btn" id="theme" type="button" aria-label="Switch theme" title="Switch theme">${icon('moon', 1.9).replace('<svg', '<svg id="theme-icon"')}</button>
    <button class="cv-btn" id="cv" type="button">${icon('download', 1.9)}<span>${resume || opts.resumeHtml ? 'Download CV' : 'Save as PDF'}</span></button>
  </div>
</aside>

<div class="shell">

  <header class="hero" id="home">
    <div class="wrap hero-grid">
      <div>
        <p class="hello">Hello, I'm</p>
        <h1>${esc(b.name)}<span class="dot">.</span></h1>
        ${b.role ? `<p class="role">${esc(b.role)}</p>` : ''}
        ${b.summary ? `<p class="lede">${esc(b.summary)}</p>` : ''}
        <div class="cta-row">
          ${has(projects) ? `<a class="btn btn-primary" href="#projects">${icon('folder', 1.9)}View my work${icon('arrow', 2.1, 'arrow')}</a>` : ''}
          ${c.email ? `<a class="btn ${has(projects) ? 'btn-ghost' : 'btn-primary'}" href="mailto:${esc(c.email)}">${icon('mail', 1.9)}Contact me</a>` : ''}
        </div>
        <div class="socials">
          ${c.linkedin ? `<a href="${esc(safeUrl(c.linkedin))}" target="_blank" rel="noopener" aria-label="LinkedIn">${glyph('linkedin')}</a>` : ''}
          ${c.github ? `<a href="${esc(safeUrl(c.github))}" target="_blank" rel="noopener" aria-label="GitHub">${glyph('github')}</a>` : ''}
          ${c.email ? `<a href="mailto:${esc(c.email)}" aria-label="Email">${icon('mail', 1.9)}</a>` : ''}
          ${c.phone ? `<a href="tel:${esc(c.phone.replace(/[^\d+]/g, ''))}" aria-label="Phone">${icon('phone', 1.9)}</a>` : ''}
        </div>
      </div>

      <div class="portrait-col">
        <div class="portrait">
          <div class="portrait-inner">
            <div class="monogram">${esc(mono)}<small>${esc(b.name.toUpperCase())}</small></div>
            ${b.photo && safeAsset(b.photo) ? `<img src="${esc(safeAsset(b.photo))}" alt="${esc(b.name)}" onerror="this.remove()">` : ''}
          </div>
          ${has(b.motto) ? `<div class="script">${b.motto.map(esc).join('<br>')}
            <svg viewBox="0 0 74 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 8c14-6 42-8 70-4"/></svg>
          </div>` : ''}
          ${av.badge ? `<div class="status"><span class="pulse"></span>${esc(av.badge)}</div>` : ''}
        </div>
      </div>
    </div>
  </header>

  <main class="sheet">
`);

  // ---- about ----
  if (showAbout) {
    const heading = about.heading ? `${esc(about.heading)}${about.headingAccent ? ' <em style="font-style:normal;background:linear-gradient(92deg,var(--accent),var(--accent-2));-webkit-background-clip:text;background-clip:text;color:transparent">' + esc(about.headingAccent) + '</em>' : ''}` : 'A little about me';
    out.push(`    <section class="section" id="about">
      <div class="wrap about-grid${has(stats) ? '' : ' solo'}">
        <div>
          <p class="eyebrow">About me</p>
          <h2 style="font-size:clamp(25px,3.2vw,34px);font-weight:700;margin-top:12px">${heading}</h2>
          ${about.body ? `<p class="about-body">${esc(about.body)}</p>` : ''}
          ${facts.length ? `<div class="facts">${facts.map(([ic, t]) => `<span class="fact">${icon(ic, 2)}${esc(t)}</span>`).join('')}</div>` : ''}
        </div>
        ${has(stats) ? `<div class="stats">${stats.map((s) => `
          <div class="stat rv"><div class="ic">${icon(s.icon || 'star', 2)}</div><div class="num">${esc(s.value)}</div><div class="lbl">${esc(s.label)}</div></div>`).join('')}
        </div>` : ''}
      </div>
    </section>
`);
  }

  // ---- skills ----
  if (has(skills) || has(data.strengths)) {
    out.push(`    <section class="section" id="skills">
      <div class="wrap">
        <div class="section-head"><div><p class="eyebrow">Skills</p><h2>Tools &amp; technologies</h2></div></div>
        ${has(skills) ? `<div class="chips">${skills.map((s) => `
          <div class="chip rv">${markHtml(skillBadge(s))}${esc(s.name)}</div>`).join('')}
        </div>` : ''}
        ${has(data.strengths) ? `<div class="core"><span class="label">Also strong at</span>${data.strengths.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
      </div>
    </section>
`);
  }

  // ---- projects ----
  if (has(projects)) {
    out.push(`    <section class="section" id="projects">
      <div class="wrap">
        <div class="section-head">
          <div><p class="eyebrow">Projects</p><h2>Things I've <em>built</em></h2></div>
          ${c.github ? `<a class="link-more" href="${esc(safeUrl(c.github))}" target="_blank" rel="noopener">All repositories ${icon('arrow', 2.2)}</a>` : ''}
        </div>
        <div class="projects" data-count="${projects.length}">
${projects.map((p) => {
      const [g1, g2] = p.gradient || gradientFor(p.title);
      const mock = p.mockup || 'dashboard';
      const art = mock === 'cards' ? cards(g1, g2) : mock === 'none' ? '' : dashboard(g1, g2);
      const live = p.link && p.link.kind === 'live';
      return `          <article class="project rv${art ? '' : ' no-mock'}">
            <div>
              <div class="p-head">
                <span class="p-ic" style="background:linear-gradient(135deg,${esc(g1)},${esc(g2)})">${icon(p.icon || 'code', 2)}</span>
                <div>
                  <h3>${esc(p.title)}${live ? ' ' + icon('external', 2) : ''}</h3>
                  ${p.subtitle ? `<p class="p-meta">${esc(p.subtitle)}</p>` : ''}
                </div>
              </div>
              ${p.description ? `<p>${esc(p.description)}</p>` : ''}
              ${has(p.tags) ? `<div class="p-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
              ${p.link ? `<a class="p-link" href="${esc(safeUrl(p.link.url))}" target="_blank" rel="noopener">${esc(p.link.label || hostOf(p.link.url))} ${icon('arrow', 2.2)}</a>` : ''}
            </div>
            ${art ? `<div class="mock" aria-hidden="true">${art}</div>` : ''}
          </article>`;
    }).join('\n\n')}
        </div>
      </div>
    </section>
`);
  }

  // ---- education / certs / achievements ----
  if (showTri) {
    out.push(`    <section class="section" id="${triId}">
      <div class="wrap tri" data-cols="${triCols}">
`);
    if (has(edu)) {
      out.push(`        <div>
          <div class="col-head"><div><p class="eyebrow">Education</p><h2 style="margin-top:10px">Where I studied</h2></div></div>
          <div class="timeline">${edu.map((e) => {
        const when = [[e.start, e.end].filter(Boolean).join(' — '), e.score].filter(Boolean).join(' · ');
        return `
            <div class="tl-item"><h4>${esc(e.institution)}</h4>${e.degree ? `<p class="sub">${esc(e.degree)}</p>` : ''}${when ? `<p class="when">${esc(when)}</p>` : ''}</div>`;
      }).join('')}
          </div>
        </div>
`);
    }
    if (has(certs)) {
      out.push(`        <div>
          <div class="col-head"><div><p class="eyebrow">Certifications</p><h2 style="margin-top:10px">Verified learning</h2></div></div>
          <ul class="certs">${certs.map((x) => `
            <li>${markHtml(certBadge(x))}<div><h4>${esc(x.title)}</h4>${x.date ? `<p class="when">${esc(fmtDate(x.date, x.verb))}</p>` : ''}</div></li>`).join('')}
          </ul>
        </div>
`);
    }
    if (has(wins)) {
      out.push(`        <div id="achievements">
          <div class="col-head"><div><p class="eyebrow">Achievements</p><h2 style="margin-top:10px">Milestones</h2></div></div>
          <ul class="wins">${wins.map((w) => `
            <li><span class="ic">${icon(w.icon || 'star', 2)}</span><p>${richText(w.text)}</p></li>`).join('')}
          </ul>
        </div>
`);
    }
    out.push(`      </div>
    </section>
`);
  }

  out.push(`  </main>
`);

  // ---- contact ----
  if (hasContact) {
    const reach = [];
    if (c.email) reach.push(['mail', 'Email', c.email, `mailto:${c.email}`, false]);
    if (c.phone) reach.push(['phone', 'Phone', c.phone, `tel:${c.phone.replace(/[^\d+]/g, '')}`, false]);
    if (c.linkedin) reach.push(['linkedin', 'LinkedIn', handleOf(c.linkedin), c.linkedin, true]);
    if (c.github) reach.push(['github', 'GitHub', hostOf(c.github) + '/' + handleOf(c.github), c.github, true]);
    out.push(`  <section class="contact" id="contact">
    <div class="wrap contact-grid">
      <div>
        <p class="eyebrow" style="color:#A78BFA">Let's connect</p>
        <h2>${esc(c.heading || 'Interested in working together?')}</h2>
        ${c.body ? `<p>${esc(c.body)}</p>` : ''}
        ${c.email ? `<div class="cta-row"><a class="btn btn-primary" href="mailto:${esc(c.email)}">${esc(c.cta || 'Get in touch')}${icon('arrow', 2.1, 'arrow')}</a></div>` : ''}
      </div>
      <div class="contact-actions"><div class="reach">${reach.map(([ic, k, v, href, ext]) => `
        <a href="${esc(safeUrl(href))}"${ext ? ' target="_blank" rel="noopener"' : ''}>${ic === 'linkedin' || ic === 'github' ? glyph(ic) : icon(ic, 1.9)}<span><span class="k">${k}</span><br><span class="v">${esc(v)}</span></span></a>`).join('')}
      </div></div>
    </div>
  </section>
`);
  }

  out.push(`  <footer class="base">
    <div class="wrap base-in">
      <span class="brand" style="font-size:17px;padding:0">${brand}</span>
      <span>© ${new Date().getFullYear()} ${esc(b.name)}</span>
      <nav>${nav.filter(([id]) => ['home', 'about', 'projects', 'contact'].includes(id)).map(([id, l]) => `<a href="#${id}">${esc(l)}</a>`).join('')}</nav>
    </div>
  </footer>

</div>

${opts.resumeHtml ? `<script type="text/plain" id="resume-src">${opts.resumeHtml.replace(/<\/script/gi, '<\\/script')}</script>\n` : ''}<script>
${js}
</script>
</body>
</html>
`);
  return out.join('');
}

module.exports = { render };

  });
  def('resume', function (module, exports, require) {
'use strict';
// portfolio JSON -> a clean, single-column, ATS-friendly resume (HTML sized for A4).
// Opens with a toolbar whose "Save as PDF" button calls print(); the toolbar is hidden when printing.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const has = (a) => Array.isArray(a) && a.length > 0;
const bold = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const short = (u) => String(u).replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const safe = (u) => (/^https?:\/\//i.test(u) ? u : '#');

function when(d, verb) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return [verb, m ? `${MONTHS[+m - 1]} ${day ? +day + ', ' : ''}${y}` : y].filter(Boolean).join(' ');
}

/** "Sentence one. Sentence two." -> up to `max` bullet points. */
function bullets(text, max = 3) {
  if (!text) return [];
  return text.split(/(?<=[.!?])\s+(?=[A-Z])/).map((t) => t.trim()).filter(Boolean).slice(0, max);
}

function resume(data) {
  const b = data.basics || {};
  const c = data.contact || {};
  const edu = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const certs = data.certifications || [];
  const wins = data.achievements || [];

  const contact = [
    c.email && `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`,
    c.phone && esc(c.phone),
    b.location && esc(b.location),
    c.linkedin && `<a href="${esc(safe(c.linkedin))}">${esc(short(c.linkedin))}</a>`,
    c.github && `<a href="${esc(safe(c.github))}">${esc(short(c.github))}</a>`,
  ].filter(Boolean);

  const section = (title, body) => `<section><h2>${title}</h2>${body}</section>`;
  const out = [];
  const summary = (data.about && data.about.body) || b.summary;
  if (summary) out.push(section('Professional Summary', `<p>${esc(summary)}</p>`));
  if (has(skills) || has(data.strengths)) {
    out.push(section('Skills', `${has(skills) ? `<p><b>Technical:</b> ${skills.map((s) => esc(s.name)).join(' · ')}</p>` : ''}${has(data.strengths) ? `<p><b>Strengths:</b> ${data.strengths.map(esc).join(' · ')}</p>` : ''}`));
  }
  if (has(projects)) {
    out.push(section('Projects', projects.map((p) => `
      <div class="item"><div class="row"><h3>${esc(p.title)}${p.subtitle ? `<span class="sub"> — ${esc(p.subtitle)}</span>` : ''}</h3>${p.link ? `<a class="r" href="${esc(safe(p.link.url))}">${esc(p.link.label || short(p.link.url))}</a>` : ''}</div>
      ${bullets(p.description).length ? `<ul>${bullets(p.description).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      ${has(p.tags) ? `<p class="tags">${p.tags.map(esc).join(' · ')}</p>` : ''}</div>`).join('')));
  }
  if (has(edu)) {
    out.push(section('Education', edu.map((e) => `
      <div class="item"><div class="row"><h3>${esc(e.institution)}</h3><span class="r">${esc([e.start, e.end].filter(Boolean).join(' – '))}</span></div>
      <div class="row"><span>${esc(e.degree || '')}</span><span class="r">${esc(e.score || '')}</span></div></div>`).join('')));
  }
  if (has(certs)) {
    out.push(section('Certifications', `<ul>${certs.map((x) => `<li>${esc(x.title)}${x.date ? ` <span class="muted">(${esc(when(x.date, x.verb))})</span>` : ''}</li>`).join('')}</ul>`));
  }
  if (has(wins)) out.push(section('Achievements', `<ul>${wins.map((w) => `<li>${bold(w.text)}</li>`).join('')}</ul>`));

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(b.name)} — Resume</title>
<style>
@page{size:A4;margin:14mm 15mm}
*{box-sizing:border-box}
body{margin:0;background:#e9edf3;color:#1a1f2b;font:10.5pt/1.45 "Helvetica Neue",Helvetica,Arial,sans-serif}
.bar{position:sticky;top:0;display:flex;gap:10px;align-items:center;justify-content:center;padding:10px;background:#101728;color:#fff;font-size:13px}
.bar button{font:inherit;font-weight:700;padding:8px 16px;border:0;border-radius:8px;background:#4560FF;color:#fff;cursor:pointer}
.page{width:210mm;min-height:297mm;margin:16px auto;background:#fff;padding:14mm 15mm;box-shadow:0 8px 30px rgba(0,0,0,.15)}
header{border-bottom:2px solid #1a1f2b;padding-bottom:8px;margin-bottom:4px}
h1{margin:0;font:700 24pt/1.1 Georgia,"Times New Roman",serif;letter-spacing:-.01em}
.role{margin:3px 0 0;font-size:12pt;color:#3b4560}
.contact{margin:6px 0 0;font-size:9.5pt;color:#3b4560}
.contact span+span::before,.contact a+a::before{content:""}
a{color:inherit;text-decoration:none}
h2{margin:14px 0 6px;font:700 10.5pt/1 "Helvetica Neue",Helvetica,Arial,sans-serif;text-transform:uppercase;letter-spacing:.12em;border-bottom:1px solid #b9c1d3;padding-bottom:4px}
h3{margin:0;font-size:10.8pt}
.sub{font-weight:400;color:#3b4560}
p{margin:2px 0}
ul{margin:3px 0 0;padding-left:17px}
li{margin:1px 0}
.item{margin:7px 0;break-inside:avoid}
.row{display:flex;justify-content:space-between;gap:12px}
.r{white-space:nowrap;color:#3b4560}
.muted,.tags{color:#59637e}
section{break-inside:avoid-page}
@media print{body{background:#fff}.bar{display:none}.page{margin:0;width:auto;min-height:0;padding:0;box-shadow:none}}
@media (max-width:820px){.page{width:auto;margin:0;padding:18px}}
</style></head><body>
<div class="bar"><span>Your resume is ready.</span><button onclick="print()">Save as PDF / Print</button></div>
<div class="page">
<header><h1>${esc(b.name)}</h1>${b.role ? `<p class="role">${esc(b.role)}</p>` : ''}<p class="contact">${contact.join(' &nbsp;|&nbsp; ')}</p></header>
${out.join('\n')}
</div></body></html>`;
}

module.exports = { resume };

  });
  def('localparse', function (module, exports, require) {
'use strict';
// Offline, best-effort resume text -> portfolio JSON. No API key needed.
// Works from section headings + patterns (emails, dates, "Issued June 2026", "A | B" project meta lines).
// It will not be perfect on every layout: the web app lets the user fix anything afterwards.

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const HEADINGS = {
  about: ['about', 'aboutme', 'summary', 'professionalsummary', 'profile', 'objective', 'careerobjective', 'introduction'],
  education: ['education', 'academics', 'academicbackground', 'qualifications'],
  skills: ['skills', 'technicalskills', 'skill', 'techstack', 'technologies', 'keyskills', 'coreskills'],
  projects: ['projects', 'project', 'academicprojects', 'personalprojects', 'keyprojects'],
  experience: ['experience', 'workexperience', 'internships', 'internship', 'employment', 'professionalexperience', 'workhistory'],
  certs: ['certifications', 'certification', 'certificates', 'licenses', 'courses', 'licensesandcertifications'],
  achievements: ['achievements', 'awards', 'accomplishments', 'honors', 'honours', 'awardsandachievements'],
  languages: ['languages', 'language', 'languagesknown'],
  contact: ['contact', 'contactme', 'contactinfo', 'contactdetails', 'links'],
  ignore: ['interests', 'hobbies', 'references', 'declaration', 'personaldetails'],
};
const HEADING_LOOKUP = Object.fromEntries(Object.entries(HEADINGS).flatMap(([k, v]) => v.map((h) => [h, k])));

const SKILL_CASE = { javascript: 'JavaScript', typescript: 'TypeScript', html: 'HTML', css: 'CSS', sql: 'SQL', mysql: 'MySQL', 'c++': 'C++', c: 'C', git: 'Git', github: 'GitHub', nodejs: 'Node.js', 'node.js': 'Node.js', reactjs: 'React', aws: 'AWS', php: 'PHP', jsx: 'JSX', mongodb: 'MongoDB', ai: 'AI', ml: 'ML' };
const SOFT = /^(problem[- ]solving|communication|teamwork|team (work|player|collaboration)|leadership|critical thinking|creativity|adaptability|time management|collaboration|analytical( thinking)?|logical thinking|data structures?( and algorithms)?)$/i;

const despace = (l) => (/^(\S ){2,}\S$/.test(l) ? l.replace(/ /g, '') : l);
const key = (l) => despace(l).toLowerCase().replace(/[^a-z]/g, '');
const isSpaced = (l) => /^(\S ){2,}\S$/.test(l);
const titleCase = (s) => s.toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
const clean = (s) => s.replace(/\s+/g, ' ').trim();
const cap = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

function joinWrapped(lines) {
  return lines.reduce((out, l) => (out.endsWith('-') && /^[a-z]/.test(l) ? out + l : out ? `${out} ${l}` : l), '');
}

function isoDate(text) {
  const m = text.match(/\b(?:(January|February|March|April|May|June|July|August|September|October|November|December)\s+(?:(\d{1,2}),?\s+)?)?(\d{4})\b/i);
  if (!m) return undefined;
  if (!m[1]) return m[3];
  const mm = String(MONTHS.indexOf(m[1].toLowerCase()) + 1).padStart(2, '0');
  return m[2] ? `${m[3]}-${mm}-${String(m[2]).padStart(2, '0')}` : `${m[3]}-${mm}`;
}

const asUrl = (u) => (/^https?:\/\//i.test(u) ? u : 'https://' + u).replace(/[.,;)]+$/, '');

function splitSections(lines) {
  const sections = {};
  let cur = null;
  for (const raw of lines) {
    const k = HEADING_LOOKUP[key(raw)];
    const looksLikeHeading = k && raw.length < 45 && (isSpaced(raw) || raw === raw.toUpperCase() || /^[A-Z][a-z]+( [A-Za-z&]+){0,3}:?$/.test(raw));
    if (looksLikeHeading) { cur = k; (sections[cur] ||= []); continue; }
    if (cur) sections[cur].push(raw);
  }
  return sections;
}

function parseEducation(lines) {
  const out = [];
  let buf = [];
  const flush = (yearLine) => {
    const text = [...buf, yearLine].filter(Boolean);
    buf = [];
    if (!text.length) return;
    const years = (yearLine || '').match(/(\d{4})\s*(?:[-–—to]+\s*(\d{4}|present|ongoing|current))?/i);
    const score = text.join(' ').match(/(?:cgpa|gpa)[:\s]*([\d.]+)|(\d{2,3}(?:\.\d+)?)\s*%/i);
    const rest = text.filter((t) => t !== yearLine);
    const inst = rest.find((t) => /universit|college|school|institute|academy|vidyal|polytechnic|iit|nit\b/i.test(t)) || rest[0];
    const degree = rest.find((t) => t !== inst);
    if (!inst) return;
    const e = { institution: cap(clean(inst), 100) };
    if (degree) e.degree = cap(clean(degree), 100);
    if (years && years[2]) { e.start = years[1]; e.end = /\d/.test(years[2]) ? years[2] : 'Present'; }
    else if (years) e.end = years[1];
    if (score) e.score = score[1] ? `CGPA ${score[1]}` : `${score[2]}%`;
    out.push(e);
  };
  for (const l of lines) {
    if (/\b(19|20)\d{2}\b/.test(l) && l.length < 40 && !/universit|college|school/i.test(l)) flush(l);
    else buf.push(l);
  }
  flush(null);
  return out;
}

function parseSkills(lines) {
  const skills = [];
  const strengths = [];
  const seen = new Set();
  for (const l of lines) {
    for (let part of l.split(/[,|•;·●▪]|\s{2,}/)) {
      part = clean(part.replace(/^[-–*]\s*/, ''));
      if (!part) continue;
      if (SOFT.test(part)) { strengths.push(cap(part[0].toUpperCase() + part.slice(1), 40)); continue; }
      const pieces = /^[\w+#.]+\/[\w+#.]+$/.test(part) ? part.split('/') : [part];
      for (let p of pieces) {
        p = p.replace(/\s+(programming|development|language|basics?|fundamentals)$/i, '').replace(/^basic\s+/i, '').replace(/^(programming|development)\s+/i, '').trim();
        if (!p) continue;
        const name = SKILL_CASE[p.toLowerCase()] || (/[A-Z]/.test(p) ? p : p[0].toUpperCase() + p.slice(1));
        if (!seen.has(name.toLowerCase())) { seen.add(name.toLowerCase()); skills.push({ name: cap(name, 40) }); }
      }
    }
  }
  return { skills: skills.slice(0, 30), strengths: [...new Set(strengths)].slice(0, 10) };
}

function parseProjects(lines) {
  const isMeta = (l) => l && /\s\|\s/.test(l) && l.length < 130;
  const projects = [];
  let cur = null;
  const push = () => { if (cur) projects.push(cur); cur = null; };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (isMeta(lines[i + 1]) && !isMeta(l)) {
      push();
      const [head, ...tail] = l.split(/\s[—–]\s/);
      cur = { title: cap(clean(head), 80), meta: [tail.join(' — '), lines[i + 1]].filter(Boolean).join(' · ').replace(/\s\|\s/g, ' · '), desc: [] };
      i++;
      continue;
    }
    if (!cur) cur = { title: cap(clean(l), 80), desc: [] };
    else cur.desc.push(l);
  }
  push();
  return projects.map((p) => {
    const rest = [];
    let link;
    for (const d of p.desc) {
      const m = d.match(/(https?:\/\/\S+|(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/\S*)?)/i);
      if (m && /^(website|link|url|live|demo|github|code|repo)?:?\s*\S+$/i.test(d.trim())) { link ||= { url: asUrl(m[1]), kind: /github/i.test(m[1]) ? 'code' : 'live' }; continue; }
      rest.push(d);
    }
    const out = { title: p.title };
    if (p.meta) out.subtitle = cap(p.meta, 100);
    if (rest.length) out.description = cap(joinWrapped(rest), 600);
    if (link) { out.link = { ...link, label: link.url.replace(/^https?:\/\//, '') }; }
    return out;
  });
}

function parseCerts(lines) {
  const out = [];
  let buf = [];
  const dateRe = /[\s—–-]*\b(Issued|Earned|Completed)\b\s+((?:[A-Z][a-z]+ )?(?:\d{1,2},? )?\d{4})\s*$/;
  for (const l of lines) {
    buf.push(l);
    const text = joinWrapped(buf);
    const m = text.match(dateRe);
    if (m) {
      const title = text.slice(0, m.index).replace(/[\s—–-]+$/, '');
      const issuer = title.split(/\s[—–-]\s/)[0];
      const c = { title: cap(title, 140), verb: m[1], date: isoDate(m[2]) };
      if (issuer && issuer !== title) c.issuer = cap(issuer, 60);
      out.push(c);
      buf = [];
    }
  }
  if (buf.length) { // undated leftovers: one certification per line
    for (const l of buf) { const iss = l.split(/\s[—–-]\s/); out.push({ title: cap(l, 140), ...(iss.length > 1 ? { issuer: cap(iss[0], 60) } : {}) }); }
  }
  return out;
}

function parseAchievements(lines) {
  const items = [];
  for (const l of lines) {
    const prev = items[items.length - 1];
    const line = l.replace(/^[-–•*●▪]\s*/, '');
    if (prev && !/^[•\-*●▪]/.test(l) && (/[,\-–&]$/.test(prev) || /^[a-z]/.test(line))) items[items.length - 1] = `${prev}${prev.endsWith('-') ? '' : ' '}${line}`;
    else items.push(line);
  }
  return items.slice(0, 10).map((t) => {
    const text = cap(t.replace(/((?:cgpa|gpa)[:\s]*\d+(?:\.\d+)?|\b\d+(?:\.\d+)?\s*%)/gi, '**$1**'), 240);
    const icon = /cgpa|gpa|rank|topper|first/i.test(t) ? 'trophy' : /scored|%|percent/i.test(t) ? 'chart' : /certif|course/i.test(t) ? 'medal' : /develop|built|project/i.test(t) ? 'code' : 'star';
    return { text, icon };
  });
}

function parseLocal(rawLines) {
  const lines = rawLines.map(clean).filter(Boolean);
  const all = lines.join('\n');

  // letter-spaced lines that are not section headings are usually the name / role banner
  const banner = lines.filter((l) => isSpaced(l) && !HEADING_LOOKUP[key(l)]);
  const sections = splitSections(lines.filter((l) => !banner.includes(l)));

  const email = (all.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/) || [])[0];
  const phone = (all.match(/(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?){2,4}\d{2,5}/g) || []).map(clean).find((p) => p.replace(/\D/g, '').length >= 10 && p.replace(/\D/g, '').length <= 13 && !/^(19|20)\d{2}/.test(p));
  const linkedin = (all.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s|,;]+/i) || [])[0];
  const github = (all.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s|,;]+/i) || [])[0];

  let name = banner[0] ? titleCase(despace(banner[0])) : '';
  if (!name) {
    const first = lines.find((l) => !HEADING_LOOKUP[key(l)] && !/@|\d{5}/.test(l) && /^[\p{L} .'-]{3,50}$/u.test(l));
    name = first ? (first === first.toUpperCase() ? titleCase(first) : first) : '';
  }
  if (!name && email) name = titleCase(email.split('@')[0].replace(/[\d._-]+/g, ' ').trim());
  name = name || 'Your Name';

  const education = parseEducation(sections.education || []);
  let role = banner[1] ? despace(banner[1]) : '';
  if (role && !/\s/.test(role) && education[0] && education[0].degree) role = `${education[0].degree} ${role}`;
  role = role ? role.replace(/(^|\s)(\p{L})/gu, (_, a, b) => a + b.toUpperCase()) : '';

  const { skills, strengths } = parseSkills(sections.skills || []);
  const projectLines = [...(sections.projects || []), ...(sections.experience || [])];
  const aboutText = joinWrapped(sections.about || []);
  const langs = (sections.languages || []).flatMap((l) => l.split(/[,|•;·]/)).map(clean).filter((l) => /^[A-Za-z ]{2,20}$/.test(l)).slice(0, 8);

  const data = {
    version: 1,
    basics: { name: cap(name, 80) },
    contact: {},
  };
  if (role) data.basics.role = cap(role, 120);
  if (aboutText) { data.basics.summary = cap(aboutText.split(/(?<=[.!?])\s/)[0], 500); data.about = { body: cap(aboutText, 1500) }; }
  if (langs.length) data.basics.languages = langs;
  const loc = all.match(/(?:location|address|city)\s*[:\-]\s*([^\n]+)/i);
  if (loc) data.basics.location = cap(clean(loc[1]), 80);
  if (email) data.contact.email = email;
  if (phone) data.contact.phone = phone;
  if (linkedin) data.contact.linkedin = asUrl(linkedin);
  if (github) data.contact.github = asUrl(github);
  if (education.length) data.education = education.slice(0, 6);
  if (skills.length) data.skills = skills;
  if (strengths.length) data.strengths = strengths;
  const projects = parseProjects(projectLines);
  if (projects.length) data.projects = projects.slice(0, 12);
  const certs = parseCerts(sections.certs || []);
  if (certs.length) data.certifications = certs.slice(0, 12);
  const wins = parseAchievements(sections.achievements || []);
  if (wins.length) data.achievements = wins;
  if (!Object.keys(data.contact).length) delete data.contact;
  return data;
}

module.exports = { parseLocal };

  });
  def('pdftext', function (module, exports, require) {
'use strict';
// PDF -> array of text lines in reading order, without a worker or native tools.
// Handles two-column layouts by splitting page items at the widest vertical gutter.

async function loadPdfjs() {
  if (typeof window !== 'undefined') { // browser build: vendored next to the page
    const pdfjs = await import(new URL('vendor/pdf.min.mjs', document.baseURI).href);
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('vendor/pdf.worker.min.mjs', document.baseURI).href;
    return pdfjs;
  }
  return import('pdfjs-dist/legacy/build/pdf.mjs');
}

async function pdfLines(buffer) {
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer), useSystemFonts: true, isEvalSupported: false }).promise;
  const lines = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const width = page.view[2] - page.view[0];
    const items = (await page.getTextContent()).items
      .filter((i) => i.str && i.str.trim())
      .map((i) => ({ s: i.str, x: i.transform[4], y: i.transform[5], w: i.width, h: Math.abs(i.transform[3]) || 10 }));
    if (!items.length) continue;

    for (const col of splitColumns(items, width)) lines.push(...toLines(col));
  }
  return lines;
}

/** Find a gutter: an x-range no item crosses, wide enough and with real content on both sides. */
function splitColumns(items, width) {
  const edges = [...items].sort((a, b) => a.x - b.x);
  let best = null;
  let reach = edges[0].x + edges[0].w;
  for (let i = 1; i < edges.length; i++) {
    const gap = edges[i].x - reach;
    if (gap > width * 0.04 && edges[i].x > width * 0.2 && edges[i].x < width * 0.8 && (!best || gap > best.gap)) best = { gap, at: edges[i].x };
    reach = Math.max(reach, edges[i].x + edges[i].w);
  }
  if (!best) return [items];
  const left = items.filter((i) => i.x < best.at - 1);
  const right = items.filter((i) => i.x >= best.at - 1);
  return left.length >= items.length * 0.15 && right.length >= items.length * 0.15 ? [left, right] : [items];
}

function toLines(items) {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const rows = [];
  for (const it of sorted) {
    const row = rows.find((r) => Math.abs(r.y - it.y) < it.h * 0.45);
    row ? row.items.push(it) : rows.push({ y: it.y, items: [it] });
  }
  return rows
    .sort((a, b) => b.y - a.y)
    .map((r) => {
      r.items.sort((a, b) => a.x - b.x);
      let out = '';
      let end = null;
      for (const it of r.items) {
        if (end !== null && it.x - end > it.h * 0.15 && !out.endsWith(' ')) out += ' ';
        out += it.s;
        end = it.x + it.w;
      }
      return out.replace(/\s+/g, ' ').trim();
    })
    .filter(Boolean);
}

module.exports = { pdfLines };

  });
  def('parse', function (module, exports, require) {
'use strict';
// Resume (PDF bytes or plain text) -> portfolio JSON. Runs entirely offline / in the browser.
// The result is pruned to the schema so a slightly-off parse still yields a usable draft.

const schema = require('../schema/portfolio.schema.json');
const { pdfLines } = require('./pdftext');
const { parseLocal } = require('./localparse');

function prune(value, s, root = schema) {
  if (s && s.$ref) s = s.$ref.replace(/^#\//, '').split('/').reduce((o, k) => o[k], root);
  if (!s) return value;
  if (s.type === 'string') {
    if (typeof value !== 'string') return undefined;
    let v = value.trim();
    if (s.maxLength && v.length > s.maxLength) v = v.slice(0, s.maxLength);
    if (s.pattern && !new RegExp(s.pattern).test(v)) return undefined;
    if (s.enum && !s.enum.includes(v)) return undefined;
    if (s.format === 'email' && !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(v)) return undefined;
    return v || undefined;
  }
  if (s.type === 'integer' || s.type === 'number') return typeof value === 'number' ? value : undefined;
  if (s.type === 'array') {
    if (!Array.isArray(value)) return undefined;
    let arr = value.map((v) => prune(v, s.items, root)).filter((v) => v !== undefined);
    if (s.maxItems) arr = arr.slice(0, s.maxItems);
    if (s.minItems && arr.length < s.minItems) return undefined;
    return arr.length ? arr : undefined;
  }
  if (s.type === 'object') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
    const out = {};
    for (const [k, ps] of Object.entries(s.properties || {})) {
      if (value[k] === undefined) continue;
      const v = prune(value[k], ps, root);
      if (v !== undefined) out[k] = v;
    }
    for (const k of s.required || []) if (out[k] === undefined) return undefined;
    return Object.keys(out).length ? out : undefined;
  }
  return value;
}

/** parseResume({ pdf: ArrayBuffer|Buffer }) or parseResume({ text }) -> { data } */
async function parseResume({ pdf, text }) {
  if (!pdf && !text) throw new Error('Nothing to parse.');
  const lines = pdf ? await pdfLines(pdf) : text.split(/\r?\n/);
  if (lines.join('').trim().length < 30) throw new Error('No readable text found. This looks like a scanned/image PDF. Please fill the form by hand or upload a text-based PDF.');
  const data = prune(parseLocal(lines), schema);
  if (!data || !data.basics) throw new Error('Could not read this resume. Please fill the form by hand.');
  data.version = 1;
  return { data };
}

module.exports = { parseResume, prune };

  });
  globalThis.Portfolio = {
    render: req('render').render,
    resume: req('resume').resume,
    validate: function (d) { return req('validate').validate(d, req('portfolio.schema')); },
    parseResume: req('parse').parseResume,
  };
})();
