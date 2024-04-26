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
