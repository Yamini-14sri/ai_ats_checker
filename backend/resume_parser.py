import pdfplumber
import docx2txt

def extract_text(file, filename):
    if filename.endswith(".pdf"):
        with pdfplumber.open(file) as pdf:
            return "\n".join(page.extract_text() or "" for page in pdf.pages)

    elif filename.endswith(".docx"):
        return docx2txt.process(file)

    else:
        return ""
