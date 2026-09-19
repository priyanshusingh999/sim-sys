import pymupdf  # PyMuPDF is imported as fitz
# import pdfplumber


class PDFService:
    def __init__(self, pdf_path):
        self.pdf_path = pdf_path

    def extract_text(self):
        text = ""
        with pymupdf.open(self.pdf_path) as pdf:
            for page in pdf:
                text += page.get_text()
        return text

    def extract_tables(self):
        tables = []
        with pymupdf.open(self.pdf_path) as pdf:
            for page in pdf:
                tables.extend(page.get_tables())
        return tables

    def extract_images(self):
        images = []
        with pymupdf.open(self.pdf_path) as pdf:
            for page in pdf:
                images.extend(page.get_images())
        return images

    def extract_text_from_page(self, page_number):
        text = ""
        with pymupdf.open(self.pdf_path) as pdf:
            page = pdf.load_page(page_number - 1)
            text += page.get_text()
        return text

    