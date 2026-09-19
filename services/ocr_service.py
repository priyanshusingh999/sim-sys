import cv2
import pytesseract

class OCRService:
    def __init__(self, image_path):
        self.image_path = image_path

    def extract_text(self):
        # Load the image using OpenCV
        image = cv2.imread(self.image_path)

        # Preprocess with OpenCV: Convert to grayscale and apply thresholding
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

        # Extract text using Tesseract
        extracted_text = pytesseract.image_to_string(thresh)

        return extracted_text