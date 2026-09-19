from flask import Flask, jsonify, render_template, request, redirect, url_for, flash, session
from werkzeug.utils import secure_filename
from routes.authentication import auth, login_required
from services.pdf_service import PDFService
from services.docx_service import DocxService
from services.excel_service import ExcelService
from services.csv_service import CSVService
from services.ocr_service import OCRService
import os

app = Flask(__name__)
app.config.from_object('config.Config')
app.register_blueprint(auth)


UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'xlsx', 'csv'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    """Check if the file extension is acceptable."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('pages/dashboard.html')


@app.route('/documents')
@login_required
def documents():
    return render_template('pages/document.html')


@app.route('/schedule')
@login_required
def schedule():
    return render_template('pages/schedule.html')


@app.route('/progress')
@login_required
def progress():
    return render_template('pages/progress.html')


@app.route('/risks')
@login_required
def risks():
    return render_template('pages/risk&delays.html')


@app.route('/assistant')
@login_required
def assistant():
    return render_template('pages/assistant.html')


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(error='No file part in the request'), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify(error='No selected file'), 400
    
    if not allowed_file(file.filename):
        allowed_types = ', '.join(sorted(ALLOWED_EXTENSIONS))
        return jsonify(error=f'Invalid file type. Allowed types are: {allowed_types}'), 415

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return jsonify(message=f"File '{filename}' uploaded successfully!", filename=filename)


if __name__ == '__main__':
    app.run(debug=True)