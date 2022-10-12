from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from algosdk import account, mnemonic


app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/create_account")
async def create_account():
    private_key, address = account.generate_account()
    return {"mnemonic" : mnemonic.from_private_key(private_key), "address": address, "pk": private_key}
