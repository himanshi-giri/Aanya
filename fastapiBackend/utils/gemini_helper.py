import os
import aiohttp
import asyncio
from dotenv import load_dotenv
load_dotenv() 

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds

async def generate_gemini_response(prompt: str):
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    async with aiohttp.ClientSession() as session:
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                async with session.post(
                    GEMINI_API_URL,
                    params={"key": GEMINI_API_KEY},
                    json=payload,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("candidates"):
                        return data["candidates"][0]["content"]["parts"][0]["text"]
                    elif response.status == 429:
                        await asyncio.sleep(RETRY_DELAY * attempt)
                        continue
                    else:
                        raise Exception(data.get("error", {}).get("message", "Unknown Error"))
            except Exception as e:
                if attempt == MAX_RETRIES:
                    raise Exception(f"Gemini API failed after {MAX_RETRIES} retries: {str(e)}")
