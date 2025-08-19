# **Verdicto – AI Legal Research Assistant**
*"Smarter, faster, and more accurate legal research for the modern era."*

---

## **Overview**
Legal research can be **slow**, **fragmented**, and **overwhelming**.  
Lawyers, students, and researchers often spend hours reviewing case laws, statutes, and legal opinions — and many tools still rely on outdated keyword searches.  

**Verdicto** changes that by using **AI-powered semantic search** combined with **Retrieval-Augmented Generation (RAG)**.  
Instead of only listing results, it **summarizes, compares, and explains** legal information — all with **reliable citations** you can trust.

---

## **Why Use Verdicto?**
- **Ask naturally** – Use everyday language instead of rigid keywords.
- **Accurate summaries** – Answers are based on actual legal documents, not AI guesses.
- **Upload and search instantly** – Query your own case files in seconds.
- **Live legal updates** – Fetch real-time judgments and precedents via legal APIs.
- **Save time** – Reduce hours of research while keeping accuracy and compliance.

---

## **How Verdicto Works**
1. **Upload or Fetch Data** – Upload your case files, statutes, or pull data from integrated APIs like **Indian Kanoon** or **CourtListener**.
2. **Vector Embeddings** – Documents are converted into high-dimensional vectors using **OpenAI’s `text-embedding-3-large`**.
3. **Semantic Search** – Your query finds the most relevant legal content in the vector database.
4. **RAG Pipeline** – LangChain retrieves top matches and sends them to the AI model for summarization.
5. **Function Calling** – For live updates (e.g., “Latest Supreme Court ruling on XYZ”), the system queries external APIs.
6. **AI Response with Citations** – You get a clear, legally precise answer with sources you can verify.

---

## **Tech Stack**
**Backend:** Python + FastAPI  
**AI Orchestration:** LangChain  
**Vector Database:** Pinecone / ChromaDB / Weaviate  
**LLM:** OpenAI GPT-4 (or LangChain-compatible models)  
**Embeddings:** OpenAI `text-embedding-3-large`  
**Frontend:** React (chat-based interface)  
**Data Sources:** Indian Kanoon API, CourtListener API  
**Deployment:** Render (Backend), Vercel/Netlify (Frontend)

---

## **Implementation Plan**
### **1. Backend**
- FastAPI for handling API requests.
- LangChain for RAG and API function calls.
- Pinecone/ChromaDB for storing embeddings.
- Live API integration for legal judgments and statutes.

### **2. Frontend**
- React chat interface for user queries.
- Highlight sources directly in responses.
- PDF upload and instant search.

### **3. Data Pipeline**
- Preprocess and split legal documents into chunks.
- Generate embeddings using OpenAI API.
- Store and retrieve via vector database.

### **4. RAG Setup**
- LangChain `RetrievalQA` with legal-specific prompts.
- Metadata-powered citations for transparency.

### **5. Testing & Optimization**
- Test with real legal queries.
- Fine-tune prompts for accuracy and clarity.
- Gradually expand dataset coverage.

---

## **Installation**
```bash
# Clone the repository
git clone https://github.com/yourusername/verdicto.git
cd verdicto

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt

# Add environment variables
echo "OPENAI_API_KEY=your_openai_api_key" > .env
echo "VECTOR_DB_URL=your_vector_db_url" >> .env
echo "LEGAL_API_KEY=your_legal_api_key" >> .env

# Run backend
uvicorn main:app --reload

# Frontend setup
cd ../frontend
npm install
npm start


###Example Use Cases
- Law students summarizing lengthy case studies.

- Lawyers quickly checking the latest precedents.

- Researchers analyzing multiple judgments at once.

###Future Improvements
- Support for more jurisdictions.

- Offline mode for local legal database search.


- Multi-language legal document processing.
