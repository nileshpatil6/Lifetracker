# import json
# import re
# import nltk
# from datetime import datetime
# from nltk.corpus import stopwords
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# # Download NLTK stopwords data
# nltk.download('stopwords')

# # Paths to the JSON files in the dataset folder
# DEFAULT_ROUTINE_FILE_PATH = "dataset/default_routine.json"
# ROUTINE_FILE_PATH = "dataset/routine_data.json"

# # Preprocess text by cleaning it: lowercase, remove punctuation and stopwords
# def preprocess_text(text):
#     """
#     Clean the text by converting to lowercase, removing punctuation, and stopwords.
#     """
#     # Remove punctuation and make text lowercase
#     text = re.sub(r'[^\w\s]', '', text.lower())
    
#     # Remove stopwords
#     stop_words = set(stopwords.words('english'))
#     text = ' '.join([word for word in text.split() if word not in stop_words])
    
#     return text

# # Calculate cosine similarity between the routine task and the captured image label
# def calculate_similarity(routine_task, image_label):
#     """
#     Calculate the cosine similarity between the routine task and the captured image label.
#     """
#     # Preprocess the text
#     routine_task_clean = preprocess_text(routine_task)
#     image_label_clean = preprocess_text(image_label)

#     # Combine both texts into a list for TF-IDF vectorization
#     texts = [routine_task_clean, image_label_clean]
    
#     # Vectorize the texts using TF-IDF
#     vectorizer = TfidfVectorizer()
#     tfidf_matrix = vectorizer.fit_transform(texts)

#     # Calculate cosine similarity between the two TF-IDF vectors
#     similarity_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    
#     return similarity_score[0][0]

# # Function to detect significant routine deviations, especially during sleeping hours
# def detect_personality_shift(routine_time):
#     """
#     Detect if a personality shift is happening based on abnormal time deviations
#     (e.g., waking up during sleep time like 1 AM).
#     """
#     # Convert routine time to datetime object
#     routine_time = datetime.strptime(routine_time, "%I:%M %p")
    
#     # Sleep period from 12:00 AM to 06:00 AM
#     sleep_start_time = datetime.strptime("12:00 AM", "%I:%M %p")
#     sleep_end_time = datetime.strptime("06:00 AM", "%I:%M %p")

#     # Check if the routine time falls within the sleep period but is outside normal sleep hours
#     if sleep_start_time <= routine_time < sleep_end_time:
#         return True
#     return False

# # Check if the patient's routine matches the default routine
# def check_routine_match(default_routine, patient_routine):
#     """
#     Compares the default routine tasks with the patient's routine tasks
#     and checks if there are any deviations based on the timestamp and task similarity.
#     """
#     alerts = []
    
#     print("Checking routine match...")
    
#     # Loop through the patient routine and compare with the default routine
#     for routine in patient_routine:
#         routine_time = datetime.strptime(routine['start_time'], "%I:%M %p")
#         print(f"Checking routine at {routine_time.strftime('%I:%M %p')}")

#         # Check for significant deviations (personality shift detection)
#         if detect_personality_shift(routine['start_time']):
#             alerts.append(f"Alert: Personality shift detected at {routine_time.strftime('%I:%M %p')}. Abnormal waking time!")
        
#         # Find matching task in default routine
#         for default in default_routine:
#             default_time = datetime.strptime(default['start_time'], "%I:%M %p")
            
#             if routine_time == default_time:
#                 print(f"Found matching time: {routine_time.strftime('%I:%M %p')}")

#                 # Compare tasks if times match
#                 for task in routine['tasks']:
#                     for default_task in default['tasks']:
#                         similarity = calculate_similarity(task, default_task)
#                         print(f"Comparing task: '{task}' with '{default_task}', similarity: {similarity}")

#                         if similarity < 0.7:  # If similarity is below threshold
#                             alerts.append(f"Alert: Deviation detected at {routine_time.strftime('%I:%M %p')}! Routine task: '{task}', Image label task: '{default_task}'")
                    
#     return alerts

# # Main function to load the routines and check for deviations
# def main():
#     # Load default and patient routines from dataset
#     try:
#         with open(DEFAULT_ROUTINE_FILE_PATH, 'r') as file:
#             default_routine = json.load(file)
#             print("Default routine loaded successfully.")
        
#         with open(ROUTINE_FILE_PATH, 'r') as file:
#             patient_routine = json.load(file)
#             print("Patient routine loaded successfully.")
#     except FileNotFoundError as e:
#         print(f"Error loading data: {e}")
#         return
    
#     # Compare the routines and check for deviations
#     alerts = check_routine_match(default_routine, patient_routine)

#     if alerts:
#         print(f"Deviations detected: {alerts}")
#         # Log alerts to the console instead of sending email
#         for alert in alerts:
#             print(alert)
#     else:
#         print("No deviations detected. The patient's routine matches the expected routine.")

# # Run the main function
# if __name__ == "__main__":
#     main()

import json
import re
import nltk
from datetime import datetime
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download NLTK stopwords data
nltk.download('stopwords')

