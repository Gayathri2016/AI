const axios = require('axios');
require('dotenv').config();

const AGENT_FORGE_API_KEY = process.env.AGENT_FORGE_API_KEY;
const AGENT_ENDPOINT = 'https://api.on-demand.io/chat/v1/sessions';

// Function to send data to Agent Forge
async function sendToAgentForge(query) {
    try {
        const response = await axios.post(AGENT_ENDPOINT, {
            query: query
        }, {
            headers: {
                'apikey': AGENT_FORGE_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Agent Forge Error:', error.message);
        return null;
    }
}

// Function to monitor API and send insights request
async function monitorAPI(apiUrl) {
    const startTime = Date.now();
    try {
        const response = await axios.get(apiUrl);
        const responseTime = Date.now() - startTime;

        // Create AI query
        const aiQuery = `Analyze API Performance: The response time for ${apiUrl} is ${responseTime}ms with status ${response.status}. Suggest optimizations.`;

        const aiAnalysis = await sendToAgentForge(aiQuery);

        console.log("AI Analysis:", aiAnalysis);

        return {
            status: response.status,
            responseTime,
            aiAnalysis
        };
    } catch (error) {
        console.error(`Monitoring Error for ${apiUrl}:`, error.message);
        return {
            status: 'Error',
            responseTime: null,
            aiAnalysis: null
        };
    }
}

// Run every 10 minutes
setInterval(() => monitorAPI(process.env.TARGET_API), 600000);


