"""
The Bite Chapter - Portfolio & Recipe Web Server
Ready for local execution and Google Cloud Run deployment.
"""

import os
import json
import logging
from typing import Optional
from pathlib import Path

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("thebitechapter")

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
DATA_FILE = BASE_DIR / "reels_data.json"
LEADS_FILE = BASE_DIR / "leads.json"

# In-memory store + file backup for waitlist and contacts
def save_lead(category: str, data: dict):
    try:
        leads = {}
        if LEADS_FILE.exists():
            with open(LEADS_FILE, "r", encoding="utf-8") as f:
                try:
                    leads = json.load(f)
                except Exception:
                    leads = {}
        if category not in leads:
            leads[category] = []
        leads[category].append(data)
        with open(LEADS_FILE, "w", encoding="utf-8") as f:
            json.dump(leads, f, indent=2)
    except Exception as e:
        logger.error(f"Error saving lead: {e}")

try:
    from fastapi import FastAPI, Request
    from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
    from fastapi.staticfiles import StaticFiles
    import uvicorn

    app = FastAPI(title="The Bite Chapter API", version="1.0.0")

    # Mount static assets
    if STATIC_DIR.exists():
        app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

    @app.get("/", response_class=HTMLResponse)
    async def serve_index():
        index_path = BASE_DIR / "index.html"
        if index_path.exists():
            with open(index_path, "r", encoding="utf-8") as f:
                return HTMLResponse(content=f.read())
        return HTMLResponse("<h1>The Bite Chapter</h1><p>index.html not found.</p>", status_code=404)

    @app.get("/health")
    async def health_check():
        return {"status": "ok", "service": "thebitechapter", "mode": "production"}

    @app.get("/api/reels")
    async def get_reels():
        if DATA_FILE.exists():
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    @app.post("/api/ebook-waitlist")
    async def ebook_waitlist(req: Request):
        try:
            body = await req.json()
            email = body.get("email", "").strip()
            name = body.get("name", "Foodie Friend").strip()
            if not email:
                return JSONResponse({"error": "Email is required"}, status_code=400)
            
            save_lead("ebook_waitlist", {"name": name, "email": email})
            logger.info(f"New eBook waitlist subscriber: {email}")

            return {
                "status": "success",
                "message": "Welcome to the VIP club!",
                "download_url": "/static/downloads/thebitechapter_sample_ebook.pdf"
            }
        except Exception as e:
            logger.error(f"Error in ebook-waitlist: {e}")
            return JSONResponse({"error": str(e)}, status_code=500)

    @app.post("/api/newsletter")
    async def newsletter_subscribe(req: Request):
        try:
            body = await req.json()
            email = body.get("email", "").strip()
            if not email:
                return JSONResponse({"error": "Email is required"}, status_code=400)
            
            save_lead("newsletter", {"email": email})
            logger.info(f"New newsletter subscriber: {email}")
            return {"status": "success", "message": "Subscribed to Sunday Secret Bites!"}
        except Exception as e:
            return JSONResponse({"error": str(e)}, status_code=500)

    @app.post("/api/contact")
    async def contact_inquiry(req: Request):
        try:
            body = await req.json()
            save_lead("collaborations", body)
            logger.info(f"New brand inquiry from: {body.get('email')}")
            return {"status": "success", "message": "Inquiry received. Nimisha will connect soon!"}
        except Exception as e:
            return JSONResponse({"error": str(e)}, status_code=500)

    def run():
        port = int(os.environ.get("PORT", 8000))
        logger.info(f"Starting The Bite Chapter server on http://localhost:{port}")
        uvicorn.run("server:app", host="0.0.0.0", port=port, reload=False)

except ImportError:
    # Graceful fallback to Python standard library http.server if FastAPI is not installed
    from http.server import SimpleHTTPRequestHandler
    import socketserver

    class CustomHandler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(BASE_DIR), **kwargs)

        def do_POST(self):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
            except Exception:
                data = {}

            if self.path == '/api/ebook-waitlist':
                save_lead("ebook_waitlist", data)
                response = {
                    "status": "success",
                    "download_url": "/static/downloads/thebitechapter_sample_ebook.pdf"
                }
            elif self.path == '/api/newsletter':
                save_lead("newsletter", data)
                response = {"status": "success", "message": "Subscribed!"}
            elif self.path == '/api/contact':
                save_lead("collaborations", data)
                response = {"status": "success", "message": "Inquiry saved!"}
            else:
                response = {"status": "ok"}

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))

    def run():
        port = int(os.environ.get("PORT", 8000))
        logger.info(f"Starting standard HTTP server on http://localhost:{port}")
        with socketserver.TCPServer(("0.0.0.0", port), CustomHandler) as httpd:
            httpd.serve_forever()

if __name__ == "__main__":
    run()
