from PyPDF2 import PdfReader
import docx
from io import BytesIO

def extract_text(file_bytes, filename):
    text = ""
    if filename.endswith(".pdf"):
        reader = PdfReader(BytesIO(file_bytes))
        for page in reader.pages:
            text += page.extract_text() or ""
    elif filename.endswith(".docx"):
        doc = docx.Document(BytesIO(file_bytes))
        text = "\n".join([p.text for p in doc.paragraphs])
    else:
        raise ValueError("Unsupported file type")
    return text.strip()
