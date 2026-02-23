import streamlit as st
import cv2
import mediapipe as mp
import numpy as np
import pickle

# Load the model once, cached as a resource
@st.cache_resource
def load_model():
    model_dict = pickle.load(open('./model2.p', 'rb'))
    return model_dict['model']

model = load_model()

labels_dict = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '6', 6: '7', 7: '8', 8: 'A', 9: 'B',10:'C',11:'D',12:'F', 13:'5'}

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3, max_num_hands=2)

st.title("Hand Gesture Recognition")

FRAME_WINDOW = st.image([])

# Try to open webcam
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    st.error("Could not open webcam. Please check your device or permissions.")
else:
    while True:
        ret, frame = cap.read()
        if not ret:
            st.warning("Failed to grab frame.")
            break

        H, W, _ = frame.shape
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        x_ = []
        y_ = []
        hands_data = []

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                hand_data = []
                for lm in hand_landmarks.landmark:
                    x_.append(lm.x)
                    y_.append(lm.y)
                for lm in hand_landmarks.landmark:
                    hand_data.append(lm.x - min(x_))
                    hand_data.append(lm.y - min(y_))
                hands_data.append(hand_data)

            if len(hands_data) == 1:
                hands_data.append([0] * len(hands_data[0]))

            data_aux = hands_data[0] + hands_data[1]
            prediction = model.predict([np.asarray(data_aux)])
            predicted_character = labels_dict[int(prediction[0])]

            for hand_landmarks in results.multi_hand_landmarks:
                mp.solutions.drawing_utils.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            x1 = int(min(x_) * W) - 10
            y1 = int(min(y_) * H) - 10
            x2 = int(max(x_) * W) - 10
            y2 = int(max(y_) * H) - 10
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)

            text = predicted_character
            text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)[0]
            text_x = (frame.shape[1] - text_size[0]) // 2
            text_y = 30
            cv2.putText(frame, text, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

        FRAME_WINDOW.image(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
