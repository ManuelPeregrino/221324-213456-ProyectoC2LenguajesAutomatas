from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import re
import csv

app = Flask(__name__)

CORS(app)
csv_file_path = 'api/datospersonales.csv'

email_list = []

with open(csv_file_path, mode='r', encoding="utf8") as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        email_Data = row[2]  # Assuming the email is in the third column
        email_list.append(email_Data)

@app.route('/get-matching-emails')
def get_matching_emails_hotmail():
    email_pattern = r'\b'.format('|'.join(map(re.escape, email_list)))
    matching_rows = []

    try:
        with open(csv_file_path, mode='r', encoding="utf8") as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                email = row[2]  # Assuming the email is in the third column
                if re.match(email_pattern, email):
                    matching_rows.append(row)
        return jsonify(matching_rows)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
if __name__ == '__main__':
    app.run(debug=True)
