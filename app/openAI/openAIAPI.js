
import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
    openai
}

