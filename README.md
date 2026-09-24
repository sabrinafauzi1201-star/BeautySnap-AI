\# BeautySnap AI



\## AI Image Classification \& Application Deployment



BeautySnap AI is an AI-based image classification web application developed to classify cosmetic products from images. The system uses a model trained with Google Teachable Machine and integrates the model into a web application using TensorFlow.js.



\## Project Objective



The objectives of BeautySnap AI are:



1\. To develop an image classification model using Google Teachable Machine.

2\. To classify cosmetic product images into predefined classes.

3\. To integrate the trained AI model into a web application.

4\. To allow users to provide images through webcam or image upload.

5\. To display the predicted class and confidence score.

6\. To apply a confidence threshold to identify low-confidence predictions as Unknown.



\## Technologies Used



\* Google Teachable Machine

\* TensorFlow.js

\* HTML

\* CSS

\* JavaScript

\* Git

\* GitHub



\## Application Features



The BeautySnap AI application provides:



\* Webcam input

\* Image upload

\* AI image classification

\* Prediction result

\* Confidence percentage

\* Confidence meter

\* Prediction status

\* Other prediction probabilities

\* Reset function

\* 70% confidence threshold

\* Unknown result for low-confidence predictions



\## Fasa 9 — Application Deployment



The trained Teachable Machine model is integrated directly into the web application using TensorFlow.js.



The application loads the following model files from Teachable Machine:



\* `model.json`

\* `metadata.json`



The inference process is performed directly in the browser.



\### Data Flow



User Image / Webcam

↓

HTML Web Application

↓

TensorFlow.js

↓

Teachable Machine Model

↓

Prediction

↓

Confidence Score

↓

70% Threshold

↓

Class / Unknown



No separate Python backend is required because the TensorFlow.js model performs the inference directly in the browser.



\## Fasa 10 — Application Interface



The application interface was developed using HTML, CSS and JavaScript.



The main interface contains:



\* BeautySnap AI logo and project title

\* AI system status

\* Webcam button

\* Image upload button

\* Image preview area

\* Prediction result

\* Confidence score

\* Confidence meter

\* Prediction status

\* Other prediction probabilities

\* Reset button

\* Cosmetic scanning tips



The interface was designed to be simple, clean and user-friendly.



\## Fasa 11 — Confidence Threshold



A confidence threshold of 70% was implemented to prevent the system from displaying a class when the model confidence is too low.



The prediction logic is:



\* Confidence ≥ 70% → Display the predicted class.

\* Confidence < 70% → Display `Unknown`.



This allows the application to distinguish between predictions with sufficient confidence and predictions that should not be treated as a confirmed class.



\## Prediction Example



When the confidence score reaches the required threshold, the application displays the predicted cosmetic class.



When the confidence score is below the threshold, the application displays:



`Unknown`



The confidence percentage is also displayed to allow the user to observe how confident the model is about its prediction.



\## Project Structure



```text

BeautySnap-AI-Cute/

└── beautyvision-cute/

&#x20;   ├── index.html

&#x20;   ├── script.js

&#x20;   ├── style.css

&#x20;   ├── README.md

&#x20;   ├── screenshots/

&#x20;   └── experiments/

```



\## How to Run the Application



1\. Download or clone this repository.

2\. Open the `beautyvision-cute` folder.

3\. Open `index.html` using a browser or local web server.

4\. Allow camera permission when using the webcam feature.

5\. Select either webcam or image upload.

6\. Provide a cosmetic product image.

7\. The AI model will analyse the image.

8\. The prediction and confidence score will be displayed.

9\. If the confidence is below 70%, the system displays `Unknown`.



\## Testing



Testing is performed using images that were not used during model training.



The testing process records:



\* Input image

\* Predicted class

\* Confidence score

\* Correct or incorrect prediction

\* Misclassification cases



Testing evidence will be stored in the `screenshots` folder.



\## Experiments



Two model experiments are conducted by changing aspects such as:



\* Dataset/image variation

\* Number of training images

\* Training parameters

\* Model training configuration



The results of the experiments are documented in the `experiments` folder.



\## GitHub Version Control



Git and GitHub are used to manage project versions and development progress.



Major development stages include:



\* Project setup

\* Teachable Machine model integration

\* Web application development

\* Webcam functionality

\* Image upload functionality

\* Prediction and confidence display

\* Application interface improvement

\* Confidence threshold implementation



\## AI Code Assistant



AI Code Assistant was used during development to support coding tasks such as:



1\. Generating and improving JavaScript prediction functionality.

2\. Implementing the confidence threshold and Unknown prediction logic.



The prompts, generated results and implementation evidence are documented separately for the assignment.



\## Future Improvements



Future improvements may include:



\* Adding more cosmetic product classes.

\* Increasing the size and variety of the dataset.

\* Improving model accuracy.

\* Adding more robust testing with unseen images.

\* Improving mobile responsiveness.

\* Adding additional AI-assisted cosmetic recognition features.



\## Project Name



\*\*BeautySnap AI\*\*



\### AI Image Classification \& Application Deployment



