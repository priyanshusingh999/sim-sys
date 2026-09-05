import pandas as pd
import openpyxl


def read_excel(file_path):
    df = pd.read_excel(file_path)
    return df