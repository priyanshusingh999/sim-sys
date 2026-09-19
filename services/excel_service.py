import pandas as pd
import openpyxl


class ExcelService:
    def __init__(self, file_path):
        self.file_path = file_path

    def read_excel(self):
        df = pd.read_excel(self.file_path)
        return df