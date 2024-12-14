import os
import json
import re
import nltk
from datetime import datetime
from flask import Flask, request, render_template, redirect, url_for, flash
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize Flask app
app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with a strong secret key

# Paths to the JSON files in the dataset folder
DEFAULT_ROUTINE_FILE_PATH = os.path.join('dataset', 'default_routine.json')
ROUTINE_DATA_FOLDER = 'uploads'

# Ensure the upload folder exists
os.makedirs(ROUTINE_DATA_FOLDER, exist_ok=True)

# Preprocess text by cleaning it: lowercase, remove punctuation and stopwords
def preprocess_text(text):
    """
    Clean the text by converting to lowercase, removing punctuation, and stopwords.
    """
    # Remove punctuation and make text lowercase
    text = re.sub(r'[^\w\s]', '', text.lower())
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    text = ' '.join([word for word in text.split() if word not in stop_words])
    
    return text

# Calculate cosine similarity between the routine task and the captured image label
def calculate_similarity(routine_task, image_label):
    """
    Calculate the cosine similarity between the routine task and the captured image label.
    """
    # Preprocess the text
    routine_task_clean = preprocess_text(routine_task)
    image_label_clean = preprocess_text(image_label)

    # Combine both texts into a list for TF-IDF vectorization
    texts = [routine_task_clean, image_label_clean]
    
    # Vectorize the texts using TF-IDF
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(texts)

    # Calculate cosine similarity between the two TF-IDF vectors
    similarity_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    
    return similarity_score[0][0]

# Function to detect significant routine deviations, especially during sleeping hours
def detect_personality_shift(routine):
    """
    Detect if a personality shift is happening based on abnormal time deviations
    (e.g., waking up during sleep time like 1 AM).
    Returns a tuple (bool, tasks)
    """
    # Convert routine time to datetime object
    routine_time = datetime.strptime(routine['start_time'], "%I:%M %p")
    
    # Sleep period from 12:00 AM to 06:00 AM
    sleep_start_time = datetime.strptime("12:00 AM", "%I:%M %p")
    sleep_end_time = datetime.strptime("06:00 AM", "%I:%M %p")

    # Check if the routine time falls within the sleep period
    if sleep_start_time <= routine_time < sleep_end_time:
        return True, routine['tasks']
    return False, []

# Check if the patient's routine matches the default routine
def check_routine_match(default_routine, patient_routine):
    """
    Compares the default routine tasks with the patient's routine tasks
    and checks if there are any deviations based on the timestamp and task similarity.
    Returns a list of alerts.
    """
    alerts = []
    
    print("Checking routine match...\n")
    
    # Loop through the patient routine and compare with the default routine
    for routine in patient_routine:
        routine_time = datetime.strptime(routine['start_time'], "%I:%M %p")
        print(f"Checking routine at {routine_time.strftime('%I:%M %p')}")
        
        # Check for significant deviations (personality shift detection)
        shift_detected, tasks = detect_personality_shift(routine)
        if shift_detected:
            print(f"**Deviation Detected: Abnormal waking time at {routine_time.strftime('%I:%M %p')}**")
            print(f"Tasks at {routine_time.strftime('%I:%M %p')}: {', '.join(tasks)}")
            alerts.append(f"Alert: Personality shift detected at {routine_time.strftime('%I:%M %p')}. Abnormal waking time!")
            alerts.append(f"Tasks at this time: {', '.join(tasks)}")
        
        # Find matching task in default routine
        for default in default_routine:
            default_time = datetime.strptime(default['start_time'], "%I:%M %p")
            
            if routine_time == default_time:
                print(f"Matching Time Found: {routine_time.strftime('%I:%M %p')}")
                
                # Print patient's task at this matching time
                print(f"Patient's task at {routine_time.strftime('%I:%M %p')}: {', '.join(routine['tasks'])}")
                
                # Compare tasks if times match
                for task in routine['tasks']:
                    task_matched = False
                    for default_task in default['tasks']:
                        similarity = calculate_similarity(task, default_task)
                        print(f"Comparing task: '{task}' with '{default_task}' - Similarity: {similarity:.2f}")
                        
                        if similarity < 0.7:  # If similarity is below threshold
                            alerts.append(f"Alert: Deviation detected at {routine_time.strftime('%I:%M %p')}! Routine task: '{task}', Default task: '{default_task}'")
                            print(f"Deviation Detected: Routine task: '{task}' doesn't match default task: '{default_task}'\n")
                        else:
                            task_matched = True
                            print(f"Match Found: Routine task: '{task}' matches default task: '{default_task}'\n")
                    
                    # If no match found after comparing all tasks, add a mismatch alert
                    if not task_matched:
                        alerts.append(f"Alert: No matching task found for time {routine_time.strftime('%I:%M %p')}")
                        print(f"Deviation Detected: No matching task for time {routine_time.strftime('%I:%M %p')}\n")
    
    return alerts

# Route for home page
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'patient_routine' not in request.files:
            flash('No file part in the request')
            return redirect(request.url)
        
        file = request.files['patient_routine']
        
        # If user does not select file, browser may submit an empty part without filename
        if file.filename == '':
            flash('No file selected')
            return redirect(request.url)
        
        if file and file.filename.endswith('.json'):
            try:
                # Save the uploaded file
                file_path = os.path.join(ROUTINE_DATA_FOLDER, 'uploaded_routine.json')
                file.save(file_path)
                print(f"Uploaded file saved to {file_path}")
                
                # Load the default routine
                with open(DEFAULT_ROUTINE_FILE_PATH, 'r') as f:
                    default_routine = json.load(f)
                    print("Default routine loaded successfully.")
                
                # Load the patient routine from uploaded file
                with open(file_path, 'r') as f:
                    patient_routine = json.load(f)
                    print("Patient routine loaded successfully.")
                
                # Compare the routines and check for deviations
                alerts = check_routine_match(default_routine, patient_routine)
                
                if alerts:
                    return render_template('index.html', alerts=alerts)
                else:
                    message = "No deviations detected. The patient's routine matches the expected routine."
                    return render_template('index.html', message=message)
            except Exception as e:
                print(f"Error processing file: {e}")
                flash(f"Error processing file: {e}")
                return redirect(request.url)
        else:
            flash("Invalid file type. Please upload a JSON file.")
            return redirect(request.url)
    else:
        return render_template('index.html')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
