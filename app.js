
window.addEventListener('dfMessengerLoaded', function (event) {
    const dfMessenger = document.querySelector('df-messenger');
    
    var style = document.createElement( 'style' )
    style.innerHTML = 'div.chat-wrapper[opened="true"] { max-height: 560px; height: 75%;}'
    const dfMessengerChat = dfMessenger.shadowRoot.querySelector('df-messenger-chat')
    dfMessengerChat.shadowRoot.appendChild(style);

    // dfMessenger.renderCustomText('Hi, how can I help you today?');
    dfMessenger.showMinChat();
    populateInitialMessages();
    console.log("here")
});

function processBotMessages() {



	// Need to delay function calls or else the timing isn't right

	setTimeout(function () {



		// Process text responses

		processTextResponses();

	

		// Process card responses

		processCardResponses();

		

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

function processTextResponses() {


	const dfMessenger = document.querySelector('df-messenger');		

	

	const botMessages = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

		.shadowRoot.querySelector('df-message-list')

		.shadowRoot.querySelector('#messageList')

		.querySelectorAll('.bot-message');

	

	botMessages.forEach(function(message) {

		processMessageHtml(message);

	})	

}

function processCardResponses() {



	const dfMessenger = document.querySelector('df-messenger');		

	

	const botCards = dfMessenger.shadowRoot.querySelector('df-messenger-chat')

		.shadowRoot.querySelector('df-message-list')

		.shadowRoot.querySelector('#messageList')

		.querySelectorAll('df-card');

		

	botCards.forEach(function(card) {			

		const descriptionLines = card.shadowRoot.querySelector('df-description')

			.shadowRoot.querySelectorAll('.description-line');

		

		descriptionLines.forEach(function(desc) {

			processMessageHtml(desc);

		})	

	})		

}

function processMessageHtml(element) {

	// If element hasn't previously been processed, override the innerHTML with the innerText value

	if(!element.classList.contains('bcgov-message-processed')) {

		element.innerHTML = element.textContent;	

		

		// RA-1365: add click event handlers to any anchor tags in the response

		const dfMessageLinks = element.querySelectorAll('a');

		element.classList.add('bcgov-message-processed');			

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