// ========================================
// BEAUTYSNAP AI
// AI COSMETIC IMAGE CLASSIFICATION
// ========================================

// AI MODEL
const MODEL_URL =
    'https://teachablemachine.withgoogle.com/models/B5O_XG69N/';

// CONFIDENCE THRESHOLD
const THRESHOLD = 70;

let model = null;
let webcam = null;
let running = false;


// ========================================
// GET ELEMENT
// ========================================

const $ = (id) =>
    document.getElementById(id);


// ========================================
// LOAD AI MODEL
// ========================================

async function loadModel() {

    try {

        $('status').textContent =
            'Menyambung AI...';

        model = await tmImage.load(
            MODEL_URL + 'model.json',
            MODEL_URL + 'metadata.json'
        );

        $('status').textContent =
            'AI model sedia';

        $('dot').style.background =
            '#65b582';

        $('predictionStatus').textContent =
            'System Ready';

    } catch (e) {

        console.error(e);

        $('status').textContent =
            'Model tidak dapat dimuat';

        $('dot').style.background =
            '#d86b91';

        $('predictionStatus').textContent =
            'Model Error';
    }
}


// ========================================
// START WEBCAM
// ========================================

async function startCamera() {

    if (!model) {
        await loadModel();
    }

    stopCamera();

    try {

        webcam = new tmImage.Webcam(
            560,
            390,
            true
        );

        await webcam.setup();

        await webcam.play();

        running = true;

        $('preview').innerHTML = '';

        $('preview').appendChild(
            webcam.canvas
        );

        $('stop').style.display =
            'block';

        $('camera').innerHTML =
            '📷 <b>Webcam Aktif</b>';

        $('predictionStatus').textContent =
            'Scanning...';

        requestAnimationFrame(loop);

    } catch (e) {

        console.error(e);

        alert(
            'Kamera tidak dapat dibuka. Benarkan akses kamera pada browser.'
        );
    }
}


// ========================================
// CAMERA LOOP
// ========================================

async function loop() {

    if (!running) {
        return;
    }

    webcam.update();

    await predict(
        webcam.canvas
    );

    requestAnimationFrame(loop);
}


// ========================================
// STOP WEBCAM
// ========================================

function stopCamera() {

    running = false;

    if (webcam) {

        webcam.stop();

        webcam = null;
    }

    $('stop').style.display =
        'none';

    $('camera').innerHTML =
        '📷 <b>Webcam</b>';
}


// ========================================
// AI PREDICTION
// ========================================

async function predict(input) {

    if (!model) {
        return;
    }

    try {

        // GET PREDICTIONS
        const predictions =
            await model.predict(input);


        // SORT FROM HIGHEST TO LOWEST
        predictions.sort(
            (a, b) =>
                b.probability -
                a.probability
        );


        // TOP PREDICTION
        const top =
            predictions[0];


        // CONVERT TO PERCENTAGE
        const percentage =
            top.probability * 100;


        // ========================================
        // DISPLAY CONFIDENCE
        // ========================================

        $('score').textContent =
            percentage.toFixed(1) + '%';


        // ========================================
        // UPDATE CONFIDENCE METER
        // ========================================

        $('fill').style.width =
            percentage + '%';


        // ========================================
        // CHECK THRESHOLD
        // ========================================

        if (percentage >= THRESHOLD) {

            // Confidence 70% atau lebih
            // Paparkan class

            $('result').textContent =
                top.className;

            $('predictionStatus').textContent =
                'Prediction Complete';

        } else {

            // Confidence kurang daripada 70%
            // Paparkan Unknown

            $('result').textContent =
                'Unknown';

            $('predictionStatus').textContent =
                'Confidence terlalu rendah';
        }


        // ========================================
        // OTHER PREDICTIONS
        // ========================================

        $('list').innerHTML =
            predictions.map(item => {

                const number =
                    item.probability * 100;

                return `
                    <div class="pred">

                        <div class="predtop">

                            <span>
                                ${safe(item.className)}
                            </span>

                            <b>
                                ${number.toFixed(1)}%
                            </b>

                        </div>

                        <div class="bar">

                            <i style="width:${number}%"></i>

                        </div>

                    </div>
                `;

            }).join('');


    } catch (error) {

        console.error(
            'Prediction error:',
            error
        );

        $('result').textContent =
            'Prediction Error';

        $('predictionStatus').textContent =
            'System Error';
    }
}


// ========================================
// SAFE TEXT
// ========================================

function safe(text) {

    return String(text).replace(
        /[&<>"']/g,

        character => ({

            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'

        }[character])
    );
}


// ========================================
// WEBCAM BUTTON
// ========================================

$('camera').onclick =
    startCamera;


// ========================================
// STOP WEBCAM BUTTON
// ========================================

$('stop').onclick =
    stopCamera;


// ========================================
// UPLOAD BUTTON
// ========================================

$('upload').onclick = () => {

    $('file').click();

};


// ========================================
// IMAGE UPLOAD
// ========================================

$('file').onchange =
    async event => {

        const file =
            event.target.files[0];


        if (!file) {
            return;
        }


        // LOAD MODEL IF NOT READY
        if (!model) {

            await loadModel();

        }


        // STOP WEBCAM
        stopCamera();


        // CREATE IMAGE
        const image =
            new Image();


        image.className =
            'uploaded';


        // WHEN IMAGE LOADED
        image.onload = () => {

            $('preview').innerHTML =
                '';

            $('preview').appendChild(
                image
            );


            $('predictionStatus').textContent =
                'Predicting...';


            // PREDICT IMAGE
            predict(image);

        };


        // CREATE IMAGE URL
        image.src =
            URL.createObjectURL(file);

    };


// ========================================
// RESET
// ========================================

$('reset').onclick = () => {

    // STOP CAMERA
    stopCamera();


    // CLEAR FILE
    $('file').value =
        '';


    // RESET IMAGE PREVIEW
    $('preview').innerHTML = `

        <div class="empty">

            <div class="icon">
                📸
            </div>

            <h3>
                Sedia untuk scan!
            </h3>

            <p>
                Gunakan webcam atau upload gambar produk kosmetik.
            </p>

        </div>

    `;


    // RESET PREDICTION
    $('result').textContent =
        'Belum ada gambar';


    // RESET CONFIDENCE
    $('score').textContent =
        '0%';


    // RESET METER
    $('fill').style.width =
        '0%';


    // RESET STATUS
    $('predictionStatus').textContent =
        'Waiting for image';


    // RESET OTHER PREDICTIONS
    $('list').innerHTML = `

        <p class="muted">
            Prediction akan muncul di sini.
        </p>

    `;

};


// ========================================
// START SYSTEM
// ========================================

loadModel();