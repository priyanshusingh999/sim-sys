import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'change-me-in-local-env')
    MONGO_URI = os.environ.get('MONGO_URI', '')
    MONGO_DBNAME = os.environ.get('MONGO_DBNAME', 'smart-infrastructure-monitoring')
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.yandex.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', '587'))
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', '')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', '')
