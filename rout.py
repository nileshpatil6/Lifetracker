import json
from datetime import datetime

# Routine data - for testing purposes
routine_data = [
    {"start_time": "03:55 AM", "tasks": ["Typing on a laptop keyboard and using the trackpad/mouse"]},
    {"start_time": "03:56 AM", "tasks": ["Typing on a laptop keyboard and using the trackpad/mouse"]},
    {"start_time": "03:57 AM", "tasks": ["Typing on a laptop keyboard", "Resting on leg"]},
    {"start_time": "04:03 AM", "tasks": ["Holding a smartphone"]},
    {"start_time": "04:04 AM", "tasks": ["Typing on a laptop keyboard and holding a smartphone"]},
    {"start_time": "04:05 AM", "tasks": ["Holding a thermos/flask and opening the lid", "Touching/Adjusting something"]},
    {"start_time": "03:49 AM", "tasks": ["Hand holding a smartphone"]},
    {"start_time": "03:50 AM", "tasks": ["Hands holding and using a smartphone"]},
    {"start_time": "03:51 AM", "tasks": ["Hands pouring something from a packet into a container"]},
    {"start_time": "03:53 AM", "tasks": ["Hand holding a snack packet"]},
    {"start_time": "03:54 AM", "tasks": ["Hand holding a snack packet"]},
]

# Default routine for comparison
default_routine = [
    {"start_time": "03:55 AM", "tasks": ["Typing on a laptop keyboard and using the trackpad/mouse"]},
    {"start_time": "03:56 AM", "tasks": ["Typing on a laptop keyboard and using the trackpad/mouse"]},
    {"start_time": "03:57 AM", "tasks": ["Typing on a laptop keyboard", "Resting on leg"]},
    {"start_time": "04:03 AM", "tasks": ["Holding a smartphone"]},
    {"start_time": "04:04 AM", "tasks": ["Typing on a laptop keyboard and holding a smartphone"]},
    {"start_time": "04:05 AM", "tasks": ["Holding a thermos/flask and opening the lid", "Touching/Adjusting something"]},
    {"start_time": "03:49 AM", "tasks": ["Hand holding a smartphone"]},
    {"start_time": "03:50 AM", "tasks": ["Hands holding and using a smartphone"]},
    {"start_time": "03:51 AM", "tasks": ["Hands pouring something from a packet into a container"]},
    {"start_time": "03:53 AM", "tasks": ["Hand holding a snack packet"]},
    {"start_time": "03:54 AM", "tasks": ["Hand holding a snack packet"]},
]

def detect_deviations():
    deviations = []

    for routine in routine_data:
        routine_time = datetime.strptime(routine['start_time'], "%I:%M %p")
        for default in default_routine:
            default_time = datetime.strptime(default['start_time'], "%I:%M %p")
            if routine_time == default_time:
                for task in routine['tasks']:
                    if task not in default['tasks']:
                        deviations.append(f"Deviation detected at {routine_time.strftime('%I:%M %p')}: Routine task '{task}' doesn't match default.")
                break

    # Save deviations to a JSON file so it can be fetched by the frontend
    with open('deviations.json', 'w') as outfile:
        json.dump({"deviations": deviations}, outfile)

# Call the function to detect deviations
detect_deviations()
