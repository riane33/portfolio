import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const tabs = [
  { name: 'About me'},
  { name: 'Projects'},
  { name: 'Programs used'},
  { name: "Let's connect"},
];

const finalReportTabs = [
  { name: 'Document' },
];

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFinalReportTab, setActiveFinalReportTab] = useState(null);
  const sectionRefs = useRef([]);
  // Accordion state for practicum overview
  const [openDropdown, setOpenDropdown] = useState(null);

  // Sidebar expand/collapse state
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Navigation tree state for MY-PORTFOLIO
  const [portfolioOpen, setPortfolioOpen] = useState(true); // open by default
  // Navigation tree state for Final Report
  const [finalReportOpen, setFinalReportOpen] = useState(false);

  // Modal state for Presentation of Output
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Carousel state for Presentation of Output
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselSlides = [
    {
      number: 1,
      image: '/Projects_images/Color_game.png',
      description: 'This project is a color game that allows you to guess the color of the text. It is a simple game that is easy to play and fun to play.'
    },
    {
      number: 2,
      image: '/Projects_images/Flight_Info.png',
      description: 'This is a simple flight information system that allows you to input for your flights and view their information.'
    },
    {
      number: 3,
      image: '/Projects_images/Student_survivor.png',
      description: 'This project is a student survival game that allows you to survive in a school environment. It is a simple game that is easy to play and fun to play.'
    },
    {
      number: 4,
      image: '/Projects_images/burger.png',
      description: 'This project is a burger ordering system that allows you to order burgers and view their information.'
    },
    {
      number: 5,
      image: '/Projects_images/Quick_math.png',
      description: 'This is a simple math that allows you to solve quick math problems, specifically the tuition fee.'
    },
    {
      number: 6,
      image: '/Projects_images/Billing.png',
      description: 'This project is a billing system that allows how much the total amount of the bill is.'
    },
    {
      number: 7,
      image: '/Projects_images/stoplight.png',
      description: 'This project is a stoplight system that allows you to control the traffic lights manually.'
    },
    {
      number: 8,
      image: '/Projects_images/stoplightV2.png',
      description: 'This project is a stoplight system that allows you to control the traffic lights automatically via smartphone, this is also the continuation of the previous project.'
    },
    {
      number: 9,
      image: '/Projects_images/DeLuna.png',
      description: 'This project is a hotel reservation system that allows you to reserve a room in a hotel.'
    },
    {
      number: 10,
      image: '/Projects_images/CampusNavi.png',
      description: 'This project is a campus navigation system that allows you to navigate the campus of the school via wheelchair and it can automaticall detect if the user with locomotor disability has fallen, issues or problems regarding the path.'
    },
    {
      number: 11,
      image: '/Projects_images/RP.png',
      description: 'This project is a sample layout of the launchpad where you can use CRUD to each additional website you add.'
    },
    {
      number: 12,
      image: '/Projects_images/AUTO.png',
      description: 'This project creates a request of each user and will be approve by each specific role, the higher ups will have the final decision if the request is valid for creation by the developers.'
    },
  ];
  const goToPrevSlide = () => setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  const goToNextSlide = () => setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  // Make sure sectionRefs always matches tabs
  if (sectionRefs.current.length !== tabs.length) {
    sectionRefs.current = tabs.map((_, i) => sectionRefs.current[i] || React.createRef());
  }

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.current.map(ref => {
        const rect = ref.current.getBoundingClientRect();
        return Math.abs(rect.top - 80);
      });
      const minOffset = Math.min(...offsets);
      const idx = offsets.indexOf(minOffset);
      setActiveTab(idx);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section on tab click
  const handleTabClick = idx => {
    sectionRefs.current[idx].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Matrix code rain effect as a React component
  function MatrixRain() {
    const canvasRef = useRef(null);
    const frameCount = useRef(0);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      const letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const fontSize = 18;
      const columns = () => Math.floor(canvas.width / fontSize);
      let drops = Array(columns()).fill(1);

      function draw() {
        ctx.fillStyle = 'rgba(30,30,47,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px monospace';
        ctx.fillStyle = '#00FF41';
        frameCount.current++;
        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          // Only increment drop every 6 frames for super slow effect
          if (frameCount.current % 6 === 0) {
            drops[i]++;
          }
        }
        animationFrameId = requestAnimationFrame(draw);
      }
      draw();

      function handleResize() {
        drops = Array(columns()).fill(1);
      }
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-main relative overflow-hidden">
      {/* Matrix Code Rain Background */}
      <MatrixRain />
      {/* Left vertical tab navigation */}
      <aside className="h-screen w-64 bg-secondary flex flex-col justify-start items-stretch fixed top-0 left-0 z-20">
        {/* Profile section */}
        <div className="flex flex-col items-center justify-center pt-8 pb-6 px-4">
          <div className="w-24 h-24 rounded-full bg-accent-sky mb-3 overflow-hidden flex items-center justify-center">
            <img src="/Riane_Pic.png" alt="Riane Rivera" className="w-full h-full object-cover" />
          </div>
          <div className="text-accent text-xl font-bold text-center">Riane Rivera</div>
        </div>
        <nav className="flex flex-col mt-4 space-y-1">
          {/* MY-PORTFOLIO tree */}
          <button
            className="flex items-center justify-start text-lg font-bold text-main mb-2 tracking-widest px-2 focus:outline-none select-none w-full"
            onClick={() => setPortfolioOpen((open) => !open)}
            aria-expanded={portfolioOpen}
          >
            <svg
              className={`w-5 h-5 mr-2 transition-transform duration-200 ${portfolioOpen ? '' : '-rotate-90'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
            <span className={portfolioOpen ? 'text-white' : 'text-accent'}>MY-PORTFOLIO</span>
          </button>
          {portfolioOpen && (
            <div>
              {tabs.map((tab, idx) => (
                <button
                  key={tab.name}
                  className={`w-full text-left pl-8 pr-2 py-3 text-lg font-semibold transition-colors duration-150 flex items-center gap-x-2 ${
                    activeTab === idx && activeFinalReportTab === null
                      ? ''
                      : 'bg-secondary text-accent hover:bg-accent-sky hover:text-main'
                  }`}
                  style={activeTab === idx && activeFinalReportTab === null ? { background: '#232531', color: '#fff' } : {}}
                  onClick={() => { setActiveTab(idx); setActiveFinalReportTab(null); }}
                >
                  <img src="/tab.png" alt="Tab icon" className="w-6 h-6 inline-block mr-1 -ml-2" />
                  {tab.name === 'About me' && (
                    <img src="/about_me.png" alt="About me icon" className="w-8 h-8 inline-block mr-1 -ml-2" />
                  )}
                  {tab.name === 'Projects' && (
                    <img src="/projects.png" alt="Projects icon" className="w-8 h-8 inline-block mr-1 -ml-2" />
                  )}
                  {tab.name === 'Programs used' && (
                    <img src="/programs.png" alt="Programs used icon" className="w-8 h-8 inline-block mr-1 -ml-2" />
                  )}
                  {tab.name === "Let's connect" && (
                    <img src="/contact.png" alt="Let's connect icon" className="w-10 h-10 inline-block mr-1 -ml-2" />
                  )}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          )}
            {/* Final Report tree */}
            <button
              className="flex items-center justify-start text-lg font-bold text-main mb-2 tracking-widest px-2 focus:outline-none select-none w-full"
              onClick={() => setFinalReportOpen((open) => !open)}
              aria-expanded={finalReportOpen}
            >
              <svg
                className={`w-5 h-5 mr-2 transition-transform duration-200 ${finalReportOpen ? '' : '-rotate-90'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
              <span className={finalReportOpen ? 'text-white' : 'text-accent'}>Final Report</span>
            </button>
            {finalReportOpen && (
              <div>
                {finalReportTabs.map((tab, idx) => (
                  <button
                    key={tab.name}
                    className={`w-full text-left pl-8 pr-2 py-3 text-lg font-semibold transition-colors duration-150 flex items-center gap-x-2 ${
                      activeFinalReportTab === idx
                        ? ''
                        : 'bg-secondary text-accent hover:bg-accent-sky hover:text-main'
                    }`}
                    style={activeFinalReportTab === idx ? { background: '#232531', color: '#fff' } : {}}
                    onClick={() => { setActiveFinalReportTab(idx); setActiveTab(null); }}
                  >
                    <img src="/tab.png" alt="Tab icon" className="w-6 h-6 inline-block mr-1 -ml-2" />
                    <img src="/about_me.png" alt="Document icon" className="w-8 h-8 inline-block mr-1 -ml-2" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            )}
        </nav>
      </aside>
      {/* Main content area */}
      <main className="flex-1 flex flex-col p-8 ml-64">
        {/* Main Portfolio Tabs */}
        {activeTab === 0 && activeFinalReportTab === null && (
          <div className="text-center w-full">
            <h1 className="text-6xl font-bold mb-4 text-main">Riane Michael D. Rivera</h1>
            <h2 className="text-4xl font-bold text-accent mb-8">INFORMATION TECHNOLOGY STUDENT</h2>
            <p className="text-lg text-main max-w-2xl mx-auto">I am Riane Michael D. Rivera, an Information Technology Student from Mapua Malayan Colleges Laguna. I am a passionate and dedicated student who is always looking for new challenges and opportunities to grow. I am a quick learner and I am always looking for new ways to improve my skills.</p>
          </div>
        )}
        {activeTab === 1 && activeFinalReportTab === null && (
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 text-main text-center">Projects</h2>
            <div
              className="relative w-full max-w-4xl h-[60vh] rounded-2xl flex flex-col items-center justify-center transition-colors duration-200 bg-[#48a9d1] p-8"
              style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.15)' }}
            >
              <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="mb-8 flex items-center justify-center w-full">
                    {carouselSlides[currentSlide].image ? (
                      <img src={carouselSlides[currentSlide].image} alt={`Project ${carouselSlides[currentSlide].number}`} className="max-h-[40vh] max-w-full rounded-2xl shadow-lg object-contain p-2 bg-white" style={{background:'#fff'}} />
                    ) : (
                      <span className="text-8xl font-bold" style={{ color: '#fff' }}>{carouselSlides[currentSlide].number}</span>
                    )}
                  </div>
                  <div className="text-xl text-center px-8 max-w-2xl bg-opacity-80" style={{ color: '#fff' }}>
                    {carouselSlides[currentSlide].description}
                  </div>
                </div>
              </div>
              {/* Carousel Arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-lg z-10"
                style={{fontSize: '2rem'}}
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <span aria-hidden="true" style={{ color: '#06b6d4' }}>&#8592;</span>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-lg z-10"
                style={{fontSize: '2rem'}}
                onClick={goToNextSlide}
                aria-label="Next slide"
              >
                <span aria-hidden="true" style={{ color: '#06b6d4' }}>&#8594;</span>
              </button>
            </div>
          </div>
        )}
        {activeTab === 2 && activeFinalReportTab === null && (
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 text-main text-center">Programs used</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-lg text-main max-w-3xl mx-auto">
              <li className="flex items-center gap-3"><span role="img" aria-label="React">⚛️</span> React + Vite</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="Laravel">🅻</span> Laravel</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="SQL Server">🗄️</span> SSMS 2021</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="Python">🐍</span> Python</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="MS Access">🗃️</span> MS Access</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="C#">#️⃣</span> C#</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="C++">➕➕</span> C++</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="XAMPP">🦄</span> XAMPP</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="PHPMyAdmin">🐘</span> PHPMyAdmin</li>
              <li className="flex items-center gap-3"><span role="img" aria-label="ASP.NET">🌐</span> ASP.NET</li>
              <li className="flex items-center gap-3"><span role="img" aria-label=".NET">💠</span> .NET</li>
            </ul>
          </div>
        )}
        {activeTab === 3 && activeFinalReportTab === null && (
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 text-main text-center">Let's connect</h2>
            <p className="text-lg text-main max-w-2xl mx-auto">[Add your contact information, social links, or a contact form here]</p>
          </div>
        )}
        {/* Final Report Tabs */}
        {activeFinalReportTab === 0 && (
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 text-main text-center">Final Report Document</h2>
            <p className="text-lg text-main max-w-2xl mx-auto">[Add your final report document content here]</p>
          </div>
        )}
      </main>
      {/* Right vertical tab navigation removed */}
    </div>
  );
}

export default App;