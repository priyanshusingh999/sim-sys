import cv2
import pytesseract

# 1. Load the image using OpenCV
image = cv2.imread('receipt.png')

# 2. Preprocess with OpenCV: Convert to grayscale and apply thresholding
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

# 3. Extract text using Tesseract
extracted_text = pytesseract.image_to_string(thresh)

print("Extracted Text:\n", extracted_text)

# 4. Save the extracted text to a file
with open('extracted_text.txt', 'w') as f:
    f.write(extracted_text)

print("Extracted text saved to 'extracted_text.txt'")