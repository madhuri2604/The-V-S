from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

votes = {}
results = {"optionA": 0, "optionB": 0}

class VoteRequest(BaseModel):
    employee_id: str
    choice: str

@router.post("/vote")
def cast_vote(vote: VoteRequest):
    if vote.employee_id in votes:
        raise HTTPException(status_code=400, detail="Employee has already voted")
    if vote.choice not in results:
        raise HTTPException(status_code=400, detail="Invalid vote option")
    votes[vote.employee_id] = vote.choice
    results[vote.choice] += 1
    return {"message": "Vote recorded successfully"}

@router.get("/results")
def get_results():
    return results
