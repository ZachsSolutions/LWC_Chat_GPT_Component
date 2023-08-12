import { LightningElement, api, track } from 'lwc';
export default class ChatGPTComponent extends LightningElement {
    @track prompt = '';
    @track response = '';
    @track isWaiting = false;


    handlePromptChange(event) {
        this.prompt = event.target.value;
       
    }
    
    async sendRequest() {
        this.isWaiting = true;

      //You will need to insert the correct Endpoint and Key
        const apiUrl = ''; // Correct API endpoint
        const apiKey = ''; // Replace with your actual API key
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
    //alert('i am here');
        const requestBody = {
            prompt: this.prompt,
            max_tokens: 1000,
            temperature: 0.5,
            top_p: 0.3,
            frequency_penalty: 0.5,
            presence_penalty: 0
        };
        //alert(this.prompt);
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });
    
            const responseData = await response.json();
            //alert('we are here now' ,responseData.choices[0].text);
            this.response = responseData.choices[0].text.replace(/\n/g, '<br>');; // Adjust this based on your API response structure
            console.log(responseData);
            console.log(responseData.choices[0]);
            console.log(responseData.choices[0].text);
        } catch (error) {
            console.error('Error:', error);
            alert('i am here now');
        }
    
        this.isWaiting = false;
    }
}
