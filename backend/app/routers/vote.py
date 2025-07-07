from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.logger import logger

router = APIRouter()

votes = {}
results = {"optionA": 0, "optionB": 0}

class VoteRequest(BaseModel):
    employee_id: str
    choice: str

@router.post("/vote")
def cast_vote(vote: VoteRequest):  # fixed here
    if vote.employee_id in votes:
        logger.warning(f"Duplicate vote attempt by {vote.employee_id}")
        raise HTTPException(status_code=400, detail="Employee has already voted")
    if vote.choice not in results:
        logger.error(f"Invalid vote choice '{vote.choice}' by {vote.employee_id}")
        raise HTTPException(status_code=400, detail="Invalid choice")
    votes[vote.employee_id] = vote.choice
    results[vote.choice] += 1
    logger.info(f"Vote recorded: {vote.employee_id} -> {vote.choice}")
    return {"message": "Vote recorded successfully"}

@router.get("/results")
def get_results():
    return results
