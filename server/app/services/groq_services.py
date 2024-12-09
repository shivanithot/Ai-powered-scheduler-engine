from groq import Groq
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Initialize Groq client using API key
client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

def call_groq_api(prompt):
    try:
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=1,
            max_tokens=1024,
            top_p=1,
            stream=False
        )

        return completion.choices[0].message.content

    except Exception as e:
        return f"Error calling Groq API: {str(e)}"
