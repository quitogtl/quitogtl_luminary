function addOptions() {
  const actionListIcon = document.querySelector('.action_list_icon');
  if (actionListIcon) {
      const listItems = actionListIcon.querySelectorAll('li');
      if (listItems.length >= 2) {
          listItems[0].remove();
          listItems[1].remove();
      }
  
      const newListItem = document.createElement('li');
      newListItem.innerHTML = '<a class="btn-options"><i class="icon ion-md-settings"></i></a>';
      actionListIcon.appendChild(newListItem);
  
      const btnOptions = newListItem.querySelector('.btn-options');
      if (btnOptions) {
          btnOptions.addEventListener('click', function() {
              const optionsElement = document.querySelector('.options');
              optionsElement.classList.toggle('hidden');
              optionsElement.style.top = `${btnOptions.offsetTop + btnOptions.offsetHeight + 10}px`;
              optionsElement.style.left = `${btnOptions.offsetLeft + btnOptions.offsetWidth - optionsElement.offsetWidth}px`;
          });
      }
  }

  const optionButton = document.querySelector('.btn-options'); 
  optionButton.addEventListener('click', function() {
    const optionElement = document.querySelector('.options');
    optionElement.classList.toggle('hidden');
    optionElement.style.top = `${optionButton.offsetTop + optionButton.offsetHeight + 10}px`;
    optionElement.style.left = `${optionButton.offsetLeft + optionButton.offsetWidth - optionElement.offsetWidth}px`;
  });
}

function waitLoad(msgHTML) {
  const apply = () => {
          const warningElement = document.querySelector('.chapter-warning.alert.alert-warning');
          if (warningElement) {
              Object.assign(warningElement.style, {backgroundColor: "#0000001f", borderColor: "#00000012"});
              warningElement.innerHTML = msgHTML;
          }
    
    var _a = document.querySelector('.c-top-sidebar'); _a && (_a.style.display = "none");
    _a = document.querySelector('.text-left'); _a && (_a.style.userSelect = "none");
    _a = document.querySelector('#text-chapter-toolbar'); _a && (_a.style.display = "none");
    
    jQuery(function($) {$('.reading-content').off('click');});

    addOptions();
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

const defaultMessage = '<a href="https://discord.com/invite/mVzkbcGHGU">Join the Luminary Novels Discord</a>';
waitLoad(defaultMessage);
