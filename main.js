function addOptions() {
  const optionsHTML = `
      <div class="options hidden">
          <div class="options-header">
              <div class="options-title">
                  <i class="fa-solid fa-gear"></i> Options
              </div>
              <button class="options-close-button">
                  <i class="fa-solid fa-xmark"></i>
              </button>
          </div>

          <div class="options-body">
              <div class="options-item">
                  <label for="options-font-size">Font Size</label>
                  <select id="options-font-size">
                      <option value="14">14</option>
                      <option value="16" selected>16</option>
                      <option value="18">18</option>
                      <option value="20">20</option>
                      <option value="22">22</option>
                      <option value="24">24</option>
                      <option value="26">26</option>
                      <option value="28">28</option>
                  </select>
              </div>

              <div class="options-item">
                  <label for="options-font-family">Font Family</label>
                  <select id="options-font-family">
                      <option value="Poppins">Poppins</option>
                      <option value="Arial">Arial</option>
                      <option value="Open Sans" selected>Open Sans</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                  </select>
              </div>
          </div>

          <div class="options-footer">
              <button class="options-reset-button"><i class="fa-solid fa-rotate-right"></i> Reset</button>
              <button class="options-save-button"><i class="fa-solid fa-floppy-disk"></i> Save</button>
          </div>
      </div>
  `;
  document.body.insertAdjacentHTML('beforeend', optionsHTML);

  const readingContent = document.querySelector('.text-left');
  
  const optionClose = document.querySelector('.options-close-button');
  optionClose.addEventListener('click', () => document.querySelector('.options').classList.add('hidden'));
  
  const optionSave = document.querySelector('.options-save-button');
  optionSave.addEventListener('click', () => {
    localStorage.setItem('fontSize', document.querySelector('#options-font-size').value);
    localStorage.setItem('fontFamily', document.querySelector('#options-font-family').value);
    document.querySelector('.options').classList.add('hidden');
  });
  
  const optionReset = document.querySelector('.options-reset-button');
  optionReset.addEventListener('click', () => {
    localStorage.removeItem('fontSize');
    localStorage.removeItem('fontFamily');
    loadOptions();
  });
  
  function loadOptions() {
    const fontSize = localStorage.getItem('fontSize') || '16';
    const fontFamily = localStorage.getItem('fontFamily') || 'Open Sans';
    document.querySelector('#options-font-size').value = fontSize;
    document.querySelector('#options-font-family').value = fontFamily;
    if (readingContent) {
      readingContent.style.fontSize = `${fontSize}px`;
      readingContent.style.fontFamily = fontFamily;
    } else {
      console.error('No element found with the class .text-left');
    }
  }
  
  document.querySelector('#options-font-size').addEventListener('change', (e) => {
    if (readingContent) {
      readingContent.style.fontSize = `${e.target.value}px`;
    }
  });
  document.querySelector('#options-font-family').addEventListener('change', (e) => {
    if (readingContent) {
      readingContent.style.fontFamily = e.target.value;
    }
  });
  
  loadOptions();
  
  const actionListIcon = document.querySelector('.action_list_icon');
  if (actionListIcon) {
      const listItems = actionListIcon.querySelectorAll('li');
      if (listItems.length >= 2) {
          listItems[0].remove();
          listItems[1].remove();
      }
  
      const newListItem = document.createElement('li');
      newListItem.innerHTML = '<a class="btn-options"><i class="icon ion-md-settings"></i></a>';
      actionListIcon.prepend(newListItem);
  
      const btnOptions = newListItem.querySelector('.btn-options');
      if (btnOptions) {
          btnOptions.addEventListener('click', function() {
            const optionElement = document.querySelector('.options');
            if (optionElement) {
                optionElement.classList.toggle('hidden');
      
                const rect = btnOptions.getBoundingClientRect();
                optionElement.style.top = `${rect.bottom + 10}px`;
                optionElement.style.left = `${rect.right - optionElement.offsetWidth}px`; 
            } else {
                console.error("No options element found!");
            }
          });
      }
  }
}

function waitLoad(msgHTML) {
  const apply = () => {
    const warningElement = document.querySelector('.chapter-warning.alert.alert-warning');
    if (warningElement) {
        Object.assign(warningElement.style, {backgroundColor: "#0000001f", borderColor: "#00000012"});
        warningElement.innerHTML = msgHTML;
    }
    
    addOptions();
    
    var _a = document.querySelector('.c-top-sidebar'); _a && (_a.style.display = "none");
    _a = document.querySelector('.text-left'); _a && (_a.style.userSelect = "none");
    _a = document.querySelector('#text-chapter-toolbar'); _a && (_a.style.display = "none");
    
    jQuery(function($) {$('.reading-content').off('click');});
  };
  
  const observer = new MutationObserver(() => {
    const element = document.querySelector('.reading-content');
    if (element) {
      apply();
      observer.disconnect();
    }
  });
  
  observer.observe(document.body, {childList: true, subtree: true});
};

var link = document.createElement('link');
link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/gh/quitogtl/quitogtl_luminary@1.0.2/style.css';
document.head.appendChild(link);

const fontAwesomeScript = document.createElement('script');
fontAwesomeScript.src = "https://kit.fontawesome.com/f4dbd03345.js";
fontAwesomeScript.crossOrigin = "anonymous";
document.body.appendChild(fontAwesomeScript);

const defaultMessage = '<a href="https://discord.com/invite/mVzkbcGHGU">Join the Luminary Novels Discord</a>';
waitLoad(defaultMessage);