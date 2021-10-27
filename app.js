
window.addEventListener('dfMessengerLoaded', function (event) {
    const dfMessenger = document.querySelector('df-messenger');
    
    var style = document.createElement( 'style' )
    style.innerHTML = 'div.chat-wrapper[opened="true"] { max-height: 560px; height: 75%;}'
    const dfMessengerChat = dfMessenger.shadowRoot.querySelector('df-messenger-chat')
    dfMessengerChat.shadowRoot.appendChild(style);


	var titleContainer = dfMessengerChat.shadowRoot.querySelector('df-messenger-titlebar')
	var titleStyle = document.createElement('style')
	titleStyle.innerHTML = "div.title-wrapper {font-family: 'Montserrat' !important}"
	titleContainer.shadowRoot.appendChild(titleStyle);

	var inputContainer = dfMessengerChat.shadowRoot.querySelector('df-messenger-user-input')
		.shadowRoot.querySelector(".input-container").querySelector(".input-box-wrapper")
	var inputStyle = document.createElement('style')
	inputStyle.innerHTML = "input {font-family: 'Montserrat' !important}"
	inputContainer.appendChild(inputStyle);

    // dfMessenger.renderCustomText('Hi, how can I help you today?');
    dfMessenger.showMinChat();
    populateInitialMessages();

	dfMessenger.addEventListener('df-request-sent', function(event) {
		const dfMessenger = document.querySelector('df-messenger');		

		console.log("here")
		
		const userMessageList = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

			.shadowRoot.querySelector('df-message-list')

			.shadowRoot.querySelector('#messageList');

			
		var style = document.createElement( 'style' )
		style.innerHTML = "div.user-message { font-family: 'Montserrat' !important; border-radius: 12px 12px 0px 12px !important}"
		userMessageList.appendChild(style);
	});


	function processBotMessages() {



		// Need to delay function calls or else the timing isn't right

		setTimeout(function () {



			// Process text responses

			processTextResponses();

		
			//Process suggestion chip responses

			processSuggestionChipResponses();


			// Process card responses

			processCardResponses();

			
			// Process MultiCard responses
			processMutliCardResponses();


			//Process List responses
			processListResponses();
			// Add other response types here as required

			// ...



			// Make all messages navigable/focusable

			const dfMessenger = document.querySelector('df-messenger');				

			const messages = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

				.shadowRoot.querySelector('df-message-list')

				.shadowRoot.querySelector('#messageList').querySelectorAll('.message');

				

				messages.forEach(function(message) {

					message.setAttribute('tabindex', '-1');

				})

			

		}, 100);	
		
		dfMessenger.addEventListener('df-response-received', function (event) {

			// RA-1343: Process bot responses and render HTML

			processBotMessages();	

		});

		

	}

	async function processTextResponses() {


		const dfMessenger = document.querySelector('df-messenger');		

		
		const botMessageList = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

			.shadowRoot.querySelector('df-message-list')

			.shadowRoot.querySelector('#messageList');


		const botMessages = botMessageList

			.querySelectorAll('.bot-message');

			
		var style = document.createElement( 'style' )
		style.innerHTML = "div.bot-message { font-family: 'Montserrat' !important; border-radius: 12px 12px 12px 0px !important }"
		botMessageList.appendChild(style);

		botMessages.forEach(function(message) {

			processMessageHtml(message);

		})	

	}

	async function processSuggestionChipResponses() {

		const dfMessenger = document.querySelector('df-messenger');		

		
		const botMessageList = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

			.shadowRoot.querySelector('df-message-list')

			.shadowRoot.querySelector('#messageList');

		const dfChipsContainer = botMessageList.querySelectorAll('df-chips');

		dfChipsContainer.forEach(dfchips => {
			const chipWrapper = dfchips.shadowRoot.querySelector('.df-chips-wrapper');

			var styleChip = document.createElement( 'style' )
			styleChip.innerHTML = "a { font-family: 'Montserrat' !important; font-size: 12px !important; border-radius: 10px !important}"
			chipWrapper.appendChild(styleChip);
		});
		

	}

	async function processCardResponses() {


		const dfMessenger = document.querySelector('df-messenger');		

		

		const botCards = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

			.shadowRoot.querySelector('df-message-list')

			.shadowRoot.querySelector('#messageList')

			.querySelectorAll('df-card');

			
		try {
			botCards.forEach(function(card) {			

				const descriptionContainer = card.shadowRoot.querySelector('df-description')
	
				descriptionLines = 	descriptionContainer.shadowRoot.querySelector('#descriptionWrapper');
				descriptionLines.classList.add('custom-message')
	
				
				var style = document.createElement( 'style' )
				style.innerHTML = " .custom-message { font-family: 'Montserrat' !important;}"
				descriptionContainer.shadowRoot.prepend(style)
			});	
		} catch (error) {
			console.log(error)
		}

	}

	async function processMutliCardResponses() {
		const dfMessenger = document.querySelector('df-messenger');		

		

		const botCards = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

			.shadowRoot.querySelector('df-message-list')

			.shadowRoot.querySelector('#messageList')

			.querySelectorAll('df-card');


		botCards.forEach(function(card) {			

			const dfTitles = card.shadowRoot.querySelectorAll('df-title')

			dfTitles.forEach(dfTitle => {
				descriptionLines = 	dfTitle.shadowRoot.querySelector('.title-card-elements');
				descriptionLines.classList.add('custom-message')

				
				var style = document.createElement( 'style' )
				style.innerHTML = " .custom-message { font-family: 'Montserrat' !important;}"
				dfTitle.shadowRoot.prepend(style)
			});
		})	
	}

	async function processListResponses() {

		const dfMessenger = document.querySelector('df-messenger');		


		const botCards = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

			.shadowRoot.querySelector('df-message-list')

			.shadowRoot.querySelector('#messageList')

			.querySelectorAll('df-card');

		botCards.forEach(botcard => {
			const listElements = botcard.shadowRoot.querySelectorAll("df-list-element");
			listElements.forEach(listElement => {
				descriptionLines = 	listElement.shadowRoot.querySelector('.title-card-elements');
				descriptionLines.classList.add('custom-message')

				
				var style = document.createElement( 'style' )
				style.innerHTML = " .custom-message { font-family: 'Montserrat' !important; padding: 8px 16px !important; font-size: 13px !important}"
				listElement.shadowRoot.prepend(style)
			})
		});
	}

	function processMessageHtml(element) {

		// If element hasn't previously been processed, override the innerHTML with the innerText value

		if(!element.classList.contains('custom-message')) {

			element.innerHTML = element.textContent;	

			

			// RA-1365: add click event handlers to any anchor tags in the response

			const dfMessageLinks = element.querySelectorAll('a');

			element.classList.add('custom-message');			

		}

	}

	function chatExpanded() {

		var dfMessenger = document.querySelector('df-messenger');



		try {



			var mainWrapper = dfMessenger.shadowRoot.querySelector(".df-messenger-wrapper");

			var divChatWrapper = dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('.chat-wrapper');



			return hasClass(mainWrapper, "expanded") &&

				!hasClass(divChatWrapper, "chat-min") &&

				divChatWrapper.getAttribute("opened") !== "false";

				

		} catch (e) {

			return false;

		}

	}

	// Render a custom card.  Message formats supported are JSON and text/html

	function renderCustomMessage(message) {
		
		if (message.length > 0) {	
			const dfMessenger = document.querySelector('df-messenger');
			
			if (message.trim().startsWith("{")) {
				const jsonMessage = JSON.parse('[' + message + ']');					
				dfMessenger.renderCustomCard(jsonMessage);	
			} else {
				dfMessenger.renderCustomText(message);
			}
		}
	}

	function populateInitialMessages() {
		//Andy French 6-1-21 Updated the welcome message to align with gov.bc.ca
		//enabled message 2 and 3 so chips show
			
		// Load the message from the hidden page element
		const initialMessageContainer = document.querySelector('#chatbot-initial-message');
		
		if(initialMessageContainer) {
			
			const initialMessageHtml = initialMessageContainer.innerHTML;
			
			if(initialMessageHtml.length > 0) {
				
				//Render the first message in the chatbot
				renderCustomMessage(initialMessageHtml);
				
				// Render the second message if it is populated
				const initialMessageHtml2 = document.querySelector('#chatbot-initial-message2').innerHTML;
				renderCustomMessage(initialMessageHtml2);					
				
				// Render the third message if it is populated
				const initialMessageHtml3 = document.querySelector('#chatbot-initial-message3').innerHTML;
				renderCustomMessage(initialMessageHtml3);
				
				// Process the messages so they display html, have click handlers etc
				processBotMessages();
				
			}
		}
	}

});