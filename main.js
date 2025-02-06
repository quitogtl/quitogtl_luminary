function addOptions() {
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = 'https://cdn.jsdelivr.net/gh/quitogtl/quitogtl_luminary@1.0.21/style.css';
	document.head.appendChild(link);
	
	const optionsHTML = `
	<div class="options-container hidden">
		<div class="options">
			<div class="options-header">
				<div class="options-title">
					<i class="icon ion-md-settings"></i> Options
				</div>
				<button class="options-close-button">
					<i class="icon ion-md-close"></i>
				</button>
			</div>
			<div class="options-body">
				<div class="options-item">
					<label for="options-font-size">Font Size</label>
					<select id="options-font-size">
						<option value="14">14</option>
						<option value="16">16</option>
						<option value="18">18</option>
						<option value="20" selected>20</option>
						<option value="22">22</option>
						<option value="24">24</option>
						<option value="26">26</option>
						<option value="28">28</option>
					</select>
				</div>
				<div class="options-item">
					<label for="options-font-family">Font Family</label>
					<select id="options-font-family">
						<option value="Poppins" selected>Poppins</option>
						<option value="Arial">Arial</option>
						<option value="Open Sans">Open Sans</option>
						<option value="Roboto">Roboto</option>
						<option value="Georgia">Georgia</option>
						<option value="Times New Roman">Times New Roman</option>
					</select>
				</div>
				<div class="options-item">
					<label for="options-line-height">Line Height</label>
					<select id="options-line-height">
						<option value="1.0">1.0x</option>
						<option value="1.25">1.25x</option>
						<option value="1.5" selected>1.5x</option>
						<option value="1.75">1.75x</option>
						<option value="2.0">2.0x</option>
						<option value="2.25">2.25x</option>
						<option value="2.5">2.5x</option>
						<option value="2.75">2.75x</option>
						<option value="3.0">3.0x</option>
					</select>
				</div>
			</div>
			<div class="options-footer">
				<button class="options-reset-button">
					<i class="icon ion-ios-refresh"></i> Reset
				</button>
				<button class="options-save-button">
					<i class="icon ion-md-save"></i> Save
				</button>
			</div>
		</div>
	</div>
	`;

    document.body.insertAdjacentHTML('beforeend', optionsHTML);

    const readingContent = document.querySelector('.text-left');
	if (readingContent) {
        readingContent.classList.add('custom');
    }

    const optionClose = document.querySelector('.options-close-button');
    optionClose.addEventListener('click', () => document.querySelector('.options-container').classList.add('hidden'));

    const optionSave = document.querySelector('.options-save-button');
    optionSave.addEventListener('click', () => {
        localStorage.setItem('fontSize', document.querySelector('#options-font-size').value);
        localStorage.setItem('fontFamily', document.querySelector('#options-font-family').value);
		localStorage.setItem('lineHeight', document.querySelector('#options-line-height').value);

        document.querySelector('.options-container').classList.add('hidden');
    });

    const optionReset = document.querySelector('.options-reset-button');
    optionReset.addEventListener('click', () => {
        localStorage.removeItem('fontSize');
        localStorage.removeItem('fontFamily');
		localStorage.removeItem('lineHeight');
        loadOptions();
    });

	function loadOptions() {
		// Retrieve settings from localStorage or use default values
		const fontSize = localStorage.getItem('fontSize') || '20';
		const fontFamily = localStorage.getItem('fontFamily') || 'Poppins';
		const lineHeight = localStorage.getItem('lineHeight') || '1.5';

		// Update the select elements in the options panel
		document.querySelector('#options-font-size').value = fontSize;
		document.querySelector('#options-font-family').value = fontFamily;
		document.querySelector('#options-line-height').value = lineHeight;

		// Set CSS properties on the root HTML element
		document.documentElement.style.setProperty('--text-font-size', `${fontSize}px`);
		document.documentElement.style.setProperty('--text-font-family', fontFamily);
		document.documentElement.style.setProperty('--text-line-height', `${lineHeight}em`);
	}

    document.querySelector('#options-font-size').addEventListener('change', (e) => {
        if (readingContent) {
            document.documentElement.style.setProperty('--text-font-size', `${e.target.value}px`);
        }
    });
    document.querySelector('#options-font-family').addEventListener('change', (e) => {
        if (readingContent) {
            document.documentElement.style.setProperty('--text-font-family', e.target.value);
        }
    });
	document.querySelector('#options-line-height').addEventListener('change', (e) => {
		if (readingContent) {
			document.documentElement.style.setProperty('--text-line-height', `${e.target.value}em`);
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
                const optionContainerElement = document.querySelector('.options-container');
                if (optionContainerElement) {
                    optionContainerElement.classList.toggle('hidden');
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
            Object.assign(warningElement.style, {
                backgroundColor: "#0000001f",
                borderColor: "#00000012"
            });
            warningElement.innerHTML = msgHTML;
			
		    const tlNote = document.querySelector('#tl-note');
		    if (tlNote) {
				warningElement.innerHTML = msgHTML + "<br>" + tlNote.innerHTML;
			}
        }

        var _a = document.querySelector('.c-top-sidebar');
        _a && (_a.style.display = "none");
        _a = document.querySelector('.text-left');
        _a && (_a.style.userSelect = "none");
        _a = document.querySelector('#text-chapter-toolbar');
        _a && (_a.style.display = "none");

        jQuery(function($) {
            $('.reading-content').off('click');
        });

        addOptions();
    };

    if (document.querySelector('.text-left')) {
        apply();
    } else {
        const observer = new MutationObserver(() => {
            const element = document.querySelector('.text-left');
            if (element) {
                apply();
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
};

const defaultMessage = '<a href="https://discord.com/invite/mVzkbcGHGU">Join the Luminary Novels Discord</a>';
waitLoad(defaultMessage);