# Paths to the JSON files in the dataset folder
DEFAULT_ROUTINE_FILE_PATH = "dataset/default_routine.json"
ROUTINE_FILE_PATH = "dataset/routine_data.json"

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
def detect_personality_shift(routine_time):
    """
    Detect if a personality shift is happening based on abnormal time deviations
    (e.g., waking up during sleep time like 1 AM).
    """
    # Convert routine time to datetime object
    routine_time = datetime.strptime(routine_time, "%I:%M %p")
    
    # Sleep period from 12:00 AM to 06:00 AM
    sleep_start_time = datetime.strptime("12:00 AM", "%I:%M %p")
    sleep_end_time = datetime.strptime("06:00 AM", "%I:%M %p")

    # Check if the routine time falls within the sleep period but is outside normal sleep hours
    if sleep_start_time <= routine_time < sleep_end_time:
        return True
    return False

# Check if the patient's routine matches the default routine
def check_routine_match(default_routine, patient_routine):
    """
    Compares the default routine tasks with the patient's routine tasks
    and checks if there are any deviations based on the timestamp and task similarity.
    """
    alerts = []
    
    print("Checking routine match...\n")
    
    # Loop through the patient routine and compare with the default routine
    for routine in patient_routine:
        routine_time = datetime.strptime(routine['start_time'], "%I:%M %p")
        print(f"Checking routine at {routine_time.strftime('%I:%M %p')}")
        
    #     # Check for significant deviations (personality shift detection)
    #     if detect_personality_shift(routine['start_time']):
    #         print(f"**Deviation Detected: Abnormal waking time at {routine_time.strftime('%I:%M %p')}**")
    #         alerts.append(f"Alert: Personality shift detected at {routine_time.strftime('%I:%M %p')}. Abnormal waking time!")
        
    #     # Find matching task in default routine
    #     for default in default_routine:
    #         default_time = datetime.strptime(default['start_time'], "%I:%M %p")
            
    #         if routine_time == default_time:
    #             print(f"Matching Time Found: {routine_time.strftime('%I:%M %p')}")
                
    #             # Print patient's task at this matching time
    #             print(f"Patient's task at {routine_time.strftime('%I:%M %p')}: {', '.join(routine['tasks'])}")
                
    #             # Compare tasks if times match
    #             for task in routine['tasks']:
    #                 task_matched = False
    #                 for default_task in default['tasks']:
    #                     similarity = calculate_similarity(task, default_task)
    #                     print(f"Comparing task: '{task}' with '{default_task}' - Similarity: {similarity:.2f}")
                        
    #                     if similarity < 0.7:  # If similarity is below threshold
    #                         alerts.append(f"Alert: Deviation detected at {routine_time.strftime('%I:%M %p')}! Routine task: '{task}', Default task: '{default_task}'")
    #                         print(f"Deviation Detected: Routine task: '{task}' doesn't match default task: '{default_task}'\n")
    #                     else:
    #                         task_matched = True
    #                         print(f"Match Found: Routine task: '{task}' matches default task: '{default_task}'\n")
                    
    #                 # If no match found after comparing all tasks, add a mismatch alert
    #                 if not task_matched:
    #                     alerts.append(f"Alert: No matching task found for time {routine_time.strftime('%I:%M %p')}")
    #                     print(f"Deviation Detected: No matching task for time {routine_time.strftime('%I:%M %p')}\n")
    
    # return alerts
    
    # Check for significant deviations (personality shift detection)
def detect_personality_shift(routine):
    """
    Detect if a personality shift is happening based on abnormal time deviations
    (e.g., waking up during sleep time like 1 AM).
    """
    # Convert routine time to datetime object
    routine_time = datetime.strptime(routine['start_time'], "%I:%M %p")
    
    # Sleep period from 12:00 AM to 06:00 AM
    sleep_start_time = datetime.strptime("12:00 AM", "%I:%M %p")
    sleep_end_time = datetime.strptime("06:00 AM", "%I:%M %p")

    # Check if the routine time falls within the sleep period but is outside normal sleep hours
    if sleep_start_time <= routine_time < sleep_end_time:
        return True, routine['tasks']  # Return True and the tasks at this time
    return False, []

# Check if the patient's routine matches the default routine
def check_routine_match(default_routine, patient_routine):
    """
    Compares the default routine tasks with the patient's routine tasks
    and checks if there are any deviations based on the timestamp and task similarity.
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
            alerts.append(f"Tasks at this time: {', '.join(tasks)}")  # Include the tasks in the alert

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


# Main function to load the routines and check for deviations
def main():
    # Load default and patient routines from dataset
    try:
        with open(DEFAULT_ROUTINE_FILE_PATH, 'r') as file:
            default_routine = json.load(file)
            print("Default routine loaded successfully.")
        
        with open(ROUTINE_FILE_PATH, 'r') as file:
            patient_routine = json.load(file)
            print("Patient routine loaded successfully.")
    except FileNotFoundError as e:
        print(f"Error loading data: {e}")
        return
    
    # Compare the routines and check for deviations
    alerts = check_routine_match(default_routine, patient_routine)

    if alerts:
        print(f"\nDeviations detected:\n")
        for alert in alerts:
            print(alert)
    else:
        print("No deviations detected. The patient's routine matches the expected routine.")

# Run the main function
if __name__ == "__main__":
    main()



