from fastapi import HTTPException
from utils.gemini_helper import generate_gemini_response
from dotenv import load_dotenv

load_dotenv()

subjects_data = [
    {"id": 1, "name": "Mathematics"},
    {"id": 2, "name": "Science"},
    {"id": 3, "name": "History"},
    {"id": 4, "name": "General Knowledge"},
    {"id": 5, "name": "Machine Learning"}
]

topics_by_subject = {
    "Mathematics": ["Chapter 1 Real Numbers" , "Chapter 2 Polynomials","Chapter 3 Pair of Linear Equations in Two Variables","Chapter 4 Quadratic Equations","Chapter 5 Arithematic Progressions","Chapter 6 Triangles","Chapter 7 Coordinate Geometry","Chapter 8 Introduction to Trigonometry","Chapter 9 Some Applications of Trigonometry","Chapter 10 Circles","Chapter 11 Areas Related to Circles","Chapter 12 Surface Areas and Volumes","Chapter 13 Statistics","Chapter 14 Probability"],  # Same list as in your Node code
    "Science": ["Chapter 1 Chemical Reactions and Equations" , "Chapter 2 Acids,Bases and Salts","Chapter 3 Metals and Non-Metals","Chapter 4 Carbon and its Compounds","Chapter 5 Life Processes","Chapter 6 Control and Coordination","Chapter 7 How do Organisms Reproduce?","Chapter 8 Heredity","Chapter 9 Light-Reflection and Refraction","Chapter 10 The Human Eye and the Colourful World","Chapter 11 Electricity","Chapter 12 Magnetic Effects of Electric Current","Chapter 13 Our Environment"  ],
    "History": ["Chapter 1 The Rise of Nationalism in Europe","Chapter 2 Nationalism in India","Chapter 3 The Making of a Global World","Chapter 4 The Age of Industrialisation","Chapter 5 Print Culture and the Modern World","Chapter "],
    "General Knowledge": ["Technology","Sports"],
    "Machine Learning": ["Supervised Learning","Unsupervised Learning"]
}

async def get_subjects():
    return subjects_data

async def get_topics_by_subject(subject):
    if subject not in topics_by_subject:
        raise HTTPException(status_code=400, detail="Invalid subject")
    return [{"id": idx + 1, "name": topic} for idx, topic in enumerate(topics_by_subject[subject])]

async def teach_topic(data):
    subject = data.get("subject")
    topic = data.get("topic")
    if not subject or not topic:
        raise HTTPException(status_code=400, detail="Subject and topic are required")

    prompt1 = f"""
You are Aanya, an expert AI tutor specialized in teaching ${subject}.
    Please provide a comprehensive lesson on ${topic} within ${subject}. Your response should be tailored for a student in middle or high school.
    Structure your response with the following sections:
    1. Introduction: Brief overview of what ${topic} is and why it's important in ${subject}
    2. Key Concepts: The fundamental ideas and definitions in ${topic}
    3. Detailed Explanation: In-depth discussion with examples and illustrations
    4. Applications: How ${topic} is used in real-world scenarios
    5. Practice Problems: 2-3 questions with solutions to test understanding
    6. Summary: Recap of key points learned
  
   After and before each section/heading add a horizontal bar that divides each section well.
   Format your response in HTML for better readability with appropriate headings, paragraphs, lists, and emphasis.
   The content should be similar in alignments and spacing as in any real life textbook.

"""

    content = await generate_gemini_response(prompt1)
    return {"subject": subject, "topic": topic, "content": content}

async def answer_question(data):
    subject = data.get("subject")
    topic = data.get("topic")
    question = data.get("question")
    if not subject or not topic or not question:
        raise HTTPException(status_code=400, detail="Subject, topic, and question are required")

    prompt2 = f"""
As Aanya, an expert AI tutor specializing in {subject}, please answer the following question about {topic}:

"{question}"

Provide a clear and concise answer using plain text only. Structure your response with:
1. A direct answer to the question
2. A simple explanation with key points
3. If relevant, 1-2 examples or analogies to illustrate the concept

Keep your response conversational, friendly, and suitable for a Class 10 student reading from a NCERT textbook. Do not use any formatting symbols like asterisks, bullet points, or Markdown. Use plain line breaks and paragraphs instead.

"""
    answer = await generate_gemini_response(prompt2)
    return {"question": question, "answer": answer}
