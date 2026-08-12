(function () {
  const script = document.currentScript;
  const userId = script.dataset.userId;

  // We can fetch user config later using userId, for now using default
  const theme = "dark";
  let assistantConfig = null;
  const assistantName = assistantConfig?.assistantName || "Sana";

  const scriptUrl = new URL(script.src);
  const baseUrl = scriptUrl.origin;

  // load css file
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${baseUrl}/assistant.css`;
  document.head.appendChild(link);

  // Wrapper
  const container = document.createElement("div");
  container.className = `sana-assistant-wrapper theme-${theme}`;
  document.body.appendChild(container);

  // Popup
  const popup = document.createElement("div");
  popup.className = `sana-popup`;

  popup.innerHTML = `
    <div class="sana-popup-content">
      <div class="sana-top-gradient-circle"></div>
      <h2 class="sana-assistant-title">Hello! I'm ${assistantName} AI</h2>
      <p class="sana-assistant-desc">Your smart voice assistant.<br>Ask anything about your website.</p>
      
      <div class="sana-tap-to-speak">Tap button to Speak</div>
      
      <div class="sana-mic-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="22"></line>
        </svg>
      </div>
    </div>
  `;
  container.appendChild(popup);

  // Floating button
  const button = document.createElement("div");
  button.className = "sana-widget-btn";
  button.innerHTML = `
    <div class="sana-widget-btn-inner">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="5" width="12" height="8" rx="2" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"></rect>
        <rect x="7" y="9" width="12" height="8" rx="2" stroke="white" stroke-width="1.5"></rect>
        <path d="M13 11l0 10l2.5-3.5l4 0z" fill="white" stroke="white" stroke-width="1" stroke-linejoin="miter"></path>
      </svg>
    </div>
  `;
  container.appendChild(button);

  // Toggle logic
  let isOpen = false;
  button.addEventListener("click", () => {
    isOpen = !isOpen;
    if (isOpen) {
      popup.classList.add("sana-popup-open");
    } else {
      popup.classList.remove("sana-popup-open");
    }
  });

  //losd assistant

  const loadAssistant = async () => {
    try {
      const res = await fetch(
        `http://localhost:5500/api/v1/assistant/assistant-config/${userId}`,
      );

      const data = await res.json();
      console.log(">>>>>>>>>", data);
      if (data.success) {
        assistantConfig = data.user;
        applyConfig();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyConfig = () => {
    if (!assistantConfig) return;

    // Apply theme
    popup.className = `sana-popup theme-${assistantConfig.theme || "dark"}`;
    container.className = `sana-assistant-wrapper theme-${assistantConfig.theme || "dark"}`;

    const title = popup.querySelector(".sana-assistant-title");
    const desc = popup.querySelector(".sana-assistant-desc");

    if (title && assistantConfig.assistantName) {
      title.textContent = `Hello! I'm ${assistantConfig.assistantName} AI`;
    }

    // Only update description if greetingMsg is defined in config
    if (desc && assistantConfig.greetingMsg) {
      desc.innerHTML = assistantConfig.greetingMsg;
    }
  };

  loadAssistant();
})();
