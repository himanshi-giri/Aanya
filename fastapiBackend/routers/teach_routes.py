from fastapi import APIRouter, Request, HTTPException
from controllers.teach_controller import (
    get_subjects,
    get_topics_by_subject,
    teach_topic,
    answer_question
)

router = APIRouter()

@router.get("/")
def teachHome():
    return {"Message":"Welcome to teach API"}

@router.get("/subjects")
async def subjects():
    return await get_subjects()

@router.get("/topics/{subject}")
async def topics(subject: str):
    return await get_topics_by_subject(subject)

@router.post("/teachtopic")
async def teach_topic_route(request: Request):
    data = await request.json()
    return await teach_topic(data)

@router.post("/question")
async def answer_question_route(request: Request):
    data = await request.json()
    return await answer_question(data)
